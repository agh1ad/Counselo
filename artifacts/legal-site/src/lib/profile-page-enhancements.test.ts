import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const aboutSource = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("CounselO about pages expose an organization ProfilePage", () => {
  assert.match(aboutSource, /"@type": \["ProfilePage", "WebPage"\]/);
  assert.match(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.organization \}/);
  assert.doesNotMatch(aboutSource, /"dateModified"/);
  assert.match(aboutSource, /Object\.values\(COOPERATING_OFFICES\)\.map/);
  assert.doesNotMatch(aboutSource, /"mainEntity": \{ "@id": COUNSELO_ENTITY_IDS\.omar \}/);
});
