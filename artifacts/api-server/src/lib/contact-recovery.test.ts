import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

type Row = {
  id: number; reference: string; notificationAttempts: number; nextAttemptAt: Date;
  processingAt: Date | null; encryptedPayload: string; emailProviderId: string | null;
  customerEmailProviderId: string | null; [key: string]: unknown;
};
type State = {
  rows: Row[]; reads: number; failReads: number; failUpdates: number; failRelease: boolean;
  failInternal: number; failCustomer: number; failDecrypt: boolean; deliveries: Set<string>;
  beforeRelease?: () => Promise<void>;
};
type Recovery = {
  state: State;
  processContactNotification(id: number): Promise<{ emailAccepted: boolean }>;
  restoreContactNotificationRetries(): Promise<number>;
  startContactNotificationRecovery(): void;
  stopContactNotificationRecovery(): void;
  processPendingNotifications(): Promise<number>;
};

const fixtureSources: Record<string, string> = {
  db: `
    export const state={ rows:[], reads:0, failReads:0, failUpdates:0, failRelease:false, failInternal:0, failCustomer:0, failDecrypt:false, deliveries:new Set() };
    export const contactSubmissionsTable=new Proxy({}, {get:(_,key)=>key});
    export const db={
      select(fields) {
        let predicate=()=>true, order=[];
        const read=(limit=Infinity)=>{
          state.reads++;
          if(state.failReads>0) { state.failReads--; throw Error('read unavailable'); }
          return state.rows.filter(predicate).sort((a,b)=>{for(const key of order){if(a[key]<b[key])return -1;if(a[key]>b[key])return 1;}return 0;}).slice(0,limit)
            .map(row=>Object.fromEntries(Object.entries(fields).map(([key,field])=>[key,row[field]])));
        };
        return {from(){return this;},where(fn){predicate=fn;return this;},orderBy(...keys){order=keys;return this;},limit(n){return Promise.resolve().then(()=>read(n));},then(resolve,reject){return Promise.resolve().then(()=>read()).then(resolve,reject);}};
      },
      update() {
        let patch,predicate;
        const apply=async()=>{
          if(state.failUpdates>0){state.failUpdates--;throw Error('write unavailable');}
          if(state.failRelease && patch.processingAt===null)throw Error('status write unavailable');
          if(patch.processingAt===null)await state.beforeRelease?.();
          const rows=state.rows.filter(predicate);
          for(const row of rows)Object.assign(row,patch);
          return rows.map(row=>({...row}));
        };
        return {set(value){patch=value;return this;},where(fn){predicate=fn;return this;},returning(){return Promise.resolve().then(apply);},then(resolve,reject){return Promise.resolve().then(apply).then(resolve,reject);}};
      }
    };`,
  drizzle: `export const eq=(k,v)=>r=>r[k]===v;export const gt=(k,v)=>r=>r[k]>v;export const lt=(k,v)=>r=>r[k]<v;export const lte=(k,v)=>r=>r[k]<=v;export const isNull=k=>r=>r[k]==null;export const and=(...cs)=>r=>cs.every(c=>c(r));export const or=(...cs)=>r=>cs.some(c=>c(r));export const asc=k=>k;`,
  providers: `
    import {state} from 'fixture:db';
    export const assertContactNotificationConfiguration=()=>{};
    export async function sendConsultationEmail(_input,reference){if(state.failInternal>0){state.failInternal--;throw Error('provider unavailable');}state.deliveries.add('internal:'+reference);return {id:'internal:'+reference,status:'sent'};}
    export async function sendCustomerConfirmationEmail(_input,reference){if(state.failCustomer>0){state.failCustomer--;throw Error('provider unavailable');}state.deliveries.add('customer:'+reference);return {id:'customer:'+reference,status:'sent'};}`,
  crypto: `import {state} from 'fixture:db';export const assertContactEncryptionConfiguration=()=>{};export const encryptContactPayload=value=>({encryptedPayload:JSON.stringify(value),payloadIv:"fixture",payloadAuthTag:"fixture"});export const decryptContactPayload=({encryptedPayload})=>{if(state.failDecrypt)throw Error('encryption configuration mismatch');return JSON.parse(encryptedPayload);};`,
  logger: `export const logger={info(){},error(){}};`,
};

const moduleCode = build({
  stdin: { contents: `export * from ${JSON.stringify(fileURLToPath(new URL("./contact-notifications.ts", import.meta.url)))};export {state} from 'fixture:db';`, resolveDir: fileURLToPath(new URL("../../", import.meta.url)) },
  bundle: true, platform: "node", format: "cjs", write: false,
  plugins: [{ name: "isolated-notification-recovery", setup(builder) {
    builder.onResolve({ filter: /^fixture:/ }, args => ({ path: args.path.slice(8), namespace: "fixture" }));
    for (const [filter, name] of [[/^@workspace\/db$/, "db"], [/^drizzle-orm$/, "drizzle"], [/contact-providers\.js$/, "providers"], [/contact-crypto\.js$/, "crypto"], [/logger\.js$/, "logger"]] as const)
      builder.onResolve({ filter }, () => ({ path: name, namespace: "fixture" }));
    builder.onLoad({ filter: /.*/, namespace: "fixture" }, args => ({ contents: fixtureSources[args.path]!, loader: "js" }));
  } }],
}).then(result => result.outputFiles[0]!.text);

