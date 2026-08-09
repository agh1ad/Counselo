import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const english = readFileSync(resolve(process.cwd(), "src/pages/region-picker.tsx"), "utf8");
const arabic = readFileSync(resolve(process.cwd(), "src/pages/ar-region-picker.tsx"), "utf8");

test("global homepage stays an entity and jurisdiction hub", () => {
  for (const source of [english, arabic]) {
    assert.match(source, /JURISDICTIONS|JURISDICTIONS|الاختصاص القضائي/);
    assert.match(source, /LatestContentCarousels/);
    assert.match(source, /our-work/);
    assert.match(source, /consult/i);
    assert.match(source, /COUNSELO_LEGAL_MATTERS/);
    assert.doesNotMatch(source, /href="\/sa\/services\/[a-z-]+/);
    assert.doesNotMatch(source, /href="\/syr\/services\/[a-z-]+/);
    assert.doesNotMatch(source, /href="\/uae\/services\/[a-z-]+/);
  }
});
