import express, { type Express, type Request, type Response } from "express";
import { db, blogPostsTable, workSamplesTable } from "@workspace/db";
import { and, eq, getTableColumns } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { logger } from "./lib/logger.js";

const BASE_URL = "https://counselo-legal.com";

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
const LEGAL_TEMPLATE = path.resolve(LEGAL_DIST, "../ssr-template.html");
const DEFAULT_OG_IMAGE = "https://counselo-legal.com/og-image.png";
const SITE_NAME = "CounselO";

let indexHtmlCache: string | null = null;
let shellHtmlCache: string | null = null;

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

function getShellHtml(): string | null {
  if (shellHtmlCache !== null) return shellHtmlCache;
  try {
    shellHtmlCache = fs.readFileSync(LEGAL_TEMPLATE, "utf-8");
    return shellHtmlCache;
  } catch {
    return null;
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

function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeDescription(primary: string, fallback: string): string {
  const combined = primary.trim().length >= 80
    ? primary.trim()
    : `${primary.trim()} ${fallback.trim()}`.trim();
  if (combined.length <= 170) return combined;
  return `${combined.slice(0, 167).replace(/\s+\S*$/, "").trimEnd()}…`;
}

function buildDynamicBlogHtml(post: typeof blogPostsTable.$inferSelect): string {
  const isArabicPost = Boolean(post.titleAr.trim() && !post.titleEn.trim());
  const title = post.seoTitleEn || post.titleEn || post.seoTitleAr || post.titleAr || SITE_NAME;
  const brandedTitle = /(?:CounselO|كاونسلو)$/i.test(title)
    ? title
    : `${title} | ${isArabicPost ? "كاونسلو" : "CounselO"}`;
  const description = normalizeDescription(
    post.seoDescriptionEn || post.seoDescriptionAr || "",
    post.excerptEn || post.excerptAr || "Online legal guidance from CounselO.",
  );
  const canonical = `${BASE_URL}/blog/${post.slug}`;
  const shell = getShellHtml() ?? getIndexHtml();
  const articleSchema = safeJson({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: isArabicPost ? "ar" : "en",
    datePublished: post.date,
    dateModified: post.updatedAt?.toISOString?.() ?? post.date,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "CounselO", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "CounselO",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
  });
  const head = `<title>${esc(brandedTitle)}</title>
    <meta name="description" content="${esc(description.slice(0, 170))}">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="${esc(canonical)}">
    <meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description.slice(0, 170))}"><meta property="og:url" content="${esc(canonical)}">
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}"><meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${articleSchema}</script>
    <script>window.__SSR_POST__=${safeJson(post)};</script>`;
  const body = `<article><h1>${esc(title)}</h1><p>${esc(description)}</p></article>`;
  if (!shell) {
    return `<!doctype html><html lang="${isArabicPost ? "ar" : "en"}" dir="${isArabicPost ? "rtl" : "ltr"}"><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  }
  return shell
    .replace(/<html\b[^>]*>/i, `<html lang="${isArabicPost ? "ar" : "en"}" dir="${isArabicPost ? "rtl" : "ltr"}">`)
    .replace("<!--app-head-->", head)
    .replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

function buildDynamicBlogIndex(
  posts: Array<typeof blogPostsTable.$inferSelect>,
): string {
  const shell = getShellHtml() ?? getIndexHtml();
  const title = "Legal Blog | Articles & Guides | CounselO";
  const description =
    "Practical legal guides on family, employment, real estate, commercial law, and foreign investment in Saudi Arabia and Syria from CounselO's legal team.";
  const canonical = `${BASE_URL}/blog`;
  const itemList = safeJson({
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.titleEn || post.titleAr,
      url: `${canonical}/${post.slug}`,
    })),
  });
  const head = `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}">
    <script type="application/ld+json">${itemList}</script><script>window.__SSR_POSTS__=${safeJson(posts)};</script>`;
  const links = posts
    .map(
      (post) =>
        `<article><h2><a href="/blog/${encodeURIComponent(post.slug)}">${esc(post.titleEn || post.titleAr)}</a></h2><p>${esc(post.excerptEn || post.excerptAr)}</p></article>`,
    )
    .join("");
  const body = `<main><h1>Legal Blog</h1>${links}</main>`;
  if (!shell) {
    return `<!doctype html><html lang="en"><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  }
  return shell
    .replace("<!--app-head-->", head)
    .replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

type PublicWorkSample = Omit<typeof workSamplesTable.$inferSelect, "fileData" | "confidentialityConfirmed">;
const { fileData: _workFileData, confidentialityConfirmed: _workConfidentiality, ...publicWorkColumns } = getTableColumns(workSamplesTable);

function buildDynamicWorkHtml(sample: PublicWorkSample, language: "en" | "ar"): string {
  const isArabic = language === "ar";
  const title = (isArabic ? sample.seoTitleAr || sample.titleAr : sample.seoTitleEn || sample.titleEn) || sample.titleAr || sample.titleEn;
  const description = normalizeDescription(
    (isArabic ? sample.seoDescriptionAr || sample.summaryAr : sample.seoDescriptionEn || sample.summaryEn) || sample.summaryAr || sample.summaryEn,
    sample.summaryEn || sample.summaryAr,
  );
  const basePath = isArabic ? "/ar/our-work" : "/our-work";
  const canonical = `${BASE_URL}${basePath}/${sample.slug}`;
  const englishUrl = `${BASE_URL}/our-work/${sample.slug}`;
  const arabicUrl = `${BASE_URL}/ar/our-work/${sample.slug}`;
  const fileUrl = `${BASE_URL}/api/work/${sample.slug}/file`;
  const shell = getShellHtml() ?? getIndexHtml();
  const schema = safeJson({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: canonical,
    dateCreated: sample.date,
    dateModified: sample.updatedAt?.toISOString?.() ?? sample.date,
    inLanguage: language,
    genre: sample.workTypeEn || sample.workTypeAr,
    contentLocation: sample.jurisdictionEn || sample.jurisdictionAr,
    creator: { "@type": "LegalService", "@id": `${BASE_URL}/#organization`, name: "CounselO", url: BASE_URL },
    encoding: { "@type": "MediaObject", contentUrl: fileUrl, encodingFormat: sample.fileMimeType },
  });
  const breadcrumbs = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: isArabic ? "أعمالنا" : "Our Work", item: `${BASE_URL}${basePath}` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  });
  const head = `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description.slice(0, 170))}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="${canonical}">${sample.titleEn && sample.titleAr ? `<link rel="alternate" hreflang="en" href="${englishUrl}"><link rel="alternate" hreflang="ar" href="${arabicUrl}">` : ""}<link rel="alternate" hreflang="x-default" href="${sample.titleEn ? englishUrl : arabicUrl}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description.slice(0, 170))}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${DEFAULT_OG_IMAGE}">
    <script type="application/ld+json">${schema}</script><script type="application/ld+json">${breadcrumbs}</script>`;
  const body = `<main><article><h1>${esc(title)}</h1><p>${esc(description)}</p><p>${esc(sample.workTypeEn || sample.workTypeAr)} · ${esc(sample.jurisdictionEn || sample.jurisdictionAr)}</p><a href="${fileUrl}">View redacted document</a></article></main>`;
  if (!shell) return `<!doctype html><html lang="${isArabic ? "ar" : "en"}" dir="${isArabic ? "rtl" : "ltr"}"><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  return shell.replace(/<html\b[^>]*>/i, `<html lang="${isArabic ? "ar" : "en"}" dir="${isArabic ? "rtl" : "ltr"}">`).replace("<!--app-head-->", head).replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

function buildDynamicWorkIndex(samples: PublicWorkSample[], language: "en" | "ar"): string {
  const isArabic = language === "ar";
  const visibleSamples = samples.filter((sample) => isArabic ? Boolean(sample.titleAr) : Boolean(sample.titleEn));
  const shell = getShellHtml() ?? getIndexHtml();
  const title = isArabic ? "نماذج من أعمالنا القانونية | خبرة وصياغة احترافية | كاونسلو" : "Our Legal Work | Redacted Documents & Experience | CounselO";
  const description = isArabic ? "اطلع على نماذج منقحة من العقود والمذكرات والأعمال القانونية التي أعدها فريق كاونسلو، مع حماية كاملة لسرية وخصوصية العملاء." : "View redacted contracts, legal documents, and selected professional work prepared by CounselO, with client confidentiality protected.";
  const canonical = `${BASE_URL}${isArabic ? "/ar/our-work" : "/our-work"}`;
  const itemList = safeJson({
    "@context": "https://schema.org", "@type": "ItemList", numberOfItems: visibleSamples.length,
    itemListElement: visibleSamples.map((sample, index) => ({ "@type": "ListItem", position: index + 1, name: isArabic ? sample.titleAr : sample.titleEn, url: `${canonical}/${sample.slug}` })),
  });
  const breadcrumbs = safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: isArabic ? "أعمالنا القانونية" : "Our Legal Work", item: canonical },
    ],
  });
  const head = `<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="en" href="${BASE_URL}/our-work"><link rel="alternate" hreflang="ar" href="${BASE_URL}/ar/our-work"><link rel="alternate" hreflang="x-default" href="${BASE_URL}/our-work"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><script type="application/ld+json">${itemList}</script><script type="application/ld+json">${breadcrumbs}</script>`;
  const body = `<main><h1>${isArabic ? "أعمالنا القانونية" : "Our Legal Work"}</h1>${visibleSamples.map((sample) => `<article><h2><a href="${isArabic ? "/ar" : ""}/our-work/${encodeURIComponent(sample.slug)}">${esc(isArabic ? sample.titleAr : sample.titleEn)}</a></h2><p>${esc(isArabic ? sample.summaryAr : sample.summaryEn)}</p></article>`).join("")}</main>`;
  if (!shell) return `<!doctype html><html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}"><head>${head}</head><body><div id="root">${body}</div></body></html>`;
  return shell.replace(/<html\b[^>]*>/i, `<html lang="${language}" dir="${isArabic ? "rtl" : "ltr"}">`).replace("<!--app-head-->", head).replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);
}

