import { Link } from "wouter";
import { BriefcaseBusiness, ArrowRight, UsersRound, House, Handshake, Globe2, Landmark, Plus } from "lucide-react";
import { getServicesForRegion, type Region } from "@workspace/api-zod/browser";
import "./practice-directory.css";

const directoryIcons = [UsersRound, BriefcaseBusiness, House, Handshake, Globe2, Landmark];
const directoryDescriptions = {
  en: ["Marriage, separation and family rights", "Trade, business relationships and disputes", "Ownership, leases and property disputes", "Workplace rights, contracts and claims", "Market entry and investment structures", "Public authorities and regulatory decisions"],
  ar: ["الزواج والانفصال والحقوق الأسرية", "التجارة والعلاقات والمنازعات التجارية", "الملكية والإيجارات والمنازعات العقارية", "حقوق العمل والعقود والمطالبات", "دخول الأسواق وهياكل الاستثمار", "الجهات العامة والقرارات التنظيمية"],
};

export function PracticeDirectory({ region, isArabic, variant }: { region?: Region; isArabic: boolean; variant?: "home" }) {
  const regions: Region[] = region ? [region] : ["sa", "syr", "uae"];
  const labels = isArabic ? { sa: "السعودية", syr: "سوريا", uae: "الإمارات" } : { sa: "Saudi Arabia", syr: "Syria", uae: "UAE" };
  const groups = new Map<string, { title: string; links: { region: Region; slug: string }[] }>();
  for (const r of regions) for (const service of getServicesForRegion(r)) {
    if (service.kind === "priority-intake") continue;
    const key = region ? service.slug : service.clusterSlug;
    if (!groups.has(key)) groups.set(key, { title: isArabic ? service.titleAr : service.titleEn, links: [] });
    groups.get(key)!.links.push({ region: r, slug: service.slug });
  }
  if (variant === "home" && region) {
    const featured = ["family-law", "business-law", "real-estate", "employment-law", "foreign-investment", "administrative-law"];
    const definitions = getServicesForRegion(region);
    const entries = [...groups].sort(([a], [b]) => {
      const score = (slug: string) => { const index = featured.indexOf(definitions.find(s => s.slug === slug)!.clusterSlug); return index < 0 ? 99 : index; };
      return score(a) - score(b);
    });
    const prefix = `/${region}${isArabic ? "/ar" : ""}/services`;
    return <section className="practice-directory sa-home-practices" aria-labelledby="all-practices-title" dir={isArabic ? "rtl" : "ltr"}>
      <div className="sa-home-practices__heading">
        <div><p className="sa-home-practices__eyebrow">{isArabic ? "خدماتنا القانونية" : "Our legal services"}</p><h2 id="all-practices-title">{isArabic ? "خبرة قانونية لحياتك وأعمالك." : "Legal expertise for life and business."}</h2></div>
        <Link className="sa-home-practices__all" href={prefix}>{isArabic ? "دليل الخدمات" : "Service directory"}<ArrowRight aria-hidden="true" size={18} /></Link>
      </div>
      <ul className="sa-home-practices__grid">{entries.slice(0,6).map(([key,item], index) => {
        const Icon = directoryIcons[index];
        return <li key={key}><Link href={`${prefix}/${item.links[0].slug}`}>
          <span className="sa-practice-icon"><Icon size={26} aria-hidden="true" /></span>
          <div className="sa-practice-copy"><h3>{item.title}</h3><span>{item.links[0].slug === "corporate-commercial" ? (isArabic ? "تأسيس الشركات والملكية والحوكمة" : "Company formation, ownership and governance") : directoryDescriptions[isArabic ? "ar" : "en"][index]}</span></div>
          <ArrowRight className="sa-practice-arrow" size={18} aria-hidden="true" />
        </Link></li>;
      })}</ul>
      <details className="sa-home-practices__more">
        <summary><span>{isArabic ? `استكشف جميع المجالات القانونية (${entries.length})` : `Explore all ${entries.length} practice areas`}</span><Plus size={20} aria-hidden="true" /></summary>
        <ul>{entries.slice(6).map(([key,item]) => <li key={key}><Link href={`${prefix}/${item.links[0].slug}`}><span>{item.title}</span><ArrowRight size={18} aria-hidden="true" /></Link></li>)}</ul>
      </details>
      <Link className="sa-home-practices__urgent" href={`${prefix}/urgent-legal-assistance`}>{isArabic ? "مهلة قريبة؟ احصل على مساعدة قانونية عاجلة" : "A deadline approaching? Get urgent legal assistance"}<ArrowRight size={18} aria-hidden="true" /></Link>
    </section>;
  }
  if (variant === "home" && !region) {
    const entries = [...groups];
    const renderPractice = ([key, item]: typeof entries[number], index: number) => {
      const Icon = directoryIcons[index] ?? BriefcaseBusiness;
      return <li key={key}>
        <div className="home-practice-title"><span className="home-practice-icon"><Icon aria-hidden="true" size={25} /></span><h3>{item.title}</h3></div>
        {index < 6 && <p>{directoryDescriptions[isArabic ? "ar" : "en"][index]}</p>}
        <div className="home-practice-countries">{item.links.map(link => <Link key={link.region} aria-label={`${item.title} — ${labels[link.region]}`} href={`/${link.region}${isArabic ? "/ar" : ""}/services/${link.slug}`}>{labels[link.region]}</Link>)}</div>
      </li>;
    };
    return <section className="practice-directory home-practice-directory" aria-labelledby="all-practices-title" dir={isArabic ? "rtl" : "ltr"}>
      <div className="home-directory-heading"><div><p className="home-directory-eyebrow">{isArabic ? "خدماتنا القانونية" : "Our legal services"}</p><h2 id="all-practices-title">{isArabic ? "خدمات متخصصة.\nلكل مسألة قانونية." : "Focused expertise.\nFor every legal priority."}</h2></div><p>{isArabic ? "اختر المجال القانوني، ثم الدولة المعنية، للاطلاع على الخدمة وما يشمله العمل." : "Choose your practice area, then the relevant country to explore the service and scope of work."}</p></div>
      <ul className="home-practice-grid">{entries.slice(0,6).map(renderPractice)}</ul>
      <details className="home-directory-more"><summary><span>{isArabic ? `استكشف جميع المجالات القانونية (${entries.length})` : `Explore all ${entries.length} practice areas`}</span><Plus size={20} aria-hidden="true" /></summary><ul className="home-practice-grid">{entries.slice(6).map((entry,index) => renderPractice(entry,index+6))}</ul></details>
    </section>;
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
