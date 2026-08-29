import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import PickerApp from "./PickerApp";

export function mountPicker(
  rootEl: HTMLElement,
  isPrerendered: boolean,
  externalRuntime = false,
) {
  const tree = (
    <HelmetProvider>
      <PickerApp externalRuntime={externalRuntime} />
    </HelmetProvider>
  );

  if (isPrerendered) {
    hydrateRoot(rootEl, tree);
    return;
  }

  createRoot(rootEl).render(tree);
}