function buildLiveSitemap(
  baseXml: string,
  posts: Array<typeof blogPostsTable.$inferSelect>,
  samples: PublicWorkSample[],
): string {
  // Blog post inventory is database-owned. Remove any stale build-time post
  // entries, then insert exactly the currently published records.
  const withoutPostEntries = baseXml.replace(
    /\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/blog\/[^<]+<\/loc>[\s\S]*?<\/url>/g,
    "",
  );
  const entries = posts.map((post) => {
    const url = `${BASE_URL}/blog/${escapeXml(post.slug)}`;
    const modified = post.updatedAt?.toISOString?.().slice(0, 10) || post.date;
    return `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${escapeXml(modified)}</lastmod>
  </url>`;
  });
  const withoutWorkEntries = withoutPostEntries.replace(
    /\s*<url>\s*<loc>https:\/\/counselo-legal\.com\/(?:ar\/)?our-work\/[^<]+<\/loc>[\s\S]*?<\/url>/g,
    "",
  );
  const workEntries = samples.flatMap((sample) => {
    const enUrl = `${BASE_URL}/our-work/${escapeXml(sample.slug)}`;
    const arUrl = `${BASE_URL}/ar/our-work/${escapeXml(sample.slug)}`;
    const modified = sample.updatedAt?.toISOString?.().slice(0, 10) || sample.date;
    const single = (url: string) => `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <lastmod>${escapeXml(modified)}</lastmod>
  </url>`;
    if (!sample.titleEn) return [single(arUrl)];
    if (!sample.titleAr) return [single(enUrl)];
    const paired = (url: string) => `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <lastmod>${escapeXml(modified)}</lastmod>
  </url>`;
    return [paired(enUrl), paired(arUrl)];
  });
  const latestDate = (values: Array<string | Date | null | undefined>): string | undefined => {
    const dates = values
      .map((value) => value instanceof Date ? value.toISOString().slice(0, 10) : value?.slice(0, 10))
      .filter((value): value is string => Boolean(value))
      .sort();
    return dates.at(-1);
  };
  const addIndexLastmod = (xml: string, url: string, lastmod?: string): string => {
    if (!lastmod) return xml;
    return xml.replace(`<loc>${url}</loc>`, `<loc>${url}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>`);
  };
  let withIndexDates = withoutWorkEntries;
  withIndexDates = addIndexLastmod(
    withIndexDates,
    `${BASE_URL}/blog`,
    latestDate(posts.map((post) => post.updatedAt ?? post.date)),
  );
  const latestWork = latestDate(samples.map((sample) => sample.updatedAt ?? sample.date));
  withIndexDates = addIndexLastmod(withIndexDates, `${BASE_URL}/our-work`, latestWork);
  withIndexDates = addIndexLastmod(withIndexDates, `${BASE_URL}/ar/our-work`, latestWork);
  const allEntries = [...entries, ...workEntries];
  return withIndexDates.replace("</urlset>", `${allEntries.length ? `\n${allEntries.join("\n")}\n` : ""}</urlset>`);
}

