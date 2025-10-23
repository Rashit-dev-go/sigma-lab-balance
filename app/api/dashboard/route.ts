import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getRemainingRequests, getResetTime } from '@/lib/rate-limit';
import logger from '@/lib/logger';

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

    // Calculate summary statistics
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(tx => {
      const amount = parseFloat(tx.encryptedAmount); // decrypted by middleware
      if (tx.type === 'income') {
        totalIncome += amount;
      } else if (tx.type === 'expense') {
        totalExpenses += amount;
      }
    });

    const totalBalance = totalIncome - totalExpenses;

    // Get recent transactions (last 10)
    const recentTransactions = transactions.slice(0, 10).map(tx => ({
      id: tx.id,
      amount: parseFloat(tx.encryptedAmount),
      description: tx.encryptedDescription,
      type: tx.type,
      category: tx.category,
      date: tx.date.toISOString(),
    }));

    const data = {
      totalBalance,
      totalIncome,
      totalExpenses,
      recentTransactions,
    };

    // Log audit event
    logger.info('Dashboard data read operation', {
      userId,
      operation: 'read',
      resource: 'dashboard',
      transactionCount: transactions.length,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    });

    const remaining = getRemainingRequests(userId);
    const resetTime = getResetTime(userId);

    return NextResponse.json(data, {
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
