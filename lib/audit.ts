import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import logger from '@/lib/logger';

export interface AuditLogData {
  userId: string;
  action: 'create' | 'read' | 'update' | 'delete';
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  request?: NextRequest;
}

/**
 * Log an audit event to the database and structured logs
 */
export async function logAuditEvent(data: AuditLogData): Promise<void> {
  try {
    const { userId, action, resource, resourceId, details, request } = data;

    // Extract request metadata
    const ipAddress = request?.ip || request?.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request?.headers.get('user-agent') || 'unknown';

    // Create database audit log entry
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
        userAgent,
      },
    });

    // Log to structured logger (without sensitive data)
    logger.info('Audit event', {
      userId,
      action,
      resource,
      resourceId: resourceId || 'N/A',
      ipAddress,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    // Log the error but don't throw - audit logging failure shouldn't break the main operation
    console.error('Failed to log audit event:', error);
    logger.error('Audit logging failed', {
      userId: data.userId,
      action: data.action,
      resource: data.resource,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Helper function to log transaction operations
 */
export async function logTransactionAudit(
  userId: string,
  action: 'create' | 'read' | 'update' | 'delete',
  transactionId: string,
  details?: Record<string, any>,
  request?: NextRequest
): Promise<void> {
  await logAuditEvent({
    userId,
    action,
    resource: 'transaction',
    resourceId: transactionId,
    details,
    request,
  });
}

/**
 * Helper function to log user operations
 */
export async function logUserAudit(
  userId: string,
  action: 'create' | 'read' | 'update' | 'delete',
  targetUserId?: string,
  details?: Record<string, any>,
  request?: NextRequest
): Promise<void> {
  await logAuditEvent({
    userId,
    action,
    resource: 'user',
    resourceId: targetUserId,
    details,
    request,
  });
}
