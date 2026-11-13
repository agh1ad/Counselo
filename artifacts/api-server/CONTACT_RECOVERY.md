# Consultation notification recovery

Accepted consultation requests and retry deadlines are stored in PostgreSQL.
The HTTP server restores pending deadlines once after startup, including future
backoff times and the expiry of an abandoned five-minute processing claim.
Known failed work receives bounded retries. An empty queue creates no timer or
recurring database query.

Automatic startup recovery runs only with `NODE_ENV=production`. Set
`CONTACT_AUTOMATIC_RECOVERY=false` for a production-like smoke test that must not
send queued messages. Tests use isolated database/provider fixtures and do not
invoke the real recovery command.

Provider sends retain the existing per-reference idempotency keys. A completed
internal or customer email is not resent when the other notification is retried.
The form receipt confirms database acceptance; it does not claim inbox delivery.

## Recovery while Autoscale is stopped

Replit Autoscale can stop every application instance when there is no traffic.
An in-process timer cannot execute during that interval. Startup restoration
recovers the work on the next application start, but a separate scheduled run
is required if notifications must recover during a period with no website
traffic.

This follows Replit's documented [Autoscale and Scheduled deployment
behaviour](https://docs.replit.com/features/publishing/deployment-types).

The prepared one-shot command is:

```sh
pnpm --filter @workspace/api-server recover:contact-notifications
```

Run it from this repository in a deployment environment with the same database,
encryption key and contact-provider configuration as the application. Configure
it as a separate scheduled deployment, for example every five minutes. Do not
invoke it as a public unauthenticated HTTP endpoint or paste secrets into the
command.

Each invocation drains due batches of ten, stopping when no due work remains,
after 100 submissions, or after approximately two minutes. Provider request
timeouts can extend the last batch. Active claims, future backoff deadlines and
exhausted records are excluded. Overlapping invocations use the existing atomic
database claim. The command closes database connections and creates no future
in-process retry timers. A bounded-run message means another invocation may be
needed for remaining due work.

Mail and encryption configuration are validated before claims. A decryption
failure keeps the encrypted request and records an operational error without
using up its provider attempts; repair the configuration or investigate that
record before retrying. New-request rate checks and storage use a short
transaction-scoped lock per hashed IP, so concurrent requests cannot bypass the
five-request limit. Provider calls occur after the transaction commits.

The code does not create or enable an external schedule. Production scheduling
and actual office/client inbox delivery must be verified separately after
publication. Failed records that have exhausted their five provider attempts
remain available for operational review; this command does not silently reset
their retry limits.
