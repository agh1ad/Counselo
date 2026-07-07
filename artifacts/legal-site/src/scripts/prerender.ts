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

  // Syria blog post pages
  "/syr/blog/divorce-in-saudi-arabia",
  "/syr/blog/wrongful-termination-saudi-labor-law",
  "/syr/blog/foreign-company-registration-saudi-arabia",
  "/syr/blog/board-of-grievances-saudi-arabia",
  "/syr/blog/real-estate-disputes-saudi-arabia",
  "/syr/blog/child-custody-saudi-arabia",
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

function writeRoute(
  route: string,
  template: string,
  render: (url: string) => RenderResult,
): void {
  const { head, body } = render(route);

  const routeHtml = template
    // Inject per-route head tags (title, meta, canonical, OG, schemas)
    // React 19 hoists these to the front of renderToString output.
    .replace("<!--app-head-->", head)
    // Inject server-rendered app HTML into the root div.
    // data-ssr signals entry-client.tsx to use hydrateRoot instead of createRoot.
    .replace(/<div id="root"><\/div>/, `<div id="root" data-ssr="true">${body}</div>`);

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
}

prerender();
