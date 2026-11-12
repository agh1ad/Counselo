import { createHash } from "node:crypto";
import { Router, type RequestHandler } from "express";
import {
  publicWorkDocumentPath, publicWorkDocumentTextPath, type WorkDocumentMetadata,
} from "@workspace/api-zod";
import { PUBLIC_WORK_DOCUMENT_TEXTS, type PublicWorkDocumentText } from "./public-work-document-texts.js";

export type DocumentRecord = WorkDocumentMetadata & {
  fileData: string;
};

function publishedPdfData(sample: DocumentRecord): Buffer | undefined {
  if (!publicWorkDocumentPath(sample) || !sample.fileData) return undefined;
  const data = Buffer.from(sample.fileData, "base64");
  return data.length === sample.fileSize && data.subarray(0, 5).toString("ascii") === "%PDF-" ? data : undefined;
}

/** Loader injection permits HTTP acceptance tests without touching production data. */
export function createPublicDocumentsRouter(
  load: (slug: string) => Promise<DocumentRecord | undefined>,
  textAlternatives: readonly PublicWorkDocumentText[] = PUBLIC_WORK_DOCUMENT_TEXTS,
) {
  const router = Router();
  router.use((_req, res, next) => {
    // Recheck publication and bytes on every request, including after a file is replaced or unpublished.
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    next();
  });
  router.get("/:filename", async (req, res) => {
    const filename = String(req.params.filename ?? "");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:pdf|txt)$/.test(filename)) { res.sendStatus(404); return; }
    const isText = filename.endsWith(".txt");
    const sample = await load(filename.slice(0, -4));
    const pdfPath = sample ? publicWorkDocumentPath(sample) : undefined;
    if (!sample || pdfPath !== `/documents/${filename.slice(0, -4)}.pdf`) {
      res.sendStatus(404); return;
    }
    const data = publishedPdfData(sample);
    if (!data) { res.sendStatus(404); return; }
    const textSource = isText ? textAlternatives.find(entry => entry.slug === sample.slug) : undefined;
    if (isText && (!textSource || publicWorkDocumentTextPath(sample, textAlternatives) !== `/documents/${filename}` ||
        !textSource.text.trim() || createHash("sha256").update(data).digest("hex") !== textSource.sourceSHA256)) {
      res.sendStatus(404); return;
    }
    const responseData = textSource ? Buffer.from(textSource.text, "utf8") : data;
    res.removeHeader("X-Robots-Tag");
    res.removeHeader("X-Frame-Options");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Content-Type", isText ? "text/plain; charset=utf-8" : "application/pdf");
    res.setHeader("Content-Length", String(responseData.length));
    if (textSource) res.setHeader("Content-Language", textSource.language);
    const disposition = req.query.download === "1" ? "attachment" : "inline";
    res.setHeader("Content-Disposition", `${disposition}; filename="${filename}"`);
    res.setHeader("Link", `<https://counselo-legal.com${pdfPath}>; rel="canonical"`);
    res.send(responseData);
  });
  // Never allow an unknown document path to fall through to the HTML app shell.
  router.use((_req, res) => { res.sendStatus(404); });
  return router;
}

/** Preserve existing attachment URLs while giving PDFs one crawlable canonical location. */
export function createWorkAttachmentHandler(
  load: (slug: string) => Promise<(DocumentRecord & { fileName: string }) | undefined>,
): RequestHandler {
  return async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    const sample = await load(String(req.params.slug ?? ""));
    if (!sample?.published || !sample.fileData) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (sample.fileMimeType === "application/pdf") {
      const canonical = publicWorkDocumentPath(sample);
      if (!canonical || !publishedPdfData(sample)) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.removeHeader("X-Robots-Tag");
      res.redirect(301, `${canonical}${req.query.download === "1" ? "?download=1" : ""}`);
      return;
    }
    const data = Buffer.from(sample.fileData, "base64");
    res.removeHeader("X-Frame-Options");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
    res.setHeader("Content-Type", sample.fileMimeType);
    res.setHeader("Content-Length", String(data.length));
    const disposition = req.query.download === "1" ? "attachment" : "inline";
    res.setHeader("Content-Disposition", `${disposition}; filename*=UTF-8''${encodeURIComponent(sample.fileName)}`);
    res.send(data);
  };
}
