import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
process.env.DATABASE_URL ||= "postgres://test:test@127.0.0.1:1/test";
process.env.ADMIN_PASSWORD = "legal-updates-test-admin";
const { pool } = await import("@workspace/db");
const { default: router } = await import("../legal-updates/routes.js");
const { default: express } = await import("express");
const { updatesSitemap } = await import("../legal-updates/public-pages.js");
const app = express();
app.use(express.json());
app.use("/api", router);
const server = app.listen(0, "127.0.0.1");
await new Promise<void>((resolve) => server.once("listening", resolve));
const address = server.address();
if (!address || typeof address === "string")
  throw new Error("Missing test port");
const origin = `http://127.0.0.1:${address.port}`;
const commands: string[] = [];
const quote = "The authority has published a new consultation document.";
const copy = {
  title: "Consultation document published",
  summary: "A new consultation document is open for public review.",
  changed: quote,
  effective: "Not established.",
  affected: "Businesses.",
  requirements: "Review source.",
  practical: "Consultation only.",
  actions: "Check source.",
  limitations: "Not operative law.",
};
const row = {
  id: "00000000-0000-4000-8000-000000000001",
  revision: 1,
  status: "draft",
  region: "sa",
  discovered_at: new Date("2026-09-12"),
  source_text: quote,
  source_url: "https://www.moj.gov.sa/test-review",
  source_hash: createHash("sha256").update(quote).digest("hex"),
  draft: {
    relevant: true,
    reason: "New consultation",
    instrument: "Consultation A",
    sourceDate: "2026-09-12",
    effectiveDate: null,
    practiceArea: "Commercial",
    serviceSlugs: ["companies-law"],
    evidence: [{ claim: quote, quote }],
    en: copy,
    ar: Object.fromEntries(Object.entries(copy).map(([key,value]) => [key, `محتوى اختباري عربي: ${value}`])) as typeof copy,
  },
};
Object.defineProperty(pool, "connect", {
  value: async () => ({
    query: async (sql: string) => {
      commands.push(sql);
      return { rows: sql.includes("FOR UPDATE") ? [row] : [], rowCount: 1 };
    },
    release: () => {},
  }),
});
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer legal-updates-test-admin",
};
const review = {
  action: "publish",
  revision: 1,
  reviewer: "Test reviewer",
  note: "Reviewed source and both language versions.",
};
test("admin queue and scheduler reject unauthenticated access", async () => {
  assert.equal((await fetch(`${origin}/api/admin/legal-updates`)).status, 401);
  assert.equal(
    (
      await fetch(`${origin}/api/internal/legal-updates/run`, {
        method: "POST",
      })
    ).status,
    401,
  );
});
test("publication requires an explicit legal review confirmation and never writes on rejection", async () => {
  commands.length = 0;
  const response = await fetch(`${origin}/api/admin/legal-updates/${row.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(review),
  });
  assert.equal(response.status, 400);
  assert.match(
    ((await response.json()) as { error: string }).error,
    /Confirm source/,
  );
  assert.ok(commands.includes("ROLLBACK"));
  assert.ok(!commands.some((s) => s.startsWith("UPDATE legal_updates")));
});
test("stale editorial revisions cannot overwrite or publish", async () => {
  const response = await fetch(`${origin}/api/admin/legal-updates/${row.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ ...review, revision: 0, confirmed: true }),
  });
  assert.equal(response.status, 409);
});
test("sitemap emits eight bilingual hubs and no invented article", () => {
  const xml = updatesSitemap([]);
  assert.equal((xml.match(/<url>/g) || []).length, 8);
  assert.match(xml, /\/syr\/ar\/legal-updates/);
  assert.ok(!xml.includes("/draft/"));
});
test("confirmed publication commits with an audit snapshot when the source is unchanged", async () => {
 const originalFetch=globalThis.fetch;
 globalThis.fetch=((input, init)=>String(input)===row.source_url ? Promise.resolve(new Response(`<p>${quote}</p>`,{headers:{"Content-Type":"text/html"}})) : originalFetch(input,init)) as typeof fetch;
 try {
  commands.length=0;
  const response=await fetch(`${origin}/api/admin/legal-updates/${row.id}`,{method:"PUT",headers,body:JSON.stringify({...review,confirmed:true})});
  assert.equal(response.status,200);
  assert.ok(commands.some(s=>s.startsWith("INSERT INTO legal_update_audit")));
  assert.ok(commands.some(s=>s.startsWith("UPDATE legal_updates")));
  assert.ok(commands.includes("COMMIT"));
 }finally{globalThis.fetch=originalFetch;}
});
test("a changed official source blocks publication and rolls back", async () => {
 const originalFetch=globalThis.fetch;
 globalThis.fetch=((input, init)=>String(input)===row.source_url ? Promise.resolve(new Response(`<p>${quote} Changed text.</p>`,{headers:{"Content-Type":"text/html"}})) : originalFetch(input,init)) as typeof fetch;
 try {
  commands.length=0;
  const response=await fetch(`${origin}/api/admin/legal-updates/${row.id}`,{method:"PUT",headers,body:JSON.stringify({...review,confirmed:true})});
  assert.equal(response.status,400);
  assert.match(((await response.json()) as {error:string}).error,/Source changed/);
  assert.ok(commands.includes("ROLLBACK"));
  assert.ok(!commands.some(s=>s.startsWith("UPDATE legal_updates")));
 }finally{globalThis.fetch=originalFetch;}
});
test.after(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await pool.end();
});
