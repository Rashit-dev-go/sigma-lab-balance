import { NextRequest } from 'next/server';
import { POST } from '@/app/api/categorize/route';
import { categorizeTransaction } from '@/lib/yandex-gpt';

// Mock the categorizeTransaction
jest.mock('@/lib/yandex-gpt', () => ({
  categorizeTransaction: jest.fn(),
}));

const mockCategorize = categorizeTransaction as jest.MockedFunction<typeof categorizeTransaction>;

describe('/api/categorize POST', () => {
  it('should return category on success', async () => {
    mockCategorize.mockResolvedValue('personal');

    const request = new NextRequest('http://localhost/api/categorize', {
      method: 'POST',
      body: JSON.stringify({
        description: 'Grocery shopping',
        amount: 50,
        type: 'expense',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.category).toBe('personal');
    expect(mockCategorize).toHaveBeenCalledWith('Grocery shopping', 50, 'expense');
  });

  it('should return 400 on validation error', async () => {
    const request = new NextRequest('http://localhost/api/categorize', {
      method: 'POST',
      body: JSON.stringify({
        description: '',
        amount: -10,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation error');
  });
});
