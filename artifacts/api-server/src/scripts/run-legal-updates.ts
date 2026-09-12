import { runLegalUpdates } from "../legal-updates/worker.js";
import { pool } from "@workspace/db";
try {
  const result = await runLegalUpdates();
  console.log(JSON.stringify(result));
  if (result.status === "partial") process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : "Worker failed");
  process.exitCode = 1;
} finally {
  await pool.end();
}
