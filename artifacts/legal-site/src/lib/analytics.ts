const STORE_KEY = "counselo_analytics";
const GTM_CONTAINER_ID = "GTM-WZ6SW99X";

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

function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push(data);
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

  // Push to GTM dataLayer — GTM forwards this to GA4 via configured tags
  pushToDataLayer({ event, event_category: "engagement", event_label: page, page_path: page, ...cleanDetails });
}

export function trackPageview(path: string) {
  const store = load();
  store.pageviews[path] = (store.pageviews[path] ?? 0) + 1;
  save(store);

  // SPA navigation: GTM's All-Pages trigger doesn't fire on client-side route
  // changes, so we push explicitly. Configure a GTM trigger on this event to
  // fire the GA4 Configuration tag / Page View event tag.
  pushToDataLayer({
    event: "page_view",
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
    page_title: typeof document !== "undefined" ? document.title : "",
  });
}

export function getAnalytics(): AnalyticsStore {
  return load();
}

export function clearAnalytics() {
  localStorage.removeItem(STORE_KEY);
}

export function getGTMContainerId(): string {
  return GTM_CONTAINER_ID;
}

export function injectGTM() {
  if (typeof document === "undefined") return;
  if (document.getElementById("gtm-script")) return; // already injected
  const win = window as unknown as { dataLayer?: object[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const f = document.getElementsByTagName("script")[0];
  const j = document.createElement("script");
  j.id = "gtm-script";
  j.async = true;
  j.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  f.parentNode?.insertBefore(j, f);
}
