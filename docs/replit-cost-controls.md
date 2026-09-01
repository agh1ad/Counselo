# Replit cost controls

The August 2026 bill showed that production database compute was the only
material storage charge. These controls reduce database wake-ups without
removing public content, changing routes, or delaying normal contact delivery.

## Runtime controls implemented in the repository

- Public blog, work, sitemap, RSS, and crawler-rendered responses are stored in
  Replit App Storage after the first database-backed response. The cache is
  shared across autoscale instances and survives instance restarts.
- Published CMS changes clear the shared cache before search-engine
  notifications run, so new, updated, unpublished, and deleted content retains
  the existing freshness behavior.
- The API no longer starts a database recovery scan after boot or polls for
  delivery state. Resend sends signed status webhooks instead.
- Normal failed contact sends retain their precise in-process retry timers. A
  single daily recovery command covers process restarts without keeping the
  database active continuously.
- PostgreSQL connections are released after five idle seconds and do not keep a
  completed recovery process alive.

If App Storage is temporarily unavailable, requests fall back to PostgreSQL and
the public response remains unchanged. The server retries App Storage later.

## One-time Replit and Resend setup

1. Link an App Storage bucket to the app. The `counselo-public-cache` bucket was
   created on August 30, 2026.
2. Keep `PUBLIC_RESPONSE_CACHE_BACKEND=object-storage` in the production run
   environment. The checked-in root `.replit` and API artifact configuration
   already do this.
3. Create the Resend webhook and secret described in
   [`contact-notifications.md`](./contact-notifications.md).
4. Create a daily Scheduled Deployment with this command:

   ```bash
   pnpm --filter @workspace/api-server recover:contact-notifications
   ```

5. Set a Replit monthly usage alert and spending limit appropriate for the
   account. This is a billing guardrail, not an application setting.

## Release verification

After deployment:

1. Request `/api/blog/posts` twice. The first uncached request can report
   `X-CounselO-Response-Cache: MISS`; subsequent requests should report
   `APP-STORAGE` or `PROCESS`.
2. Publish or update a draft article, then confirm its public route and sitemap
   reflect the change.
3. Submit one marked contact test and confirm both messages arrive and the admin
   delivery statuses advance through webhook events.
4. Confirm the scheduled recovery deployment succeeds, then monitor production
   database compute for several days. Traffic-driven cache misses can still
   wake the database, so the expected charge is reduced rather than guaranteed
   to be zero.
