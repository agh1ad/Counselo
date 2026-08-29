/**
 * Client-side entry point.
 *
 * `/` and `/ar` are fully prerendered documents: their copy, links, structured
 * content, images, and layout already exist before JavaScript runs. Keep that
 * exact HTML interactive as ordinary web content and postpone the React runtime
 * until a visitor approaches the below-fold carousel. This removes ReactDOM,
 * Helmet, query, router, and carousel work from the landing page's critical
 * rendering path without changing the server-rendered page.
 *
 * All other routes keep normal immediate React hydration.
 */

import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");
const rootEl: HTMLElement = rootElement;

const pathname = window.location.pathname;
const normalizedPath = pathname.replace(/\/+$/, "") || "/";
const isPickerRoute = normalizedPath === "/" || normalizedPath === "/ar";

// Detect prerendered content via attributes stamped by prerender.ts.
const ssrUrl = rootEl.getAttribute("data-ssr-url");
const isPrerendered =
  import.meta.env.PROD &&
  rootEl.hasAttribute("data-ssr") &&
  ssrUrl === pathname;

let analyticsPromise: Promise<typeof import("./lib/analytics")> | null = null;

function loadAnalytics() {
  analyticsPromise ??= import("./lib/analytics");
  return analyticsPromise;
}

function afterWindowLoad(callback: () => void) {
  if (document.readyState === "complete") {
    window.setTimeout(callback, 0);
    return;
  }
  window.addEventListener("load", callback, { once: true });
}

/**
 * Preserve picker analytics independently of React hydration. This is important
 * for short visits: page views and conversion clicks continue to queue even if
 * the visitor never scrolls far enough to need the React carousel runtime.
 */
function installPickerAnalytics() {
  afterWindowLoad(() => {
    void loadAnalytics().then(({ injectGTM, trackPageview }) => {
      trackPageview(window.location.pathname);
      injectGTM();
    });
  });

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
}

function progressivelyHydratePicker() {
  let started = false;
  let observer: IntersectionObserver | null = null;

  const cleanup = () => {
    window.removeEventListener("scroll", startHydration);
    window.removeEventListener("wheel", startHydration);
    window.removeEventListener("touchmove", startHydration);
    observer?.disconnect();
    observer = null;
  };

  const startHydration = () => {
    if (started) return;
    started = true;
    cleanup();
    void import("./hydrate-picker").then(({ mountPicker }) => {
      mountPicker(rootEl, true, true);
    });
  };

  // Scrolling means the visitor is leaving the static above-the-fold picker and
  // may soon need the dynamic content below it. Passive listeners do no work
  // during the initial render and are removed as soon as hydration begins.
  window.addEventListener("scroll", startHydration, { passive: true, once: true });
  window.addEventListener("wheel", startHydration, { passive: true, once: true });
  window.addEventListener("touchmove", startHydration, { passive: true, once: true });

  // On browsers with IntersectionObserver, also hydrate just before a carousel
  // enters view so its controls/autoplay/query refresh are ready when needed.
  if ("IntersectionObserver" in window) {
    const carousels = document.querySelectorAll<HTMLElement>("[aria-roledescription='carousel']");
    if (carousels.length) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) startHydration();
        },
        { rootMargin: "300px 0px" },
      );
      carousels.forEach((carousel) => observer?.observe(carousel));
    }
  }
}

async function boot() {
  if (!isPrerendered && rootEl.hasAttribute("data-ssr")) {
    // If the prerendered fallback belongs to a different URL, remove that stale
    // markup before mounting the correct client route.
    rootEl.innerHTML = "";
  }

  if (!isPickerRoute) {
    const { mountApp } = await import("./hydrate-app");
    mountApp(rootEl, isPrerendered);
    return;
  }

  if (!isPrerendered) {
    const { mountPicker } = await import("./hydrate-picker");
    mountPicker(rootEl, false, false);
    return;
  }

  installPickerAnalytics();
  progressivelyHydratePicker();
}

void boot();
