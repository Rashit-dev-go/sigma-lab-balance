import { NextRequest } from 'next/server';
import { GET, POST } from '../../../app/api/transactions/route';

// Mock dependencies
jest.mock('../../../lib/prisma', () => ({
  prisma: {
    transaction: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('../../../lib/rate-limit', () => ({
  checkRateLimit: jest.fn(),
  getRemainingRequests: jest.fn(),
  getResetTime: jest.fn(),
}));

jest.mock('../../../lib/logger', () => ({
  default: {
    info: jest.fn(),
  },
}));

import { prisma } from '../../../lib/prisma';
import { checkRateLimit, getRemainingRequests, getResetTime } from '../../../lib/rate-limit';
import logger from '../../../lib/logger';

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockCheckRateLimit = checkRateLimit as jest.Mock;
const mockGetRemaining = getRemainingRequests as jest.Mock;
const mockGetResetTime = getResetTime as jest.Mock;
const mockLogger = logger as jest.Mocked<typeof logger>;

describe('/api/transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckRateLimit.mockReturnValue(true);
    mockGetRemaining.mockReturnValue(95);
    mockGetResetTime.mockReturnValue(Date.now() + 900000);
  });

  describe('GET /api/transactions', () => {
    it('should return transactions for authenticated user', async () => {
      const mockTransactions = [
        { id: '1', userId: 'user1', encryptedAmount: 'enc-amount', encryptedDescription: 'enc-desc', category: 'food' },
      ];
      mockPrisma.transaction.findMany.mockResolvedValue(mockTransactions);

      const request = new NextRequest('http://localhost:3000/api/transactions', {
        headers: { authorization: 'Bearer user1' },
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTransactions);
      expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        orderBy: { date: 'desc' },
      });
      expect(mockLogger.info).toHaveBeenCalledWith('Financial data read operation', expect.any(Object));
    });

    it('should return 401 for unauthenticated request', async () => {
      const request = new NextRequest('http://localhost:3000/api/transactions');

      const response = await GET(request);

      expect(response.status).toBe(401);
      expect(mockPrisma.transaction.findMany).not.toHaveBeenCalled();
    });

    it('should return 429 for rate limited request', async () => {
      mockCheckRateLimit.mockReturnValue(false);
      mockGetResetTime.mockReturnValue(Date.now() + 10000);

      const request = new NextRequest('http://localhost:3000/api/transactions', {
        headers: { authorization: 'Bearer user1' },
      });

      const response = await GET(request);

      expect(response.status).toBe(429);
      expect(mockPrisma.transaction.findMany).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/transactions', () => {
    it('should create transaction for authenticated user', async () => {
      const mockTransaction = {
        id: '1',
        userId: 'user1',
        encryptedAmount: 'enc-amount',
        encryptedDescription: 'enc-desc',
        category: 'food',
        date: new Date(),
      };
      mockPrisma.transaction.create.mockResolvedValue(mockTransaction);

      const request = new NextRequest('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: { authorization: 'Bearer user1' },
        body: JSON.stringify({ amount: '100.00', description: 'Test transaction', category: 'food' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockTransaction);
      expect(mockPrisma.transaction.create).toHaveBeenCalledWith({
        data: {
          userId: 'user1',
          encryptedAmount: '100.00',
          encryptedDescription: 'Test transaction',
          category: 'food',
          date: expect.any(Date),
        },
      });
      expect(mockLogger.info).toHaveBeenCalledWith('Financial data write operation', expect.any(Object));
    });

    it('should validate input data', async () => {
      const request = new NextRequest('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: { authorization: 'Bearer user1' },
        body: JSON.stringify({ amount: '', description: '' }), // Invalid
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(mockPrisma.transaction.create).not.toHaveBeenCalled();
    });
  });
});
