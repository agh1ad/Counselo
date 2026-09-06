import assert from "node:assert/strict";
import test from "node:test";
import { SERVICE_INTAKE_CONTENT, UAE_RELATED_SERVICES } from "./service-intake-content";
import { getServicesForRegion } from "@workspace/api-zod";
import { getLegalProblemPages } from "./legal-problem-pages";
import { UAE_SERVICES } from "../data/uae-legal-services";
import { buildUaeServicePageContent } from "../data/uae-service-page-content";

test("every regional service has bilingual subject-specific intake and valid related UAE routes", () => {
  let count = 0;
  for (const region of ["sa", "syr", "uae"] as const) {
    const services = getServicesForRegion(region);
    for (const service of services) {
      count++;
      const intake = SERVICE_INTAKE_CONTENT[service.slug];
      assert.ok(intake, `${region}/${service.slug}`);
      assert.match(intake.summary.ar, /[\u0600-\u06ff]/);
      assert.ok(intake.documents.en.length >= 4 && intake.documents.ar.length === intake.documents.en.length);
      if (region === "uae") {
        assert.ok(UAE_RELATED_SERVICES[service.slug]?.length);
        for (const related of UAE_RELATED_SERVICES[service.slug]) {
          assert.notEqual(related, service.slug);
          assert.ok(services.some(candidate => candidate.slug === related), related);
        }
      }
    }
  }
  assert.equal(count, 59);
});

test("criminal intake does not reuse corporate documents or promise arbitration jurisdiction", () => {
  const service = UAE_SERVICES.find(item => item.slug === "criminal-investigations")!;
  const content = buildUaeServicePageContent(service);
  assert.match(content.documents.en.join(" "), /summons/);
  assert.doesNotMatch(content.documents.en.join(" "), /Trade licence|constitutional documents/);
  assert.doesNotMatch(content.faqs.en[1].a, /valid jurisdiction or arbitration agreement/);
});

test("Dubai rental title identifies the RDC while its established URL is retained", () => {
  const pages = getLegalProblemPages("uae", "real-estate-construction");
  const page = pages.find(item => item.slug === "dubai-tenancy-and-rera-rental-dispute");
  assert.ok(page);
  assert.match(page.titleEn, /Rental Disputes Center/);
  assert.match(page.titleAr, /مركز فض المنازعات الإيجارية/);
});
