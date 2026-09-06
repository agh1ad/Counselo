import assert from "node:assert/strict";
import test from "node:test";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { LEGAL_PROBLEM_PAGES } from "./legal-problem-pages.js";
import { matterTopic, SERVICE_TOPICS } from "./matter-topic-routing.js";
import { serviceTopicFaq } from "./service-topic-faqs.js";

test("every served service and retained matter has explicit subject guidance", () => {
  for (const region of ["sa", "syr", "uae"] as const) for (const service of getServicesForRegion(region)) {
    assert.ok(SERVICE_TOPICS[service.slug], `${region}/${service.slug}`);
    for (const ar of [false, true]) {
      const faq = serviceTopicFaq(service.slug, ar);
      assert.ok(faq.q.trim() && faq.a.trim());
    }
  }
  for (const page of LEGAL_PROBLEM_PAGES) {
    assert.equal(page.contentTopic, matterTopic(page.parentServiceSlug, page.titleEn));
    assert.doesNotMatch(page.atAGlance.en[0], /facts, documents and decision point specific/);
  }
  assert.throws(() => matterTopic("new-unmapped-service", "example"), /Missing explicit/);
});
test("service context prevents cross-domain word collisions", () => {
  for (const [service, title, expected] of [
    ["arbitration", "Arbitration clause review", "arbitration"],
    ["intellectual-property", "Trademark opposition and cancellation", "ip"],
    ["intellectual-property", "Patent and licensing matters", "ip"],
    ["criminal-law", "Breach-of-trust complaint or defence", "criminal"],
    ["banking-finance", "Personal guarantee enforcement", "banking"],
    ["enforcement", "Bank-account and salary seizure dispute", "enforcement"],
    ["family-law", "Inheritance and family settlements", "estate"],
    ["tax-zakat", "VAT refund and registration dispute", "tax"],
    ["medical-malpractice", "Medical-record access dispute", "medical"],
    ["real-estate", "Sale and purchase contract disputes", "property"],
    ["business-law", "Company formation and registration", "company"],
  ]) assert.equal(matterTopic(service, title), expected, title);
});
