import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { isProduction } from "../config/platform";
import { logger } from "../utils/logger";

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (res.headersSent) {
    return;
  }

  if (err instanceof Error && err instanceof z.ZodError) {
    res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: err.message,
      },
    });
    return;
  }

  req.log?.error({ err }, "Unhandled request error");
  logger.error({ err, path: req.originalUrl }, "Unhandled request error");

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: isProduction
        ? "An unexpected error occurred."
        : err instanceof Error
          ? err.message
          : String(err),
    },
  });
}
