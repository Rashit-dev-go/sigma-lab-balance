import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';

/**
 * Data retention periods in days
 */
export const RETENTION_PERIODS = {
  // Transaction data: 7 years (2555 days) for tax compliance
  TRANSACTION_DATA: 7 * 365,

  // Audit logs: 3 years (1095 days) for security purposes
  AUDIT_LOG: 3 * 365,

  // Categorization attempts: Same as transactions
  CATEGORIZATION_ATTEMPT: 7 * 365,

  // User consent records: Keep until consent is withdrawn or account deleted
  CONSENT_ACTIVE: -1, // -1 means keep indefinitely while active

  // Failed login attempts, rate limit data: 30 days
  TEMPORARY_DATA: 30,
} as const;

/**
 * Calculate cutoff date for a given retention period
 */
function getCutoffDate(retentionDays: number): Date {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);
  return cutoff;
}

/**
 * Clean up old transaction data
 */
export async function cleanupOldTransactions(): Promise<{ deletedCount: number }> {
  try {
    const cutoffDate = getCutoffDate(RETENTION_PERIODS.TRANSACTION_DATA);

    // Delete old transactions and related data
    const result = await prisma.transaction.deleteMany({
      where: {
        date: {
          lt: cutoffDate,
        },
      },
    });

    logger.info('Data retention cleanup: Old transactions deleted', {
      deletedCount: result.count,
      cutoffDate: cutoffDate.toISOString(),
    });

    return { deletedCount: result.count };
  } catch (error) {
    logger.error('Failed to cleanup old transactions', { error });
    throw error;
  }
}

/**
 * Clean up old audit logs
 */
export async function cleanupOldAuditLogs(): Promise<{ deletedCount: number }> {
  try {
    const cutoffDate = getCutoffDate(RETENTION_PERIODS.AUDIT_LOG);

    const result = await prisma.auditLog.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    logger.info('Data retention cleanup: Old audit logs deleted', {
      deletedCount: result.count,
      cutoffDate: cutoffDate.toISOString(),
    });

    return { deletedCount: result.count };
  } catch (error) {
    logger.error('Failed to cleanup old audit logs', { error });
    throw error;
  }
}

/**
 * Clean up old categorization attempts (when transaction is deleted, these cascade)
 */
export async function cleanupOldCategorizationAttempts(): Promise<{ deletedCount: number }> {
  try {
    // Since categorization attempts have cascade delete with transactions,
    // they should be automatically cleaned up. This is just for orphaned records.
    const cutoffDate = getCutoffDate(RETENTION_PERIODS.CATEGORIZATION_ATTEMPT);

    const result = await prisma.categorizationAttempt.deleteMany({
      where: {
        transactionId: null, // This shouldn't happen due to cascade, but safety check
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    if (result.count > 0) {
      logger.warn('Data retention cleanup: Orphaned categorization attempts deleted', {
        deletedCount: result.count,
      });
    }

    return { deletedCount: result.count };
  } catch (error) {
    logger.error('Failed to cleanup old categorization attempts', { error });
    throw error;
  }
}

/**
 * Clean up withdrawn consents (keep only active consents)
 */
export async function cleanupWithdrawnConsents(): Promise<{ deletedCount: number }> {
  try {
    const result = await prisma.consent.deleteMany({
      where: {
        consented: false,
        withdrawalDate: {
          not: null,
        },
      },
    });

    if (result.count > 0) {
      logger.info('Data retention cleanup: Withdrawn consents deleted', {
        deletedCount: result.count,
      });
    }

    return { deletedCount: result.count };
  } catch (error) {
    logger.error('Failed to cleanup withdrawn consents', { error });
    throw error;
  }
}

/**
 * Run all data retention cleanup procedures
 */
export async function runDataRetentionCleanup(): Promise<{
  transactionsDeleted: number;
  auditLogsDeleted: number;
  categorizationAttemptsDeleted: number;
  consentsDeleted: number;
}> {
  logger.info('Starting data retention cleanup');

  const [
    transactionsResult,
    auditLogsResult,
    categorizationResult,
    consentsResult,
  ] = await Promise.all([
    cleanupOldTransactions(),
    cleanupOldAuditLogs(),
    cleanupOldCategorizationAttempts(),
    cleanupWithdrawnConsents(),
  ]);

  const summary = {
    transactionsDeleted: transactionsResult.deletedCount,
    auditLogsDeleted: auditLogsResult.deletedCount,
    categorizationAttemptsDeleted: categorizationResult.deletedCount,
    consentsDeleted: consentsResult.deletedCount,
  };

  logger.info('Data retention cleanup completed', summary);

  return summary;
}

/**
 * Get data retention statistics
 */
export async function getRetentionStats() {
  const now = new Date();

  const [
    totalTransactions,
    oldTransactions,
    totalAuditLogs,
    oldAuditLogs,
    totalConsents,
    withdrawnConsents,
  ] = await Promise.all([
    prisma.transaction.count(),
    prisma.transaction.count({
      where: {
        date: {
          lt: getCutoffDate(RETENTION_PERIODS.TRANSACTION_DATA),
        },
      },
    }),
    prisma.auditLog.count(),
    prisma.auditLog.count({
      where: {
        timestamp: {
          lt: getCutoffDate(RETENTION_PERIODS.AUDIT_LOG),
        },
      },
    }),
    prisma.consent.count(),
    prisma.consent.count({
      where: {
        consented: false,
        withdrawalDate: {
          not: null,
        },
      },
    }),
  ]);

  return {
    summary: {
      totalTransactions,
      oldTransactions,
      totalAuditLogs,
      oldAuditLogs,
      totalConsents,
      withdrawnConsents,
    },
    retentionPeriods: RETENTION_PERIODS,
    generatedAt: now.toISOString(),
  };
}
