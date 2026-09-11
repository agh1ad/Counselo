# CounselO keyword ownership — 7 September 2026

Open [the searchable matrix](matrix.html). The editable source is [matrix.json](matrix.json); [search-evidence.json](search-evidence.json) records the exact query and returned source URLs for each row. The independently approved [policy.json](policy.json) controls ownership.

137 commercially relevant query hypotheses were searched individually: 43 Saudi, 47 UAE and 47 Syrian queries; 71 Arabic and 66 English. They resolve to 133 country/language/task ownership keys. Four city variants share existing owners. There are 126 rows assigned to existing routes, 10 reserved page URLs, and one conditional local-provider assignment. Country and language versions are separate owners, not duplicate primary intent.

## Decisions that change editorial priorities

| Client task | Ownership decision | Gap established |
| --- | --- | --- |
| Saudi zakat assessment objection | Reserve `/sa/{ar/}services/tax-zakat/zakat-assessment-objection` | No dedicated route in the current registry. General tax objection must not substitute for zakat. |
| UAE labour complaint filing | Reserve `/uae/{ar/}services/employment-labour/labour-complaint-filing` | Current termination/complaint page covers a narrower dispute. Complaint filing needs an independent task owner. |
| UAE initial company incorporation | Reserve `/uae/{ar/}services/corporate-commercial/company-incorporation` | Existing registration-problem page starts with deficient/refused applications, not initial setup. |
| Syrian marriage confirmation/registration | Reserve `/syr/{ar/}services/family-law/marriage-confirmation-and-registration` | Existing certificate/registration-problem route is remediation, not initial registration. |
| Syrian inheritance certificate | Reserve `/syr/{ar/}services/family-law/inheritance-certificate` | Estate distribution and civil-record correction do not own certificate issuance. |
| Saudi/Syrian unpaid salary | `employment-law/delayed-or-unpaid-salary` | Overlapping `unpaid-wages-and-benefits` route is restricted to a supporting/differentiated role. |
| Syrian tax assessment | `tax-zakat/syrian-tax-assessment-and-objection` | Both country-specific and generic tax URLs appeared in the same query's returned results. The country-specific owner is selected. |
| Syrian initial company formation | `business-law/company-formation-and-registration` | Formation/restructuring page must emphasize its separate restructuring task. |
| Damascus lawyer selection | Syrian Arabic homepage, conditional | A country consultation page is not proof of a Damascus office or local practitioner offering. Verify the named practitioner, permitted scope and location before promoting this query. |

`{ar/}` means the Arabic segment is present only in the Arabic version. Exact URLs are in the matrix. The five reserved tasks represent ten Arabic/English pages; this work does not publish those pages.

## Mandatory ownership policy

1. Primary commercial intent is **country + language + canonical client task**, not exact keyword spelling. Group synonyms before introducing an intent ID.
2. Each key has exactly one approved URL. Titles, H1s, commercial introductions and principal internal anchors should emphasize that owner's task. Do not create separate primary pages for spelling variants or city modifiers without a distinct, truthful service need.
3. Supporting pages may discuss the subject and link to its owner. They must emphasize their different task or informational role. The policy lists 26 explicit overlapping-route restrictions.
4. New or changed primary assignments must update both the matrix and the reviewed policy. Do not mint a synonymous intent ID to bypass the rule. Unregistered IDs fail validation.
5. `pnpm --filter @workspace/legal-site seo:ownership` validates owners, normalized duplicate queries, country/language canonical paths, existing/planned status, supporting restrictions and per-query search evidence. It runs before the normal site build. Negative tests demonstrate that conflicting assignments fail.
6. Planned pages stay reserved until substantive jurisdiction review and publication work are complete. A planned route appearing in the registry forces a status review. Conditional assignments require the missing business evidence before promotion.

This is an enforceable **declared ownership registry**, not an automatic semantic review of every sentence or a guarantee of Google's selected result. Existing overlap still needs the specified editorial differentiation or consolidation review. No redirects, canonical changes or page deletions are authorized by this document. The older regional coverage matrix and `search-query-targets-2026-09-06.json` are broad research inventories; this policy takes precedence for primary commercial ownership.

## How to read the evidence

- Each retained query was submitted separately to web search on 7 September 2026. Country modifiers express the intended market; engine location was not controlled. These are observed results, not verified Google ranks, search volumes or AI-answer inclusion measurements.
- A relevant observed result is selected per row. Government services, directories and reference publishers are labelled separately from commercial providers. Selection does not certify a competitor's credentials, claims or legal accuracy.
- Four Syrian queries had no independently verified task-relevant competitor in the returned results: Arabic wage recovery, English unpaid-salary lawyer, Arabic denied-insurance challenge and Arabic tax-assessment objection. This is not evidence of an empty market. Returned source URLs remain available for inspection.
- BaghdadiLaw and CounselO results are recorded separately, never counted as independent competitors. Two case-only duplicate queries and an unqualified global medical-malpractice query were excluded; three Arabic salary queries were reworded to avoid lawyer-salary/job intent.
- Existing-route status is checked against the current repository. Local titles/H1s/descriptions come from the 7 September rendered snapshot of commit `0b90299`. They are not a fresh production or indexing check.
- A **content gap** is a task-specific editorial brief unless explicitly marked as a confirmed missing route. It does not mean that every suggested detail is absent today. Review the owner's local headings and content before editing.
- An **external authority gap** is a specific independent-verification requirement, not proof that credentials, directory listings or backlinks are absent. No backlink index or jurisdiction-wide credential census was available in this run. Verify responsible practitioners and relevant independent listings; do not invent awards, cases, offices, testimonials or partnerships.

## Maintenance

Edit `matrix.json` and the independently approved `policy.json`; retain per-query evidence. Run the ownership gate, then `python3 docs/keyword-ownership/build-report.py` to refresh the report. The renderer does not overwrite an existing policy. Rerun searches when refreshing competitor claims, and record a new observation date instead of presenting this snapshot as current indefinitely.

Validation for this change: ownership/route/source gate, regression tests, TypeScript check and report browser/filter checks. Git publication, hosting deployment and ranking improvements are separate outcomes.
