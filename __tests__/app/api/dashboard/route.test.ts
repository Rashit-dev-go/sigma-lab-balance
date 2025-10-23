import { NextRequest } from 'next/server';
import { GET } from '@/app/api/dashboard/route';
import { prisma } from '@/lib/prisma';

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    transaction: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn(),
  getRemainingRequests: jest.fn(),
  getResetTime: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
  default: {
    info: jest.fn(),
  },
}));

describe('/api/dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return dashboard data successfully', async () => {
    // Mock authenticated user
    const mockUserId = 'user-123';

    // Mock rate limit check
    const { checkRateLimit, getRemainingRequests, getResetTime } = require('@/lib/rate-limit');
    checkRateLimit.mockReturnValue(true);
    getRemainingRequests.mockReturnValue(99);
    getResetTime.mockReturnValue(Date.now() + 3600000);

    // Mock transactions data
    const mockTransactions = [
      {
        id: '1',
        userId: mockUserId,
        encryptedAmount: '100.00', // decrypted by middleware
        encryptedDescription: 'Salary',
        type: 'income',
        category: 'personal',
        date: new Date('2023-10-01'),
      },
      {
        id: '2',
        userId: mockUserId,
        encryptedAmount: '50.00',
        encryptedDescription: 'Groceries',
        type: 'expense',
        category: 'personal',
        date: new Date('2023-10-02'),
      },
    ];

    prisma.transaction.findMany.mockResolvedValue(mockTransactions);

    // Create mock request
    const request = new NextRequest('http://localhost:3000/api/dashboard', {
      headers: {
        authorization: `Bearer ${mockUserId}`,
      },
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      totalBalance: 50.00, // 100 - 50
      totalIncome: 100.00,
      totalExpenses: 50.00,
      recentTransactions: [
        {
          id: '1',
          amount: 100.00,
          description: 'Salary',
          type: 'income',
          category: 'personal',
          date: '2023-10-01T00:00:00.000Z',
        },
        {
          id: '2',
          amount: 50.00,
          description: 'Groceries',
          type: 'expense',
          category: 'personal',
          date: '2023-10-02T00:00:00.000Z',
        },
      ],
    });
  });

  it('should return 401 for unauthorized user', async () => {
    const request = new NextRequest('http://localhost:3000/api/dashboard');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 429 for rate limited requests', async () => {
    const mockUserId = 'user-123';

    const { checkRateLimit } = require('@/lib/rate-limit');
    checkRateLimit.mockReturnValue(false);

    const request = new NextRequest('http://localhost:3000/api/dashboard', {
      headers: {
        authorization: `Bearer ${mockUserId}`,
      },
    });

    const response = await GET(request);
    expect(response.status).toBe(429);
  });
});
