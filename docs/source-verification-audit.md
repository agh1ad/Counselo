# CounselO Source Verification Audit

**Audit date:** 2026-08-08
**Scope:** all generated public pages, source/citation links, regional service authorities, blog provenance sources, and current official-source availability across Saudi Arabia, Syria, and the UAE.

## Executive result

**Status: SOURCE-ROUTING FIXED — page-level source architecture is now strengthened, but legal reliance still requires checking the operative text for each matter.**

The generated site contains source links throughout the public legal content, and the repository tests pass. The two source-routing gaps identified in the initial audit were fixed:

1. **Syria primary-source coverage:** Syria service and problem pages now carry both the Ministry of Justice and People’s Assembly official legislative website as primary authority starting points. The Ministry of Justice remains temporarily unavailable, so current-text verification is still operationally constrained.
2. **UAE source specificity:** UAE legal-problem pages now use the same topic-specific authority as their parent service instead of the generic legislation homepage. Unknown service slugs safely fall back to the official UAE legislation platform.

## Full-route coverage

- **1,598 generated content routes** audited in the prerender output.
- **42 redirect documents** excluded from legal-source requirements.
- **1,092** generated anchors to the Syrian Ministry of Justice source.
- **0** UAE regional-page anchors remain to the generic UAE Legislation homepage after the fix.
- **188** UAE regional pages contain topic-specific legislation links after the fix.
- **470** generated anchors to the Saudi Bureau of Experts portal.
- Saudi service pages use a two-source matrix: one topic authority plus the Bureau of Experts portal.
- UAE service pages use topic-specific authorities for the service catalogue, including legislation IDs and regulator/ministry pages.
- Blog legal-guidance records expose provenance sources; professional-commentary records intentionally expose no legal-source list.

The counts include English and Arabic variants of the same regional content.

## Regional verification

### Saudi Arabia — PASS for repository mapping; live-source check recommended before publication

The source matrix is exhaustive for all 17 Saudi service slugs. Each service has exactly two mapped sources: a topic authority and the Bureau of Experts official Saudi Laws Portal. Repository tests confirm exact service-to-source matching and reject unknown or substring-matched slugs.

Mapped authorities include the Ministry of Justice, Ministry of Commerce, Ministry of Human Resources and Social Development, Ministry of Investment, Real Estate General Authority, Saudi Central Bank, Saudi Authority for Intellectual Property, ZATCA, SDAIA, Ministry of Health, Insurance Authority, and Saudi Center for Commercial Arbitration.

The Bureau of Experts portal is an appropriate primary-law starting point. The page-level implementation still warns users to check the operative text and current facts before reliance, which is necessary because a homepage link does not identify the exact article or amendment.

### United Arab Emirates — PASS for service pages; GAP for problem-page specificity

The UAE service catalogue uses official UAE Legislation identifiers for commercial companies, commercial transactions, labour relations, personal status, arbitration, bankruptcy/financial restructuring, and entry/residence. It also uses official federal authority links for tax, data protection, insurance, health, IP, courts, housing, and infrastructure.

Current official-source verification confirmed:

- The UAE Legislation platform describes itself as the official, unified and updated UAE government legislation platform.
- Legislation `1541` is Federal Decree by Law No. 33 of 2021 on Regulating Labour Relations.
- Legislation `1542` is the Commercial Companies legislation.
- Legislation `1610` is the Commercial Transactions Law.
- Legislation `2770` is the 2024 Personal Status Law.

The UAE legal-problem template now reuses the parent service authority, so the source label and link remain consistent between the service page and every related problem page.

### Syria — AUTHORITY IDENTIFIED, CURRENT VERIFICATION BLOCKED

The regional templates identify the Syrian Ministry of Justice at `https://moj.gov.sy/`, which is the correct type of official authority for Syrian justice material. During this audit, the official site returned a maintenance page stating that it is temporarily unavailable. The site therefore cannot currently serve as a reliable live verification target for the page claims.

Some blog provenance records also link to WIPO Lex and the Arab Legal Encyclopedia. Those are useful secondary or international reference sources, but they do not replace a current Syrian official text. WIPO Lex was verified as hosting the Syrian Civil Code entry; the Arab Legal Encyclopedia was verified as a Syrian legal reference/encyclopaedia, not as the issuing authority for legislation.

## Source-quality classifications

| Source type | Treatment | Result |
|---|---|---|
| Official legislation portal with specific law ID | Primary authority | Acceptable |
| Official regulator/ministry homepage | Primary authority starting point | Acceptable, but less precise than a deep link |
| General country legislation homepage | Authority discovery link | Insufficient for page-level rule verification |
| WIPO Lex | International legal database/reference | Secondary/reference; confirm against issuing state |
| Arab Legal Encyclopedia | Legal reference/encyclopaedia | Secondary; not a substitute for operative text |
| Blog record with no sources | Professional commentary only | Acceptable only when not presented as legal guidance |

## Repository verification

- Full website test suite: **33/33 passed**.
- Saudi legal-source matrix tests: passed.
- Article provenance tests: passed.
- Claims register and known Saudi inaccuracy tests: passed.
- Prerendered route inventory: **1,598/1,598 generated successfully**.

These tests verify source assignment and content policy, but they do not prove that every legal proposition on every page is supported by an exact current provision. That requires a human legal review against the operative text, especially for Syria and for problem pages using generic portal links.

## Release decision

**Source routing is fixed. Do not claim that every legal proposition has been independently legally verified yet.** The remaining limitation is substantive legal review against operative text, especially where the official Syrian Ministry of Justice site is unavailable. The source system now provides:

1. topic-specific primary-source links for UAE legal-problem pages;
2. two official Syrian authority starting points plus an explicit availability limitation;
3. article-level provenance for legal-guidance records;
4. automated regression tests preventing generic UAE source fallback on known services.

Source routing and provenance code were changed; substantive legal copy was not rewritten during this pass.
