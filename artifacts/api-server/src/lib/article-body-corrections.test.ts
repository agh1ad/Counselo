import assert from "node:assert/strict";
import test from "node:test";
import { correctArticleBody } from "./article-body-corrections.js";
import { sanitizeRichText } from "./blog-input.js";

test("editorial source additions remain singular after public sanitization and repeated reads", () => {
  const slugs = [
    "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh",
    "altwqya-ala-byad",
    "hdwd-alymyn-alhasmh-fy-alathbat-almdny-swry",
    "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh",
    "alfrq-byn-alfskh-waltawyd-fy-alaqwd-altjaryh",
  ];
  for (const slug of slugs) for (const lang of ["en", "ar"] as const) {
    const original = lang === "en" ? "<p>Preserve this article body.</p>" : "<p>احفظ متن المقال الأصلي.</p>";
    const first = sanitizeRichText(correctArticleBody(slug, lang, original)!);
    const second = sanitizeRichText(correctArticleBody(slug, lang, first)!);
    const third = sanitizeRichText(correctArticleBody(slug, lang, second)!);
    assert.equal(second, first, `${slug}/${lang}: repair must survive sanitization`);
    assert.equal(third, first, `${slug}/${lang}: repeated public read must be stable`);
    assert.ok(first.includes(original));
    assert.notEqual(first, original, `${slug}/${lang}: fixture must exercise an addition`);
  }
});

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

test("remaining categorical claims are corrected without rewriting unrelated passages", () => {
  const cases = [
    ["Penalty-clause-in-saudi", "en", "The amount must be fixed or ascertainable; otherwise, the clause is considered ambiguous and unenforceable.", "requires interpretation"],
    ["Penalty-clause-in-saudi", "ar", "يجب أن يكون المبلغ محددًا أو قابلًا للتحديد، وإلا اعتبر الشرط غامضًا وغير نافذ.", "يتطلب غموض العبارة تفسيرها"],
    ["altwsyat-alamlyh-lsyaghh-aqd-qwy", "en", "This provision resolves any disagreement regarding jurisdiction.", "mandatory jurisdiction"],
    ["altwsyat-alamlyh-lsyaghh-aqd-qwy", "ar", "هذا البند يحسم أي خلاف حول الاختصاص.", "قواعد الاختصاص الآمرة"],
    ["commercial-supply-contracts-in-saudi", "en", "Include a liquidated damages clause", "where suitable"],
    ["commercial-supply-contracts-in-saudi", "ar", "تضمين الشرط الجزائي", "حيث يناسب"],
    ["performance-of-contracts-in-good-faith-under-syrian-law", "en", "Accordingly, observing good faith from the negotiation stage until performance is complete is an essential safeguard.", "separate legal basis"],
    ["performance-of-contracts-in-good-faith-under-syrian-law", "ar", "ومن ثم، فإن مراعاة حسن النية منذ مرحلة التفاوض وحتى اكتمال التنفيذ تمثل ضمانة أساسية.", "سند قانوني مستقل"],
  ] as const;
  for (const [slug, lang, original, qualification] of cases) {
    const input = `<p><span>${original}</span></p><p>Independent passage.</p>`;
    const fixed = correctArticleBody(slug, lang, input)!;
    assert.ok(fixed.includes(qualification), `${slug}/${lang}`);
    assert.ok(!fixed.includes(original));
    assert.ok(fixed.endsWith('<p>Independent passage.</p>'));
    assert.equal(correctArticleBody(slug, lang, fixed), fixed);
  }
});

test("arbitration citation removes a second query delimiter without losing the decision identifier", () => {
  const input = '<p><a href="https://www.uqn.gov.sa/details?p=27309?utm_source=chatgpt.com">Decision</a></p>';
  const fixed = correctArticleBody("mta-yfqd-shrt-althkym-athrh-alamly-fy-alnzaa", "en", input)!;
  assert.ok(fixed.includes('href="https://www.uqn.gov.sa/details?p=27309"'));
  assert.ok(!fixed.includes('utm_source'));
});

test("reconsideration answers preserve filing and acceptance distinctions through public sanitization", () => {
  const slug = "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh";
  for (const lang of ["en", "ar"] as const) {
    const fixed = sanitizeRichText(correctArticleBody(slug, lang, '<p>Existing case commentary.</p>')!);
    assert.equal((fixed.match(/<h3>/g) ?? []).length, 16);
    assert.ok(fixed.includes(lang === "en" ? "Editable Saudi reconsideration petition outline" : "نموذج قابل للتعديل لصحيفة التماس إعادة النظر في السعودية"));
    assert.ok(fixed.includes('Article 202') || fixed.includes('المادة 202'));
    assert.ok(fixed.includes('Article 58') || fixed.includes('المادة 58'));
    assert.ok(fixed.includes('p=23463'));
    assert.ok(fixed.startsWith('<p>Existing case commentary.</p>'));
    assert.equal(sanitizeRichText(correctArticleBody(slug, lang, fixed)!), fixed);
  }
});
