import { logger } from "./logger.js";
import {
  primePublishedContentDataSnapshots,
  primePublishedWorkFileSnapshots,
} from "./published-content.js";
import { primePublicLegalUpdateSnapshot } from "../legal-updates/store.js";

/**
 * Public requests are read-only against object storage. This is the only
 * application path that intentionally refreshes those snapshots from
 * PostgreSQL, and it runs during startup or after a fenced publication.
 */
export async function primePublicDataSnapshots(): Promise<void> {
  await Promise.all([
    primePublishedContentDataSnapshots(),
    primePublicLegalUpdateSnapshot(),
  ]);
  logger.info("Published public data snapshots ready");
}

export async function primePublicWorkFileSnapshots(): Promise<void> {
  await primePublishedWorkFileSnapshots();
  logger.info("Published public work file snapshots ready");
}

export async function primePublicSnapshots(): Promise<void> {
  await primePublicDataSnapshots();
  await primePublicWorkFileSnapshots();
  logger.info("All published public snapshots ready");
}