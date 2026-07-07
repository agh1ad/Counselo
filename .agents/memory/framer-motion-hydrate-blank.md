---
name: Framer Motion v12 + hydrateRoot blank content
description: Why all animated content stays invisible in production on CounselO, and the fix.
---

## The rule
Always use `createRoot` (never `hydrateRoot`) in entry-client.tsx for this site.

**Why:** Framer Motion v12 bakes `initial` prop values (`opacity:0`, `transform:...`) as inline styles into server-rendered HTML. When `hydrateRoot` is used, the hydration context suppresses Framer Motion's `initial → animate` transitions — so all animated content remains permanently invisible in production even though the JS bundle loads and executes correctly. Switching to `createRoot` makes production behaviour identical to dev mode: React mounts fresh and Framer Motion animations run normally.

**How to apply:** `entry-client.tsx` must call `createRoot(rootEl).render(...)` unconditionally. Do NOT add back the `hydrateRoot` path. The prerendered HTML (with `data-ssr="true"`) is still served to SEO crawlers before JS executes, so search-engine indexing is unaffected.

## Related facts
- `MotionConfig isStatic` does NOT change the SSR output; Framer Motion still renders at `initial` state during `renderToString` regardless.
- `build.target: 'es2020'` breaks Framer Motion v12 (uses ES2022 private class fields) — never set this. Vite's default target is safe.
- The main JS bundle is ~3.4 MB / 823 kB gzipped due to translation files (ar.ts + en.ts). Users see prerendered opacity:0 content during the download window — this is a known pre-existing issue, not introduced by the hydrateRoot fix.
