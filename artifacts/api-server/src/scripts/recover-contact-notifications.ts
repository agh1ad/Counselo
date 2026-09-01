import { pool } from "@workspace/db";
import { processPendingNotifications } from "../lib/contact-notifications.js";

try {
  const processed = await processPendingNotifications();
  console.log(`[contact-recovery] processed ${processed} pending submission(s)`);
} finally {
  await pool.end();
}
