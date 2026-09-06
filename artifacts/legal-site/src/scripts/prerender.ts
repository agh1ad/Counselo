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
import { compactWorkSamplesForDiscovery, type WorkSamplePublic } from "../lib/work-samples.js";
import { getLegalProblemPaths, LEGAL_PROBLEM_REDIRECTS } from "../lib/legal-problem-pages.js";
import {
  LEGACY_BLOG_REDIRECTS,
  LEGACY_SEARCH_REDIRECTS,
  getPublicRouteInventory,
  hasQualityBilingualBlogContent,
  routeToFlatFilename,
} from "@workspace/api-zod";
import { repairPublicBlogPost } from "../../../api-server/src/lib/public-blog-repairs.js";
import { repairPublicWorkSample } from "../../../api-server/src/lib/public-work-repairs.js";

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
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    const candidates = data.filter(
      (post): post is InitialBlogPost => Boolean(post && typeof post === "object"),
    );
    const repaired = candidates.map((post) => repairPublicBlogPost(post));
    const repairedSlug = "contract-interpretation-syrian-courts";
    if (!repaired.some((post) => post.slug === repairedSlug)) {
      const explicitUrl = new URL(`/api/blog/posts/${repairedSlug}`, blogApiUrl).toString();
      const explicitResponse = await fetch(explicitUrl, { signal: AbortSignal.timeout(30_000) });
      if (explicitResponse.ok) repaired.push(repairPublicBlogPost(await explicitResponse.json() as InitialBlogPost));
    }
    return repaired.filter(
      (post): post is InitialBlogPost =>
        !!post &&
        typeof post === "object" &&
        typeof (post as { slug?: unknown }).slug === "string" &&
        (post as { published?: unknown }).published !== false &&
        hasQualityBilingualBlogContent(post as InitialBlogPost),
    );
  } catch (err) {
    console.warn(
      `  ⚠ Could not fetch blog posts from API: ${err instanceof Error ? err.message : String(err)}`,
    );
    console.warn("    Blog post pages will not be prerendered this build.");
    return [];
  }
}

