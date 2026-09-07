import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { once } from "node:events";
import test from "node:test";
import express from "express";
import { PUBLIC_WORK_DOCUMENT_APPROVALS, publicWorkDocumentPath, workAttachmentPath, type PublicWorkDocumentApproval } from "@workspace/api-zod";
import { createPublicDocumentsRouter } from "./public-work-documents.js";

const data = Buffer.from("%PDF-1.4\nSynthetic acceptance fixture only\n%%EOF");
const approval: PublicWorkDocumentApproval = {
  workSlug: "approved-work", documentSlug: "approved-document",
  updatedAt: "2026-09-07T00:00:00.000Z",
  sha256: createHash("sha256").update(data).digest("hex"),
  confidentialityReviewed: true, redactionReviewed: true,
  publicationRightsConfirmed: true, indexingApproved: true,
};
const sample = {
  slug: approval.workSlug, published: true, updatedAt: approval.updatedAt,
  fileMimeType: "application/pdf", fileSize: data.length,
  fileData: data.toString("base64"), confidentialityConfirmed: true,
};

test("public PDF HTTP acceptance: approval, revocation, headers, GET, HEAD and download", async () => {
  let record: typeof sample | undefined = { ...sample };
  const app = express();
  app.use((_req, res, next) => { res.setHeader("X-Frame-Options", "DENY"); next(); });
  app.use("/api", (_req, res) => { res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive"); res.sendStatus(200); });
  app.use("/documents", createPublicDocumentsRouter(async () => record, [approval]));
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address() as { port: number };
  const base = `http://127.0.0.1:${address.port}`;
  try {
    for (const method of ["GET", "HEAD"]) {
      const response = await fetch(`${base}/documents/approved-document.pdf`, { method });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-robots-tag"), null);
      assert.equal(response.headers.get("content-type"), "application/pdf");
      assert.equal(response.headers.get("content-length"), String(data.length));
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("x-frame-options"), null);
      assert.equal(await response.text(), method === "GET" ? data.toString() : "");
    }
    const download = await fetch(`${base}/documents/approved-document.pdf?download=1`);
    assert.match(download.headers.get("content-disposition")!, /^attachment;/);
    for (const change of [undefined, { ...sample, published: false }, { ...sample, confidentialityConfirmed: false },
      { ...sample, updatedAt: "2026-09-08T00:00:00.000Z" }, { ...sample, fileData: Buffer.from("%PDF-replaced").toString("base64") },
      { ...sample, fileMimeType: "text/html" }, { ...sample, fileData: "" }]) {
      record = change;
      const response = await fetch(`${base}/documents/approved-document.pdf`);
      assert.equal(response.status, 404);
      assert.match(response.headers.get("x-robots-tag")!, /noindex/);
    }
    for (const path of ["/documents/unknown.pdf", "/documents/", "/documents/a/b.pdf"]) {
      assert.equal((await fetch(base + path)).status, 404);
    }
    assert.match((await fetch(`${base}/api/work/example/file`)).headers.get("x-robots-tag")!, /noindex/);
  } finally { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
});

test("approval is opt-in and invalid revisions or review flags fail closed", () => {
  assert.equal(publicWorkDocumentPath(sample, [approval]), "/documents/approved-document.pdf");
  assert.equal(publicWorkDocumentPath(sample, []), undefined);
  assert.equal(publicWorkDocumentPath({ ...sample, updatedAt: "invalid" }, [approval]), undefined);
  for (const field of ["confidentialityReviewed", "redactionReviewed", "publicationRightsConfirmed", "indexingApproved"] as const) {
    assert.equal(publicWorkDocumentPath(sample, [{ ...approval, [field]: false } as unknown as PublicWorkDocumentApproval]), undefined);
  }
  assert.equal(workAttachmentPath(sample), "/api/work/approved-work/file");
});

test("all configured crawlers retain API restrictions and permit documents", () => {
  const robots = readFileSync(new URL("../../../legal-site/public/robots.txt", import.meta.url), "utf8");
  const groups = robots.split(/User-agent:/).slice(1);
  assert.ok(groups.length >= 4);
  for (const group of groups) {
    assert.match(group, /Allow: \/\s/);
    assert.match(group, /Disallow: \/api\//);
    assert.doesNotMatch(group, /Disallow: \/documents/);
  }
});

test("Arabic and English production HTML link and schema use the approved public URL together", async () => {
  process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
  const { buildDynamicWorkHtml } = await import("../og-pages.js");
  const approvals = PUBLIC_WORK_DOCUMENT_APPROVALS as PublicWorkDocumentApproval[];
  approvals.push(approval);
  try {
    for (const language of ["en", "ar"] as const) {
      const html = buildDynamicWorkHtml({ ...sample,
        titleEn: "Work", titleAr: "عمل", summaryEn: "Summary", summaryAr: "ملخص",
        workTypeEn: "Review", workTypeAr: "مراجعة", jurisdictionEn: "Syria", jurisdictionAr: "سوريا",
        date: "2026-09-07",
        challengeEn: "Review scope", challengeAr: "نطاق المراجعة",
        approachEn: "Document review", approachAr: "مراجعة المستند",
        outcomeEn: "Assessment", outcomeAr: "تقييم",
      } as unknown as Parameters<typeof buildDynamicWorkHtml>[0], language);
      assert.ok(html.includes('"contentUrl":"https://counselo-legal.com/documents/approved-document.pdf"'));
      assert.ok(html.includes('href="https://counselo-legal.com/documents/approved-document.pdf"'));
      assert.ok(!html.includes("/api/work/approved-work/file"));
    }
  } finally { approvals.pop(); }
});
