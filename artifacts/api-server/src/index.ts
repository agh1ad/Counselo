import app from "./app";
import { logger } from "./lib/logger";
import { publicationCacheEnabled } from "./lib/publication-cache.js";
import {
  primePublicDataSnapshots,
  primePublicWorkFileSnapshots,
} from "./lib/public-snapshot-primer.js";
import {
  beginPublicSnapshotStartupPrewarm,
  completePublicDataSnapshotStartupPrewarm,
  completePublicWorkFileSnapshotStartupPrewarm,
} from "./lib/public-snapshot-readiness.js";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function start(): Promise<void> {
  const prewarmOnStartup =
    process.env.NODE_ENV === "production" && publicationCacheEnabled();
  if (prewarmOnStartup) {
    beginPublicSnapshotStartupPrewarm();
  }

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });

  if (prewarmOnStartup) {
    void primePublicDataSnapshots()
      .then(() => {
        completePublicDataSnapshotStartupPrewarm();
        logger.info("Public data snapshot startup prewarm completed");
        return primePublicWorkFileSnapshots();
      })
      .then(() => {
        completePublicWorkFileSnapshotStartupPrewarm();
        logger.info("Public work file startup prewarm completed");
      })
      .catch((err) => {
        // Keep the API available for health checks and authenticated traffic.
        // Public snapshot reads remain fail-closed until a later prewarm or
        // publication mutation succeeds.
        logger.error({ err }, "Public snapshot startup prewarm failed");
      });
  }
}

start().catch((err) => {
  logger.error({ err }, "API startup failed");
  process.exit(1);
});
