import assert from "node:assert/strict";
import test from "node:test";
import { Worker } from "node:worker_threads";
import { publicMeasurementPath } from "@workspace/api-zod/browser";

test("measurement paths retain the existing public path and privacy contract", () => {
  for (const [input, expected] of [
    ["/", "/"], ["/ar/", "/ar"], ["/sa/ar/services/family-law?client=private#contact", "/sa/ar/services/family-law"],
    ["/api", undefined], ["/api/work/case", undefined], ["/counselo-admin", undefined],
    ["/counselo-admin/drafts", undefined], ["//", undefined], ["/ar//", undefined],
    ["/a//b", undefined], ["/A", undefined], ["/a b", undefined], ["/a%2fb", undefined],
    ["https://counselo-legal.com/sa", undefined], ["/" + "a".repeat(250), undefined],
  ] as const) assert.equal(publicMeasurementPath(input), expected, input);
  assert.equal(publicMeasurementPath(null), undefined);
});

test("long PDF, text, encoded and malformed links cannot block the click path validator", async () => {
  const paths = [
    "/documents/msandh-kawnslw-fy-qdyh-aabrh-llhdwd.pdf",
    "/documents/msandh-kawnslw-fy-qdyh-aabrh-llhdwd.txt",
    "/documents/msandh-kawnslw-fy-qdyh-aabrh-llhdwd.pdf?download=1",
    ...[".pdf", ".txt", ".", "%2Epdf", "%2Fprivate", "!", " ", "//"].map((suffix) => "/documents/" + "a".repeat(220) + suffix),
  ];
  // A regression must fail within a deadline rather than freeze the test runner
  // just as the previous nested quantifiers froze the browser's main thread.
  const worker = new Worker(`const { parentPort } = require("node:worker_threads");
    const validate = (${publicMeasurementPath.toString()});
    parentPort.postMessage(${JSON.stringify(paths)}.map(validate));`, { eval: true });
  let deadline: ReturnType<typeof setTimeout> | undefined;
  try {
    const results = await new Promise<Array<string | undefined>>((resolve, reject) => {
      deadline = setTimeout(() => reject(new Error("Document path validation blocked beyond its deadline")), 2_000);
      worker.once("message", resolve);
      worker.once("error", reject);
    });
    assert.deepEqual(results, paths.map(() => undefined));
  } finally {
    clearTimeout(deadline);
    await worker.terminate();
  }
});
