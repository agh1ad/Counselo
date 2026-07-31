const STORE_KEY = "counselo_analytics";
const GA_ID_KEY = "counselo_ga_measurement_id";
const DEFAULT_GA_MEASUREMENT_ID = "G-1M9ZZX7VT6";

let configuredMeasurementId = "";

export interface EventLog {
  event: string;
  page: string;
  ts: number;
  details?: Record<string, string | number | boolean>;
}

export interface AnalyticsStore {
  whatsapp_clicks: number;
  consultation_clicks: number;
  phone_clicks: number;
  email_clicks: number;
  events: EventLog[];
  pageviews: Record<string, number>;
  daily: Record<string, { whatsapp: number; consultation: number }>;
}

function load(): AnalyticsStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) as AnalyticsStore;
  } catch {}
  return { whatsapp_clicks: 0, consultation_clicks: 0, phone_clicks: 0, email_clicks: 0, events: [], pageviews: {}, daily: {} };
}

function save(store: AnalyticsStore) {
  try {
    store.events = store.events.slice(-200);
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {}
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

type AnalyticsDetails = Record<string, string | number | boolean | undefined>;

function sendToGA(event: string, details: AnalyticsDetails) {
  if (typeof window === "undefined") return;
  const measurementId = getGAMeasurementId();
  if (!measurementId) return;

  // Configure the destination before queuing an event. React runs child effects
  // before parent effects, so the initial page_view can otherwise precede GAInit.
  injectGA(measurementId);
  const gaWindow = window as unknown as {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  };
  gaWindow.dataLayer = gaWindow.dataLayer || [];
  gaWindow.gtag = gaWindow.gtag || function (...args: unknown[]) {
    gaWindow.dataLayer?.push(args);
  };
  gaWindow.gtag("event", event, { ...details, send_to: measurementId });
}

export function trackEvent(event: string, page: string, details: AnalyticsDetails = {}) {
  const store = load();
  const day = today();

  if (event === "whatsapp_click") store.whatsapp_clicks++;
  if (event === "consultation_click") store.consultation_clicks++;
  if (event === "phone_click") store.phone_clicks++;
  if (event === "email_click") store.email_clicks++;

  const cleanDetails = Object.fromEntries(
    Object.entries(details).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined),
  );
  store.events.push({ event, page, ts: Date.now(), ...(Object.keys(cleanDetails).length ? { details: cleanDetails } : {}) });
  store.pageviews[page] = (store.pageviews[page] ?? 0);

  if (!store.daily[day]) store.daily[day] = { whatsapp: 0, consultation: 0 };
  if (event === "whatsapp_click") store.daily[day].whatsapp++;
  if (event === "consultation_click") store.daily[day].consultation++;

  save(store);

  sendToGA(event, { event_category: "engagement", event_label: page, page_path: page, ...details });
}

export function trackPageview(path: string) {
  const store = load();
  store.pageviews[path] = (store.pageviews[path] ?? 0) + 1;
  save(store);

  sendToGA("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function getAnalytics(): AnalyticsStore {
  return load();
}

export function clearAnalytics() {
  localStorage.removeItem(STORE_KEY);
}

export function getGAMeasurementId(): string {
  if (typeof window === "undefined") return DEFAULT_GA_MEASUREMENT_ID;
  return localStorage.getItem(GA_ID_KEY) || DEFAULT_GA_MEASUREMENT_ID;
}

export function setGAMeasurementId(id: string) {
  if (id) {
    localStorage.setItem(GA_ID_KEY, id);
    injectGA(id);
  } else {
    localStorage.removeItem(GA_ID_KEY);
  }
}

export function injectGA(measurementId: string) {
  if (!measurementId || typeof document === "undefined") return;
  const gaWindow = window as unknown as { dataLayer?: unknown[][]; gtag?: (...args: unknown[]) => void };
  gaWindow.dataLayer = gaWindow.dataLayer || [];
  gaWindow.gtag = gaWindow.gtag || function (...args: unknown[]) {
    gaWindow.dataLayer?.push(args);
  };

  const existingId = document.getElementById("ga-script");
  if (existingId?.getAttribute("data-measurement-id") !== measurementId) {
    if (existingId) existingId.remove();
    const script = document.createElement("script");
    script.id = "ga-script";
    script.setAttribute("data-measurement-id", measurementId);
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
  if (configuredMeasurementId !== measurementId) {
    gaWindow.gtag("js", new Date());
    gaWindow.gtag("config", measurementId, { send_page_view: false });
    configuredMeasurementId = measurementId;
  }
}
