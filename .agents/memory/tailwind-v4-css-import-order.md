---
name: Tailwind v4 CSS import ordering
description: @import "tailwindcss" must be first in index.css — other @imports before it silently break Tailwind's Vite plugin in production
---

## Rule

`@import "tailwindcss"` must be the **first** `@import` statement in the project's main CSS file (`index.css`). Any other `@import` placed before it (including npm packages like fontsource) will break Tailwind v4's Vite plugin — the plugin stops processing the file, producing a build with no Tailwind styles.

**Why:** The `@tailwindcss/vite` plugin takes over CSS processing when it encounters `@import "tailwindcss"`. If other `@import` statements precede it, the plugin does not correctly recognize and process the file in production builds. The symptom is a deployed site with all text/layout styling stripped (unstyled HTML), while the dev server still works fine due to HMR re-processing.

**How to apply:**
- Never put `@import` statements for npm CSS packages (fontsource, etc.) before `@import "tailwindcss"` in index.css.
- For self-hosted fonts (fontsource), import them as **JavaScript module imports** in the entry-client file instead:
  ```typescript
  // entry-client.tsx (after index.css import)
  import "@fontsource-variable/inter";
  import "@fontsource/playfair-display/400.css";
  ```
  Vite handles these as JS module dependencies, completely bypassing the CSS @import ordering restriction.
- This pattern is safe for SSR/prerender because only entry-client.tsx (the browser entry) imports them — not entry-server.tsx.
