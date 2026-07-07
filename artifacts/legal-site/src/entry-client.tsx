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

import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
// Self-hosted fonts — JS imports processed by Vite independently of the CSS
// pipeline, so @import "tailwindcss" stays first in index.css (required by Tailwind v4)
import "@fontsource-variable/inter";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/tajawal/300.css";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";

const rootEl = document.getElementById("root")!;

// Always mount fresh via createRoot. The prerendered HTML (data-ssr="true")
// remains in the DOM for SEO crawlers that don't execute JS. React replaces
// it with the live render immediately after the bundle loads, at which point
// Framer Motion animations run exactly as in dev mode.
//
// We intentionally do NOT use hydrateRoot: Framer Motion v12 SSR initial
// states (opacity:0 etc.) baked into the prerendered HTML cause content to
// remain invisible when hydrateRoot is used, because the hydration context
// prevents Framer Motion from triggering its initial→animate transitions.
createRoot(rootEl).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
