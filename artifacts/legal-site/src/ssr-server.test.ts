/**
 * Integration & Pure Module regression tests for CounselO server logic.
 *
 * Covers:
 *   1. Pure module tests (routes, canonicals, hreflang, sitemap, RSS, metadata, redirects, cache policy, html-shell)
 *   2. HTTP-level integration tests for work sample route handlers & redirects
 */

import assert from "node:assert/strict";
import test from "node:test";
import http from "node:http";
import express from "express";

import { resolveWorkLanguage, buildWorkHtmlFromTemplate } from "./ssr-server.js";
import {
  BASE_URL,
  CORE_PAGES,
  BLOG_BASE_PATH,
  WORK_BASE_PATH,
  buildCanonicalUrl,
  buildHreflangSitemapLinks,
  buildHreflangUaeSitemapLinks,
  buildHreflangSingleUrlSitemapLink,
  buildHreflangLanguageVariantSitemapLinks,
  generateDynamicSitemap,
  generateDiscoveryRssFeed,
  buildBlogHeadTags,
  buildWorkHeadTags,
  resolveRegionalRedirect,
  getCacheControlHeader,
  buildSpaShell,
  buildNotFoundHtml,
} from "./lib/server/index.js";
import { render } from "./entry-server.js";
import type { InitialBlogPost } from "./App.js";
import type { WorkSamplePublic } from "./lib/work-samples.js";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

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

const ARABIC_ONLY: ApiWorkSample = {
  slug: "ray-qanwny-test",
  date: "2025-01-15",
  updatedAt: null,
  titleEn: "",
  titleAr: "رأي قانوني في طلب إفلاس",
  summaryEn: "",
  summaryAr: "ملخص الرأي القانوني المقدم في قضية الإفلاس",
  workTypeEn: "",
  workTypeAr: "رأي قانوني",
  jurisdictionEn: "",
  jurisdictionAr: "سوريا",
  seoTitleEn: "",
  seoTitleAr: "رأي قانوني في طلب إفلاس | كاونسلو",
  seoDescriptionEn: "",
  seoDescriptionAr: "ملخص الرأي القانوني في قضية الإفلاس أمام المحاكم السورية",
  fileMimeType: "application/pdf",
  published: true,
  hasFile: true,
};

const BILINGUAL: ApiWorkSample = {
  ...ARABIC_ONLY,
  slug: "legal-opinion-bilingual",
  titleEn: "Legal Opinion on Bankruptcy",
  summaryEn: "Legal opinion on bankruptcy proceedings",
  seoTitleEn: "Legal Opinion on Bankruptcy | CounselO",
  seoDescriptionEn: "Legal opinion on bankruptcy proceedings in Syrian courts",
};

const SHELL = `<!doctype html><html lang="en"><head><!--app-head--></head><body><div id="root"></div></body></html>`;

const SSR_WORK_SAMPLE: WorkSamplePublic = {
  ...BILINGUAL,
  id: 1,
  updatedAt: "2025-01-16",
  clientTypeEn: "Commercial client",
  clientTypeAr: "عميل تجاري",
  challengeEn: "A contract required a detailed legal review.",
  challengeAr: "تطلب العقد مراجعة قانونية تفصيلية.",
  approachEn: "CounselO reviewed the document and prepared a legal opinion.",
  approachAr: "راجع كاونسلو المستند وأعد رأياً قانونياً.",
  outcomeEn: "The client received a clear legal position and next steps.",
  outcomeAr: "تلقى العميل موقفاً قانونياً واضحاً والخطوات التالية.",
  documentLanguage: "bilingual",
  fileName: "redacted-opinion.pdf",
  fileSize: 1024,
  featured: false,
  relatedServiceSlugs: ["business-law"],
  relatedBlogSlugs: [],
  relatedWorkSlugs: [],
};

