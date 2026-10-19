import { ReadingDetails } from "./reading-details";
import { SAUDI_REVIEW_WORKSHEETS, saudiWorksheetPath } from "@/lib/saudi-review-worksheets";

export function SaudiReviewWorksheet({ service, language, additionalDocuments = [], headingId = "documents-heading" }: {
  service: string;
  language: "ar" | "en";
  additionalDocuments?: string[];
  headingId?: string;
}) {
  const worksheet = SAUDI_REVIEW_WORKSHEETS[service]?.[language];
  if (!worksheet) return null;
  const ar = language === "ar";
  return <section className="service-content-band mb-16 min-w-0 border border-[#0d4a31]/14 bg-[#eef4f0] p-6 lg:p-8" aria-labelledby={headingId} data-saudi-review-worksheet={service}>
    <h2 id={headingId} className="mb-4 scroll-mt-36 font-serif text-3xl">{worksheet.title}</h2>
    <p className="mb-5 leading-7 text-muted-foreground">{ar
      ? "املأ ما تعرفه واترك الباقي فارغاً. التنزيل لا يرسل بياناتك ولا ينشئ طلباً."
      : "Complete what you know; leave the rest blank. Downloading does not send your data or create a request."}</p>
    <a href={saudiWorksheetPath(service, language)} download className="mb-6 inline-flex max-w-full items-center rounded-sm border border-primary bg-white px-5 py-3 font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
      <span aria-hidden="true">↓</span>{ar ? "تنزيل قائمة التحضير" : "Download checklist"}
    </a>
    <ReadingDetails title={ar ? "الأسئلة والمخرج والرسوم" : "Questions, output and fees"}>
    <dl className="divide-y divide-primary/15 border-y border-primary/15">
      {worksheet.records.map(record => <div key={record.label} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-5">
        <dt className="min-w-0 font-semibold">{record.label}</dt>
        <dd className="min-w-0 leading-7 text-muted-foreground">{record.prompt}</dd>
      </div>)}
    </dl>
    <h3 className="mb-3 mt-6 font-serif text-xl">{ar ? "المخرج بحسب النطاق المتفق عليه" : "Output within the agreed scope"}</h3>
    <ul className="list-disc space-y-2 ps-5 leading-7 text-muted-foreground">{worksheet.outputs.map(output => <li key={output}>{output}</li>)}</ul>
    <p className="mt-5 leading-7"><strong>{ar ? "عوامل الأتعاب: " : "Fee factors: "}</strong>{worksheet.feeFactors}</p>

    {additionalDocuments.length > 0 && <details className="mt-5 border-t border-primary/15 pt-4">
      <summary className="cursor-pointer font-semibold">{ar ? "مستندات إضافية" : "Additional documents"}</summary>
      <ul className="mt-3 list-disc space-y-2 ps-5 leading-7 text-muted-foreground">{additionalDocuments.map(document => <li key={document}>{document}</li>)}</ul>
    </details>}
    </ReadingDetails>
    <p className="mt-4 border-s-2 border-[#b4924a] ps-4 text-sm leading-7 text-muted-foreground">{worksheet.boundary}</p>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">{ar ? "أداة تحضير، لا رأي قانوني أو مستند للإيداع. اتفق على وسيلة النقل قبل مشاركة ملفك." : "Preparation aid, not legal advice or a filing document. Agree on a transfer method before sharing your file."}</p>
  </section>;
}
