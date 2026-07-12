/**
 * Production SSR server for the legal-site artifact.
 *
 * Replaces the plain static file server so that blog post pages (/blog/:slug)
 * are always rendered to full HTML on the first byte — even for posts
 * published after the last deployment, with no redeployment required.
 *
 * Routing priority (checked in order):
 *   1. Static assets (JS, CSS, images, fonts, …) from dist/public/
 *   2. Root "/" → index.html (prerendered homepage)
 *   3. "/blog/:slug" → prerendered __pages/blog-<slug>.html if it exists,
 *                      otherwise SSR render on-demand via entry-server.js
 *   4. Any other path → flat prerendered file __pages/<path-as-filename>.html
 *                       if it exists (e.g. /sa/about → sa-about.html)
 *   5. Catch-all → index.html (SPA hydration for unknown routes)
 */

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { RenderResult } from "./entry-server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Paths are relative to the compiled server location: dist/ssr-server.mjs
// dist/
//   public/           ← static client bundle + prerendered HTML
//     __pages/        ← flat prerendered HTML files
//     index.html      ← prerendered homepage / SPA shell
//   server/
//     entry-server.js ← SSR bundle (used for on-demand rendering)
const publicDir = resolve(__dirname, "public");
const pagesDir = resolve(publicDir, "__pages");
const indexHtml = resolve(publicDir, "index.html");
const shellHtml = resolve(__dirname, "ssr-template.html");
const ssrBundle = resolve(__dirname, "server/entry-server.js");

const PORT = parseInt(process.env.PORT ?? "24438", 10);

// API server port — the SSR server fetches blog post data directly from the
// API so it can build accurate meta tags without React async data fetching.
const apiOrigin = (
  process.env.API_ORIGIN ??
  (process.env.NODE_ENV === "production"
    ? "https://counselo-legal.com"
    : `http://localhost:${process.env.API_PORT ?? "8080"}`)
).replace(/\/$/, "");

// ---------------------------------------------------------------------------
// Blog post type (mirrors ApiPost in blog-post.tsx)
// ---------------------------------------------------------------------------

interface ApiPost {
  id: number;
  slug: string;
  date: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  bodyEn: string;
  bodyAr: string;
  categoryEn: string;
  categoryAr: string;
  readTime: number;
  published: boolean;
  updatedAt?: string;
}

// ---------------------------------------------------------------------------
// Meta tag helpers
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type FetchResult =
  | { status: "found"; post: ApiPost }
  | { status: "notfound" }
  | { status: "error" };

async function fetchBlogPost(slug: string): Promise<FetchResult> {
  try {
    const res = await fetch(
      `${apiOrigin}/api/blog/posts/${encodeURIComponent(slug)}`,
    );
    if (res.status === 404) return { status: "notfound" };
    if (!res.ok) return { status: "error" };
    const post = (await res.json()) as ApiPost;
    return { status: "found", post };
  } catch {
    return { status: "error" };
  }
}

function buildBlogHtml(slug: string, post: ApiPost): string {
  const template = readFileSync(shellHtml, "utf-8");

  const seoTitleEn =
    post.seoTitleEn || post.titleEn || post.seoTitleAr || post.titleAr;
  const seoTitleAr =
    post.seoTitleAr || post.titleAr || post.seoTitleEn || post.titleEn;
  const seoDescEn =
    post.seoDescriptionEn ||
    post.excerptEn ||
    stripHtml(post.bodyEn || "").slice(0, 160);
  const seoDescAr =
    post.seoDescriptionAr ||
    post.excerptAr ||
    stripHtml(post.bodyAr || "").slice(0, 160);

  const canonical = `https://counselo-legal.com/blog/${slug}`;
  const primaryTitle = seoTitleEn || seoTitleAr;
  const primaryDesc = (seoDescEn || seoDescAr).slice(0, 160);

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: primaryTitle,
    description: primaryDesc,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Organization",
      name: "CounselO",
      url: "https://counselo-legal.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CounselO",
      url: "https://counselo-legal.com",
      logo: {
        "@type": "ImageObject",
        url: "https://counselo-legal.com/logo.png",
      },
    },
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://counselo-legal.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://counselo-legal.com/blog",
      },
      { "@type": "ListItem", position: 3, name: primaryTitle, item: canonical },
    ],
  });

  const headTags = [
    `<title data-rh="true">${escapeHtml(primaryTitle)} | Counselo</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(primaryDesc)}">`,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(primaryTitle)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(primaryDesc)}">`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta data-rh="true" property="og:type" content="article">`,
    `<meta data-rh="true" property="og:image" content="https://counselo-legal.com/og-image.png">`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(primaryTitle)}">`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(primaryDesc)}">`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonical)}">`,
    `<script data-rh="true" type="application/ld+json">${articleSchema}</script>`,
    `<script data-rh="true" type="application/ld+json">${breadcrumbSchema}</script>`,
    // Inject post data for instant client-side hydration (no loading flash)
    `<script>window.__SSR_POST__=${JSON.stringify(post)};</script>`,
  ].join("\n");

  return template
    .replace("<!--app-head-->", headTags)
    .replace(/<div id="root"><\/div>/, `<div id="root" data-ssr="true"></div>`);
}

