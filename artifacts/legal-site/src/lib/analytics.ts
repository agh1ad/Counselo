import { publicMeasurementPath } from "@workspace/api-zod/browser";
import { getAcquisitionContext } from "./acquisition";
import { measurementBootstrap } from "./measurement-bootstrap";

const STORE_KEY = "counselo_analytics";
const GTM_CONTAINER_ID = "GTM-WZ6SW99X";
export const MEASUREMENT_EVENTS = ["page_view", "click", "whatsapp_click", "consultation_click", "phone_click", "email_click", "file_download", "form_submit_attempt", "form_submit_error", "generate_lead"] as const;
export type MeasurementEvent = typeof MEASUREMENT_EVENTS[number];
type AnalyticsDetails = Record<string, string | number | boolean | undefined>;

export interface EventLog { event: string; page: string; ts: number; details?: Record<string, string | number | boolean>; }
export interface AnalyticsStore {
  whatsapp_clicks: number; consultation_clicks: number; phone_clicks: number; email_clicks: number;
  events: EventLog[]; pageviews: Record<string, number>;
  daily: Record<string, { whatsapp: number; consultation: number }>;
}
const emptyStore = (): AnalyticsStore => ({ whatsapp_clicks: 0, consultation_clicks: 0, phone_clicks: 0, email_clicks: 0, events: [], pageviews: {}, daily: {} });
function load(): AnalyticsStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AnalyticsStore;
      if (parsed && Array.isArray(parsed.events) && parsed.pageviews && typeof parsed.pageviews === "object" && parsed.daily && typeof parsed.daily === "object"
        && [parsed.whatsapp_clicks, parsed.consultation_clicks, parsed.phone_clicks, parsed.email_clicks].every((n) => Number.isFinite(n) && n >= 0)
        && Object.values(parsed.daily).every((day) => day && Number.isFinite(day.whatsapp) && Number.isFinite(day.consultation))) return parsed;
    }
  } catch {}
  return emptyStore();
}
function save(store: AnalyticsStore) {
  try { store.events = store.events.slice(-200); localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch {}
}

/** Only explicit, bounded categorical fields reach analytics. Never forward DOM
 * text, form values, filenames, raw URLs, search parameters or arbitrary objects. */
export function measurementParameters(page: string, details: AnalyticsDetails = {}): Record<string, string | number | boolean> | undefined {
  const path = publicMeasurementPath(page);
  if (!path) return undefined;
  const params: Record<string, string | number | boolean> = { page_path: path, page_location: `https://counselo-legal.com${path}` };
  const region = path.match(/^\/(sa|syr|uae)(?:\/|$)/)?.[1];
  if (region) params.region = region;
  params.language = /(?:^|\/)ar(?:\/|$)/.test(path) ? "ar" : "en";
  for (const key of ["cta", "conversion_position", "service", "consultation_product", "form_name", "form_id", "element_tag"] as const) {
    const value = details[key];
    if (typeof value === "string" && /^[a-z][a-z0-9_-]{0,79}$/.test(value)) params[key] = value;
  }
  if (typeof details.attachment_count === "number" && Number.isInteger(details.attachment_count) && details.attachment_count >= 0 && details.attachment_count <= 10) params.attachment_count = details.attachment_count;
  if (typeof details.lead_id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(details.lead_id)) params.lead_id = details.lead_id;
  if (typeof details.outbound === "boolean") params.outbound = details.outbound;
  if (typeof details.page_title === "string") params.page_title = details.page_title.replace(/[\u0000-\u001f]/g, " ").slice(0, 180);
  if (typeof details.link_url === "string") {
    try {
      const url = new URL(details.link_url, "https://counselo-legal.com");
      if (url.hostname === "counselo-legal.com") {
        const target = publicMeasurementPath(url.pathname);
        if (target) params.link_url = `https://counselo-legal.com${target}`;
      } else if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") params.link_url = "https://wa.me/";
      else if (url.protocol === "mailto:") params.link_url = "mailto:";
      else if (url.protocol === "tel:") params.link_url = "tel:";
      else if (url.protocol === "https:" || url.protocol === "http:") params.link_url = "external";
    } catch {}
  }
  return params;
}

/** The staged GTM configuration maps counselo_event and this allowlisted
 * object. Published v4 ignores it until the separate account cutover. */
export function dispatchMeasurement(event: MeasurementEvent, page: string, details: AnalyticsDetails = {}): boolean {
  if (typeof window === "undefined" || !MEASUREMENT_EVENTS.includes(event)) return false;
  const params = measurementParameters(page, details);
  if (!params) return false;
  const acquisition = getAcquisitionContext();
  if (acquisition) { params.landing_page = acquisition.landingPath; params.acquisition_source = acquisition.source; params.acquisition_medium = acquisition.medium; }
  const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
  win.dataLayer ??= [];
  // Version-2 GTM data-layer variables otherwise recursively retain fields from
  // the previous event (for example, a lead ID on an unrelated later click).
  win.dataLayer.push({ counselo: null });
  win.dataLayer.push({ event: "counselo_event", counselo: { name: event, ...params } });
  return true;
}

export function trackEvent(event: MeasurementEvent, page: string, details: AnalyticsDetails = {}) {
  const clean = measurementParameters(page, details);
  if (!clean) return;
  dispatchMeasurement(event, page, clean);
  const store = load();
  const day = new Date().toISOString().slice(0, 10);
  if (event === "whatsapp_click") store.whatsapp_clicks++;
  if (event === "consultation_click") store.consultation_clicks++;
  if (event === "phone_click") store.phone_clicks++;
  if (event === "email_click") store.email_clicks++;
  store.events.push({ event, page: String(clean.page_path), ts: Date.now(), details: clean });
  store.daily[day] ??= { whatsapp: 0, consultation: 0 };
  if (event === "whatsapp_click") store.daily[day].whatsapp++;
  if (event === "consultation_click") store.daily[day].consultation++;
  save(store);
}

export function pageMetadataMatches(path: string, currentPath: string, canonical: string | null, title: string): boolean {
  if (!title.trim() || !canonical || publicMeasurementPath(currentPath) !== path) return false;
  try { return publicMeasurementPath(new URL(canonical).pathname) === path; } catch { return false; }
}
let lastPageviewPath: string | undefined;

/** Wait for the destination's Helmet metadata, then allow it to settle. A
 * Suspense route may resolve after history changes, so a route-effect alone is
 * too early. Cleanup cancels abandoned navigation and React effect replay. */
export function trackPageview(requestedPath: string): () => void {
  const path = publicMeasurementPath(requestedPath);
  if (typeof document === "undefined" || !path) return () => {};
  let settle: ReturnType<typeof setTimeout> | undefined;
  let expired = false;
  const observer = new MutationObserver(check);
  const deadline = setTimeout(stop, 15_000);
  function stop() { expired = true; observer.disconnect(); clearTimeout(settle); clearTimeout(deadline); }
  function check() {
    clearTimeout(settle);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? null;
    if (!pageMetadataMatches(path!, window.location.pathname, canonical, document.title)) return;
    settle = setTimeout(() => {
      if (expired || !pageMetadataMatches(path!, window.location.pathname, document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? null, document.title)) return;
      if (lastPageviewPath !== path) {
        lastPageviewPath = path;
        dispatchMeasurement("page_view", path!, { page_title: document.title });
        const store = load(); store.pageviews[path!] = (store.pageviews[path!] ?? 0) + 1; save(store);
      }
      stop();
    }, 100);
  }
  observer.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true });
  check();
  return stop;
}

export function getAnalytics(): AnalyticsStore { return load(); }
export function clearAnalytics() { try { localStorage.removeItem(STORE_KEY); } catch {} }
export function getGTMContainerId(): string { return GTM_CONTAINER_ID; }
export function injectGTM() {
  if (typeof document === "undefined" || document.getElementById("gtm-script")) return;
  const path = publicMeasurementPath(window.location.pathname);
  if (!path) return;
  getAcquisitionContext();
  // Local previews can inspect queued events without sending test traffic to GA4.
  if (!["counselo-legal.com", "www.counselo-legal.com"].includes(window.location.hostname)) return;
  const win = window as unknown as { dataLayer?: object[] };
  win.dataLayer ??= [];
  // The staged Google tag uses these sanitized values before it loads.
  // Published v4 ignores them until the separate account cutover.
  win.dataLayer.push(measurementBootstrap(path, document.referrer, window.location.search));
  win.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "gtm-script"; script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
}
