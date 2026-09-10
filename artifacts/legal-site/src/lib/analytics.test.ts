import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dispatchMeasurement, measurementParameters, pageMetadataMatches, trackPageview, trackEvent, MEASUREMENT_EVENTS } from "./analytics";
import { measurementBootstrap } from "./measurement-bootstrap";
import { deriveAcquisitionContext, sanitizeAcquisitionContext } from "@workspace/api-zod/browser";

test("the release GTM container maps every application event and has one pageview/WhatsApp owner", () => {
  const config = JSON.parse(readFileSync(new URL("../../../../docs/measurement/gtm-counselo-measurement-import.json", import.meta.url), "utf8")).containerVersion;
  const parameters = (entry: { parameter: { key: string; value: string }[] }) => Object.fromEntries(entry.parameter.map((p) => [p.key, p.value]));
  const events = config.tag.filter((tag: { type: string }) => tag.type === "gaawe");
  assert.equal(events.length, 1, "separate legacy load/WhatsApp tags must not remain active");
  assert.equal(parameters(events[0]).eventName, "{{CounselO - name}}");
  const trigger = config.trigger.find((item: { triggerId: string }) => events[0].firingTriggerId.includes(item.triggerId));
  assert.equal(trigger.type, "CUSTOM_EVENT");
  assert.equal(parameters(trigger.customEventFilter[0]).arg1, "counselo_event");
  const allowlist = new RegExp(parameters(trigger.filter[0]).arg1);
  for (const event of MEASUREMENT_EVENTS) assert.equal(allowlist.test(event), true, `${event} must have an actual GA4 transport mapping`);
  assert.equal(allowlist.test("private_form_value"), false);
  const googleTag = config.tag.find((tag: { type: string }) => tag.type === "googtag");
  const settings = googleTag.parameter.find((p: { key: string }) => p.key === "configSettingsTable").list;
  const sendViews = settings.map((p: { map: { key: string; value: string }[] }) => Object.fromEntries(p.map.map((item) => [item.key, item.value]))).find((row: { parameter: string }) => row.parameter === "send_page_view");
  assert.equal(sendViews.parameterValue, "false", "manual settled pageviews require automatic initial pageviews off");
});

test("public event transport forwards confirmed leads and CTA dimensions while excluding client input", () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const win = { location: { pathname: "/sa/ar/contact", search: "?email=client@example.com" }, dataLayer: [] as unknown[] };
  Object.defineProperty(globalThis, "window", { configurable: true, value: win });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { referrer: "https://www.google.com/search?q=private+matter" } });
  try {
    const leadId = "29e12dc1-c838-4da4-b99a-af4c8d97f971";
    assert.equal(dispatchMeasurement("generate_lead", "/sa/ar/contact?email=client@example.com", { lead_id: leadId, form_name: "consultation", service: "family-law", click_text: "Client Name", name: "Client Name", message: "Confidential narrative", email: "client@example.com", attachment_count: 2 }), true);
    assert.deepEqual(win.dataLayer[0], { counselo: null });
    const envelope = win.dataLayer[1] as { event: string; counselo: Record<string, unknown> };
    assert.equal(envelope.event, "counselo_event");
    assert.equal(envelope.counselo.name, "generate_lead");
    assert.equal(envelope.counselo.lead_id, leadId);
    assert.equal(envelope.counselo.language, "ar");
    assert.equal(envelope.counselo.acquisition_source, "google");
    assert.doesNotMatch(JSON.stringify(envelope), /client@example|Client Name|Confidential|private|search\?/);
    dispatchMeasurement("consultation_click", "/sa/ar/services/family-law", { conversion_position: "service-hero" });
    assert.deepEqual(win.dataLayer[2], { counselo: null });
    assert.equal((win.dataLayer[3] as typeof envelope).counselo.lead_id, undefined, "lead IDs must not carry into the next event");
    assert.equal(dispatchMeasurement("generate_lead", "/counselo-admin", { page_title: "Private draft" }), false);
    assert.equal(dispatchMeasurement("unapproved" as never, "/sa", {}), false);
  } finally {
    Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
    Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
  }
});

test("URL measurement removes WhatsApp messages, email addresses, phone numbers and query data", () => {
  for (const [link, expected] of [
    ["https://wa.me/966594850247?text=Confidential", "https://wa.me/"],
    ["mailto:client@example.com?subject=Confidential", "mailto:"],
    ["tel:+966550001234", "tel:"],
    ["/sa/contact?message=Confidential", "https://counselo-legal.com/sa/contact"],
  ]) assert.equal(measurementParameters("/sa", { link_url: link })?.link_url, expected);
  assert.equal(measurementParameters("/api/contact"), undefined);
});

