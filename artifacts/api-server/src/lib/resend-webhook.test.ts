import assert from "node:assert/strict";
import test from "node:test";

process.env.DATABASE_URL ??=
  "postgresql://postgres:postgres@127.0.0.1:5432/counselo_test";

const { nextDeliveryStatus, resendEventStatus } = await import(
  "./resend-webhook.js"
);

test("maps outbound Resend events without accepting unrelated webhooks", () => {
  assert.equal(resendEventStatus("email.sent"), "sent");
  assert.equal(resendEventStatus("email.delivery_delayed"), "delivery_delayed");
  assert.equal(resendEventStatus("email.delivered"), "delivered");
  assert.equal(resendEventStatus("email.bounced"), "bounced");
  assert.equal(resendEventStatus("email.received"), null);
  assert.equal(resendEventStatus("contact.created"), null);
});

test("out-of-order webhook retries cannot regress a terminal status", () => {
  assert.equal(nextDeliveryStatus("delivered", "sent"), "delivered");
  assert.equal(nextDeliveryStatus("opened", "delivered"), "opened");
  assert.equal(nextDeliveryStatus("sent", "delivered"), "delivered");
  assert.equal(nextDeliveryStatus("delivered", "bounced"), "bounced");
});
