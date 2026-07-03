---
name: CounselO bilingual URL routing
description: Arabic/English is a real URL segment (/ar), not a client-side toggle — why, and what depends on it.
---

Arabic and English each get their own real, distinct URL (e.g. `/sa/about` vs `/sa/ar/about`), derived by `RegionContext` from the URL path segment right after the region prefix (`/sa`, `/sa/ar`, `/syr`, `/syr/ar`).

**Why:** the original implementation stored language as a localStorage-only client toggle, so both languages "shared" one URL. Since SSR/prerendering always defaults to English when `window` is undefined, every prerendered page's hreflang tags falsely claimed an ar-SA/ar-SY alternate that, when actually crawled, only ever served English — making hreflang non-functional for SEO. Making `/ar` a real URL segment (prerendered separately) fixes this at the root.

**How to apply:** `regionPrefix` from `useRegion()` is the single source of truth for building internal links (`regionPrefix + path` pattern) and is already `/sa`, `/sa/ar`, `/syr`, or `/syr/ar`. Any new page/route must be added to `App.tsx`'s `REGION_LANG_PREFIXES` loop, `prerender.ts`'s route list (English routes auto-get `/ar` variants via `toArabicRoute`), and `sitemap-sources.ts`/`generate-sitemap.ts`. `SEOHead.tsx` emits all 4 region×lang hreflang combos + x-default from `basePath` (lang/region-agnostic path) — never hand-roll canonical/hreflang per page.
