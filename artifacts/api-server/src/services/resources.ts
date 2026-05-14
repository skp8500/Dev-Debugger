import { closeDatabaseConnections } from "@workspace/db";
import { logger } from "../utils/logger";

type AsyncCloser = () => Promise<void>;

const closers = new Map<string, AsyncCloser>();

export function registerClosableResource(name: string, closer: AsyncCloser): void {
  closers.set(name, closer);
}

export async function closeRegisteredResources(): Promise<void> {
  const tasks = [...closers.entries()].map(async ([name, closer]) => {
    try {
      await closer();
      logger.info({ resource: name }, "Closed resource");
    } catch (err) {
      logger.error({ err, resource: name }, "Failed to close resource");
    }
  });

  await Promise.all(tasks);
}

registerClosableResource("database", closeDatabaseConnections);
