import { type Express, type Request, type Response } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
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
const DEFAULT_OG_IMAGE = "https://counselo-legal.com/og-image.png";
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
  // Include the canonical here so the static HTML served to crawlers has the
  // correct canonical. Without this, the prerendered index.html canonical
  // (https://counselo-legal.com/) would conflict with og:url, causing
  // "Multiple conflicting canonical URLs" in Google Search Console.
  const ogTags = `\n    <title>${esc(title)}</title>
    <link rel="canonical" href="${esc(url)}" />
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

  // Strip the prerendered root canonical from index.html — it belongs to the
  // region-picker page ("/"), not to this CMS blog post. We inject the correct
  // canonical above via ogTags, so removing the stale one prevents both the
  // static-HTML conflict Google sees and the client-side duplicate after hydration.
  const stripped = indexHtml.replace(/<link[^>]*\brel=["']canonical["'][^>]*\/?>/gi, "");

  // Inject page-specific tags immediately after <head>. Crawlers that use the
  // first occurrence of each og:* / canonical take the injected values.
  return stripped.replace("<head>", `<head>${ogTags}`);
}

/**
 * Convert a URL path to its flat prerendered filename.
 * e.g. "/sa/services/family-law" → "sa-services-family-law.html"
 */
function pathToPrerenderedFile(urlPath: string): string {
  return `${urlPath.slice(1).replace(/\//g, "-")}.html`;
}

/**
 * Try to find and return a prerendered HTML file for the given path.
 * Returns the absolute file path if it exists, null otherwise.
 */
function findPrerenderedFile(urlPath: string): string | null {
  const fileName = pathToPrerenderedFile(urlPath);
  const filePath = path.join(LEGAL_DIST, "__pages", fileName);
  return fs.existsSync(filePath) ? filePath : null;
}

const IS_DEV = process.env.NODE_ENV !== "production";
// Vite dev server port for the legal-site artifact
const VITE_PORT = parseInt(process.env.LEGAL_SITE_DEV_PORT ?? "24438", 10);

/**
 * In development, proxy the request to the Vite dev server so the full
 * HMR / React dev experience is preserved. In production the Vite server
 * does not run — we serve the prerendered files directly.
 */
function proxyToVite(req: Request, res: Response): void {
  const options: http.RequestOptions = {
    hostname: "localhost",
    port: VITE_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `localhost:${VITE_PORT}` },
  };
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode ?? 200, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxyReq.on("error", () => {
    res.status(503).send("Legal-site dev server not ready — is the legal-site workflow running?");
  });
  req.pipe(proxyReq, { end: true });
}

export function registerOgPageRoutes(app: Express): void {
  /**
   * Unified handler for all /sa/* and /syr/* paths.
   *
   * In development: proxy to the Vite dev server (port 24438) so HMR
   * and client-side React work normally.
   *
   * In production — priority order:
   *   1. Serve the prerendered flat file if it exists — it already has
   *      page-specific OG tags injected by the prerender pipeline.
   *   2. For blog post paths: look up the post in the DB and inject OG tags
   *      (handles CMS-created posts that aren't prerendered).
   *   3. Fall back to index.html for any completely unknown path.
   */
  app.get(["/sa{/*path}", "/syr{/*path}"], async (req, res) => {
    // ── Dev mode: proxy to Vite ──────────────────────────────────────────────
    if (IS_DEV) {
      proxyToVite(req, res);
      return;
    }

    const reqPath = req.path;

    // ── 1. Prerendered file ──────────────────────────────────────────────────
    const prerenderedFile = findPrerenderedFile(reqPath);
    if (prerenderedFile) {
      res.sendFile(prerenderedFile);
      return;
    }

    // ── 2. CMS blog post (not prerendered) ──────────────────────────────────
    const blogMatch = reqPath.match(/^\/(sa|syr)(?:\/ar)?\/blog\/([^/]+)$/);
    if (blogMatch) {
      const slug = String(blogMatch[2]);
      const isArabic = reqPath.includes("/ar/blog/");
      const lang = isArabic ? "ar" : "en";
      const fullUrl = `https://counselo-legal.com${reqPath}`;

      try {
        const [post] = await db
          .select()
          .from(blogPostsTable)
          .where(eq(blogPostsTable.slug, slug));

        if (post && post.published) {
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
          return;
        }
      } catch (err) {
        logger.error({ err }, "Error serving OG blog page");
      }
    }

    // ── 3. Fallback: SPA shell ───────────────────────────────────────────────
    const indexHtml = getIndexHtml();
    if (indexHtml) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(indexHtml);
    } else {
      res.status(503).send("Service starting up…");
    }
  });
}
