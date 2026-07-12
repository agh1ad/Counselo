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

import express, { type Request, type Response, type NextFunction } from "express";
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
const ssrBundle = resolve(__dirname, "server/entry-server.js");

const PORT = parseInt(process.env.PORT ?? "24438", 10);

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
    .replace(/(<title[^>]*>)([^<]*?)(<\/title>)/g, (_, open, text, close) =>
      `${open}${text.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${close}`,
    )
    .replace(/(<meta\b[^>]+\bcontent=")([^"]*?)(")/g, (_, pre, val, post) =>
      `${pre}${val.replace(/&amp;/g, "&").replace(/&#x27;/g, "'")}${post}`,
    );
}

function htmlTag(route: string): string {
  const isArabic = route.includes("/ar/") || route.endsWith("/ar");
  return isArabic
    ? '<html lang="ar" dir="rtl">'
    : '<html lang="en" dir="ltr">';
}

// ---------------------------------------------------------------------------
// On-demand SSR for routes with no prerendered file
// ---------------------------------------------------------------------------

let _render: ((url: string) => RenderResult) | null = null;

async function ssrRender(url: string): Promise<string> {
  if (!_render) {
    const mod = (await import(ssrBundle)) as { render: (url: string) => RenderResult };
    _render = mod.render;
  }

  const template = readFileSync(indexHtml, "utf-8");
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

// 2. Root "/" — serve the prerendered homepage
app.get("/", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.sendFile(indexHtml);
});

// 3. "/blog/:slug" — prerendered file if available, else SSR on-demand
app.get("/blog/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const prerendered = resolve(pagesDir, `blog-${slug}.html`);

  if (existsSync(prerendered)) {
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    return res.sendFile(prerendered);
  }

  // No prerendered file — render on demand so crawlers always get full HTML.
  try {
    const html = await ssrRender(`/blog/${slug}`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.send(html);
  } catch (err) {
    console.error(`SSR failed for /blog/${slug}:`, err);
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

  // SPA catch-all — React app will render the correct route client-side.
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.sendFile(indexHtml);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Legal site SSR server listening on port ${PORT}`);
});
