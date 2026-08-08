const STORE_KEY = "counselo_analytics";
const GTM_ID_KEY = "counselo_gtm_container_id";
export const DEFAULT_GTM_CONTAINER_ID = "GTM-WZ6SW99X";

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

function routeDimensions(path: string): Record<string, string> {
  const match = path.match(/^\/(sa|syr|uae)(\/ar)?(?:\/|$)/);
  if (match) return { region: match[1], language: match[2] ? "ar" : "en" };
  return { region: "shared", language: path === "/ar" || path.startsWith("/ar/") ? "ar" : "en" };
}

function pushToDataLayer(obj: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(obj);
}

export function trackEvent(event: string, page: string, details: AnalyticsDetails = {}) {
  const store = load();
  const day = today();

  if (event === "whatsapp_click") store.whatsapp_clicks++;
  if (event === "consultation_click") store.consultation_clicks++;
  if (event === "phone_click") store.phone_clicks++;
  if (event === "email_click") store.email_clicks++;

  const cleanDetails = Object.fromEntries(
    Object.entries({ ...routeDimensions(page), ...details }).filter(
      (entry): entry is [string, string | number | boolean] => entry[1] !== undefined,
    ),
  );
  store.events.push({ event, page, ts: Date.now(), ...(Object.keys(cleanDetails).length ? { details: cleanDetails } : {}) });
  store.pageviews[page] = (store.pageviews[page] ?? 0);

  if (!store.daily[day]) store.daily[day] = { whatsapp: 0, consultation: 0 };
  if (event === "whatsapp_click") store.daily[day].whatsapp++;
  if (event === "consultation_click") store.daily[day].consultation++;

  save(store);

  pushToDataLayer({ event, page_path: page, event_category: "engagement", event_label: page, ...cleanDetails });
}

export function trackPageview(path: string) {
  const store = load();
  store.pageviews[path] = (store.pageviews[path] ?? 0) + 1;
  save(store);

  pushToDataLayer({ event: "page_view", page_path: path, ...routeDimensions(path) });
}

export function getAnalytics(): AnalyticsStore {
  return load();
}

export function clearAnalytics() {
  localStorage.removeItem(STORE_KEY);
}

export function getGTMContainerId(): string {
  try { return localStorage.getItem(GTM_ID_KEY) || DEFAULT_GTM_CONTAINER_ID; } catch { return DEFAULT_GTM_CONTAINER_ID; }
}

export function setGTMContainerId(id: string) {
  if (id) {
    localStorage.setItem(GTM_ID_KEY, id);
    injectGTM(id);
  } else {
    localStorage.removeItem(GTM_ID_KEY);
  }
}

export function injectGTM(containerId: string) {
  if (!containerId || typeof document === "undefined") return;
  if (document.getElementById("gtm-script")) return;

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`;
  document.head.appendChild(script);
}
