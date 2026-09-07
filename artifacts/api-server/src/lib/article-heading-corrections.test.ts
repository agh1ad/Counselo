import assert from "node:assert/strict";
import test from "node:test";
import { correctArticleHeadings } from "./article-heading-corrections.js";
import { sanitizeRichText } from "./blog-input.js";

test("exact section promotion preserves inline links, words and unrelated emphasis", () => {
  const slug = "Penalty-clause-in-saudi";
  const input = '<p class="section"><strong>First: The Nature and Importance of <a href="/services">Penalty Clauses</a> in Commercial Contracts.</strong></p><p><strong>Keep this ordinary emphasis.</strong></p>';
  const output = correctArticleHeadings(slug, "en", input)!;
  assert.equal(output, input.replace('<p class="section">', '<h2 class="section">').replace('</strong></p>', '</strong></h2>'));
  assert.equal(correctArticleHeadings(slug, "en", output), output);
  assert.equal(correctArticleHeadings("other-article", "en", input), input);
  assert.equal(correctArticleHeadings(slug, "ar", input), input);
});

test("Arabic subordinate sections remain subordinate and survive sanitization", () => {
  const slug = "almswwlyh-alaqdyh-fy-alqanwn-alswry";
  const input = '<p>متى تقوم المسؤولية العقدية؟</p><p><span>أولاً: وجود عقد صحيح.</span></p><p>فقرة تفسيرية محفوظة.</p>';
  const first = sanitizeRichText(correctArticleHeadings(slug, "ar", input)!);
  assert.match(first, /<h2>متى تقوم المسؤولية العقدية؟<\/h2>/);
  assert.match(first, /<h3><span>أولاً: وجود عقد صحيح\.<\/span><\/h3>/);
  assert.ok(first.endsWith('<p>فقرة تفسيرية محفوظة.</p>'));
  assert.equal(sanitizeRichText(correctArticleHeadings(slug, "ar", first)!), first);
});

test("matching handles entity encoding but does not promote expanded paragraphs", () => {
  const slug = "altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha";
  const label = "Second: The worker&#39;s rights when wages are delayed.";
  assert.equal(correctArticleHeadings(slug, "en", `<p>${label}</p>`), `<h2>${label}</h2>`);
  const expanded = `<p>${label} This paragraph also contains prose.</p>`;
  assert.equal(correctArticleHeadings(slug, "en", expanded), expanded);
  assert.equal(correctArticleHeadings(slug, "en", null), null);
  assert.equal(correctArticleHeadings(slug, "en", undefined), undefined);
});
