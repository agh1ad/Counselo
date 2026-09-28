import { Router, type Response } from "express";
import { and, eq } from "drizzle-orm";
import {
  blogPostsTable,
  db,
  workSamplesTable,
  type InsertWorkSample,
} from "@workspace/db";
import { requireAdmin } from "../middlewares/auth.js";
import {
  BlogInputError,
  parseBlogPostInput,
} from "../lib/blog-input.js";
import {
  ContentTranslationError,
  getBlogTranslationGaps,
  getWorkTranslationGaps,
  hasCompleteBlogTranslation,
  hasCompleteWorkTranslation,
  translateBlogForPublishing,
  translateWorkForPublishing,
} from "../lib/content-translation.js";
import { WorkInputError } from "../lib/work-input.js";
import { notifyPublished, notifyWorkPublished } from "../lib/google-indexing.js";
import { withPublicContentMutation } from "../lib/publication-cache.js";
import { invalidatePublicResponseCache } from "../lib/public-response-cache.js";

const router = Router();

const workTranslationColumns = {
  id: workSamplesTable.id,
  slug: workSamplesTable.slug,
  published: workSamplesTable.published,
  updatedAt: workSamplesTable.updatedAt,
  titleEn: workSamplesTable.titleEn,
  titleAr: workSamplesTable.titleAr,
  summaryEn: workSamplesTable.summaryEn,
  summaryAr: workSamplesTable.summaryAr,
  workTypeEn: workSamplesTable.workTypeEn,
  workTypeAr: workSamplesTable.workTypeAr,
  jurisdictionEn: workSamplesTable.jurisdictionEn,
  jurisdictionAr: workSamplesTable.jurisdictionAr,
  clientTypeEn: workSamplesTable.clientTypeEn,
  clientTypeAr: workSamplesTable.clientTypeAr,
  challengeEn: workSamplesTable.challengeEn,
  challengeAr: workSamplesTable.challengeAr,
  approachEn: workSamplesTable.approachEn,
  approachAr: workSamplesTable.approachAr,
  outcomeEn: workSamplesTable.outcomeEn,
  outcomeAr: workSamplesTable.outcomeAr,
  seoTitleEn: workSamplesTable.seoTitleEn,
  seoTitleAr: workSamplesTable.seoTitleAr,
  seoDescriptionEn: workSamplesTable.seoDescriptionEn,
  seoDescriptionAr: workSamplesTable.seoDescriptionAr,
};

type RepairKind = "blog" | "work";

function repairError(
  res: Response,
  error: unknown,
): boolean {
  if (error instanceof ContentTranslationError) {
    res.status(502).json({ error: error.message });
    return true;
  }
  if (error instanceof BlogInputError || error instanceof WorkInputError) {
    res.status(422).json({ error: error.message });
    return true;
  }
  return false;
}

router.get("/admin/translations/audit", requireAdmin, async (_req, res) => {
  const [blogs, work] = await Promise.all([
    db.select().from(blogPostsTable).where(eq(blogPostsTable.published, true)),
    db
      .select(workTranslationColumns)
      .from(workSamplesTable)
      .where(eq(workSamplesTable.published, true)),
  ]);

  const items = [
    ...blogs.flatMap((post) => {
      const gaps = getBlogTranslationGaps(post);
      return gaps.length
        ? [{
            kind: "blog" as const,
            id: post.id,
            slug: post.slug,
            title: post.titleEn || post.titleAr || post.slug,
            gaps,
          }]
        : [];
    }),
    ...work.flatMap((sample) => {
      const gaps = getWorkTranslationGaps(sample);
      return gaps.length
        ? [{
            kind: "work" as const,
            id: sample.id,
            slug: sample.slug,
            title: sample.titleEn || sample.titleAr || sample.slug,
            gaps,
          }]
        : [];
    }),
  ];
  const sourceAbsent = work.flatMap((sample) => {
    const details = {
      kind: "work" as const,
      id: sample.id,
      slug: sample.slug,
      title: sample.titleEn || sample.titleAr || sample.slug,
    };
    return [
      ...(!sample.clientTypeEn?.trim() && !sample.clientTypeAr?.trim()
        ? [{ ...details, field: "client type" }]
        : []),
      ...(!sample.outcomeEn?.trim() && !sample.outcomeAr?.trim()
        ? [{ ...details, field: "outcome" }]
        : []),
    ];
  });

  res.json({
    audited: blogs.length + work.length,
    complete: items.length === 0,
    items,
    sourceAbsent,
  });
});

