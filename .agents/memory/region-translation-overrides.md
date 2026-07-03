---
name: Region translation shallow spread leaks
description: Region-variant translation files (e.g. en-syr.ts, ar-syr.ts) built on top of a base region via object spread silently leak base-region content when a nested subfield isn't explicitly overridden.
---

Region variant translation files (e.g. `en-syr.ts` built from `en.ts`) commonly use
`{ ...base.section, someOverride: "..." }` at the top level of an object. Any nested
subfield not explicitly listed in the override object is inherited verbatim from the
base region — including region-specific proper nouns, place names, and legal/regulatory
references that don't apply to the variant region.

**Why:** This caused real content bugs — Saudi-specific copy ("Eastern Province",
"Kingdom") leaking onto a Syria about page, and a founder bio's 4th paragraph inheriting
Saudi text because only bio1-3 were overridden.

**How to apply:**
- When adding or auditing a region-variant translation object, check every nested field
  of every spread section, not just the fields visibly overridden in the diff.
- Grep the base region's copy for the region-specific nouns/terms (country name, city
  names, legal code names) and confirm the variant file overrides all of them.
- Prefer deriving counts (e.g. "17 practice areas" / "20 practice areas") from
  `array.length` at render time instead of hardcoding a number in copy, SEO
  title/description, or JSON-LD — hardcoded counts drift out of sync when items are
  added/removed per region.
