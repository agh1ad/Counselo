import { useEffect, useState } from "react";
import { verifyPdfPreview } from "@/lib/pdf-preview";

/** The preview starts automatically. The parent keys this component by URL so
 * navigation cannot display an old document or an old request's error. */
export function PdfDocumentPreview({ src, title, isArabic }: { src: string; title: string; isArabic: boolean }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");
    void verifyPdfPreview(src, { signal: controller.signal }).then(
      () => { if (!controller.signal.aborted) setState("ready"); },
      () => { if (!controller.signal.aborted) setState("error"); },
    );
    return () => controller.abort();
  }, [src, attempt]);

  if (state === "ready") {
    return <iframe src={src} title={title} className="w-full h-full" onError={() => setState("error")} />;
  }
  return <div className="w-full p-6 text-center" aria-busy={state === "loading"}>
    {state === "loading" ? <p role="status" className="text-sm text-muted-foreground">{isArabic ? "جارٍ تحميل معاينة المستند…" : "Loading document preview…"}</p> : <>
      <p role="alert" className="text-sm leading-relaxed mb-4">{isArabic ? "تعذّر تحميل معاينة المستند. أعد المحاولة أو استخدم روابط الفتح والتنزيل أدناه." : "We couldn’t load this document preview. Retry, or use the open and download links below."}</p>
      <button type="button" className="border border-border bg-background px-4 py-2 min-h-11 font-semibold hover:bg-muted" onClick={() => { setState("loading"); setAttempt(value => value + 1); }}>{isArabic ? "إعادة المحاولة" : "Retry preview"}</button>
    </>}
  </div>;
}
