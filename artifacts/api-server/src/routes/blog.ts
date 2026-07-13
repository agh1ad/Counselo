import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin, secretsMatch } from "../middlewares/auth.js";
import { notifyGoogleUrls, notifyPublished } from "../lib/google-indexing.js";
import {
  BlogInputError,
  parseBlogPostInput,
  parsePositiveId,
  sanitizeBlogPost,
} from "../lib/blog-input.js";

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
    const [post] = await db
      .insert(blogPostsTable)
      .values(parseBlogPostInput(req.body))
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
  let values;
  try {
    values = parseBlogPostInput(req.body, { existingSlug: before.slug });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    return;
  }
  const [post] = await db
    .update(blogPostsTable)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(blogPostsTable.id, id))
    .returning();
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (post.published && !before?.published) {
    notifyPublished(post.slug);
  }
  res.json(sanitizeBlogPost(post));
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
    .returning({ id: blogPostsTable.id });
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ deleted: true });
});

router.post("/admin/reindex-all", requireAdmin, async (_req, res) => {
  try {
    const sitemapRes = await fetch("https://counselo-legal.com/sitemap.xml");
    if (!sitemapRes.ok) {
      res
        .status(502)
        .json({ error: `Failed to fetch sitemap: HTTP ${sitemapRes.status}` });
      return;
    }
    const xml = await sitemapRes.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      m[1].trim(),
    );
    void notifyGoogleUrls(urls);
    res.json({ queued: urls.length });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
