# Saudi legal-source matrix review

The Saudi service/source matrix is defined in
`artifacts/legal-site/src/lib/saudi-legal-sources.ts` and is enforced by
`saudi-legal-sources.test.ts`.

## Review scope

- Every live Saudi service slug is required to have an explicit entry.
- Each entry identifies a topic-specific Saudi authority and the Bureau of
  Experts official laws portal.
- Unknown service IDs return no sources; they never inherit a source by
  substring matching or a default authority.

## Human legal review sign-off

Status: **Pending human legal review**

Reviewer: ____________________  Date: ____________________

The reviewer should verify each primary authority URL and confirm that the
complete matrix is appropriate for the service scope before release.
