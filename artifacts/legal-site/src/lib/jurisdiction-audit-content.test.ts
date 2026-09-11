import assert from "node:assert/strict";
import test from "node:test";
import { jurisdictionEditorialContent, jurisdictionAdviceForContaminationCheck } from "./jurisdiction-audit-content";

test("country navigation does not masquerade as legal advice for another jurisdiction", () => {
  const html = '<main><h1>Syrian legal consultation</h1><nav aria-label="Jurisdictions"><a href="/sa">Saudi Arabia</a><a href="/sa/ar">السعودية</a></nav><p>Syrian law applies to this assessment.</p></main>';
  const content = jurisdictionEditorialContent(html);
  assert.doesNotMatch(content, /Saudi|السعودية/);
  assert.match(content, /Syrian law applies/);
});

test("Saudi legal content outside navigation remains detectable on a Syrian page", () => {
  const html = '<nav><a href="/sa">Saudi Arabia</a></nav><section><h2>Saudi employment law</h2><p>Apply Saudi rules in Syria. تطبق القواعد السعودية.</p></section>';
  const content = jurisdictionEditorialContent(html);
  assert.match(content, /Saudi employment law/);
  assert.match(content, /Apply Saudi rules in Syria/);
  assert.match(content, /السعودية/);
});


test("explicit country contrasts do not hide an actual wrong-jurisdiction instruction", () => {
  const text = "Saudi anti-concealment rules should not be imported into the analysis. Apply Saudi rules in Syria. ولا تنقل إليه نظام مكافحة التستر السعودي. تطبق القواعد السعودية.";
  const checked = jurisdictionAdviceForContaminationCheck(text);
  assert.doesNotMatch(checked, /should not be imported|ولا تنقل/);
  assert.match(checked, /Apply Saudi rules in Syria/);
  assert.match(checked, /تطبق القواعد السعودية/);
});

test("a Saudi intake number is distinct from Saudi legal advice", () => {
  const checked = jurisdictionAdviceForContaminationCheck("Regional intake phone & WhatsApp (Saudi number). Saudi employment rules.");
  assert.doesNotMatch(checked, /Saudi number/);
  assert.match(checked, /Saudi employment rules/);
});
