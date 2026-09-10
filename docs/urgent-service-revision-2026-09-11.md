# Urgent service scope revision — 11 September 2026

User-requested revision applies to all eight English/Arabic urgent-service routes.

- Three services: legal memorandum, statement of claim, review of an existing contract or agreement. No new contract creation, court representation, filing, attendance or case management.
- Response based on client-supplied documents and information; client responsible for accuracy and completeness. Responsibility wording ties exclusions to excluded tasks, court outcomes and deficient client material, preserving liability that cannot lawfully be excluded. This is service-scope copy, not a certification of enforceability in every jurisdiction.
- Target: delivery within three hours after BOTH complete documents and agreed payment. Uses the user's final formulation (payment after documents), with timing/feasibility confirmed before payment.
- Intake Saturday through Thursday only; no urgent cases accepted Friday. Exact delivery date, time and time zone confirmed without inventing office hours or promising 24/7 coverage.
- Urgent fees differ from ordinary fees and are agreed before payment.
- Updated visible copy, FAQ/schema, search metadata and SEO content matrix in both languages. Service grid now presents three items.

## Verification

TypeScript and all 140 site tests passed. Final production build passed. Chromium checked all eight routes at 390 and 1440px (16 layout cases) with three service entries and no horizontal overflow; Arabic and English service sections and Arabic mobile hero were visually inspected. All eight production-preview HTTP checks passed, including new timing, Friday restriction, scope fee text, canonicals, alternates and FAQ/schema parity. Final SEO validation: 1,483 pages, zero errors; the eight urgent pages have no issues. The 246 remaining warnings are elsewhere in the existing site. Evidence in output/playwright/urgent-revision-* and output/urgent-legal-assistance/http-verification.json. Local only; no push or publication.

## Scoped Git release verification

The staged release was exported separately from unrelated homepage and SEO work. Its TypeScript check, 130 site tests, eight contact-input API tests and complete production build passed. Release review also aligned the service-directory summary and contact-form alert with the revised scope, three-hour delivery target and Friday restriction, and updated urgent sitemap modification dates. Unrelated local changes remain outside this release.
