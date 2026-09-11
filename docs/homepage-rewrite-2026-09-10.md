# CounselO homepage rewrite — 10 September 2026

Scope: `/`, `/ar`, `/sa`, `/sa/ar`, `/syr`, `/syr/ar`, `/uae`, `/uae/ar`. Local implementation; no GitHub push or production publication.

## Content and navigation

The global homepage now explains the platform, founder, consultation formats, jurisdiction scope, process, reasons to choose the service, supporting publications, practical FAQs and contact. A compact country selector remains immediately available in the hero. Full jurisdiction cards explain that the relevant law depends on the matter, rather than the visitor’s residence. Country and consultation links preserve Arabic or English.

The Arabic and English global pages share a component and have matching content fields. The design retains CounselO’s green/gold palette, existing logo, geographic illustrations and founder portrait. It uses native links, details/summary disclosures, an ordered process list, a skip link and visible focus states. No new runtime dependency was added.

The six regional homepages now place founder identity and practice areas before the process. Their visual sequence follows document order; CSS section reordering was removed. Reasons to choose CounselO follow the process, and supporting questions precede the closing contact section. Existing region-specific service links and live publication components remain in place.

## Claim and entity boundaries

Business facts were checked against the repository’s shared entity architecture, consultation product catalogue, operating policy and public-claims module. This is a consistency review, not independent certification of credentials or professional legal approval.

CounselO is the digital consultation platform. Omar Al-Baghdadi is its founder. Al-Baghdadi Law Firm remains a distinct professional institution. The copy links to the existing professional profiles and does not invent awards, testimonials, comparative superiority or local offices. The global founder section places the existing experience figures together with their limitations inside an optional disclosure.

Fees, timing and scope are agreed before paid work. Court representation and reserved work remain separately scoped. A 24-hour response is qualified by scope, urgency, intake completeness and availability; it is not a promised legal result.

## Search architecture

Global pages use a single H1, labelled sections and a shared bilingual question collection for visible FAQs and JSON-LD. Their existing English/Arabic canonicals, reciprocal language alternates and x-default are preserved. WebSite, Organization and Person reuse the canonical entity IDs. Regional consultation markup uses Service with the organization as provider and the relevant country as area served, avoiding unsupported physical-address assertions in the homepage graph. Regional optimized metadata continues to come from the existing SEO override registry where configured.

Official reference: [Google’s AI features and your website guidance](https://developers.google.com/search/docs/appearance/ai-features). Google recommends crawlable textual content, useful internal links and structured data consistent with visible content. It does not require special AI markup or guarantee indexing or inclusion.

## Verification

- TypeScript passed.
- All 137 repository tests passed, including updated claim, locale, FAQ-source and semantic-order checks.
- Production client, SSR and server bundles built. Existing large-chunk and UI sourcemap warnings remain; these are not field performance measurements.
- The first release attempt hit an external published-content timeout. A temporary preview-only configuration bypassed sitemap generation for browser checks; the subsequent normal client build, including sitemap generation, passed after connectivity recovered.
- Chromium checked all eight homepages at 1440, 768, 390 and 320 pixels: 32 combinations, one H1 each, correct language/direction, no horizontal overflow and no broken loaded images.
- Language switching, UAE Arabic navigation, FAQ disclosure, skip link and contact destinations were exercised. No messages or live form submissions were sent.
- Eight server-rendered homepage checks passed: a single main landmark and H1, expected canonical, valid JSON-LD, unique IDs and valid local section anchors.
- Arabic desktop/mobile and English desktop/mobile screenshots were inspected. This is Chromium browser QA, not physical-device or Safari/Firefox certification.

Evidence files are under `output/homepage-rewrite/` and `output/playwright/homepage-rewrite-*`. Published content fetching and analytics produced transient network errors during the initial preview; no uncaught application exception was observed. Final production HTTP checks and prerender totals are recorded in the completion entry below.

No ranking, indexing, AI citation, conversion uplift or field Core Web Vitals outcome is claimed. Production publishing, live post-release checks and subsequent Search Console measurement remain separate steps.

## Completion evidence

The final prerender completed **1,475 / 1,475 routes**, using 47 published posts and 47 work samples. Normal sitemap generation and production client, SSR and server builds passed. The preview is served by the actual production SSR server at `http://localhost:4177`; Vite’s generic preview is unsuitable here because this project stores route HTML under `__pages`.

All eight homepage HTTP requests returned 200 with distinct, correct route content. Canonicals, language alternates, main landmarks, H1s, JSON-LD and section anchors passed on those actual responses. The production bundle also passed the Arabic-to-English switch interaction. Among 227 internal destinations extracted from the eight homepages, static destinations have prerenders; 27 work-detail destinations use the existing live API rendering route by design.

The temporary development-preview configuration was removed. The local production preview remains available for review. No production publication, Git commit or GitHub push was performed.

Final site-wide SEO validation completed across 1,475 pages with **zero errors**. It reports 244 warnings: 127 existing title-length warnings, 115 existing description-length warnings, and two optional legacy `geo.region` warnings on the global selector pages. No single-country geo marker was invented for a platform covering three countries. The jurisdiction-content detector now excludes navigation labels, with tests confirming that Saudi legal statements in Syrian editorial content still remain detectable.
