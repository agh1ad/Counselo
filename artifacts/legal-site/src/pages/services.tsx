import { motion } from "framer-motion";
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
import { COUNSELO_ENTITY_IDS, COUNSELO_PLATFORM_POSITIONING, OMAR_AL_BAGHDADI } from "@workspace/api-zod";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";

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

  const country = region === "uae"
    ? (isRTL ? "الإمارات العربية المتحدة" : "the United Arab Emirates")
    : region === "syr" ? (isRTL ? "سوريا" : "Syria") : (isRTL ? "السعودية" : "Saudi Arabia");
  const areaCount = s.items.length;
  const serviceIndexById = new Map(s.items.map((item, index) => [item.id, index]));
  const itemsPerColumn = Math.ceil(areaCount / 3);
  const serviceColumns = Array.from({ length: 3 }, (_, column) =>
    s.items.slice(column * itemsPerColumn, (column + 1) * itemsPerColumn),
  ).filter((column) => column.length > 0);

  const seoTitle = region === "uae"
    ? (isRTL ? `${areaCount} خدمة قانونية أونلاين في الإمارات | كاونسلو` : `${areaCount} UAE Online Legal Services | CounselO`)
    : isRTL
      ? `${areaCount} مجالاً قانونياً في ${country} | منصة استشارات قانونية أونلاين | قانوني`
      : `${areaCount} Legal Practice Areas ${country} | CounselO — Online Legal Consultation Platform`;
  const seoDesc = isRTL
    ? `قانوني — منصة متخصصة للاستشارات القانونية الأونلاين في ${country}. ${areaCount} مجالاً قانونياً: ${s.items.map((item) => item.title).join("، ")}. خبرة 30+ عاماً، 20,000+ قضية. استجابة خلال 24 ساعة عبر واتساب أو البريد الإلكتروني.`
    : `${COUNSELO_PLATFORM_POSITIONING.name} — ${country}'s online legal platform for consultation, document review and structured legal guidance. ${areaCount} practice areas: ${s.items.map((item) => item.title).join(", ")}.`;

  const baseUrl = `https://counselo-legal.com/${region}${isRTL ? "/ar" : ""}`;
  const servicesSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": region === "uae" ? "UAE Online Legal Services" : region === "syr" ? "Syria Online Legal Services" : "Saudi Arabia Online Legal Services",
      "url": `${baseUrl}/services`,
      "about": { "@id": `https://counselo-legal.com/#${region}-service-directory` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": region === "uae"
        ? (isRTL ? `${areaCount} مجالاً للممارسة القانونية — كاونسلو الإمارات` : `${areaCount} Legal Practice Areas — CounselO UAE`)
        : region === "syr"
        ? (isRTL ? `${areaCount} مجالاً للممارسة القانونية — قانوني سوريا` : `${areaCount} Legal Practice Areas — CounselO Syria`)
        : (isRTL ? `${areaCount} مجالاً للممارسة القانونية — كاونسلو السعودية` : `${areaCount} Legal Practice Areas — CounselO Saudi Arabia`),
      "url": `${baseUrl}/services`,
      "numberOfItems": areaCount,
      "itemListElement": s.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "url": `${baseUrl}/services/${item.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "@id": `https://counselo-legal.com/#${region}-service-directory`,
      "name": "CounselO",
      "description": region === "uae"
        ? (isRTL ? `منصة استشارات قانونية أونلاين لمسائل الإمارات — ${areaCount} مجالاً ضمن الأطر الاتحادية والمحلية والمناطق الحرة` : `UAE online legal consultation platform — ${areaCount} practice areas across federal, emirate-level, mainland and free-zone frameworks`)
        : region === "syr"
        ? (isRTL ? `منصة سوريا للاستشارات القانونية الأونلاين — ${areaCount} مجالاً، استجابة خلال 24 ساعة — القانون المدني السوري، قانون الشركات 29/2011، قانون العمل 17/2010` : `Syria's online legal consultation platform — ${areaCount} practice areas, response within 24 hours — Syrian Civil Code, Companies Law 29/2011, Labour Law 17/2010`)
        : (isRTL ? `منصة متخصصة للاستشارات القانونية الأونلاين في المملكة — ${areaCount} مجالاً، استجابة خلال 24 ساعة` : `Saudi Arabia's specialized online legal consultation platform — ${areaCount} practice areas, response within 24 hours`),
      "url": "https://counselo-legal.com",
      "provider": { "@id": COUNSELO_ENTITY_IDS.organization },
      "telephone": "+966594850247",
      "address": region === "uae"
        ? { "@type": "PostalAddress", "addressCountry": "AE" }
        : region === "syr"
        ? { "@type": "PostalAddress", "addressLocality": "Damascus", "addressRegion": "Damascus Governorate", "addressCountry": "SY" }
        : { "@type": "PostalAddress", "addressLocality": "Jubail", "addressCountry": "SA" },
      "founder": OMAR_AL_BAGHDADI,
      "areaServed": region === "uae"
        ? { "@type": "Country", "name": "United Arab Emirates" }
        : region === "syr"
        ? { "@type": "Country", "name": "Syria" }
        : { "@type": "Country", "name": "Saudi Arabia" },
      "availableLanguage": ["Arabic", "English"],
    },
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
        keywords={region === "uae"
          ? (isRTL
            ? "خدمات قانونية الإمارات, محامي دبي, محامي أبوظبي, قانون الشركات الإماراتي, قانون العمل الإماراتي, المناطق الحرة, مركز دبي المالي, أبوظبي العالمي"
            : `UAE legal services, ${areaCount} practice areas UAE, Dubai lawyer online, Abu Dhabi legal advice, UAE company law, UAE employment law, free zones, DIFC, ADGM`)
          : region === "syr"
          ? (isRTL
            ? "خدمات قانونية سوريا, قانون الأسرة السوري, القانون المدني السوري, قانون العمل السوري, القانون العقاري السوري, استثمار أجنبي سوريا, القانون الإداري السوري, القانون الجنائي السوري, قانون مصرف سوريا المركزي, الضرائب العامة سوريا, قانون الشركات السوري 29/2011, قانون التحكيم السوري 4/2008, محامي أونلاين سوريا, قانوني دمشق, قانوني حلب"
            : `legal services Syria, ${areaCount} practice areas Syria, family law Syria, civil law Syria, employment law Syria, real estate law Syria, foreign investment Syria, administrative law Syria, criminal law Syria, banking law Syria, tax law Syria, companies law Syria 29/2011, arbitration Syria 4/2008, cyber law Syria, medical malpractice Syria, insurance law Syria, online lawyer Damascus, CounselO Syria`)
          : (isRTL
            ? "خدمات قانونية السعودية, قانون الأسرة, القانون التجاري, قانون العمل, القانون العقاري, الاستثمار الأجنبي, القانون الإداري, القانون الجنائي, قانون البنوك, الضرائب والزكاة, قانون الجرائم الإلكترونية, الأخطاء الطبية, نظام التأمين, الإقامة والتأشيرات, التحكيم, التنفيذ, قانون الشركات, الملكية الفكرية, العقود, محامي أونلاين المملكة, قانوني الجبيل"
            : `legal services Saudi Arabia, ${areaCount} practice areas KSA, family law Saudi Arabia, commercial law KSA, employment law Saudi Arabia, property law KSA, foreign investment lawyer Saudi Arabia, administrative law KSA, criminal law Saudi Arabia, banking finance law KSA, tax zakat lawyer Saudi, cyber law Saudi Arabia, medical malpractice KSA, insurance law Saudi, arbitration KSA, enforcement law Saudi, companies law KSA, intellectual property Saudi, online lawyer Jubail, CounselO`)}
        schema={servicesSchema}
      />
      <section className="services-directory-hero premium-page-hero py-20 lg:py-28">
        <div className="premium-content-shell relative z-10">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="mb-7 font-serif text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-white md:text-7xl">
              {s.hero.heading}
            </h1>
            <div className="premium-hero-rule mb-8" />
            <p className="max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{s.hero.desc}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#0d4a31]/10 bg-white py-7">
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
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#0d4a31] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#073d29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4924a]"
            >
              {t.nav.bookConsultation}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="premium-content-shell">
          <div className="services-editorial-directory grid lg:grid-cols-3">
            {serviceColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="services-directory-column">
                {column.map((service) => {
                  const index = serviceIndexById.get(service.id) ?? 0;
                  const Icon = serviceIcons[service.id] ?? Gavel;
                  return (
                    <motion.article
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
                        <span>
                          <span className="mb-2 block font-serif text-xl font-semibold leading-tight text-[#173f2f] transition-colors group-hover:text-[#0d4a31]">
                            <span className="me-2 text-base font-normal text-[#b4924a]">{String(index + 1).padStart(2, "0")}.</span>
                            {service.title}
                          </span>
                          <span className="line-clamp-3 block text-sm leading-6 text-[#52675e]">{service.longDesc}</span>
                        </span>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
