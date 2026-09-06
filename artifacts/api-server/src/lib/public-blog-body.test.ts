import assert from "node:assert/strict";
import test from "node:test";
import { renderPublicBlogBody } from "./public-blog-body.js";

test("published rich article text is visible, sanitized and language-specific", () => {
  const post = { bodyEn: '<h1>Section</h1><p>Actual article <strong>evidence</strong></p><script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">bad link</a>', bodyAr: "<p>النص العربي الكامل</p>" };
  const en = renderPublicBlogBody(post, "en");
  assert.ok(en.includes("Actual article <strong>evidence</strong>"));
  assert.ok(en.includes("<h2>Section</h2>"));
  assert.doesNotMatch(en, /<script|onerror|javascript:/i);
  assert.equal(renderPublicBlogBody(post, "ar"), "<p>النص العربي الكامل</p>");
  assert.equal(renderPublicBlogBody({ bodyEn: "<ul><li>Evidence</li></ul>" }, "en"), "<ul><li>Evidence</li></ul>");
});
test("plain text and legacy article sections are visible without inventing a translation", () => {
  assert.ok(renderPublicBlogBody({ bodyEn: "Evidence < alleged loss\nSecond line" }, "en").includes("Evidence &lt; alleged loss<br />Second line"));
  assert.equal(renderPublicBlogBody({ bodyEn: "English only" }, "ar"), "");
  assert.equal(renderPublicBlogBody({ contentAr: [{ heading: "المستندات", body: "وقائع وإثبات" }] }, "ar"), "<h2>المستندات</h2><p>وقائع وإثبات</p>");
});
