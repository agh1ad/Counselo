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
const DATA_PREWARM_RETRY_MS = 15_000;
const FILE_PREWARM_RETRY_MS = 60_000;

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

function retryAfter(delay: number, task: () => void): void {
  const timer = setTimeout(task, delay);
  timer.unref();
}

async function prewarmPublicWorkFilesUntilReady(): Promise<void> {
  try {
    await primePublicWorkFileSnapshots();
    completePublicWorkFileSnapshotStartupPrewarm();
    logger.info("Public work file startup prewarm completed");
  } catch (err) {
    logger.error({ err }, "Public work file startup prewarm failed; retrying");
    retryAfter(FILE_PREWARM_RETRY_MS, () => {
      void prewarmPublicWorkFilesUntilReady();
    });
  }
}

async function prewarmPublicDataUntilReady(): Promise<void> {
  try {
    await primePublicDataSnapshots();
    completePublicDataSnapshotStartupPrewarm();
    logger.info("Public data snapshot startup prewarm completed");
    void prewarmPublicWorkFilesUntilReady();
  } catch (err) {
    logger.error({ err }, "Public data snapshot startup prewarm failed; retrying");
    retryAfter(DATA_PREWARM_RETRY_MS, () => {
      void prewarmPublicDataUntilReady();
    });
  }
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
    void prewarmPublicDataUntilReady();
  }
}

start().catch((err) => {
  logger.error({ err }, "API startup failed");
  process.exit(1);
});
