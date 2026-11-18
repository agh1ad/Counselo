import express from "express";
import { createHash } from "node:crypto";
import type { Plugin } from "vite";
import { publicWorkDocumentPath, publicWorkDocumentTextPath } from "../../../lib/api-zod/src/public-work-documents";
import { PUBLIC_WORK_DOCUMENT_TEXTS } from "../../api-server/src/lib/public-work-document-texts";
import { resolveWorkDocumentRevision } from "../../api-server/src/lib/work-document-revisions";

const PUBLISHED_ORIGIN = "https://counselo-legal.com";

/** Same-origin preview of currently published documents; no private API or database access. */
export function publicDocumentsPreviewPlugin(): Plugin {
  return {
    name: "public-documents-preview",
    configureServer(server) {
      const preview = express();
      preview.use((_req, res, next) => {
        res.set("Cache-Control", "no-store");
        res.set("X-Robots-Tag", "noindex");
        next();
      });
      preview.get("/documents/:filename", async (req, res) => {
        const filename = req.params.filename;
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:pdf|txt)$/.test(filename)) { res.sendStatus(404); return; }
        const slug = filename.slice(0, -4);
        const metadata = await fetch(`${PUBLISHED_ORIGIN}/api/work/${encodeURIComponent(slug)}`, { signal: AbortSignal.timeout(30_000) });
        if (metadata.status === 404 || metadata.status === 410) { res.sendStatus(404); return; }
        if (!metadata.ok) throw new Error("Published document metadata unavailable");
        const sample = await metadata.json();
        const pdfPath = publicWorkDocumentPath(sample);
        if (pdfPath !== `/documents/${slug}.pdf`) { res.sendStatus(404); return; }
        const file = await fetch(`${PUBLISHED_ORIGIN}/api/work/${encodeURIComponent(slug)}/file`, { signal: AbortSignal.timeout(30_000) });
        if (file.status === 404 || file.status === 410) { res.sendStatus(404); return; }
        if (!file.ok) throw new Error("Published document unavailable");
        const bytes = Buffer.from(await file.arrayBuffer());
        if (bytes.length !== sample.fileSize || bytes.subarray(0, 5).toString("ascii") !== "%PDF-") { res.sendStatus(404); return; }
        const isText = filename.endsWith(".txt");
        const sourceSHA256 = createHash("sha256").update(bytes).digest("hex");
        const revision = resolveWorkDocumentRevision(sample, sourceSHA256);
        const source = isText && !revision ? PUBLIC_WORK_DOCUMENT_TEXTS.find(entry => entry.slug === slug) : undefined;
        let body = revision ? (isText ? revision.text : revision.pdf) : bytes;
        if (isText && !revision) {
          // Once this edition is deployed, the live API describes its revised bytes.
          if (sample.documentEdition && publicWorkDocumentTextPath(sample) === `/documents/${filename}`) {
            const text = await fetch(`${PUBLISHED_ORIGIN}/documents/${filename}`, { signal: AbortSignal.timeout(30_000) });
            if (!text.ok || !text.headers.get("content-type")?.startsWith("text/plain")) { res.sendStatus(404); return; }
            body = Buffer.from(await text.arrayBuffer());
            if (!body.toString("utf8").trim()) { res.sendStatus(404); return; }
          } else {
            if (!source || !source.text.trim() || publicWorkDocumentTextPath(sample) !== `/documents/${filename}` ||
                sourceSHA256 !== source.sourceSHA256) { res.sendStatus(404); return; }
            body = Buffer.from(source.text, "utf8");
          }
        }
        res.set("Content-Type", isText ? "text/plain; charset=utf-8" : "application/pdf");
        res.set("Content-Length", String(body.length));
        res.set("Content-Disposition", `${req.query.download === "1" ? "attachment" : "inline"}; filename="${filename}"`);
        res.set("Content-Security-Policy", "frame-ancestors 'self'");
        res.set("X-Content-Type-Options", "nosniff");
        res.set("Link", `<${PUBLISHED_ORIGIN}${pdfPath}>; rel="canonical"`);
        const language = revision?.metadata.documentLanguage ?? source?.language ?? sample.documentLanguage;
        if (language) res.set("Content-Language", language === "bilingual" ? "ar, en" : language);
        if (revision) res.set("Last-Modified", new Date(revision.metadata.editionPublishedAt).toUTCString());
        res.send(body);
      });
      preview.use((_req, res) => { res.sendStatus(404); });
      preview.use((_error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        res.status(503).set("Cache-Control", "no-store").set("X-Robots-Tag", "noindex").type("text/plain").send("Published document temporarily unavailable.");
      });
      server.middlewares.use((req, res, next) => {
        if (!/^\/documents(?:\/|\?|$)/.test(req.url ?? "")) { next(); return; }
        preview(req, res, next);
      });
    },
  };
}
