import assert from "node:assert/strict";
import test from "node:test";
import { extractResponsesOutputText } from "./openai-response.js";

test("extracts text from a raw Responses API output array", () => {
  assert.equal(
    extractResponsesOutputText({
      output: [
        { type: "reasoning", content: [] },
        {
          type: "message",
          content: [
            { type: "output_text", text: '{"relatedServiceSlugs":["contracts"]}' },
          ],
        },
      ],
    }),
    '{"relatedServiceSlugs":["contracts"]}',
  );
});

test("accepts the SDK output_text convenience property", () => {
  assert.equal(
    extractResponsesOutputText({ output_text: '{"ok":true}' }),
    '{"ok":true}',
  );
});

test("returns null when a response contains no assistant text", () => {
  assert.equal(
    extractResponsesOutputText({ output: [{ type: "reasoning", content: [] }] }),
    null,
  );
});
