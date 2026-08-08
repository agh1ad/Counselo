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
import compression from "compression";
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { RenderResult } from "./entry-server.js";
import type { WorkSamplePublic } from "./lib/work-samples.js";

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
  seoTitleEn?: string;
  seoTitleAr?: string;
  seoDescriptionEn?: string;
  seoDescriptionAr?: string;
  bodyEn?: string;
  bodyAr?: string;
  categoryEn: string;
  categoryAr: string;
  readTime: number;
  published: boolean;
  updatedAt?: string;
}

interface ApiWorkSample {
  slug: string;
  date: string;
  updatedAt?: string | null;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  workTypeEn: string;
  workTypeAr: string;
  jurisdictionEn: string;
  jurisdictionAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  fileMimeType: string;
  published: boolean;
  hasFile?: boolean;
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

function escapeXml(s: string): string {
  return escapeHtml(s).replace(/'/g, "&apos;");
}

async function fetchDiscoveryInventory(): Promise<{ posts: ApiPost[]; samples: WorkSamplePublic[] }> {
  const [postsRes, workRes] = await Promise.all([
    fetch(`${apiOrigin}/api/blog/posts`),
    fetch(`${apiOrigin}/api/work`),
  ]);
  if (!postsRes.ok || !workRes.ok) throw new Error("Discovery API unavailable");
  return {
    posts: ((await postsRes.json()) as ApiPost[]).map(toDiscoveryPost),
    samples: (await workRes.json()) as WorkSamplePublic[],
  };
}

function toDiscoveryPost(post: ApiPost): ApiPost {
  const {
    bodyEn: _bodyEn,
    bodyAr: _bodyAr,
    seoTitleEn: _seoTitleEn,
    seoTitleAr: _seoTitleAr,
    seoDescriptionEn: _seoDescriptionEn,
    seoDescriptionAr: _seoDescriptionAr,
    ...discoveryPost
  } = post;
  return discoveryPost;
}

function dynamicSitemap(baseXml: string, posts: ApiPost[], samples: WorkSamplePublic[]): string {
  let xml = baseXml
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "")
    .replace(/\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/(?:ar\/)?our-work\/[^<]+<\/loc>[\s\S]*?<\/url>/g, "");
  const entry = (url: string, modified: string, alternates: string) => `  <url>
    <loc>${escapeXml(url)}</loc>
${alternates}
    <lastmod>${escapeXml(modified.slice(0, 10))}</lastmod>
  </url>`;
  const items = posts.map((post) => {
    const url = `${apiOrigin}/blog/${post.slug}`;
    return entry(url, post.updatedAt || post.date, `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(url)}"/>`);
  });
  for (const sample of samples) {
    const enUrl = `${apiOrigin}/our-work/${sample.slug}`;
    const arUrl = `${apiOrigin}/ar/our-work/${sample.slug}`;
    const modified = sample.updatedAt || sample.date;
    if (sample.titleEn && sample.titleAr) {
      const alternates = `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(arUrl)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}"/>`;
      items.push(entry(enUrl, modified, alternates), entry(arUrl, modified, alternates));
    } else if (sample.titleAr) {
      items.push(entry(arUrl, modified, `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(arUrl)}"/>`));
    } else if (sample.titleEn) {
      items.push(entry(enUrl, modified, `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(enUrl)}"/>`));
    }
  }
  const latestBlog = posts.map((post) => (post.updatedAt || post.date).slice(0, 10)).sort().at(-1);
  const latestWork = samples.map((sample) => (sample.updatedAt || sample.date).slice(0, 10)).sort().at(-1);
  const addLastmod = (url: string, date?: string) => {
    if (date) xml = xml.replace(`<loc>${url}</loc>`, `<loc>${url}</loc>\n    <lastmod>${date}</lastmod>`);
  };
  addLastmod(`${apiOrigin}/blog`, latestBlog);
  addLastmod(`${apiOrigin}/our-work`, latestWork);
  addLastmod(`${apiOrigin}/ar/our-work`, latestWork);
  return xml.replace("</urlset>", `${items.length ? `\n${items.join("\n")}\n` : ""}</urlset>`);
}

function discoveryFeed(posts: ApiPost[], samples: WorkSamplePublic[]): string {
  const items = [
    ...posts.map((post) => ({ title: post.titleEn || post.titleAr, description: post.excerptEn || post.excerptAr, url: `${apiOrigin}/blog/${post.slug}`, modified: post.updatedAt || post.date })),
    ...samples.flatMap((sample) => {
      const modified = sample.updatedAt || sample.date;
      return [
        ...(sample.titleEn ? [{ title: sample.titleEn, description: sample.summaryEn, url: `${apiOrigin}/our-work/${sample.slug}`, modified }] : []),
        ...(sample.titleAr ? [{ title: sample.titleAr, description: sample.summaryAr, url: `${apiOrigin}/ar/our-work/${sample.slug}`, modified }] : []),
      ];
    }),
  ].sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified)).slice(0, 50);
  const built = items[0] ? new Date(items[0].modified).toUTCString() : new Date(0).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>CounselO Legal Articles and Work</title><link>${apiOrigin}/</link><description>Recently published legal articles and redacted professional work from CounselO.</description><lastBuildDate>${escapeXml(built)}</lastBuildDate>${items.map((item) => `<item><title>${escapeXml(item.title)}</title><link>${escapeXml(item.url)}</link><guid isPermaLink="true">${escapeXml(item.url)}</guid><description>${escapeXml(item.description)}</description><pubDate>${escapeXml(new Date(item.modified).toUTCString())}</pubDate></item>`).join("")}</channel></rss>`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDescription(primary: string, fallback: string): string {
  const combined = primary.trim().length >= 80
    ? primary.trim()
    : `${primary.trim()} ${fallback.trim()}`.trim();
  if (combined.length <= 170) return combined;
  return `${combined.slice(0, 167).replace(/\s+\S*$/, "").trimEnd()}…`;
}

/** XSS-safe JSON serialisation for inline <script> tags. */
function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
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
  const isArabicPost = Boolean(post.titleAr?.trim() && !post.titleEn?.trim());

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
  const brandedTitle = /(?:CounselO|كاونسلو)$/i.test(primaryTitle)
    ? primaryTitle
    : `${primaryTitle} | ${isArabicPost ? "كاونسلو" : "CounselO"}`;
  const primaryDesc = normalizeDescription(
    seoDescEn || seoDescAr,
    post.excerptEn || post.excerptAr || stripHtml(post.bodyEn || post.bodyAr || ""),
  );

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: primaryTitle,
    description: primaryDesc,
    inLanguage: isArabicPost ? "ar" : "en",
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Organization",
      "@id": "https://counselo-legal.com/#organization",
      name: "CounselO",
      url: "https://counselo-legal.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://counselo-legal.com/#organization",
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
    `<title data-rh="true">${escapeHtml(brandedTitle)}</title>`,
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
    .replace(/<html\b[^>]*>/i, `<html lang="${isArabicPost ? "ar" : "en"}" dir="${isArabicPost ? "rtl" : "ltr"}">`)
    .replace("<!--app-head-->", headTags)
    .replace(/<div id="root"><\/div>/, `<div id="root" data-ssr="true"></div>`);
}

// ---------------------------------------------------------------------------
// Work sample fetching and HTML building
// ---------------------------------------------------------------------------

type FetchWorkResult =
  | { status: "found"; sample: ApiWorkSample }
  | { status: "notfound" }
  | { status: "error" };

async function fetchWorkSample(slug: string): Promise<FetchWorkResult> {
  try {
    const res = await fetch(`${apiOrigin}/api/work/${encodeURIComponent(slug)}`);
    if (res.status === 404) return { status: "notfound" };
    if (!res.ok) return { status: "error" };
    const sample = (await res.json()) as ApiWorkSample;
    return { status: "found", sample };
  } catch {
    return { status: "error" };
  }
}

/**
 * Pure routing decision for work sample language handling.
 * Determines whether to serve the page, redirect to the other language, or 404.
 * Exported for testing without I/O.
 */
export function resolveWorkLanguage(
  sample: ApiWorkSample | null,
  language: "ar" | "en",
): { action: "serve" } | { action: "redirect"; to: string } | { action: "notfound" } {
  if (!sample) return { action: "notfound" };
  // Arabic URL requested but record has no Arabic title — redirect to English
  if (language === "ar" && !sample.titleAr && sample.titleEn) {
    return { action: "redirect", to: `/our-work/${encodeURIComponent(sample.slug)}` };
  }
  // English URL requested but record has no English title — redirect to Arabic
  if (language === "en" && !sample.titleEn && sample.titleAr) {
    return { action: "redirect", to: `/ar/our-work/${encodeURIComponent(sample.slug)}` };
  }
  return { action: "serve" };
}

/**
 * Pure HTML builder — accepts the shell template string so this function can
 * be unit-tested without filesystem access.
 *
 * Produces HTML with:
 *   - Correct lang/dir attributes on <html>
 *   - robots: index, follow
 *   - Self-canonical
 *   - hreflang (en + ar if bilingual, x-default otherwise)
 *   - Open Graph tags
 *   - CreativeWork JSON-LD
 *   - BreadcrumbList JSON-LD
 *   - window.__SSR_WORK__ bootstrap data for React hydration
 */
export function buildWorkHtmlFromTemplate(
  template: string,
  sample: ApiWorkSample,
  language: "en" | "ar",
): string {
  const isArabic = language === "ar";
  const BASE = "https://counselo-legal.com";

  const title =
    (isArabic
      ? sample.seoTitleAr || sample.titleAr
      : sample.seoTitleEn || sample.titleEn) ||
    sample.titleAr ||
    sample.titleEn;

  const description = normalizeDescription(
    (isArabic
      ? sample.seoDescriptionAr || sample.summaryAr
      : sample.seoDescriptionEn || sample.summaryEn) ||
      sample.summaryAr ||
      sample.summaryEn,
    sample.summaryEn || sample.summaryAr,
  );

  const basePath = isArabic ? "/ar/our-work" : "/our-work";
  const canonical = `${BASE}${basePath}/${sample.slug}`;
  const englishUrl = `${BASE}/our-work/${sample.slug}`;
  const arabicUrl = `${BASE}/ar/our-work/${sample.slug}`;
  const fileUrl = `${BASE}/api/work/${sample.slug}/file`;

  const hreflangLinks =
    sample.titleEn && sample.titleAr
      ? [
          `<link data-rh="true" rel="alternate" hreflang="en" href="${escapeHtml(englishUrl)}">`,
          `<link data-rh="true" rel="alternate" hreflang="ar" href="${escapeHtml(arabicUrl)}">`,
          `<link data-rh="true" rel="alternate" hreflang="x-default" href="${escapeHtml(englishUrl)}">`,
        ].join("\n")
      : `<link data-rh="true" rel="alternate" hreflang="x-default" href="${escapeHtml(canonical)}">`;

  const workSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: canonical,
    dateCreated: sample.date,
    dateModified: sample.updatedAt ?? sample.date,
    inLanguage: language,
    genre: sample.workTypeEn || sample.workTypeAr,
    contentLocation: sample.jurisdictionEn || sample.jurisdictionAr,
    creator: {
      "@type": "LegalService",
      "@id": `${BASE}/#organization`,
      name: "CounselO",
      url: BASE,
    },
    encoding: {
      "@type": "MediaObject",
      contentUrl: fileUrl,
      encodingFormat: sample.fileMimeType,
    },
  });

  const breadcrumbSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isArabic ? "الرئيسية" : "Home",
        item: `${BASE}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isArabic ? "أعمالنا" : "Our Work",
        item: `${BASE}${basePath}`,
      },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  });

  const headTags = [
    `<title data-rh="true">${escapeHtml(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escapeHtml(description.slice(0, 170))}" >`,
    `<meta data-rh="true" name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonical)}">`,
    hreflangLinks,
    `<meta data-rh="true" property="og:type" content="article">`,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(description.slice(0, 170))}">`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta data-rh="true" property="og:image" content="${BASE}/og-image.png">`,
    `<script data-rh="true" type="application/ld+json">${workSchema}</script>`,
    `<script data-rh="true" type="application/ld+json">${breadcrumbSchema}</script>`,
    `<script>window.__SSR_WORK__=${safeJson(sample)};</script>`,
  ].join("\n");

  return template
    .replace(/<html\b[^>]*>/i, `<html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}">`)
    .replace("<!--app-head-->", headTags)
    .replace(/<div id="root"><\/div>/, `<div id="root" data-ssr="true"></div>`);
}

