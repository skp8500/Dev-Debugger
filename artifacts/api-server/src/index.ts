import http from "node:http";
import app from "./app";
import { env } from "./config/env";
import { platformTag, isPrimaryInstance } from "./config/platform";
import { startPrimaryOnlyServices } from "./services/primary-instance";
import { registerProcessHandlers } from "./services/shutdown";
import { initializeWebsocketLayer } from "./services/websocket";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;
const port = Number(PORT);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${PORT}"`);
}

const server = http.createServer(app);

registerProcessHandlers(server);

server.listen(port, async () => {
  logger.info(
    {
      port,
      nodeEnv: env.NODE_ENV,
      platform: env.PLATFORM,
      isPrimary: isPrimaryInstance,
      frontendUrl: env.FRONTEND_URL ?? null,
    },
    `${platformTag} server listening`,
  );

  await initializeWebsocketLayer(server);
  await startPrimaryOnlyServices();
});

server.on("error", (err) => {
  logger.error({ err }, "Error listening on port");
  process.exit(1);
});