async function instance(existing?: State) {
  let now = Date.UTC(2026, 10, 13);
  let timerId = 0;
  const timers = new Map<number, { at: number; callback: () => unknown }>();
  class ClockDate extends Date {
    constructor(value?: string | number | Date) { super(value === undefined ? now : value instanceof Date ? value.getTime() : new Date(value).getTime()); }
    static override now() { return now; }
  }
  const module = { exports: {} as Recovery };
  const setTimer = (callback: () => unknown, delay: number) => {
    const id = ++timerId;
    timers.set(id, { at: now + delay, callback });
    return { id, unref() {} };
  };
  const clearTimer = (timer: { id: number }) => { timers.delete(timer.id); };
  new Function("require", "module", "exports", "setTimeout", "clearTimeout", "Date", await moduleCode)(createRequire(import.meta.url), module, module.exports, setTimer, clearTimer, ClockDate);
  if (existing) Object.assign(module.exports.state, existing);
  return {
    ...module.exports, timers,
    now: () => now,
    async next() {
      const entry = [...timers.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      assert.ok(entry, "a known pending notification must have a scheduled wake");
      timers.delete(entry[0]); now = entry[1].at;
      await entry[1].callback();
      // Startup's bounded retry callback intentionally starts recovery without
      // blocking the HTTP listener; allow its mock DB microtasks to settle.
      for (let i = 0; i < 12; i++) await Promise.resolve();
    },
  };
}

function pending(id: number, now: number, delay = 0): Row {
  return { id, reference: `TEST-${id}`, notificationAttempts: 1, nextAttemptAt: new Date(now + delay), processingAt: null, encryptedPayload: "{}", emailProviderId: null, customerEmailProviderId: null, payloadIv: "fixture", payloadAuthTag: "fixture" };
}

test("restart restores due and future durable deadlines, then performs no idle database polling", async () => {
  const before = await instance();
  before.state.rows.push(pending(1, before.now()), pending(2, before.now(), 30_000));
  assert.equal(await before.restoreContactNotificationRetries(), 2);
  before.stopContactNotificationRecovery();
  assert.equal(before.timers.size, 0);
  const after = await instance(before.state);
  assert.equal(await after.restoreContactNotificationRetries(), 2);
  await after.next();
  assert.equal(after.state.deliveries.size, 2);
  assert.equal(after.state.rows[1]!.emailProviderId, null, "future backoff must not be bypassed on restart");
  await after.next();
  assert.equal(after.state.deliveries.size, 4);
  assert.equal(after.timers.size, 0);
  const reads = after.state.reads;
  for (let i = 0; i < 20; i++) await Promise.resolve();
  assert.equal(after.state.reads, reads);
  assert.equal(await after.restoreContactNotificationRetries(), 0);
  assert.equal(after.timers.size, 0);
});

test("restart waits for an abandoned claim and reuses provider keys after an accepted-send status-write failure", async () => {
  const before = await instance();
  before.state.rows.push(pending(1, before.now()));
  before.state.failRelease = true;
  await assert.rejects(before.processContactNotification(1), /status write unavailable/);
  assert.equal(before.state.deliveries.size, 2);
  before.stopContactNotificationRecovery();
  before.state.failRelease = false;
  const after = await instance(before.state);
  await after.restoreContactNotificationRetries();
  assert.equal([...after.timers.values()][0]!.at, after.now() + 5 * 60_000 + 1);
  await after.next();
  assert.equal(after.state.deliveries.size, 2, "same provider idempotency keys must be retained");
  assert.ok(after.state.rows[0]!.emailProviderId);
  assert.ok(after.state.rows[0]!.customerEmailProviderId);
  assert.equal(after.state.rows[0]!.encryptedPayload, "");
  assert.equal(after.timers.size, 0);
});

test("partial provider failure recovers only the unsent message after restart", async () => {
  const before = await instance();
  before.state.rows.push(pending(1, before.now()));
  before.state.failCustomer = 1;
  assert.equal((await before.processContactNotification(1)).emailAccepted, false);
  assert.ok(before.state.rows[0]!.emailProviderId);
  assert.equal(before.state.rows[0]!.customerEmailProviderId, null);
  const due = before.state.rows[0]!.nextAttemptAt.getTime();
  before.stopContactNotificationRecovery();
  const after = await instance(before.state);
  await after.restoreContactNotificationRetries();
  assert.equal([...after.timers.values()][0]!.at, due);
  await after.next();
  assert.equal(after.state.deliveries.size, 2);
  assert.equal(after.timers.size, 0);
});

test("transient database failure schedules work recovery and repeated failures are bounded", async () => {
  const worker = await instance();
  worker.state.rows.push(pending(1, worker.now()));
  worker.state.failUpdates = 1;
  await assert.rejects(worker.processContactNotification(1), /write unavailable/);
  await worker.next();
  assert.equal(worker.state.deliveries.size, 2);
  assert.equal(worker.timers.size, 0);
  worker.state.rows.push(pending(2, worker.now()));
  worker.state.failUpdates = 10;
  await assert.rejects(worker.processContactNotification(2));
  for (let i = 0; i < 4; i++) await worker.next();
  assert.equal(worker.timers.size, 0, "a persistent outage must not create an endless database poll");
});

test("startup recovery pages through every pending ID and excludes exhausted or completed work", async () => {
  const worker = await instance();
  for (let id = 1; id <= 105; id++) worker.state.rows.push(pending(id, worker.now(), 60_000));
  worker.state.rows[0]!.notificationAttempts = 5;
  worker.state.rows[1]!.emailProviderId = "sent";
  worker.state.rows[1]!.customerEmailProviderId = "sent";
  assert.equal(await worker.restoreContactNotificationRetries(), 103);
  assert.equal(worker.state.reads, 2);
  assert.equal(worker.timers.size, 103);
  worker.stopContactNotificationRecovery();
  assert.equal(worker.timers.size, 0);
});

test("concurrent due drains respect claims, future backoff and completion across multiple batches", async () => {
  const worker = await instance();
  for (let id = 1; id <= 23; id++) worker.state.rows.push(pending(id, worker.now()));
  const locked = pending(24, worker.now()); locked.processingAt = new Date(worker.now());
  worker.state.rows.push(locked, pending(25, worker.now(), 30_000));
  await Promise.all([worker.processPendingNotifications(), worker.processPendingNotifications()]);
  while (await worker.processPendingNotifications()) { /* drain only due batches */ }
  assert.equal(worker.state.deliveries.size, 46);
  assert.equal(locked.emailProviderId, null);
  assert.equal(worker.state.rows[24]!.emailProviderId, null);
  assert.equal(await worker.processPendingNotifications(), 0);
  worker.stopContactNotificationRecovery();
});

test("startup transient recovery is bounded and shutdown prevents new retry timers", async () => {
  const worker = await instance();
  worker.state.failReads = 1;
  worker.startContactNotificationRecovery();
  for (let i = 0; i < 12; i++) await Promise.resolve();
  assert.equal(worker.timers.size, 1);
  await worker.next();
  assert.equal(worker.state.reads, 2);
  assert.equal(worker.timers.size, 0, "successful empty startup scan must stop");
  worker.state.rows.push(pending(1, worker.now()));
  worker.stopContactNotificationRecovery();
  worker.state.failUpdates = 1;
  await assert.rejects(worker.processContactNotification(1));
  assert.equal(worker.timers.size, 0, "a stopped one-shot process must not schedule background sends");
});

test("encryption configuration failure preserves queued work for repair without consuming provider attempts", async () => {
  const before = await instance();
  before.state.rows.push(pending(1, before.now()));
  before.state.rows[0]!.notificationAttempts = 0;
  before.state.failDecrypt = true;
  await assert.rejects(before.processContactNotification(1), /encryption configuration mismatch/);
  assert.equal(before.state.rows[0]!.notificationAttempts, 0);
  assert.equal(before.state.rows[0]!.encryptedPayload, "{}");
  assert.equal(before.state.deliveries.size, 0);
  assert.match(String(before.state.rows[0]!.lastError), /encryption configuration/);
  before.stopContactNotificationRecovery();
  before.state.failDecrypt = false;
  const after = await instance(before.state);
  await after.restoreContactNotificationRetries();
  assert.equal([...after.timers.values()][0]!.at, after.now() + 5 * 60_000, "configuration backoff also applies before the first provider attempt");
  await after.next();
  assert.equal(after.state.deliveries.size, 2);
  assert.equal(after.state.rows[0]!.encryptedPayload, "");
});

test("a delayed old worker cannot overwrite completion from a newer claim", async () => {
  const worker = await instance();
  const row = pending(1, worker.now());
  worker.state.rows.push(row);
  worker.state.failInternal = 1;
  let release!: () => void;
  let started!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  const writing = new Promise<void>(resolve => { started = resolve; });
  worker.state.beforeRelease = async () => { started(); await gate; };
  const oldAttempt = worker.processContactNotification(1);
  await writing;
  // Another instance has acquired the expired lease and completed both sends
  // while the old instance's partial-failure status write was stalled.
  Object.assign(row, { processingAt: null, notificationAttempts: 3, emailProviderId: "internal:TEST-1", customerEmailProviderId: "customer:TEST-1", encryptedPayload: "" });
  worker.state.beforeRelease = undefined;
  release();
  assert.equal((await oldAttempt).emailAccepted, true);
  assert.equal(row.notificationAttempts, 3);
  assert.equal(row.emailProviderId, "internal:TEST-1");
  assert.equal(row.encryptedPayload, "");
  assert.equal(worker.timers.size, 0);
});
