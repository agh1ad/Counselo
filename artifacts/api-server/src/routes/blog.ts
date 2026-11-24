import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";
import { adminLoginHandler, adminLoginLimiter } from "../middlewares/admin-login.js";
import {
  notifyPublished,
  notifyRemoved,
} from "../lib/google-indexing.js";
import {
  BlogInputError,
  parseBlogLegalReviewDate,
  parseBlogPostInput,
  parsePositiveId,
  sanitizeBlogPost,
} from "../lib/blog-input.js";
import { assignInternalLinks } from "../lib/internal-link-assignment.js";
import {
  ARTICLE_CONTEXT,
  articleLegalReviewFields,
  assignArticleProvenance,
  confirmedArticleReviewDate,
  hasQualityBilingualBlogContent,
} from "@workspace/api-zod";
import {
  ContentTranslationError,
  hasCompleteBlogTranslation,
  restoreBlankSeoMetadata,
  translateBlogForPublishing,
} from "../lib/content-translation.js";
import { withPublicContentMutation } from "../lib/publication-cache.js";
import { invalidatePublicResponseCache } from "../lib/public-response-cache.js";
import { repairPublicBlogPost } from "../lib/public-blog-repairs.js";

import { publishedBlogBySlug, publishedBlogs } from "../lib/published-content.js";

const router = Router();
const ADMIN_PAGE_SIZE = 50;

const adminBlogSummaryColumns = {
  id: blogPostsTable.id,
  slug: blogPostsTable.slug,
  date: blogPostsTable.date,
  categoryEn: blogPostsTable.categoryEn,
  categoryAr: blogPostsTable.categoryAr,
  titleEn: blogPostsTable.titleEn,
  titleAr: blogPostsTable.titleAr,
  published: blogPostsTable.published,
  contentType: blogPostsTable.contentType,
  createdAt: blogPostsTable.createdAt,
};

function adminPageOffset(value: unknown): number {
  const parsed = typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : 0;
}

function serializePublicBlogPost(post: typeof blogPostsTable.$inferSelect) {
  const reviewDate = confirmedArticleReviewDate(post, ARTICLE_CONTEXT[post.slug]?.editorialUpdatedAt);
  return sanitizeBlogPost({
    ...post,
    legalReviewerUrl: reviewDate ? post.legalReviewerUrl : "",
    lastSubstantiveReviewAt: reviewDate ?? "",
  });
}

router.get("/blog/posts", async (_req, res) => {
  const posts = await publishedBlogs();
  res.json(
    posts
      .map(repairPublicBlogPost)
      .filter(hasQualityBilingualBlogContent)
      .map(serializePublicBlogPost),
  );
});

router.get("/blog/posts/discovery", async (_req, res) => {
  // Reuse the shared published snapshot; return only discovery fields below.
  const posts = await publishedBlogs();
  res.json(
    posts
      .map(repairPublicBlogPost)
      .filter(hasQualityBilingualBlogContent)
      .map((post) => ({
        id: post.id,
        slug: post.slug,
        date: post.date,
        updatedAt: post.updatedAt,
        categoryEn: post.categoryEn,
        categoryAr: post.categoryAr,
        readTime: post.readTime,
        titleEn: post.titleEn,
        titleAr: post.titleAr,
        excerptEn: post.excerptEn,
        excerptAr: post.excerptAr,
        seoTitleEn: post.seoTitleEn,
        seoTitleAr: post.seoTitleAr,
        seoDescriptionEn: post.seoDescriptionEn,
        seoDescriptionAr: post.seoDescriptionAr,
        relatedServiceSlugs: post.relatedServiceSlugs,
        relatedBlogSlugs: post.relatedBlogSlugs,
        relatedWorkSlugs: post.relatedWorkSlugs,
        published: true,
        bilingual: true,
      })),
  );
});

router.get("/blog/posts/:slug", async (req, res) => {
  const { slug } = req.params;
  const post = await publishedBlogBySlug(slug);
  const repairedPost = post ? repairPublicBlogPost(post) : undefined;
  if (!repairedPost || !repairedPost.published || !hasQualityBilingualBlogContent(repairedPost)) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(serializePublicBlogPost(repairedPost));
});

router.post("/admin/auth", adminLoginLimiter, adminLoginHandler);

