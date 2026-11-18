import assert from "node:assert/strict";
import test from "node:test";
import { parseContactInput, type ContactInput } from "./contact-input.js";
import {
  sendConsultationEmail,
  sendCustomerConfirmationEmail,
} from "./contact-providers.js";

const input: ContactInput = {
  name: "Ahmed Al-Harbi",
  email: "ahmed@example.com",
  phone: "+966550001234",
  service: "business-law",
  consultationProduct: "case-assessment",
  message: "I need advice about a commercial contract dispute.",
  region: "sa",
  language: "en",
  website: "",
  acquisition: undefined,
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
    const body = JSON.parse(String(request?.body)) as { to: string[]; from: string };
    assert.deepEqual(body.to, ["team@example.com", "owner@example.com"]);
    assert.equal(body.from, "CounselO Legal <consultations@example.com>");
  });
});

test("internal notifications use the authoritative regional consultation amount and currency", async () => {
  await withProviderEnvironment(async () => {
    let request: RequestInit | undefined;
    globalThis.fetch = async (_input, init) => {
      request = init;
      return new Response(JSON.stringify({ id: "category-email-id" }), { status: 200 });
    };
    for (const [region, service, title, fee] of [
      ["sa", "insolvency-restructuring", "Financial Restructuring & Bankruptcy", "SAR 500"],
      ["syr", "wills-estates", "Wills, Estates & Inheritance", "USD 60"],
      ["uae", "corporate-commercial", "Company Formation & Commercial Companies Law", "AED 450"],
    ] as const) {
      await sendConsultationEmail({ ...input, region, service }, "CON-20261118-CATEGORY");
      const body = JSON.parse(String(request?.body)) as { text: string };
      assert.ok(body.text.includes(`Practice area: ${title}`));
      assert.ok(body.text.includes(`Published consultation fee: ${fee}`));
    }
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
    assert.match(body.text, /شكراً لاختيارك كاونسلو للاستشارات القانونية/);
    assert.match(body.html, /\/logo\.png/);
    assert.match(body.html, /<img[^>]+width="80"[^>]+height="80"/);
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

test("labels UAE in both internal and customer email templates", async () => {
  await withProviderEnvironment(async () => {
    const bodies: Array<Record<string, unknown>> = [];
    globalThis.fetch = async (_input, init) => {
      bodies.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      return new Response(JSON.stringify({ id: "uae-email-id" }), { status: 200 });
    };
    const uaeInput: ContactInput = {
      ...input,
      region: "uae",
      service: "corporate-commercial",
    };
    await sendConsultationEmail(uaeInput, "CON-20260808-UAE");
    await sendCustomerConfirmationEmail(uaeInput, "CON-20260808-UAE");
    assert.match(String(bodies[0]?.text), /Region: United Arab Emirates/);
    assert.match(String(bodies[0]?.text), /counselo-uae-business/);
    assert.match(String(bodies[1]?.text), /Region: United Arab Emirates/);
    assert.match(String(bodies[1]?.html), /United Arab Emirates/);
  });
});

test("general and urgent requests stay general in staff and bilingual customer notifications", async () => {
  await withProviderEnvironment(async () => {
    const calls: { body: Record<string, unknown>; headers: Headers }[] = [];
    globalThis.fetch = async (_input, init) => {
      calls.push({ body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) });
      return new Response(JSON.stringify({ id: "general-email-id" }), { status: 200 });
    };
    for (const [region, service] of [["sa", "family-law"], ["syr", "wills-estates"], ["uae", "corporate-commercial"], ["uae", "urgent-legal-assistance"]] as const) {
      calls.length = 0;
      const general = parseContactInput({ ...input, region, service, requestIntent: "general", message: "I need drafting and representation for this matter." });
      await sendConsultationEmail(general, "CON-GENERAL");
      await sendCustomerConfirmationEmail(general, "CON-GENERAL");
      const [internal, customer] = calls.map(call => call.body);
      assert.match(String(internal.subject), /New Legal Service Request/);
      assert.match(String(internal.text), /Request type: General legal support/);
      assert.match(String(internal.text), /I need drafting and representation/);
      assert.doesNotMatch(String(internal.text), /Published consultation fee:|Consultation route:|New CounselO Legal consultation/);
      assert.match(String(customer.subject), /legal service request.*طلب الخدمة القانونية/);
      assert.match(String(customer.text), /General legal support/);
      assert.match(String(customer.html), /دعم قانوني شامل/);
      assert.match(String(customer.html), /The same CounselO team handles your online communication, legal work and representation/);
      assert.doesNotMatch(String(customer.html), /received your consultation request|تم استلام طلب الاستشارة الخاص بك/);
      for (const body of [internal, customer]) assert.equal((body.tags as { name: string }[]).some(tag => tag.name === "consultation_product"), false);
      assert.equal(calls[0].headers.get("Idempotency-Key"), "counselo-consultation/CON-GENERAL/internal");
      assert.equal(calls[1].headers.get("Idempotency-Key"), "counselo-consultation/CON-GENERAL/customer");
      assert.deepEqual(internal.to, ["team@example.com", "owner@example.com"]);
      assert.deepEqual(customer.to, [input.email]);
    }
  });
});
