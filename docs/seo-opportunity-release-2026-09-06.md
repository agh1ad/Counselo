# CounselO: every-page SEO opportunity implementation

This round accounts for all **1,468 retained Arabic and English URLs**, with a recorded change or a reason to retain each page's existing purpose. Publication and public verification are pending until the release evidence below is filled. The overall visibility goal remains open: this report does not claim maximum ranking or that every conceivable search intent belongs on every page.

## Implemented opportunities

- All 45 reviewed article records now have a topic-based route from the matching-language legal library: seven reading groups and 90 language-specific links. Links resolve against current published records.
- Related legal matters present closer subject matches first while preserving distributed discovery across all 1,120 matter URLs. The complete HTML graph has no unreachable page and no page without a same-language incoming link outside header, navigation and footer. Links from about pages and consultation forms resolve the 14 previously identified gaps for vision and policy pages.
- All 200 observed Search Console strings were reassessed privately. 51 destination assignments changed, including precise article/matter destinations and removal of inappropriate jurisdiction matches. Four observed needs received source-backed bilingual answers: Saudi unpaid leave, contract simulation, franchise versus agency, and UAE employer passport retention. These answers retain jurisdiction and fact-specific limitations. An ambiguous query is not treated as proof of one country's demand.
- Search-result candidate discovery covers all 118 service language pages. Queries explicitly name the page's country and language. Search-provider location/device were not controlled, and this is **not** a claim of reading every competitor page, measuring Google/Bing positions, or conducting separate SERP research for all 1,120 matters.
- Shared-page preference restoration now runs inside the route's Suspense boundary after hydration. A saved UAE preference previously caused the library to replace server-rendered content and shift its layout. The initial server state is preserved, followed by a non-urgent preference update.
- External authority contributions are prepared as unsent proposals based on existing public material. No independent endorsement, office, licence, review, new case fact or acquired link is invented.

## Verification

Workspace type checks and all 118 website tests pass. Production client, SSR, prerender and standalone server builds pass. The technical validator passes all 1,468 pages with zero errors or warnings. Evidence is separated by layer:

| Layer | Evidence |
| --- | --- |
| Inventory and per-page decisions | [All 1,468 decisions](seo-opportunity-ledger-2026-09-06.json) |
| Complete initial-HTML link graph | [All-page graph](seo-opportunity-graph-2026-09-06.json) |
| Service search discovery | [118 country/language searches](seo-service-search-research-2026-09-06.json) |
| New answers and contextual links | [20 affected pages, eight answers and 90 article links](seo-opportunity-delivery-local-2026-09-06.json); public verification follows publication |
| Browser regression | [30 checks passed](seo-opportunity-browser-local-2026-09-06.json): zero hydration errors, overflow or measured layout shift; correct region contact paths. Executed with `scripts/seo-opportunity-browser-check.js`. |
| Public pages and redirects | Full retained-inventory sweep added after publication |

The initial background performance run is invalid because painting was deferred until foreground activation; it is retained privately and excluded from reported timing results. [The foreground baseline](seo-mobile-lab-baseline-2026-09-06.json) is a diagnostic desktop-Chromium run at a mobile viewport, not a field Core Web Vitals score. Search Console currently lacks sufficient field data; absence of a report does not mean a pass. No speed improvement is inferred from unrelated or differently loaded runs.

## Remaining work toward the visibility goal

Every page records these evidence limits individually:

- Page-query-country-device observations after search engines process the release are needed to decide further title/snippet changes, assess cannibalisation, and measure indexing, CTR and qualified demand.
- Service search candidates need deeper comparison when a concrete content or ranking gap warrants it; this round does not certify exhaustive competitor superiority.
- Additional original professional contributions require real, attributable material. Independent editorial citations require acceptance by external publishers; [the authority plan](seo-authority-development-2026-09-06.md) is prepared but unsent.
- Field mobile performance and real interaction measurements remain unmeasured where the account has insufficient data. Browser samples do not substitute for every URL's field performance.

These are recorded remaining opportunities, not omitted pages. No completion label is applied to the broader ranking goal.

Google's [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) inform page differentiation and discovery. The preference change follows React's [non-blocking transition guidance](https://react.dev/reference/react/startTransition).
