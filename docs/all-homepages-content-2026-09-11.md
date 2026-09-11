# Homepage content and discovery — 11 September 2026

Scope: `/`, `/ar`, `/sa`, `/sa/ar`, `/syr`, `/syr/ar`, `/uae`, `/uae/ar`.

## Content changes

- Shared visible practice directory derives labels and destinations from the service registry. Every global homepage exposes 59 regional practice links; Saudi exposes 17, Syria 20, UAE 22. Urgent assistance remains a separate intake option.
- Saudi's existing ten featured practice descriptions now link to the relevant service pages as well.
- Global navbar includes Blog and Our Work. Regional navbar already used the correct global indexes and retains that behavior: `/blog`, `/blog/ar`, `/our-work`, `/ar/our-work`.
- Saudi has 14 FAQs per language; Syria and UAE each have seven. Questions cover deliverables, preparation, fees, response targets and specific regional concerns. Schema and visible answers share data.
- Syria: replaced the bare Law 18/2021 licensing claim with scoped review of applicable rules and amendments. Qualified representation wording. Added diaspora/property, foreign-issued document and investment intake questions.
- UAE: added emirate/entity/employer/property/forum intake distinctions and questions about employment, tenancy and enquiries from abroad.
- Regional experience labels now distinguish career-wide legal matters from platform client counts. The existing non-audited scope note is visible by the founder figures. Removed generic guarantees of senior oversight and replaced the broad online-service badge with consultation-specific wording.
- Saudi supplementary 40+ training figure was removed; no new credential or outcome assertion was added. Archived original English source remains unchanged; the content test now validates bilingual structure instead of requiring obsolete wording verbatim.

## Intent boundaries

Global pages explain the platform, services and jurisdiction choice. Regional homepages own country-level consultation intent and route visitors into existing practice pages. Detailed legal/procedural intent remains with those service pages; this work creates no new service routes. No first-party query-volume or ranking data was available for this task.

## Verification

- TypeScript passed.
- 22 existing content, claims and bilingual tests passed.
- SSR build passed with two existing sourcemap warnings for UI modules.
- `output/all-homepages-2026-09-11/verify.ts` checks all eight server-rendered pages: one H1, expected practice destinations, FAQ counts and answer presence, publication links. Results are in `ssr-results.json`.
- Browser checks at 390 and 1440 pixels passed on all eight routes: no document overflow; all expected directory links present; correct global navbar publication destinations.

The 20,000+ career-wide figure remains qualified and is not independently verified by this task. No new statutory advice or professional review attribution was added. Production deployment, search-engine indexing, rankings and AI citations were not measured. No Git push or publication was performed.