router.get("/admin/blog/posts", requireAdmin, async (req, res) => {
  const posts = await db
    .select(adminBlogSummaryColumns)
    .from(blogPostsTable)
    .orderBy(desc(blogPostsTable.createdAt), desc(blogPostsTable.id))
    .limit(ADMIN_PAGE_SIZE + 1)
    .offset(adminPageOffset(req.query.offset));
  const hasMore = posts.length > ADMIN_PAGE_SIZE;
  res.json({
    items: posts.slice(0, ADMIN_PAGE_SIZE),
    hasMore,
  });
});

router.get("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [post] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.id, id))
    .limit(1);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(sanitizeBlogPost(post));
});

router.post("/admin/blog/posts", requireAdmin, async (req, res) => {
  try {
    const requestedPublished =
      req.body?.published === true || req.body?.published === "true";
    const draftValues = parseBlogPostInput(
      requestedPublished ? { ...req.body, published: false } : req.body,
    );
    let values = draftValues;
    let linkValues = {};
    if (requestedPublished) {
      const translationInput = restoreBlankSeoMetadata(draftValues, req.body);
      const translation = await translateBlogForPublishing(translationInput);
      values = parseBlogPostInput({
        ...draftValues,
        ...translation,
        published: true,
      });
      if (!hasCompleteBlogTranslation(values)) {
        throw new BlogInputError(
          "Published blog posts require complete English and Arabic content",
        );
      }
      const assignment = await assignInternalLinks({
        kind: "blog",
        slug: values.slug,
        title: values.titleEn || values.titleAr || "",
        summary: values.excerptEn || values.excerptAr || "",
        body:
          values.bodyEn ||
          values.bodyAr ||
          JSON.stringify(
            values.contentEn?.length ? values.contentEn : values.contentAr,
          ),
      });
      linkValues = {
        relatedServiceSlugs: assignment.relatedServiceSlugs,
        relatedBlogSlugs: assignment.relatedBlogSlugs,
        relatedWorkSlugs: assignment.relatedWorkSlugs,
        aiLinksAssignedAt: new Date(),
        ...assignArticleProvenance(values),
      };
    }
    const [post] = await withPublicContentMutation(() => db
      .insert(blogPostsTable)
      .values({ ...values, ...linkValues, ...articleLegalReviewFields("") })
      .returning(), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
    if (post.published) {
      await invalidatePublicResponseCache();
      notifyPublished(post.slug);
    }
    res.status(201).json(sanitizeBlogPost(post));
  } catch (error) {
    if (error instanceof BlogInputError) {
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

router.put("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params["id"]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [before] = await db
    .select({
      slug: blogPostsTable.slug,
      published: blogPostsTable.published,
      titleEn: blogPostsTable.titleEn,
      titleAr: blogPostsTable.titleAr,
      bodyEn: blogPostsTable.bodyEn,
      bodyAr: blogPostsTable.bodyAr,
      contentEn: blogPostsTable.contentEn,
      contentAr: blogPostsTable.contentAr,
      contentType: blogPostsTable.contentType,
      legalReviewerName: blogPostsTable.legalReviewerName,
      legalReviewerNameAr: blogPostsTable.legalReviewerNameAr,
      legalReviewerUrl: blogPostsTable.legalReviewerUrl,
      lastSubstantiveReviewAt: blogPostsTable.lastSubstantiveReviewAt,
      revision: sql<string>`${blogPostsTable.updatedAt}::text`,
    })
    .from(blogPostsTable)
    .where(eq(blogPostsTable.id, id));
  if (!before) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  try {
    const requestedPublished =
      req.body?.published === true || req.body?.published === "true";
    const draftValues = parseBlogPostInput(
      requestedPublished ? { ...req.body, published: false } : req.body,
      { existingSlug: before.slug },
    );
    let values = draftValues;
    let linkValues = {};
    if (requestedPublished) {
      const translationInput = restoreBlankSeoMetadata(draftValues, req.body);
      const translation = await translateBlogForPublishing(translationInput);
      values = parseBlogPostInput(
        { ...draftValues, ...translation, published: true },
        { existingSlug: before.slug },
      );
      if (!hasCompleteBlogTranslation(values)) {
        throw new BlogInputError(
          "Published blog posts require complete English and Arabic content",
        );
      }
      if (!before.published) {
        const assignment = await assignInternalLinks({
          kind: "blog",
          slug: values.slug,
          title: values.titleEn || values.titleAr || "",
          summary: values.excerptEn || values.excerptAr || "",
          body:
            values.bodyEn ||
            values.bodyAr ||
            JSON.stringify(
              values.contentEn?.length ? values.contentEn : values.contentAr,
            ),
        });
        linkValues = {
          relatedServiceSlugs: assignment.relatedServiceSlugs,
          relatedBlogSlugs: assignment.relatedBlogSlugs,
          relatedWorkSlugs: assignment.relatedWorkSlugs,
          aiLinksAssignedAt: new Date(),
          ...assignArticleProvenance({ ...values, updatedAt: new Date() }),
        };
      }
    }
    const contentChanged = values.titleEn !== before.titleEn || values.titleAr !== before.titleAr
      || values.bodyEn !== before.bodyEn || values.bodyAr !== before.bodyAr
      || values.contentType !== before.contentType
      || JSON.stringify(values.contentEn) !== JSON.stringify(before.contentEn)
      || JSON.stringify(values.contentAr) !== JSON.stringify(before.contentAr);
    const legalReview = contentChanged
      ? articleLegalReviewFields("")
      : {
        legalReviewerName: before.legalReviewerName,
        legalReviewerNameAr: before.legalReviewerNameAr,
        legalReviewerUrl: before.legalReviewerUrl,
        lastSubstantiveReviewAt: before.lastSubstantiveReviewAt,
      };
    const [post] = await withPublicContentMutation(() => db
      .update(blogPostsTable)
      .set({ ...values, ...linkValues, ...legalReview, updatedAt: new Date() })
      .where(and(
        eq(blogPostsTable.id, id),
        sql`${blogPostsTable.updatedAt}::text = ${before.revision}`,
        eq(blogPostsTable.lastSubstantiveReviewAt, before.lastSubstantiveReviewAt),
        eq(blogPostsTable.legalReviewerUrl, before.legalReviewerUrl),
      ))
      .returning(), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
    if (!post) {
      res.status(409).json({ error: "The post changed while it was being saved. Reload it and try again." });
      return;
    }
    if (post.published) {
      await invalidatePublicResponseCache();
      // Covers first publication and substantive updates; the live sitemap also
      // exposes updatedAt immediately.
      notifyPublished(post.slug);
    } else if (before.published) {
      await invalidatePublicResponseCache();
      notifyRemoved(post.slug);
    }
    res.json(sanitizeBlogPost(post));
  } catch (error) {
    if (error instanceof BlogInputError) {
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

router.put("/admin/blog/posts/:id/legal-review", requireAdmin, async (req, res) => {
  try {
    const id = parsePositiveId(req.params["id"]);
    const reviewDate = parseBlogLegalReviewDate(req.body);
    if (reviewDate === undefined) throw new BlogInputError("A legal review date is required");
    const [before] = await db
      .select({ post: blogPostsTable, revision: sql<string>`${blogPostsTable.updatedAt}::text` })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, id));
    if (!before) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    if (req.body.expectedUpdatedAt !== before.post.updatedAt.toISOString()) {
      res.status(409).json({ error: "The article changed. Reload and review the saved version." });
      return;
    }
    if (reviewDate && (!before.post.published || !hasQualityBilingualBlogContent(before.post))) {
      throw new BlogInputError("Publish and review both language versions before recording a legal review");
    }
    const correctionDate = ARTICLE_CONTEXT[before.post.slug]?.editorialUpdatedAt;
    if (reviewDate && correctionDate && reviewDate < correctionDate) {
      throw new BlogInputError("The review date must cover the current published version");
    }
    const [post] = await withPublicContentMutation(() => db
      .update(blogPostsTable)
      .set(articleLegalReviewFields(reviewDate))
      .where(and(eq(blogPostsTable.id, id), sql`${blogPostsTable.updatedAt}::text = ${before.revision}`))
      .returning(), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
    if (!post) {
      res.status(409).json({ error: "The article changed. Reload and review the saved version." });
      return;
    }
    if (post.published) await invalidatePublicResponseCache();
    res.json(sanitizeBlogPost(post));
  } catch (error) {
    if (error instanceof BlogInputError) {
      res.status(400).json({ error: error.message });
      return;
    }
    throw error;
  }
});

router.delete("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params["id"]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [deleted] = await withPublicContentMutation(() => db
    .delete(blogPostsTable)
    .where(eq(blogPostsTable.id, id))
    .returning({
      id: blogPostsTable.id,
      slug: blogPostsTable.slug,
      published: blogPostsTable.published,
    }), () => res.setHeader("X-CounselO-Cache-Status", "bypass"));
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (deleted.published) {
    await invalidatePublicResponseCache();
    notifyRemoved(deleted.slug);
  }
  res.json({ deleted: true });
});

export default router;
