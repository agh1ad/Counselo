import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { SAUDI_REVIEW_WORKSHEETS } from "../lib/saudi-review-worksheets";
import { renderSaudiWorksheetText } from "../lib/saudi-worksheet-text";

const destination = new URL("../../public/resources/saudi-review/", import.meta.url);
mkdirSync(fileURLToPath(destination), { recursive: true });
for (const service of Object.keys(SAUDI_REVIEW_WORKSHEETS)) {
  for (const language of ["ar", "en"] as const) {
    writeFileSync(new URL(`${service}-${language}.txt`, destination), renderSaudiWorksheetText(service, language)!);
  }
}
console.log(`Generated ${Object.keys(SAUDI_REVIEW_WORKSHEETS).length * 2} Saudi preparation worksheets`);
