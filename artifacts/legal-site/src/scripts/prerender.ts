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
  "/sa/contact",
  "/sa/blog",
  "/sa/terms-of-service",
  "/sa/privacy-policy",

  // Syria core pages
  "/syr",
  "/syr/services",
  "/syr/about",
  "/syr/contact",
  "/syr/blog",
  "/syr/terms-of-service",
  "/syr/privacy-policy",

  // Saudi Arabia service detail pages
  ...SERVICE_SLUGS.map((s) => `/sa/services/${s}`),

  // Syria service detail pages (shared slugs + 3 Syria-only slugs)
  ...SERVICE_SLUGS.map((s) => `/syr/services/${s}`),
  ...SYRIA_ONLY_SERVICE_SLUGS.map((s) => `/syr/services/${s}`),

  // Saudi Arabia blog post pages
  "/sa/blog/divorce-in-saudi-arabia",
  "/sa/blog/wrongful-termination-saudi-labor-law",
  "/sa/blog/foreign-company-registration-saudi-arabia",
  "/sa/blog/board-of-grievances-saudi-arabia",
  "/sa/blog/real-estate-disputes-saudi-arabia",
  "/sa/blog/child-custody-saudi-arabia",

  // New Syria-specific canonical blog URLs.
  "/syr/blog/divorce-in-syria",
  "/syr/blog/wrongful-termination-syrian-labor-law",
  "/syr/blog/foreign-company-registration-syria",
  "/syr/blog/administrative-court-disputes-syria",
  "/syr/blog/real-estate-disputes-syria",
  "/syr/blog/child-custody-syria",
];

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

