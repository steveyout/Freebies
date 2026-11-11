/**
 * In-memory sliding-window rate limiter with automatic cleanup
 * Designed for serverless and Node.js environments to prevent brute-force attacks.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up expired keys every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  // Allow Node.js process to exit cleanly if timer is active
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

export interface RateLimitResult {
  isAllowed: boolean;
  remaining: number;
  resetInMs: number;
  totalLimit: number;
}

/**
 * Check if an action under a key exceeds the rate limit
 * @param key Unique identifier (e.g. `login:192.168.1.1` or `admin:pwd:user-id`)
 * @param limit Maximum allowed requests within the window (default: 5)
 * @param windowMs Time window in milliseconds (default: 15 minutes)
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return {
      isAllowed: true,
      remaining: limit - 1,
      resetInMs: windowMs,
      totalLimit: limit,
    };
  }

  if (record.count >= limit) {
    return {
      isAllowed: false,
      remaining: 0,
      resetInMs: Math.max(0, record.resetAt - now),
      totalLimit: limit,
    };
  }

  record.count += 1;
  return {
    isAllowed: true,
    remaining: limit - record.count,
    resetInMs: Math.max(0, record.resetAt - now),
    totalLimit: limit,
  };
}

/**
 * Clear the rate limit for a key (e.g. after a successful login)
 */
export function resetRateLimit(key: string): void {
  rateLimitMap.delete(key);
}

/**
 * Extract client IP from standard reverse proxy and direct headers
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return '127.0.0.1';
}
