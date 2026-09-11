# Urgent Legal Assistance / المساعدة القانونية العاجلة

Added 10 September 2026. Implementation is local; publication, indexing, rankings and actual response performance require separate verification.

## Service and operational scope

Business source: the owner's request in this task. CounselO accepts urgent requests from individuals, businesses and companies for advice, contract drafting/review, statements of claim, memoranda and court representation. Requests may concern any jurisdiction; capability, conflicts, authorization and availability are confirmed before acceptance. No new office, licence, partnership or 24-hour staffing claim is made.

The stated 1–2 hour target is assignment/start after accepted scope, complete documents and confirmed payment. A completed response, document or court appearance has a separately agreed deadline. Fees are individually agreed before payment; the website does not invent a fixed price or process a new payment product.

Contact buttons open WhatsApp and an email draft using the site's existing number and email. The draft asks for parties, jurisdiction, summary, deliverable, official deadline, requested delivery date/time/time zone, available documents and contact details. Documents are attached by the customer in the selected channel after the transfer method is confirmed. No message was sent during testing.

## Routes and search intent

| Audience | English route | Arabic route |
| --- | --- | --- |
| Any jurisdiction | /urgent-legal-assistance | /ar/urgent-legal-assistance |
| Saudi Arabia | /sa/services/urgent-legal-assistance | /sa/ar/services/urgent-legal-assistance |
| Syria | /syr/services/urgent-legal-assistance | /syr/ar/services/urgent-legal-assistance |
| UAE | /uae/services/urgent-legal-assistance | /uae/ar/services/urgent-legal-assistance |

Primary intent: urgent legal assistance / استشارة قانونية عاجلة and المساعدة القانونية العاجلة. Secondary intent: same-day legal advice, urgent contract drafting/review, statement of claim, legal memorandum, hearing preparation and representation requests. Related substantive practice pages retain ownership of their ordinary contract/litigation queries. No thin per-country or per-document duplicate pages were generated.

Observed English and Arabic search results on 10 September 2026 use urgent advice, contract drafting, claims and memoranda as service language. No keyword volume or ranking claim is inferred. “Emergency Law” was avoided because it can also describe laws governing states of emergency.

Technical implementation: eight crawlable pages; matching canonical, social metadata, nine reciprocal language/fallback annotations; Service, BreadcrumbList and visible FAQPage data; sitemap/prerender inventory; homepage discovery, regional directories/menus, footer links and contextual links from existing services. Regional pages include distinct intake instructions. No review stars, invented local offices or fixed-price offers.

Search reference: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — ordinary SEO, accessible content and useful information remain foundational to AI search visibility. Implementing these does not establish ranking dominance, indexation, rich-result eligibility or AI citations.

## Integration decisions

The service registry marks this as `priority-intake`: a cross-practice service, not a distinct branch of substantive law. Practice-source and procedural-inventory tests still cover all practice services. Separate tests verify the urgent service in every region, its lack of duplicate procedural pages, intake routing, language alternates and contact drafts.

The existing form accepts the new slug in all three supported regions and both languages, routes its category as `urgent`, and shows urgent-channel guidance when selected. Requests from other countries use the global WhatsApp/email entry. API region enums are unchanged.

The regional SEO planning matrix marks the new service pages as planned pending publication. Existing unrelated homepage, editorial and audit work was already present in the workspace and is retained.

## Verification evidence

- Site TypeScript check: pass. Site tests: 140 passed. API tests: 100 passed, including the new urgent service in all six supported region/language combinations.
- Initial HTTP HTML: all eight urgent routes returned 200 with correct document language/direction, one H1, self-canonical, social URL, all nine reciprocal alternate annotations, Service/FAQ/Breadcrumb data, visible FAQ parity and team/policy/reading links. Regional geographic metadata is present; global pages do not claim one country.
- All eight urgent routes respond with the local content API unavailable, within the HTTP check's three-second timeout. Saudi/Syrian urgent routes bypass the unrelated CMS discovery fetch.
- Chromium: all eight routes checked at 390px and 1440px; no horizontal overflow or page errors; both primary contact destinations present; FAQs expand; global language switching works in both directions. Desktop and Arabic/English mobile screenshots visually reviewed.
- Discovery and intake: homepage CTA works in both languages; all six regional directories link to the service; all six contact forms correctly preselect the service and show urgent-channel guidance. No form submission or external message was sent.
- Detailed evidence: `output/urgent-legal-assistance/http-verification.json`, `browser-verification.json`, `discovery-verification.log`; screenshots in `output/playwright/urgent-final-*`.

- Final production build: pass, including sitemap generation, client/SSR compilation, prerender and server bundle. Final SEO validation: 1,483 pages checked, zero errors; all eight urgent pages have zero errors and zero warnings. The broader site still has 246 warnings outside these new pages; this is not a claim that all existing SEO/editorial work is closed.
- No Git push or production deployment was performed. Local preview: http://localhost:4190/urgent-legal-assistance (Arabic: /ar/urgent-legal-assistance).
