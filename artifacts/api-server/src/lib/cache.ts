import crypto from "crypto";

const cache = new Map<string, { value: string; expiresAt: number }>();
const TTL_MS = 60 * 60 * 1000;

export function buildCacheKey(
  code: string,
  error: string,
  language: string,
  mode: string,
): string {
  const raw = `${language}::${mode}::${code}::${error}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCached(key: string, value: string): void {
  cache.set(key, { value, expiresAt: Date.now() + TTL_MS });
}

export function evictExpired(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiresAt) {
      cache.delete(key);
    }
  }
}
