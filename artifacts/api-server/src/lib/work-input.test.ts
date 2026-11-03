import assert from "node:assert/strict";
import test from "node:test";
import { parseWorkSampleInput, WorkInputError } from "./work-input.js";

const base = {
  slug: "commercial-contract-sample",
  date: "2026-07-21",
  titleEn: "Commercial Contract Drafting Sample",
  summaryEn: "A redacted commercial agreement prepared to define responsibilities, payment terms, risk allocation, and dispute procedures.",
  workTypeEn: "Contract drafting",
  jurisdictionEn: "Cross-border commercial law",
  challengeEn: "The parties needed clear risk allocation and performance obligations.",
  approachEn: "CounselO Legal structured the agreement, defined deliverables, and drafted practical remedies.",
  documentLanguage: "en",
  published: false,
};

const bilingualPublishedBase = {
  ...base,
  titleAr: "نموذج صياغة العقود التجارية",
  summaryAr: "اتفاقية تجارية منقحة لتحديد المسؤوليات وشروط الدفع وتوزيع المخاطر وإجراءات تسوية النزاعات.",
  workTypeAr: "صياغة العقود",
  jurisdictionAr: "القانون التجاري عبر الحدود",
  challengeAr: "احتاج الطرفان إلى تحديد واضح للمخاطر والتزامات الأداء.",
  approachAr: "نظمت كاونسلو الاتفاقية وحددت الالتزامات وصاغت سبل معالجة عملية.",
  seoTitleEn: "Commercial Contract Drafting Sample | CounselO",
  seoTitleAr: "نموذج صياغة العقود التجارية | كاونسلو",
  seoDescriptionEn:
    "See how a redacted commercial agreement set out responsibilities, payment terms, risk allocation, and practical dispute procedures for the parties.",
  seoDescriptionAr:
    "تعرّف على كيفية تحديد اتفاقية تجارية منقحة للمسؤوليات وشروط الدفع وتوزيع المخاطر وإجراءات عملية لتسوية النزاعات بين الطرفين.",
  documentLanguage: "bilingual",
};

test("allows a work sample draft without uploading a public document", () => {
  const result = parseWorkSampleInput(base);
  assert.equal(result.published, false);
  assert.equal(result.fileData, "");
});

test("accepts a redacted PDF only after confidentiality confirmation", () => {
  const fileData = Buffer.from("%PDF-1.4\n%%EOF").toString("base64");
  const result = parseWorkSampleInput({
    ...bilingualPublishedBase,
    published: true,
    confidentialityConfirmed: true,
    fileName: "redacted-contract.pdf",
    fileMimeType: "application/pdf",
    fileData,
  });
  assert.equal(result.published, true);
  assert.equal(result.fileSize, 14);
});

test("blocks publication when a required Arabic translation is missing", () => {
  const fileData = Buffer.from("%PDF-1.4\n%%EOF").toString("base64");
  assert.throws(
    () => parseWorkSampleInput({
      ...bilingualPublishedBase,
      titleAr: "",
      published: true,
      confidentialityConfirmed: true,
      fileName: "redacted-contract.pdf",
      fileMimeType: "application/pdf",
      fileData,
    }),
    /all required fields in English and Arabic/,
  );
});

test("blocks publication when the Arabic version repeats English copy", () => {
  const fileData = Buffer.from("%PDF-1.4\n%%EOF").toString("base64");
  assert.throws(
    () => parseWorkSampleInput({
      ...bilingualPublishedBase,
      summaryAr: bilingualPublishedBase.summaryEn,
      published: true,
      confidentialityConfirmed: true,
      fileName: "redacted-contract.pdf",
      fileMimeType: "application/pdf",
      fileData,
    }),
    /complete, distinct English and Arabic content/,
  );
});

test("blocks publication without redaction confirmation or with a disguised file", () => {
  const fileData = Buffer.from("%PDF-1.4\n%%EOF").toString("base64");
  assert.throws(
    () => parseWorkSampleInput({ ...base, published: true, fileName: "sample.pdf", fileMimeType: "application/pdf", fileData }),
    /Confirm confidentiality/,
  );
  assert.throws(
    () => parseWorkSampleInput({ ...base, fileName: "fake.png", fileMimeType: "image/png", fileData }),
    WorkInputError,
  );
});
