# Public work documents

Published PDF attachments use `/documents/<work-slug>.pdf`. Both language
versions of the work page use the same existing document and download URL.
The owner has authorized public access to the published portfolio attachments.
The operational `/api/` robots exclusions remain in force; the legacy attachment
route redirects published PDFs to the canonical document URL.

Public document routes read publication-fenced snapshots of CMS records and
files. CMS mutations rotate the publication epoch and refresh those snapshots;
cached responses are reused only within the current deployment and publication
namespace. This avoids a database read for each document request. Unpublished
work, removed files, invalid PDF bytes and unknown slugs return 404; unavailable
published snapshots return 503. Client-facing responses use `no-store`, PDF
content type and same-origin framing for the on-page preview.

## Reviewed publication editions

The November 2026 editorial editions preserve each publication's existing
language arrangement, substantive facts and page layout. They present the work
of one CounselO team from online consultation through representation. Case
studies remain CounselO publications; they are not relabelled as court-issued
documents. The recorded result remains a judgment, settlement, procedural step
or completed professional work, as supported by that publication.

Private replacement assets live in
`artifacts/api-server/assets/work-document-revisions/`. They are copied into the
API build, never mounted as a static directory. `manifest.json` records the source
slug, update timestamp, byte count, language and SHA-256, together with the edition
PDF/text hashes, byte counts, page count and edition date.

Before generating an edition response, the handler checks the current published
source snapshot against the reviewed source metadata and the hash of its actual
decoded PDF bytes. The replacement PDF and text must also match their manifest
hashes. Work snapshots retain the source fingerprint and document language;
older snapshot formats cannot supply an edition response. The edition manifest
also participates in the deployment cache identity, so asset-only PDF updates
invalidate old document responses. A later CMS edit or upload rotates the
publication namespace and takes precedence: an unmatched edition falls back to
the current valid source PDF and its stale text edition is withheld. Missing or
corrupt local assets likewise fall back to the current valid source PDF.

Public API records expose the delivered PDF's size and language, plus verified
`documentEdition`, `documentEditionPublishedAt` and `documentTextUrl` fields.
Original case dates and CMS update timestamps are preserved. PDF structured data
and document sitemap modification dates use the edition date when present.
Internal source hashes, attachment base64 and confidentiality administration
fields are omitted from public JSON/bootstrap records.

## Preparing and verifying an edition

1. Review the current source bytes and metadata; retain the originals.
2. Revise the PDF itself, then check all changes visually and confirm that
   surrounding text, amounts, tables, images and page counts remain intact.
3. Generate a matching text edition, remove obsolete hidden text and verify both
   files against the release manifest. Keep the edit and source audit records.
4. Run document-route, source-replacement and metadata regressions, both app
   typechecks and production builds. Deploy the website and API assets together.
5. Verify the public PDF and text URLs, content types, download behavior, previews,
   bilingual page links and structured data after deployment.

CMS unpublication remains the control for removing a published work and its
attachment. Removing a local edition restores the current valid CMS PDF; it does
not unpublish that source. Search-engine retrieval, indexing and citations must
be assessed separately from successful file delivery.
