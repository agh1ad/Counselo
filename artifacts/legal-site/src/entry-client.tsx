/**
 * Client-side entry point — replaces the simple createRoot call in main.tsx.
 *
 * Strategy:
 *   - Production (prerendered): the <div id="root"> already contains server-
 *     rendered HTML. Use hydrateRoot so React attaches to existing DOM nodes
 *     instead of replacing them, preserving SEO-critical content before JS loads.
 *   - Development (no prerender): root is empty; fall back to createRoot so
 *     there are no hydration-mismatch warnings during development.
 *
 * This file is referenced by index.html via <script type="module" src="/src/main.tsx">.
 * (main.tsx re-exports this logic to keep the HTML entry point filename stable.)
 */

import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root")!;

// Detect prerendered content via attributes stamped by prerender.ts.
//
// data-ssr      → root div was prerendered (any route)
// data-ssr-url  → which URL was prerendered (e.g. "/sa/ar/blog/divorce-in-saudi-arabia")
//
// We compare data-ssr-url against the current pathname so that when index.html
// (prerendered for "/") is served as the static catch-all fallback for an
// unprerendered path (e.g. a new dynamic blog post created via AdminCMS), we
// detect the URL mismatch and use createRoot instead of hydrateRoot. Without
// this check, hydrateRoot would receive region-picker SSR HTML while React
// expects a blog post — a fatal mismatch that leaves the user stuck on the
// region picker and unable to reach the intended page.
const ssrUrl = rootEl.getAttribute("data-ssr-url");
const isPrerendered =
  import.meta.env.PROD &&
  rootEl.hasAttribute("data-ssr") &&
  ssrUrl === window.location.pathname;

if (isPrerendered) {
  // Prerendered HTML is present and matches the current URL — hydrate to
  // attach React event handlers without discarding the server-rendered DOM.
  hydrateRoot(
    rootEl,
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
} else {
  // Dev mode, URL mismatch (catch-all fallback), or production page without
  // prerender (e.g. /counselo-admin) — mount fresh with createRoot so React
  // renders the correct content for the actual URL.
  //
  // If stale prerendered HTML is present (e.g. the region-picker index.html
  // was served as the catch-all for a dynamic blog post URL), wipe it before
  // React mounts. Without this the user briefly sees the wrong page (e.g. the
  // region picker) while createRoot is initialising — the flash the user reported.
  if (rootEl.hasAttribute("data-ssr")) {
    rootEl.innerHTML = "";
  }
  createRoot(rootEl).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
}
