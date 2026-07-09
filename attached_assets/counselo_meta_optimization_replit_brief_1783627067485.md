# CounselO Meta Title and Meta Description Optimization Handoff

Generated: 2026-07-09

## Scope

Complete optimized metadata set for every exported CounselO page.

- Total pages covered: 127
- English pages: 63
- Arabic pages: 63
- Region picker/root pages: 1
- Syria blog URLs needing redirect/canonical cleanup: 12

## Files

1. `counselo_full_meta_titles_descriptions.csv` — full matrix.
2. `counselo_full_meta_titles_descriptions.json` — structured implementation data.
3. `counselo_optimized_meta_map.ts` — TypeScript map keyed by route path.
4. `counselo_full_meta_titles_descriptions.xlsx` — formatted workbook.

## Implementation Rules

For every page, set:

```ts
metadata.title = optimized_meta_title
metadata.description = optimized_meta_description
openGraph.title = optimized_meta_title
openGraph.description = optimized_meta_description
twitter.title = optimized_meta_title
twitter.description = optimized_meta_description
schema.WebPage.name = optimized_meta_title
schema.WebPage.description = optimized_meta_description
```

Canonical must remain the canonical in the matrix unless `recommended_new_canonical_if_redirected` is populated. For those Syria blog pages, add a 301 redirect from the old Saudi-worded slug to the Syria-specific slug, then update canonical, OG URL, and schema URL to the new canonical.

## Rules Used

- Titles are concise, jurisdiction-specific, and brand-consistent.
- Descriptions are written for high-intent search users and AI answer extraction.
- Saudi pages use Saudi-law search language.
- Syria pages use Syria-law search language.
- Wrong brand mentions such as Adlex/أدليكس are removed.
- Generic stuffing is reduced.
- Contact and service pages include conversion language without aggressive keyword stuffing.

## Replit Acceptance Criteria

- All 127 pages have updated title and description.
- No page title or description contains `Adlex`, `أدليكس`, `مدونة قانوني القانونية`, or `قانوني | كاونسلو`.
- English pages use English metadata only.
- Arabic pages use Arabic metadata only.
- Syria pages do not use Saudi legal terms except where intentionally comparing laws.
- Open Graph, Twitter, and JSON-LD use the same optimized title/description.