const SSR_BLOG_POST = {
  id: 100,
  slug: "server-rendered-article",
  date: "2025-01-20",
  categoryEn: "Commercial Law",
  categoryAr: "القانون التجاري",
  readTime: 5,
  titleEn: "Server Rendered Legal Article",
  titleAr: "مقال قانوني معروض من الخادم",
  excerptEn: "A complete legal article rendered in the initial HTML response for crawlers.",
  excerptAr: "مقال قانوني كامل يظهر في استجابة HTML الأولية لمحركات البحث.",
  bodyEn: "<p>This full article body is readable before JavaScript executes.</p>",
  bodyAr: "<p>هذا النص الكامل قابل للقراءة قبل تشغيل جافاسكريبت.</p>",
  published: true,
  relatedServiceSlugs: ["business-law"],
  relatedBlogSlugs: [],
  relatedWorkSlugs: [],
} as InitialBlogPost;

// ---------------------------------------------------------------------------
// Pure Module Unit Tests
// ---------------------------------------------------------------------------

test("routes — BASE_URL, BLOG_BASE_PATH, WORK_BASE_PATH, CORE_PAGES", () => {
  assert.equal(BASE_URL, "https://counselo-legal.com");
  assert.equal(BLOG_BASE_PATH, "/blog");
  assert.equal(WORK_BASE_PATH, "/our-work");
  assert.ok(CORE_PAGES.length > 30, `Expected >30 core pages, got ${CORE_PAGES.length}`);
});

test("canonical — buildCanonicalUrl formatting", () => {
  assert.equal(buildCanonicalUrl(""), "https://counselo-legal.com/");
  assert.equal(buildCanonicalUrl("/"), "https://counselo-legal.com/");
  assert.equal(buildCanonicalUrl("/blog"), "https://counselo-legal.com/blog");
  assert.equal(buildCanonicalUrl("sa/about/"), "https://counselo-legal.com/sa/about");
});

test("hreflang — buildHreflangSitemapLinks and variants", () => {
  const rootLinks = buildHreflangSitemapLinks("");
  assert.ok(rootLinks.includes('hreflang="en-SA"'), "en-SA missing from root hreflang");
  assert.ok(rootLinks.includes('hreflang="ar-SY"'), "ar-SY missing from root hreflang");

  const uaeLinks = buildHreflangUaeSitemapLinks("/uae/services");
  assert.ok(uaeLinks.includes('hreflang="en-AE"'), "en-AE missing from UAE hreflang");

  const singleLink = buildHreflangSingleUrlSitemapLink("https://counselo-legal.com/blog/test");
  assert.ok(singleLink.includes('hreflang="x-default"'), "x-default missing from single URL hreflang");

  const langVarLinks = buildHreflangLanguageVariantSitemapLinks(
    "https://counselo-legal.com/our-work/test",
    "https://counselo-legal.com/ar/our-work/test",
  );
  assert.ok(langVarLinks.includes('hreflang="en"'), "hreflang=en missing from language variant");
  assert.ok(langVarLinks.includes('hreflang="ar"'), "hreflang=ar missing from language variant");
});

test("sitemap — generateDynamicSitemap dynamic injection", () => {
  const baseXml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://counselo-legal.com/</loc></url></urlset>`;
  const posts = [{ slug: "test-post", date: "2025-01-01" }];
  const samples = [{ slug: "test-work", date: "2025-01-02", titleEn: "Test Work", titleAr: "عمل تجريبي" }];

  const xml = generateDynamicSitemap(baseXml, posts, samples);
  assert.ok(xml.includes("https://counselo-legal.com/blog/test-post"), "dynamic blog URL missing");
  assert.ok(xml.includes("https://counselo-legal.com/our-work/test-work"), "dynamic work EN URL missing");
  assert.ok(xml.includes("https://counselo-legal.com/ar/our-work/test-work"), "dynamic work AR URL missing");
});

test("rss — generateDiscoveryRssFeed formatting", () => {
  const posts = [{ slug: "rss-post", date: "2025-01-01", titleEn: "RSS Article", excerptEn: "Excerpt" }];
  const samples = [{ slug: "rss-work", date: "2025-01-02", titleEn: "RSS Work", summaryEn: "Summary" }];

  const rss = generateDiscoveryRssFeed(posts, samples);
  assert.ok(rss.includes("<title>RSS Article</title>"), "post title missing in RSS");
  assert.ok(rss.includes("<title>RSS Work</title>"), "work title missing in RSS");
  assert.ok(rss.includes("https://counselo-legal.com/blog/rss-post"), "post url missing in RSS");
});

