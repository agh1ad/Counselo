# Live PDF routing and interaction correction — 13 November 2026

The live site returned HTML 404 responses for all 60 canonical `/documents/*.pdf` URLs after publication. All 60 legacy `/api/work/:slug/file` URLs still located their published files and redirected to the canonical URLs. The files were intact; the deployed API artifact did not own `/documents`, and the standalone web server had no document forwarding route. The local audit fixture had mounted the document handler directly, so it did not test that deployment boundary.

A separate click-tracking defect froze the page before document navigation. The shared public-path validator used nested repetitions with an optional separator; a long document slug followed by `.pdf` caused catastrophic regular-expression backtracking. The failure also reproduced with keyboard activation and with the PDF iframe absent. The live entry bundle contained the same faulty validator. The validator now checks bounded path segments without ambiguous repetitions, retaining the existing analytics privacy restrictions.

The API artifact now owns `/documents`. The standalone server also forwards canonical document requests through `/api/documents`, which is guaranteed to reach the API on a split path router and avoids forwarding back to itself. Both API paths use the same publication-aware loader and document handler. PDF/text bytes, HEAD, download disposition, canonical links and self-only framing headers are preserved. Missing files, upstream failures and HTML responses produce bounded plain-text errors rather than an HTML application inside a document frame.

The automatic preview performs an eight-second, cancellable HEAD check before embedding. Loading, failure and Retry states are bilingual; open/download links remain available. The preview does not require an opt-in toggle.

Verification:

- Live baseline: 60 canonical HTML 404s; 60 successful legacy redirects confirming the backend can locate the files.
- Focused frontend tests: 21 passed, covering standalone path routing, deployment ownership, preview validation, analytics privacy and a bounded worker regression for long document addresses. Focused API routing/document tests: 10 passed.
- Bilingual browser failure/retry/timeout/navigation-cancellation checks passed. An independent comparison of the old and new analytics validators on 55,987 short paths found no behavior changes.
- All 60 original PDF files returned byte-identically through both the API document mount and the standalone forwarding route: 120 successful body checks, plus HEAD/download checks.
- Browser inspection confirmed a rendered native PDF. On the rebuilt production output, mouse and keyboard opening, byte-identical downloads, analytics privacy and subsequent navigation passed in Arabic/English at 1440px/390px across both deployment routes, with no page errors or horizontal overflow.
- Frontend production build, API typecheck and API production build passed.

The correction requires republishing the new Git revision. Local verification and a Git push do not establish that the live deployment has changed. After publishing, repeat GET/HEAD checks on canonical documents and verify the native preview on the public site.
