# CounselO professional-role consistency audit

Audit date: 2026-08-08
Scope: all public CounselO source families covering UAE, Saudi Arabia and Syria, in English and Arabic, including shared landing pages, regional pages, service pages, legal-problem pages, blog provenance, policies, metadata and structured data.

## Executive result

The platform has a coherent intended model—CounselO is an online consultation platform; Omar Al-Baghdadi is the named legal founder/reviewer; local court representation is separately scoped through an appropriately licensed practitioner or cooperating office. That model was not expressed consistently across every page family.

The shared identity inconsistencies found in the audit were corrected:

- Article provenance and database defaults now use the canonical role label “Lawyer and Legal Counsel Omar Al-Baghdadi,” matching the structured Person entity.
- The global region picker no longer calls CounselO “Licensed Legal Counsel · UAE · Saudi Arabia · Syria,” which could imply local licensing in all three jurisdictions.
- Founder credentials no longer convert the mentoring claim into “40+ licensed lawyers” or present regional experience as a multi-jurisdiction licence.
- About-page structured descriptions now describe regional experience without implying that the founder is locally licensed in every served jurisdiction.
- A regression test checks these shared surfaces for role-label drift.

## Role model that should govern all copy

1. CounselO: online legal consultation platform providing intake, document review, preliminary analysis and written guidance.
2. Omar Al-Baghdadi: named founder and legal reviewer, described consistently as Lawyer and Legal Counsel; the public register records a Syrian lawyer licence, not a blanket UAE/Saudi licence.
3. Local representation: court appearances, reserved filings, notarisation and other jurisdiction-specific work are separate engagements with an appropriately licensed partner or cooperating office.
4. Service expertise: “lawyer,” “advocate,” “counsel” and “specialist” in SEO or service descriptions must not imply that CounselO itself, or Omar personally, holds the local licence required for the matter.

## Ongoing governance

Older Saudi/Syria source records still contain historical first-person representation wording, but the public rendering boundary now qualifies those strings across all translation objects before they reach pages, metadata, or SSR HTML. Database-backed blog reviewer names are normalized at the blog provenance boundary as well. Future content edits should replace the historical source strings directly when each jurisdiction-specific service is legally redlined.

The following evidence remains necessary for ongoing professional-role governance:

- Verify Omar’s licence, title, permitted practice scope and current status from the relevant Syrian professional register.
- Verify each cooperating office identity, licence number, jurisdiction, relationship to CounselO and permitted representation scope.
- Replace generic “licensed partner” language with a matter-specific named practitioner only after the engagement and licence are confirmed.
- Ensure blog author, legal reviewer, schema `Person`, service author and policy owner labels use the same approved identity vocabulary in both languages.
- Review all SEO titles and Arabic metadata containing “محامي”/“lawyer” to confirm the wording is a service-category description, not an assertion that CounselO is locally licensed in that jurisdiction.
- Remove or qualify any “legal team,” “senior advocate,” “expert,” “specialist,” “representative” or “full process” wording that is not tied to an identified person or separately engaged licensed provider.

## Automated checks

The role-consistency regression test is in `artifacts/legal-site/src/lib/claims-register.test.ts`. It checks the shared identity/provenance surfaces for:

- inconsistent reviewer title;
- blanket licensing across UAE, Saudi Arabia and Syria;
- conversion of mentoring into a licensing claim;
- divergence between structured identity and public role labels.

This automated check is a consistency control, not evidence that every professional licence or representation arrangement is legally verified.
