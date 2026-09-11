import { regionalServiceDirectoryEntity, COUNSELO_ORGANIZATION } from "@workspace/api-zod/browser";
import { searchIntentMeta } from "@/lib/search-intent-copy";
import { serviceDirectoryContent } from "@/components/home/service-directory-content";
import { homepageContent } from "@/components/home/homepage-content";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";
import * as m from "framer-motion/m";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeDollarSign,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  Gavel,
  Globe2,
  Handshake,
  HeartHandshake,
  Home as HomeIcon,
  Landmark,
  Laptop,
  Scale,
  Shield,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

import { SERVICE_INTAKE_CONTENT } from "@/lib/service-intake-content";

const serviceIcons: Record<string, LucideIcon> = {
  "family-law": Users,
  "business-law": BriefcaseBusiness,
  "real-estate": HomeIcon,
  "employment-law": Handshake,
  "foreign-investment": Globe2,
  "administrative-law": Landmark,
  arbitration: Scale,
  enforcement: Gavel,
  "companies-law": Building2,
  contracts: FileCheck2,
  "criminal-law": Shield,
  "banking-finance": Banknote,
  "intellectual-property": BookOpen,
  "tax-zakat": BadgeDollarSign,
  "cyber-law": Laptop,
  "medical-malpractice": Stethoscope,
  "insurance-law": ShieldCheck,
};

