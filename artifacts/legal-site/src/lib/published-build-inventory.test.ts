import assert from "node:assert/strict";
import test from "node:test";
import { readSnapshotInventory, type InventoryStorage } from "../scripts/published-build-inventory.js";

const record = { slug: "case-one", published: true, date: "2026-11-18", titleEn: "Case", fileSize: 10 };
const envelope = (records: unknown) => JSON.stringify({ version: 1, createdAt: Date.now() - 100, records });
function fixture(objects: Record<string, string>, states = [{ epoch: "123", pending: false }]) {
  const keys: string[] = [];
  let index = 0;
  const store: InventoryStorage = {
    state: async () => states[Math.min(index++, states.length - 1)],
    read: async key => { keys.push(key); return objects[key]; },
  };
  return { store, keys };
}

test("builds prefer current-format work and strip file bytes and private approval data", async () => {
  const f = fixture({
    "counselo/public-data-cache/v3/123/work.json": envelope([{ ...record, fileData: "private", confidentialityConfirmed: true, testimonials: [] }]),
  });
  const [row] = await readSnapshotInventory("work", f.store);
  assert.equal(row.slug, record.slug);
  assert.equal(row.hasFile, true);
  assert.equal("fileData" in row, false);
  assert.equal("confidentialityConfirmed" in row, false);
  assert.equal(f.keys.length, 1);
});

test("a format upgrade can build from v2 content only in the same active epoch", async () => {
  const f = fixture({ "counselo/public-data-cache/v2/123/work.json": envelope([{ ...record, fileSize: 0 }]) });
  assert.equal((await readSnapshotInventory("work", f.store)).length, 1);
  assert.deepEqual(f.keys, ["counselo/public-data-cache/v3/123/work.json", "counselo/public-data-cache/v2/123/work.json"]);
});

test("missing snapshots never produce an empty or prior-epoch fallback", async () => {
  const f = fixture({ "counselo/public-data-cache/v2/122/work.json": envelope([record]) });
  await assert.rejects(readSnapshotInventory("work", f.store), /No active work inventory/);
  assert.ok(f.keys.every(key => key.includes("/123/")));
});

test("fences and changed epochs prevent a mixed publication inventory", async () => {
  const f = fixture({}, [{ epoch: "123", pending: true }]);
  await assert.rejects(readSnapshotInventory("work", f.store), /in progress/);
  assert.equal(f.keys.length, 0);
  const changed = fixture({ "counselo/public-data-cache/v3/123/work.json": envelope([record]) },
    [{ epoch: "123", pending: false }, { epoch: "124", pending: false }]);
  await assert.rejects(readSnapshotInventory("work", changed.store), /changed/);
});

test("invalid current snapshots, unpublished records and duplicate slugs fail closed", async () => {
  for (const records of [[{ ...record, published: false }], [record, record]]) {
    const f = fixture({
      "counselo/public-data-cache/v3/123/work.json": envelope(records),
      "counselo/public-data-cache/v2/123/work.json": envelope([record]),
    });
    await assert.rejects(readSnapshotInventory("work", f.store), /Invalid/);
    assert.equal(f.keys.length, 1, "corruption is not a reason to trust legacy data");
  }
});
