import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";
import { notifyGoogleUrls, notifyPublished } from "../lib/google-indexing.js";

const router = Router();

router.get("/blog/posts", async (_req, res) => {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true))
    .orderBy(blogPostsTable.date);
  res.json(posts.reverse());
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
  res.json(post);
});

router.post("/admin/auth", (req, res) => {
  const adminPassword = process.env["ADMIN_PASSWORD"];
  if (!adminPassword) {
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }
  const { password } = req.body as { password?: string };
  if (password === adminPassword) {
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
  res.json(posts.reverse());
});

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractBody(body: Record<string, unknown>) {
  const titleEn = String(body["titleEn"] ?? "");
  const titleAr = String(body["titleAr"] ?? "");
  const bodyEn = String(body["bodyEn"] ?? "");
  const bodyAr = String(body["bodyAr"] ?? "");
  const plainEn = stripHtml(bodyEn);
  const plainAr = stripHtml(bodyAr);

  return {
    slug: String(body["slug"] ?? ""),
    date: String(body["date"] ?? new Date().toISOString().slice(0, 10)),
    categoryEn: String(body["categoryEn"] ?? ""),
    categoryAr: String(body["categoryAr"] ?? ""),
    readTime: Number(body["readTime"] ?? 5),
    titleEn,
    titleAr,
    // Auto-fill excerpt from body if the admin left it blank
    excerptEn: String(body["excerptEn"] ?? "") || plainEn.slice(0, 250),
    excerptAr: String(body["excerptAr"] ?? "") || plainAr.slice(0, 250),
    // Auto-fill SEO title from article title if blank
    seoTitleEn: String(body["seoTitleEn"] ?? "") || titleEn,
    seoTitleAr: String(body["seoTitleAr"] ?? "") || titleAr,
    // Auto-fill SEO description from body plain text if blank
    seoDescriptionEn: String(body["seoDescriptionEn"] ?? "") || plainEn.slice(0, 160),
    seoDescriptionAr: String(body["seoDescriptionAr"] ?? "") || plainAr.slice(0, 160),
    bodyEn,
    bodyAr,
    contentEn: (body["contentEn"] as never[]) ?? [],
    contentAr: (body["contentAr"] as never[]) ?? [],
    published: body["published"] === true || body["published"] === "true",
  };
}

router.post("/admin/blog/posts", requireAdmin, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const [post] = await db
    .insert(blogPostsTable)
    .values(extractBody(body))
    .returning();
  if (post.published) {
    notifyPublished(post.slug);
  }
  res.status(201).json(post);
});

router.put("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const body = req.body as Record<string, unknown>;
  const [before] = await db
    .select({ published: blogPostsTable.published })
    .from(blogPostsTable)
    .where(eq(blogPostsTable.id, id));
  const [post] = await db
    .update(blogPostsTable)
    .set({ ...extractBody(body), updatedAt: new Date() })
    .where(eq(blogPostsTable.id, id))
    .returning();
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (post.published && !before?.published) {
    notifyPublished(post.slug);
  }
  res.json(post);
});

router.delete("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
  res.json({ deleted: true });
});

router.post("/admin/reindex-all", requireAdmin, async (_req, res) => {
  try {
    const sitemapRes = await fetch("https://counselo-legal.com/sitemap.xml");
    if (!sitemapRes.ok) {
      res.status(502).json({ error: `Failed to fetch sitemap: HTTP ${sitemapRes.status}` });
      return;
    }
    const xml = await sitemapRes.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    void notifyGoogleUrls(urls);
    res.json({ queued: urls.length });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
