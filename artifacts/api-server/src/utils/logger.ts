import pino from "pino";
import { env } from "../config/env";
import { platformTag, isProduction } from "../config/platform";

export const logger = pino({
  level: env.LOG_LEVEL ?? "info",
  base: {
    platform: env.PLATFORM,
    isPrimary: env.IS_PRIMARY,
  },
  messageKey: "message",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
  ],
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  mixin() {
    return { deployment: platformTag };
  },
  ...(isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: { colorize: true, messageFormat: `${platformTag} {msg}` },
        },
      }),
});
