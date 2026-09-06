import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { containsPublishingPlaceholder, hasQualityBilingualBlogContent } from "@workspace/api-zod";
import { repairPublicBlogPost } from "./public-blog-repairs.js";

test("repairs the verified contract-interpretation placeholder article", () => {
  const post = repairPublicBlogPost({
    slug: "contract-interpretation-syrian-courts",
    titleEn: "Contract Interpretation Before Syrian Courts",
    titleAr: "تفسير العقود أمام القضاء السوري",
    excerptEn: "How Syrian courts interpret disputed contract wording.",
    excerptAr: "كيف تفسر المحاكم السورية عبارات العقد المتنازع عليها.",
    seoTitleEn: "Contract Interpretation Before Syrian Courts",
    seoTitleAr: "تفسير العقود أمام القضاء السوري",
    seoDescriptionEn: "A practical review of contract interpretation rules, evidence, good faith and commercial custom before Syrian courts.",
    seoDescriptionAr: "مراجعة عملية لقواعد تفسير العقود والأدلة وحسن النية والعرف التجاري أمام المحاكم السورية.",
    bodyEn: "English legal text. English legal text.",
    bodyAr: "مقال عربي مستقل وكامل عن قواعد تفسير العقود أمام القضاء السوري والأدلة التي يعتمدها القاضي.",
    contentEn: [],
    contentAr: [],
  });
  assert.equal(containsPublishingPlaceholder(post.bodyEn), false);
  assert.match(post.bodyEn ?? "", /parties’ true common intention/);
  assert.equal(post.seoTitleEn, "Contract Interpretation Before Syrian Courts");
  assert.equal(hasQualityBilingualBlogContent(post), true);
});

test("disambiguates the verified duplicate Arabic contractual-liability title", () => {
  const post = repairPublicBlogPost({
    slug: "contractual-liability-in-commercial-transactions",
    seoTitleAr: "المسؤولية العقدية في المعاملات التجارية",
  });
  assert.equal(post.seoTitleAr, "المسؤولية العقدية في المعاملات التجارية: دليل عملي");
});

test("gives the duplicate liability article its own bilingual evidence intent without changing its URL", () => {
  const input = JSON.parse(readFileSync(new URL("./__fixtures__/legacy-liability-article.json", import.meta.url), "utf8"));
  const fixed = repairPublicBlogPost(input);
  assert.equal(fixed.slug, input.slug);
  assert.match(fixed.titleEn, /Proving Commercial Contract Breach/);
  assert.match(fixed.titleAr, /إثبات الإخلال/);
  assert.match(fixed.bodyEn, /not automatically net lost profit/);
  assert.match(fixed.bodyAr, /ليس تلقائياً صافي الربح الفائت/);
  assert.match(fixed.bodyEn, /href="\/sa\/contact"/);
  assert.match(fixed.bodyAr, /href="\/sa\/ar\/contact"/);
  assert.deepEqual(repairPublicBlogPost(fixed), fixed);
});

test("full-body legacy repairs preserve later substantive CMS edits", () => {
  for (const slug of ["almswwlyh-alaqdyh-fy-almaamlat-altjaryh", "contract-interpretation-syrian-courts"]) {
    const post = { slug, titleEn: "Author’s revised guide", titleAr: "الدليل المعدل", bodyEn: "<p>A later substantive article written in the CMS.</p>", bodyAr: "<p>مقال لاحق مستقل كتبه المؤلف في نظام النشر.</p>" };
    const fixed = repairPublicBlogPost(post);
    assert.equal(fixed.bodyEn, post.bodyEn);
    assert.equal(fixed.bodyAr, post.bodyAr);
    assert.equal(fixed.titleEn, post.titleEn);
  }
});

test("bibliography links become crawlable without nesting an existing anchor", () => {
  const url = "https://www.wipo.int/wipolex/ar/legislation/details/10917";
  const result = repairPublicBlogPost({ slug: "unrelated-bibliography", bodyEn: `<p>Source: ${url}</p><p><a href="${url}">${url}</a></p>` });
  assert.equal((result.bodyEn.match(/<a href=/g) ?? []).length, 2);
  assert.doesNotMatch(result.bodyEn, /<a[^>]*><a/);
  assert.deepEqual(repairPublicBlogPost(result), result);
});


test("summary repairs complete legacy snippets and preserve later field edits", () => {
  const input = { slug: "Penalty-clause-in-saudi", excerptEn: "A penalty clause is not merely an additional contract term.", excerptAr: "الشرط الجزائي ليس مجرد بند إضافي في العقد" };
  const fixed = repairPublicBlogPost(input);
  assert.match(fixed.excerptEn, /judicial adjustment/);
  assert.match(fixed.excerptAr, /التعديل القضائي/);
  assert.deepEqual(repairPublicBlogPost(fixed), fixed);
  const authored = { ...input, excerptEn: "An updated author-written summary.", excerptAr: "ملخص جديد كتبه المؤلف." };
  assert.equal(repairPublicBlogPost(authored).excerptEn, authored.excerptEn);
  assert.equal(repairPublicBlogPost(authored).excerptAr, authored.excerptAr);
  const title = { slug: "contractual-liability-in-commercial-transactions", seoTitleAr: "عنوان جديد كتبه المؤلف" };
  assert.equal(repairPublicBlogPost(title).seoTitleAr, title.seoTitleAr);
});
