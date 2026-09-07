# Matter answers and content remediation — 7 September 2026

The local implementation supplies bilingual opening answers and descriptions for all **560 canonical matter topics (1,120 URLs)**. The page template can display a source's question together with its answer before the matter-specific preparation paragraph. The helper never treats a general authority homepage as substantive topic evidence and uses `updatedAt`, not a newly invented professional review date.

## Coverage and its limits

| Measure | Local result |
| --- | ---: |
| Topics accounted for | 560 |
| Topics with explicitly assigned substantive guidance | 559 |
| Original 140 source/editorial gaps now with scoped substantive guidance | 139 |
| Authored or explicitly reused evidence groups | 69 |
| Topics using those additions | 140, including the previously editorial-only termination topic |
| Addition topics with explicit remaining source checks | **132** |
| Distinct English / Arabic answers | 560 / 560 |
| Distinct localized descriptions | 1,120 |
| Descriptions within the preferred 110–170 characters | 1,078 |
| Full description length range | 96–187 characters |

**559 is a substantive-coverage count, not a count of comprehensively current-law-verified pages.** The 132 scoped additions retain precise further checks for current consolidation, a specific deadline, treaty participation, procedure, special legislation or the facts of the instrument. Historical state reports, reproduced laws, government-published legal commentary and contemporary official explanations are distinguished in the data. No numerical appeal period, guaranteed remedy, licence, office, professional review or result was invented to close a coverage gap. The remaining inherited exact-topic guidance is identified as inherited; this pass does not claim that every inherited source was independently reopened.

The fully unresolved source assignment is `/syr/services/family-law/visitation-order-enforcement` and its Arabic counterpart. Research did not locate a current primary text establishing the ordinary visitation execution route, prerequisites, coercive measures and applicable period. Historical maintenance/mahr detention rules and a 2025 circular on northern-court judgments do not prove those rules. Its truthful order-specific evidence preparation remains available, and the ledger records the missing source precisely.

## Content changes

- `matter-answer-additions.ts` expressly maps each new evidence group to a jurisdiction, service and matter. New research includes Syrian Data Protection Law 12/2024 instructions and a 2026 official reference; Saudi guarantor collection objections and account-freeze distinctions; UAE guarantee documentation; and carefully limited Syrian employment, commercial, medical, family and procedural frameworks. References and limitations are carried alongside each group.
- `matter-answer.ts` keeps the actual source question and opening answer paired. This prevents a source's “No” from answering a different preparation question. The specific matter brief follows it. Descriptions use complete relevant sentences from those briefs with jurisdiction context; no mid-phrase truncation or repeated promotional tail is added.
- A bounded follow-up removed redundant Arabic service context from 22 matter titles while retaining context for ambiguous appeal, document-authentication and travel/criminal issues. The UAE corporate-tax title fell from 117 to 59 characters. Across all 1,120 matter titles, there are zero duplicates; titles above 70 characters fell from 113 to 98, and the maximum fell from 117 to 98. Precise longer subjects are preserved without arbitrary truncation.
- Foreign-VAT titles for Syrian transactions no longer append a second domestic location phrase that could imply a Syrian VAT procedure.
- Arabic Saudi experience wording now says regional experience; duplicated `القانونية` was removed in the affected Saudi contracts and Syrian about copy.
- The commercial-claim article's supplied internal drafting note, including `للمراجعه` and `رايال`, is removed even inside nested rich-text formatting. The correctly labelled link to the reported SAR 500,000 claim / SAR 227,000 award remains.
- The supplied blank-signature commentary's methodology preserves the Al-Sanhuri quotation attribution and the historical Baghdadi supervision credit. Supervision is not recast as proof of quotation authorship or a current legal review.

## Reproduce and inspect

From `artifacts/legal-site`:

```sh
node_modules/.bin/tsx ../../scripts/build-matter-answer-ledger.mts
node_modules/.bin/tsx --test src/lib/matter-answer.test.ts src/lib/problem-snippet.test.ts src/lib/article-provenance.test.ts
```

From `artifacts/api-server`:

```sh
node_modules/.bin/tsx --test src/lib/article-work-evidence.test.ts
```

The generator contains the immutable original 140-topic audit queue and writes `output/full-growth-audit-2026-09-07/matter-answer-coverage.json`. Each of its 560 records includes both URLs, bilingual question/answer/description, source URLs, evidence selection, original-gap status and remaining checks. Regenerate this large evidence artifact locally; it does not need to be committed by default.

Focused verification: **25 tests passed**, including all-topic completeness, exact answer/description uniqueness, orphan evidence assignments, both-language source question/answer pairing, a real Saudi leave polarity regression, foreign-VAT titles, attribution and repeated article repair. These are implementation and contract checks; string uniqueness is not proof of original legal insight, ranking, citation selection or maximum content quality. Root release verification covers the final build, rendered pages and browser checks separately. This document does not claim deployment or measured search results.
