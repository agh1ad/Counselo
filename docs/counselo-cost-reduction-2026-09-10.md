# CounselO database cost reduction

This change is prepared for a two-stage Replit rollout. It is NOT activated by the checked-in configuration. `fenced` retains short-lived responses while making every supported public-content writer participate in invalidation. `publication` activates the longer shared caches only after the first stage fully replaces the old processes.

## Why

The inspected Replit billing period attributed $4.23 (26.46 hours) of CounselO's storage-category usage to database compute. The existing five-minute response cache can repeatedly wake PostgreSQL for traffic that only reads unchanged published content. Actual post-release savings remain unmeasured. Hosting, traffic, storage operations, publishing, contact submissions and database-backed administrative activity can still cost money; this is not a promise of a zero bill.

## Behavior

- Shared responses live for up to 24 hours within one deployment and publication revision. Different blog, work, sitemap and feed URLs share two published collection snapshots, so a new or nonexistent slug can reuse data loaded for another route.
- Each process checks pending mutations and the storage revision at most every 15 seconds while receiving eligible requests. A new publication revision makes old response and collection keys unreachable. There is no periodic database polling task.
- Admin create/update/delete and the two content-maintenance scripts write a unique pending marker before changing database records. Failure to establish that marker prevents the write. Concurrent writers each keep their own marker. A crash leaves caching bypassed until controlled recovery.
- A failed finalization after a committed save retains a pending marker and logs an error; it does not report the saved insert as failed and invite duplicate content. Public routes read current database records while caching is bypassed.
- GCS metadata generations identify revisions; delayed retries containing an old payload cannot restore an earlier cached namespace. Control failures or a missing epoch bypass caching. The control and collection download deadlines are two seconds; collection persistence runs after preparing the response.
- Published collection schemas reject drafts, validate timestamps and omit work file bytes and confidentiality approval. Existing response sanitization, bilingual content checks, testimonial governance and document approval checks remain in their existing routes. Admin/authenticated/write requests are excluded from response caching. Contact and approved `/documents/` routes retain direct database checks.
- Generated caches use the existing private bucket. No uploads, database records, schema, access permissions, server capacity or UI content are removed or changed.
- Caches are scoped to deployment content and revision. Responses are capped at 2 MiB, collections at 8 MiB. Overlarge entries still return normally but are not persisted. Optional `prune` removes only obsolete generated publication-cache revisions and never user uploads or control markers.

## Validation recorded

API type checking and 125 API tests passed, including cold bursts, two simulated server instances, restart, daily expiry, edits, withdrawal, republishing, overlapping writes, failed and abandoned fences, late responses, redirects, cache bypass, corrupt collection snapshots, timestamp restoration and private-field exclusion. The full workspace production build also passed (1,475 prerendered routes). A production-bundle smoke test returned HTTP 200 for health plus four Arabic/English home and service routes with no database available. Mock tests establish software behavior, not production savings.

A separate real Replit preflight used only two randomly named test objects under `counselo/cache-preflight/`. Object generation changed on identical-payload overwrite; listing reflected creation and deletion; three control reads took 408, 98 and 311 ms. Both test objects were removed. This did not change production control state or application data.

The Replit editor was at `d13e366`, with generated feed/sitemap changes. The isolated implementation began at GitHub main `7446696`; synchronize by reviewing divergence and preserving editor changes, not resetting or replacing the editor wholesale.

## Deployment sequence

Use the existing bucket ID `replit-objstore-a69094dc-1cf1-4dcc-9b7c-8c67e9f645be` as `PUBLIC_RESPONSE_CACHE_BUCKET_ID`. Commands below run from the repository root in Replit, with that variable exported. Content maintenance also requires exporting PUBLIC_RESPONSE_CACHE_BACKEND=object-storage and PUBLIC_RESPONSE_CACHE_MODE=fenced (stage one) or publication (stage two). Do not print database credentials.

1. Review and integrate this branch with the actual Replit revision. Preserve unrelated changes. Install with `pnpm install --frozen-lockfile`, run API tests/typecheck and build both production artifacts.
2. Run `pnpm --filter @workspace/api-server cache:control preflight` in Replit. Publish stage one with `PUBLIC_RESPONSE_CACHE_MODE=fenced` in both `.replit` and `artifacts/api-server/.replit-artifact/artifact.toml`. Keep the explicit bucket and object-storage backend. Confirm Replit Published and public health, blog, work, Arabic/English and sitemap responses.
3. Wait until ALL old unfenced production processes have drained; stop any old preview processes or maintenance jobs able to write the production database. Confirm every external/manual content writer either uses the wrapper or is stopped. A rolling release with an old unfenced writer is not safe to activate.
4. Run `pnpm --filter @workspace/api-server cache:control initialize`, then `cache:control status`. Require a numeric epoch and no pending fences. Do not manually delete control objects.
5. Set `PUBLIC_RESPONSE_CACHE_MODE=publication` in BOTH deployment configurations and republish stage two. Verify the runtime mode, Replit Published, normal page/API bodies, crawler routes and cache headers (`MISS`, then `PROCESS` or `APP-STORAGE`). Verify public content updates after an explicitly authorized real publication. Never create test public legal content to test this.
6. Compare subsequent complete-day database-compute hours and hosting/object operation charges with comparable previous days. Development sessions and content editing also consume compute, so isolate those effects before attributing savings. No automatic monitoring is installed.

## Recovery and maintenance

- For a routine rollback, first republish this same code with mode `fenced`; leave all writers fenced until every publication-mode reader has drained. Only then consider reverting to an older unfenced build. Do not roll directly back to an unfenced writer while publication readers are live.
- `cache:control status` reports pending marker names. If one is abandoned, stop and verify ALL writers, then use `cache:control recover <exact-marker> --writers-stopped`. This rotates the revision before removing only that marker. A running writer's marker must never be removed.
- Direct SQL edits outside the wrapped scripts must occur under a held publication fence, or after publication-mode readers have all been disabled. Post-hoc invalidation alone is insufficient for a mutation race. Do not rely on the 24-hour refresh as a publication mechanism.
- After publication activity, `cache:control prune` is a dry run. `cache:control prune --apply` removes only generated objects belonging to obsolete numeric revisions, preserving the current revision across all deployments. A 10,000-object listing limit stops the operation before deletions; it never scans uploads or deletes publication controls. There is no automatic pruning scheduler.
- If storage is unavailable, the site can serve database reads at greater cost. New content saves requiring a fence may be rejected before writing; restore storage or perform the staged rollback. Logs identify this condition without exposing record contents.

The existing browser/CDN cache headers are preserved. The shared-control bound describes the application cache, not a guarantee that every browser or external cache displays an edit instantly. Production latency, publishing behavior and the actual bill must still be verified after activation.
