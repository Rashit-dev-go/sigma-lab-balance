import { prisma } from '../../lib/prisma';
import { logAuditEvent, logTransactionAudit, logUserAudit } from '../../lib/audit';

// Mock dependencies
jest.mock('../../lib/prisma', () => ({
  prisma: {
    auditLog: {
      create: jest.fn(),
    },
  },
}));

jest.mock('../../lib/logger', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Audit Logging', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logAuditEvent', () => {
    it('should create audit log entry and log to structured logger', async () => {
      const mockRequest = {
        ip: '127.0.0.1',
        headers: {
          get: jest.fn().mockReturnValue('Mozilla/5.0'),
        },
      } as any;

      const auditData = {
        userId: 'user-123',
        action: 'create' as const,
        resource: 'transaction',
        resourceId: 'txn-456',
        details: { amount: 100 },
        request: mockRequest,
      };

      (prisma.auditLog.create as jest.Mock).mockResolvedValue({
        id: 'audit-123',
        ...auditData,
        timestamp: new Date(),
      });

      await logAuditEvent(auditData);

      expect(prisma.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          action: 'create',
          resource: 'transaction',
          resourceId: 'txn-456',
          details: JSON.stringify({ amount: 100 }),
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
        },
      });
    });

    it('should handle errors gracefully', async () => {
      (prisma.auditLog.create as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const auditData = {
        userId: 'user-123',
        action: 'read' as const,
        resource: 'transaction',
        details: { count: 5 },
      };

      // Should not throw
      await expect(logAuditEvent(auditData)).resolves.not.toThrow();
    });
  });

  describe('logTransactionAudit', () => {
    it('should log transaction-specific audit event', async () => {
      const mockRequest = {
        ip: '192.168.1.1',
        headers: {
          get: jest.fn().mockReturnValue('TestAgent/1.0'),
        },
      } as any;

      await logTransactionAudit('user-123', 'create', 'txn-456', { amount: 50 }, mockRequest);

      expect(prisma.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          action: 'create',
          resource: 'transaction',
          resourceId: 'txn-456',
          details: JSON.stringify({ amount: 50 }),
          ipAddress: '192.168.1.1',
          userAgent: 'TestAgent/1.0',
        },
      });
    });
  });

  describe('logUserAudit', () => {
    it('should log user-specific audit event', async () => {
      await logUserAudit('admin-123', 'update', 'user-456', { field: 'email' });

      expect(prisma.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'admin-123',
          action: 'update',
          resource: 'user',
          resourceId: 'user-456',
          details: JSON.stringify({ field: 'email' }),
          ipAddress: 'unknown',
          userAgent: 'unknown',
        },
      });
    });
  });
});
