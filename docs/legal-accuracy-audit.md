# CounselO legal authority and accuracy audit

Audit date: 2026-08-08
Scope: generated public CounselO content in `artifacts/legal-site`, including regional pages, service pages, legal-problem pages, policies, blog/work surfaces, English and Arabic source structures.
Coverage: 1,598 generated routes after language/content expansion.

## Remediation status

The confirmed Saudi custody, khul, and final-settlement errors identified below were rewritten, and stronger unsupported promises around confidentiality, representation, online completion, enforceability, and testimonials were qualified or removed across the shared English and Arabic content surfaces. A regression test now scans all regional source files for the confirmed error patterns. The generated site prerendered all 1,598 routes and the automated SEO validator reports 100/100.

This is not a claim of lawyer-certified legal accuracy. Proposition-level source mapping and independent legal sign-off for Saudi Arabia, the UAE, and Syria remain required before publishing a legal-accuracy score of 100/100.

## Executive result

Release status: **legally review-gated**. The implementation is technically validated, but the current repository evidence does not support a defensible lawyer-certified 100/100 legal-accuracy score.

Pre-remediation score: **40/100**

| Area | Score | Basis |
| --- | ---: | --- |
| Jurisdiction architecture | 9/15 | UAE, Saudi Arabia and Syria are separated in routing and most page metadata; some public copy still overstates cross-jurisdiction delivery and representation. |
| Authority/source quality | 5/20 | Source maps and official-link sections exist, but most links are authority homepages rather than the exact statute, article, regulation or procedure supporting the proposition. Human sign-off is explicitly pending for the Saudi matrix. |
| Substantive accuracy | 8/30 | Confirmed Saudi family-law and labour-law errors; many other statutory/procedural propositions remain unverified at article level. |
| Claims and evidence | 8/15 | A claims register exists, but public copy contains numerous experience, result, licensing and confidentiality claims that are not mechanically checked against the register. |
| Disclaimers and scope | 6/10 | Policies contain useful scope language, but service FAQs and conversion copy repeatedly promise representation, confidentiality, timelines or online completion beyond the qualified policy wording. |
| Review governance | 4/10 | Tests and review metadata are present, but content has a future-dated review stamp and no route-level assertion that every high-risk legal claim has a current source and reviewer decision. |

The passing automated test suite (31 tests), clean TypeScript check, 1,598-route prerender, and SEO score of 100/100 are implementation-quality signals only. They do not establish legal correctness.

## Release-blocking findings

### 1. Saudi custody rule is materially misstated

Published in `artifacts/legal-site/src/translations/en.ts:941` and `:961`:

> “boys up to 7 and girls up to 9 … after which custody moves to the father”

The official Saudi Personal Status Law, Articles 127 and 135, provides that after separation custody is initially with the mother, followed by the father and maternal/paternal grandmothers in order, subject to the child’s best interests; the court may depart from that order, a child aged 15 may choose a parent unless the child’s interests require otherwise, and custody ends at 18. The published age-based baseline is therefore not a safe statement of current law and must be removed or rewritten around the actual statutory framework.

Authority: [Saudi Personal Status Law, official text](https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/4d72d829-947b-45d5-b9b5-a9a700f18cdf/1).

### 2. Saudi khul rule is materially misstated

Published in `artifacts/legal-site/src/translations/en.ts:870`, `:879`, `:899`, and `:900`:

> “khul … without the husband’s consent”

The official Saudi Personal Status Law defines khul in Article 95 as separation requested by the wife **with the husband’s consent** in return for compensation. Article 96 also describes consensual khul without a court judgment. The site may discuss other judicial divorce/termination routes, but it must not label the published no-consent proposition as khul without a statute-specific legal basis and careful distinction from faskh or another remedy.

Authority: [Saudi Personal Status Law, Articles 95–101](https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/4d72d829-947b-45d5-b9b5-a9a700f18cdf/1).

### 3. Saudi final-settlement deadline is wrong

Published in `artifacts/legal-site/src/translations/en.ts:1086` and `:1180`:

> “within 5 days”

Current Article 88, as published by Saudi HRSD, requires settlement within a maximum of one week after termination, or within two weeks when the worker terminated the contract. The page also adds “penalties and interest” without identifying the legal provision that creates that remedy. Both statements require correction and exact sourcing.

