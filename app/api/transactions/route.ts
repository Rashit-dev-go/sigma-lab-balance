import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkRateLimit, getRemainingRequests, getResetTime } from '@/lib/rate-limit';
import logger from '@/lib/logger';
import { logTransactionAudit } from '@/lib/audit';

// Validation schema for transaction
const transactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['income', 'expense'], { required_error: 'Type is required' }),
  category: z.enum(['personal', 'business'], { required_error: 'Category is required' }),
  suggestedCategory: z.string().optional(),
  date: z.string().optional(),
});

// Assume a function to get user ID from request (e.g., from JWT or session)
function getUserId(request: NextRequest): string | null {
  // Placeholder: implement based on your auth system
  // For example, check headers or cookies for token
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  // Decode token to get userId
  // This is placeholder - implement proper JWT verification
  try {
    // Assume token is userId for simplicity
    return token;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limit
    if (!checkRateLimit(userId)) {
      const resetTime = getResetTime(userId);
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toString(),
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    // Log audit event for reading transactions
    await logTransactionAudit(
      userId,
      'read',
      'bulk', // Special resourceId for bulk reads
      { count: transactions.length },
      request
    );

    const remaining = getRemainingRequests(userId);
    const resetTime = getResetTime(userId);

    return NextResponse.json(transactions, {
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limit
    if (!checkRateLimit(userId)) {
      const resetTime = getResetTime(userId);
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toString(),
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const validatedData = transactionSchema.parse(body);

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        encryptedAmount: validatedData.amount.toString(), // Convert to string for encryption
        encryptedDescription: validatedData.description,
        type: validatedData.type,
        category: validatedData.category,
        date: validatedData.date ? new Date(validatedData.date) : new Date(),
      },
    });

    // Create categorization attempt if AI was used
    if (validatedData.suggestedCategory) {
      await prisma.categorizationAttempt.create({
        data: {
          transactionId: transaction.id,
          aiCategory: validatedData.suggestedCategory,
          userCategory: validatedData.category,
          isCorrect: validatedData.suggestedCategory === validatedData.category,
        },
      });
    }

    // Log audit event for creating transaction
    await logTransactionAudit(
      userId,
      'create',
      transaction.id,
      {
        category: validatedData.category,
        type: validatedData.type,
        amount: validatedData.amount, // Note: this is the plain amount before encryption
      },
      request
    );

    const remaining = getRemainingRequests(userId);
    const resetTime = getResetTime(userId);

    return NextResponse.json(transaction, {
      status: 201,
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
