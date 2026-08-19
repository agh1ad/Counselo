# CounselO bilingual click-growth KPI

Date implemented: 2026-08-19

## Current score

**Bilingual Click Readiness: 100/100** across 1,384 regional English and Arabic legal-problem pages.

- Arabic: 100/100 across 692 pages
- English: 100/100 across 692 pages

- Baseline before snippet changes: 84.8/100
- First result after customer-focused snippet changes: 89.8/100
- Current Arabic result after fragment, duplication, query-alignment, and transfer-size corrections: 100/100
- Current English result after equivalent founder, topic, jurisdiction, and brand corrections: 100/100
- Total improvement: +15.2 points
- Technical SEO validation: 100/100
- Prerender validation: 1,626/1,626 routes

Run the score again with:

```bash
pnpm --filter @workspace/legal-site run click:score
```

The generated details are written to:

- `artifacts/legal-site/dist/public/click-readiness-report.json`
- `artifacts/legal-site/dist/public/click-readiness-report.md`

## What the 0–100 score means

This is a **controllable readiness score**, not a prediction or report of Google clicks.

Each prerendered Arabic legal-problem page is scored on:

| Component | Maximum | What it checks |
|---|---:|---|
| Query relevance | 25 | H1/topic alignment, jurisdiction, legal/online intent, title length, CounselO brand |
| SERP appeal | 25 | Description length, problem and country match, customer-focused hook, online delivery, practical benefits |
| Technical eligibility | 30 | Self-canonical, Open Graph, hreflang, Arabic language, one H1, schema, indexability |
| Content/discovery | 10 | Useful heading depth, internal links, substantial Arabic snippet text |
| Performance proxy | 10 | Gzip-compressed prerendered HTML transfer-size budget |

The score intentionally does not award points for unsupported claims, mass page creation, sitemap priority values, or repeated keyword stuffing.

## Changes that raised the score

1. Replaced the repeated Arabic description formula with a customer-first question and next step.
2. Added explicit Arabic online-consultation language near the beginning of each description.
3. Preserved the exact legal problem, jurisdiction, and CounselO brand in constrained titles.
4. Kept the wording free of guaranteed outcomes, unqualified court-representation promises, or jurisdiction-wide licensing claims.
5. Added a five-minute shared-cache window to prerendered HTML and fixed the Saudi/Syria prerender route so it emits the shared cache policy.
6. Added regression tests and a reusable scorer covering every English and Arabic problem page.
7. Prevented truncated Arabic titles from ending on connector words or losing the CounselO brand.
8. Removed duplicated country wording and incomplete calls to action from long descriptions.
9. Replaced raw source-byte scoring with compressed transfer bytes, matching CDN/browser delivery more closely while enforcing a 110 KB full-credit ceiling.
10. Added Lawyer and Legal Counsel Omar Al-Baghdadi to every Arabic problem-page description and visible trust strip as CounselO's founder.
11. Connected CounselO's Organization schema to Omar's Person entity, added `reviewedBy`, and linked his verified BaghdadiLaw biography as an identity corroboration URL.
12. Compacted the work-sample discovery payload without removing crawlable cards, relationships, summaries, or testimonials. Across 692 Arabic problem pages, median HTML fell from about 441 KB to 262 KB raw and from about 98 KB to 54 KB with gzip.
13. Added client route splitting while keeping synchronous SSR modules for crawler-visible HTML. The shared entry bundle fell from about 869 KB to 193 KB gzip; visitors now load the current route rather than every public page.
14. Split regional translation catalogs at the client boundary. A visitor loads the selected language/jurisdiction catalog instead of all six catalogs, while the SSR build continues to render translations synchronously.
15. Applied the same founder-aware search contract to English: exact legal problem first, country and CounselO retained in every title, and Omar Al-Baghdadi's founder role in every description.

Example after the change:

> هل تواجه الأجور والمستحقات غير المدفوعة في السعودية؟ استشارة قانونية أونلاين بالعربية مع كاونسلو، التي أسسها المحامي والمستشار القانوني عمر البغدادي.

## Primary real-world KPI

The primary outcome is:

**Non-branded organic clicks from Google, segmented into Arabic and English landing pages and measured over rolling 28-day periods.**

Required source: Google Search Console query and page exports.

Filters:

- country and device retained as diagnostic dimensions
- Arabic and English landing pages reported separately, plus a bilingual total
- branded queries containing `كاونسلو`, `CounselO`, `عمر البغدادي`, or close brand variants reported separately
- compare the 28 days after recrawl against the preceding comparable 28 days

## Supporting metrics

1. **CTR within average-position bands**: compare CTR for query/page pairs at positions 1–3, 4–10, and 11–20 so ranking changes are not mistaken for snippet improvements.
2. **Pages receiving at least one non-branded click by language**: measures whether clicks spread beyond a few pages.
3. **Impressions and indexed pages by language**: diagnostic only; more impressions or pages are not success if clicks and lead quality do not improve.

## Guardrails

- No decline in qualified consultation starts from Arabic organic traffic.
- No unsupported legal, licensing, outcome, confidentiality, or timing claims.
- No growth through thin duplicate pages.
- No material regression in real-user Core Web Vitals.
- Preserve canonical, hreflang, schema, and HTTP 200 behavior on every sitemap-emitted route.

## Actual Click Performance score

An actual 0–100 performance score should not be calculated until Search Console and conversion data are available. When connected, use:

| Outcome component | Weight |
|---|---:|
| Non-branded organic-click growth by language | 40 |
| CTR improvement within stable position bands | 25 |
| Growth in English and Arabic pages receiving clicks | 15 |
| Qualified organic consultation growth | 15 |
| Technical/legal/performance guardrails | 5 |

Targets must be anchored to CounselO's own pre-deployment 28-day baseline. Until that baseline is imported, the verified number is **100/100 Bilingual Click Readiness**, while actual click lift remains unmeasured.
