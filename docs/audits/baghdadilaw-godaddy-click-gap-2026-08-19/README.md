# BaghdadiLaw vs CounselO: Arabic organic-click audit

Audit date: 2026-08-19
Mode: read-only GoDaddy Dev Mode inspection plus published-HTML and sitemap comparison
Primary audience: Arabic search users

## Executive conclusion

There is no evidence of a secret GoDaddy ranking feature that CounselO lacks.

The most likely explanation for BaghdadiLaw receiving more clicks is a combination of:

1. **A large domain-history advantage.** WHOIS shows `baghdadilaw.co` was created on 2024-08-20, while `counselo-legal.com` was created on 2026-07-01. On the audit date, the domains were approximately 729 and 49 days old. CounselO is too new to have accumulated comparable crawl history, links, branded searches, returning users, and stable query performance.
2. **Hundreds of already-published Arabic exact-intent pages/posts.** BaghdadiLaw's sitemap had 664 URLs, including 332 root-level `my-post...` URLs. Sampled entries use Arabic, search-like titles such as `محامي ومستشار متخصص في القضايا العمالية | السعودية - سوريا` and `محامي ومستشار متخصص في قضايا الشيك | السعودية - الرياض - الدمام و سوريا`.
3. **More aggressive Arabic query wording in snippets.** BaghdadiLaw repeatedly uses phrases such as `محامي ... اونلاين`, `متخصص`, the lawyer's personal name, the exact legal problem, and target countries. CounselO's equivalent titles are accurate but more restrained, while its descriptions often repeat a generic template about facts, evidence, options, documents, WhatsApp, and email.
4. **A personal-identity signal.** BaghdadiLaw consistently foregrounds `عمر بغدادي` and `محامي/مستشار` in titles, descriptions, body copy, and Person/Attorney/LegalService schema. This may attract more clicks than a newer abstract brand, especially for Arabic legal searches where users want a named lawyer.
5. **Lighter pages and faster observed delivery.** In five sequential requests, BaghdadiLaw's Arabic unpaid-wages page had a median time-to-first-byte of about 0.56 seconds and median total download time of about 0.88 seconds. CounselO's Saudi Arabic comparison page had medians of about 0.73 and 1.93 seconds. The downloaded HTML sizes were about 165 KB and 415 KB. This is not a Core Web Vitals test, but it is a real delivery advantage.
6. **GoDaddy/Duda delivery conveniences.** Published HTML showed cached nginx delivery, gzip, CDN-hosted optimized images, LCP image preload metadata, preconnects, lazy-loaded images, responsive image URLs, and speculation/prerender rules. These help delivery but do not independently create rankings or clicks.

## The critical counter-evidence

CounselO is not losing because it has fewer pages or weaker technical SEO.

- CounselO's live sitemap index exposed 1,690 URLs, including approximately 845 Arabic URLs. BaghdadiLaw exposed 664 URLs, including 145 `/ar/...` URLs plus hundreds of root-level pages/posts carrying Arabic titles.
- CounselO's sampled Arabic detail pages had one H1, self-canonicals, five hreflang links, Open Graph metadata, Breadcrumb/WebPage/FAQ/LegalService schema, and much more substantive visible Arabic content.
- BaghdadiLaw contains material technical defects: sampled Arabic-titled `my-post...` pages declared `lang="en"`, used generic English descriptions, had no hreflang, and one sampled page emitted seven H1 elements. Several custom page-head files in Dev Mode were empty, meaning metadata was supplied elsewhere by builder settings.
- BaghdadiLaw's sitemap assigns priority `1.0` to 292 URLs and gives 567 URLs the same `2026-04-21` last-modified date. These are not special ranking instructions; Google may ignore sitemap priority and untrustworthy mass timestamps.

Google can still send clicks to imperfect pages when those pages are older, already indexed, query-aligned, linked, and familiar to searchers. That appears to be the important lesson here.

## Verified inventory and delivery evidence

### Dev Mode

- Arabic page tree: 147 named builder pages.
- English page tree: 147 named builder pages.
- Each normal page exposed page HTML, a page-head file, general CSS, desktop/tablet CSS, and mobile CSS.
- Arabic categories covered commercial contracts, commercial papers, bankruptcy, company disputes, agencies, unfair competition, trademarks, commercial litigation, family matters, employment claims, real estate, enforcement, arbitration, administrative claims, foreign investment, and construction disputes.
- GoDaddy generated extensive builder markup and CSS; the meaningful SEO content was primarily page inventory, head metadata/settings, headings, content, internal navigation, and delivery behavior—not CSS selectors.

### Published sitemaps

BaghdadiLaw:

- Sitemap URL entries: 664
- `/ar/...` URL entries: 145
- Root-depth-one URLs: 387
- Root `my-post...` URLs: 332
- Sitemap alternate links: 876
- Priority `1.0` entries: 292
- URLs with `lastmod` of `2026-04-21`: 567

