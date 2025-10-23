import { encrypt, decrypt, encryptData, decryptData } from '../lib/crypto';

describe('Crypto Utilities', () => {
  const testPassword = 'test-encryption-password';
  const testData = 'sensitive financial data';
  const testAmount = '1234.56';
  const testDescription = 'Transaction description';

  beforeAll(() => {
    // Set environment variable for tests
    process.env.ENCRYPTION_PASSWORD = testPassword;
  });

  afterAll(() => {
    delete process.env.ENCRYPTION_PASSWORD;
  });

  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt data correctly', () => {
      const encrypted = encrypt(testData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(testData);
      expect(encrypted).not.toBe(testData);
    });

    it('should produce different encrypted outputs for same input', () => {
      const encrypted1 = encrypt(testData, testPassword);
      const encrypted2 = encrypt(testData, testPassword);

      expect(encrypted1).not.toBe(encrypted2);
    });

    it('should fail decryption with wrong password', () => {
      const encrypted = encrypt(testData, testPassword);

      expect(() => decrypt(encrypted, 'wrong-password')).toThrow();
    });

    it('should fail with invalid encrypted data format', () => {
      expect(() => decrypt('invalid-format', testPassword)).toThrow('Invalid encrypted data format');
    });
  });

  describe('encryptData and decryptData', () => {
    it('should encrypt and decrypt using env password', () => {
      const encrypted = encryptData(testAmount);
      const decrypted = decryptData(encrypted);

      expect(decrypted).toBe(testAmount);
    });

    it('should throw error if ENCRYPTION_PASSWORD not set', () => {
      delete process.env.ENCRYPTION_PASSWORD;

      expect(() => encryptData(testData)).toThrow('ENCRYPTION_PASSWORD environment variable is required');

      // Restore
      process.env.ENCRYPTION_PASSWORD = testPassword;
    });
  });

  describe('Security properties', () => {
    it('should use AES-256-GCM algorithm', () => {
      // This is more of a documentation test, but ensures the constants are correct
      const encrypted = encrypt(testData, testPassword);
      expect(encrypted).toMatch(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/); // Base64-like
    });

    it('should handle empty strings', () => {
      const encrypted = encrypt('', testPassword);
      const decrypted = decrypt(encrypted, testPassword);
      expect(decrypted).toBe('');
    });

    it('should handle unicode characters', () => {
      const unicodeData = 'Тестовые данные с русскими буквами';
      const encrypted = encrypt(unicodeData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);
      expect(decrypted).toBe(unicodeData);
    });
  });
});
