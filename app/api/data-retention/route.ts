import { NextRequest, NextResponse } from 'next/server';
import { runDataRetentionCleanup, getRetentionStats } from '@/lib/data-retention';

// Assume a function to get user ID from request (e.g., from JWT or session)
function getUserId(request: NextRequest): string | null {
  // Placeholder: implement based on your auth system
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  // Decode token to get userId
  try {
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

    // For now, allow any authenticated user to view retention stats
    // In production, this should be restricted to administrators
    const stats = await getRetentionStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error retrieving retention stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, allow any authenticated user to trigger cleanup
    // In production, this should be restricted to administrators
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'cleanup') {
      const result = await runDataRetentionCleanup();
      return NextResponse.json({
        message: 'Data retention cleanup completed',
        result,
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error running data retention cleanup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
