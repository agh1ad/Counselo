# CounselO Latest Full SEO Export Audit

Generated: 2026-07-09

## Verdict

Not 100/100 yet, but much closer than the previous export.

Estimated export-only score: **90/100**.

The main visible SEO layer is now strong: titles, descriptions, hreflang, OG/Twitter, and most canonical fields are fixed. The remaining blockers are mostly old redirect routes and structured-data cleanup.

## Passed Checks

| Check | Result |
|---|---:|
| Total rows | 139 |
| Unique routes | 139 |
| Missing titles | 0 |
| Missing descriptions | 0 |
| Titles over 65 characters | 0 |
| Descriptions over 160 characters | 0 |
| Empty hreflang rows | 0 |
| OG/Twitter title-description mismatches | 0 |
| OG URL mismatches | 0 |
| Adlex / أدليكس in schema | 0 |
| aggregateRating schema | 0 |
| SpeakableSpecification schema | 0 |
| Invalid SearchAction schema | 0 |

## Remaining Blockers

| Issue | Count |
|---|---:|
| Old Syria Saudi-slug routes still rendering as indexable pages | 12 |
| Canonical-route mismatches caused by those old routes | 12 |
| Root page language/dir mismatch | 1 |
| HTML entities in visible metadata | 3 |
| Old `قانوني السعودية` wording in schema | 1 |
| Policy/terms WebPage schema URL/@id mismatches | 8 |
| Blog Article schema missing @id/mainEntityOfPage | 36 |
| Arabic schema routes with English URLs | 4 |
| Arabic schema URL fields pointing to English routes | 45 |
| Arabic breadcrumbs pointing to English routes | 4 |
| OfferCatalog count issues | 2 |
| Home serviceType count issues | 4 |
| Syria child-custody schema still says Saudi courts | 2 |
| Syria about Person description typo | 2 |

## Exact Fixes Replit Must Apply

1. Apply server-side 301 redirects for the 12 old Syria blog URLs that still contain `saudi-arabia` or `saudi-labor-law`.
2. Remove those 12 old URLs from sitemap and normal SEO export.
3. Fix policy and terms WebPage schema URLs and add `@id = canonical + "#webpage"`.
4. Add `@id` and `mainEntityOfPage` to all Article schema objects.
5. Fix Arabic schema URLs on:
   - `/sa/ar/services`
   - `/syr/ar/services`
   - `/sa/ar/contact`
   - `/syr/ar/contact`
6. Replace `قانوني السعودية` with `كاونسلو السعودية`.
7. Fix Syrian child-custody Arabic schema text so it says Syrian courts, not Saudi courts.
8. Fix Syria About Person description typo: do not say “across Syria, UAE and Syria.”
9. Fix home LegalService `serviceType` arrays and OfferCatalog counts:
   - Saudi = 17 services.
   - Syria = 20 services.
10. Replace visible HTML entities:
   - `&#x27;` → `'`
11. Set the root page language/dir consistently:
   - Recommended: `html_lang="en"`, `html_dir="ltr"`.

## Files

Forward `counselo_latest_remaining_seo_patch.ts` to Replit.
