import rateLimit from "express-rate-limit";
import { env } from "../config/env";
import { getClientIp } from "../utils/http";

export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getClientIp(req),
  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Too many requests. Please try again later.",
      },
    });
  },
});
