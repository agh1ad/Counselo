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

// Detect prerendered content via a data attribute stamped by prerender.ts.
// Checking innerHTML is unreliable: Replit dev plugins inject DOM content
// before the app mounts, causing false positives in dev mode.
// Only hydrate in production builds where the attribute is guaranteed to
// be present (set by the prerender script on every rendered route).
const isPrerendered = import.meta.env.PROD && rootEl.hasAttribute("data-ssr");

if (isPrerendered) {
  // Prerendered HTML is present — hydrate to attach React event handlers
  // without discarding the server-rendered DOM nodes.
  hydrateRoot(
    rootEl,
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
} else {
  // Dev mode, or production page without prerender — mount fresh.
  createRoot(rootEl).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );
}
