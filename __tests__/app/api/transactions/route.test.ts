import { NextRequest } from 'next/server';
import { POST } from '@/app/api/transactions/route';
import { prisma } from '@/lib/prisma';

// Mock dependencies
jest.mock('@/lib/prisma');
jest.mock('@/lib/rate-limit');
jest.mock('@/lib/logger');

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockCheckRateLimit = jest.fn();
const mockGetRemainingRequests = jest.fn();
const mockGetResetTime = jest.fn();
const mockLogger = jest.fn();

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: mockCheckRateLimit,
  getRemainingRequests: mockGetRemainingRequests,
  getResetTime: mockGetResetTime,
}));

jest.mock('@/lib/logger', () => ({
  __esModule: true,
  default: mockLogger,
}));

describe('/api/transactions POST', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckRateLimit.mockReturnValue(true);
    mockGetRemainingRequests.mockReturnValue(10);
    mockGetResetTime.mockReturnValue(Date.now() + 60000);
  });

  it('creates transaction successfully', async () => {
    const mockTransaction = {
      id: '1',
      userId: 'user-1',
      encryptedAmount: 'encrypted-amount',
      encryptedDescription: 'encrypted-desc',
      type: 'expense',
      category: null,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockPrisma.transaction.create.mockResolvedValue(mockTransaction);

    const request = new NextRequest('http://localhost/api/transactions', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer user-1',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100,
        description: 'Test transaction',
        type: 'expense',
        date: '2023-01-01',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual(mockTransaction);
    expect(mockPrisma.transaction.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        encryptedAmount: '100',
        encryptedDescription: 'Test transaction',
        type: 'expense',
        category: undefined,
        date: new Date('2023-01-01'),
      },
    });
    expect(mockLogger).toHaveBeenCalled();
  });

  it('returns 401 for unauthorized request', async () => {
    const request = new NextRequest('http://localhost/api/transactions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100,
        description: 'Test transaction',
        type: 'expense',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  it('validates request data', async () => {
    const request = new NextRequest('http://localhost/api/transactions', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer user-1',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: -100,
        description: '',
        type: 'invalid',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation error');
  });

  it('handles rate limit exceeded', async () => {
    mockCheckRateLimit.mockReturnValue(false);

    const request = new NextRequest('http://localhost/api/transactions', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer user-1',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100,
        description: 'Test transaction',
        type: 'expense',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Too many requests');
  });
});
