import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createPublicationStorage, PublicationCoordinator, PUBLICATION_PENDING_PREFIX } from "../lib/publication-cache.js";

const command = process.argv[2] ?? "status";
const bucketId = process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID?.trim();
if (!bucketId) throw new Error("Set PUBLIC_RESPONSE_CACHE_BUCKET_ID to the existing Replit cache bucket.");
const storage = createPublicationStorage(bucketId);
const coordinator = new PublicationCoordinator(() => storage);

if (command === "status") {
  const [epoch, pending] = await Promise.all([
    storage.epochGeneration(),
    storage.list({ prefix: PUBLICATION_PENDING_PREFIX, maxResults: 100 }),
  ]);
  if (!pending.ok) throw pending.error;
  console.log(JSON.stringify({ epoch, pendingFences: pending.value.map(object => object.name), truncatedAt: 100 }, null, 2));
} else if (command === "prune") {
  // Prune only unreachable generated caches, never uploads or control objects.
  const epoch = await storage.epochGeneration();
  if (!/^\d+$/.test(epoch)) throw new Error("Initialize and verify publication control before pruning.");
  const prefixes = ["counselo/public-response-cache/v2/", "counselo/public-data-cache/v1/"];
  const candidates: string[] = [];
  for (const prefix of prefixes) {
    const listed = await storage.list({ prefix, maxResults: 10_001 });
    if (!listed.ok) throw listed.error;
    if (listed.value.length > 10_000) throw new Error("Prune listing exceeds safety limit; no objects removed.");
    for (const { name } of listed.value) {
      const revision = name.match(/^counselo\/public-response-cache\/v2\/[^/]+\/publication\/(\d+)\//)?.[1]
        ?? name.match(/^counselo\/public-data-cache\/v1\/[^/]+\/(\d+)\//)?.[1];
      if (revision && revision !== epoch) candidates.push(name);
    }
  }
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({ dryRun: true, obsoleteCacheObjects: candidates.length, preservedEpoch: epoch }));
  } else {
    // A publication after the listing creates a new generation, never one of
    // these obsolete generations. Preserve the listed active revision too.
    for (let index = 0; index < candidates.length; index += 8) {
      const deleted = await Promise.all(candidates.slice(index, index + 8)
        .map(name => storage.delete(name, { ignoreNotFound: true })));
      if (deleted.some(result => !result.ok)) throw new Error("Some obsolete cache deletions failed; rerun the dry run.");
    }
    console.log(JSON.stringify({ removedObsoleteCacheObjects: candidates.length, preservedEpoch: epoch }));
  }
} else if (command === "initialize") {
  const fence = await coordinator.begin();
  await coordinator.finish(fence);
  console.log("Publication revision initialized/rotated. No application records changed; existing writer fences were preserved.");
} else if (command === "recover") {
  const fence = process.argv[3];
  if (!process.argv.includes("--writers-stopped") || !fence ||
      !new RegExp(`^${PUBLICATION_PENDING_PREFIX}[a-f0-9-]{36}\\.json$`).test(fence)) {
    throw new Error("Recovery requires the exact pending fence and --writers-stopped. Stop and verify every writer before using it.");
  }
  await coordinator.finish(fence);
  console.log("Rotated the revision and removed only the specified fence. Other pending writers still block cached responses.");
} else if (command === "preflight") {
  // Dedicated random objects, never production control state or user uploads.
  const prefix = `counselo/cache-preflight/${randomUUID()}/`;
  const epoch = `${prefix}epoch.json`, fence = `${prefix}pending.json`;
  const probe = createPublicationStorage(bucketId, epoch);
  const latencies: number[] = [];
  try {
    assert.equal((await probe.uploadFromText(fence, "{}" )).ok, true);
    const listed = await probe.list({ prefix, maxResults: 10 });
    assert.ok(listed.ok && listed.value.some(object => object.name === fence));
    assert.equal((await probe.uploadFromText(epoch, "same payload")).ok, true);
    const first = await probe.epochGeneration();
    assert.notEqual(first, "initial");
    assert.equal((await probe.uploadFromText(epoch, "same payload")).ok, true);
    assert.notEqual(await probe.epochGeneration(), first, "each overwrite needs a new generation even for identical bytes");
    for (let index = 0; index < 3; index++) {
      const started = performance.now();
      const [list] = await Promise.all([probe.list({ prefix, maxResults: 1 }), probe.epochGeneration()]);
      assert.ok(list.ok);
      latencies.push(Math.round(performance.now() - started));
    }
    assert.equal((await probe.delete(fence, { ignoreNotFound: true })).ok, true);
    const after = await probe.list({ prefix, maxResults: 10 });
    assert.ok(after.ok && !after.value.some(object => object.name === fence));
    console.log(JSON.stringify({ result: "PASS", generationChanges: true, listAfterWriteAndDelete: true, controlReadMilliseconds: latencies }));
  } finally {
    const outcomes = await Promise.all([epoch, fence].map(name => probe.delete(name, { ignoreNotFound: true })));
    if (outcomes.some(result => !result.ok)) throw new Error(`Preflight cleanup needs attention for ${prefix}`);
  }
} else {
  throw new Error("Use status, preflight, initialize, prune [--apply], or recover <fence> --writers-stopped.");
}
