import assert from "node:assert/strict";
import test from "node:test";
import type { AddressInfo } from "node:net";
import express from "express";

test("attribution HTTP routes enforce admin/origin boundaries and persist only an encrypted outcome update", async () => {
  // All database methods used below are replaced before any HTTP request. This
  // fixture has no real database, notification provider or external API access.
  process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/test";
  process.env.ADMIN_PASSWORD = "local-http-fixture-only";
  process.env.CONTACT_ENCRYPTION_KEY = "11".repeat(32);
  const { db, pool } = await import("@workspace/db");
  const { encryptContactPayload, decryptContactPayload } = await import("../lib/contact-crypto.js");
  const { parseContactInput } = await import("../lib/contact-input.js");
  const { prepareStoredContact } = await import("../lib/contact-attribution.js");
  const { default: router } = await import("./contact.js");
  const input = parseContactInput({ name: "Fixture Person", email: "fixture@example.com", phone: "+966550001234", message: "Private fixture narrative", service: "family-law", region: "sa", language: "ar", acquisition: { version: 1, landingPath: "/sa/ar/services/family-law", source: "google", medium: "organic" } });
  const stored = prepareStoredContact(input);
  let row = { id: 11, ...encryptContactPayload(stored) };
  let reads = 0;
  let writes = 0;
  const select = () => { reads++; return { from: () => ({ where: () => ({ limit: () => ({ then: (resolve: (value: unknown) => unknown) => Promise.resolve([row]).then(resolve), for: () => Promise.resolve([row]) }) }) }) }; };
  const selectMock = test.mock.method(db, "select", select as never);
  const transactionMock = test.mock.method(db, "transaction", (async (callback: (tx: unknown) => unknown) => callback({ select, update: () => ({ set: (value: typeof row) => ({ where: async () => { writes++; row = { ...row, ...value }; } }) }) })) as never);
  const queryMock = test.mock.method(pool, "query", (() => { throw new Error("Unexpected database access in HTTP fixture"); }) as never);
  const app = express(); app.use(express.json()); app.use("/api", router);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const url = `${origin}/api/admin/contact-submissions/CON-20260907-1234ABCD/attribution`;
  const auth = { authorization: "Bearer local-http-fixture-only" };
  try {
    for (const method of ["GET", "PATCH"]) {
      const result = await fetch(url, { method, ...(method === "PATCH" ? { headers: { "content-type": "application/json", origin }, body: JSON.stringify({ status: "qualified" }) } : {}) });
      assert.equal(result.status, 401);
    }
    assert.equal(reads, 0); assert.equal(writes, 0);
    const wrongOrigin = await fetch(url, { method: "PATCH", headers: { ...auth, "content-type": "application/json", origin: "https://example.net" }, body: JSON.stringify({ status: "qualified" }) });
    assert.equal(wrongOrigin.status, 403);
    const invalid = await fetch(url, { method: "PATCH", headers: { ...auth, "content-type": "application/json", origin }, body: JSON.stringify({ status: "invented" }) });
    assert.equal(invalid.status, 400); assert.equal(reads, 0); assert.equal(writes, 0);
    const get = await fetch(url, { headers: auth });
    assert.equal(get.status, 200);
    const before = await get.json() as { leadId: string; acquisition: { source: string } };
    assert.equal(before.leadId, stored.leadId); assert.equal(before.acquisition.source, "google");
    assert.doesNotMatch(JSON.stringify(before), /Fixture Person|fixture@example|Private fixture|encryptedPayload|payloadIv/);
    const patch = await fetch(url, { method: "PATCH", headers: { ...auth, "content-type": "application/json", origin }, body: JSON.stringify({ status: "qualified", acquisition: { source: "forged" }, message: "Overwrite attempt" }) });
    assert.equal(patch.status, 200);
    assert.equal((await patch.json() as { progress: { status: string } }).progress.status, "qualified");
    const after = decryptContactPayload<typeof stored>(row);
    assert.equal(after.message, stored.message); assert.equal(after.email, stored.email);
    assert.equal(after.leadId, stored.leadId); assert.deepEqual(after.acquisition, stored.acquisition);
    assert.equal(after.leadProgress?.status, "qualified"); assert.equal(writes, 1);
    assert.equal(queryMock.mock.callCount(), 0);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    selectMock.mock.restore(); transactionMock.mock.restore(); queryMock.mock.restore(); await pool.end();
  }
});
