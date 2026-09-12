import app from "./app";
import { logger } from "./lib/logger";
import { publicationCacheEnabled } from "./lib/publication-cache.js";

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

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });

  if (prewarmOnStartup) logger.info("Public snapshots will be served from Object Storage");
}

start().catch((err) => {
  logger.error({ err }, "API startup failed");
  process.exit(1);
});
