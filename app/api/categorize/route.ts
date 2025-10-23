import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { categorizeTransaction } from '@/lib/yandex-gpt';

const categorizeSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = categorizeSchema.parse(body);

    const category = await categorizeTransaction(
      validatedData.description,
      validatedData.amount,
      validatedData.type
    );

    return NextResponse.json({ category });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Error categorizing transaction:', error);
    return NextResponse.json({ error: 'Failed to categorize transaction' }, { status: 500 });
  }
}
