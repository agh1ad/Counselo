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
  assert.match(COUNSELO_ORGANIZATION.description, /online legal platform/i);
  assert.deepEqual(COUNSELO_ORGANIZATION.areaServed.map((country) => country.name), COUNSELO_PLATFORM_POSITIONING.jurisdictions);
  assert.deepEqual(COUNSELO_ORGANIZATION.contactPoint.availableLanguage, ["Arabic", "English"]);
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

test("platform positioning covers every served jurisdiction and language", () => {
  assert.deepEqual(COUNSELO_PLATFORM_POSITIONING.jurisdictions, ["Saudi Arabia", "Syria", "United Arab Emirates"]);
  assert.deepEqual(COUNSELO_PLATFORM_POSITIONING.languages, ["Arabic", "English"]);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionEn, /comprehensive legal consultation/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionEn, /Saudi Arabia, Syria and the UAE/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionAr, /السعودية وسوريا والإمارات/);
  assert.match(COUNSELO_PLATFORM_POSITIONING.scopeEn, /licensed partner professional|cooperating office/i);
});

test("service catalogue separates platform work from jurisdiction-specific partner representation", () => {
  const catalogue = COUNSELO_ORGANIZATION.hasOfferCatalog;
  assert.equal(catalogue["@type"], "OfferCatalog");
  const services = catalogue.itemListElement.map(offer => {
    assert.equal(offer["@type"], "Offer");
    assert.equal(offer.itemOffered["@type"], "Service");
    return offer.itemOffered;
  });
  assert.equal(new Set(services.map(service => service["@id"])).size, services.length);
  const representation = services.filter(service => "broker" in service);
  assert.equal(representation.length, 3);
  for (const service of representation) {
    assert.equal(service.broker["@id"], COUNSELO_ENTITY_IDS.organization);
    assert.ok(!Array.isArray(service.areaServed), "A representation service must identify its own jurisdiction");
    const providers = "provider" in service ? service.provider ?? [] : [];
    assert.ok(Array.isArray(providers));
    assert.ok(providers.every(provider => provider["@id"] !== COUNSELO_ENTITY_IDS.organization));
    assert.ok(service.url.endsWith("/about"));
  }
  const saudi = representation.find(service => service["@id"].endsWith("#sa-partner-representation"));
  assert.deepEqual(saudi?.provider, [{ "@id": COUNSELO_ENTITY_IDS.saudiOffice }]);
  const uae = representation.find(service => service["@id"].endsWith("#uae-partner-representation"));
  assert.ok(uae);
  assert.equal("provider" in uae, false, "Do not invent an unidentified local provider");
  const graph = JSON.stringify(COUNSELO_ORGANIZATION);
  assert.doesNotMatch(graph, /"(?:aggregateRating|ratingValue|reviewCount|hasCredential|hasCertification)"/);
});

test("cooperating offices and regional services use durable entity IDs", () => {
  const officeIds = Object.values(COOPERATING_OFFICES).map((office) => office["@id"]);
  assert.equal(new Set(officeIds).size, officeIds.length);
  for (const office of Object.values(COOPERATING_OFFICES)) {
    assert.equal("identifier" in office, false, "Public office schema must omit licence identifiers");
  }
  const service = regionalServiceEntity("uae", "real-estate", "Real Estate Law", "UAE property guidance");
  assert.equal(service["@id"], "https://counselo-legal.com/#uae-service-real-estate");
  assert.equal(service.provider["@id"], COUNSELO_ENTITY_IDS.organization);
  assert.equal(service["@type"], "Service");
  assert.deepEqual(service.availableChannel.availableLanguage, ["Arabic", "English"]);
});
