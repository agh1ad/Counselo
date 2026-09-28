import { Router } from "express";
import { db, workSamplesTable } from "@workspace/db";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";
import { parsePositiveId } from "../lib/blog-input.js";
import { WorkInputError, parseWorkSampleInput } from "../lib/work-input.js";
import { notifyWorkPublished, notifyWorkRemoved } from "../lib/google-indexing.js";
import { assignInternalLinks } from "../lib/internal-link-assignment.js";
import { publicTestimonial } from "@workspace/api-zod";
import {
  ContentTranslationError,
  hasCompleteWorkTranslation,
  restoreBlankSeoMetadata,
  translateWorkForPublishing,
} from "../lib/content-translation.js";
import { withPublicContentMutation } from "../lib/publication-cache.js";
import { invalidatePublicResponseCache } from "../lib/public-response-cache.js";
import { repairPublicWorkSample } from "../lib/public-work-repairs.js";

import { publishedWork, publishedWorkBySlug, publishedWorkFileBySlug, publishedWorkSummaries } from "../lib/published-content.js";

const router = Router();
const ADMIN_PAGE_SIZE = 50;
const { fileData: _adminFileData, ...adminColumns } = getTableColumns(workSamplesTable);
const adminWorkSummaryColumns = {
  id: workSamplesTable.id,
  slug: workSamplesTable.slug,
  date: workSamplesTable.date,
  titleEn: workSamplesTable.titleEn,
  titleAr: workSamplesTable.titleAr,
  fileName: workSamplesTable.fileName,
  fileSize: workSamplesTable.fileSize,
  published: workSamplesTable.published,
  featured: workSamplesTable.featured,
  updatedAt: workSamplesTable.updatedAt,
};

function adminPageOffset(value: unknown): number {
  const parsed = typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : 0;
}

function publicTestimonials(sample: { testimonials?: unknown[]; testimonialGovernanceVersion?: number }) {
  const testimonials = Array.isArray(sample.testimonials) ? sample.testimonials : [];
  if (sample.testimonialGovernanceVersion === 1) {
    return testimonials.map(publicTestimonial);
  }
  // Legacy records are preserved. Internal references are never sent to the public API.
  return testimonials.map((testimonial) => {
    if (!testimonial || typeof testimonial !== "object") return testimonial;
    const { internalReference: _internalReference, ...safe } = testimonial as Record<string, unknown>;
    return safe;
  });
}

router.get("/work", async (_req, res) => {
  const samples = await publishedWorkSummaries();
  res.json(samples.map(repairPublicWorkSample).map((sample) => ({
    ...sample,
    testimonials: publicTestimonials(sample),
    hasFile: sample.fileSize > 0,
  })));
});

router.get("/work/:slug/file", async (req, res) => {
  const slug = String(req.params["slug"] ?? "");
  const publicSample = (await publishedWork()).find((sample) => sample.slug === slug);
  if (!publicSample || publicSample.fileSize <= 0) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const sample = await publishedWorkFileBySlug(slug);
  if (!sample?.fileData) {
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
  const sample = await publishedWorkBySlug(String(req.params["slug"] ?? ""));
  if (!sample?.published) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({
    ...repairPublicWorkSample(sample),
    testimonials: publicTestimonials(sample),
    hasFile: sample.fileSize > 0,
  });
});

router.get("/admin/work", requireAdmin, async (req, res) => {
  const samples = await db
    .select(adminWorkSummaryColumns)
    .from(workSamplesTable)
    .orderBy(desc(workSamplesTable.createdAt), desc(workSamplesTable.id))
    .limit(ADMIN_PAGE_SIZE + 1)
    .offset(adminPageOffset(req.query.offset));
  res.json({
    items: samples.slice(0, ADMIN_PAGE_SIZE).map((sample) => ({ ...sample, hasFile: sample.fileSize > 0 })),
    hasMore: samples.length > ADMIN_PAGE_SIZE,
  });
});

router.get("/admin/work/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [sample] = await db
    .select(adminColumns)
    .from(workSamplesTable)
    .where(eq(workSamplesTable.id, id))
    .limit(1);
  if (!sample) {
    res.status(404).json({ error: "Work sample not found" });
    return;
  }
  res.json({ ...sample, hasFile: sample.fileSize > 0 });
});

