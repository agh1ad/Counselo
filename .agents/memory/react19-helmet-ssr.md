---
name: React 19 + react-helmet-async v3 SSR
description: How to do SSR head injection with react-helmet-async v3 on React 19 — context object never populated, use renderToString output parsing instead
---

## Rule

Do NOT use `HelmetProvider context={ctx}` to extract head tags in React 19. The context object is never populated.

## Why

react-helmet-async v3 has a `if (isReact19)` branch in `HelmetProvider`:
- Constructor sets `this.helmetData = null` (skips `new HelmetData(ctx, ...)`)
- `render()` returns children directly as a Fragment, no Context.Provider wrapper
- The context prop is completely ignored

React 19 instead uses native head hoisting: `<title>`, `<meta>`, `<link>`, `<script>`, `<style>`, `<noscript>` tags rendered anywhere in the tree appear **at the very start** of the `renderToString()` output string.

## How to apply

Split the `renderToString` output using a tag scanner:
1. Walk from position 0; while the current position starts with a known head tag name (`title|meta|link|script|style|noscript|base`), advance past that tag.
2. Self-closing tags (`meta`, `link`, `base`): advance to the next `>`.
3. Tags with content (`title`, `script`, `style`, `noscript`): advance to `</tagname>`.
4. `head = rendered.slice(0, pos)`, `body = rendered.slice(pos)`.

Then inject `head` into `<!--app-head-->` and `body` into `<div id="root">`.

## noExternal warning

Do NOT put `react-helmet-async` in Vite SSR `noExternal`. Vite's browser-target bundler replaces `typeof window !== "undefined"` with `true`, making `canUseDOM=true` in the bundled output — even though this is no longer the primary issue in React 19 mode, it remains a latent risk for any code paths that still check `canUseDOM`.
