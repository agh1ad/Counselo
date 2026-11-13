# Counselo website verification — 13 November 2026

This release integrates the reviewed website work with the newer main-branch production cache, admin, translation and contact-attribution features.

## Changes

- Public canonical PDF URLs, faithful text alternatives where needed, crawlable case-page links and document metadata; case previews remain visible.
- Consistent global and country navigation, concise section metadata and collection breadcrumbs for search discovery. Google selects organic sitelinks automatically.
- Platform capability and published-work evidence remain distinct from personal career figures. No fabricated customer feedback or ratings were added.
- Contact recovery, stable enquiry references, encrypted attribution retention, admin throttling, private-response protection, publication-aware caches and document withdrawal checks.
- Updated dependencies, smaller active locale bundles, contrast and first-render contact-layout corrections.
- The newly proposed visible Legal sources panels are absent, as requested.

## Verification

Final verification results are recorded in the local release evidence under `output/sitewide-quality-2026-11-13`, `output/full-site-content-2026-11-13`, and `output/merge-review-2026-11-13`. Temporary fixtures, downloaded PDFs, browser captures and credentials are excluded from this release.

- Page inventory: 1,514 HTML pages (757 per language), 60 PDF URLs and 327 redirects. SEO, semantic and bilingual ledgers passed with zero issues.
- HTTP coverage: all 1,514 routes checked. One local proxy timeout in the final crawl caused 22 dependent flags; the targeted retry validated the page and all eight related language routes, leaving zero unresolved findings. The original ledger and retry evidence are retained.
- Frontend tests: 238 passed; focused jurisdiction-validator regression: 6 passed.
- API tests: 208 passed; affected integration fixtures: 8 passed.
- Shared, frontend and API type checks passed. Final frontend and API production builds passed. The bundler still reports large lazy content/admin chunks; no field Core Web Vitals claim is made.
- Installed dependency audit: zero known advisories across 623 dependencies.
- Document acceptance: 60 PDF GETs, 60 HEADs, 60 legacy redirects, six text alternatives, 120 bilingual detail/schema checks and 14 crawler groups passed.
- Browser coverage: 48 representative routes at mobile and desktop widths (96 samples), followed by 24 samples for affected templates and four settled-animation contact checks. No unresolved runtime, horizontal page overflow or contrast findings remained. Contact layout shift measured 0.000 at both tested widths after the CSS correction. Contact and admin flows use intercepted writes; no real messages or client records were created.

## Operational boundaries

Local verification does not establish live publication, Google indexing/sitelinks, AI citations, field Core Web Vitals or actual email inbox delivery. Publication remains a separate owner-controlled step.

Accepted enquiries are durable and notification retries resume on application startup. To retry while Replit Autoscale has no running instances, enable the separate scheduled recovery command described in `artifacts/api-server/CONTACT_RECOVERY.md`. The code does not create that external schedule.

The checks cover the enumerated routes and workflows; they are not a promise that software can never develop another defect or an independent legal certification of every article.
