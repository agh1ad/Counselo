import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PlatformFacts } from "@/components/legal/platform-facts";
import "./published-work-evidence.css";

// Selected from the published Our Work records and their attached case studies.
// Describe the work performed; the linked records retain their evidence and outcome context.
const examples = [
  {
    slug: "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh",
    en: ["Commercial contract review", "Risk assessment, negotiating positions and revised terms covering commissions, liability and termination."],
    ar: ["مراجعة العقود التجارية", "تحليل المخاطر وبناء موقف تفاوضي وتعديل شروط العمولة والمسؤولية والإنهاء."],
  },
  {
    slug: "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal",
    en: ["Defence in a Saudi commercial claim", "Analysis of a commission undertaking, payment conditions and the evidence supporting the amount claimed."],
    ar: ["الدفاع في مطالبة تجارية سعودية", "تحليل خطاب الالتزام بالعمولة وشروط السداد والأدلة المؤيدة للمبالغ المطالب بها."],
  },
  {
    slug: "msandh-kawnslw-fy-qdyh-aabrh-llhdwd",
    en: ["A dispute across Saudi Arabia and Bahrain", "Document analysis, claims strategy and coordination with the local legal representative."],
    ar: ["نزاع بين السعودية والبحرين", "تحليل المستندات وبناء استراتيجية المطالبة والتنسيق مع الممثل القانوني المحلي."],
  },
] as const;

export function PublishedWorkEvidence({ isArabic }: { isArabic: boolean }) {
  const base = isArabic ? "/ar/our-work" : "/our-work";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  return <section className="published-work-evidence" aria-labelledby="published-work-evidence-title">
    <div className="published-work-evidence__intro">
      <div>
        <p className="published-work-evidence__eyebrow">{isArabic ? "من ملفات أعمالنا المنشورة" : "From our published work"}</p>
        <h2 id="published-work-evidence-title">{isArabic ? "خبرة تظهر في العمل الذي نقدمه." : "Legal experience you can examine."}</h2>
        <p>{isArabic ? "اطّلع على دراسات قضايا ومراجعات عقود تُبيّن كيف نحلل الملفات ونبني الاستراتيجية ونعدّ العمل القانوني. لكل دراسة سياقها والمستند المنشور الذي يشرحها." : "Explore case studies and contract reviews showing how we analyse files, develop strategy and prepare legal work. Each study sets out its context and includes the published supporting document."}</p>
      </div>
      <Link href={base} className="published-work-evidence__all">{isArabic ? "استعرض أعمالنا" : "Explore Our Work"}<Arrow size={18} aria-hidden="true" /></Link>
    </div>
    <PlatformFacts isArabic={isArabic} embedded />
    <div className="published-work-evidence__examples">{examples.map(example => {
      const [title, description] = example[isArabic ? "ar" : "en"];
      return <article key={example.slug}><h3><Link href={`${base}/${example.slug}`}>{title}<Arrow size={16} aria-hidden="true" /></Link></h3><p>{description}</p></article>;
    })}</div>
  </section>;
}
