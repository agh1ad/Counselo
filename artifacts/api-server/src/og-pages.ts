import { type Express } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { logger } from "./lib/logger.js";

// In production, the process runs from workspace root.
// In dev, pnpm runs the script from the package dir (artifacts/api-server/).
// Try both so the path resolves correctly in both environments.
function findLegalDist(): string {
  const fromRoot = path.join(process.cwd(), "artifacts/legal-site/dist/public");
  if (fs.existsSync(path.join(fromRoot, "index.html"))) return fromRoot;
  // dev: CWD is artifacts/api-server/, so go up two levels to workspace root
  return path.resolve(process.cwd(), "../../artifacts/legal-site/dist/public");
}
const LEGAL_DIST = findLegalDist();
const DEFAULT_OG_IMAGE = "https://counselo-legal.com/logo.png";
const SITE_NAME = "CounselO";

let indexHtmlCache: string | null = null;

function getIndexHtml(): string | null {
  if (indexHtmlCache !== null) return indexHtmlCache;
  try {
    const content = fs.readFileSync(
      path.join(LEGAL_DIST, "index.html"),
      "utf-8",
    );
    indexHtmlCache = content;
    return indexHtmlCache;
  } catch {
    return null; // Don't cache null — retry on next request
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildOgHtml(
  title: string,
  description: string,
  url: string,
  lang: string,
): string {
  const locale = lang === "ar" ? "ar_SA" : "en_US";
  const ogTags = `\n    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="${locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`;

  const indexHtml = getIndexHtml();
  if (!indexHtml) {
    return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8" />${ogTags}</head><body><div id="root"></div></body></html>`;
  }
  // Inject OG tags immediately after <head> so they appear FIRST in the document.
  // Social media crawlers (Facebook, WhatsApp) use the first occurrence of each
  // og:* property — this ensures blog-post tags take priority over any
  // homepage-level tags that the prerendered index.html already contains.
  return indexHtml.replace("<head>", `<head>${ogTags}`);
}

export function registerOgPageRoutes(app: Express): void {
  const BLOG_LISTING_PATHS = [
    "/sa/blog",
    "/sa/ar/blog",
    "/syr/blog",
    "/syr/ar/blog",
  ];

  const BLOG_DETAIL_PATHS = [
    "/sa/blog/:slug",
    "/sa/ar/blog/:slug",
    "/syr/blog/:slug",
    "/syr/ar/blog/:slug",
  ];

  app.get(BLOG_LISTING_PATHS, (req, res) => {
    const fileName = req.path.slice(1).replace(/\//g, "-") + ".html";
    const filePath = path.join(LEGAL_DIST, "__pages", fileName);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      return;
    }
    const indexHtml = getIndexHtml();
    if (indexHtml) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(indexHtml);
    } else {
      res.status(503).send("Service starting up…");
    }
  });

  app.get(BLOG_DETAIL_PATHS, async (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    const isArabic = req.path.includes("/ar/blog/");
    const lang = isArabic ? "ar" : "en";
    const fullUrl = `https://counselo-legal.com${req.path}`;

    try {
      const [post] = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.slug, slug));

      if (!post || !post.published) {
        const indexHtml = getIndexHtml();
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(indexHtml ?? "Not found");
        return;
      }

      // Fall back cross-language if the requested language's fields are empty
      const title =
        lang === "ar"
          ? post.seoTitleAr || post.titleAr || post.seoTitleEn || post.titleEn || SITE_NAME
          : post.seoTitleEn || post.titleEn || post.seoTitleAr || post.titleAr || SITE_NAME;
      const description =
        lang === "ar"
          ? post.seoDescriptionAr || post.excerptAr || post.seoDescriptionEn || post.excerptEn || ""
          : post.seoDescriptionEn || post.excerptEn || post.seoDescriptionAr || post.excerptAr || "";

      const html = buildOgHtml(title, description, fullUrl, lang);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    } catch (err) {
      logger.error({ err }, "Error serving OG blog page");
      const indexHtml = getIndexHtml();
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(indexHtml ?? "Server error");
    }
  });
}
