import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import express from "express";

// Exercise the real HTTP handler with an isolated unique-reference store and
// notification spy. This fixture cannot reach a database or mail provider.
test("contact retries and concurrent submissions store and notify only once", async () => {
  const fixtures: Record<string, string> = {
    db: `
      export const state = { rows: [], notifications: 0, customerNotifications: 0, failNotification: false, failRelease: false, transactionLock: Promise.resolve() };
      export const contactSubmissionsTable = new Proxy({}, { get: (_, key) => key });
      export const db = {
        async transaction(run) {
          const previous=state.transactionLock;
          let release;
          state.transactionLock=new Promise(resolve=>{release=resolve;});
          await previous;
          try { return await run({ ...db, execute: async()=>{} }); } finally { release(); }
        },
        select(fields) {
          let predicate = () => true;
          const rows = () => fields?.total ? [{ total: state.rows.filter(predicate).length }] : state.rows.filter(predicate).map(row => fields ? Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, row[field]])) : { ...row });
          return { from() { return this; }, where(value) { predicate = value; return this; }, orderBy() { return this; }, limit() { const result=Promise.resolve(rows()); result.for=()=>result; return result; }, then(resolve) { return Promise.resolve(rows()).then(resolve); } };
        },
        insert() { let value; return { values(data) { value = data; return this; }, onConflictDoNothing() { return this; }, async returning() {
          await new Promise(resolve => setTimeout(resolve, 10));
          if (state.rows.some(row => row.reference === value.reference)) return [];
          const row = { ...value, id: state.rows.length + 1, createdAt: new Date(), nextAttemptAt: new Date(), notificationAttempts: 0, emailProviderId: null, customerEmailProviderId: null, processingAt: null };
          state.rows.push(row); return [{ id: row.id }];
        } }; },
        update() {
          let patch, predicate;
          const apply = () => {
            if(state.failNotification) throw new Error('Simulated notification database failure');
            if(state.failRelease && patch.processingAt === null) throw new Error('Simulated update failure after provider acceptance');
            const matching = state.rows.filter(predicate);
            for(const row of matching) Object.assign(row, patch);
            return matching.map(row => ({ ...row }));
          };
          return { set(value) { patch=value; return this; }, where(value) { predicate=value; return this; }, async returning() { return apply(); }, then(resolve,reject) { return Promise.resolve().then(apply).then(resolve,reject); } };
        },
      };`,
    drizzle: `export const eq=(key,value)=>row=>row[key]===value; export const gt=(key,value)=>row=>row[key]>value; export const gte=(key,value)=>row=>row[key]>=value; export const lt=(key,value)=>row=>row[key]<value; export const lte=(key,value)=>row=>row[key]<=value; export const isNull=key=>row=>row[key]==null; export const and=(...conditions)=>row=>conditions.every(fn=>fn(row)); export const or=(...conditions)=>row=>conditions.some(fn=>fn(row)); export const count=()=>true; export const desc=value=>value; export const asc=value=>value; export const sql=(strings,...values)=>({strings,values});`,
    providers: `
      import { state } from 'fixture:db';
      export class NotificationConfigurationError extends Error {}
      export const assertContactNotificationConfiguration=()=>{};
      const internal = new Set(), customer = new Set();
      export async function sendConsultationEmail(_input,reference) { if(!internal.has(reference)) { internal.add(reference); state.notifications++; } await new Promise(resolve=>setTimeout(resolve,30)); return { id: 'internal-'+reference, status:'sent' }; }
      export async function sendCustomerConfirmationEmail(_input,reference) { if(!customer.has(reference)) { customer.add(reference); state.customerNotifications++; } await new Promise(resolve=>setTimeout(resolve,30)); return { id: 'customer-'+reference, status:'sent' }; }
    `,
    auth: `export const requireAdmin=(_req,_res,next)=>next();`,
    logger: `export const logger={ error() {}, info() {} };`,
  };
  const routePath = fileURLToPath(new URL("../routes/contact.ts", import.meta.url));
  const output = await build({
    stdin: { contents: `export { default as router } from ${JSON.stringify(routePath)}; export { state } from 'fixture:db';`, resolveDir: fileURLToPath(new URL("../../", import.meta.url)) },
    bundle: true, platform: "node", format: "cjs", write: false, external: ["express"],
    plugins: [{ name: "isolated-contact-dependencies", setup(builder) {
      builder.onResolve({ filter: /^fixture:/ }, args => ({ path: args.path.slice(8), namespace: "fixture" }));
      for (const [pattern, name] of [
        [/^@workspace\/db$/, "db"], [/^drizzle-orm$/, "drizzle"],
        [/contact-providers\.js$/, "providers"],
        [/middlewares\/auth\.js$/, "auth"], [/logger\.js$/, "logger"],
      ] as const) builder.onResolve({ filter: pattern }, () => ({ path: name, namespace: "fixture" }));
      builder.onLoad({ filter: /.*/, namespace: "fixture" }, args => ({ contents: fixtures[args.path]!, loader: "js" }));
    } }],
  });
  const module = { exports: {} as { router: express.Router; state: { rows: Array<{ reference: string; createdAt: Date; processingAt: Date | null; notificationAttempts: number; nextAttemptAt: Date }>; notifications: number; customerNotifications: number; failNotification: boolean; failRelease: boolean } } };
  new Function("require", "module", "exports", output.outputFiles[0]!.text)(createRequire(import.meta.url), module, module.exports);
  const { router, state } = module.exports;
  const previousSecret = process.env.CONTACT_RATE_LIMIT_SECRET;
  const previousEncryption = process.env.CONTACT_ENCRYPTION_KEY;
  process.env.CONTACT_RATE_LIMIT_SECRET = "isolated-contact-route-test-secret-only";
  process.env.CONTACT_ENCRYPTION_KEY = "33".repeat(32);
  const app = express().use(express.json()).use("/api", router);
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>(resolve => server.once("listening", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  const input = {
    name: "Test User", email: "test@example.com", phone: "+966550001234",
    service: "business-law", message: "Please review this test commercial agreement.",
    acquisition: { version: 1, landingPath: "/sa/services/business-law", source: "google", medium: "organic" },
    region: "sa", language: "en", idempotencyKey: "0c21b6b4-aaf4-4e7b-8885-999e82aa707c",
  };
  const submit = async (body = input) => {
    const response = await fetch(`${origin}/api/contact`, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return { status: response.status, body: await response.json() as { reference?: string; notificationStatus?: string; leadId?: string } };
  };
  try {
    const concurrent = await Promise.all([submit(), submit()]);
    assert.ok(concurrent.some(result => result.status === 201));
    assert.ok(concurrent.every(result => [200, 201, 202].includes(result.status)));
    assert.equal(concurrent[0]!.body.reference, concurrent[1]!.body.reference);
    assert.match(concurrent[0]!.body.leadId!, /^[0-9a-f-]{36}$/);
    assert.equal(concurrent[0]!.body.leadId, concurrent[1]!.body.leadId);
    assert.equal(state.rows.length, 1);
    assert.equal(state.notifications, 1);
    assert.equal(state.customerNotifications, 1);
    const deliveredReplay = await submit();
    assert.equal(deliveredReplay.body.reference, concurrent[0]!.body.reference);
    assert.equal(deliveredReplay.body.notificationStatus, "sent");
    assert.equal(deliveredReplay.body.leadId, concurrent[0]!.body.leadId);
    const attributionResponse = await fetch(`${origin}/api/admin/contact-submissions/${deliveredReplay.body.reference}/attribution`);
    assert.equal(attributionResponse.status, 200);
    const attribution = await attributionResponse.json() as { leadId: string; acquisition: unknown };
    assert.equal(attribution.leadId, deliveredReplay.body.leadId);
    assert.deepEqual(attribution.acquisition, input.acquisition);
    const updatedOutcome = await fetch(`${origin}/api/admin/contact-submissions/${deliveredReplay.body.reference}/attribution`, { method: "PATCH", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ status: "qualified" }) });
    assert.equal(updatedOutcome.status, 200);
    assert.equal((await updatedOutcome.json() as { progress: { status: string } }).progress.status, "qualified");
    assert.equal(state.notifications, 1);

    state.failNotification = true;
    const nextInput = { ...input, idempotencyKey: "801b1f55-a646-48a8-9105-5489f3bce29a" };
    assert.equal((await submit(nextInput)).status, 202);
    const stillPending = await submit(nextInput);
    assert.equal(stillPending.status, 202);
    assert.equal(stillPending.body.notificationStatus, "pending");
    assert.equal(state.notifications, 1);
    state.failNotification = false;
    const pendingRow = state.rows.find(row => row.reference === stillPending.body.reference)!;
    pendingRow.notificationAttempts = 1;
    pendingRow.nextAttemptAt = new Date(Date.now() + 60_000);
    assert.equal((await submit(nextInput)).body.notificationStatus, "pending");
    assert.equal(state.notifications, 1);
    pendingRow.nextAttemptAt = new Date(Date.now() - 1_000);
    const recovered = await submit(nextInput);
    assert.equal(recovered.status, 200);
    assert.equal(recovered.body.notificationStatus, "sent");
    assert.ok(recovered.body.reference);
    assert.equal(state.rows.length, 2);
    assert.equal(state.notifications, 2);
    assert.equal(state.customerNotifications, 2);
    await submit(nextInput);
    assert.equal(state.notifications, 2);

    // A failed status write leaves the claim locked. Immediate replay must not
    // send again; after lock expiry it reuses the provider idempotency keys.
    state.failRelease = true;
    const updateFailureInput = { ...input, message: `${input.message} Status update recovery` };
    const acceptedButUnrecorded = await submit(updateFailureInput);
    assert.equal(acceptedButUnrecorded.status, 202);
    assert.equal(state.notifications, 3);
    state.failRelease = false;
    const busyOutcome = await fetch(`${origin}/api/admin/contact-submissions/${acceptedButUnrecorded.body.reference}/attribution`, { method: "PATCH", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify({ status: "qualified" }) });
    assert.equal(busyOutcome.status, 409, "a live notification claim must not lose concurrent outcome edits during compaction");
    assert.equal((await submit(updateFailureInput)).body.notificationStatus, "pending");
    assert.equal(state.notifications, 3);
    state.rows.find(row => row.reference === acceptedButUnrecorded.body.reference)!.processingAt = new Date(Date.now() - 6 * 60_000);
    assert.equal((await submit(updateFailureInput)).body.notificationStatus, "sent");
    assert.equal(state.notifications, 3);
    assert.equal(state.customerNotifications, 3);

    for (let index = 0; index < 2; index++) await submit({ ...input, message: `${input.message} ${index}` });
    assert.equal(state.rows.length, 5);
    assert.equal((await submit({ ...input, message: `${input.message} New matter` })).status, 429);
    assert.equal((await submit()).status, 200);
    assert.equal(state.rows.length, 5);

    // Distinct new enquiries must share the rate gate, not only the unique
    // reference gate. Expire the earlier requests, then race a fresh burst.
    for (const row of state.rows) row.createdAt = new Date(Date.now() - 16 * 60_000);
    const burst = await Promise.all(Array.from({ length: 8 }, (_, index) => submit({ ...input, message: `Fresh concurrent legal matter number ${index}.` })));
    assert.equal(burst.filter(result => result.status === 201).length, 5);
    assert.equal(burst.filter(result => result.status === 429).length, 3);
    assert.equal(state.rows.length, 10);
    assert.equal((await submit()).status, 200, "a prior receipt remains recoverable despite the rate cap");
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    if (previousSecret === undefined) delete process.env.CONTACT_RATE_LIMIT_SECRET;
    else process.env.CONTACT_RATE_LIMIT_SECRET = previousSecret;
    if (previousEncryption === undefined) delete process.env.CONTACT_ENCRYPTION_KEY;
    else process.env.CONTACT_ENCRYPTION_KEY = previousEncryption;
  }
});
