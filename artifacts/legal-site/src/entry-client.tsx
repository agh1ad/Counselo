/**
 * Client-side entry point.
 *
 * The jurisdiction selector is the highest-traffic landing surface and does not
 * need the full application shell. Load a dedicated lightweight hydration tree
 * for `/` and `/ar`; all other routes dynamically import the complete App.
 * Server-rendered HTML remains visible while the route module is fetched.
 */

import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

const rootEl = document.getElementById("root")!;
const pathname = window.location.pathname;
const isPickerRoute = pathname === "/" || pathname === "/ar";

// Detect prerendered content via attributes stamped by prerender.ts.
const ssrUrl = rootEl.getAttribute("data-ssr-url");
const isPrerendered =
  import.meta.env.PROD &&
  rootEl.hasAttribute("data-ssr") &&
  ssrUrl === pathname;

async function boot() {
  const { default: App } = isPickerRoute
    ? await import("./PickerApp")
    : await import("./App");

  const tree = (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

  if (isPrerendered) {
    hydrateRoot(rootEl, tree);
    return;
  }

  // If the prerendered fallback belongs to a different URL, remove that stale
  // markup before mounting the correct client route.
  if (rootEl.hasAttribute("data-ssr")) {
    rootEl.innerHTML = "";
  }
  createRoot(rootEl).render(tree);
}

void boot();
