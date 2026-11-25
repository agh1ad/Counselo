import assert from "node:assert/strict";
import test from "node:test";
import {
  COUNSELO_ENTITY_IDS,
  COUNSELO_ORGANIZATION,
  COUNSELO_WEBSITE,
  OMAR_AL_BAGHDADI,
  COOPERATING_OFFICES,
  regionalServiceEntity,
  COUNSELO_PLATFORM_POSITIONING,
} from "@workspace/api-zod";

test("core CounselO Legal entities have stable IDs and canonical names", () => {
  assert.equal(COUNSELO_ORGANIZATION["@id"], "https://counselo-legal.com/#organization");
  assert.equal(COUNSELO_WEBSITE["@id"], "https://counselo-legal.com/#website");
  assert.equal(COUNSELO_ORGANIZATION.name, "CounselO Legal");
  assert.deepEqual(COUNSELO_ORGANIZATION.alternateName, ["كاونسلو للاستشارات القانونية", "CounselO", "كاونسلو"]);
  assert.match(COUNSELO_ORGANIZATION.description, /integrated legal services through one team/i);
  assert.deepEqual(COUNSELO_ORGANIZATION.areaServed.map((country) => country.name), COUNSELO_PLATFORM_POSITIONING.jurisdictions);
  assert.deepEqual(COUNSELO_ORGANIZATION.contactPoint.availableLanguage, ["Arabic", "English"]);
  assert.equal(COUNSELO_ORGANIZATION.contactPoint.email, "info@counselo-legal.com");
  assert.equal(COUNSELO_ORGANIZATION.telephone, COUNSELO_ORGANIZATION.contactPoint.telephone);
  assert.equal(COUNSELO_ORGANIZATION.email, COUNSELO_ORGANIZATION.contactPoint.email);
  assert.equal(COUNSELO_ORGANIZATION.contactPoint.url, "https://counselo-legal.com/#contact");
  assert.deepEqual(COUNSELO_ORGANIZATION.mainEntityOfPage.map(page => page["@id"]), [
    "https://counselo-legal.com/about#webpage", "https://counselo-legal.com/ar/about#webpage",
  ]);
  assert.equal(COUNSELO_ORGANIZATION.founder["@id"], COUNSELO_ENTITY_IDS.omar);
  assert.equal(OMAR_AL_BAGHDADI["@id"], "https://omarbaghdadi.com/#omar-al-baghdadi");
  assert.equal(OMAR_AL_BAGHDADI.name, "Omar Al-Baghdadi");
  assert.ok(OMAR_AL_BAGHDADI.alternateName.includes("Omar Riyad Al-Baghdadi"));
  assert.equal(OMAR_AL_BAGHDADI.url, "https://omarbaghdadi.com");
  assert.ok(OMAR_AL_BAGHDADI.worksFor.some((organization) => organization["@id"] === COUNSELO_ENTITY_IDS.organization));
  assert.ok(OMAR_AL_BAGHDADI.worksFor.some((organization) => organization["@id"] === "https://www.baghdadilaw.co/#legalservice"));
  assert.ok(OMAR_AL_BAGHDADI.sameAs.includes("https://omarbaghdadi.com"));
  assert.ok(!OMAR_AL_BAGHDADI.sameAs.includes("https://www.baghdadilaw.co/who-we-are"));
  assert.equal(OMAR_AL_BAGHDADI.subjectOf.url, "https://www.baghdadilaw.co/who-we-are");
});

test("team positioning covers every served jurisdiction and language", () => {
  assert.deepEqual(COUNSELO_PLATFORM_POSITIONING.jurisdictions, ["Saudi Arabia", "Syria", "United Arab Emirates"]);
  assert.deepEqual(COUNSELO_PLATFORM_POSITIONING.languages, ["Arabic", "English"]);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionEn, /consultation and contracts.*representation/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionEn, /Saudi Arabia, Syria and the UAE/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionAr, /السعودية وسوريا والإمارات/);
  assert.match(COUNSELO_PLATFORM_POSITIONING.scopeEn, /team comprises locally licensed lawyers and law offices/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.scopeAr, /فريقنا المكوّن من محامين ومكاتب مرخّصة محلياً/);
});

test("one CounselO provider covers consultation through representation in each jurisdiction", () => {
  const catalogue = COUNSELO_ORGANIZATION.hasOfferCatalog;
  assert.equal(catalogue["@type"], "OfferCatalog");
  const services = catalogue.itemListElement.map(offer => {
    assert.equal(offer["@type"], "Offer");
    assert.equal(offer.itemOffered["@type"], "Service");
    assert.equal(offer.itemOffered.provider["@id"], COUNSELO_ENTITY_IDS.organization);
    assert.equal("broker" in offer.itemOffered, false);
    return offer.itemOffered;
  });
  assert.equal(new Set(services.map(service => service["@id"])).size, services.length);
  const representation = services.filter(service => service["@id"].endsWith("-partner-representation"));
  assert.equal(representation.length, 3);
  for (const service of representation) {
    assert.ok(!Array.isArray(service.areaServed), "A representation service must identify its own jurisdiction");
    assert.match(service.description, /locally licensed team members/);
    assert.ok(service.url.endsWith("/about"));
  }
  const memberIds = COUNSELO_ORGANIZATION.member.map(member => member["@id"]);
  assert.deepEqual(new Set(memberIds), new Set(Object.values(COOPERATING_OFFICES).map(office => office["@id"])));
  const graph = JSON.stringify(COUNSELO_ORGANIZATION);
  assert.doesNotMatch(graph, /"(?:aggregateRating|ratingValue|reviewCount|hasCredential|hasCertification)"/);
});

test("team offices and regional services retain their own durable entity IDs", () => {
  const officeIds = Object.values(COOPERATING_OFFICES).map((office) => office["@id"]);
  assert.equal(new Set(officeIds).size, officeIds.length);
  for (const office of Object.values(COOPERATING_OFFICES)) {
    assert.equal("identifier" in office, false, "Public office schema must omit licence identifiers");
    assert.equal(office.memberOf["@id"], COUNSELO_ENTITY_IDS.organization);
    assert.notEqual(office["@id"], COUNSELO_ENTITY_IDS.organization);
  }
  const service = regionalServiceEntity("uae", "real-estate", "Real Estate Law", "UAE property guidance");
  assert.equal(service["@id"], "https://counselo-legal.com/#uae-service-real-estate");
  assert.equal(service.provider["@id"], COUNSELO_ENTITY_IDS.organization);
  assert.equal(service["@type"], "Service");
  assert.deepEqual(service.availableChannel.availableLanguage, ["Arabic", "English"]);
});
