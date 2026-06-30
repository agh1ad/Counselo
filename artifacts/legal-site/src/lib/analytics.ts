const STORE_KEY = "counselo_analytics";
const GA_ID_KEY = "counselo_ga_measurement_id";

export interface EventLog {
  event: string;
  page: string;
  ts: number;
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

export function trackEvent(event: "whatsapp_click" | "consultation_click" | "phone_click" | "email_click", page: string) {
  const store = load();
  const day = today();

  if (event === "whatsapp_click") store.whatsapp_clicks++;
  if (event === "consultation_click") store.consultation_clicks++;
  if (event === "phone_click") store.phone_clicks++;
  if (event === "email_click") store.email_clicks++;

  store.events.push({ event, page, ts: Date.now() });
  store.pageviews[page] = (store.pageviews[page] ?? 0);

  if (!store.daily[day]) store.daily[day] = { whatsapp: 0, consultation: 0 };
  if (event === "whatsapp_click") store.daily[day].whatsapp++;
  if (event === "consultation_click") store.daily[day].consultation++;

  save(store);

  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: unknown }).gtag === "function") {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag("event", event, { event_category: "engagement", event_label: page });
  }
}

export function trackPageview(path: string) {
  const store = load();
  store.pageviews[path] = (store.pageviews[path] ?? 0) + 1;
  save(store);

  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: unknown }).gtag === "function") {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag("event", "page_view", { page_path: path });
  }
}

export function getAnalytics(): AnalyticsStore {
  return load();
}

export function clearAnalytics() {
  localStorage.removeItem(STORE_KEY);
}

export function getGAMeasurementId(): string {
  return localStorage.getItem(GA_ID_KEY) ?? "";
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
  const existingId = document.getElementById("ga-script");
  if (existingId) existingId.remove();
  const existingInline = document.getElementById("ga-inline");
  if (existingInline) existingInline.remove();

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.id = "ga-inline";
  inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:false});`;
  document.head.appendChild(inline);
}
