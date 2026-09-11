import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { homepageContent } from "../components/home/homepage-content";

const source = readFileSync(resolve(process.cwd(), "src/components/home/global-homepage.tsx"), "utf8");
const regional = readFileSync(resolve(process.cwd(), "src/pages/home.tsx"), "utf8");

test("global homepage retains the entity hub and both locale entry points", () => {
  for (const name of ["region-picker", "ar-region-picker"]) {
    const wrapper = readFileSync(resolve(process.cwd(), `src/pages/${name}.tsx`), "utf8");
    assert.match(wrapper, /GlobalHomepage/);
    if (name.startsWith("ar-")) assert.match(wrapper, /isArabic/);
  }
  for (const required of ["COUNSELO_ORGANIZATION", "COUNSELO_WEBSITE", "LatestContentCarousels", "our-work", "COUNSELO_LEGAL_MATTERS_CLAIM", "ExperienceMethodologyNote"]) assert.ok(source.includes(required), required);
  assert.match(source, /PracticeDirectory/);
});

test("both languages answer the same core questions with complete content", () => {
  assert.deepEqual(Object.keys(homepageContent.en), Object.keys(homepageContent.ar));
  for (const c of Object.values(homepageContent)) {
    assert.equal(c.countryNames.length, 3);
    assert.equal(c.countryDetails.length, 3);
    assert.equal(c.steps.length, 4);
    assert.equal(c.questions.length, 8);
    assert.ok(c.intro.includes("Omar") || c.intro.includes("عمر"));
  }
});

test("homepage narrative follows DOM order without CSS section reordering", () => {
  const ids = ["about", "founder", "services", "jurisdictions", "process", "why-counselo", "faq", "contact"];
  let previous = -1;
  for (const id of ids) {
    const current = source.indexOf(`id="${id}"`);
    assert.ok(current > previous, `Section ${id} must follow the previous section`);
    previous = current;
  }
  assert.match(source, /CONSULTATION_PRODUCTS\.map/);
  assert.match(source, /e\.practices\.map/);
  assert.match(source, /c\.reasons\.map/);
  assert.doesNotMatch(regional, /\border-(?:\d|\[)/);
  assert.ok(regional.indexOf('id="about-founder-heading"') < regional.indexOf('id="practice-areas-heading"'));
  assert.ok(regional.indexOf('<PracticeDirectory') < regional.indexOf('id="how-it-works-heading"'));
  assert.doesNotMatch(regional, /SaudiHomepage/);
});
