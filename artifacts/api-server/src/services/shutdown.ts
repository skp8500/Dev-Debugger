import type { Server as HttpServer } from "node:http";
import { closeRegisteredResources } from "./resources";
import { logger } from "../utils/logger";

let isShuttingDown = false;

async function shutdown(server: HttpServer, signal: string): Promise<void> {
  if (isShuttingDown) {
    logger.warn({ signal }, "Shutdown already in progress");
    return;
  }

  isShuttingDown = true;
  logger.info({ signal }, "Graceful shutdown started");

  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });

  await closeRegisteredResources();
  logger.info({ signal }, "Graceful shutdown finished");
}

export function registerProcessHandlers(server: HttpServer): void {
  process.on("SIGINT", () => {
    shutdown(server, "SIGINT")
      .then(() => process.exit(0))
      .catch((err) => {
        logger.error({ err }, "SIGINT shutdown failed");
        process.exit(1);
      });
  });

  process.on("SIGTERM", () => {
    shutdown(server, "SIGTERM")
      .then(() => process.exit(0))
      .catch((err) => {
        logger.error({ err }, "SIGTERM shutdown failed");
        process.exit(1);
      });
  });

  process.on("uncaughtException", (err) => {
    logger.fatal({ err }, "Uncaught exception");
    shutdown(server, "uncaughtException")
      .then(() => process.exit(1))
      .catch(() => process.exit(1));
  });

  process.on("unhandledRejection", (reason) => {
    logger.fatal({ err: reason }, "Unhandled rejection");
  });
}
