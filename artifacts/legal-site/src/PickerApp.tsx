import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Router as WouterRouter, useLocation } from "wouter";
import RegionPicker from "@/pages/region-picker";
import ArRegionPicker from "@/pages/ar-region-picker";

const queryClient = new QueryClient();
let analyticsPromise: Promise<typeof import("@/lib/analytics")> | null = null;

function loadAnalytics() {
  analyticsPromise ??= import("@/lib/analytics");
  return analyticsPromise;
}

function afterWindowLoad(callback: () => void) {
  if (document.readyState === "complete") {
    window.setTimeout(callback, 0);
    return () => undefined;
  }
  window.addEventListener("load", callback, { once: true });
  return () => window.removeEventListener("load", callback);
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    return afterWindowLoad(() => {
      void loadAnalytics().then(({ trackPageview }) => trackPageview(location));
    });
  }, [location]);
  return null;
}

function GAInit() {
  useEffect(() =>
    afterWindowLoad(() => {
      void loadAnalytics().then(({ injectGTM }) => injectGTM());
    }),
  []);
  return null;
}

function InteractionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const rawTarget = event.target;
      if (!(rawTarget instanceof Element)) return;
      const element = (rawTarget.closest<HTMLElement>("a,button,input,select,textarea,[role='button']") ?? rawTarget) as HTMLElement;
      const anchor = element.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href") ?? "";
      const input = element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement;
      const label = input
        ? (element.getAttribute("aria-label") || element.getAttribute("name") || element.tagName).slice(0, 100)
        : (element.getAttribute("aria-label") || element.textContent || element.tagName).replace(/\s+/g, " ").trim().slice(0, 100);
      const details = {
        element_tag: element.tagName.toLowerCase(),
        element_id: element.id.slice(0, 80),
        element_name: element.getAttribute("name")?.slice(0, 80),
        click_text: label,
        link_url: href.slice(0, 300),
        outbound: Boolean(anchor?.origin && anchor.origin !== window.location.origin),
        cta: element.dataset.cta,
        conversion_position: element.dataset.conversionPosition,
        region: element.dataset.region,
        language: element.dataset.lang,
      };

      void loadAnalytics().then(({ trackEvent }) => {
        trackEvent("click", window.location.pathname, details);
        if (/wa\.me|whatsapp/i.test(href) || element.dataset.cta === "whatsapp") {
          trackEvent("whatsapp_click", window.location.pathname, details);
        } else if (href.startsWith("tel:")) {
          trackEvent("phone_click", window.location.pathname, details);
        } else if (href.startsWith("mailto:")) {
          trackEvent("email_click", window.location.pathname, details);
        } else if (element.dataset.cta === "contact" || /\/contact(?:\?|$)/.test(href)) {
          trackEvent("consultation_click", window.location.pathname, details);
        }
        if (anchor?.hasAttribute("download") || /[?&]download=1/.test(href)) {
          trackEvent("file_download", window.location.pathname, details);
        }
      });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      void loadAnalytics().then(({ trackEvent }) => {
        trackEvent("form_submit_attempt", window.location.pathname, {
          form_id: form.id.slice(0, 80),
          form_name: form.getAttribute("name")?.slice(0, 80),
        });
      });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);
  return null;
}

export default function PickerApp() {
  const isArabic = window.location.pathname === "/ar";
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={(import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "")}>
        <Suspense fallback={<div className="min-h-screen bg-background" aria-live="polite" />}>
          <GAInit />
          <InteractionTracking />
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-[60vh]" aria-live="polite" />}>
            {isArabic ? <ArRegionPicker /> : <RegionPicker />}
          </Suspense>
        </Suspense>
      </WouterRouter>
    </QueryClientProvider>
  );
}
