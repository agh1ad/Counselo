import test from "node:test";
import assert from "node:assert/strict";
process.env.DATABASE_URL ||= "postgres://fixture:fixture@localhost/fixture";
const { ai } = await import("../legal-updates/worker.js");
test("uses Replit billing when both providers exist and never falls back after failure", async () => {
  const names = ["AI_INTEGRATIONS_OPENAI_API_KEY", "AI_INTEGRATIONS_OPENAI_BASE_URL", "OPENAI_API_KEY", "LEGAL_UPDATES_MODEL"];
  const saved = names.map(name => process.env[name]);
  const original = globalThis.fetch;
  try {
    process.env.AI_INTEGRATIONS_OPENAI_API_KEY = "fixture-integration";
    process.env.AI_INTEGRATIONS_OPENAI_BASE_URL = "https://integration.example/v1";
    process.env.OPENAI_API_KEY = "fixture-direct";
    process.env.LEGAL_UPDATES_MODEL = "gpt-5.6-luna";
    let calls = 0;
    globalThis.fetch = (async (url, init) => {
      calls++;
      assert.equal(url, "https://integration.example/v1/responses");
      assert.equal((init!.headers as Record<string,string>).Authorization, "Bearer fixture-integration");
      assert.equal(JSON.parse(String(init!.body)).model, "gpt-5.6-luna");
      return new Response("{}", {status:429});
    }) as typeof fetch;
    await assert.rejects(() => ai("fixture", {}, {}), /HTTP 429/);
    assert.equal(calls,1);
    delete process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
    await assert.rejects(() => ai("fixture", {}, {}), /incomplete/);
    assert.equal(calls,1);
  } finally {
    globalThis.fetch = original;
    names.forEach((name,i) => { if(saved[i] === undefined) delete process.env[name]; else process.env[name] = saved[i]; });
  }
});