const ROUTES: string[] = [
  // Region picker (x-default landing)
  "/",
  ...ENGLISH_ROUTES,
  ...ENGLISH_ROUTES.map(toArabicRoute),
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
  return head
    // <title data-rh="true">Some Title &amp; More</title>
    .replace(/(<title[^>]*>)([^<]*?)(<\/title>)/g, (_, open, text, close) =>
      `${open}${text.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${close}`,
    )
    // <meta ... content="Some &amp; Value" ...>
    .replace(/(<meta\b[^>]+\bcontent=")([^"]*?)(")/g, (_, pre, val, post) =>
      `${pre}${val.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${post}`,
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
  return isArabic
    ? '<html lang="ar" dir="rtl">'
    : '<html lang="en" dir="ltr">';
}

function writeRoute(
  route: string,
  template: string,
  render: (url: string) => RenderResult,
): void {
  const { head, body } = render(route);

  const routeHtml = template
    // Patch the static <html lang="en"> to the correct lang + dir for this route.
    .replace('<html lang="en">', htmlTag(route))
    // Inject per-route head tags (title, meta, canonical, OG, schemas).
    // Each tag gets data-rh="true" so react-helmet-async cleans them up on
    // client mount, preventing duplicate canonical / og:url / title tags.
    // unescapeHeadEntities restores & from React's &amp; escaping in title
    // and meta content so SEO crawlers see the intended character.
    .replace("<!--app-head-->", unescapeHeadEntities(addDataRh(head)))
    // Inject server-rendered app HTML into the root div.
    // data-ssr signals entry-client.tsx to use hydrateRoot instead of createRoot.
    // data-ssr-url records which URL was prerendered — entry-client compares this
    // against window.location.pathname so that when index.html is served as the
    // SPA catch-all fallback for an unprerendered path (e.g. a new dynamic blog
    // post), it detects the mismatch and uses createRoot instead of hydrateRoot,
    // rendering the correct page fresh rather than fighting the wrong SSR HTML.
    .replace(/<div id="root"><\/div>/, `<div id="root" data-ssr="true" data-ssr-url="${route}">${body}</div>`);

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

// ---------------------------------------------------------------------------
// 301 redirect routes — old Syria blog slugs that contained Saudi wording.
// These are no longer prerendered as full pages; instead we write a minimal
// HTML file that immediately redirects the browser (and informs crawlers via
// canonical + noindex) to the new Syria-specific canonical URL.
// ---------------------------------------------------------------------------

const REDIRECT_ROUTES: Record<string, string> = {
  "/syr/blog/divorce-in-saudi-arabia":                    "/syr/blog/divorce-in-syria",
  "/syr/blog/wrongful-termination-saudi-labor-law":       "/syr/blog/wrongful-termination-syrian-labor-law",
  "/syr/blog/foreign-company-registration-saudi-arabia":  "/syr/blog/foreign-company-registration-syria",
  "/syr/blog/board-of-grievances-saudi-arabia":           "/syr/blog/administrative-court-disputes-syria",
  "/syr/blog/real-estate-disputes-saudi-arabia":          "/syr/blog/real-estate-disputes-syria",
  "/syr/blog/child-custody-saudi-arabia":                 "/syr/blog/child-custody-syria",
  "/syr/ar/blog/divorce-in-saudi-arabia":                 "/syr/ar/blog/divorce-in-syria",
  "/syr/ar/blog/wrongful-termination-saudi-labor-law":    "/syr/ar/blog/wrongful-termination-syrian-labor-law",
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": "/syr/ar/blog/foreign-company-registration-syria",
  "/syr/ar/blog/board-of-grievances-saudi-arabia":        "/syr/ar/blog/administrative-court-disputes-syria",
  "/syr/ar/blog/real-estate-disputes-saudi-arabia":       "/syr/ar/blog/real-estate-disputes-syria",
  "/syr/ar/blog/child-custody-saudi-arabia":              "/syr/ar/blog/child-custody-syria",
};

function writeRedirectRoute(fromRoute: string, toRoute: string): void {
  const targetUrl = `https://counselo-legal.com${toRoute}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="${targetUrl}">
  <meta name="robots" content="noindex, nofollow">
  <title>Redirecting…</title>
  <script>window.location.replace(${JSON.stringify(targetUrl)});</script>
</head>
<body>
  <p><a href="${targetUrl}">Click here if you are not redirected automatically.</a></p>
</body>
</html>`;

  const outputPath = resolve(publicDir, "__pages", routeToFlatFilename(fromRoute));
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html, "utf-8");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function prerender(): Promise<void> {
  console.log("🔄 Loading SSR bundle…");
  const { render } = (await import(serverEntryPath)) as {
    render: (url: string) => RenderResult;
  };

  console.log("📄 Reading HTML template…");
  const template = readFileSync(resolve(publicDir, "index.html"), "utf-8");

  if (!template.includes("<!--app-head-->")) {
    throw new Error(
      'index.html is missing the <!--app-head--> placeholder. ' +
      'This marker is required for SSR head injection.',
    );
  }

  console.log(`\n🚀 Prerendering ${ROUTES.length} routes…\n`);

  let succeeded = 0;
  const failed: string[] = [];

  for (const route of ROUTES) {
    try {
      writeRoute(route, template, render);
      console.log(`  ✓ ${route}`);
      succeeded++;
    } catch (err) {
      const msg = `  ✗ ${route}: ${err instanceof Error ? err.message : String(err)}`;
      console.error(msg);
      failed.push(msg);
    }
  }

  console.log(`\n✅ Prerendered ${succeeded}/${ROUTES.length} routes.`);

  if (failed.length > 0) {
    console.error(`\n❌ ${failed.length} route(s) failed:\n${failed.join("\n")}`);
    process.exit(1);
  }

  // Write redirect-only HTML files for old Syria blog URLs.
  console.log(`\n🔀 Writing ${Object.keys(REDIRECT_ROUTES).length} redirect pages…\n`);
  for (const [from, to] of Object.entries(REDIRECT_ROUTES)) {
    writeRedirectRoute(from, to);
    console.log(`  ↩ ${from} → ${to}`);
  }
}

prerender();
