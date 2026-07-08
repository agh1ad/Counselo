---
name: CounselO OG proxy architecture
description: How social sharing OG meta tags are served for all pages
---

**Architecture:** All `/sa/*` and `/syr/*` traffic is routed through the API server (not the legal-site static server) via artifact.toml paths.

**API server artifact.toml paths:**
```toml
paths = ["/api", "/sa", "/syr"]
```

**og-pages.ts handler** (`/sa{/*path}` and `/syr{/*path}`):

Priority order for each request:
1. **Prerendered flat file** — check `dist/public/__pages/<sa-about>.html`. If it exists, `sendFile()` it. These files already have correct page-specific OG tags injected during build (`<!--app-head-->` replacement in prerender.ts).
2. **CMS blog post (DB)** — if path matches `/(sa|syr)(/ar)?/blog/:slug`, look up in DB. If found and published, inject correct OG tags at the very START of `<head>` in index.html (so first-occurrence wins for social crawlers), then serve.
3. **Fallback** — serve index.html shell (has homepage OG tags; used for unknown paths).

**Why first-occurrence wins:** Facebook/WhatsApp/Twitter parsers use the first `og:title`, `og:description`, etc. found in the document. Injecting at `<head>` start ensures page-specific tags precede any homepage defaults in the index.html shell.

**Key file:** `artifacts/api-server/src/og-pages.ts`
