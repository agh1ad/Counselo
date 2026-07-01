---
name: index.html nested HTML comment gotcha
description: Placing <!--app-head--> placeholder text inside a developer doc comment in index.html breaks HTML parsing — the inner --> closes the outer comment, rendering the rest as visible text.
---

## Rule
Never put `<!--tag-->` style strings inside HTML `<!-- ... -->` comments in `index.html`. Nested `-->` sequences terminate the outer comment early.

**Why:** Vite's `parse5`-based HTML parser throws `nested-comment` error and browsers close the outer comment at the first `-->` they encounter, rendering the remaining comment text as visible page content. This is exactly what happened in `artifacts/legal-site/index.html` — the SSR architecture doc comment referenced `<!--app-head-->` three times inside it, causing the region picker / entire page to show raw text instead of the React app.

**How to apply:** If you need developer documentation inside `index.html`, use plain text descriptions without `<!--...-->` syntax, or move the documentation to a separate `.md` file. The actual `<!--app-head-->` placeholder (used by prerender.ts) must remain — it just cannot appear inside another comment.