Authority: [Saudi HRSD Labour Relations page, Article 88](https://www.hrsd.gov.sa/en/%D8%B9%D9%84%D8%A7%D9%82%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%85%D9%84).

### 4. The source system does not prove the claims it sits beside

`artifacts/legal-site/src/lib/saudi-legal-sources.ts` maps each service to two broad links (a regulator/authority homepage and the Bureau of Experts portal). `service-detail.tsx` and `legal-problem-detail.tsx` expose those links, but the content itself contains precise claims about deadlines, court powers, remedies, filing systems, licensing, appeal periods, custody, alimony, enforcement, security, and regulatory process. A homepage link is not a citation for any of those propositions.

The repository’s own `docs/legal-source-matrix-review.md` says human legal review is **pending**. This is a release blocker for a 100/100 claim.

### 5. High-risk claims are not register-enforced

The claims register approves a limited set of wording for response targets, confidentiality, representation scope, experience figures, mentoring, licensing coordination and redacted work. However, public copy still contains untracked or stronger variants, including:

- “complete confidentiality” / “absolute confidentiality”;
- “full legal process”, “full representation”, and court representation without a route-specific licensed-provider confirmation;
- “immediately enforceable” contract language;
- “decisive advantage”, “successfully resolved”, “recovered the full amount”, and “until fully satisfied” outcome language;
- “without your employer knowing” confidentiality promises;
- “no office visit required” and fully-online court/procedure promises;
- testimonials and specific recovery/timeline claims.

These need either evidence-backed approval records and qualified wording or removal. The current tests only check a small shell-copy contradiction list and do not scan all translations, service data, problem data, blog/work content, or Arabic variants.

## Page-family audit

| Page family | Current state | Required disposition |
| --- | --- | --- |
| Regional homes/about/vision | Strong jurisdiction framing and licensing caveats; contains quantitative and professional-status claims | Verify every number, licence, title, office/partner relationship and testimonial; align all languages with the claims register |
| Service indexes and service detail | Official-source component exists; Saudi source mapping is structurally exhaustive | Replace homepage-only references with exact authority + statute/article citations; complete human sign-off; validate every service proposition |
| 1,384 legal-problem routes | Generic fact/evidence/jurisdiction framing is safer than the legacy service copy; source display remains broad | Add route-level source IDs and a high-risk-claim scan; verify generated pages in both languages and all three jurisdictions |
| Saudi legacy/service detail content | High volume of specific statutory, procedural and remedy claims | Full legal redline required; do not publish the current score as 100 |
| UAE content | Better qualification around mainland, emirate, DIFC and ADGM scope; official UAE legislation links are present | Verify the exact federal/local/free-zone licensing basis and every claim that formal consultation or representation is available through the stated structure. UAE’s current professional-regulation framework distinguishes lawyers, legal consultants, licensing and court representation. |
| Syria content | Uses a single Ministry of Justice homepage and partner-language caveats | Full primary-law review required; verify statute numbers, court names, limitation periods, regulator names, partner licences and every result testimonial. Do not treat the homepage as authority for every claim. |
| Terms/privacy/contact | Policies contain useful boundaries and mandatory-law qualifiers | Reconcile policy language with stronger service-page promises; verify data controller, storage, processors, WhatsApp/email handling, retention, cross-border transfers, complaint route and governing law |
| Blog/work | Provenance and correction-route infrastructure exists | Block legal-guidance publication unless exact jurisdiction, author/reviewer, last substantive review, primary sources and corrections workflow are complete; independently verify every work outcome/testimonial |

## What is already working

- Regional routes and language variants are explicit and tested.
- Saudi service/source matching is exact rather than substring-based.
- Legal-problem pages include jurisdiction/source sections and qualified “facts and forum” language.
- The claims register contains owners, evidence locations, jurisdictions, verification dates, review dates and required disclaimers.
- Terms pages distinguish online consultation from court representation in important places.
- The repository has source-provenance, sitemap, canonical, bilingual-content and SSR tests.

## Required path to 100/100

1. Remove or rewrite the three confirmed Saudi errors above and update both English and Arabic equivalents.
2. Build a proposition-level legal claims ledger: route, language, jurisdiction, exact text, legal issue, source URL, statute/article, source date/status, reviewer, review expiry, qualification and disposition.
3. Require exact primary-law citations for every deadline, entitlement, court power, remedy, filing system, licensing statement, limitation period and procedural rule.
4. Add a build-time test that fails if a high-risk proposition has no approved ledger entry or if public text exceeds the approved wording.
5. Complete independent human legal review for Saudi, UAE and Syria, separately; review the Arabic text as legal copy, not only as translation.
6. Verify all professional licences, partner firms, regulator relationships, testimonials, case counts, recovery results, timelines and “30+ / 20,000+ / 40 lawyers” figures against documentary evidence.
7. Reconcile all page copy with the terms/privacy policies and remove absolute confidentiality, outcome, speed and online-completion promises.
8. Regenerate SSR/prerender output and crawl every generated route after the redline; re-run source, link, SEO and hydration checks.

## Audit conclusion

CounselO has a good technical foundation for a legally governed content system, but it currently has substantive legal inaccuracies and unsupported high-risk claims. It should not be represented as 100/100 until the release blockers are corrected and a qualified lawyer signs off the proposition-level source ledger for each served jurisdiction and language.
