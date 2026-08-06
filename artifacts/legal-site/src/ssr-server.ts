/**
 * Production SSR server for the legal-site artifact.
 *
 * Single authoritative production web serving entry point for CounselO.
 * Handles static asset serving, discovery feeds, dynamic HTML SSR,
 * sitemaps, RSS feeds, regional redirects, and 404 pages.
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
import {
  generateDynamicSitemap,
  generateDiscoveryRssFeed,
  buildWorkHeadTags,
  resolveRegionalRedirect,
  resolveWorkLanguage,
  getCacheControlHeader,
  buildSpaShell,
  buildNotFoundHtml,
  type SitemapPostItem,
  type SitemapWorkItem,
  type RssPostItem,
  type RssWorkItem,
} from "./lib/server/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const publicDir = resolve(__dirname, "public");
const pagesDir = resolve(publicDir, "__pages");
const indexHtml = resolve(publicDir, "index.html");
const shellHtml = resolve(__dirname, "ssr-template.html");
const ssrBundle = resolve(__dirname, "server/entry-server.js");

const PORT = parseInt(process.env.PORT ?? "24438", 10);

const apiOrigin = (
  process.env.API_ORIGIN ??
  (process.env.NODE_ENV === "production"
    ? "https://counselo-legal.com"
    : `http://localhost:${process.env.API_PORT ?? "8080"}`)
).replace(/\/$/, "");

// ---------------------------------------------------------------------------
// Types & API helpers
// ---------------------------------------------------------------------------

export interface ApiPost {
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

export interface ApiWorkSample {
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

/** Re-export pure language routing decision for work samples */
export { resolveWorkLanguage };

/** Pure HTML builder for work samples — exported for unit tests */
export function buildWorkHtmlFromTemplate(
  template: string,
  sample: ApiWorkSample,
  language: "en" | "ar",
): string {
  const isArabic = language === "ar";
  const headTags = buildWorkHeadTags(sample, language);
  return template
    .replace(/<html\b[^>]*>/i, `<html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}">`)
    .replace("<!--app-head-->", headTags)
    .replace(/<div id="root"><\/div>/, `<div id="root" data-ssr="true"></div>`);
}

// ---------------------------------------------------------------------------
// SSR Helpers
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
// Server App Setup
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

// Dynamic sitemap
app.get("/sitemap.xml", async (_req, res) => {
  const baseXml = readFileSync(resolve(publicDir, "sitemap.xml"), "utf-8");
  try {
    const { posts, samples } = await fetchDiscoveryInventory();
    res.type("application/xml").setHeader("Cache-Control", getCacheControlHeader("discovery_xml"));
    res.send(generateDynamicSitemap(baseXml, posts as SitemapPostItem[], samples as SitemapWorkItem[]));
  } catch {
    res.type("application/xml").setHeader("Cache-Control", getCacheControlHeader("discovery_xml"));
    res.send(baseXml);
  }
});

// Dynamic RSS feed
app.get("/feed.xml", async (_req, res) => {
  try {
    const { posts, samples } = await fetchDiscoveryInventory();
    res.type("application/rss+xml").setHeader("Cache-Control", getCacheControlHeader("discovery_xml"));
    res.send(generateDiscoveryRssFeed(posts as RssPostItem[], samples as RssWorkItem[]));
  } catch {
    res
      .type("application/rss+xml")
      .setHeader("Cache-Control", getCacheControlHeader("discovery_xml"));
    res.send(readFileSync(resolve(publicDir, "feed.xml"), "utf-8"));
  }
});

// Static assets
app.use(
  express.static(publicDir, {
    index: false,
    maxAge: "1y",
    immutable: true,
    setHeaders(res: Response, filePath: string) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
      } else if (
        filePath.endsWith("robots.txt") ||
        filePath.endsWith("sitemap.xml")
      ) {
        res.setHeader("Cache-Control", getCacheControlHeader("discovery_xml"));
      }
    },
  }),
);

// Admin dashboard
app.get("/counselo-admin", (_req: Request, res: Response) => {
  const shell = readFileSync(shellHtml, "utf-8");
  res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
  res.status(200).send(buildSpaShell(shell, "CounselO Admin", "noindex, nofollow, noarchive"));
});

// Fresh discovery SSR for core service and landing routes
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
      res.setHeader("Cache-Control", getCacheControlHeader("fresh_ssr"));
      return res.send(html);
    } catch (error) {
      console.error(`Fresh discovery SSR failed for ${req.path}:`, error);
      return next();
    }
  },
);