router.post("/admin/work", requireAdmin, async (req, res) => {
  try {
    const requestedPublished =
      req.body?.published === true || req.body?.published === "true";
    const draftValues = parseWorkSampleInput(
      requestedPublished ? { ...req.body, published: false } : req.body,
    );
    let values = draftValues;
    let linkValues = {};
    if (requestedPublished) {
      const translationInput = restoreBlankSeoMetadata(draftValues, req.body);
      const translation = await translateWorkForPublishing(translationInput);
      values = parseWorkSampleInput({
        ...draftValues,
        ...translation,
        published: true,
      });
      if (!hasCompleteWorkTranslation(values)) {
        throw new WorkInputError(
          "Published work samples require complete English and Arabic content",
        );
      }
      const assignment = await assignInternalLinks({
        kind: "work",
        slug: values.slug,
        title: values.titleEn || values.titleAr || "",
        summary: values.summaryEn || values.summaryAr || "",
        body: [
          values.challengeEn,
          values.challengeAr,
          values.approachEn,
          values.approachAr,
          values.outcomeEn,
          values.outcomeAr,
        ].join(" "),
      });
      linkValues = {
        relatedServiceSlugs: assignment.relatedServiceSlugs,
        relatedBlogSlugs: assignment.relatedBlogSlugs,
        relatedWorkSlugs: assignment.relatedWorkSlugs,
        aiLinksAssignedAt: new Date(),
      };
    }
    const [sample] = await withPublicContentMutation(() => db
      .insert(workSamplesTable)
      .values({ ...values, ...linkValues })
      .returning(adminColumns), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
    if (sample.published) {
      await invalidatePublicResponseCache();
      notifyWorkPublished(sample.slug);
    }
    res.status(201).json({ ...sample, hasFile: sample.fileSize > 0 });
  } catch (error) {
    if (error instanceof WorkInputError) {
      res.status(400).json({ error: error.message });
      return;
    }
    if (error instanceof ContentTranslationError) {
      res.status(502).json({ error: error.message });
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
    const requestedPublished =
      req.body?.published === true || req.body?.published === "true";
    const draftValues = parseWorkSampleInput(
      requestedPublished ? { ...req.body, published: false } : req.body,
      { existingSlug: before.slug, existingFile: before, existingTestimonials: before },
    );
    let values = draftValues;
    let linkValues = {};
    if (requestedPublished) {
      const translationInput = restoreBlankSeoMetadata(draftValues, req.body);
      const translation = await translateWorkForPublishing(translationInput);
      values = parseWorkSampleInput(
        { ...draftValues, ...translation, published: true },
        { existingSlug: before.slug, existingFile: before, existingTestimonials: before },
      );
      if (!hasCompleteWorkTranslation(values)) {
        throw new WorkInputError(
          "Published work samples require complete English and Arabic content",
        );
      }
      if (!before.published) {
        const assignment = await assignInternalLinks({
          kind: "work",
          slug: values.slug,
          title: values.titleEn || values.titleAr || "",
          summary: values.summaryEn || values.summaryAr || "",
          body: [
            values.challengeEn,
            values.challengeAr,
            values.approachEn,
            values.approachAr,
            values.outcomeEn,
            values.outcomeAr,
          ].join(" "),
        });
        linkValues = {
          relatedServiceSlugs: assignment.relatedServiceSlugs,
          relatedBlogSlugs: assignment.relatedBlogSlugs,
          relatedWorkSlugs: assignment.relatedWorkSlugs,
          aiLinksAssignedAt: new Date(),
        };
      }
    }
    const [sample] = await withPublicContentMutation(() => db
      .update(workSamplesTable)
      .set({ ...values, ...linkValues, updatedAt: new Date() })
      .where(eq(workSamplesTable.id, id))
      .returning(adminColumns), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
    if (!sample) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (sample.published) {
      await invalidatePublicResponseCache();
      notifyWorkPublished(sample.slug);
    } else if (before.published) {
      await invalidatePublicResponseCache();
      notifyWorkRemoved(sample.slug);
    }
    res.json({ ...sample, hasFile: sample.fileSize > 0 });
  } catch (error) {
    if (error instanceof WorkInputError) {
      res.status(400).json({ error: error.message });
      return;
    }
    if (error instanceof ContentTranslationError) {
      res.status(502).json({ error: error.message });
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
  const [deleted] = await withPublicContentMutation(() => db
    .delete(workSamplesTable)
    .where(eq(workSamplesTable.id, id))
    .returning({ slug: workSamplesTable.slug, published: workSamplesTable.published }), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (deleted.published) {
    await invalidatePublicResponseCache();
    notifyWorkRemoved(deleted.slug);
  }
  res.json({ deleted: true });
});

export default router;
