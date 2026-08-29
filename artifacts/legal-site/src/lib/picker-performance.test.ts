import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const projectRoot = resolve(import.meta.dirname, "../..");

function source(path: string): string {
  return readFileSync(resolve(projectRoot, path), "utf8");
}

test("picker pages keep stable geometry and responsive critical assets", () => {
  const indexHtml = source("index.html");
  const prerender = source("src/scripts/prerender.ts");
  const englishPicker = source("src/pages/region-picker.tsx");
  const arabicPicker = source("src/pages/ar-region-picker.tsx");
  const css = source("src/index.css");

  assert.doesNotMatch(indexHtml, /contain-intrinsic-size:\s*auto\s+900px/);

  assert.match(prerender, /counselo-region-logo-193\.webp 193w/);
  assert.match(prerender, /counselo-region-logo-310\.webp 310w/);
  assert.doesNotMatch(prerender, /PICKER_FONT_PRELOADS|as=\\?"font\\?"/);

  for (const picker of [englishPicker, arabicPicker]) {
    assert.match(picker, /counselo-region-logo-310\.webp/);
    assert.doesNotMatch(picker, /counselo-region-logo-386\.webp/);
    assert.match(picker, /data-number=\{number\}/);
    assert.match(picker, /region-card-number--dark/);
    assert.match(picker, /region-card-number--light/);
  }

  assert.match(css, /\.region-card-number::before\s*\{[^}]*content:\s*attr\(data-number\)/s);
});
