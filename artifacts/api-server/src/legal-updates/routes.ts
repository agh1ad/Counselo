import { validateEditorial } from "./editorial.js";
import { updateContext, legalUpdatesSitemapDocument } from "@workspace/api-zod";
import { Router } from "express";
import { createHash } from "node:crypto";
import { pool } from "@workspace/db";
import { requireAdmin, secretsMatch } from "../middlewares/auth.js";
import { publishedUpdates, legalUpdatesSitemapRows } from "./store.js";
import { runLegalUpdates } from "./worker.js";
import { validateDraft } from "./validation.js";
import { officialSources } from "./sources.js";
import { fetchOfficial, sourceText } from "./retrieval.js";
const router = Router();
router.get("/legal-updates", async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    const path =
      typeof req.query.path === "string" ? req.query.path : "/legal-updates";
    if (!path.startsWith("/") || path.length > 500 || !updateContext(path)) {
      res.status(400).json({ error: "Invalid updates path" });
      return;
    }
    res.json(await publishedUpdates(path));
  } catch {
    res.status(503).json({ error: "Legal updates temporarily unavailable" });
  }
});
router.get("/legal-updates-sitemap", async (req, res) => {
  try {
    const xml = legalUpdatesSitemapDocument(
      await legalUpdatesSitemapRows(),
      req.query.part ? Number(req.query.part) : undefined,
    );
    if (!xml) {
      res.status(404).send("Sitemap not found");
      return;
    }
    res.type("application/xml").send(xml);
  } catch {
    res.status(503).send("Sitemap temporarily unavailable");
  }
});
router.get("/admin/legal-updates", requireAdmin, async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const [items, runs] = await Promise.all([
    pool.query(
      "SELECT * FROM legal_updates ORDER BY discovered_at DESC LIMIT 200",
    ),
    pool.query(
      "SELECT * FROM legal_update_runs ORDER BY started_at DESC LIMIT 20",
    ),
  ]);
  res.json({ items: items.rows, runs: runs.rows, sources: officialSources });
});
router.post("/internal/legal-updates/run", async (req, res) => {
  const secret = process.env.LEGAL_UPDATES_CRON_SECRET;
  if (
    !secret ||
    secret.length < 32 ||
    !secretsMatch(req.headers.authorization || "", `Bearer ${secret}`)
  ) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    res.json(await runLegalUpdates());
  } catch {
    res.status(503).json({ error: "Worker failed; inspect run history" });
  }
});
router.post("/admin/legal-updates/run", requireAdmin, async (_req, res) => {
  try {
    res.json(await runLegalUpdates());
  } catch {
    res
      .status(503)
      .json({ error: "Worker failed; inspect configuration and run history" });
  }
});
router.put("/admin/legal-updates/:id", requireAdmin, async (req, res) => {
  if (!/^[0-9a-f-]{36}$/.test(String(req.params.id))) {
    res.status(400).json({ error: "Invalid update ID" });
    return;
  }
  const { action, revision, reviewer, note, draft } = req.body || {};
  if (
    !["save", "publish", "reject", "withdraw", "refresh"].includes(action) ||
    !Number.isInteger(revision) ||
    typeof reviewer !== "string" ||
    reviewer.trim().length < 3 ||
    reviewer.length > 150 ||
    typeof note !== "string" ||
    note.trim().length < 10 ||
    note.length > 3000
  ) {
    res.status(400).json({
      error:
        "Action, current revision, reviewer name and meaningful review note are required",
    });
    return;
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const row = (
      await client.query("SELECT * FROM legal_updates WHERE id=$1 FOR UPDATE", [
        req.params.id,
      ])
    ).rows[0];
    if (!row) {
      await client.query("ROLLBACK");
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (row.revision !== revision) {
      await client.query("ROLLBACK");
      res
        .status(409)
        .json({ error: "Draft changed. Reload before reviewing." });
      return;
    }
    if (action === "save" && row.status === "published")
      throw new Error("Withdraw before changing published content");
    if (action === "publish" && !["draft", "withdrawn"].includes(row.status))
      throw new Error("Only reviewed drafts can be published");
    if (action === "reject" && row.status === "published")
      throw new Error("Use withdraw for published content");
    if (action === "refresh") {
      if (row.status === "published")
        throw new Error("Withdraw before refreshing evidence");
      const source = officialSources.find(
        (s) =>
          s.region === row.region &&
          new URL(s.url).origin === new URL(row.source_url).origin,
      );
      if (!source) throw new Error("Source no longer approved");
      const text = sourceText(await fetchOfficial(row.source_url, source));
      if (text.length < 300 || text.length > 60000)
        throw new Error("Source requires manual extraction");
      await client.query(
        "INSERT INTO legal_update_audit(update_id,action,actor,snapshot) VALUES($1,'refresh',$2,$3)",
        [row.id, reviewer.trim(), JSON.stringify({ before: row, note })],
      );
      await client.query(
        "UPDATE legal_updates SET source_text=$2,source_hash=$3,source_checked_at=now(),source_check_status='unchanged',revision=revision+1 WHERE id=$1",
        [row.id, text, createHash("sha256").update(text).digest("hex")],
      );
      await client.query("COMMIT");
      res.json({ ok: true });
      return;
    }
    const editorial =
      action === "save" || action === "publish"
        ? validateEditorial(req.body.editorial ?? row.editorial, row.region)
        : row.editorial || {};
    if (editorial.successorSlug) {
      const successor = await client.query(
        "SELECT id,published_at FROM legal_updates WHERE status='published' AND region=$1 AND slug=$2",
        [row.region, editorial.successorSlug],
      );
      if (
        !successor.rows[0] ||
        successor.rows[0].id === row.id ||
        (row.published_at &&
          new Date(successor.rows[0].published_at) <=
            new Date(row.published_at))
      )
        throw new Error(
          "Replacement must be a later published update in this jurisdiction",
        );
    }
    let validated = row.draft;
    if (action === "save" || action === "publish")
      validated = validateDraft(
        draft || row.draft,
        row.source_text,
        row.region,
        new Date(row.discovered_at),
      );
    if (action === "publish") {
      if (
        row.published_at &&
        (!editorial.correctionEn || !editorial.correctionAr)
      )
        throw new Error(
          "Republication requires an English and Arabic correction or revision note",
        );
      if (!validated.relevant)
        throw new Error(
          "This draft is marked irrelevant and cannot be published",
        );
      if (req.body.confirmed !== true)
        throw new Error(
          "Confirm source, dates, applicability and both language versions",
        );
      const source = officialSources.find(
        (s) =>
          s.region === row.region &&
          new URL(s.url).origin === new URL(row.source_url).origin,
      );
      if (!source) throw new Error("Source is no longer approved");
      const current = sourceText(await fetchOfficial(row.source_url, source));
      if (
        createHash("sha256").update(current).digest("hex") !== row.source_hash
      )
        throw new Error(
          "Source changed since drafting. Run discovery and review the new evidence.",
        );
    }
    await client.query(
      "INSERT INTO legal_update_audit(update_id,action,actor,snapshot) VALUES($1,$2,$3,$4)",
      [
        row.id,
        action,
        reviewer.trim(),
        JSON.stringify({
          before: row,
          afterDraft: validated,
          afterEditorial: editorial,
          note,
        }),
      ],
    );
    const status =
      action === "publish"
        ? "published"
        : action === "reject"
          ? "rejected"
          : action === "withdraw"
            ? "withdrawn"
            : "draft";
    await client.query(
      "UPDATE legal_updates SET draft=$2,status=$3,reviewer=$4,review_note=$5,editorial=$6,source_checked_at=CASE WHEN $3='published' THEN now() ELSE source_checked_at END,source_check_status=CASE WHEN $3='published' THEN 'unchanged' ELSE source_check_status END,revision=revision+1,modified_at=now(),published_at=CASE WHEN $3='published' THEN coalesce(published_at,now()) ELSE published_at END WHERE id=$1",
      [
        row.id,
        JSON.stringify(validated),
        status,
        reviewer.trim(),
        note,
        JSON.stringify(editorial),
      ],
    );
    await client.query("COMMIT");
    res.json({ ok: true });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).json({
      error: error instanceof Error ? error.message : "Review failed",
    });
  } finally {
    client.release();
  }
});
export default router;
