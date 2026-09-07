# Public work document indexing

Public PDFs are served at `/documents/<documentSlug>.pdf`. The operational `/api/`
robots exclusions and indexing headers remain in force. Publishing a work page
alone does not authorize indexing its attachment.

The reviewed approval register is
`lib/api-zod/src/public-work-documents.ts` (`PUBLIC_WORK_DOCUMENT_APPROVALS`).
It starts empty: no attachment has been approved by this implementation.
No database migration or automatic bulk publication is required.

To approve a document:

1. An authorized editor reviews the exact PDF for confidentiality, redaction
   (including hidden text/metadata), publication rights, and explicit public
   indexing permission. Keep the review evidence outside the public source tree.
2. Record its existing work slug, exact database `updatedAt` as an ISO UTC string,
   a unique lowercase hyphenated public document slug, and SHA-256 of the decoded
   PDF bytes. Set all four review/approval flags only after those checks pass.
   The underlying work must be published with `confidentialityConfirmed: true`.
3. Add that entry to the register, run API tests and both app typechecks after
   `pnpm run typecheck:libs`, and deploy the client and server together.
4. Verify the actual public URL returns 200 and `application/pdf`, has no
   `X-Robots-Tag: noindex`, and that both work-page languages link to it and use
   it for the structured-data `contentUrl`. Confirm `/api/` remains disallowed.

Approval is revision-specific. Any normal work edit changes `updatedAt`, so the
public route returns 404 until renewed approval. Replacing bytes also fails the
SHA-256 check. Unpublishing, removing the file, or removing approval disables the
public route. Responses use `no-store` to avoid serving revoked attachments from
HTTP caches. Existing work-page/API caches may briefly retain an old link; the
document handler still rechecks access on every request.

Remove the register entry and redeploy both bundles to revoke indexing approval;
unpublish the work if its existing API attachment must also become inaccessible.
Unapproved published attachments keep their existing API link and exclusions.
Unknown `/documents/` paths return 404, never the application HTML shell.

This initial route accepts PDFs only. Other attachment types retain their current
excluded API URLs. Public indexing, search-engine retrieval and ranking are
external outcomes, separate from local route acceptance.