CounselO:

- Live sitemap URL entries: 1,690
- Approximate Arabic URL entries: 845
- Arabic blog URLs: 36
- Arabic work URLs: 36
- All six sitemap children returned HTTP 200 during the audit.

### Sample Arabic metadata

BaghdadiLaw unpaid wages:

- Title: `محامي عمالي اونلاين في قضايا نزاع الأجور والرواتب`
- Description begins with the lawyer's name and targets wage disputes, claims against employers, settlements, delayed allowances, Saudi Arabia, UAE, and Syria.
- One H1, three JSON-LD blocks, three hreflang links, and self-canonical.

CounselO unpaid wages:

- Title: `الأجور والمستحقات غير المدفوعة | السعودية | كاونسلو`
- Description uses the standard consultation template: facts, evidence, options, documents, and the written CounselO package over WhatsApp or email.
- One H1, twelve H2s, FAQ/Breadcrumb/WebPage/LegalService schema, five hreflang links, and self-canonical.

The CounselO page is technically richer. The BaghdadiLaw snippet is more explicit about the searcher's desired professional (`محامي`), delivery mode (`اونلاين`), specialization, named person, and multiple markets. That can improve query match and click-through rate.

## What GoDaddy is actually doing

Useful platform behavior observed in published output:

- nginx response serving with a `d-cache: from-cache` signal
- gzip compression
- image delivery through `cdn-website.com` optimized-image hosts
- preconnects to static and image CDNs
- LCP image preload hints
- lazy loading for non-critical images
- self-canonical, Open Graph, hreflang, and JSON-LD generation when configured
- separate mobile and desktop/tablet styling
- speculation/prerender rules advertised in response headers

These are reproducible engineering techniques, not proprietary SEO secrets. CounselO already matches or exceeds much of the metadata/schema behavior; its clearest technical opportunities are reducing response size, improving caching, and stabilizing response time.

## Ranked interpretation

| Rank | Factor | Confidence | Why it matters |
|---:|---|---|---|
| 1 | Domain/indexing history | High | Roughly 729 days versus 49 days is a major maturity gap. |
| 2 | Older Arabic exact-intent URL corpus | High | Hundreds of Arabic-titled root pages/posts can already hold impressions and rankings. |
| 3 | Arabic title/snippet click appeal | High | Named lawyer plus `محامي`, `اونلاين`, `متخصص`, exact issue, and locations map closely to user language. |
| 4 | Backlinks, branded demand, and historical engagement | Medium, unverified | Likely consequences of the older domain, but code inspection cannot measure them. |
| 5 | Lighter/faster delivery | Medium-high | Repeated HTTP samples favored BaghdadiLaw, especially total download time and HTML size. |
| 6 | GoDaddy automation | Medium-low | Helpful delivery defaults, but no unique ranking mechanism was found. |

## What this audit cannot prove without search-performance data

Code and public HTML cannot identify which queries actually generate the click gap. A definitive attribution requires read-only Google Search Console exports for both domains covering the same date range:

- query, page, country, and device
- impressions, clicks, CTR, and average position
- indexed/excluded page counts and crawl history
- branded versus non-branded query groups
- first-seen dates for winning pages

Backlink data is also required to quantify referring domains, link quality, anchor text, and lost/new links. Until that evidence is compared, backlinks and branded demand remain strong hypotheses rather than verified findings.

## Recommended CounselO response

1. **Do not migrate CounselO to GoDaddy.** The audit found no platform-only ranking advantage worth sacrificing CounselO's stronger regional architecture and structured content.
2. **Let the new domain mature while concentrating crawl value.** Avoid adding thin pages merely to increase count. Prioritize the Arabic pages already earning impressions or sitting near page one.
3. **Rewrite Arabic titles and descriptions from generic templates into intent-specific snippets.** Use the exact legal problem, jurisdiction, appropriate professional/service wording, and a clear differentiator. Keep claims accurate and jurisdiction-qualified.
4. **Strengthen the named-expert/entity connection.** Make the relationship among CounselO, Omar Al Baghdadi, authorship, reviewed content, About/Person schema, and service pages unmistakable without implying unauthorized jurisdictional practice.
5. **Increase evidence-backed Arabic publishing cadence.** BaghdadiLaw's hundreds of older Arabic-titled pages/posts are a history advantage. CounselO should publish fewer but stronger Arabic articles and work examples, with clean descriptive slugs and internal links to the matching regional service/problem page.
6. **Reduce SSR payload and improve cache behavior.** Target the observed gap on high-impression Arabic pages; measure real Core Web Vitals before and after changes.
7. **Run the Search Console comparison before large-scale rewriting.** Preserve winning snippets and pages. Use actual query/page data to choose the first remediation batch.

## Safety and provenance

The GoDaddy site was inspected read-only. No source, settings, page content, metadata, or publication state was edited or saved. Passwords, cookies, session tokens, and account data were not inspected or recorded.
