import assert from "node:assert/strict";
import test from "node:test";
import { currentBrandText, currentBrandHtml, currentBrandRecord } from "@workspace/api-zod/browser";

test("branding is idempotent and preserves stable contact and URL identifiers", () => {
  const text = "CounselO and كاونسلو: https://counselo-legal.com/CounselO mailto:CounselO@example.com @CounselOLegal";
  const result = currentBrandText(text);
  assert.equal(result, "CounselO Legal and كاونسلو للاستشارات القانونية: https://counselo-legal.com/CounselO mailto:CounselO@example.com @CounselOLegal");
  assert.equal(currentBrandText(result), result);
  assert.equal(currentBrandText("CounselO legal article. CounselO."), "CounselO Legal article. CounselO Legal.");
  assert.equal(currentBrandText("CounselO Legal. كاونسلو للاستشارات القانونية"), "CounselO Legal. كاونسلو للاستشارات القانونية");
});

test("published HTML retains attributes, quotations and code", () => {
  assert.equal(currentBrandHtml('<p id="CounselO"><a href="/CounselO">CounselO</a></p><blockquote>CounselO</blockquote><code>كاونسلو</code>'), '<p id="CounselO"><a href="/CounselO">CounselO Legal</a></p><blockquote>CounselO</blockquote><code>كاونسلو</code>');
});

test("stored records update presentation without changing evidence or originals", () => {
  const record = { slug: "CounselO", titleEn: "About CounselO", bodyAr: "كاونسلو", fileName: "CounselO.pdf", testimonials: ["CounselO"], contentEn: [{ heading: "CounselO", body: "CounselO" }] };
  const result = currentBrandRecord(record);
  assert.equal(record.titleEn, "About CounselO");
  assert.equal(result.titleEn, "About CounselO Legal");
  assert.equal(result.bodyAr, "كاونسلو للاستشارات القانونية");
  assert.equal(result.slug, record.slug);
  assert.equal(result.fileName, record.fileName);
  assert.deepEqual(result.testimonials, record.testimonials);
  assert.equal(result.contentEn[0].heading, "CounselO Legal");
});
