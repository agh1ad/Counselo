import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin, secretsMatch } from "../middlewares/auth.js";
import {
  notifyPublished,
  notifyRemoved,
} from "../lib/google-indexing.js";
import {
  BlogInputError,
  parseBlogPostInput,
  parsePositiveId,
  sanitizeBlogPost,
} from "../lib/blog-input.js";
import { assignInternalLinks } from "../lib/internal-link-assignment.js";
import {
  ContentTranslationError,
  translateBlogForPublishing,
} from "../lib/content-translation.js";

const router = Router();

router.get("/blog/posts", async (_req, res) => {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true))
    .orderBy(blogPostsTable.date);
  res.json(posts.reverse().map(sanitizeBlogPost));
});

router.get("/blog/posts/:slug", async (req, res) => {
  const { slug } = req.params;
  const [post] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.slug, slug));
  if (!post || !post.published) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(sanitizeBlogPost(post));
});

router.post("/admin/auth", (req, res) => {
  const adminPassword = process.env["ADMIN_PASSWORD"];
  if (!adminPassword) {
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }
  const { password } = req.body as { password?: unknown };
  if (typeof password === "string" && secretsMatch(password, adminPassword)) {
    res.json({ token: adminPassword });
    return;
  }
  res.status(401).json({ error: "Wrong password" });
});

router.get("/admin/blog/posts", requireAdmin, async (_req, res) => {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .orderBy(blogPostsTable.createdAt);
  res.json(posts.reverse().map(sanitizeBlogPost));
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
      const translation = await translateBlogForPublishing(draftValues);
      values = parseBlogPostInput({
        ...draftValues,
        ...translation,
        published: true,
      });
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
      };
    }
    const [post] = await db
      .insert(blogPostsTable)
      .values({ ...values, ...linkValues })
      .returning();
    if (post.published) {
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
    .select({ slug: blogPostsTable.slug, published: blogPostsTable.published })
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
      const translation = await translateBlogForPublishing(draftValues);
      values = parseBlogPostInput(
        { ...draftValues, ...translation, published: true },
        { existingSlug: before.slug },
      );
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
        };
      }
    }
    const [post] = await db
      .update(blogPostsTable)
      .set({ ...values, ...linkValues, updatedAt: new Date() })
      .where(eq(blogPostsTable.id, id))
      .returning();
    if (!post) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (post.published) {
      // Covers first publication and substantive updates; the live sitemap also
      // exposes updatedAt immediately.
      notifyPublished(post.slug);
    } else if (before.published) {
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

router.delete("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  let id: number;
  try {
    id = parsePositiveId(req.params["id"]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [deleted] = await db
    .delete(blogPostsTable)
    .where(eq(blogPostsTable.id, id))
    .returning({
      id: blogPostsTable.id,
      slug: blogPostsTable.slug,
      published: blogPostsTable.published,
    });
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (deleted.published) notifyRemoved(deleted.slug);
  res.json({ deleted: true });
});

export default router;
