---
name: CounselO production web server is ssr-server
description: Replit routes public HTML requests to the legal-site ssr-server, not the api-server. Any new page route must be added to ssr-server.ts.
---

## Rule
New server-rendered page routes (e.g. /ar/our-work/:slug, /our-work/:slug) MUST be added to `artifacts/legal-site/src/ssr-server.ts`. Adding them only to `artifacts/api-server/src/og-pages.ts` has no effect in production because the api-server never receives those requests.

**Why:** Replit's application router sends HTML/web page requests to the legal-site "web" artifact (ssr-server on port 24438, external 3000) and API requests to the api-server "api" artifact (port 8080, external 80). The ssr-server's catch-all returns 404 for any path with no prerendered flat file, which is why dynamic CMS pages were returning 404/noindex even though the api-server had correct handlers.

**How to apply:**
- In dev, port 24438 is the Vite dev server (not ssr-server) — don't test ssr-server routes there.
- Rebuild after changes: `pnpm --filter @workspace/legal-site run build:ssr-server` (esbuild → dist/ssr-server.mjs).
- Pattern for new page types: fetch from `/api/<resource>/:slug` inside the route handler (same as /blog/:slug pattern); fall back to ssrRender if the API is unreachable.
- Export pure functions (resolveXLanguage, buildXHtmlFromTemplate) for unit testing without filesystem deps.
- The api-server og-pages.ts handlers are still useful as a secondary layer but are not the primary production path for HTML pages.