router.post("/admin/translations/backfill", requireAdmin, async (req, res) => {
  const kind = req.body?.kind as RepairKind | undefined;
  const id = Number(req.body?.id);
  if ((kind !== "blog" && kind !== "work") || !Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Provide a valid content kind and record id" });
    return;
  }

  try {
    if (kind === "blog") {
      const [post] = await db
        .select()
        .from(blogPostsTable)
        .where(and(eq(blogPostsTable.id, id), eq(blogPostsTable.published, true)))
        .limit(1);
      if (!post) {
        res.status(404).json({ error: "Published blog post not found" });
        return;
      }
      const gapsBefore = getBlogTranslationGaps(post);
      if (!gapsBefore.length) {
        res.json({ kind, id, slug: post.slug, updated: false, remainingGaps: [] });
        return;
      }

      const translation = await translateBlogForPublishing(post);
      const values = parseBlogPostInput(
        { ...post, ...translation, published: true },
        { existingSlug: post.slug },
      );
      const remainingGaps = getBlogTranslationGaps(values);
      if (!hasCompleteBlogTranslation(values)) {
        res.status(422).json({
          error: "Translation did not pass the bilingual completeness checks",
          remainingGaps,
        });
        return;
      }

      const [updated] = await withPublicContentMutation(() =>
        db
          .update(blogPostsTable)
          .set({
            categoryEn: values.categoryEn,
            categoryAr: values.categoryAr,
            titleEn: values.titleEn,
            titleAr: values.titleAr,
            excerptEn: values.excerptEn,
            excerptAr: values.excerptAr,
            seoTitleEn: values.seoTitleEn,
            seoTitleAr: values.seoTitleAr,
            seoDescriptionEn: values.seoDescriptionEn,
            seoDescriptionAr: values.seoDescriptionAr,
            bodyEn: values.bodyEn,
            bodyAr: values.bodyAr,
            contentEn: values.contentEn,
            contentAr: values.contentAr,
            updatedAt: new Date(),
          })
          .where(and(
            eq(blogPostsTable.id, id),
            eq(blogPostsTable.published, true),
            eq(blogPostsTable.categoryEn, post.categoryEn),
            eq(blogPostsTable.categoryAr, post.categoryAr),
            eq(blogPostsTable.titleEn, post.titleEn),
            eq(blogPostsTable.titleAr, post.titleAr),
            eq(blogPostsTable.excerptEn, post.excerptEn),
            eq(blogPostsTable.excerptAr, post.excerptAr),
            eq(blogPostsTable.seoTitleEn, post.seoTitleEn),
            eq(blogPostsTable.seoTitleAr, post.seoTitleAr),
            eq(blogPostsTable.seoDescriptionEn, post.seoDescriptionEn),
            eq(blogPostsTable.seoDescriptionAr, post.seoDescriptionAr),
            eq(blogPostsTable.bodyEn, post.bodyEn),
            eq(blogPostsTable.bodyAr, post.bodyAr),
            eq(blogPostsTable.contentEn, post.contentEn),
            eq(blogPostsTable.contentAr, post.contentAr),
          ))
          .returning({ id: blogPostsTable.id, slug: blogPostsTable.slug }),
      );
      if (!updated) {
        res.status(409).json({ error: "The post changed during repair; run the audit again" });
        return;
      }
      await invalidatePublicResponseCache();
      notifyPublished(updated.slug);
      res.json({ kind, id, slug: updated.slug, updated: true, remainingGaps: [] });
      return;
    }

    const [sample] = await db
      .select(workTranslationColumns)
      .from(workSamplesTable)
      .where(and(eq(workSamplesTable.id, id), eq(workSamplesTable.published, true)))
      .limit(1);
    if (!sample) {
      res.status(404).json({ error: "Published work sample not found" });
      return;
    }
    const gapsBefore = getWorkTranslationGaps(sample);
    if (!gapsBefore.length) {
      res.json({ kind, id, slug: sample.slug, updated: false, remainingGaps: [] });
      return;
    }

    const translation = await translateWorkForPublishing(
      sample as unknown as InsertWorkSample,
    );
    const merged = { ...sample, ...translation };
    const remainingGaps = getWorkTranslationGaps(merged);
    if (!hasCompleteWorkTranslation(merged)) {
      res.status(422).json({
        error: "Translation did not pass the bilingual completeness checks",
        remainingGaps,
      });
      return;
    }

    const [updated] = await withPublicContentMutation(() =>
      db
        .update(workSamplesTable)
        .set({
          ...translation,
          updatedAt: new Date(),
        })
        .where(and(
          eq(workSamplesTable.id, id),
          eq(workSamplesTable.published, true),
          eq(workSamplesTable.titleEn, sample.titleEn),
          eq(workSamplesTable.titleAr, sample.titleAr),
          eq(workSamplesTable.summaryEn, sample.summaryEn),
          eq(workSamplesTable.summaryAr, sample.summaryAr),
          eq(workSamplesTable.workTypeEn, sample.workTypeEn),
          eq(workSamplesTable.workTypeAr, sample.workTypeAr),
          eq(workSamplesTable.jurisdictionEn, sample.jurisdictionEn),
          eq(workSamplesTable.jurisdictionAr, sample.jurisdictionAr),
          eq(workSamplesTable.clientTypeEn, sample.clientTypeEn),
          eq(workSamplesTable.clientTypeAr, sample.clientTypeAr),
          eq(workSamplesTable.challengeEn, sample.challengeEn),
          eq(workSamplesTable.challengeAr, sample.challengeAr),
          eq(workSamplesTable.approachEn, sample.approachEn),
          eq(workSamplesTable.approachAr, sample.approachAr),
          eq(workSamplesTable.outcomeEn, sample.outcomeEn),
          eq(workSamplesTable.outcomeAr, sample.outcomeAr),
          eq(workSamplesTable.seoTitleEn, sample.seoTitleEn),
          eq(workSamplesTable.seoTitleAr, sample.seoTitleAr),
          eq(workSamplesTable.seoDescriptionEn, sample.seoDescriptionEn),
          eq(workSamplesTable.seoDescriptionAr, sample.seoDescriptionAr),
        ))
        .returning({ id: workSamplesTable.id, slug: workSamplesTable.slug }),
    );
    if (!updated) {
      res.status(409).json({ error: "The work sample changed during repair; run the audit again" });
      return;
    }
    await invalidatePublicResponseCache();
    notifyWorkPublished(updated.slug);
    res.json({ kind, id, slug: updated.slug, updated: true, remainingGaps: [] });
  } catch (error) {
    if (repairError(res, error)) return;
    throw error;
  }
});

export default router;