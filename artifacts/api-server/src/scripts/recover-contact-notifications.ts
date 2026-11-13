import { pool } from "@workspace/db";
import { processPendingNotifications, stopContactNotificationRecovery } from "../lib/contact-notifications.js";

// This process is a bounded drain, not a second long-running retry scheduler.
stopContactNotificationRecovery();
try {
  // One-shot scheduled/recovery task: drain due batches, bounded to two minutes
  // and 100 submissions. Future backoff deadlines remain durable in PostgreSQL.
  const deadline = Date.now() + 120_000;
  let processed = 0;
  let batchSize = 0;
  do {
    batchSize = await processPendingNotifications();
    processed += batchSize;
  } while (batchSize === 10 && processed < 100 && Date.now() < deadline);
  console.log(`[contact-recovery] checked ${processed} due submission(s)${batchSize === 10 ? "; bounded run complete, invoke again to continue due work" : ""}`);
} finally {
  stopContactNotificationRecovery();
  await pool.end();
}
