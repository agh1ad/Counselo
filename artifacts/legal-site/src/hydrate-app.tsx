import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

export function mountApp(rootEl: HTMLElement, isPrerendered: boolean) {
  const tree = (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

  if (isPrerendered) {
    hydrateRoot(rootEl, tree);
    return;
  }

  createRoot(rootEl).render(tree);
}
