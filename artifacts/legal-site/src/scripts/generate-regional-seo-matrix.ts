import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getRegionalSeoMatrix, getRegionalSeoMatrixSummary } from "../lib/regional-seo-matrix.js";

const output = resolve(process.cwd(), "../../docs/regional-seo-keyword-content-matrix.json");
mkdirSync(resolve(output, ".."), { recursive: true });
writeFileSync(
  output,
  `${JSON.stringify({
    schemaVersion: 2,
    purpose: "Canonical regional pages plus controlled long-tail keyword variants for live CounselO jurisdictions.",
    policy: {
      indexOnlyWhen: "The page is jurisdiction-specific, materially useful, source-backed where law or procedure is discussed, and has a clear related consultation path.",
      languages: ["en", "ar"],
      liveRegions: ["sa", "syr", "uae"],
    },
    summary: getRegionalSeoMatrixSummary(),
    rows: getRegionalSeoMatrix(),
  }, null, 2)}\n`,
  "utf8",
);
console.log(`[regional-seo] wrote ${output}`);
