# CounselO Final SEO Check

Generated: 2026-07-09

## Result

The site is **not 100/100 yet** based on the latest uploaded export.

Estimated current export score: **72/100**.

The visible meta title/description layer is mostly good, but the site still has technical SEO and schema issues that will prevent a true 100/100 result.

## Passed

- Total exported rows: 139
- Unique routes: 127
- Missing titles: 0
- Missing descriptions: 0
- Descriptions over 160 characters: 0
- OG/Twitter mismatches: 0
- Canonical route mismatches: 0

## Blocking Issues

1. **Duplicate routes:** 12 duplicate route entries.
2. **Hreflang is empty:** 139 rows have no hreflang values.
3. **Wrong HTML lang attribute:** 69 rows have the wrong `lang` value, mostly Arabic pages marked as English.
4. **Missing/wrong dir attribute:** 139 rows have empty or wrong `dir`.
5. **Old brand still in schema:** 12 routes still contain `Adlex` / `أدليكس` inside schema.
6. **Old blog brand still in schema:** 3 routes still contain `مدونة قانوني القانونية` / old Qanuni wording.
7. **Unsupported largest-platform claims:** 4 routes contain `largest` / `أكبر` claims in schema.
8. **Unsupported aggregateRating:** 86 routes still contain repeated rating schema.
9. **Overused speakable schema:** 74 routes contain SpeakableSpecification.
10. **Invalid SearchAction:** 1 route has search schema pointing to a non-search URL.
11. **Service count mismatch:** 2 Saudi schema routes still say 18 items or include Immigration Law while the visible Saudi service count is 17.
12. **Syria schema contamination:** 12 Syria routes still contain Saudi/MISA/Saudi Labor Law wording inside schema.
13. **WebPage schema URL/@id mismatch:** 86 routes need WebPage schema URL/@id alignment.
14. **Arabic schema URLs point to English pages:** 274 schema URL fields point to the wrong language route.
15. **Arabic breadcrumbs point to English pages:** 57 routes have wrong-language breadcrumb URLs.
16. **HTML entities in metadata:** 16 rows contain source-level HTML entities like `&amp;`.
17. **Titles over 65:** 3 routes still exceed the target length.

## Required Files for Replit

Forward:

1. `counselo_final_100_required_seo_patch.ts`
2. This audit file

## Acceptance Criteria for 100/100 Claim

Before claiming 100/100, the next export must show:

- 0 duplicate route rows.
- 0 empty hreflang rows for indexable pages.
- Arabic pages have `lang="ar"` and `dir="rtl"`.
- English pages have `lang="en"` and `dir="ltr"`.
- 0 `Adlex` / `أدليكس` anywhere, including schema.
- 0 `مدونة قانوني القانونية` or `قانوني السعودية` anywhere.
- 0 unsupported `largest` / `أكبر` claims unless evidence is visible on page.
- 0 aggregateRating schema unless exact visible reviews exist on the same page.
- 0 SpeakableSpecification unless intentionally supported and selectors exist.
- WebPage schema `@id = canonical + "#webpage"` on every page.
- WebPage schema `url = canonical` on every page.
- Article schema uses `@id = canonical + "#article"` and `mainEntityOfPage`.
- Arabic schema and breadcrumbs use Arabic URLs.
- Saudi service count is consistently 17.
- No Immigration Law schema unless there is a real Immigration Law page.
- Syria schema contains no Saudi/MISA/Saudi Labor Law wording.
- Metadata source strings use `&`, not `&amp;`.
