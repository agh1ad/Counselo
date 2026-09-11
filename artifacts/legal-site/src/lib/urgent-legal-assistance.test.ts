import assert from "node:assert/strict";
import test from "node:test";
import { getPublicRouteInventory, buildHreflangLinks, getServicesForRegion, isServiceValidForRegion, getCrmRoute } from "@workspace/api-zod/browser";
import { urgentPath, urgentCopy, urgentContactLinks, URGENT_SLUG } from "./urgent-legal-assistance";
import { getLegalProblemPages } from "./legal-problem-pages";

test("urgent assistance has eight real reciprocal language routes and regional intake routing", () => {
  const inventory = new Set(getPublicRouteInventory());
  const routes = [urgentPath(false), urgentPath(true)];
  for (const region of ["sa", "syr", "uae"] as const) {
    const service = getServicesForRegion(region).find(s => s.slug === URGENT_SLUG)!;
    assert.equal(service.kind, "priority-intake");
    assert.ok(isServiceValidForRegion(region, URGENT_SLUG));
    assert.equal(getCrmRoute(region, service.leadCategory), `counselo-${region}-urgent`);
    // Urgent intake spans existing practices, and must not generate duplicate procedural pages.
    assert.deepEqual(getLegalProblemPages(region, URGENT_SLUG), []);
    routes.push(urgentPath(false, region), urgentPath(true, region));
  }
  for (const route of routes) {
    assert.ok(inventory.has(route), route);
    const alternates = buildHreflangLinks(route);
    assert.equal(alternates.length, 9);
    assert.deepEqual(alternates, buildHreflangLinks(routes[0]));
    for (const alternate of alternates) assert.ok(inventory.has(new URL(alternate.split("|")[1]).pathname));
  }
});

test("contact drafts retain deadline, time zone and document fields in both languages", () => {
  for (const ar of [false, true]) {
    const c = urgentCopy[ar ? "ar" : "en"];
    const links = urgentContactLinks(ar, ar ? "الإمارات" : "UAE");
    const whatsapp = new URL(links.whatsapp);
    const email = new URL(links.email);
    assert.equal(whatsapp.hostname, "wa.me");
    assert.equal(whatsapp.pathname, "/966594850247");
    assert.equal(email.pathname, "info@counselo-legal.com");
    assert.equal(email.searchParams.get("subject"), c.title);
    assert.equal(email.searchParams.get("body"), whatsapp.searchParams.get("text"));
    assert.ok(whatsapp.searchParams.get("text")?.includes(c.template));
    assert.match(c.template, ar ? /المنطقة الزمنية/ : /time zone/);
    assert.match(c.template, ar ? /المستندات/ : /documents/);
    assert.equal(c.services.length, 3);
    assert.equal(c.steps.length, 5);
    assert.match(c.timing, ar ? /٣ ساعات/ : /3-hour/);
    assert.match(c.availability, ar ? /لا نستقبل طلبات مستعجلة جديدة يوم الجمعة/ : /No new urgent requests on Friday/);
    assert.match(c.boundary, ar ? /لا تنشئ هذه الخدمة تمثيلاً/ : /does not establish court representation/);
    assert.match(c.timing, ar ? /قبل الدفع/ : /before payment/);
  }
});
