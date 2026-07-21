/**
 * Static prerender script — runs as the final step of `pnpm run build`.
 *
 * Renders each known public route to a standalone index.html file in
 * dist/public/. The static file server in artifact.toml serves these files
 * directly, so crawlers receive full HTML without executing JavaScript.
 *
 * Build pipeline order:
 *   1. vite build               → dist/public/  (client JS + CSS + index.html template)
 *   2. VITE_SSR=true vite build → dist/server/  (Node-compatible SSR bundle)
 *   3. tsx src/scripts/prerender.ts → writes per-route dist/public/**\/index.html
 *
 * After prerender, the route-specific HTML files take precedence over the
 * catch-all index.html rewrite configured in artifact.toml, giving Googlebot,
 * Perplexity, ChatGPT, and other bots the real page content on first byte.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { RenderResult } from "../entry-server.js";
import type { InitialBlogPost } from "../App.js";

// ---------------------------------------------------------------------------
// Fetch published blog post slugs from the running API at build time.
// Falls back to an empty array with a warning so the build never hard-fails
// just because the API isn't reachable (e.g. local dev without the server).
// ---------------------------------------------------------------------------
async function fetchBlogPosts(): Promise<InitialBlogPost[]> {
  try {
    const blogApiUrl =
      process.env["BLOG_API_URL"]?.trim() ||
      "https://counselo-legal.com/api/blog/posts";
    const res = await fetch(blogApiUrl, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (post): post is InitialBlogPost =>
        !!post &&
        typeof post === "object" &&
        typeof (post as { slug?: unknown }).slug === "string" &&
        (post as { published?: unknown }).published !== false,
    );
  } catch (err) {
    console.warn(
      `  ⚠ Could not fetch blog posts from API: ${err instanceof Error ? err.message : String(err)}`,
    );
    console.warn("    Blog post pages will not be prerendered this build.");
    return [];
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve dist/ relative to this script (src/scripts/ → ../../dist)
const distDir = resolve(__dirname, "../../dist");
const publicDir = resolve(distDir, "public");
const serverEntryPath = resolve(distDir, "server/entry-server.js");

// ---------------------------------------------------------------------------
// Route list
// All routes are known at build time (blog posts array is empty).
// Service slugs are derived from the same source used by the sitemap.
// ---------------------------------------------------------------------------

const SERVICE_SLUGS = [
  "family-law",
  "business-law",
  "real-estate",
  "employment-law",
  "foreign-investment",
  "administrative-law",
  "arbitration",
  "enforcement",
  "companies-law",
  "contracts",
  "criminal-law",
  "banking-finance",
  "intellectual-property",
  "tax-zakat",
  "cyber-law",
  "medical-malpractice",
  "insurance-law",
] as const;

// Syria has 3 additional service pages beyond the shared list above.
const SYRIA_ONLY_SERVICE_SLUGS = [
  "civil-law",
  "civil-procedure",
  "criminal-procedure",
] as const;

const ENGLISH_ROUTES: string[] = [
  // Saudi Arabia core pages
  "/sa",
  "/sa/services",
  "/sa/about",
  "/sa/vision",
  "/sa/contact",
  "/sa/terms-of-service",
  "/sa/privacy-policy",

  // Syria core pages
  "/syr",
  "/syr/services",
  "/syr/about",
  "/syr/vision",
  "/syr/contact",
  "/syr/terms-of-service",
  "/syr/privacy-policy",

  // Saudi Arabia service detail pages
  ...SERVICE_SLUGS.map((s) => `/sa/services/${s}`),

  // Syria service detail pages (shared slugs + 3 Syria-only slugs)
  ...SERVICE_SLUGS.map((s) => `/syr/services/${s}`),
  ...SYRIA_ONLY_SERVICE_SLUGS.map((s) => `/syr/services/${s}`),
];

// Single-URL routes: not region-prefixed, no Arabic variant.
// The blog lives at /blog for all regions and languages.
// DB blog post routes are fetched and added dynamically in prerender().
const SINGLE_URL_ROUTES: string[] = ["/blog", "/our-work"];

// Arabic is a real URL segment, not a client-side-only toggle: every English
// route above has a matching "/ar" variant (e.g. "/sa/about" -> "/sa/ar/about")
// so Arabic content is a genuinely distinct, crawlable page. This is required
// for hreflang annotations to point to real content in that language.
function toArabicRoute(route: string): string {
  const match = route.match(/^\/(sa|syr)(.*)$/);
  if (!match) return route;
  const [, region, rest] = match;
  return `/${region}/ar${rest}`;
}

// ROUTES is extended at runtime with DB blog post slugs (see prerender()).
const ROUTES: string[] = [
  // Region picker — English (x-default) and Arabic
  "/",
  "/ar",
  ...ENGLISH_ROUTES,
  ...ENGLISH_ROUTES.map(toArabicRoute),
  // Single-URL pages: blog index (+ post pages added dynamically below)
  ...SINGLE_URL_ROUTES,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Convert a route path to its flat prerendered filename, e.g.
// "/sa/services/family-law" -> "sa-services-family-law.html"
export function routeToFlatFilename(route: string): string {
  return `${route.slice(1).replace(/\//g, "-")}.html`;
}

/**
 * Tag every SSR-injected head element with data-rh="true" so that
 * react-helmet-async can recognise and remove them on client mount/hydration
 * before it inserts its own managed copies. Without this attribute, Helmet
 * cannot tell that the static prerendered tags were placed by a previous
 * Helmet render, so it leaves them in place and appends a second set —
 * producing the "multiple conflicting canonical URLs" SEO warning.
 *
 * Covers both paired tags (title, script, style, noscript) and void/self-
 * closing tags (meta, link, base).
 */
