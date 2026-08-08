# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the authoritative production-shaped server (port 5000); it owns `/api` and the public legal-site renderer
- `pnpm --filter @workspace/legal-site run sitemap:validate` — audit the live sitemap index, child inventories, page status/canonicals, indexability, hreflang reciprocity, published-only records, UAE coverage, and lastmod baseline
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- `artifacts/api-server/src/app.ts` is the single production entry point. It owns API routes, public HTML, discovery endpoints, static assets, redirects, and 404 responses.
- `lib/api-zod/src/public-site-policy.ts` is the pure source of truth for public route inventory, canonical URLs, hreflang, discovery XML/RSS, cache policy, and not-found output.
- `docs/canonical-url-matrix.json` is the checked-in machine-readable canonical contract for every public page type, dynamic content class, redirect, and fallback.
- `sitemap.xml` is a sitemap index; `sitemap-core.xml`, regional service sitemaps, `sitemap-blog.xml`, and `sitemap-work.xml` separate discovery diagnostics by purpose.
- Blog articles use `/blog/en/:slug` and `/blog/ar/:slug` only after `hasQualityBilingualBlogContent` confirms complete independent translations; otherwise `/blog/:slug` remains the canonical fallback.
- `lib/api-zod/src/article-provenance.ts` is the shared article evidence block and legacy fallback; publish writes provenance fields, including exact Saudi topic sources, to `blog_posts`.
- `artifacts/legal-site` builds the client, React SSR bundle, and prerendered HTML consumed by the API server; it does not run a second production HTTP server.
- CMS blog/work discovery remains database-backed through the API server, while the legal-site build supplies the stable route inventory and static shell.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do not reintroduce a standalone legal-site HTTP server. Add public serving behavior to the API entry point and shared pure policy modules instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
