import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const attempts = await prisma.categorizationAttempt.findMany({
      where: {
        transaction: {
          userId,
        },
      },
    });

    const total = attempts.length;
    const correct = attempts.filter(a => a.isCorrect).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    return NextResponse.json({
      total,
      correct,
      accuracy: Math.round(accuracy * 100) / 100, // round to 2 decimals
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Placeholder for user ID
function getUserId(request: NextRequest): string | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  return token || null;
}
