import { checkRateLimit, getRemainingRequests, getResetTime } from '../../lib/rate-limit';

describe('Rate Limit Utilities', () => {
  beforeEach(() => {
    // Clear the in-memory map
    jest.resetModules();
  });

  describe('checkRateLimit', () => {
    it('should allow requests within limit', () => {
      const identifier = 'user1';

      for (let i = 0; i < 100; i++) {
        expect(checkRateLimit(identifier)).toBe(true);
      }
    });

    it('should block requests over limit', () => {
      const identifier = 'user1';

      // Use up all requests
      for (let i = 0; i < 100; i++) {
        checkRateLimit(identifier);
      }

      // Next should be blocked
      expect(checkRateLimit(identifier)).toBe(false);
    });

    it('should reset after window expires', () => {
      const identifier = 'user1';

      // Mock Date.now to control time
      const originalNow = Date.now;
      Date.now = jest.fn(() => 0); // Start time

      // Use up requests
      for (let i = 0; i < 100; i++) {
        checkRateLimit(identifier);
      }
      expect(checkRateLimit(identifier)).toBe(false);

      // Advance time past window (15 minutes = 900000 ms)
      Date.now = jest.fn(() => 900001);

      // Should allow again
      expect(checkRateLimit(identifier)).toBe(true);

      Date.now = originalNow;
    });
  });

  describe('getRemainingRequests', () => {
    it('should return remaining requests', () => {
      const identifier = 'user1';

      expect(getRemainingRequests(identifier)).toBe(100);

      checkRateLimit(identifier);
      expect(getRemainingRequests(identifier)).toBe(99);
    });
  });

  describe('getResetTime', () => {
    it('should return reset time', () => {
      const identifier = 'user1';

      const before = Date.now();
      const resetTime = getResetTime(identifier);
      const after = Date.now();

      expect(resetTime).toBeGreaterThanOrEqual(before);
      expect(resetTime).toBeLessThanOrEqual(after + 15 * 60 * 1000);
    });
  });
});
