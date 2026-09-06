# Search-intent comparison and mobile-template handoff

Status: both defined prepublication tasks verified locally. Git/Replit handoff follows below; publication remains with the user.

## Scope and evidence

Every one of the 1,468 existing indexable routes is accounted for in `seo-final-comparison-review-2026-09-06.json`: 1,120 matter pages, 118 service pages, 90 article pages, 90 work pages and 50 core pages. The comparison reuses relevant country/topic or template comparator groups and explicitly carries forward the preceding complete bilingual body assessments. It does not claim 1,468 separately observed search-result rankings, measured keyword demand or coverage of every possible future query.

The independent practice pages and article sections were used to compare useful questions, service selection and navigation. Legal assertions were checked against official sources before additions. Candidate search exports alone were not counted as reviewed competitors. Policy pages retain their actual disclosure purpose; work examples retain the facts supplied by their source. The bankruptcy opinion, for example, cannot acquire a selected procedure or outcome that its source never states.

Nine source-backed answer groups cover 40 Arabic and English matter URLs: Saudi insurance complaints, UAE Sanadak eligibility, UAE FTA review/reconsideration, Dubai notice drafting/attestation, Saudi investor registration/activity permission, municipal licence suspension, procurement award notification/commencement, administrative judicial services and indicative arbitration costs. Saudi administrative pages also now point to the Board of Grievances. The displayed answers and FAQ structured data share one data source. This is not a claim that legal-service FAQs qualify for Google FAQ rich results.

## Mobile scope

As requested, mobile measurements cover shared templates and relevant language/regional variants, not every URL. The retained measurements include 48 representative routes across the public template families; later targeted checks cover the changed contact and blog templates. Arabic/English contact interactions are checked in all three regions.

The lab uses a local production build, Chrome at 390 × 844, device scale 1, 4× CPU slowdown, 150 ms network latency and 200,000 bytes/second download throughput. This is a controlled desktop-browser simulation, not real-phone field Core Web Vitals, Replit TTFB, Lighthouse scoring or Search Console performance data. Menu/disclosure event durations do not establish field INP.

Changes include responsive library/flag/decorative images, compact favicons, lazy footer icons and a lightweight shared-FAQ import that avoids loading the entire matter catalogue on shared pages. The blog decoration no longer eagerly downloads its large original alongside mobile artwork. The contact grid and wrapping submit label prevent mobile overflow. Contact controls remain disabled until client initialization completes, preventing a premature native form navigation; direct email and WhatsApp links remain available.

The initial exploratory baseline with duplicate observers is excluded. Early clean baseline/after files contain initialization-script storage-access errors from third-party frames; these are disclosed as harness errors, not silently counted as site passes. Subsequent observer initialization is limited to the top frame. Two later CLI timeouts are retained as failed attempts and followed by successful repeated cases. Contact overflow and an early-interaction timeout prompted the fixes above and passed the final checks on the corrected build.

## Release boundary

The user will publish. No deployment, sitemap submission, IndexNow request or outbound consultation is part of this handoff. Current public indexing, rankings and production delivery must be assessed after the user publishes.

## Final verification

- Workspace type checks and all 120 legal-site tests passed.
- Production build and all 1,468 indexable-page technical SEO checks passed, with zero errors or warnings.
- Complete link assessment read all 1,468 routes: zero omitted, zero unreachable, every page with an incoming same-language content link, maximum depth three.
- Source/answer delivery passed on 56 distinct affected routes: 40 answer pages and 26 Saudi administrative pages, with overlap.
- All 12 browser interaction cases passed, including empty-form validation, longest-label selection in all six regional/language contact variants, language/country switching and collection-to-detail navigation. Zero API writes were attempted.
- With JavaScript blocked, the contact inputs and submit control were disabled and both direct contact alternatives remained available.
- All 24 final cold-cache runs on eight affected template variants passed the HTTP, heading, browser-error, image and overflow checks. Observed CLS was zero in these final runs. The broader template measurements account for 48 representative routes.
- Mobile/desktop About, library and contact screenshots were inspected. Responsive assets were selected, and all three footer icons loaded.

Final local cold-cache measurements (three runs per row; milliseconds):

| Template variant | Median LCP | LCP range | Median TTFB |
| --- | ---: | ---: | ---: |
| /blog | 2476 | 1640–5172 | 1018 |
| /blog/ar | 1616 | 1496–1632 | 298 |
| /sa/ar/contact | 1508 | 1468–1592 | 41 |
| /sa/ar/services/administrative-law/administrative-objections-and-appeals | 1352 | 1328–1832 | 31 |
| /sa/contact | 1372 | 1296–1564 | 37 |
| /sa/services/administrative-law/administrative-objections-and-appeals | 1448 | 1352–1532 | 30 |
| /uae/ar/contact | 1588 | 1456–1728 | 25 |
| /uae/contact | 1392 | 1392–1524 | 25 |

These timings describe the stated local simulation. The first English-blog request included local server startup (TTFB about 3.4 seconds); that outlier is retained in the range. Earlier About and broader-template observations are retained separately in the JSON report, with their sample counts and limitations.

Reproduce the browser checks through the Playwright CLI `run-code --filename` using `scripts/seo-template-interactions.js` and `scripts/seo-contact-initialization-check.js`. The preview runs on ports 24438/24441 as described in `serve-seo-preview.ts`. For controlled timings, run `scripts/run-controlled-mobile.py` with an explicit route-list JSON, output report and repeat count. No default all-URL mobile sweep is configured.
