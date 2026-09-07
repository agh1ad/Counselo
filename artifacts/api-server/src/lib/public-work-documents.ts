import { createHash } from "node:crypto";
import { Router } from "express";
import {
  PUBLIC_WORK_DOCUMENT_APPROVALS, publicWorkDocumentPath,
  type PublicWorkDocumentApproval, type WorkDocumentMetadata,
} from "@workspace/api-zod";

type DocumentRecord = WorkDocumentMetadata & {
  fileData: string;
  confidentialityConfirmed: boolean;
};

/** Loader injection permits HTTP acceptance tests without touching production data. */
export function createPublicDocumentsRouter(
  load: (slug: string) => Promise<DocumentRecord | undefined>,
  approvals: readonly PublicWorkDocumentApproval[] = PUBLIC_WORK_DOCUMENT_APPROVALS,
) {
  const router = Router();
  router.use((_req, res, next) => {
    // Always recheck publication and approval; revoked files must not be served from cache.
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    next();
  });
  router.get("/:filename", async (req, res) => {
    const approval = approvals.find((entry) => `${entry.documentSlug}.pdf` === req.params.filename);
    if (!approval) { res.sendStatus(404); return; }
    const sample = await load(approval.workSlug);
    if (!sample?.confidentialityConfirmed || !sample.fileData ||
        publicWorkDocumentPath(sample, approvals) !== `/documents/${req.params.filename}`) {
      res.sendStatus(404); return;
    }
    const data = Buffer.from(sample.fileData, "base64");
    if (data.length !== sample.fileSize || data.subarray(0, 5).toString() !== "%PDF-" ||
        createHash("sha256").update(data).digest("hex") !== approval.sha256) {
      res.sendStatus(404); return;
    }
    res.removeHeader("X-Robots-Tag");
    res.removeHeader("X-Frame-Options");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", String(data.length));
    const disposition = req.query.download === "1" ? "attachment" : "inline";
    res.setHeader("Content-Disposition", `${disposition}; filename="${approval.documentSlug}.pdf"`);
    res.setHeader("Link", `<https://counselo-legal.com/documents/${approval.documentSlug}.pdf>; rel="canonical"`);
    res.send(data);
  });
  // Never allow an unknown document path to fall through to the HTML app shell.
  router.use((_req, res) => { res.sendStatus(404); });
  return router;
}
