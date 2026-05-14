import type { Server as HttpServer } from "node:http";
import { registerClosableResource } from "./resources";
import { logger } from "../utils/logger";

type WebsocketRuntime = {
  close: () => Promise<void>;
};

export async function initializeWebsocketLayer(
  _server: HttpServer,
): Promise<WebsocketRuntime | null> {
  // Socket.IO multi-instance note:
  // Add a Redis adapter here before enabling cross-instance websocket fan-out
  // so Render and Railway nodes can share pub/sub state safely.
  //
  // Example future shape:
  // const pubClient = createClient({ url: process.env.REDIS_URL });
  // const subClient = pubClient.duplicate();
  // io.adapter(createAdapter(pubClient, subClient));

  logger.info("Websocket layer not enabled for this service");

  const runtime = {
    async close() {
      logger.info("Websocket layer shutdown complete");
    },
  };

  registerClosableResource("websocket", runtime.close);
  return runtime;
}