function buildDiscoveryFeed(
  posts: Array<typeof blogPostsTable.$inferSelect>,
  samples: PublicWorkSample[],
): string {
  const blogItems = posts.map((post) => ({
    title: post.titleEn || post.titleAr,
    description: post.excerptEn || post.excerptAr,
    url: `${BASE_URL}/blog/${post.slug}`,
    modified: post.updatedAt?.toISOString?.() ?? post.date,
  }));
  const workItems = samples.flatMap((sample) => {
    const modified = sample.updatedAt?.toISOString?.() ?? sample.date;
    const items: Array<{ title: string; description: string; url: string; modified: string }> = [];
    if (sample.titleEn) items.push({ title: sample.titleEn, description: sample.summaryEn, url: `${BASE_URL}/our-work/${sample.slug}`, modified });
    if (sample.titleAr) items.push({ title: sample.titleAr, description: sample.summaryAr, url: `${BASE_URL}/ar/our-work/${sample.slug}`, modified });
    return items;
  });
  const items = [...blogItems, ...workItems]
    .sort((a, b) => Date.parse(b.modified) - Date.parse(a.modified))
    .slice(0, 50);
  const lastBuildDate = items[0]?.modified ? new Date(items[0].modified).toUTCString() : new Date(0).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CounselO Legal Articles and Work</title>
    <link>${BASE_URL}/</link>
    <description>Recently published legal articles and redacted professional work from CounselO.</description>
    <language>en</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
${items.map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${escapeXml(new Date(item.modified).toUTCString())}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>`;
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
  // Sitemap is database-backed so newly published articles appear immediately
  // and drafts/unpublished records never leak into discovery surfaces.
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const baseXml = fs.readFileSync(path.join(LEGAL_DIST, "sitemap.xml"), "utf-8");
      const posts = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.published, true));
      const samples = await db
        .select(publicWorkColumns)
        .from(workSamplesTable)
        .where(eq(workSamplesTable.published, true));
      res.type("application/xml");
      res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
      res.send(buildLiveSitemap(baseXml, posts, samples));
    } catch (err) {
      logger.error({ err }, "Failed to generate live sitemap");
      res.status(503).type("text/plain").send("Sitemap temporarily unavailable");
    }
  });

  // Google accepts RSS 2.0 as a sitemap for recent URLs. This small,
  // database-backed feed makes new articles and work samples discoverable
  // immediately without pretending that unchanged static pages were updated.
  app.get("/feed.xml", async (_req, res) => {
    try {
      const posts = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.published, true));
      const samples = await db
        .select(publicWorkColumns)
        .from(workSamplesTable)
        .where(eq(workSamplesTable.published, true));
      res.type("application/rss+xml");
      res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
      res.send(buildDiscoveryFeed(posts, samples));
    } catch (err) {
      logger.error({ err }, "Failed to generate discovery feed");
      res.status(503).type("text/plain").send("Feed temporarily unavailable");
    }
  });

  // Fingerprinted assets remain immutable; crawl-control files must revalidate.
  app.use(
    express.static(LEGAL_DIST, {
      index: false,
      maxAge: "1y",
      immutable: true,
      setHeaders(res, filePath) {
        if (filePath.endsWith("robots.txt") || filePath.endsWith("llms.txt")) {
          res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
        } else if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        }
      },
    }),
  );

  app.get("/counselo-admin", (_req, res) => {
    const shell = getShellHtml();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.status(200).send(
      shell?.replace(
        "<!--app-head-->",
        '<title>CounselO Admin</title><meta name="robots" content="noindex, nofollow, noarchive">',
      ) ?? "<!doctype html><title>CounselO Admin</title><meta name=\"robots\" content=\"noindex,nofollow\">",
    );
  });

  // Legacy regional blog URLs permanently consolidate into the single
  // canonical blog URL space.
  app.get(["/sa/blog", "/syr/blog", "/sa/ar/blog", "/syr/ar/blog"], (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, "/blog");
  });
  app.get(
    ["/sa/blog/:slug", "/syr/blog/:slug", "/sa/ar/blog/:slug", "/syr/ar/blog/:slug"],
    async (req, res) => {
      const slug = String(req.params["slug"] ?? "");
      const [post] = await db
        .select({ slug: blogPostsTable.slug })
        .from(blogPostsTable)
        .where(
          and(
            eq(blogPostsTable.slug, slug),
            eq(blogPostsTable.published, true),
          ),
        );
      res.setHeader("Cache-Control", "public, max-age=86400");
      // Preserve a published article destination; retired legacy articles
      // consolidate to the blog hub instead of producing a redirect-to-404.
      res.redirect(301, post ? `/blog/${encodeURIComponent(slug)}` : "/blog");
    },
  );

  app.get(["/sa/our-work", "/syr/our-work"], (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, "/our-work");
  });
  app.get(["/sa/ar/our-work", "/syr/ar/our-work"], (_req, res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, "/ar/our-work");
  });
  app.get(["/sa/our-work/:slug", "/syr/our-work/:slug"], (req, res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, `/our-work/${encodeURIComponent(String(req.params["slug"] ?? ""))}`);
  });
  app.get(["/sa/ar/our-work/:slug", "/syr/ar/our-work/:slug"], (req, res) => {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.redirect(301, `/ar/our-work/${encodeURIComponent(String(req.params["slug"] ?? ""))}`);
  });

  app.get("/ar/our-work/:slug", async (req, res) => {
    const [sample] = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(and(eq(workSamplesTable.slug, String(req.params["slug"] ?? "")), eq(workSamplesTable.published, true)));
    if (!sample) {
      sendNotFound(res);
      return;
    }
    if (!sample.titleAr && sample.titleEn) {
      res.redirect(301, `/our-work/${encodeURIComponent(sample.slug)}`);
      return;
    }
    res.type("html");
    res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(buildDynamicWorkHtml(sample, "ar"));
  });

  app.get("/ar/our-work", async (_req, res) => {
    const samples = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(eq(workSamplesTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(buildDynamicWorkIndex(samples, "ar"));
  });

  app.get("/our-work/:slug", async (req, res) => {
    const [sample] = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(and(eq(workSamplesTable.slug, String(req.params["slug"] ?? "")), eq(workSamplesTable.published, true)));
    if (!sample) {
      sendNotFound(res);
      return;
    }
    if (!sample.titleEn && sample.titleAr) {
      res.redirect(301, `/ar/our-work/${encodeURIComponent(sample.slug)}`);
      return;
    }
    res.type("html");
    res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(buildDynamicWorkHtml(sample, "en"));
  });

  app.get("/our-work", async (_req, res) => {
    const samples = await db
      .select(publicWorkColumns)
      .from(workSamplesTable)
      .where(eq(workSamplesTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(buildDynamicWorkIndex(samples, "en"));
  });

  app.get("/blog/:slug", async (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(
        and(
          eq(blogPostsTable.slug, slug),
          eq(blogPostsTable.published, true),
        ),
      );
    if (!post) {
      sendNotFound(res);
      return;
    }
    res.type("html");
    res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(buildDynamicBlogHtml(post));
  });

  app.get("/blog", async (_req, res) => {
    const posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true));
    res.type("html");
    res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
    res.send(buildDynamicBlogIndex(posts));
  });

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

    sendNotFound(res);
  });

  // Root, Arabic picker, blog index, and other known flat prerenders.
  app.get("/{*path}", (req, res) => {
    const reqPath = req.path;
    if (reqPath === "/") {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      res.sendFile(path.join(LEGAL_DIST, "index.html"));
      return;
    }
    const prerenderedFile = findPrerenderedFile(reqPath);
    if (prerenderedFile) {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      res.sendFile(prerenderedFile);
      return;
    }
    sendNotFound(res);
  });
}

function sendNotFound(res: Response): void {
  const shellHtml = getShellHtml();
  res.setHeader("Cache-Control", "no-store");
  res.type("html");
  if (shellHtml) {
    res.status(404).send(
      shellHtml.replace(
        "<!--app-head-->",
        '<title>Page Not Found | CounselO</title><meta name="robots" content="noindex, nofollow">',
      ),
    );
  } else {
    res.status(404).send(
      '<!doctype html><html><head><title>Page Not Found | CounselO</title><meta name="robots" content="noindex,nofollow"></head><body><h1>Page not found</h1></body></html>',
    );
  }
}