test("metadata — buildBlogHeadTags & buildWorkHeadTags", () => {
  const blogHead = buildBlogHeadTags({
    slug: "meta-blog",
    date: "2025-01-01",
    titleEn: "Meta Blog Title",
    excerptEn: "Meta blog excerpt description.",
  });
  assert.ok(blogHead.includes("<title data-rh=\"true\">Meta Blog Title | CounselO</title>"), "blog title tag missing");
  assert.ok(blogHead.includes('rel="canonical" href="https://counselo-legal.com/blog/meta-blog"'), "blog canonical missing");
  assert.ok(blogHead.includes('window.__SSR_POST__='), "window.__SSR_POST__ missing");

  const workHead = buildWorkHeadTags(BILINGUAL, "en");
  assert.ok(workHead.includes("<title data-rh=\"true\">Legal Opinion on Bankruptcy | CounselO</title>"), "work title tag missing");
  assert.ok(workHead.includes('rel="canonical" href="https://counselo-legal.com/our-work/legal-opinion-bilingual"'), "work canonical missing");
  assert.ok(workHead.includes('window.__SSR_WORK__='), "window.__SSR_WORK__ missing");
});

test("redirects — resolveRegionalRedirect policy", () => {
  assert.deepEqual(resolveRegionalRedirect("/sa/blog"), { action: "redirect", status: 301, to: "/blog" });
  assert.deepEqual(resolveRegionalRedirect("/syr/blog/my-post"), { action: "redirect", status: 301, to: "/blog/my-post" });
  assert.deepEqual(resolveRegionalRedirect("/sa/our-work"), { action: "redirect", status: 301, to: "/our-work" });
  assert.deepEqual(resolveRegionalRedirect("/syr/ar/our-work/sample-slug"), { action: "redirect", status: 301, to: "/ar/our-work/sample-slug" });
  assert.deepEqual(resolveRegionalRedirect("/blog/my-post"), { action: "none" });
});

test("cache-policy — getCacheControlHeader mapping", () => {
  assert.equal(getCacheControlHeader("immutable_static"), "public, max-age=31536000, immutable");
  assert.equal(getCacheControlHeader("html_revalidate"), "public, max-age=0, must-revalidate");
  assert.equal(getCacheControlHeader("discovery_xml"), "public, max-age=3600, must-revalidate");
  assert.equal(getCacheControlHeader("fresh_ssr"), "public, max-age=60, must-revalidate");
  assert.equal(getCacheControlHeader("no_store"), "no-store");
  assert.equal(getCacheControlHeader("redirect_permanent"), "public, max-age=86400");
});

test("html-shell — buildSpaShell & buildNotFoundHtml", () => {
  const spa = buildSpaShell(SHELL, "Test Title", "noindex");
  assert.ok(spa.includes("<title>Test Title</title>"), "title missing from SPA shell");
  assert.ok(spa.includes('<meta name="robots" content="noindex">'), "robots missing from SPA shell");

  const notFoundEn = buildNotFoundHtml(SHELL, "en");
  assert.ok(notFoundEn.includes("Page Not Found | CounselO"), "English 404 title missing");

  const notFoundAr = buildNotFoundHtml(undefined, "ar");
  assert.ok(notFoundAr.includes("صفحة غير موجودة | كاونسلو"), "Arabic fallback 404 title missing");
});

// ---------------------------------------------------------------------------
// resolveWorkLanguage & buildWorkHtmlFromTemplate tests
// ---------------------------------------------------------------------------

test("Arabic-only at /ar → serve", () => {
  assert.equal(resolveWorkLanguage(ARABIC_ONLY, "ar").action, "serve");
});

test("Arabic-only at /en → redirect to /ar/our-work/", () => {
  const r = resolveWorkLanguage(ARABIC_ONLY, "en");
  assert.equal(r.action, "redirect");
  assert.ok("to" in r && r.to.startsWith("/ar/our-work/"), `Got: ${"to" in r ? r.to : r}`);
});

