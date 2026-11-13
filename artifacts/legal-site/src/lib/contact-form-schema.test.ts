import assert from "node:assert/strict";
import test from "node:test";
import { createContactFormSchema } from "../components/contact/contact-form-schema";

const valid = {
  name: "  Ahmed Ali  ", email: "  ahmed@example.com  ", phone: "+٩٦٦٥٥٠٠٠١٢٣٤",
  service: "business-law", message: "  Please review my commercial agreement.  ",
};

test("contact validation accepts Arabic phone entry and trims fields before sending", () => {
  for (const isArabic of [true, false]) {
    const result = createContactFormSchema(isArabic).parse(valid);
    assert.equal(result.phone, "+966550001234");
    assert.equal(result.name, "Ahmed Ali");
    assert.equal(result.email, "ahmed@example.com");
    assert.equal(createContactFormSchema(isArabic).parse({ ...valid, phone: "+۹۶۶۵۵۰۰۰۱۲۳۴" }).phone, "+966550001234");
  }
});

test("contact validation catches blank, malformed and overlong values before submission", () => {
  for (const isArabic of [true, false]) {
    const schema = createContactFormSchema(isArabic);
    for (const values of [
      { name: "   " }, { name: "a".repeat(121) }, { phone: "not-a-phone-number" }, { phone: "+........1" }, { phone: "1234567890123456" },
      { message: "          " }, { message: "a".repeat(5001) }, { email: "not-an-email" },
      { name: "Ahmed\u0000Ali" }, { message: "A legal matter\u0000 with an invalid character" },
    ]) {
      assert.equal(schema.safeParse({ ...valid, ...values }).success, false);
    }
  }
});

test("contact service selection is checked against the current jurisdiction and multiline matters remain valid", () => {
  for (const isArabic of [true, false]) {
    const schema = createContactFormSchema(isArabic, ["business-law", "employment-law"]);
    assert.equal(schema.safeParse({ ...valid, service: "a-service-from-another-region" }).success, false);
    assert.equal(schema.safeParse({ ...valid, message: "First factual event.\nSecond factual event.\tPlease advise." }).success, true);
    assert.equal(createContactFormSchema(isArabic, []).safeParse(valid).success, false);
  }
});
