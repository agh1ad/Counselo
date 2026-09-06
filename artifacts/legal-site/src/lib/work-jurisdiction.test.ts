import assert from "node:assert/strict";
import test from "node:test";
import { workJurisdictionRegion } from "./work-jurisdiction.js";

test("work links use explicit bilingual jurisdiction, including published spelling variants", () => {
  assert.equal(workJurisdictionRegion("", "السعوديه"), "sa");
  assert.equal(workJurisdictionRegion("Saudi Arabia", "السعودية"), "sa");
  assert.equal(workJurisdictionRegion("", "سوريا"), "syr");
  assert.equal(workJurisdictionRegion("UAE", "الإمارات"), "uae");
});
test("unknown, cross-border and conflicting jurisdictions never default to Saudi law", () => {
  for (const [en, ar] of [["", ""], ["Cross-Border", "عابر للحدود"], ["Saudi Arabia and Syria", "السعودية و سوريا"], ["Saudi Arabia", "سوريا"], ["France", "فرنسا"]]) {
    assert.equal(workJurisdictionRegion(en, ar), undefined);
  }
});
