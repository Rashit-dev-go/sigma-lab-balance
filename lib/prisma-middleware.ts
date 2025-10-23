import { PrismaClient } from '@prisma/client';
import { encryptData, decryptData } from './crypto';

export function createEncryptionMiddleware() {
  return async (params: any, next: any) => {
    // Encrypt sensitive fields before writing to database
    if (params.model === 'Transaction') {
      if (params.action === 'create' || params.action === 'update') {
        if (params.args.data.encryptedAmount) {
          params.args.data.encryptedAmount = encryptData(params.args.data.encryptedAmount);
        }
        if (params.args.data.encryptedDescription) {
          params.args.data.encryptedDescription = encryptData(params.args.data.encryptedDescription);
        }
      }

      // For updateMany, handle differently if needed
      if (params.action === 'updateMany') {
        // This would be more complex, perhaps not supported or handle individually
      }
    }

    const result = await next(params);

    // Decrypt sensitive fields after reading from database
    if (params.model === 'Transaction') {
      if (params.action === 'findUnique' || params.action === 'findFirst' || params.action === 'findMany') {
        if (Array.isArray(result)) {
          result.forEach(item => {
            if (item.encryptedAmount) {
              item.encryptedAmount = decryptData(item.encryptedAmount);
            }
            if (item.encryptedDescription) {
              item.encryptedDescription = decryptData(item.encryptedDescription);
            }
          });
        } else if (result) {
          if (result.encryptedAmount) {
            result.encryptedAmount = decryptData(result.encryptedAmount);
          }
          if (result.encryptedDescription) {
            result.encryptedDescription = decryptData(result.encryptedDescription);
          }
        }
      }
    }

    return result;
  };
}

// Function to apply middleware to Prisma client
export function applyEncryptionMiddleware(prisma: PrismaClient) {
  prisma.$use(createEncryptionMiddleware());
}
