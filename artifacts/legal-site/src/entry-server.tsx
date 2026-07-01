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
 */

import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";

/** Shape of the context object populated by HelmetProvider during renderToString. */
interface HelmetContext {
  helmet?: HelmetServerState;
}

export interface RenderResult {
  /** The rendered React HTML to inject into <div id="root"> */
  html: string;
  /** Extracted Helmet head tags (title, meta, link, script) */
  helmet: HelmetServerState;
}

/**
 * Render a single route to an HTML string and extract its head tags.
 * Called by the prerender script once per public route.
 */
export function render(url: string): RenderResult {
  // HelmetProvider populates this context object during renderToString
  const helmetContext: HelmetContext = {};

  const html = renderToString(
    // HelmetProvider in SSR mode captures all <Helmet> output into helmetContext
    <HelmetProvider context={helmetContext}>
      {/* ssrPath tells wouter which URL to render without a browser location */}
      <App ssrUrl={url} />
    </HelmetProvider>,
  );

  if (!helmetContext.helmet) {
    throw new Error(`HelmetProvider did not populate context for route: ${url}`);
  }

  return { html, helmet: helmetContext.helmet };
}