function addDataRh(head: string): string {
  return head
    .replace(/<(title|script|style|noscript)(\s|>)/gi, '<$1 data-rh="true"$2')
    .replace(/<(meta|link|base)(\s)/gi, '<$1 data-rh="true"$2');
}

/**
 * React SSR escapes & as &amp; in all text content and attribute values.
 * In <title> tags and <meta content="..."> this produces &amp; that some
 * SEO crawlers flag as a HTML-entity artifact even though it is technically
 * valid HTML. Unescape back to & so crawlers see the intended character.
 *
 * We only touch <title> inner text and content="..." attribute values —
 * never URL hrefs or JSON-LD script bodies — to avoid breaking other content.
 */
function unescapeHeadEntities(head: string): string {
  return (
    head
      // <title data-rh="true">Some Title &amp; More</title>
      .replace(
        /(<title[^>]*>)([^<]*?)(<\/title>)/g,
        (_, open, text, close) =>
          `${open}${text.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${close}`,
      )
      // <meta ... content="Some &amp; Value" ...>
      .replace(
        /(<meta\b[^>]+\bcontent=")([^"]*?)(")/g,
        (_, pre, val, post) =>
          `${pre}${val.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${post}`,
      )
  );
}

/**
 * Determine the correct lang + dir attributes for the root <html> element
 * based on the route. React 19 does not hoist <html> element attribute
 * changes from Helmet into the renderToString output, so we patch the
 * static template manually here.
 *
 * - Routes with /ar path segment → ar / rtl
 * - All other routes (including "/") → en / ltr
 *   The root "/" region-picker is primarily English UI + bilingual links;
 *   setting lang="en" is more truthful for crawlers.
 */
function htmlTag(route: string): string {
  const isArabic = route.includes("/ar/") || route.endsWith("/ar");
  return isArabic ? '<html lang="ar" dir="rtl">' : '<html lang="en" dir="ltr">';
}

