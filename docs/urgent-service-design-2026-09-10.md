# Urgent service design refinement

Scope: the eight urgent legal assistance routes, preserving bilingual service content, URLs and legal/operational boundaries.

Palette: forest #0a3728, ink #173f2f, muted text #52675e, gold #d9b878, pale sage #eff5f1 and white #ffffff. Retain the installed Playfair Display/Inter and existing Arabic font settings. Direction follows the language; text is start-aligned with controlled line lengths.

Layout: a spacious hero with an adjacent light intake panel; distinct service icons; a connected four-step process; a document-style copyable checklist; a jurisdiction section with a focused local preparation panel; a split fee/transparency section; a compact native FAQ accordion; editorial links and a final dark contact panel. Sections are different because their information has different jobs.

Hero concept: [message and legal scope | contact actions and timing]. On mobile: message, actions, timing. The intake panel is the strongest visual device; avoid decorative imagery, urgency alarm graphics, fake availability indicators and repeated uniform cards. Keep all service and deadline qualifications visible. Use numbering only for the sequential process.

QA: every section in English and Arabic, desktop/tablet/mobile down to 320px, language switching, anchor navigation, FAQ keyboard interaction, clipboard success/error feedback, and initial HTML/SEO preservation.

## Verification results

- TypeScript check, all 140 site tests and full production build passed.
- Chromium checked all eight routes at 320, 390, 768, 1024 and 1440px: 40 cases, no horizontal overflow or recorded runtime errors.
- Verified keyboard FAQ operation, six section anchors, Arabic clipboard content and language-switch copy feedback. Production anchor checks passed on English/global and Arabic/Syria at mobile and desktop sizes.
- Visually reviewed the hero, services, timeline, intake checklist, jurisdiction, fees, FAQ, resources and final contact panel in Arabic and English. Section-only screenshots hide fixed chrome for inspection; full viewport screenshots retain it.
- Production HTTP checks passed on all eight service routes. Full SEO validation: 1,483 pages, zero errors, 246 warnings elsewhere; all eight urgent-service pages have zero issues.
- Evidence: output/urgent-design/verification.json, output/urgent-design/anchor-verification.log, output/playwright/urgent-design-*.png and output/urgent-legal-assistance/http-verification.json.
- Browser coverage is Chromium with emulated viewport sizes. Firefox and WebKit could not launch because cached engines did not match the runner versions. Clipboard failure feedback is implemented; the successful copy path was exercised.
- Local implementation and preview only; no Git push or production publication.
