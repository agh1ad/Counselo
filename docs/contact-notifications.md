# CounselO contact notifications

The public consultation form sends JSON to `POST /api/contact`. The API validates
the submission, applies a database-backed rate limit, encrypts the pending
payload with AES-256-GCM, and sends one consultation email to the team and
owner through Resend.

If the provider call fails, the request process schedules precise retries up to
five times. A once-daily recovery command handles the uncommon case where a
deployment stops before a retry runs. Resend webhooks update delivery state
without polling either Resend or PostgreSQL while the site is idle. The provider
ID and delivery state are retained for operational logging. The encrypted client
payload is erased after the provider accepts the email.

Authenticated administrators can inspect the latest 100 delivery records at
`GET /api/admin/contact-submissions`. This endpoint returns status metadata
only; it never returns client names, contact details, messages, attachments, or
encrypted payloads.

## Required deployment secrets

Configure these in the Replit deployment secrets UI. Do not commit real values.

```text
PUBLIC_SITE_URL=https://counselo-legal.com

RESEND_API_KEY=re_...
RESEND_WEBHOOK_SECRET=whsec_...
CONTACT_FROM_EMAIL=CounselO <consultations@counselo-legal.com>
CONTACT_TEAM_EMAIL=...
CONTACT_OWNER_EMAIL=...

CONTACT_ENCRYPTION_KEY=<64 hexadecimal characters>
CONTACT_RATE_LIMIT_SECRET=<at least 32 random characters>
```

Generate secrets locally:

```bash
openssl rand -hex 32
openssl rand -base64 48
```

Use the hexadecimal result for `CONTACT_ENCRYPTION_KEY` and the Base64 result
for `CONTACT_RATE_LIMIT_SECRET`.

## Release steps

1. Verify the sending domain in Resend.
2. Add all required deployment secrets.
3. Apply the database schema:

   ```bash
   pnpm --filter @workspace/db push
   ```

4. In Resend, create a webhook for
   `https://counselo-legal.com/api/webhooks/resend` and subscribe to outbound
   email status events (`scheduled`, `sent`, `delivery_delayed`, `delivered`,
   `opened`, `clicked`, `bounced`, `complained`, `failed`, and `suppressed`).
   Save its signing secret as `RESEND_WEBHOOK_SECRET`.
5. Create one Replit Scheduled Deployment that runs once daily:

   ```bash
   pnpm --filter @workspace/api-server recover:contact-notifications
   ```

6. Build and deploy the application.
7. Submit one clearly marked test request and confirm delivery to the team
   inbox and owner inbox.

The form intentionally does not use CAPTCHA. Abuse controls are the hidden
honeypot field, strict server validation, same-origin enforcement, and a limit
of five accepted submissions per source fingerprint every 15 minutes.