function writeRoute(
  route: string,
  template: string,
  render: (url: string, posts?: InitialBlogPost[]) => RenderResult,
  blogPosts: InitialBlogPost[],
): void {
  const { head, body } = render(route, blogPosts);

  const blogList = blogPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    date: post.date,
    categoryEn: post.categoryEn,
    categoryAr: post.categoryAr,
    readTime: post.readTime,
    titleEn: post.titleEn,
    titleAr: post.titleAr,
    excerptEn: post.excerptEn,
    excerptAr: post.excerptAr,
    published: post.published,
  }));
  const initialData =
    route === "/blog"
      ? `<script>window.__SSR_POSTS__=${safeJson(blogList)};</script>`
      : route.startsWith("/blog/")
        ? `<script>window.__SSR_POST__=${safeJson(blogPosts.find((post) => `/blog/${post.slug}` === route))};</script>`
        : "";

  const routeHtml = template
    // Patch the static <html lang="en"> to the correct lang + dir for this route.
    .replace('<html lang="en">', htmlTag(route))
    // Inject per-route head tags (title, meta, canonical, OG, schemas).
    // Each tag gets data-rh="true" so react-helmet-async cleans them up on
    // client mount, preventing duplicate canonical / og:url / title tags.
    // unescapeHeadEntities restores & from React's &amp; escaping in title
    // and meta content so SEO crawlers see the intended character.
    .replace(
      "<!--app-head-->",
      `${unescapeHeadEntities(addDataRh(head))}${initialData}`,
    )
    // Inject server-rendered app HTML into the root div.
    // data-ssr signals entry-client.tsx to use hydrateRoot instead of createRoot.
    // data-ssr-url records which URL was prerendered — entry-client compares this
    // against window.location.pathname so that when index.html is served as the
    // SPA catch-all fallback for an unprerendered path (e.g. a new dynamic blog
    // post), it detects the mismatch and uses createRoot instead of hydrateRoot,
    // rendering the correct page fresh rather than fighting the wrong SSR HTML.
    .replace(
      /<div id="root"><\/div>/,
      `<div id="root" data-ssr="true" data-ssr-url="${route}">${body}</div>`,
    );

  // Root route keeps the standard index.html (needed by the static server as
  // both the "/" page and the SPA-fallback template for unprerendered paths
  // like /counselo-admin).
  //
  // Every other route is written as a FLAT file (not route/index.html). This
  // avoids the static server's implicit directory + trailing-slash redirect
  // behavior: when a nested "route/index.html" exists, requesting the bare
  // path 301-redirects to "route/" — but the server then fails to resolve
  // that nested index.html and silently falls back to serving the root
  // index.html instead (wrong content, wrong canonical). Flat files plus
  // explicit rewrites in artifact.toml sidestep that bug entirely: no
  // directory exists to trigger a redirect, so the exact-path rewrite serves
  // the correct file directly with a 200.
  const outputPath =
    route === "/"
      ? resolve(publicDir, "index.html")
      : resolve(publicDir, "__pages", routeToFlatFilename(route));

  if (route !== "/") {
    mkdirSync(dirname(outputPath), { recursive: true });
  }

  writeFileSync(outputPath, routeHtml, "utf-8");
}

function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

// ---------------------------------------------------------------------------
// Redirect routes — old region-prefixed blog URLs that no longer exist.
// Every path below gets a minimal HTML redirect page (noindex + meta-refresh
// + JS redirect) pointing at the new canonical URL.  The static server has
// an explicit rewrite for each path pointing to its /__pages/*.html file.
// ---------------------------------------------------------------------------

const REDIRECT_ROUTES: Record<string, string> = {
  // Old region-prefixed blog index pages → new single-URL blog index
  "/sa/blog": "/blog",
  "/syr/blog": "/blog",
  "/sa/ar/blog": "/blog",
  "/syr/ar/blog": "/blog",

  // Old SA-region blog post slugs (both EN and AR) → blog index
  // (these posts are removed from the DB; redirect to /blog rather than 404)
  "/sa/blog/divorce-in-saudi-arabia": "/blog",
  "/sa/blog/wrongful-termination-saudi-labor-law": "/blog",
  "/sa/blog/foreign-company-registration-saudi-arabia": "/blog",
  "/sa/blog/board-of-grievances-saudi-arabia": "/blog",
  "/sa/blog/real-estate-disputes-saudi-arabia": "/blog",
  "/sa/blog/child-custody-saudi-arabia": "/blog",

  "/sa/ar/blog/divorce-in-saudi-arabia": "/blog",
  "/sa/ar/blog/wrongful-termination-saudi-labor-law": "/blog",
  "/sa/ar/blog/foreign-company-registration-saudi-arabia": "/blog",
  "/sa/ar/blog/board-of-grievances-saudi-arabia": "/blog",
  "/sa/ar/blog/real-estate-disputes-saudi-arabia": "/blog",
  "/sa/ar/blog/child-custody-saudi-arabia": "/blog",

  // Old SYR-region SA-named slugs → blog index (collapsed from two hops)
  "/syr/blog/divorce-in-saudi-arabia": "/blog",
  "/syr/blog/wrongful-termination-saudi-labor-law": "/blog",
  "/syr/blog/foreign-company-registration-saudi-arabia": "/blog",
  "/syr/blog/board-of-grievances-saudi-arabia": "/blog",
  "/syr/blog/real-estate-disputes-saudi-arabia": "/blog",
  "/syr/blog/child-custody-saudi-arabia": "/blog",

  "/syr/ar/blog/divorce-in-saudi-arabia": "/blog",
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": "/blog",
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": "/blog",
  "/syr/ar/blog/board-of-grievances-saudi-arabia": "/blog",
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": "/blog",
  "/syr/ar/blog/child-custody-saudi-arabia": "/blog",

  // Old SYR-region Syria-named canonical slugs → blog index
  // (these static posts are also removed from DB)
  "/syr/blog/divorce-in-syria": "/blog",
  "/syr/blog/wrongful-termination-syrian-labor-law": "/blog",
  "/syr/blog/foreign-company-registration-syria": "/blog",
  "/syr/blog/administrative-court-disputes-syria": "/blog",
  "/syr/blog/real-estate-disputes-syria": "/blog",
  "/syr/blog/child-custody-syria": "/blog",

  "/syr/ar/blog/divorce-in-syria": "/blog",
  "/syr/ar/blog/wrongful-termination-syrian-labor-law": "/blog",
  "/syr/ar/blog/foreign-company-registration-syria": "/blog",
  "/syr/ar/blog/administrative-court-disputes-syria": "/blog",
  "/syr/ar/blog/real-estate-disputes-syria": "/blog",
  "/syr/ar/blog/child-custody-syria": "/blog",
};

