# Homepage search content review — 11 September 2026

Scope: the global English `/` and Arabic `/ar` homepages. This is a local content and rendering review, not a full-site audit or a ranking report.

## Intent ownership

The intent mapping below is editorial inference from the services and existing routes. No Search Console, keyword-volume or ranking data was supplied.

| Intent | Primary destination | Homepage contribution |
| --- | --- | --- |
| CounselO; bilingual online legal consultation across supported countries | `/`, `/ar` | Platform definition, founder, services, process and intake |
| Legal consultation in a specific country | `/sa`, `/syr`, `/uae` and corresponding `/ar` routes | Country picker and contextual jurisdiction links |
| Country-specific practice-area help | Existing regional `/services/:slug` routes | 12 practice areas with 36 registry-derived links per locale |
| Document review; choosing consultation scope | Homepage service section and regional contact routes | Five products with existing registry-backed use cases and deliverables |
| Fees, preparation, delivery, availability and representation | Homepage FAQ and regional contact routes | Eight direct answers; scope and availability qualifications |

## Changes

- Added online consultation intent to titles and replaced introductory metadata with concrete service descriptions.
- Shortened hero; retained the full platform/founder/language/geography definition once in the visible introduction and reused it in Organization schema.
- Replaced repeated practice-area descriptions with four explicitly illustrative situations, not client stories or legal outcomes.
- Used existing consultation product `bestFor` and `includes` fields to distinguish service selection and deliverables.
- Expanded FAQs to cover written output, document preparation and contract review; kept visible answers and FAQ schema generated from the same source.
- Made career-wide experience attribution and the non-audited scope explanation visible beside the figures. The 20,000+ figure remains unverified in the existing claims registry; this edit does not independently substantiate it.
- Removed raw internal product arrays and operating-policy objects from JSON-LD and emitted five typed Service nodes tied to visible service anchors and the established provider entity.

## Sources and factual boundaries

- Service scope and deliverables: `lib/api-zod/src/consultation-products.ts`.
- Founder/entity: existing shared entity architecture and linked professional profile; no new licence, office, client or review claims added.
- Experience: `artifacts/legal-site/src/lib/public-claims.ts`; approved start year 1996 and explicitly unverified volume figure.
- Google guidance: https://developers.google.com/search/docs/appearance/ai-features — foundational SEO and helpful content remain relevant to AI search features.
- Service vocabulary: https://schema.org/Service.

No new substantive statutory advice, fabricated professional review, artificial freshness dates, ratings or ranking guarantees were introduced.

## Validation and limits

The SSR build and checks in `output/homepage-search-2026-09-11/verify-ssr.mjs` cover both homepage HTML outputs. Browser checks cover both locales at 390 and 1440 pixels. The existing content, claims and locale tests were run, and TypeScript was checked.

Production publication, public HTTP rendering, index coverage, rankings, traffic and AI citations remain unverified. The raw HTML artifacts prove local server rendering only. Search-engine rich-result testing was not performed.