test("English-only at /ar → redirect to /our-work/", () => {
  const enOnly = { ...ARABIC_ONLY, titleAr: "", seoTitleAr: "", titleEn: "Legal Opinion" };
  const r = resolveWorkLanguage(enOnly, "ar");
  assert.equal(r.action, "redirect");
  assert.ok("to" in r && r.to.startsWith("/our-work/"), `Got: ${"to" in r ? r.to : r}`);
});

test("Bilingual at /ar → serve", () => {
  assert.equal(resolveWorkLanguage(BILINGUAL, "ar").action, "serve");
});

test("Bilingual at /en → serve", () => {
  assert.equal(resolveWorkLanguage(BILINGUAL, "en").action, "serve");
});

test("null (missing) → notfound", () => {
  assert.equal(resolveWorkLanguage(null, "ar").action, "notfound");
});

test("Arabic page: lang=ar dir=rtl", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('lang="ar"'), "lang=ar missing");
  assert.ok(html.includes('dir="rtl"'), "dir=rtl missing");
});

test("Arabic page: robots=index,follow (no noindex)", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes("index, follow"), "index/follow missing");
  assert.ok(!html.includes("noindex"), "must not contain noindex");
});

test("Arabic page: self-canonical at /ar/our-work/:slug", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(
    html.includes(`/ar/our-work/${ARABIC_ONLY.slug}`),
    "/ar/our-work/ canonical missing",
  );
});

test("Arabic-only: x-default hreflang points to Arabic canonical", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(
    html.includes(
      `hreflang="x-default" href="https://counselo-legal.com/ar/our-work/${ARABIC_ONLY.slug}"`,
    ),
    "x-default should point to Arabic canonical for Arabic-only record",
  );
});

test("Bilingual: en + ar hreflang links, x-default=en", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, BILINGUAL, "ar");
  assert.ok(html.includes('hreflang="en"'), "hreflang=en missing");
  assert.ok(html.includes('hreflang="ar"'), "hreflang=ar missing");
  assert.ok(
    html.includes(
      `hreflang="x-default" href="https://counselo-legal.com/our-work/${BILINGUAL.slug}"`,
    ),
    "x-default should point to English canonical for bilingual record",
  );
});

test("Arabic page: og:type=article, og:title, og:url", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('og:type" content="article"'), "og:type=article missing");
  assert.ok(html.includes(ARABIC_ONLY.titleAr), "og:title text missing");
  assert.ok(html.includes(`/ar/our-work/${ARABIC_ONLY.slug}`), "og:url missing");
});

test("Arabic page: CreativeWork JSON-LD with inLanguage=ar", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('"@type":"CreativeWork"'), "CreativeWork schema missing");
  assert.ok(html.includes('"inLanguage":"ar"'), "inLanguage: ar missing");
});

test("Arabic page: BreadcrumbList JSON-LD with 3 levels", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('"@type":"BreadcrumbList"'), "BreadcrumbList schema missing");
  assert.ok(html.includes('"name":"الرئيسية"'), "Home breadcrumb missing");
  assert.ok(html.includes('"name":"أعمالنا"'), "Our Work breadcrumb missing");
});

test("Bootstrap data: window.__SSR_WORK__ injected", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(
    html.includes(`window.__SSR_WORK__=`),
    "window.__SSR_WORK__ bootstrap missing",
  );
  assert.ok(
    html.includes(ARABIC_ONLY.slug),
    "sample slug missing from window.__SSR_WORK__",
  );
});

// ---------------------------------------------------------------------------
// HTTP-level Integration Tests
// ---------------------------------------------------------------------------

function makeTestApp(workDatabase: Map<string, ApiWorkSample>): express.Express {
  const app = express();

  app.get("/ar/our-work/:slug", (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    const sample = workDatabase.get(slug) ?? null;
    const decision = resolveWorkLanguage(sample, "ar");

    if (decision.action === "notfound") {
      res.setHeader("Cache-Control", "no-store");
      return res.status(404).send(buildNotFoundHtml(SHELL, "ar"));
    }
    if (decision.action === "redirect") {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(301, decision.to);
    }

    const html = buildWorkHtmlFromTemplate(SHELL, sample!, "ar");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
    return res.send(html);
  });

  app.get("/our-work/:slug", (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    const sample = workDatabase.get(slug) ?? null;
    const decision = resolveWorkLanguage(sample, "en");

    if (decision.action === "notfound") {
      res.setHeader("Cache-Control", "no-store");
      return res.status(404).send(buildNotFoundHtml(SHELL, "en"));
    }
    if (decision.action === "redirect") {
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.redirect(301, decision.to);
    }

    const html = buildWorkHtmlFromTemplate(SHELL, sample!, "en");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=60, must-revalidate");
    return res.send(html);
  });

  return app;
}

