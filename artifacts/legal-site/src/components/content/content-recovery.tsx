import { Link } from "wouter";

/** A temporary outage must not describe published work as nonexistent. */
export function ContentRecovery({ isArabic, retry, retrying, backHref, backLabel }: {
  isArabic: boolean;
  retry: () => void;
  retrying: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  return <div className="mx-auto my-8 max-w-3xl border border-border bg-muted/30 p-6 text-center" role="status" dir={isArabic ? "rtl" : "ltr"}>
    <p className="font-semibold">{isArabic ? "تعذّر تحميل المحتوى حالياً. أعد المحاولة." : "The content could not be loaded. Please try again."}</p>
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      <button type="button" disabled={retrying} onClick={retry} className="min-h-11 bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-60">{retrying ? (isArabic ? "جارٍ التحميل…" : "Loading…") : (isArabic ? "إعادة المحاولة" : "Try again")}</button>
      {backHref && <Link href={backHref} className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{backLabel}</Link>}
    </div>
  </div>;
}
