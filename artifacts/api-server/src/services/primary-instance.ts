import { isPrimaryInstance } from "../config/platform";
import { logger } from "../utils/logger";

function startCronJobs(): void {
  logger.info("Primary-only cron scheduler is enabled");
}

function startBackgroundWorkers(): void {
  logger.info("Primary-only background workers are enabled");
}

export async function startPrimaryOnlyServices(): Promise<void> {
  if (!isPrimaryInstance) {
    logger.info(
      "Skipping primary-only jobs on this instance: cron, workers, queues, cleanup, migrations",
    );
    return;
  }

  startCronJobs();
  startBackgroundWorkers();

  // Intentionally leave migrations manual-by-default.
  // If you later add runtime migrations, guard them here and require both:
  // process.env.IS_PRIMARY === "true" and a second explicit opt-in flag.
  logger.info("Primary instance startup completed");
}