function buildWorkHtml(sample: ApiWorkSample, language: "en" | "ar"): string {
  return buildWorkHtmlFromTemplate(readFileSync(shellHtml, "utf-8"), sample, language);
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

let _render: ((url: string, posts?: ApiPost[], samples?: WorkSamplePublic[]) => RenderResult) | null = null;

async function ssrRender(
  url: string,
  posts: ApiPost[] = [],
  samples: WorkSamplePublic[] = [],
): Promise<string> {
  if (!_render) {
    const mod = (await import(ssrBundle)) as {
      render: (url: string, posts?: ApiPost[], samples?: WorkSamplePublic[]) => RenderResult;
    };
    _render = mod.render;
  }

  const template = readFileSync(shellHtml, "utf-8");
  const { head, body } = _render(url, posts, samples);
  const discoveryData = `<script>window.__SSR_POSTS__=${JSON.stringify(posts).replace(/</g, "\\u003c")};window.__SSR_WORK_SAMPLES__=${JSON.stringify(samples).replace(/</g, "\\u003c")};</script>`;

  return template
    .replace('<html lang="en">', htmlTag(url))
    .replace("<!--app-head-->", `${unescapeHeadEntities(addDataRh(head))}${discoveryData}`)
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
app.use(compression());
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

// Keep discovery surfaces database-backed even when this standalone SSR
// process is the production entry point.
app.get("/sitemap.xml", async (_req, res) => {
  const baseXml = readFileSync(resolve(publicDir, "sitemap.xml"), "utf-8");
  try {
    const { posts, samples } = await fetchDiscoveryInventory();
    res.type("application/xml").setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(dynamicSitemap(baseXml, posts, samples));
  } catch {
    res.type("application/xml").setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(baseXml);
  }
});

app.get("/feed.xml", async (_req, res) => {
  try {
    const { posts, samples } = await fetchDiscoveryInventory();
    res.type("application/rss+xml").setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(discoveryFeed(posts, samples));
  } catch {
    res
      .type("application/rss+xml")
      .setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(readFileSync(resolve(publicDir, "feed.xml"), "utf-8"));
  }
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
      } else if (
        filePath.endsWith("robots.txt") ||
        filePath.endsWith("sitemap.xml")
      ) {
        // Discovery files change independently of fingerprinted build assets.
        // Caching them for a year can leave crawlers with stale directives or
        // an obsolete URL inventory long after a deployment.
        res.setHeader(
          "Cache-Control",
          "public, max-age=3600, must-revalidate",
        );
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

// Keep the homepage and related service pages fresh so every newly published
// article/work sample immediately gains crawlable links from two established
// URL surfaces without waiting for a redeploy.
app.get(
  [
    "/sa",
    "/sa/ar",
    "/syr",
    "/syr/ar",
    "/blog",
    "/our-work",
    "/ar/our-work",
    "/sa/services/:id",
    "/sa/ar/services/:id",
    "/syr/services/:id",
    "/syr/ar/services/:id",
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { posts, samples } = await fetchDiscoveryInventory();
      const html = await ssrRender(req.path, posts, samples);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
      return res.send(html);
    } catch (error) {
      console.error(`Fresh discovery SSR failed for ${req.path}:`, error);
      return next();
    }
  },
);

// 2. Root "/" — serve the prerendered homepage
app.get("/", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.sendFile(indexHtml);
});

// Region-prefixed blog URLs are legacy URLs. The blog now has one canonical
// URL space, so return a real permanent redirect instead of a 200 HTML page
// containing a client/meta-refresh redirect. This consolidates link equity and
// prevents crawlers from treating the legacy pages as soft duplicates.
app.get(["/sa/blog", "/syr/blog"], (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=86400");
  return res.redirect(301, "/blog");
});

app.get(
  ["/sa/blog/:slug", "/syr/blog/:slug"],
  (req: Request, res: Response) => {
    const slug = encodeURIComponent(String(req.params["slug"] ?? ""));
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.redirect(301, `/blog/${slug}`);
  },
);

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
  const [result, discovery] = await Promise.all([
    fetchBlogPost(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    res.setHeader("Cache-Control", "no-store");
    return res
      .status(404)
      .send(spaShell("Article Not Found | CounselO", "noindex, nofollow"));
  }

  if (result.status === "found") {
    // Arabic-only post: the canonical URL is /ar/blog/:slug — redirect there
    // so crawlers and sharing bots always get the correct Arabic OG tags.
    if (!result.post.titleEn?.trim() && result.post.titleAr?.trim()) {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(301, `/ar/blog/${encodeURIComponent(slug)}`);
    }
    try {
      const posts = [
        result.post,
        ...(discovery?.posts ?? []).filter(
          (candidate) => candidate.slug !== result.post.slug,
        ),
      ];
      const html = await ssrRender(
        `/blog/${slug}`,
        posts,
        discovery?.samples ?? [],
      );
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

// 3b. "/ar/blog/:slug" — Arabic blog post detail page.
//     Serves the same post as /blog/:slug but rendered at an /ar/ URL so
//     LanguageContext sets isRTL=true, which flips the React component to use
//     Arabic title/description/OG tags. Posts with no Arabic content 301 to
//     the English URL to avoid a blank page.
app.get("/ar/blog/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");

  const [result, discovery] = await Promise.all([
    fetchBlogPost(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(404).send(spaShell("مقال غير موجود | كاونسلو", "noindex, nofollow"));
  }

  if (result.status === "found") {
    // If the post has no Arabic content, redirect to the English URL.
    if (!result.post.titleAr?.trim() && result.post.titleEn?.trim()) {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(301, `/blog/${encodeURIComponent(slug)}`);
    }
    try {
      const posts = [
        result.post,
        ...(discovery?.posts ?? []).filter((c) => c.slug !== result.post.slug),
      ];
      const html = await ssrRender(`/ar/blog/${slug}`, posts, discovery?.samples ?? []);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build Arabic blog HTML for /ar/blog/${slug}:`, err);
    }
  }

  // Fallback: React SSR skeleton when API is unreachable.
  try {
    const html = await ssrRender(`/ar/blog/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /ar/blog/${slug}:`, err);
    res.setHeader("Cache-Control", "no-store");
    return res.sendFile(indexHtml);
  }
});

// 3c. "/blog/en/:slug" and "/blog/ar/:slug" — language-prefixed blog routes
//     introduced in PR #20. These delegate to the same SSR logic as the legacy
//     routes so both URL schemes work without breaking existing indexed links.
app.get("/blog/en/:slug", async (req: Request, res: Response) => {
  req.params["slug"] = String(req.params["slug"] ?? "");
  // Reuse the /blog/:slug handler logic by redirecting internally via wouter URL.
  // Simplest: just forward to the canonical English route.
  const slug = req.params["slug"];
  res.redirect(301, `/blog/${encodeURIComponent(slug)}`);
});

app.get("/blog/ar/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");
  res.redirect(301, `/ar/blog/${encodeURIComponent(slug)}`);
});

// 3d. "/ar/our-work/:slug" — Arabic work sample detail page.
//     Fetch from the API on every request so newly published records are
//     immediately live without redeployment.
app.get("/ar/our-work/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");

  // Prerendered flat file takes priority (rare, only for build-time baked content)
  const prerendered = resolve(pagesDir, `ar-our-work-${slug}.html`);
  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.sendFile(prerendered);
  }

  const [result, discovery] = await Promise.all([
    fetchWorkSample(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(404).send(spaShell("صفحة غير موجودة | كاونسلو", "noindex, nofollow"));
  }

  if (result.status === "found") {
    const decision = resolveWorkLanguage(result.sample, "ar");
    if (decision.action === "redirect") {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(301, decision.to);
    }
    try {
      const currentSample = result.sample as WorkSamplePublic;
      const samples = [
        currentSample,
        ...(discovery?.samples ?? []).filter(
          (candidate) => candidate.slug !== currentSample.slug,
        ),
      ];
      const html = await ssrRender(
        `/ar/our-work/${slug}`,
        discovery?.posts ?? [],
        samples,
      );
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build Arabic work HTML for /ar/our-work/${slug}:`, err);
    }
  }

  // Fallback: React SSR skeleton when API is unreachable
  try {
    const html = await ssrRender(`/ar/our-work/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /ar/our-work/${slug}:`, err);
    res.setHeader("Cache-Control", "no-store");
    return res.sendFile(indexHtml);
  }
});

// 3c. "/our-work/:slug" — English (default-language) work sample detail page.
app.get("/our-work/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");

  const prerendered = resolve(pagesDir, `our-work-${slug}.html`);
  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.sendFile(prerendered);
  }

  const [result, discovery] = await Promise.all([
    fetchWorkSample(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(404).send(spaShell("Work Not Found | CounselO", "noindex, nofollow"));
  }

  if (result.status === "found") {
    const decision = resolveWorkLanguage(result.sample, "en");
    if (decision.action === "redirect") {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(301, decision.to);
    }
    try {
      const currentSample = result.sample as WorkSamplePublic;
      const samples = [
        currentSample,
        ...(discovery?.samples ?? []).filter(
          (candidate) => candidate.slug !== currentSample.slug,
        ),
      ];
      const html = await ssrRender(
        `/our-work/${slug}`,
        discovery?.posts ?? [],
        samples,
      );
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build English work HTML for /our-work/${slug}:`, err);
    }
  }

  try {
    const html = await ssrRender(`/our-work/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /our-work/${slug}:`, err);
    res.setHeader("Cache-Control", "no-store");
    return res.sendFile(indexHtml);
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

// Export app for integration testing. The server only binds a port when this
// file is the process entry point, so importing it in tests is side-effect-free.
export { app };

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Legal site SSR server listening on port ${PORT}`);
  });
}
