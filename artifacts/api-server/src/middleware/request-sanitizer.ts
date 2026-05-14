import type { NextFunction, Request, Response } from "express";

const BLOCKED_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (isPlainRecord(value)) {
    const input = value as Record<string, unknown>;
    const sanitized: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(input)) {
      if (BLOCKED_KEYS.has(key)) {
        continue;
      }

      sanitized[key] = sanitizeValue(nestedValue);
    }

    return sanitized;
  }

  if (typeof value === "string") {
    return value.replace(/\0/g, "");
  }

  return value;
}

function sanitizeRecordInPlace(record: Record<string, unknown>): void {
  const sanitized = sanitizeValue(record);

  if (!isPlainRecord(sanitized)) {
    return;
  }

  for (const key of Object.keys(record)) {
    delete record[key];
  }

  Object.assign(record, sanitized);
}

export function requestSanitizer(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }

  if (isPlainRecord(req.query)) {
    sanitizeRecordInPlace(req.query);
  }

  if (isPlainRecord(req.params)) {
    sanitizeRecordInPlace(req.params);
  }

  next();
}
