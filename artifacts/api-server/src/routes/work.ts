import { Router } from "express";
import { db, workSamplesTable } from "@workspace/db";
import { eq, getTableColumns } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";
import { parsePositiveId } from "../lib/blog-input.js";
import { WorkInputError, parseWorkSampleInput } from "../lib/work-input.js";
import { notifyWorkPublished, notifyWorkRemoved } from "../lib/google-indexing.js";

const router = Router();
const { fileData: _fileData, confidentialityConfirmed: _confidentiality, ...publicColumns } = getTableColumns(workSamplesTable);
const { fileData: _adminFileData, ...adminColumns } = getTableColumns(workSamplesTable);

router.get("/work", async (_req, res) => {
  const samples = await db
    .select(publicColumns)
    .from(workSamplesTable)
    .where(eq(workSamplesTable.published, true))
    .orderBy(workSamplesTable.date);
  res.json(samples.reverse().map((sample) => ({ ...sample, hasFile: sample.fileSize > 0 })));
});

router.get("/work/:slug/file", async (req, res) => {
  const [sample] = await db
    .select({
      fileName: workSamplesTable.fileName,
      fileMimeType: workSamplesTable.fileMimeType,
      fileData: workSamplesTable.fileData,
      published: workSamplesTable.published,
    })
    .from(workSamplesTable)
    .where(eq(workSamplesTable.slug, String(req.params["slug"] ?? "")));
  if (!sample?.published || !sample.fileData) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const data = Buffer.from(sample.fileData, "base64");
  res.removeHeader("X-Frame-Options");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
  res.setHeader("Content-Type", sample.fileMimeType);
  res.setHeader("Content-Length", String(data.length));
  const disposition = req.query["download"] === "1" ? "attachment" : "inline";
  res.setHeader("Content-Disposition", `${disposition}; filename*=UTF-8''${encodeURIComponent(sample.fileName)}`);
  res.send(data);
});

router.get("/work/:slug", async (req, res) => {
  const [sample] = await db
    .select(publicColumns)
    .from(workSamplesTable)
    .where(eq(workSamplesTable.slug, String(req.params["slug"] ?? "")));
  if (!sample?.published) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...sample, hasFile: sample.fileSize > 0 });
});

router.get("/admin/work", requireAdmin, async (_req, res) => {
  const samples = await db.select(adminColumns).from(workSamplesTable).orderBy(workSamplesTable.createdAt);
  res.json(samples.reverse().map((sample) => ({ ...sample, hasFile: sample.fileSize > 0 })));
});

router.post("/admin/work", requireAdmin, async (req, res) => {
  try {
    const [sample] = await db.insert(workSamplesTable).values(parseWorkSampleInput(req.body)).returning(adminColumns);
    if (sample.published) notifyWorkPublished(sample.slug);
    res.status(201).json({ ...sample, hasFile: sample.fileSize > 0 });
  } catch (error) {
    if (error instanceof WorkInputError) {
      res.status(400).json({ error: error.message });
      return;
    }
    throw error;
  }
});

router.put("/admin/work/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params["id"]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [before] = await db.select().from(workSamplesTable).where(eq(workSamplesTable.id, id));
  if (!before) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  try {
    const values = parseWorkSampleInput(req.body, { existingSlug: before.slug, existingFile: before });
    const [sample] = await db
      .update(workSamplesTable)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(workSamplesTable.id, id))
      .returning(adminColumns);
    if (!sample) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (sample.published) notifyWorkPublished(sample.slug);
    else if (before.published) notifyWorkRemoved(sample.slug);
    res.json({ ...sample, hasFile: sample.fileSize > 0 });
  } catch (error) {
    if (error instanceof WorkInputError) {
      res.status(400).json({ error: error.message });
      return;
    }
    throw error;
  }
});

router.delete("/admin/work/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params["id"]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [deleted] = await db
    .delete(workSamplesTable)
    .where(eq(workSamplesTable.id, id))
    .returning({ slug: workSamplesTable.slug, published: workSamplesTable.published });
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (deleted.published) notifyWorkRemoved(deleted.slug);
  res.json({ deleted: true });
});

export default router;
