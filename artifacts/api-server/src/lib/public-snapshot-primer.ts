import { logger } from "./logger.js";
import { primePublishedContentSnapshots } from "./published-content.js";
import { primePublicLegalUpdateSnapshot } from "../legal-updates/store.js";

/**
 * Public requests are read-only against object storage. This is the only
 * application path that intentionally refreshes those snapshots from
 * PostgreSQL, and it runs during startup or after a fenced publication.
 */
export async function primePublicSnapshots(): Promise<void> {
  await Promise.all([
    primePublishedContentSnapshots(),
    primePublicLegalUpdateSnapshot(),
  ]);
  logger.info("Published public snapshots ready");
}