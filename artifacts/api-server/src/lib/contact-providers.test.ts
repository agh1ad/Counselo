import assert from "node:assert/strict";
import test from "node:test";
import type { ContactInput } from "./contact-input.js";
import {
  sendConsultationEmail,
  sendCustomerConfirmationEmail,
} from "./contact-providers.js";

const input: ContactInput = {
  name: "Ahmed Al-Harbi",
  email: "ahmed@example.com",
  phone: "+966550001234",
  service: "business-law",
  message: "I need advice about a commercial contract dispute.",
  region: "sa",
  language: "en",
  website: "",
  attachments: [],
};

const environment = {
  RESEND_API_KEY: "re_test",
  CONTACT_FROM_EMAIL: "CounselO <consultations@example.com>",
  CONTACT_TEAM_EMAIL: "team@example.com",
  CONTACT_OWNER_EMAIL: "owner@example.com",
  PUBLIC_SITE_URL: "https://counselo-legal.com",
};

async function withProviderEnvironment(
  run: () => Promise<void>,
): Promise<void> {
  const previousFetch = globalThis.fetch;
  const previous = Object.fromEntries(
    Object.keys(environment).map((key) => [key, process.env[key]]),
  );
  Object.assign(process.env, environment);
  try {
    await run();
  } finally {
    globalThis.fetch = previousFetch;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("emails the team and owner with an idempotency key", async () => {
  await withProviderEnvironment(async () => {
    let request: RequestInit | undefined;
    globalThis.fetch = async (_input, init) => {
      request = init;
      return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
    };
    const result = await sendConsultationEmail(input, "CON-20260726-TEST");
    assert.equal(result.id, "email-id");
    assert.equal(
      new Headers(request?.headers).get("Idempotency-Key"),
      "counselo-consultation/CON-20260726-TEST/internal",
    );
    const body = JSON.parse(String(request?.body)) as { to: string[] };
    assert.deepEqual(body.to, ["team@example.com", "owner@example.com"]);
  });
});

test("sends a polished bilingual confirmation to the customer", async () => {
  await withProviderEnvironment(async () => {
    let request: RequestInit | undefined;
    globalThis.fetch = async (_input, init) => {
      request = init;
      return new Response(JSON.stringify({ id: "customer-email-id" }), {
        status: 200,
      });
    };
    const result = await sendCustomerConfirmationEmail(
      input,
      "CON-20260726-CUSTOMER",
    );
    assert.equal(result.id, "customer-email-id");
    assert.equal(
      new Headers(request?.headers).get("Idempotency-Key"),
      "counselo-consultation/CON-20260726-CUSTOMER/customer",
    );
    const body = JSON.parse(String(request?.body)) as {
      to: string[];
      reply_to: string;
      subject: string;
      text: string;
      html: string;
      attachments?: unknown[];
    };
    assert.deepEqual(body.to, ["ahmed@example.com"]);
    assert.equal(body.reply_to, "team@example.com");
    assert.match(body.subject, /تم استلام طلب استشارتك/);
    assert.match(body.text, /Thank you for choosing CounselO/);
    assert.match(body.text, /شكراً لاختيارك كاونسلو/);
    assert.match(body.html, /images\/counselo-logo\.png/);
    assert.match(body.html, /<img[^>]+width="640"[^>]+width:100%/);
    assert.match(body.html, /including spam or junk/);
    assert.match(body.html, /بما في ذلك الرسائل غير المرغوب فيها/);
    assert.equal(body.attachments, undefined);
  });
});

test("escapes customer-provided values in confirmation HTML", async () => {
  await withProviderEnvironment(async () => {
    let request: RequestInit | undefined;
    globalThis.fetch = async (_input, init) => {
      request = init;
      return new Response(JSON.stringify({ id: "customer-email-id" }), {
        status: 200,
      });
    };
    await sendCustomerConfirmationEmail(
      { ...input, name: "<img src=x onerror=alert(1)>" },
      "CON-20260726-ESCAPE",
    );
    const body = JSON.parse(String(request?.body)) as { html: string };
    assert.doesNotMatch(body.html, /<img src=x onerror/);
    assert.match(body.html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  });
});
