import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { recordConsent, checkConsent, getUserConsents, getPendingConsents, ConsentType } from '@/lib/consent';

// Validation schema for consent
const consentSchema = z.object({
  type: z.enum(['privacy_policy', 'terms_of_service', 'data_usage', 'marketing']),
  version: z.string().min(1, 'Version is required'),
  consented: z.boolean(),
});

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

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'pending') {
      // Get pending consents that user needs to provide
      const pendingConsents = await getPendingConsents(userId);
      return NextResponse.json({ pendingConsents });
    } else {
      // Get all user consents
      const consents = await getUserConsents(userId);
      return NextResponse.json({ consents });
    }
  } catch (error) {
    console.error('Error retrieving consents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = consentSchema.parse(body);

    // Record the consent
    await recordConsent({
      userId,
      type: validatedData.type as ConsentType,
      version: validatedData.version,
      consented: validatedData.consented,
      request,
    });

    return NextResponse.json(
      { message: 'Consent recorded successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Error recording consent:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