async function fetchWorkSamples(): Promise<WorkSamplePublic[]> {
  try {
    const workApiUrl =
      process.env["WORK_API_URL"]?.trim() ||
      "https://counselo-legal.com/api/work";
    const res = await fetch(workApiUrl, {
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (sample): sample is WorkSamplePublic =>
        !!sample &&
        typeof sample === "object" &&
        typeof (sample as { slug?: unknown }).slug === "string" &&
        (sample as { published?: unknown }).published !== false,
    ).map(repairPublicWorkSample);
  } catch (err) {
    console.warn(
      `  ⚠ Could not fetch work samples from API: ${err instanceof Error ? err.message : String(err)}`,
    );
    console.warn("    Work sample discovery slides will be empty this build.");
    return [];
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve dist/ relative to this script (src/scripts/ → ../../dist)
const distDir = resolve(__dirname, "../../dist");
const publicDir = resolve(distDir, "public");
const serverEntryPath = resolve(distDir, "server/entry-server.js");

// Arabic is a real URL segment, not a client-side-only toggle: every English
// route above has a matching "/ar" variant (e.g. "/sa/about" -> "/sa/ar/about")
// so Arabic content is a genuinely distinct, crawlable page. This is required
// for hreflang annotations to point to real content in that language.
// ROUTES is extended at runtime with DB blog/work slugs (see prerender()).
const ROUTES: string[] = [...getPublicRouteInventory(), ...getLegalProblemPaths()];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Convert a route path to its flat prerendered filename, e.g.
// "/sa/services/family-law" -> "sa-services-family-law.html"
export { routeToFlatFilename } from "@workspace/api-zod";

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
  render: (url: string, posts?: InitialBlogPost[], samples?: WorkSamplePublic[]) => RenderResult,
  blogPosts: InitialBlogPost[],
  workSamples: WorkSamplePublic[],
): void {
  const isUaeRoute = route === "/uae" || route.startsWith("/uae/");
  // Until UAE-specific articles and work samples exist, do not bootstrap
  // Saudi/Syrian discovery data into UAE pages. This keeps both the visible
  // page and its crawlable HTML strictly jurisdiction-specific.
  const serviceSlug = route.match(/^\/(?:sa|syr|uae)(?:\/ar)?\/services\/([^/]+)(?:\/[^/]+)?$/)?.[1];
  const routeBlogPosts = isUaeRoute ? [] : serviceSlug
    ? blogPosts.filter(post => post.relatedServiceSlugs?.includes(serviceSlug)) : blogPosts;
  const routeWorkSamples = isUaeRoute ? [] : serviceSlug
    ? workSamples.filter(sample => sample.relatedServiceSlugs?.includes(serviceSlug)) : workSamples;
  const { head, body } = render(route, routeBlogPosts, routeWorkSamples);

  // Discovery surfaces only need card metadata and link assignments. Avoid
  // embedding every article body into every prerendered page.
  const discoveryPosts = routeBlogPosts.map((post) => ({
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
    // Pre-compute using the full post data so the collection page can determine
    // correct article URLs without needing body fields in the discovery payload.
    bilingual: true,
    published: post.published,
    relatedServiceSlugs: post.relatedServiceSlugs,
    relatedBlogSlugs: post.relatedBlogSlugs,
    relatedWorkSlugs: post.relatedWorkSlugs,
  }));
  const discoveryWorkSamples = compactWorkSamplesForDiscovery(routeWorkSamples);
  const discoveryData = `<script>window.__SSR_POSTS__=${safeJson(discoveryPosts)};window.__SSR_WORK_SAMPLES__=${safeJson(discoveryWorkSamples)};</script>`;
  const detailData = route.startsWith("/blog/")
    ? `<script>window.__SSR_POST__=${safeJson(blogPosts.find((post) =>
        route === `/blog/en/${post.slug}` ||
        route === `/blog/ar/${post.slug}`
      ))};</script>`
    : /^(?:\/ar)?\/our-work\/[^/]+$/.test(route)
      ? `<script>window.__SSR_WORK__=${safeJson(workSamples.find(sample => route.endsWith(`/${sample.slug}`)))};</script>`
      : "";
  const initialData = `${discoveryData}${detailData}`;

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
      // Work records stay dynamically fresh in production. Render a build-time
      // audit snapshot outside the public directory, never a serving override.
      : /^(?:\/ar)?\/our-work\/[^/]+$/.test(route)
        ? resolve(distDir, "audit-pages", routeToFlatFilename(route))
        : resolve(publicDir, "__pages", routeToFlatFilename(route));

  if (route !== "/") {
    mkdirSync(dirname(outputPath), { recursive: true });
  }

  writeFileSync(outputPath, routeHtml, "utf-8");
}

function safeJson(value: unknown): string {
  // JSON.stringify(undefined) returns undefined (not a string), so guard with ?? "null"
  // to avoid calling .replace() on undefined and crashing the prerender step.
  const json = JSON.stringify(value) ?? "null";
  return json
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

const REDIRECT_ROUTES: Record<string, string> = { ...LEGAL_PROBLEM_REDIRECTS, ...LEGACY_BLOG_REDIRECTS, ...LEGACY_SEARCH_REDIRECTS };

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
    render: (url: string, posts?: InitialBlogPost[], samples?: WorkSamplePublic[]) => RenderResult;
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

  // Fetch both discovery inventories in parallel so prerendered HTML and
  // client hydration receive exactly the same real published records.
  console.log("\n🔍 Fetching published content from API…");
  const [blogPosts, workSamples] = await Promise.all([
    fetchBlogPosts(),
    fetchWorkSamples(),
  ]);
  const blogSlugs = blogPosts.map((post) => post.slug);
  const blogPostRoutes = blogPosts.flatMap((post) => [
    `/blog/en/${post.slug}`,
    `/blog/ar/${post.slug}`,
  ]);
  if (blogSlugs.length > 0) {
    console.log(`  Found ${blogSlugs.length} post(s): ${blogSlugs.join(", ")}`);
    ROUTES.push(...blogPostRoutes);
  }
  console.log(`  Found ${workSamples.length} work sample(s).`);
  ROUTES.push(...workSamples.flatMap(sample => [
    ...(sample.titleEn ? [`/our-work/${sample.slug}`] : []),
    ...(sample.titleAr ? [`/ar/our-work/${sample.slug}`] : []),
  ]));

  const allRoutes = ROUTES;
  console.log(`\n🚀 Prerendering ${allRoutes.length} routes…\n`);

  let succeeded = 0;
  const failed: string[] = [];

  for (const route of allRoutes) {
    try {
      writeRoute(route, template, render, blogPosts, workSamples);
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
  writeFileSync(resolve(distDir, "audit-route-inventory.json"), JSON.stringify({ generatedAt: new Date().toISOString(), routes: allRoutes, blogRecords: blogPosts.length, workRecords: workSamples.length }, null, 2));

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
