import test from "node:test";
import assert from "node:assert/strict";
import { assignArticleProvenance } from "@workspace/api-zod";
import { BAGHDADI_LAW_PROFILE_URL, BAGHDADI_LAW_CANONICAL_ENTITY_ID } from "@workspace/api-zod";
const titleEn = "Hidden Defects in Contracts and Their Legal Effect";
const titleAr = "العيوب الخفية في العقود وأثرها القانوني";
test("retains original author and separates publication for original and corrected bilingual credit", () => {
  for (const input of [
    { titleEn, bodyEn: "<p>Prepared by Al-Baghdadi Law Firm and published on baghdadilaw.co</p>" },
    { titleAr, bodyAr: "<p>من اعداد البغدادي للمحاماة والمقال منشور على الموقع baghdadilaw.co</p>" },
    { titleEn, bodyEn: "Original credit in the supplied article: Al-Baghdadi Law Firm, with publication attributed to baghdadilaw.co." },
    { titleAr, bodyAr: "نسبة التأليف الواردة في المقال المقدم: البغدادي للمحاماة، مع نسبة النشر إلى baghdadilaw.co." },
  ]) {
    const p = assignArticleProvenance(input);
    assert.equal(p.primaryAuthorName, "Al-Baghdadi Law Firm");
    assert.equal(p.primaryAuthorNameAr, "البغدادي للمحاماة");
    assert.equal(p.primaryAuthorUrl, BAGHDADI_LAW_PROFILE_URL);
    assert.equal(p.primaryAuthorEntityId, BAGHDADI_LAW_CANONICAL_ENTITY_ID);
    assert.match(p.contentMethodology, /CounselO publishes an editorially adapted version/);
  }
});
test("title and attribution are both required; unrelated articles keep their author", () => {
  for (const input of [
    { titleEn, bodyEn: "No original credit supplied." },
    { titleEn: "Another article", bodyEn: "Prepared by Al-Baghdadi Law Firm and published on baghdadilaw.co" },
  ]) assert.equal(assignArticleProvenance(input).primaryAuthorName, "CounselO Legal Team");
});