function writeRedirectRoute(fromRoute: string, toRoute: string): void {
  const targetUrl = `https://counselo-legal.com${toRoute}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <meta name="x-source-route" content="${fromRoute}">
  <meta name="robots" content="noindex, nofollow">
  <title>Redirecting…</title>
  <script>window.location.replace(${JSON.stringify(targetUrl)});</script>
</head>
<body>
  <p><a href="${targetUrl}">Click here if you are not redirected automatically.</a></p>
</body>
</html>`;

  const outputPath = resolve(
    publicDir,
    "__pages",
    routeToFlatFilename(fromRoute),
  );
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, "utf-8");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function prerender(): Promise<void> {
  console.log("🔄 Loading SSR bundle…");
  const { render } = (await import(serverEntryPath)) as {
    render: (url: string, posts?: InitialBlogPost[]) => RenderResult;
  };

  console.log("📄 Reading HTML template…");
  const template = readFileSync(resolve(publicDir, "index.html"), "utf-8");

  if (!template.includes("<!--app-head-->")) {
    throw new Error(
      "index.html is missing the <!--app-head--> placeholder. " +
        "This marker is required for SSR head injection.",
    );
  }

  // The root prerender overwrites dist/public/index.html. Keep the untouched
  // shell outside the public directory for dynamic blog, admin, and 404 HTML.
  writeFileSync(resolve(distDir, "ssr-template.html"), template, "utf-8");

  // Fetch published blog post slugs from the API and add their routes.
  console.log("\n🔍 Fetching blog post slugs from API…");
  const blogPosts = await fetchBlogPosts();
  const blogSlugs = blogPosts.map((post) => post.slug);
  const blogPostRoutes = blogSlugs.map((slug) => `/blog/${slug}`);
  if (blogSlugs.length > 0) {
    console.log(`  Found ${blogSlugs.length} post(s): ${blogSlugs.join(", ")}`);
    ROUTES.push(...blogPostRoutes);
  }

  const allRoutes = ROUTES;
  console.log(`\n🚀 Prerendering ${allRoutes.length} routes…\n`);

  let succeeded = 0;
  const failed: string[] = [];

  for (const route of allRoutes) {
    try {
      writeRoute(route, template, render, blogPosts);
      console.log(`  ✓ ${route}`);
      succeeded++;
    } catch (err) {
      const msg = `  ✗ ${route}: ${err instanceof Error ? err.message : String(err)}`;
      console.error(msg);
      failed.push(msg);
    }
  }

  console.log(`\n✅ Prerendered ${succeeded}/${allRoutes.length} routes.`);

  if (failed.length > 0) {
    console.error(
      `\n❌ ${failed.length} route(s) failed:\n${failed.join("\n")}`,
    );
    process.exit(1);
  }

  // Write redirect-only HTML files for old region-prefixed blog URLs.
  console.log(
    `\n🔀 Writing ${Object.keys(REDIRECT_ROUTES).length} redirect pages…\n`,
  );
  for (const [from, to] of Object.entries(REDIRECT_ROUTES)) {
    writeRedirectRoute(from, to);
    console.log(`  ↩ ${from} → ${to}`);
  }
}

prerender();
