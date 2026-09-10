import assert from "node:assert/strict";
import test from "node:test";
import { saudiTermsOutsideJurisdictionBoundaries } from "./jurisdiction-copy-check.js";

test("explicit Syrian boundaries retain their meaning without hiding Saudi-law leakage", () => {
  assert.deepEqual(saudiTermsOutsideJurisdictionBoundaries("a label used in Saudi anti-concealment law cannot simply be imported into a Syrian file."), []);
  assert.deepEqual(saudiTermsOutsideJurisdictionBoundaries("فلا ينقل وصف التستر الوارد في النظام السعودي آلياً إلى ملف سوري."), []);
  assert.deepEqual(saudiTermsOutsideJurisdictionBoundaries("a label used in Saudi anti-concealment law can simply be imported into a Syrian file."), ["Saudi"]);
  assert.deepEqual(saudiTermsOutsideJurisdictionBoundaries("ينقل وصف التستر الوارد في النظام السعودي آلياً إلى ملف سوري."), ["السعودي"]);
  assert.deepEqual(saudiTermsOutsideJurisdictionBoundaries("a label used in Saudi anti-concealment law cannot simply be imported into a Syrian file. Apply Saudi Arabia rules through ZATCA."), ["Saudi Arabia", "ZATCA"]);
});