export default function Services() {
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const s = t.services;
  const copy = serviceDirectoryContent[region][isRTL ? "ar" : "en"];
  const common = homepageContent[isRTL ? "ar" : "en"];

  const country = region === "uae"
    ? (isRTL ? "الإمارات العربية المتحدة" : "the United Arab Emirates")
    : region === "syr" ? (isRTL ? "سوريا" : "Syria") : (isRTL ? "السعودية" : "Saudi Arabia");
  const areaCount = s.items.length;
  const serviceIndexById = new Map(s.items.map((item, index) => [item.id, index]));
  const itemsPerColumn = Math.ceil(areaCount / 3);
  const serviceColumns = Array.from({ length: 3 }, (_, column) =>
    s.items.slice(column * itemsPerColumn, (column + 1) * itemsPerColumn),
  ).filter((column) => column.length > 0);

  const directoryMeta = searchIntentMeta(`${regionPrefix}/services`)!;
  const seoTitle = directoryMeta.title;
  const seoDesc = directoryMeta.description;

  const baseUrl = `https://counselo-legal.com/${region}${isRTL ? "/ar" : ""}`;
  const servicesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${baseUrl}/services#webpage`,
      "description": seoDesc,
      "mainEntity": { "@id": `${baseUrl}/services#service-list` },
      "name": seoTitle,
      "inLanguage": isRTL ? "ar" : "en",
      "url": `${baseUrl}/services`,
      "about": { "@id": `https://counselo-legal.com/#${region}-service-directory` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/services#service-list`,
      "name": region === "uae"
        ? (isRTL ? `${areaCount} خدمة قانونية — كاونسلو الإمارات` : `${areaCount} Legal Services — CounselO UAE`)
        : region === "syr"
        ? (isRTL ? `${areaCount} خدمة قانونية — كاونسلو سوريا` : `${areaCount} Legal Services — CounselO Syria`)
        : (isRTL ? `${areaCount} خدمة قانونية — كاونسلو السعودية` : `${areaCount} Legal Services — CounselO Saudi Arabia`),
      "url": `${baseUrl}/services`,
      "numberOfItems": areaCount,
      "itemListElement": s.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "url": `${baseUrl}/services/${item.id}`,
      })),
    },
    { "@context": "https://schema.org", ...regionalServiceDirectoryEntity(region, isRTL ? "ar" : "en", isRTL ? "خدمات كاونسلو القانونية" : "CounselO legal consultation services", seoDesc, s.items) },
    { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": isRTL ? "الخدمات" : "Services", "item": `${baseUrl}/services` },
      ],
    },
  ];

  return (
    <div className="counselo-editorial-page services-directory-page w-full bg-background min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/services"
        schema={servicesSchema}
      />
      <section id="services-introduction" className="services-directory-hero premium-page-hero py-20 lg:py-28">
        <div className="premium-content-shell relative z-10">
          <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="mb-7 font-serif text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-white md:text-7xl">
              {isRTL ? `الخدمات القانونية في ${country}` : `Legal services in ${country}`}
            </h1>
            <div className="premium-hero-rule mb-8" />
            <p className="max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{copy.intro}</p>
          </m.div>
        </div>
      </section>

      <section id="services-opening-cta" className="border-b border-[#0d4a31]/10 bg-white py-7">
        <div className="premium-content-shell">
          <div className="services-consultation-rail flex flex-col gap-5 bg-[#eef4f0] px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0d4a31] text-[#d4ae5f]">
                <HeartHandshake className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="font-serif text-lg text-[#173f2f]">
                {isRTL ? "لست متأكداً من المجال القانوني المناسب؟" : "Not sure which practice area fits your matter?"}
              </p>
            </div>
            <Link
              href={`${regionPrefix}/contact`}
              data-cta="contact"
              data-conversion-position="services-guidance"
              data-region={region}
              data-lang={isRTL ? "ar" : "en"}
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#0d4a31] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#073d29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4924a]"
            >
              {t.nav.bookConsultation}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section id="complete-service-directory" aria-label={isRTL ? "دليل الخدمات الكامل" : "Complete service directory"} className="bg-white py-14 lg:py-20">
        <div className="premium-content-shell">
          <div className="services-editorial-directory grid lg:grid-cols-3">
            {serviceColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="services-directory-column">
                {column.map((service) => {
                  const index = serviceIndexById.get(service.id) ?? 0;
                  const Icon = serviceIcons[service.id] ?? Gavel;
                  return (
                    <m.article
                      key={service.id}
                      initial={false}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: Math.min((index % itemsPerColumn) * 0.04, 0.18) }}
                      className="group relative border-b border-[#0d4a31]/14 py-7 lg:min-h-[11.75rem]"
                    >
                      <Link
                        href={`${regionPrefix}/services/${service.id}`}
                        aria-label={`${s.explorePrefix}${service.title}`}
                        className="grid h-full grid-cols-[3.25rem_1fr_auto] items-start gap-x-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b4924a]"
                      >
                        <span className="flex h-12 w-12 items-center justify-center border border-[#0d4a31]/15 bg-[#eef4f0] text-[#0d4a31] transition-colors group-hover:border-[#b4924a]/60 group-hover:bg-[#e7f0ea]">
                          <Icon className="h-5 w-5" strokeWidth={1.45} />
                        </span>
                        <div>
                          <h3 className="mb-2 block font-serif text-xl font-semibold leading-tight text-[#173f2f] transition-colors group-hover:text-[#0d4a31]">
                            <span className="me-2 text-base font-normal text-[#b4924a]">{String(index + 1).padStart(2, "0")}.</span>
                            {service.title}
                          </h3>
                          <span className="line-clamp-3 block text-sm leading-6 text-[#52675e]">
                            {SERVICE_INTAKE_CONTENT[service.id]?.summary[isRTL ? "ar" : "en"] ?? (isRTL
                              ? `استكشف مسائل ${service.title} في ${country}، والمستندات المفيدة، وما يجب التحقق منه قانونياً، وخيارات الاستشارة محددة النطاق.`
                              : `Explore ${service.title.toLowerCase()} matters in ${country}, useful documents, legal checks and scoped consultation options.`)}
                          </span>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Link>
                    </m.article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="services-process" className="border-y border-border bg-[#eef4f0] py-14 lg:py-20" aria-labelledby="services-process-title">
        <div className="premium-content-shell">
          <h2 id="services-process-title" className="font-serif text-3xl md:text-4xl mb-8">{isRTL ? "كيف تعمل خدمات كاونسلو القانونية؟" : "How CounselO’s legal services work"}</h2>
          <p className="max-w-3xl text-muted-foreground leading-8 mb-8">{isRTL ? "اختر المجال بحسب المسألة، ثم حدد ما تحتاجه: إجابة عن سؤال قانوني، أو مراجعة مستند، أو خطة للخطوات التالية. نؤكد الخدمة المناسبة قبل الاتفاق على التكليف." : "Choose a practice area by the issue, then tell us what you need: an answer to a legal question, a document review or a plan for next steps. We confirm the appropriate service before agreeing the engagement."}</p>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {common.steps.map(([title, text], i) => <li key={title}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0d4a31] text-white mb-4" aria-hidden="true">{i + 1}</span>
              <h3 className="font-serif text-xl mb-3">{title}</h3><p className="text-muted-foreground leading-7">{text}</p>
            </li>)}
          </ol>
          <div className="mt-10 border-t border-[#0d4a31]/20 pt-8">
            <h3 className="font-serif text-2xl mb-5">{isRTL ? "ما الذي تتلقاه ضمن النطاق المتفق عليه؟" : "What you receive within the agreed scope"}</h3>
            <dl className="grid gap-6 lg:grid-cols-3">{(isRTL ? [
              ["استشارة قانونية", "رد مكتوب يوضح السؤال المتفق عليه والوقائع والخيارات والمخاطر والخطوة التالية."],
              ["مراجعة مستندات", "مراجعة مجموعة مستندات محددة وملخص بالمخاطر والثغرات وتوصيات التعديل أو الرد."],
              ["خطة للمسألة", "تحديد الأولويات والمواعيد والمستندات المطلوبة والحاجة إلى تنسيق مهني محلي عند الاقتضاء."],
            ] : [
              ["Legal consultation", "A written response addressing the agreed question, relevant facts, options, risks and next step."],
              ["Document review", "Review of a defined document set with a summary of risks, gaps and recommended amendments or responses."],
              ["Matter roadmap", "Priorities, deadlines, required documents and an assessment of any need for local professional coordination."],
            ]).map(([term, detail]) => <div key={term}><dt className="font-semibold mb-2">{term}</dt><dd className="text-muted-foreground leading-7">{detail}</dd></div>)}</dl>
            <p className="mt-6 text-sm text-muted-foreground leading-7">{isRTL ? "يُحدد السعر وشكل التسليم والوقت بعد المراجعة الأولية وقبل العمل المدفوع. لا تُدرج الصياغة أو التفاوض أو المتابعة إلا إذا شملها النطاق المتفق عليه." : "The fee, delivery format and timing are confirmed after the initial review and before paid work. Drafting, negotiation and follow-up are included only when stated in the agreed scope."}</p>
          </div>
        </div>
      </section>
      <section id="services-framework" className="bg-white py-14 lg:py-20" aria-labelledby="services-framework-title">
        <div className="premium-content-shell">
          <h2 id="services-framework-title" className="font-serif text-3xl md:text-4xl mb-8">{copy.framework}</h2>
          <div className="grid gap-8 lg:grid-cols-3">{copy.points.map(([title, text]) => <article key={title} className="border-t border-[#b4924a]/50 pt-5"><h3 className="font-serif text-xl mb-3">{title}</h3><p className="text-muted-foreground leading-7">{text}</p></article>)}</div>
          <p className="mt-8 max-w-4xl border-s-2 border-[#b4924a] ps-5 text-muted-foreground leading-7">{copy.preparation}</p>
        </div>
      </section>
      <div id="services-representation"><JurisdictionDisclosure jurisdiction={region} /></div>
      <section id="services-final-cta" className="bg-[#073d2b] py-14 lg:py-20 text-white" aria-labelledby="services-final-title">
        <div className="premium-content-shell">
          <h2 id="services-final-title" className="font-serif text-3xl md:text-4xl mb-5">{isRTL ? `ابدأ استشارتك القانونية لمسألة في ${country}` : `Start your consultation for a matter in ${country}`}</h2>
          <p className="max-w-3xl text-white/80 leading-8 mb-6">{common.contactText}</p>
          <Link href={`${regionPrefix}/contact`} data-cta="contact" data-conversion-position="services-final" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#d4ae5f] px-6 py-3 font-semibold text-[#073d2b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{common.primary}<ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></Link>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75">{common.contactNote}</p>
        </div>
      </section>
    </div>
  );
}
