import app from "./app";
import { logger } from "./lib/logger";
import { publicationCacheEnabled } from "./lib/publication-cache.js";
import { primePublicSnapshots } from "./lib/public-snapshot-primer.js";

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
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });

  if (process.env.NODE_ENV === "production" && publicationCacheEnabled()) {
    void primePublicSnapshots()
      .then(() => {
        logger.info("Public snapshot prewarm completed");
      })
      .catch((err) => {
        // Keep the API available for health checks and authenticated traffic.
        // Public snapshot reads remain fail-closed until a later prewarm or
        // publication mutation succeeds.
        logger.error({ err }, "Public snapshot prewarm failed");
      });
  }
}

start().catch((err) => {
  logger.error({ err }, "API startup failed");
  process.exit(1);
});