function httpGet(
  server: http.Server,
  path: string,
): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((res, rej) => {
    const addr = server.address();
    if (!addr || typeof addr === "string") return rej(new Error("No address"));
    http.get(`http://127.0.0.1:${addr.port}${path}`, (response) => {
      let body = "";
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => {
        res({ status: response.statusCode ?? 0, headers: response.headers, body });
      });
    }).on("error", rej);
  });
}

test("HTTP GET /ar/our-work/ray-qanwny-test → 200 OK + full HTML", async () => {
  const db = new Map([[ARABIC_ONLY.slug, ARABIC_ONLY]]);
  const app = makeTestApp(db);
  const server = app.listen(0);
  try {
    const res = await httpGet(server, `/ar/our-work/${ARABIC_ONLY.slug}`);
    assert.equal(res.status, 200);
    assert.ok(res.body.includes('lang="ar"'));
    assert.ok(res.body.includes(ARABIC_ONLY.titleAr));
  } finally {
    server.close();
  }
});

test("HTTP GET /our-work/ray-qanwny-test → 301 Redirect to /ar/our-work/ray-qanwny-test", async () => {
  const db = new Map([[ARABIC_ONLY.slug, ARABIC_ONLY]]);
  const app = makeTestApp(db);
  const server = app.listen(0);
  try {
    const res = await httpGet(server, `/our-work/${ARABIC_ONLY.slug}`);
    assert.equal(res.status, 301);
    assert.equal(res.headers.location, `/ar/our-work/${ARABIC_ONLY.slug}`);
  } finally {
    server.close();
  }
});

test("HTTP GET /ar/our-work/non-existent-slug → 404 Not Found", async () => {
  const db = new Map();
  const app = makeTestApp(db);
  const server = app.listen(0);
  try {
    const res = await httpGet(server, "/ar/our-work/non-existent-slug");
    assert.equal(res.status, 404);
    assert.ok(res.body.includes("noindex"));
  } finally {
    server.close();
  }
});

test("HTTP GET /our-work/legal-opinion-bilingual → 200 OK (bilingual works at /en)", async () => {
  const db = new Map([[BILINGUAL.slug, BILINGUAL]]);
  const app = makeTestApp(db);
  const server = app.listen(0);
  try {
    const res = await httpGet(server, `/our-work/${BILINGUAL.slug}`);
    assert.equal(res.status, 200);
    assert.ok(res.body.includes(BILINGUAL.titleEn));
  } finally {
    server.close();
  }
});

test("HTTP GET /ar/our-work/legal-opinion-bilingual → 200 OK (bilingual works at /ar)", async () => {
  const db = new Map([[BILINGUAL.slug, BILINGUAL]]);
  const app = makeTestApp(db);
  const server = app.listen(0);
  try {
    const res = await httpGet(server, `/ar/our-work/${BILINGUAL.slug}`);
    assert.equal(res.status, 200);
    assert.ok(res.body.includes(BILINGUAL.titleAr));
  } finally {
    server.close();
  }
});

test("React SSR entry-server render works for /blog and /our-work routes", () => {
  const blogResult = render("/blog", [SSR_BLOG_POST], [SSR_WORK_SAMPLE]);
  assert.ok(typeof blogResult.head === "string");
  assert.ok(typeof blogResult.body === "string");
  assert.ok(blogResult.body.length > 0);

  const workResult = render("/our-work", [SSR_BLOG_POST], [SSR_WORK_SAMPLE]);
  assert.ok(typeof workResult.head === "string");
  assert.ok(typeof workResult.body === "string");
  assert.ok(workResult.body.length > 0);
});