// Root homepage
app.get("/", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
  res.sendFile(indexHtml);
});

// Regional redirects middleware handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const redirect = resolveRegionalRedirect(req.path);
  if (redirect.action === "redirect") {
    res.setHeader("Cache-Control", getCacheControlHeader("redirect_permanent"));
    return res.redirect(redirect.status, redirect.to);
  }
  next();
});

// Blog post page SSR
app.get("/blog/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");
  const prerendered = resolve(pagesDir, `blog-${slug}.html`);

  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
    return res.sendFile(prerendered);
  }

  const [result, discovery] = await Promise.all([
    fetchBlogPost(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    const shell = readFileSync(shellHtml, "utf-8");
    res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
    return res.status(404).send(buildNotFoundHtml(shell, "en"));
  }

  if (result.status === "found") {
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
      res.setHeader("Cache-Control", getCacheControlHeader("fresh_ssr"));
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build blog HTML for /blog/${slug}:`, err);
    }
  }

  try {
    const html = await ssrRender(`/blog/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /blog/${slug}:`, err);
    res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
    res.sendFile(indexHtml);
  }
});

// Arabic work sample detail page SSR
app.get("/ar/our-work/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");
  const prerendered = resolve(pagesDir, `ar-our-work-${slug}.html`);

  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
    return res.sendFile(prerendered);
  }

  const [result, discovery] = await Promise.all([
    fetchWorkSample(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    const shell = readFileSync(shellHtml, "utf-8");
    res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
    return res.status(404).send(buildNotFoundHtml(shell, "ar"));
  }

  if (result.status === "found") {
    const decision = resolveWorkLanguage(result.sample, "ar");
    if (decision.action === "redirect") {
      res.setHeader("Cache-Control", getCacheControlHeader("redirect_permanent"));
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
      res.setHeader("Cache-Control", getCacheControlHeader("fresh_ssr"));
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build Arabic work HTML for /ar/our-work/${slug}:`, err);
    }
  }

  try {
    const html = await ssrRender(`/ar/our-work/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /ar/our-work/${slug}:`, err);
    res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
    return res.sendFile(indexHtml);
  }
});

// English work sample detail page SSR
app.get("/our-work/:slug", async (req: Request, res: Response) => {
  const slug = String(req.params["slug"] ?? "");
  const prerendered = resolve(pagesDir, `our-work-${slug}.html`);

  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
    return res.sendFile(prerendered);
  }

  const [result, discovery] = await Promise.all([
    fetchWorkSample(slug),
    fetchDiscoveryInventory().catch(() => null),
  ]);

  if (result.status === "notfound") {
    const shell = readFileSync(shellHtml, "utf-8");
    res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
    return res.status(404).send(buildNotFoundHtml(shell, "en"));
  }

  if (result.status === "found") {
    const decision = resolveWorkLanguage(result.sample, "en");
    if (decision.action === "redirect") {
      res.setHeader("Cache-Control", getCacheControlHeader("redirect_permanent"));
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
      res.setHeader("Cache-Control", getCacheControlHeader("fresh_ssr"));
      return res.send(html);
    } catch (err) {
      console.error(`Failed to build English work HTML for /our-work/${slug}:`, err);
    }
  }

  try {
    const html = await ssrRender(`/our-work/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
    return res.send(html);
  } catch (err) {
    console.error(`SSR fallback failed for /our-work/${slug}:`, err);
    res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
    return res.sendFile(indexHtml);
  }
});

// Flat prerendered file fallback & 404 handler
app.use((req: Request, res: Response, _next: NextFunction) => {
  const urlPath = req.path;

  if (urlPath !== "/") {
    const flatFile = `${urlPath.slice(1).replace(/\//g, "-")}.html`;
    const prerendered = resolve(pagesDir, flatFile);
    if (existsSync(prerendered)) {
      res.setHeader("Cache-Control", getCacheControlHeader("html_revalidate"));
      return res.sendFile(prerendered);
    }
  }

  const shell = readFileSync(shellHtml, "utf-8");
  res.setHeader("Cache-Control", getCacheControlHeader("no_store"));
  const lang = urlPath.includes("/ar") ? "ar" : "en";
  res.status(404).send(buildNotFoundHtml(shell, lang));
});

export { app };

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Legal site SSR server listening on port ${PORT}`);
  });
}
