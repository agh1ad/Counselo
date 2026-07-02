---
name: Static server directory redirect breaks prerendered nested routes
description: Why prerendered SSR sites must write flat HTML files (not route/index.html) plus explicit exact-path rewrites, instead of relying on directory-style output.
---

The Replit artifact static file server (`serve = "static"` in artifact.toml) 301-redirects a bare path like `/sa/about` to `/sa/about/` whenever a matching directory exists (e.g. from writing `dist/public/sa/about/index.html`). It then fails to resolve the nested `index.html` at the trailing-slash URL and silently falls back to the generic SPA rewrite (`/* -> /index.html`), serving the **root** page's content/title/canonical instead of the intended page. This is invisible in a Vite dev server (no static redirect logic there) — it only shows up in production static serving, e.g. as a Google Search Console "Redirect error" / wrong indexed content.

**Why:** Directory-based prerender output (`route/index.html`) triggers this ambiguous redirect+fallback chain. There's no way to disable the redirect from artifact.toml.

**How to apply:** For prerendered/SSG routes on this platform, write each route to a **flat file** (e.g. `/sa/about` → `__pages/sa-about.html`) rather than `route/index.html`, and add an explicit `[[services.production.rewrites]]` entry mapping the exact bare path to that flat file — placed before the generic `/* -> /index.html` catch-all. Keep the root route (`/`) as the real `index.html` since it doubles as the SPA fallback template. Verify by curling the deployed bare path directly (not just checking dev/preview) since the bug only manifests under production static serving.
