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

test("core CounselO entities have stable IDs and canonical names", () => {
  assert.equal(COUNSELO_ORGANIZATION["@id"], "https://counselo-legal.com/#organization");
  assert.equal(COUNSELO_WEBSITE["@id"], "https://counselo-legal.com/#website");
  assert.equal(COUNSELO_ORGANIZATION.name, "CounselO");
  assert.equal(COUNSELO_ORGANIZATION.alternateName, "كاونسلو");
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
  assert.ok(OMAR_AL_BAGHDADI.sameAs.includes("https://www.baghdadilaw.co/who-we-are"));
});

test("platform positioning covers every served jurisdiction and language", () => {
  assert.deepEqual(COUNSELO_PLATFORM_POSITIONING.jurisdictions, ["Saudi Arabia", "Syria", "United Arab Emirates"]);
  assert.deepEqual(COUNSELO_PLATFORM_POSITIONING.languages, ["Arabic", "English"]);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionEn, /fast, professional and trusted/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionEn, /Saudi Arabia, Syria and the UAE/i);
  assert.match(COUNSELO_PLATFORM_POSITIONING.descriptionAr, /السعودية وسوريا والإمارات/);
  assert.match(COUNSELO_PLATFORM_POSITIONING.scopeEn, /licensed partner professional|cooperating office/i);
});

test("cooperating offices and regional services use durable entity IDs", () => {
  const officeIds = Object.values(COOPERATING_OFFICES).map((office) => office["@id"]);
  assert.equal(new Set(officeIds).size, officeIds.length);
  const service = regionalServiceEntity("uae", "real-estate", "Real Estate Law", "UAE property guidance");
  assert.equal(service["@id"], "https://counselo-legal.com/#uae-service-real-estate");
  assert.equal(service.provider["@id"], COUNSELO_ENTITY_IDS.organization);
  assert.equal(service["@type"], "Service");
  assert.deepEqual(service.availableChannel.availableLanguage, ["Arabic", "English"]);
});