test("acquisition context preserves coarse source and landing page without arbitrary campaign or referrer content", () => {
  const context = deriveAcquisitionContext("/sa/ar/services/family-law?name=Client", "https://chatgpt.com/c/private-thread", "?utm_source=chatgpt&utm_campaign=Client%20Name&utm_term=confidential");
  assert.deepEqual(context, { version: 1, landingPath: "/sa/ar/services/family-law", source: "chatgpt", medium: "ai_referral" });
  assert.equal(sanitizeAcquisitionContext({ ...context, source: "client@example.com" }), undefined);
  assert.equal(deriveAcquisitionContext("/counselo-admin", "", ""), undefined);
});

test("Google bootstrap preserves known attribution without raw referrer or campaign text", () => {
  const organic = measurementBootstrap("/sa/ar?name=Private", "https://www.google.com/search?q=Client+Name", "?email=private@example.com");
  assert.equal(organic.counselo_page_referrer, "https://www.google.com/");
  assert.equal(organic.counselo_campaign_source, undefined, "organic referrers must not be relabeled as manual campaigns");
  const paid = measurementBootstrap("/sa/ar", "https://private-client.example.com/matter", "?utm_source=google&utm_medium=cpc&utm_campaign=Client+Name&utm_term=confidential");
  assert.equal(paid.counselo_page_referrer, "");
  assert.equal(paid.counselo_campaign_source, "google");
  assert.equal(paid.counselo_campaign_medium, "cpc");
  assert.doesNotMatch(JSON.stringify([organic, paid]), /Private|Client|private|confidential|email|\?/);
});

test("damaged browser-only counters cannot prevent CTA transport", () => {
  const previous = { window: globalThis.window, storage: globalThis.localStorage };
  const win = { dataLayer: [] as unknown[] };
  Object.defineProperty(globalThis, "window", { configurable: true, value: win });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => '{"events":null,"daily":null}', setItem: () => { throw new Error("Quota exceeded"); } } });
  try {
    trackEvent("consultation_click", "/sa/ar", { cta: "consultation" });
    assert.equal((win.dataLayer[1] as { counselo: { name: string } }).counselo.name, "consultation_click");
  } finally {
    Object.defineProperty(globalThis, "window", { configurable: true, value: previous.window });
    Object.defineProperty(globalThis, "localStorage", { configurable: true, value: previous.storage });
  }
});

test("a delayed SPA page view waits for destination metadata, is cancelled on abandonment and emits once", async () => {
  const previous = { window: globalThis.window, document: globalThis.document, observer: globalThis.MutationObserver };
  const win = { location: { pathname: "/sa/ar/contact", search: "" }, dataLayer: [] as unknown[] };
  let canonical = "https://counselo-legal.com/sa/ar/services/family-law";
  const doc = { title: "Old service title", referrer: "", head: {}, querySelector: () => ({ href: canonical }) };
  let notify = () => {};
  class Observer { constructor(callback: () => void) { notify = callback; } observe() {} disconnect() {} }
  Object.defineProperty(globalThis, "window", { configurable: true, value: win });
  Object.defineProperty(globalThis, "document", { configurable: true, value: doc });
  Object.defineProperty(globalThis, "MutationObserver", { configurable: true, value: Observer });
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const cleanup = trackPageview("/sa/ar/contact");
  try {
    await wait(120);
    assert.equal(win.dataLayer.length, 0, "old route metadata must not be transmitted");
    canonical = "https://counselo-legal.com/sa/ar/contact"; doc.title = "اطلب استشارة قانونية في السعودية"; notify();
    await wait(120);
    const events = win.dataLayer.filter((entry) => (entry as { event?: string }).event === "counselo_event") as { counselo: Record<string, unknown> }[];
    assert.equal(events.length, 1);
    assert.equal(events[0].counselo.page_title, doc.title);
    assert.equal(events[0].counselo.page_path, "/sa/ar/contact");
    const repeated = trackPageview("/sa/ar/contact"); await wait(120); repeated();
    assert.equal(win.dataLayer.length, 2, "effect replay must not duplicate pageviews");
    win.location.pathname = "/sa/ar/about";
    const abandoned = trackPageview("/sa/ar/about"); abandoned();
    canonical = "https://counselo-legal.com/sa/ar/about"; doc.title = "About"; notify(); await wait(120);
    assert.equal(win.dataLayer.length, 2, "abandoned navigation must not emit a later pageview");
    assert.equal(pageMetadataMatches("/sa", "/syr", "https://counselo-legal.com/sa", "Title"), false);
  } finally {
    cleanup();
    Object.defineProperty(globalThis, "window", { configurable: true, value: previous.window });
    Object.defineProperty(globalThis, "document", { configurable: true, value: previous.document });
    Object.defineProperty(globalThis, "MutationObserver", { configurable: true, value: previous.observer });
  }
});
