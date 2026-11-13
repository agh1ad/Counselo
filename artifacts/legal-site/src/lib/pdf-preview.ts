export const PDF_PREVIEW_CHECK_TIMEOUT_MS = 8_000;

/** Check the public document route without downloading the PDF twice. A 200
 * HTML fallback must never be embedded as though it were a legal document. */
export async function verifyPdfPreview(
  url: string,
  options: { signal?: AbortSignal; timeoutMs?: number; fetcher?: typeof fetch } = {},
): Promise<void> {
  const controller = new AbortController();
  const cancel = () => controller.abort(options.signal?.reason);
  if (options.signal?.aborted) cancel();
  else options.signal?.addEventListener("abort", cancel, { once: true });
  const timer = setTimeout(
    () => controller.abort(new DOMException("Document preview check timed out", "TimeoutError")),
    options.timeoutMs ?? PDF_PREVIEW_CHECK_TIMEOUT_MS,
  );
  try {
    const response = await (options.fetcher ?? fetch)(url, {
      method: "HEAD",
      headers: { Accept: "application/pdf" },
      cache: "no-store",
      signal: controller.signal,
    });
    const mime = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
    if (!response.ok || mime !== "application/pdf") {
      throw new Error("The document preview is unavailable.");
    }
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", cancel);
  }
}
