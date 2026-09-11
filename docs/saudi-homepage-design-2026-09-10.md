# Saudi homepage redesign

Scope: `/sa` and `/sa/ar`. The global homepage remains the condensed design chosen in this conversation. Saudi now has its own presentation component, while Syria and UAE continue to use the existing regional component.

All ten sections and 129 content blocks in the supplied Saudi draft are included. Arabic has matching paragraph and list coverage. The source copy is retained beside the bilingual content for comparison. The approved cooperating-office record matches the supplied Abdullah Al-Anzi name and licence 37440; this is a repository consistency check, not independent licence verification.

The layout uses a light hero with a Saudi map, a prominent five-part credentials strip, a two-column practice list with one CTA, a dark business section, a separately defined local-office panel, experience and founder sections, a four-step process, Saudi-filtered publications, eight FAQ disclosures and a closing consultation section. Every section has its own visual hierarchy, with constrained reading widths and responsive Arabic layout.

The page preserves the existing regional header, footer, contact routes and SEO metadata system. A scoped desktop spacing correction prevents the Saudi header lockup from colliding with navigation. The server language adapter now applies the same existing search-intent copy alignment as the browser adapter; browser checks identified their previous mismatch during hydration.

## Verification

- TypeScript and 138 tests pass, including an exact source-content and Arabic list-parity check.
- Client and SSR builds pass; existing source-map and large-chunk warnings remain.
- Ten Chromium combinations cover English and Arabic at 1440, 1087, 768, 390 and 320 pixels: no horizontal overflow, one H1, eight FAQs, and one service-directory CTA.
- Both homepage HTTP responses contain all 129 supplied blocks, with correct canonicals, unique IDs and valid local section anchors. The text comparison normalizes punctuation used in designed lists and process numbers.
- Service-directory navigation, the Arabic representation contact link and keyboard FAQ opening were exercised. No contact request was sent.
- Evidence is under `output/playwright/sa-home-*` and the named section screenshots.

Local preview only. No Git commit, GitHub push or public publication was performed. Local live-discovery API requests may fall back to prerendered content when the API server is unavailable.

The final English and Arabic reloads reported no uncaught browser errors after regenerating both routes with the aligned server language adapter. Final HTTP content coverage again passed 129/129 blocks per language.
