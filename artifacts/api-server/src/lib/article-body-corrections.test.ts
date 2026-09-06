import assert from "node:assert/strict";
import test from "node:test";
import { correctArticleBody } from "./article-body-corrections.js";

test("new enforcement legislation is not presented as operative merely because it was published", () => {
  const slug = "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy";
  const en = '<p><span>The modern Saudi Enforcement Law has also included <strong>registered notes</strong>.</span></p><p>Keep this independent explanation.</p>';
  const ar = '<p><span>كما أن نظام التنفيذ السعودي الحديث أدرج <strong>السندات</strong>.</span></p><p>فقرة مستقلة محفوظة.</p>';
  const fixedEn = correctArticleBody(slug, "en", en)!;
  const fixedAr = correctArticleBody(slug, "ar", ar)!;
  assert.match(fixedEn, /180 days after publication/);
  assert.match(fixedAr, /180 يوماً/);
  assert.match(fixedEn, /uqn\.gov\.sa/);
  assert.ok(fixedEn.endsWith("<p>Keep this independent explanation.</p>"));
  assert.ok(fixedAr.endsWith("<p>فقرة مستقلة محفوظة.</p>"));
  assert.equal(correctArticleBody(slug, "en", fixedEn), fixedEn);
  assert.equal(correctArticleBody("unrelated-post", "en", en), en);
});

test("sale-defect correction separates notice and filing and preserves original attribution", () => {
  const slug = "alaywb-alkhfyh-fy-alaqwd-wathrha-alqanwny";
  const source = '<p>Saudi law requires the injured party to report the defect immediately upon discovering it within a reasonable period.</p><p>Prepared by Al-Baghdadi Law Firm.</p>';
  const result = correctArticleBody(slug, "en", source)!;
  assert.match(result, /Article 340/);
  assert.match(result, /Article 344/);
  assert.match(result, /fraudulent concealment/);
  assert.ok(result.endsWith('<p>Prepared by Al-Baghdadi Law Firm.</p>'));
  assert.equal(correctArticleBody(slug, "en", result), result);
});

test("termination does not erase surviving obligations or conflate it with damages", () => {
  const slug = "fskh-alaqd-altjary-fy-alnzam-alsawdy";
  const en = correctArticleBody(slug, "en", '<p>The damage need not be substantial, but it must be genuine.</p><p>The aggrieved party is released from any additional obligations.</p>')!;
  const ar = correctArticleBody(slug, "ar", '<p>ليس شرطًا أن يكون الضرر كبيرًا، لكن يجب أن يكون حقيقيًا.</p><p>تحرير الطرف المتضرر من أي التزامات إضافية</p>')!;
  assert.match(en, /not make a compensable loss a separate universal prerequisite/);
  assert.match(en, /confidentiality obligations survive/);
  assert.match(ar, /لا تجعل الضرر القابل للتعويض شرطاً مستقلاً عاماً/);
  assert.match(ar, /يبقى شرط تسوية المنازعة وشرط السرية/);
});

test("digital evidence correction removes absolute tamper-proof and certified-system requirements", () => {
  const slug = "athbat-alaqwd-amam-alqda-alsawdy";
  const en = correctArticleBody(slug, "en", '<p>The Law requires that it be:</p><p>tamper-proof</p><p>issued by a trusted system</p>')!;
  const ar = correctArticleBody(slug, "ar", '<p>يشترط النظام أن يكون:</p><p>غير قابل للتلاعب</p><p>صادرًا من نظام موثوق</p>')!;
  assert.match(en, /no single requirement/);
  assert.doesNotMatch(en, /tamper-proof/);
  assert.match(ar, /ولا يُشترط صدور كل رسالة/);
  assert.doesNotMatch(ar, /غير قابل للتلاعب/);
});
