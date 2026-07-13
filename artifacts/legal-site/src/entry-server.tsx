/**
 * SSR entry point — used exclusively by the prerender build pipeline.
 *
 * Vite compiles this file into dist/server/entry-server.js (Node-compatible ESM).
 * The prerender script (src/scripts/prerender.ts) imports that bundle, calls
 * render(url) for each public route, and writes static HTML to dist/public/.
 *
 * Why: Googlebot and AI crawlers (Perplexity, ChatGPT) may not execute JS.
 * Prerendering ensures every indexable route returns full HTML — title,
 * description, OG tags, canonical URL, JSON-LD schemas, and visible body
 * text — without requiring JavaScript execution.
 *
 * React 19 + react-helmet-async v3 note:
 * In React 19, HelmetProvider is a passthrough wrapper. Head tags (<title>,
 * <meta>, <link>, <script>) are rendered INLINE at the very start of the
 * renderToString output string via React 19's native head hoisting — the old
 * HelmetProvider context object is never populated. splitHeadAndBody() extracts
 * those hoisted tags so the prerender script can place them in <head>.
 */

import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App, { type InitialBlogPost } from "./App";

export interface RenderResult {
  /** Hoisted head tags (title, meta, link, script) from React 19 head hoisting */
  head: string;
  /** The rendered React component HTML to inject into <div id="root"> */
  body: string;
}

/**
 * Extract React 19-hoisted head tags from the start of a renderToString output.
 *
 * React 19 hoists <title>, <meta>, <link>, <script>, <style>, and <noscript>
 * to the beginning of the renderToString output. This function separates those
 * tags from the component body HTML that follows.
 */
function splitHeadAndBody(rendered: string): { head: string; body: string } {
  const HEAD_TAG_RE = /^<(title|meta|link|script|style|noscript|base)[\s\/>]/i;

  let pos = 0;
  while (pos < rendered.length) {
    if (!HEAD_TAG_RE.test(rendered.slice(pos))) break;

    const tagMatch = rendered.slice(pos).match(/^<(\w+)/);
    if (!tagMatch) break;
    const tagName = tagMatch[1].toLowerCase();

    if (tagName === "meta" || tagName === "link" || tagName === "base") {
      // Self-closing tags: advance past the closing >
      const end = rendered.indexOf(">", pos) + 1;
      if (end <= pos) break;
      pos = end;
    } else {
      // Tags with closing pairs: title, script, style, noscript
      const closeTag = `</${tagName}>`;
      const closePos = rendered.toLowerCase().indexOf(closeTag, pos);
      if (closePos === -1) break;
      pos = closePos + closeTag.length;
    }
  }

  return {
    head: rendered.slice(0, pos).trim(),
    body: rendered.slice(pos),
  };
}

/**
 * Render a single route to an HTML string and extract its head tags.
 * Called by the prerender script once per public route.
 */
export function render(
  url: string,
  initialBlogPosts: InitialBlogPost[] = [],
): RenderResult {
  const rendered = renderToString(
    <HelmetProvider>
      <App ssrUrl={url} initialBlogPosts={initialBlogPosts} />
    </HelmetProvider>,
  );

  return splitHeadAndBody(rendered);
}
