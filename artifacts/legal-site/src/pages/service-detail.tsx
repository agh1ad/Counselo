import { ServiceExperience, ServiceContact } from "@/components/legal/service-experience";
import { servicePageCopy } from "@/lib/experience-page-copy";
import { SERVICE_EXPERIENCE_UPDATED_AT } from "@/lib/service-experience-content";
import { SAUDI_FAMILY_COVERAGE_SOURCES } from "@/components/legal/saudi-family-service-content";
import { serviceLegalOverview } from "@/lib/service-legal-overviews";
import { serviceFrameworkSources } from "@/lib/service-framework-sources";
import { serviceSearchCopy } from "@/lib/search-intent-copy";
import * as m from "framer-motion/m";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";
import { BILINGUAL_SERVICE_COVERAGE } from "@/lib/service-intake-content";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { getRegionalLegalSources } from "@/lib/regional-legal-sources";
import { sourceBackedSearchGuidance } from "@/lib/source-backed-search-guidance";
import { getLegalProblemPages } from "@/lib/legal-problem-pages";
import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";

function truncateMeta(value: string, maxLength = 158): string {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength - 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 110 ? boundary : shortened.length).replace(/[،,;:]$/, "")}.`;
}


export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const sd = t.serviceDetail;
  const data = sd.services[id as keyof typeof sd.services];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{sd.notFound}</h1>
          <Link href={`${regionPrefix}/services`} className="text-primary hover:underline">{sd.notFoundLink}</Link>
        </div>
      </div>
    );
  }

  const isSyr = region === "syr";
  const isUae = region === "uae";
  const syrSeo = isSyr ? SYR_SEO_DATA[id] : undefined;

  const d = data as Record<string, unknown>;
  const dataSeoTitle   = typeof d.seoTitle      === "string" ? d.seoTitle      : null;
  const dataSeoKeywords = typeof d.seoKeywords === "string" ? d.seoKeywords : null;
  const uaeArabicSeoTitle = id === "consumer-ecommerce"
    ? "التجارة الإلكترونية وحماية المستهلك"
    : id === "tax-vat"
      ? "ضريبة الشركات والقيمة المضافة"
      : data.title;

  const seoTitle = isUae
    ? (isRTL
      ? `${uaeArabicSeoTitle} | الإمارات`
      : `${data.title} | UAE`)
    : isRTL
    ? (syrSeo
        ? `${data.title} في سوريا | استشارة قانونية أونلاين | كاونسلو للاستشارات القانونية`
        : `${data.title} في ${isUae ? "الإمارات" : "السعودية"} | استشارة قانونية أونلاين | كاونسلو للاستشارات القانونية`)
    : (isSyr
        ? (dataSeoTitle ?? `${data.title} Lawyer in Syria | Online Legal Consultation | CounselO Legal`)
        : `${data.title} Lawyer in ${isUae ? "the UAE" : "Saudi Arabia"} | Online Legal Consultation | CounselO Legal`);

  const seoKeywords = isUae && dataSeoKeywords
    ? dataSeoKeywords
    : isRTL
      ? (syrSeo?.kwAr ?? `${data.title} محامي ${isSyr ? "سوريا" : "المملكة العربية السعودية"}, استشارة قانونية أونلاين`)
      : (syrSeo?.kw ?? `${data.title} lawyer ${isSyr ? "Syria" : "Saudi Arabia"}, online legal consultation`);

  const lang = isRTL ? "ar" : "en";
  const isJurisdictionSafe = (value: string) => {
    if (isUae) return !/(Saudi|KSA|SAMA|ZATCA|MISA|SAIP|Vision 2030|Syria|Syrian|السعود|ساما|هيئة الزكاة|سوريا|السوري)/i.test(value);
    if (isSyr) return !/(Saudi|KSA|SAMA|CMA|ZATCA|MISA|SAIP|CITC|Vision 2030|UAE|Emirates|DIFC|ADGM|السعود|ساما|هيئة الزكاة|الإمارات|مركز دبي المالي|أبوظبي العالمي)/i.test(value);
    return true;
  };
  const displayCovers = (!isUae && BILINGUAL_SERVICE_COVERAGE[id] ? BILINGUAL_SERVICE_COVERAGE[id][lang] : data.covers).filter(isJurisdictionSafe);
  const pageCopy = servicePageCopy(region, id, lang, displayCovers, serviceLegalOverview(region, id, lang));
  const seoDesc = truncateMeta(pageCopy.hero);
  const countryName = isRTL ? (isSyr ? "سوريا" : isUae ? "الإمارات" : "السعودية") : (isSyr ? "Syria" : isUae ? "the UAE" : "Saudi Arabia");
  const problemPages = getLegalProblemPages(region, id);
  const frameworkSources = serviceFrameworkSources(region, id);
  const canonicalPath = `/services/${id}`;
  const langSeg = isRTL ? "/ar" : "";
  const regionSeg = `/${region}`;
  const canonicalUrlFull = `https://counselo-legal.com${regionSeg}${langSeg}${canonicalPath}`;
  const regionBase = `https://counselo-legal.com${regionSeg}${langSeg}`;
  const inLanguage = isRTL ? (isSyr ? "ar-SY" : isUae ? "ar-AE" : "ar-SA") : (isSyr ? "en-SY" : isUae ? "en-AE" : "en-SA");
  const legalSources = [...new Map([
    ...frameworkSources,
    ...getRegionalLegalSources(region, id),
    ...sourceBackedSearchGuidance(region, id).flatMap(item => item.sources),
  ].map(source => [source.href, source])).values()];
  const whatsappUrl = `https://wa.me/966594850247?text=${encodeURIComponent(isRTL ? `مرحباً كاونسلو للاستشارات القانونية، أحتاج إلى مراجعة بخصوص خدمة ${data.title} في ${countryName}.` : `Hello CounselO Legal, I need a review concerning ${data.title} in ${countryName}.`)}`;
  const serviceContactHref = `${regionPrefix}/contact?service=${id}#consultation-request`;

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://counselo-legal.com/#${region}-service-${id}`,
      "name": isRTL ? `${data.title} — كاونسلو للاستشارات القانونية` : `${data.title} — CounselO Legal`,
      "description": seoDesc,
      "url": canonicalUrlFull,
      "areaServed": { "@type": "Country", "name": isSyr ? "Syria" : isUae ? "United Arab Emirates" : "Saudi Arabia" },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": canonicalUrlFull,
        "availableLanguage": ["Arabic", "English"],
      },
      "serviceType": data.title,
      "provider": { "@id": COUNSELO_ENTITY_IDS.organization },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": regionBase },
        { "@type": "ListItem", "position": 2, "name": isRTL ? "الخدمات" : "Services", "item": `${regionBase}/services` },
        { "@type": "ListItem", "position": 3, "name": data.title, "item": canonicalUrlFull },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrlFull}#webpage`,
      "url": canonicalUrlFull,
      "name": seoTitle,
      "description": seoDesc,
      "inLanguage": inLanguage,
      "dateModified": SERVICE_EXPERIENCE_UPDATED_AT,
      "citation": [...new Set([...legalSources.map(source => source.href), ...(region === "sa" && id === "family-law" ? SAUDI_FAMILY_COVERAGE_SOURCES : [])])],
      "publisher": {
        "@id": COUNSELO_ENTITY_IDS.organization,
        "name": "CounselO Legal",
        "url": "https://counselo-legal.com",
      },
    },
  ];

  return (
    <div className={`counselo-editorial-page service-brief-page service-reading-page w-full bg-background min-h-screen${region === "sa" ? " saudi-reading-page" : ""} legal-experience-page`}>
      <SEOHead heroArtwork="gold"
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalPath}
        keywords={seoKeywords}
        schema={schemas}
        ogType="website"
      />

      <section className="service-detail-hero">
        <div className="premium-content-shell relative z-10 py-14 lg:py-20">
          <nav aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"} className="mb-9 flex flex-wrap items-center text-sm text-white/62">
            <Link href={regionPrefix} className="inline-flex min-h-8 items-center transition-colors hover:text-[#d5ae5d]">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="inline-flex min-h-8 items-center transition-colors hover:text-[#d5ae5d]">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="font-medium text-white">{data.title}</span>
          </nav>

          <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
            <h1 className="mb-6 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-white lg:text-7xl">
              {serviceSearchCopy(id, region, isRTL ? "ar" : "en")?.heading ?? data.title}
            </h1>
            <div className="mb-6 h-px w-20 bg-[#d5ae5d]" />
            <p className="mb-7 max-w-3xl font-serif text-xl italic leading-relaxed text-white/72 lg:text-2xl">{pageCopy.hero}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={serviceContactHref} data-cta="contact" data-conversion-position="service-hero" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 bg-[#d5ae5d] px-5 py-3 font-bold text-[#0d3e2a] transition-colors hover:bg-[#e0bd73]">
                <MessageSquareText size={18} /> {isRTL ? "أرسل المسألة للمراجعة" : "Send your matter for review"}
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="service-hero" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 border border-white/45 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                <Phone size={18} /> WhatsApp
              </a>
            </div>
            <p className="mt-4 max-w-3xl text-xs leading-5 text-white/58">{isRTL ? "اذكر الدولة وأي ميعاد قريب والنتيجة المطلوبة. نؤكد النطاق والرسوم قبل بدء العمل المدفوع." : "State the jurisdiction, any urgent date and the outcome you need. Scope and fee are confirmed before paid work begins."}</p>
          </m.div>
          </div>
      </section>

      <div className="premium-content-shell saudi-service-body py-12 lg:py-16">
        <div className="saudi-service-layout grid gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="saudi-service-main lg:col-span-8 xl:col-span-9">
            <ServiceExperience copy={pageCopy} isArabic={isRTL} region={region} service={id} contactHref={serviceContactHref} problems={problemPages} />
            <ServiceContact copy={pageCopy} isArabic={isRTL} region={region} contactHref={serviceContactHref} whatsappHref={whatsappUrl} />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <m.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="service-consultation-panel sticky top-36 overflow-hidden bg-[#0d4a31] p-7 text-white shadow-[0_24px_65px_rgba(13,74,49,0.18)] lg:p-8">
              <h3 className="mb-4 font-serif text-3xl font-semibold leading-tight text-white">{sd.sidebar.heading}</h3>
              <div className="mb-6 h-px w-14 bg-[#d5ae5d]" />
              <p className="mb-7 leading-relaxed text-white/68">
                {sd.sidebar.descPrefix}{data.title.toLowerCase()}{sd.sidebar.descSuffix}
              </p>
              <ul className="mb-7 space-y-3 border-y border-white/12 py-5 text-sm text-white/82">
                <li className="flex items-center gap-3"><MessageSquareText className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "مخرج مكتوب عبر واتساب أو البريد الإلكتروني" : "Written deliverable via WhatsApp or email"}</li>
                <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "النطاق والرسوم يؤكدان قبل العمل المدفوع" : "Scope and fee confirmed before paid work"}</li>
              </ul>
              <Button asChild className="w-full rounded-none bg-[#d5ae5d] py-6 text-base font-bold text-[#0d3e2a] hover:bg-[#e0bd73]">
                <Link
                  href={serviceContactHref}
                  data-cta="contact"
                  data-region={region}
                  data-lang={isRTL ? "ar" : "en"}
                >
                  {sd.sidebar.ctaBtn}
                </Link>
              </Button>
              <div className="mt-6 flex items-start gap-3 border-t border-white/12 pt-6">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#d5ae5d]" />
                <div>
                  <p className="mb-1 text-sm text-white/58">{sd.sidebar.callLabel}</p>
                  <p className="font-mono text-lg font-medium text-white" dir="ltr">{sd.sidebar.phone}</p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
      <LatestContentCarousels isArabic={isRTL} region={region} serviceSlug={id} />
    </div>
  );
}
