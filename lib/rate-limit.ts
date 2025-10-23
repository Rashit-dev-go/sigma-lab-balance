// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Max requests per window

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or new user
    rateLimitMap.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

export function getRemainingRequests(identifier: string): number {
  const userLimit = rateLimitMap.get(identifier);
  if (!userLimit) return MAX_REQUESTS;
  return Math.max(0, MAX_REQUESTS - userLimit.count);
}

export function getResetTime(identifier: string): number {
  const userLimit = rateLimitMap.get(identifier);
  return userLimit?.resetTime || Date.now() + WINDOW_MS;
}
