import { createCipherGCM, createDecipherGCM, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

// Generate key from password and salt
function generateKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, KEY_LENGTH);
}

// Encrypt function
export function encrypt(text: string, password: string): string {
  const salt = randomBytes(SALT_LENGTH);
  const key = generateKey(password, salt);
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipherGCM(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag();

  // Return format: salt:iv:tag:encrypted
  return `${salt.toString('hex')}:${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

// Decrypt function
export function decrypt(encryptedData: string, password: string): string {
  const parts = encryptedData.split(':');
  if (parts.length !== 4) {
    throw new Error('Invalid encrypted data format');
  }

  const salt = Buffer.from(parts[0], 'hex');
  const iv = Buffer.from(parts[1], 'hex');
  const tag = Buffer.from(parts[2], 'hex');
  const encrypted = parts[3];

  const key = generateKey(password, salt);
  const decipher = createDecipherGCM(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Environment variable for encryption key
const ENCRYPTION_PASSWORD = process.env.ENCRYPTION_PASSWORD;
if (!ENCRYPTION_PASSWORD) {
  throw new Error('ENCRYPTION_PASSWORD environment variable is required');
}

// Convenience functions using env password
export function encryptData(text: string): string {
  return encrypt(text, ENCRYPTION_PASSWORD);
}

export function decryptData(encryptedData: string): string {
  return decrypt(encryptedData, ENCRYPTION_PASSWORD);
}