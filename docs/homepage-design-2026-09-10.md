# Global homepage and jurisdiction picker redesign

Scope: the shared English `/` and Arabic `/ar` homepage. Built on the existing uncommitted rewrite; regional homepages and unrelated working changes were retained. No commit, push or publication was requested or performed.

The hero now presents online consultation and the three jurisdictions directly, with a white country-selection panel, descriptive country links, flags, visible directional affordances, and a contact route for uncertain or cross-border matters. Emerald, gold, Playfair Display and the existing Arabic typography preserve the brand. The founder portrait, service grid, process, country cards and closing contact area received coordinated styling.

The supplied copy was adapted into equivalent English and Arabic content, including 12 expandable practice-area groups, three audience groups, six consultation deliverables, cross-border guidance and a qualified response target. The existing shared consultation catalogue, founder identity, experience disclosure, representation policy, FAQ schema and live publication components remain in use. The supplied experience figures remain in the existing qualified disclosure. No new legal credentials or results were invented.

## Fresh checks

- TypeScript passed; all 137 existing tests passed.
- Production client and SSR bundles passed. Existing source-map and large-bundle warnings remain.
- Chromium: English and Arabic at 1440, 768, 390 and 320 pixels; one H1, correct direction, correct locale country links and no horizontal overflow in all eight combinations.
- Keyboard skip link, practice-area disclosure, UAE Arabic navigation and Arabic-to-English switching passed.
- Both local homepage HTTP responses returned 200 with the new content already rendered, one main landmark, one H1, correct canonical, unique IDs and valid section anchors.
- Desktop and mobile screenshots inspected. Evidence: `output/playwright/home-design-*`.

The local production preview is at http://localhost:4177. Its live publication API endpoints return 404 because the API is not served there; prerendered published content is available. This does not establish deployed API behavior. No public deployment or search outcome is claimed.

Final prerender completed 1,475/1,475 routes using 47 published articles and 47 work samples. The final browser media check found no broken loaded images or uncaught application errors. The local publication API limitation above remains.

## Browser comment refinements

Moved the centralized experience figures into a large, always-visible founder statistics row while retaining the methodology disclosure. Redesigned the five consultation formats as four icon-led cards and one highlighted comprehensive format, with exactly one shared consultation CTA. Added localized Legal Library navigation to the header.

TypeScript and all 137 tests pass. Chromium checks at 1087, 390 and 320 pixels in both languages confirm no horizontal overflow, visible statistics outside disclosures, a single services CTA, and matching library destinations. Screenshots and results are in `output/playwright/home-comments-*`.
