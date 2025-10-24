import { prisma } from '../../lib/prisma';
import {
  runDataRetentionCleanup,
  getRetentionStats,
  cleanupOldTransactions,
  RETENTION_PERIODS
} from '../../lib/data-retention';
import logger from '../../lib/logger';

// Mock dependencies
jest.mock('../../lib/prisma', () => ({
  prisma: {
    transaction: {
      count: jest.fn(),
      deleteMany: jest.fn(),
    },
    auditLog: {
      count: jest.fn(),
      deleteMany: jest.fn(),
    },
    categorizationAttempt: {
      deleteMany: jest.fn(),
    },
    consent: {
      count: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

jest.mock('../../lib/logger', () => ({
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Data Retention', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('RETENTION_PERIODS', () => {
    it('should define correct retention periods', () => {
      expect(RETENTION_PERIODS.TRANSACTION_DATA).toBe(7 * 365); // 7 years
      expect(RETENTION_PERIODS.AUDIT_LOG).toBe(3 * 365); // 3 years
      expect(RETENTION_PERIODS.TEMPORARY_DATA).toBe(30); // 30 days
    });
  });

  describe('cleanupOldTransactions', () => {
    it('should delete transactions older than retention period', async () => {
      (prisma.transaction.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });

      const result = await cleanupOldTransactions();

      expect(result.deletedCount).toBe(5);
      expect(prisma.transaction.deleteMany).toHaveBeenCalledWith({
        where: {
          date: {
            lt: expect.any(Date),
          },
        },
      });
      expect(logger.info).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      (prisma.transaction.deleteMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await expect(cleanupOldTransactions()).rejects.toThrow('DB Error');
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('runDataRetentionCleanup', () => {
    it('should run all cleanup procedures', async () => {
      (prisma.transaction.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
      (prisma.auditLog.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });
      (prisma.categorizationAttempt.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.consent.deleteMany as jest.Mock).mockResolvedValue({ count: 3 });

      const result = await runDataRetentionCleanup();

      expect(result.transactionsDeleted).toBe(1);
      expect(result.auditLogsDeleted).toBe(2);
      expect(result.categorizationAttemptsDeleted).toBe(0);
      expect(result.consentsDeleted).toBe(3);
    });
  });

  describe('getRetentionStats', () => {
    it('should return retention statistics', async () => {
      (prisma.transaction.count as jest.Mock)
        .mockResolvedValueOnce(100) // total
        .mockResolvedValueOnce(10); // old

      (prisma.auditLog.count as jest.Mock)
        .mockResolvedValueOnce(50) // total
        .mockResolvedValueOnce(5); // old

      (prisma.consent.count as jest.Mock)
        .mockResolvedValueOnce(20) // total
        .mockResolvedValueOnce(2); // withdrawn

      const stats = await getRetentionStats();

      expect(stats.summary.totalTransactions).toBe(100);
      expect(stats.summary.oldTransactions).toBe(10);
      expect(stats.retentionPeriods.TRANSACTION_DATA).toBe(7 * 365);
    });
  });
});
