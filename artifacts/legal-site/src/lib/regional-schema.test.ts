import assert from "node:assert/strict";
import test from "node:test";
import { COUNSELO_ORGANIZATION, OMAR_AL_BAGHDADI } from "@workspace/api-zod";
import { localizeLegacySyriaSchema } from "./regional-schema.js";

test("Syria pages preserve global entities and visible cross-border FAQ answers inside graphs", () => {
  const faq = { "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Does a Saudi Arabia procedure apply in Syria?", acceptedAnswer: { "@type": "Answer", text: "Check Saudi Arabia and Syria separately." } }] };
  const input = { "@graph": [COUNSELO_ORGANIZATION, OMAR_AL_BAGHDADI, faq, { "@type": "WebPage", name: "Services in Saudi Arabia" }] };
  const result = localizeLegacySyriaSchema(input, text => text.replaceAll("Saudi Arabia", "Syria")) as typeof input;
  assert.deepEqual(result["@graph"].slice(0, 3), input["@graph"].slice(0, 3));
  assert.deepEqual(result["@graph"][3], { "@type": "WebPage", name: "Services in Syria" });
  assert.equal(input["@graph"][3].name, "Services in Saudi Arabia");
});
