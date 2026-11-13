import { regionalServiceDirectoryEntity, COUNSELO_ORGANIZATION } from "@workspace/api-zod/browser";
import { serviceExperience } from "@/lib/service-experience-content";
import { searchIntentMeta } from "@/lib/search-intent-copy";
import { serviceDirectoryContent } from "@/components/home/service-directory-content";
import { homepageContent } from "@/components/home/homepage-content";
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

import "./services-directory.css";

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
        ? (isRTL ? `${areaCount} خدمة قانونية — كاونسلو للاستشارات القانونية الإمارات` : `${areaCount} Legal Services — CounselO Legal UAE`)
        : region === "syr"
        ? (isRTL ? `${areaCount} خدمة قانونية — كاونسلو للاستشارات القانونية سوريا` : `${areaCount} Legal Services — CounselO Legal Syria`)
        : (isRTL ? `${areaCount} خدمة قانونية — كاونسلو للاستشارات القانونية السعودية` : `${areaCount} Legal Services — CounselO Legal Saudi Arabia`),
      "url": `${baseUrl}/services`,
      "numberOfItems": areaCount,
      "itemListElement": s.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "url": `${baseUrl}/services/${item.id}`,
      })),
    },
    { "@context": "https://schema.org", ...regionalServiceDirectoryEntity(region, isRTL ? "ar" : "en", isRTL ? "خدمات كاونسلو القانونية" : "CounselO Legal legal consultation services", seoDesc, s.items) },
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
      <section id="services-introduction" className={`services-directory-hero premium-page-hero py-20 lg:py-28 services-directory-hero--strong`}>
        <div className="premium-content-shell relative z-10">
          <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="mb-7 font-serif text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-white md:text-7xl">
              {isRTL ? `الخدمات القانونية في ${country}` : `Legal services in ${country}`}
            </h1>
            {copy.introLead && <p className="services-directory-lead">{copy.introLead}</p>}
            <p className="max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{copy.intro}</p>
          </m.div>
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
                            <span className="me-2 text-base font-normal text-[#866523]">{String(index + 1).padStart(2, "0")}.</span>
                            {service.title}
                          </h3>
                          <span className="line-clamp-3 block text-sm leading-6 text-[#52675e]">
                            {serviceExperience(region, service.id, isRTL ? "ar" : "en").hero}
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