// ---------------------------------------------------------------------------
// SSR helpers (mirrors prerender.ts — kept local to avoid a shared bundle dep)
// ---------------------------------------------------------------------------

function addDataRh(head: string): string {
  return head
    .replace(/<(title|script|style|noscript)(\s|>)/gi, '<$1 data-rh="true"$2')
    .replace(/<(meta|link|base)(\s)/gi, '<$1 data-rh="true"$2');
}

function unescapeHeadEntities(head: string): string {
  return head
    .replace(
      /(<title[^>]*>)([^<]*?)(<\/title>)/g,
      (_, open, text, close) =>
        `${open}${text.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${close}`,
    )
    .replace(
      /(<meta\b[^>]+\bcontent=")([^"]*?)(")/g,
      (_, pre, val, post) =>
        `${pre}${val.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${post}`,
    );
}

function htmlTag(route: string): string {
  const isArabic = route.includes("/ar/") || route.endsWith("/ar");
  return isArabic ? '<html lang="ar" dir="rtl">' : '<html lang="en" dir="ltr">';
}

// ---------------------------------------------------------------------------
// On-demand SSR for routes with no prerendered file
// ---------------------------------------------------------------------------

let _render: ((url: string) => RenderResult) | null = null;

async function ssrRender(url: string): Promise<string> {
  if (!_render) {
    const mod = (await import(ssrBundle)) as {
      render: (url: string) => RenderResult;
    };
    _render = mod.render;
  }

  const template = readFileSync(shellHtml, "utf-8");
  const { head, body } = _render(url);

  return template
    .replace('<html lang="en">', htmlTag(url))
    .replace("<!--app-head-->", unescapeHeadEntities(addDataRh(head)))
    .replace(
      /<div id="root"><\/div>/,
      `<div id="root" data-ssr="true" data-ssr-url="${url}">${body}</div>`,
    );
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

const app = express();

app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  next();
});

// 1. Static assets — JS, CSS, images, fonts, robots.txt, sitemap.xml, etc.
//    index:false so we handle "/" ourselves (with the prerendered HTML).
app.use(
  express.static(publicDir, {
    index: false,
    maxAge: "1y",
    immutable: true,
    // Short-lived cache for HTML files (they change on each deploy)
    setHeaders(res: Response, filePath: string) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  }),
);

function spaShell(title: string, robots: string): string {
  return readFileSync(shellHtml, "utf-8").replace(
    "<!--app-head-->",
    `<title>${escapeHtml(title)}</title><meta name="robots" content="${robots}">`,
  );
}

app.get("/counselo-admin", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res
    .status(200)
    .send(spaShell("CounselO Admin", "noindex, nofollow, noarchive"));
});

// 2. Root "/" — serve the prerendered homepage
app.get("/", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.sendFile(indexHtml);
});

// 3. "/blog/:slug" — prerendered file if available, else fetch from API +
//    build accurate meta tags, injecting window.__SSR_POST__ for hydration.
app.get("/blog/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");
  const prerendered = resolve(pagesDir, `blog-${slug}.html`);

  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.sendFile(prerendered);
  }

  // Fetch post data from the API server so we can build proper meta tags.
  // This handles posts published after the last deployment with no redeployment.
  const result = await fetchBlogPost(slug);

  if (result.status === "notfound") {
    res.setHeader("Cache-Control", "no-store");
    return res
      .status(404)
      .send(spaShell("Article Not Found | CounselO", "noindex, nofollow"));
  }

  if (result.status === "found") {
    try {
      const html = buildBlogHtml(slug, result.post);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build blog HTML for /blog/${slug}:`, err);
    }
  }

  // Fallback when API is unreachable: React SSR (loading skeleton).
  try {
    const html = await ssrRender(`/blog/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /blog/${slug}:`, err);
    res.setHeader("Cache-Control", "no-store");
    res.sendFile(indexHtml);
  }
});

// 4. All other paths — look for a flat prerendered file, fall back to SPA
app.use((req: Request, res: Response, _next: NextFunction) => {
  const urlPath = req.path;

  // Compute the flat filename: "/sa/about" → "sa-about.html"
  if (urlPath !== "/") {
    const flatFile = `${urlPath.slice(1).replace(/\//g, "-")}.html`;
    const prerendered = resolve(pagesDir, flatFile);
    if (existsSync(prerendered)) {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      return res.sendFile(prerendered);
    }
  }

  // Unknown routes render the client-side 404 page with a real HTTP 404 and
  // no indexable homepage metadata.
  res.setHeader("Cache-Control", "no-store");
  res
    .status(404)
    .send(spaShell("Page Not Found | CounselO", "noindex, nofollow"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Legal site SSR server listening on port ${PORT}`);
});
