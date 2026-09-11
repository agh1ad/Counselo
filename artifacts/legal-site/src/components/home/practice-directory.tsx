import { Link } from "wouter";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";
import { getServicesForRegion, type Region } from "@workspace/api-zod/browser";
import "./practice-directory.css";

export function PracticeDirectory({ region, isArabic }: { region?: Region; isArabic: boolean }) {
  const regions: Region[] = region ? [region] : ["sa", "syr", "uae"];
  const labels = isArabic ? { sa: "السعودية", syr: "سوريا", uae: "الإمارات" } : { sa: "Saudi Arabia", syr: "Syria", uae: "UAE" };
  const groups = new Map<string, { title: string; links: { region: Region; slug: string }[] }>();
  for (const r of regions) for (const service of getServicesForRegion(r)) {
    if (service.kind === "priority-intake") continue;
    const key = region ? service.slug : service.clusterSlug;
    if (!groups.has(key)) groups.set(key, { title: isArabic ? service.titleAr : service.titleEn, links: [] });
    groups.get(key)!.links.push({ region: r, slug: service.slug });
  }
  return <section className="practice-directory" aria-labelledby="all-practices-title" dir={isArabic ? "rtl" : "ltr"}>
    <h2 id="all-practices-title"><BriefcaseBusiness aria-hidden="true" /><span>{region
      ? (isArabic ? `مجالات الاستشارة القانونية في ${labels[region]}` : `Legal practice areas in ${labels[region]}`)
      : (isArabic ? "خدمات قانونية للأفراد والشركات" : "Legal services for individuals and businesses")}</span></h2>
    <p>{isArabic ? "اختر مجال مسألتك للاطلاع على نطاق الخدمة والمستندات والخطوات ذات الصلة. يُحدد التمثيل أمام المحاكم والأعمال المحلية المنظمة بتكليف مستقل." : "Choose your legal issue to explore the service scope, relevant documents and next steps. Court representation and regulated local work require a separate engagement."}</p>
    <ul>{[...groups].map(([key, item]) => <li key={key}>
      {region ? <Link href={`/${region}${isArabic ? "/ar" : ""}/services/${item.links[0].slug}`}><span>{item.title}</span><ArrowRight aria-hidden="true" /></Link>
        : <><h3>{item.title}</h3><div>{item.links.map(link => <Link key={link.region} aria-label={`${item.title} — ${labels[link.region]}`} href={`/${link.region}${isArabic ? "/ar" : ""}/services/${link.slug}`}>{labels[link.region]}</Link>)}</div></>}
    </li>)}</ul>
    <Link className="practice-urgent" href={region ? `/${region}${isArabic ? "/ar" : ""}/services/urgent-legal-assistance` : `${isArabic ? "/ar" : ""}/urgent-legal-assistance`}>{isArabic ? "هل تواجه مهلة قريبة؟ اطلب مساعدة قانونية عاجلة" : "Facing a deadline? Request urgent legal assistance"}<ArrowRight aria-hidden="true" /></Link>
  </section>;
}
