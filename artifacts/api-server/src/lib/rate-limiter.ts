import crypto from "crypto";

const MAX_REQUESTS =
  parseInt(process.env["RATE_LIMIT_PER_HOUR"] ?? "20", 10);
const WINDOW_MS = 60 * 60 * 1000;

const counters = new Map<string, { count: number; resetAt: number }>();

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const key = hashIp(ip);
  const now = Date.now();

  let entry = counters.get(key);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    counters.set(key, entry);
  }

  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

export function evictExpiredRateLimits(): void {
  const now = Date.now();
  for (const [key, entry] of counters.entries()) {
    if (now > entry.resetAt) {
      counters.delete(key);
    }
  }
}
