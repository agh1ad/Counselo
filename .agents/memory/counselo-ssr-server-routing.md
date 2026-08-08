---
name: CounselO production web server routing
description: Which server handles which HTML routes in production, and the Arabic blog route added for OG tag correctness.
---

In production Replit routes ALL HTML page requests to the legal-site **ssr-server** (port 24438), not the api-server.

**Route responsibilities:**
- `/blog/:slug` → SSR renders English OG tags
- `/ar/blog/:slug` → SSR renders Arabic OG tags (added July 2026); 301s to `/blog/:slug` if no Arabic content
- `/our-work/:slug` → English work sample OG tags
- `/ar/our-work/:slug` → Arabic work sample OG tags; 301s to `/our-work/:slug` if no Arabic content

**Why `ssrRender('/ar/blog/slug')` gives Arabic OG tags:**
LanguageContext reads `/ar/` from the URL → sets `lang = "ar"` → `isRTL = true` → `useAr = true` in blog-post.tsx → Helmet outputs Arabic title/description.

**Key rule:** Any new dynamic blog or work route (e.g. `/ar/blog/:slug`) must be added to `ssr-server.ts`, NOT `og-pages.ts`. og-pages.ts is for the api-server which does not handle public HTML in production.

**Remaining gap:** Blog listing and related-post links use `/blog/:slug` even when browsing in Arabic. Users sharing from Arabic mode still get English OG tags until those links are updated to `/ar/blog/:slug` when `isRTL` is true.
