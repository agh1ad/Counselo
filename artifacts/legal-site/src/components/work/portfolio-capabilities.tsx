import { useId } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { publicApiUrl } from "@/lib/public-api";
import type { WorkSamplePublic } from "@/lib/work-samples";
import { publicWorkDocumentPath } from "@workspace/api-zod/browser";
import { portfolioCapabilities } from "./portfolio-capabilities-data";
import "./portfolio-capabilities.css";

export function PortfolioCapabilities({ isArabic, samples }: { isArabic: boolean; samples: WorkSamplePublic[] }) {
  const headingId = useId();
  const locale = isArabic ? "ar" : "en";
  const base = isArabic ? "/ar/our-work" : "/our-work";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const copy = isArabic ? {
    title: "قدراتنا القانونية في أعمال منشورة",
    intro: "ملفات مختارة توضح دور فريقنا والمستندات التي درسها والعمل القانوني الذي قدمه.",
    role: "دور كاونسلو",
    documents: "المستندات التي درسناها",
    case: "اقرأ دراسة الحالة",
    document: "المستند المنشور · PDF بالعربية",
  } : {
    title: "Our capabilities, shown in published work",
    intro: "Selected files show our team’s role, the documents examined and the legal work delivered.",
    role: "CounselO’s role",
    documents: "Documents examined",
    case: "Read the case study",
    document: "Published document · Arabic PDF",
  };

  const available = portfolioCapabilities.flatMap(item => {
    const sample = samples.find(sample => sample.slug === item.slug && sample.published && (isArabic ? sample.titleAr : sample.titleEn));
    return sample ? [{ ...item, documentPath: publicWorkDocumentPath(sample) }] : [];
  });
  if (!available.length) return null;

  return <section className="portfolio-capabilities" dir={isArabic ? "rtl" : "ltr"} aria-labelledby={headingId}>
    <header className="portfolio-capabilities__intro">
      <h2 id={headingId}>{copy.title}</h2>
      <p>{copy.intro}</p>
    </header>
    <div className="portfolio-capabilities__grid">
      {available.map(item => {
        const content = item[locale];
        const casePath = `${base}/${item.slug}`;
        return <article key={item.slug} className="portfolio-capabilities__case">
          <h3><Link href={casePath}>{content.title}<Arrow size={17} aria-hidden="true" /></Link></h3>
          <p className="portfolio-capabilities__capability">{content.capability}</p>
          <dl>
            <div><dt>{copy.role}</dt><dd>{content.role}</dd></div>
            <div><dt>{copy.documents}</dt><dd>{content.documents}</dd></div>
          </dl>
          <div className="portfolio-capabilities__links">
            <Link href={casePath} aria-label={`${copy.case}: ${content.title}`}>{copy.case}<Arrow size={16} aria-hidden="true" /></Link>
            {item.documentPath && <a href={publicApiUrl(item.documentPath)} target="_blank" rel="noopener noreferrer" aria-label={`${copy.document}: ${content.title}`}><FileText size={16} aria-hidden="true" />{copy.document}</a>}
          </div>
        </article>;
      })}
    </div>
  </section>;
}
