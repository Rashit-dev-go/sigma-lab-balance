import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { logAuditEvent } from '@/lib/audit';

export type ConsentType = 'privacy_policy' | 'terms_of_service' | 'data_usage' | 'marketing';

export interface ConsentData {
  userId: string;
  type: ConsentType;
  version: string;
  consented: boolean;
  request?: NextRequest;
}

/**
 * Record or update user consent
 */
export async function recordConsent(data: ConsentData): Promise<void> {
  const { userId, type, version, consented, request } = data;

  try {
    const ipAddress = request?.ip || request?.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request?.headers.get('user-agent') || 'unknown';

    if (consented) {
      // Record new consent or update existing
      await prisma.consent.upsert({
        where: {
          userId_type_version: {
            userId,
            type,
            version,
          },
        },
        update: {
          consented: true,
          withdrawalDate: null,
          ipAddress,
          userAgent,
        },
        create: {
          userId,
          type,
          version,
          consented: true,
          ipAddress,
          userAgent,
        },
      });
    } else {
      // Record withdrawal of consent
      await prisma.consent.updateMany({
        where: {
          userId,
          type,
          version,
          consented: true,
        },
        data: {
          consented: false,
          withdrawalDate: new Date(),
        },
      });
    }

    // Log audit event
    await logAuditEvent({
      userId,
      action: consented ? 'create' : 'update',
      resource: 'consent',
      resourceId: `${type}:${version}`,
      details: { type, version, consented },
      request,
    });

  } catch (error) {
    console.error('Failed to record consent:', error);
    throw new Error('Failed to record consent');
  }
}

/**
 * Check if user has given consent for a specific type and version
 */
export async function checkConsent(
  userId: string,
  type: ConsentType,
  version?: string
): Promise<boolean> {
  try {
    const consent = await prisma.consent.findFirst({
      where: {
        userId,
        type,
        ...(version && { version }),
        consented: true,
      },
      orderBy: {
        consentDate: 'desc',
      },
    });

    return !!consent;
  } catch (error) {
    console.error('Failed to check consent:', error);
    return false; // Default to no consent on error
  }
}

/**
 * Get all consents for a user
 */
export async function getUserConsents(userId: string) {
  try {
    return await prisma.consent.findMany({
      where: { userId },
      orderBy: { consentDate: 'desc' },
    });
  } catch (error) {
    console.error('Failed to get user consents:', error);
    throw new Error('Failed to retrieve consents');
  }
}

/**
 * Get latest consent versions that should be presented to user
 */
export async function getRequiredConsents(): Promise<{ type: ConsentType; version: string; required: boolean }[]> {
  // For now, return hardcoded current versions
  // In a real app, this might come from a configuration or database
  return [
    { type: 'privacy_policy', version: '1.0', required: true },
    { type: 'terms_of_service', version: '1.0', required: true },
    { type: 'data_usage', version: '1.0', required: false },
    { type: 'marketing', version: '1.0', required: false },
  ];
}

/**
 * Check if user needs to consent to any updated policies
 */
export async function getPendingConsents(userId: string) {
  const requiredConsents = await getRequiredConsents();
  const userConsents = await getUserConsents(userId);

  const pendingConsents = [];

  for (const required of requiredConsents) {
    const userConsent = userConsents.find(
      c => c.type === required.type && c.consented
    );

    // If no consent or version is older, it's pending
    if (!userConsent || userConsent.version !== required.version) {
      pendingConsents.push(required);
    }
  }

  return pendingConsents;
}
