import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";

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

function extractBody(body: Record<string, unknown>) {
  return {
    slug: String(body["slug"] ?? ""),
    date: String(body["date"] ?? new Date().toISOString().slice(0, 10)),
    categoryEn: String(body["categoryEn"] ?? ""),
    categoryAr: String(body["categoryAr"] ?? ""),
    readTime: Number(body["readTime"] ?? 5),
    titleEn: String(body["titleEn"] ?? ""),
    titleAr: String(body["titleAr"] ?? ""),
    excerptEn: String(body["excerptEn"] ?? ""),
    excerptAr: String(body["excerptAr"] ?? ""),
    seoTitleEn: String(body["seoTitleEn"] ?? ""),
    seoTitleAr: String(body["seoTitleAr"] ?? ""),
    seoDescriptionEn: String(body["seoDescriptionEn"] ?? ""),
    seoDescriptionAr: String(body["seoDescriptionAr"] ?? ""),
    bodyEn: String(body["bodyEn"] ?? ""),
    bodyAr: String(body["bodyAr"] ?? ""),
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
  res.status(201).json(post);
});

router.put("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const body = req.body as Record<string, unknown>;
  const [post] = await db
    .update(blogPostsTable)
    .set({ ...extractBody(body), updatedAt: new Date() })
    .where(eq(blogPostsTable.id, id))
    .returning();
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(post);
});

router.delete("/admin/blog/posts/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
  res.json({ deleted: true });
});

export default router;
