import assert from "node:assert/strict";
import test from "node:test";
import { correctArticleBody } from "./article-body-corrections.js";
import { sanitizeRichText } from "./blog-input.js";
import { ARTICLE_WORK_EVIDENCE } from "./article-work-evidence.js";

test("case-study links preserve locale and survive repeated sanitized public reads", () => {
  for (const [slug, evidence] of Object.entries(ARTICLE_WORK_EVIDENCE)) {
    for (const lang of ["en", "ar"] as const) {
      const source = lang === "en"
        ? "<p>The judgment was subsequently upheld on appeal.</p><p>Independent content.</p>"
        : "<p>ثم تأيد الحكم استئنافيًا.</p><p>محتوى مستقل.</p>";
      const first = sanitizeRichText(correctArticleBody(slug, lang, source)!);
      const repeated = sanitizeRichText(correctArticleBody(slug, lang, first)!);
      assert.equal(repeated, first);
      assert.ok(first.includes(`href="${lang === "ar" ? "/ar" : ""}/our-work/${evidence.slug}"`));
      if (slug === "mta-ysthq-alwsyt-altjary-kaml-amwlth") {
        assert.ok(first.includes(lang === "ar" ? "بحسب إفادة العميل" : "According to the client"));
      }
    }
  }
  assert.equal(correctArticleBody("unrelated-article", "en", "<p>Unchanged.</p>"), "<p>Unchanged.</p>");
});

test("the supplied Arabic drafting note is removed even when nested formatting surrounds it", () => {
  const slug = "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa";
  const source = '<p>محتوى مستقل عن المطالبة.</p><p><span style="color:rgb(0, 108, 53)"><strong>للمراجعه يوجد على أعمالنا (كيف ساهمت كاونسلو في تخفيض المطالبة من 500 الف رايال الى 227 الف ريال)</strong></span></p>';
  const first = sanitizeRichText(correctArticleBody(slug, "ar", source)!);
  assert.doesNotMatch(first, /للمراجعه|رايال/);
  assert.match(first, /محتوى مستقل عن المطالبة/);
  assert.match(first, /500,000 ريال.*227,000 ريال/);
  assert.equal(sanitizeRichText(correctArticleBody(slug, "ar", first)!), first);
});
