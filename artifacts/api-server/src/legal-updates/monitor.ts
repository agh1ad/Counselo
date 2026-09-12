import { createHash } from "node:crypto";
import { pool } from "@workspace/db";
import { officialSources } from "./sources.js";
import { fetchOfficial, sourceText, robotsAllows } from "./retrieval.js";
// Bounded rolling checks; a successful fetch verifies text stability, not continuing legal applicability.
export async function checkPublishedSources() {
  const { rows } = await pool.query(
    "SELECT id,source_url,source_hash,region FROM legal_updates WHERE status='published' AND (source_checked_at IS NULL OR source_checked_at < now()-interval '7 days') ORDER BY source_checked_at ASC NULLS FIRST,id LIMIT 25",
  );
  const report: { id: string; status: string; error?: string }[] = [];
  for (const row of rows) {
    let status = "unavailable";
    let error: string | undefined;
    try {
      const source = officialSources.find(
        (s) =>
          s.region === row.region &&
          new URL(s.url).origin === new URL(row.source_url).origin,
      );
      if (!source) throw new Error("Source no longer approved");
      const url = new URL(row.source_url);
      const robots = await fetchOfficial(
        new URL("/robots.txt", url).href,
        source,
      );
      if (!robotsAllows(robots, url.pathname + url.search))
        throw new Error("Source disallowed by robots.txt");
      const text = sourceText(await fetchOfficial(row.source_url, source));
      status =
        createHash("sha256").update(text).digest("hex") === row.source_hash
          ? "unchanged"
          : "changed";
    } catch (e) {
      error = e instanceof Error ? e.message : "Source check failed";
    }
    // Avoid overwriting an editor's newer source snapshot or a withdrawn row.
    await pool.query(
      "UPDATE legal_updates SET source_checked_at=now(),modified_at=CASE WHEN source_check_status IS DISTINCT FROM $2 THEN now() ELSE modified_at END,source_check_status=$2 WHERE id=$1 AND source_hash=$3 AND status='published'",
      [row.id, status, row.source_hash],
    );
    report.push({ id: row.id, status, ...(error ? { error } : {}) });
  }
  return report;
}
