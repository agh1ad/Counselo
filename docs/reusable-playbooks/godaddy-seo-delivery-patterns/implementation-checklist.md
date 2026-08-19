# Reusable implementation checklist

## Page and snippet

- [ ] One stable URL targets one clear user problem.
- [ ] Title contains the specific problem and truthful jurisdiction.
- [ ] Description is page-specific rather than a repeated template.
- [ ] Arabic wording sounds like actual Arabic search language.
- [ ] A named expert is visible only where the relationship is accurate and supportable.
- [ ] One visible H1 matches the page's primary intent.
- [ ] The page provides useful content beyond its metadata.
- [ ] A clear contact or next-step path is present and measurable.

## Entity and trust

- [ ] Organization and person have stable canonical IDs.
- [ ] Founder, author, and reviewer relationships match visible content.
- [ ] Profile/About page supports the identity assertions.
- [ ] Role, licensing, experience, outcome, and location claims have evidence.
- [ ] Structured data does not claim more than the visible page.

## Routing and crawling

- [ ] Navigation, SSR, canonical, hreflang, sitemap, and social URLs agree.
- [ ] Every sitemap URL returns the intended indexable HTML response.
- [ ] Arabic and English alternates are real and reciprocal.
- [ ] `<html lang>` and `dir` match the rendered language.
- [ ] Robots rules do not accidentally block public pages or assets.
- [ ] Related articles, services, problems, and work pages link contextually.
- [ ] Redirects preserve one canonical destination per content item.

## Delivery

- [ ] Initial HTML contains useful content but not duplicated detail payloads.
- [ ] Initial JavaScript excludes noncritical routes and language catalogs.
- [ ] Brotli or gzip compression is enabled.
- [ ] Public HTML uses a deliberate cache policy.
- [ ] Hashed static assets use immutable caching.
- [ ] Images have explicit dimensions and responsive variants.
- [ ] Only the true LCP image is preloaded.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] Important CDN origins are preconnected only when beneficial.
- [ ] Mobile and desktop layouts are tested independently.

## Measurement

- [ ] Record deployment date and affected URL set.
- [ ] Compare Search Console clicks, impressions, CTR, and position.
- [ ] Segment by page, query, language, country, and device.
- [ ] Separate branded from non-branded queries.
- [ ] Compare equal pre/post windows and account for seasonality.
- [ ] Monitor indexed URLs, crawl errors, and canonical selection.
- [ ] Measure field LCP, INP, and CLS rather than relying only on synthetic tests.
- [ ] Track qualified contact, WhatsApp, email, and form conversions.

## Release gate

- [ ] Typecheck and automated tests pass.
- [ ] Production build and prerender pass.
- [ ] Generated sitemap and metadata reports are current.
- [ ] A sample of Arabic and English routes passes browser QA.
- [ ] No console errors or blank-content hydration defects occur.
- [ ] Live deployment is verified separately from the local build.
