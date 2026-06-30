---
name: LanguageContext Fast Refresh split
description: Why LanguageContext.tsx was split and how the files relate — critical for future edits.
---

## The rule

`LanguageContext.tsx` must ONLY export `LanguageProvider` (a React component).
The `useLanguage` hook must live in `LanguageContextCore.ts` (a plain TS file, not TSX).
The shared context object (`LanguageContext`) lives in `LanguageContextCore.ts`.

**Why:** Vite's Fast Refresh marks any file that exports both an uppercase component AND a lowercase hook/value as "incompatible". This triggers a full module invalidation chain on every translation-file save. Under rapid successive edits to `en.ts`/`ar.ts`, these cascading invalidations leave the browser in a broken state where `useLanguage` throws "must be used within LanguageProvider" even though the provider is mounted.

**How to apply:**
- If you need to add anything to `LanguageContext.tsx` — only add component-level code.
- If you add a new hook or export a plain value, put it in `LanguageContextCore.ts`.
- `LanguageContext.tsx` re-exports `useLanguage` (and types) from `LanguageContextCore.ts` for backward compat — all 30+ consumer files import from `@/contexts/LanguageContext` and need no changes.
- Same rule applies to `RegionContext.tsx` / `RegionContextCore.ts` if the region context ever grows — currently `RegionContext.tsx` doesn't import large translation files so HMR cascades are rare and `// @refresh reset` is sufficient there.

## File map

| File | Exports | Purpose |
|---|---|---|
| `LanguageContextCore.ts` | `LanguageContext` (context obj), `useLanguage`, types | Shared context + hook; no components |
| `LanguageContext.tsx` | `LanguageProvider`, re-exports from Core | Component + barrel re-exports |
