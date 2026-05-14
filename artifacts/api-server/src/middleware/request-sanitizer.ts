import type { NextFunction, Request, Response } from "express";

const BLOCKED_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
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

export function requestSanitizer(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }

  if (req.query && typeof req.query === "object") {
    req.query = sanitizeValue(req.query) as Request["query"];
  }

  if (req.params && typeof req.params === "object") {
    req.params = sanitizeValue(req.params) as Request["params"];
  }

  next();
}
