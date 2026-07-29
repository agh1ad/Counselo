import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Clock3,
  ExternalLink,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";
import { RELATED_SERVICES, SERVICE_SEARCH_CONTENT } from "@/lib/service-search-content";
import { TrustSignals } from "@/components/seo/TrustSignals";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";

type LegalSource = { en: string; ar: string; href: string };

const SAUDI_LEGISLATION_SOURCE: LegalSource = {
  en: "Bureau of Experts — Official Saudi Laws Portal",
  ar: "هيئة الخبراء بمجلس الوزراء — بوابة الأنظمة السعودية",
  href: "https://laws.boe.gov.sa/",
};

const SAUDI_AUTHORITY_SOURCES = {
  justice: { en: "Saudi Ministry of Justice", ar: "وزارة العدل السعودية", href: "https://www.moj.gov.sa/" },
  labor: { en: "Ministry of Human Resources and Social Development", ar: "وزارة الموارد البشرية والتنمية الاجتماعية", href: "https://www.hrsd.gov.sa/" },
  business: { en: "Saudi Ministry of Commerce", ar: "وزارة التجارة السعودية", href: "https://mc.gov.sa/" },
  investment: { en: "Saudi Ministry of Investment", ar: "وزارة الاستثمار السعودية", href: "https://misa.gov.sa/" },
  interior: { en: "Saudi Ministry of Interior", ar: "وزارة الداخلية السعودية", href: "https://www.moi.gov.sa/" },
  realEstate: { en: "Real Estate General Authority", ar: "الهيئة العامة للعقار", href: "https://rega.gov.sa/" },
  finance: { en: "Saudi Central Bank", ar: "البنك المركزي السعودي", href: "https://www.sama.gov.sa/" },
  capitalMarkets: { en: "Capital Market Authority", ar: "هيئة السوق المالية", href: "https://cma.org.sa/" },
  intellectualProperty: { en: "Saudi Authority for Intellectual Property", ar: "الهيئة السعودية للملكية الفكرية", href: "https://www.saip.gov.sa/" },
  tax: { en: "Zakat, Tax and Customs Authority", ar: "هيئة الزكاة والضريبة والجمارك", href: "https://zatca.gov.sa/" },
  data: { en: "Saudi Data and AI Authority", ar: "الهيئة السعودية للبيانات والذكاء الاصطناعي", href: "https://sdaia.gov.sa/" },
  health: { en: "Saudi Ministry of Health", ar: "وزارة الصحة السعودية", href: "https://www.moh.gov.sa/" },
  insurance: { en: "Insurance Authority", ar: "هيئة التأمين", href: "https://www.ia.gov.sa/" },
} satisfies Record<string, LegalSource>;

function getSaudiLegalSources(serviceId: string): LegalSource[] {
  const authority =
    /employment|labor|wages|dismissal|workplace|end-of-service/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.labor
    : /foreign-investment|investment-/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.investment
    : /business-visas|family-visas|work-visas|iqama|residency|kafala|deportation|immigration/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.interior
    : /real-estate|property|lease|rental|ownership|neighbor|real-rights/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.realEstate
    : /bank|finance|credit|loan|sukuk|financial-regulatory/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.finance
    : /capital-|share-|shareholder|assembly|director|partner|company-records|conflict-of-interest/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.capitalMarkets
    : /intellectual-property|trademark|brand|patent|copyright|trade-secrets|ip-|unfair-competition/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.intellectualProperty
    : /tax|zakat|vat|excise|customs|transfer-pricing/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.tax
    : /cyber|data-protection|digital-privacy|hacking|online-/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.data
    : /medical|healthcare|hospital|patient|pharmaceutical|surgical|dental|misdiagnosis/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.health
    : /insurance/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.insurance
    : /business|companies|company|commercial|partnership|contract/.test(serviceId) ? SAUDI_AUTHORITY_SOURCES.business
    : SAUDI_AUTHORITY_SOURCES.justice;

  return [authority, SAUDI_LEGISLATION_SOURCE];
}

const SYRIA_GENERAL_SOURCE: LegalSource = {
  en: "Syrian Ministry of Justice",
  ar: "وزارة العدل السورية",
  href: "https://moj.gov.sy/",
};

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const sd = t.serviceDetail;
  const data = sd.services[id as keyof typeof sd.services];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
  const syrSeo = isSyr ? SYR_SEO_DATA[id] : undefined;

  const d = data as Record<string, unknown>;
  const overview       = typeof d.overview      === "string" ? d.overview      : null;
  const overview1      = typeof d.overview1     === "string" ? d.overview1     : null;
  const overview2      = typeof d.overview2     === "string" ? d.overview2     : null;
  const experienceNote = typeof d.experienceNote=== "string" ? d.experienceNote: null;
  const dataSeoTitle   = typeof d.seoTitle      === "string" ? d.seoTitle      : null;

  const seoTitle = isRTL
    ? (syrSeo
        ? `${data.title} في سوريا | استشارة قانونية أونلاين | كاونسلو`
        : `${data.title} في السعودية | استشارة قانونية أونلاين | كاونسلو`)
    : (isSyr
        ? (dataSeoTitle ?? `${data.title} Lawyer in Syria | Online Legal Consultation | CounselO`)
        : `${data.title} Lawyer in Saudi Arabia | Online Legal Consultation | CounselO`);

  const seoDesc = isRTL
    ? (syrSeo?.descAr ?? `${data.subtitle} — كاونسلو، منصة متخصصة للاستشارات القانونية الأونلاين في ${isSyr ? "سوريا" : "المملكة"}. استجابة احترافية خلال 24 ساعة عبر واتساب أو البريد الإلكتروني. خبرة تزيد على 30 عاماً.`)
    : (syrSeo?.desc ?? `${data.subtitle} — CounselO, ${isSyr ? "Syria's specialized online legal platform" : "Saudi Arabia's specialized online legal platform"}. Professional response within 24 hours via WhatsApp or email. 30+ years experience, 20,000+ cases handled.`);

  const seoKeywords = isRTL
    ? (syrSeo?.kwAr ?? `${data.title} محامي ${isSyr ? "سوريا" : "المملكة العربية السعودية"}, استشارة قانونية ${data.title} أونلاين, محامي ${data.title} كاونسلو`)
    : (syrSeo?.kw ?? `${data.title} lawyer ${isSyr ? "Syria" : "Saudi Arabia"}, online ${data.title} legal advice ${isSyr ? "Syria" : "KSA"}, ${data.title} attorney CounselO`);

  const serviceAddress = isSyr
    ? { "@type": "PostalAddress", "addressCountry": "SY" }
    : { "@type": "PostalAddress", "addressCountry": "SA" };

  const hasFaqs = "faqs" in data && Array.isArray((data as Record<string, unknown>).faqs) && ((data as Record<string, unknown>).faqs as unknown[]).length > 0;
  const faqs = hasFaqs ? (data as Record<string, unknown>).faqs as { q: string; a: string }[] : [];
  const isJurisdictionSafe = (value: string) =>
    !isSyr || !/(Saudi|KSA|SAMA|CMA|ZATCA|MISA|SAIP|CITC|Vision 2030|السعود|ساما|هيئة الزكاة)/i.test(value);
  const safeFaqs = faqs.filter((faq) => isJurisdictionSafe(`${faq.q} ${faq.a}`));
  const displayOverview = overview && isJurisdictionSafe(overview) ? overview : null;
  const displayOverview1 = overview1 && isJurisdictionSafe(overview1) ? overview1 : null;
  const displayOverview2 = overview2 && isJurisdictionSafe(overview2) ? overview2 : null;
  const displayExperienceNote = experienceNote && isJurisdictionSafe(experienceNote) ? experienceNote : null;
  const displayCovers = data.covers.filter((item) => isJurisdictionSafe(item));
  const searchContent = SERVICE_SEARCH_CONTENT[id];
  const relatedServiceIds = (RELATED_SERVICES[id] ?? []).filter(
    (serviceId) => serviceId in sd.services,
  );
  const commonIssues = searchContent
    ? (isRTL ? searchContent.issuesAr : searchContent.issuesEn)
    : data.covers.slice(0, 5);
  const documents = searchContent
    ? (isRTL ? searchContent.documentsAr : searchContent.documentsEn)
    : [];
  const countryName = isRTL
    ? (isSyr ? "سوريا" : "السعودية")
    : (isSyr ? "Syria" : "Saudi Arabia");
  const displayProcess = isSyr
    ? (isRTL
        ? [
            { title: "التقييم الأولي", desc: `نراجع الوقائع والمستندات ونحدد نطاق المسألة المتعلقة بـ${data.title} في سوريا.` },
            { title: "تحديد المسار القانوني", desc: "نوضح الخيارات العملية والجهة المختصة والمعلومات الإضافية اللازمة قبل اتخاذ أي إجراء." },
            { title: "إعداد المستندات", desc: "نساعد في تنظيم الأدلة والمراسلات والطلبات أو المذكرات المطلوبة للمسار المناسب." },
            { title: "المتابعة والحل", desc: "نقدم الدعم في التفاوض أو الإجراءات الرسمية أو التقاضي وفق نطاق التكليف المتفق عليه." },
          ]
        : [
            { title: "Initial Assessment", desc: `We review the facts and documents and define the scope of the ${data.title.toLowerCase()} matter in Syria.` },
            { title: "Legal Route", desc: "We explain the practical options, relevant forum, and any additional information needed before action is taken." },
            { title: "Document Preparation", desc: "We help organize evidence, correspondence, applications, or submissions required for the appropriate route." },
            { title: "Follow-Through", desc: "We support negotiation, formal procedures, or litigation within the agreed scope of engagement." },
          ])
    : data.process;
  const universalFaqs = isRTL
    ? [
        { q: `هل يمكن الحصول على استشارة ${data.title} أونلاين في ${countryName}؟`, a: "نعم. يمكن بدء التقييم القانوني ومراجعة المستندات عبر واتساب أو البريد الإلكتروني. إذا تطلبت المسألة حضوراً أو تمثيلاً رسمياً، يوضح الفريق الخطوة المناسبة بعد مراجعة التفاصيل." },
        { q: "ما المستندات التي أرسلها قبل الاستشارة؟", a: "أرسل العقود والمراسلات والإشعارات والقرارات وأي مستند يوضح التسلسل الزمني للوقائع. تجنب إرسال النسخ الوحيدة من الأصول، واحجب البيانات غير الضرورية." },
        { q: "متى يجب طلب المشورة القانونية؟", a: "اطلب المشورة بمجرد ظهور نزاع أو استلام إشعار أو قبل توقيع مستند مهم. التحرك المبكر يساعد على حفظ الأدلة وفهم الخيارات قبل اتخاذ قرار يصعب الرجوع عنه." },
        { q: "هل يمكن مراجعة عقد أو قرار أو ملف قبل بدء الإجراءات؟", a: "نعم. تساعد المراجعة الأولية على تحديد المخاطر ونقاط القوة والمعلومات الناقصة والمسار العملي المناسب قبل التفاوض أو تقديم أي طلب." },
        { q: "هل تبقى معلومات الاستشارة سرية؟", a: "تتعامل كاونسلو مع المعلومات والمستندات القانونية بسرية مهنية، ويُطلب فقط ما يلزم لتقييم المسألة وتقديم الخدمة المتفق عليها." },
      ]
    : [
        { q: `Can I get an online ${data.title.toLowerCase()} consultation for ${countryName}?`, a: "Yes. The initial legal assessment and document review can begin through WhatsApp or email. If formal representation or attendance is required, the team explains the appropriate next step after reviewing the matter." },
        { q: "What documents should I send before the consultation?", a: "Send relevant contracts, correspondence, notices, decisions, and a dated summary of events. Do not send the only copy of an original document, and redact unrelated sensitive information." },
        { q: "When should I seek legal advice?", a: "Seek advice when a dispute first appears, when you receive a notice, or before signing an important document. Early review helps preserve evidence and clarify options before an avoidable commitment is made." },
        { q: "Can CounselO review a contract, decision, or case file before proceedings begin?", a: "Yes. An initial review can identify legal and practical risks, strengths, missing information, and the most appropriate route before negotiation or a formal filing." },
        { q: "Is my consultation information confidential?", a: "CounselO handles legal information and documents with professional confidentiality and requests only the information needed to assess the matter and provide the agreed service." },
      ];
  const displayFaqs = [...safeFaqs, ...universalFaqs].filter(
    (faq, index, all) => all.findIndex((item) => item.q === faq.q) === index,
  );

  const canonicalPath = `/services/${id}`;
  const langSeg = isRTL ? "/ar" : "";
  const regionSeg = isSyr ? "/syr" : "/sa";
  const canonicalUrlFull = `https://counselo-legal.com${regionSeg}${langSeg}${canonicalPath}`;
  const regionBase = `https://counselo-legal.com${regionSeg}${langSeg}`;
  const inLanguage = isRTL ? (isSyr ? "ar-SY" : "ar-SA") : (isSyr ? "en-SY" : "en-SA");
  const legalSources = isSyr
    ? [SYRIA_GENERAL_SOURCE]
    : getSaudiLegalSources(id);

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": isRTL ? `${data.title} — كاونسلو` : `${data.title} — CounselO`,
      "description": isRTL ? (syrSeo?.descAr ?? data.subtitle) : (syrSeo?.desc ?? data.subtitle),
      "url": canonicalUrlFull,
      "areaServed": { "@type": "Country", "name": isSyr ? "Syria" : "Saudi Arabia" },
      "availableLanguage": ["Arabic", "English"],
      "serviceType": data.title,
      "provider": {
        "@type": "LegalService",
        "@id": "https://counselo-legal.com/#organization",
        "name": isRTL ? "كاونسلو" : "CounselO",
        "url": "https://counselo-legal.com",
        "telephone": "+966594850247",
        "email": "info@counselo-legal.com",
        "address": serviceAddress,
        "founder": { "@type": "Person", "@id": "https://counselo-legal.com/sa/about#omar-al-baghdadi", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel", "honorificPrefix": "Lawyer" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo-legal.com/" },
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
      "dateModified": "2026-07-13",
      "citation": legalSources.map((source) => source.href),
      "publisher": {
        "@type": "LegalService",
        "@id": "https://counselo-legal.com/#organization",
        "name": "CounselO",
        "url": "https://counselo-legal.com",
      },
    },
  ];

  if (displayFaqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": displayFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    });
  }

  return (
    <div className="counselo-editorial-page service-brief-page w-full bg-background min-h-screen">
      <SEOHead
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
            <Link href={regionPrefix} className="transition-colors hover:text-[#d5ae5d]">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="transition-colors hover:text-[#d5ae5d]">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="font-medium text-white">{data.title}</span>
          </nav>

          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
            <Link href={`${regionPrefix}/services`} className="mb-7 inline-flex items-center text-sm font-medium text-[#d5ae5d] transition-colors hover:text-white">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} /> {sd.backLink}
            </Link>
            <h1 className="mb-6 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-white lg:text-7xl">
              {isRTL
                ? `${data.title} في ${isSyr ? "سوريا" : "المملكة العربية السعودية"}`
                : `${data.title} Lawyer in ${isSyr ? "Syria" : "Saudi Arabia"}`}
            </h1>
            <div className="mb-6 h-px w-20 bg-[#d5ae5d]" />
            <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-white/72 lg:text-2xl">{data.subtitle}</p>
          </motion.div>
          </div>
      </section>

      <nav aria-label={isRTL ? "أقسام صفحة الخدمة" : "Service page sections"} className="service-anchor-rail sticky top-[4.5rem] z-30 border-b border-[#0d4a31]/12 bg-white/95 backdrop-blur">
        <div className="premium-content-shell overflow-x-auto">
          <div className="flex min-w-max items-center gap-7 py-4 text-sm font-semibold text-[#355447]">
            <a href="#service-overview" className="service-anchor-link">{isRTL ? "نظرة عامة" : "Overview"}</a>
            <a href="#service-covers-heading" className="service-anchor-link">{sd.coversHeading}</a>
            {commonIssues.length > 0 && <a href="#common-problems-heading" className="service-anchor-link">{isRTL ? "المشكلات الشائعة" : "Common problems"}</a>}
            {documents.length > 0 && <a href="#documents-heading" className="service-anchor-link">{isRTL ? "المستندات" : "Documents"}</a>}
            <a href="#related-services-heading" className="service-anchor-link">{isRTL ? "الخدمات المرتبطة" : "Related services"}</a>
            <a href="#service-process-heading" className="service-anchor-link">{isRTL ? "خطوات العمل" : "Our process"}</a>
            {displayFaqs.length > 0 && <a href="#service-faq-heading" className="service-anchor-link">{isRTL ? "الأسئلة الشائعة" : "FAQs"}</a>}
            <a href="#official-sources-heading" className="service-anchor-link">{isRTL ? "المصادر الرسمية" : "Legal sources"}</a>
          </div>
        </div>
      </nav>

      <div className="premium-content-shell py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="lg:col-span-8 xl:col-span-9">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <section className="service-answer-panel mb-9 border border-[#0d4a31]/14 border-s-4 border-s-[#b4924a] bg-[#eef4f0] p-6 lg:p-8" aria-labelledby="service-answer-heading">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d4a31] text-[#d5ae5d]">
                  <MessageSquareText className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 id="service-answer-heading" className="text-2xl font-serif font-bold text-foreground mb-3">
                  {isRTL ? `استشارة ${data.title} في ${countryName}` : `${data.title} consultation in ${countryName}`}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isRTL
                    ? `تساعد كاونسلو الأفراد والشركات في فهم مسائل ${data.title}، ومراجعة المستندات، وتحديد الخيارات العملية، وبدء الاستشارة أونلاين بسرية عبر واتساب أو البريد الإلكتروني.`
                    : `CounselO helps individuals and businesses understand ${data.title.toLowerCase()} matters, review documents, identify practical options, and begin a confidential online consultation through WhatsApp or email.`}
                </p>
              </section>

              <nav aria-label={isRTL ? "محتويات الصفحة" : "On this page"} className="service-page-index mb-12 border-y border-[#0d4a31]/16 py-5">
                <p className="text-sm font-bold text-foreground mb-3">{isRTL ? "في هذه الصفحة" : "On this page"}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {commonIssues.length > 0 && <a href="#common-problems-heading" className="text-primary hover:underline">{isRTL ? "المشكلات الشائعة" : "Common problems"}</a>}
                  {documents.length > 0 && <a href="#documents-heading" className="text-primary hover:underline">{isRTL ? "المستندات" : "Documents"}</a>}
                  <a href="#related-services-heading" className="text-primary hover:underline">{isRTL ? "الخدمات المرتبطة" : "Related services"}</a>
                  <a href="#service-process-heading" className="text-primary hover:underline">{isRTL ? "خطوات العمل" : "Our process"}</a>
                  {displayFaqs.length > 0 && <a href="#service-faq-heading" className="text-primary hover:underline">{isRTL ? "الأسئلة الشائعة" : "FAQs"}</a>}
                  <a href="#official-sources-heading" className="text-primary hover:underline">{isRTL ? "المصادر الرسمية" : "Official sources"}</a>
                </div>
              </nav>

              {/* Overview — handles both single-string and multi-paragraph formats */}
              <div id="service-overview" className="prose prose-green max-w-none mb-16 scroll-mt-36 speakable-overview">
                {displayOverview && (
                  <p className="text-lg text-muted-foreground leading-relaxed">{displayOverview}</p>
                )}
                {displayOverview1 && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">{displayOverview1}</p>
                )}
                {displayOverview2 && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">{displayOverview2}</p>
                )}
                {displayExperienceNote && (
                  <p className="text-base text-muted-foreground italic border-s-4 border-primary/40 ps-4 mt-4">
                    {displayExperienceNote}
                  </p>
                )}
              </div>

              <h2 id="service-covers-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-7">{sd.coversHeading}</h2>
              <div className="service-content-band mb-16 grid bg-[#eef4f0] p-2 sm:grid-cols-2 speakable-covers">
                {displayCovers.map((item, i) => (
                  <div key={i} className="flex min-h-24 items-start gap-4 border-b border-e border-[#0d4a31]/12 bg-white/55 p-5 transition-colors hover:bg-white">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#aa7e28] mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {commonIssues.length > 0 && (
                <section className="mb-16" aria-labelledby="common-problems-heading">
                  <h2 id="common-problems-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-6">
                    {isRTL ? "المشكلات القانونية الشائعة" : "Common legal problems we can assess"}
                  </h2>
                  <ul className="grid gap-x-9 border-y border-[#0d4a31]/14 py-3 sm:grid-cols-2">
                    {commonIssues.map((issue) => <li key={issue} className="flex gap-3 border-b border-[#0d4a31]/10 py-4 text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#aa7e28]" strokeWidth={1.5}/><span>{issue}</span></li>)}
                  </ul>
                </section>
              )}

              {documents.length > 0 && (
                <section className="service-content-band mb-16 bg-[#eef4f0] p-7 lg:p-9" aria-labelledby="documents-heading">
                  <h2 id="documents-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-6">
                    {isRTL ? "مستندات تساعد في التقييم الأولي" : "Documents that help the initial assessment"}
                  </h2>
                  <ul className="grid gap-3 text-muted-foreground sm:grid-cols-2">
                    {documents.map((document) => <li key={document} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5"/><span>{document}</span></li>)}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-5">
                    {isRTL ? "قد تختلف المستندات المطلوبة حسب الوقائع والجهة المختصة. لا ترسل النسخة الأصلية الوحيدة من أي مستند." : "Required documents vary by the facts and relevant authority. Do not send the only original copy of any document."}
                  </p>
                </section>
              )}

              <section className="mb-16" aria-labelledby="related-services-heading">
                <h2 id="related-services-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-6">
                  {isRTL ? "خدمات قانونية مرتبطة" : "Related legal services"}
                </h2>
                <p className="text-muted-foreground mb-5">
                  {isRTL
                    ? "قد تتداخل المسألة الواحدة مع أكثر من مجال قانوني. استكشف الخدمات المرتبطة أو اطّلع على المقالات القانونية قبل طلب الاستشارة."
                    : "One matter can involve several areas of law. Explore closely related services or read the legal guides before requesting a consultation."}
                </p>
                <div className="grid border-y border-[#0d4a31]/14 sm:grid-cols-2">
                  {relatedServiceIds.map((serviceId) => {
                    const related = sd.services[serviceId as keyof typeof sd.services];
                    return (
                      <Link
                        key={serviceId}
                        href={`${regionPrefix}/services/${serviceId}`}
                        className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31]/12 bg-white p-5 font-semibold text-foreground transition-colors hover:bg-[#eef4f0] hover:text-primary"
                      >
                        <span>{isRTL ? `استشارة ${related.title}` : `${related.title} legal consultation`}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Link>
                    );
                  })}
                  <Link href="/blog" className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31]/12 bg-white p-5 font-semibold text-foreground transition-colors hover:bg-[#eef4f0] hover:text-primary">
                    <span>{isRTL ? "مقالات وإرشادات قانونية" : "Legal articles and practical guides"}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                  <Link href={`${regionPrefix}/contact?service=${id}`} className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31] bg-[#0d4a31] p-5 font-semibold text-white transition-colors hover:bg-[#073d29]">
                    <span>{isRTL ? `احجز استشارة ${data.title}` : `Book a ${data.title.toLowerCase()} consultation`}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#d5ae5d] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </section>

              <h2 id="service-process-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-8">{sd.processHeading}</h2>
              <div className="service-process-grid relative mb-16 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
                {displayProcess.map((step, i) => (
                  <div key={i} className="relative border-t border-[#0d4a31]/16 pt-8">
                    <div className="absolute -top-5 start-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#b4924a] font-serif text-lg font-bold text-white shadow-[0_0_0_6px_white]">
                      {i + 1}
                    </div>
                    <h3 className="mb-3 font-serif text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>

              {displayFaqs.length > 0 && (
                <div className="mt-4">
                  <h2 id="service-faq-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-8">
                    {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                  </h2>
                  <div className="border-t border-[#0d4a31]/18">
                    {displayFaqs.map((faq, i) => (
                      <div key={i} className="border-b border-[#0d4a31]/18">
                        <button
                          className="group flex w-full items-center justify-between py-6 text-start transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4924a]"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          aria-expanded={openFaq === i}
                        >
                          <span className="font-semibold text-foreground leading-snug pe-4">{faq.q}</span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#0d4a31]/14 bg-[#eef4f0]">
                            <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                          </span>
                        </button>
                        {openFaq === i && (
                          <div className="max-w-3xl pb-6">
                            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <section className="service-legal-sources mt-16 scroll-mt-36 border-t border-[#0d4a31]/16 bg-[#eef4f0] p-7 lg:p-9" aria-labelledby="official-sources-heading">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{isRTL ? "الشفافية القانونية" : "Legal transparency"}</p>
                <h2 id="official-sources-heading" className="text-3xl font-serif font-bold text-foreground mb-4">{isRTL ? "مصادر قانونية رسمية" : "Official legal sources"}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {isRTL
                    ? "تساعد الروابط الرسمية التالية في التحقق من النصوص النظامية. قد تتغير الأنظمة واللوائح، ويجب تقييم النص النافذ والوقائع الخاصة بكل حالة قبل الاعتماد عليه."
                    : "Use these official links to verify the underlying legal materials. Laws and regulations can change, and the current text and facts of each matter must be assessed before reliance."}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {legalSources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border-b border-[#0d4a31]/18 bg-white/50 p-4 font-semibold text-primary transition-colors hover:bg-white">
                        <span>{isRTL ? source.ar : source.en}</span><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-s-2 border-[#b4924a] bg-white/65 p-4 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{isRTL ? "مسؤول المحتوى:" : "Content responsibility:"}</strong>{" "}
                  {isRTL
                    ? `فريق المحتوى القانوني في كاونسلو. آخر تحديث: 13 يوليو 2026. هذه الصفحة معلومات عامة عن ${data.title} في ${countryName} وليست بديلاً عن استشارة مبنية على الوقائع.`
                    : `CounselO legal content team. Last updated 13 July 2026. This page provides general information about ${data.title.toLowerCase()} in ${countryName} and does not replace advice based on the facts.`}
                </div>
              </section>

            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="service-consultation-panel sticky top-36 overflow-hidden bg-[#0d4a31] p-7 text-white shadow-[0_24px_65px_rgba(13,74,49,0.18)] lg:p-8">
              <h3 className="mb-4 font-serif text-3xl font-semibold leading-tight text-white">{sd.sidebar.heading}</h3>
              <div className="mb-6 h-px w-14 bg-[#d5ae5d]" />
              <p className="mb-7 leading-relaxed text-white/68">
                {sd.sidebar.descPrefix}{data.title.toLowerCase()}{sd.sidebar.descSuffix}
              </p>
              <ul className="mb-7 space-y-3 border-y border-white/12 py-5 text-sm text-white/82">
                <li className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "استجابة مهنية خلال 24 ساعة" : "Professional response within 24 hours"}</li>
                <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "معلوماتك تعامل بسرية" : "Your information is treated confidentially"}</li>
              </ul>
              <Link
                href={`${regionPrefix}/contact?service=${id}`}
                data-cta="contact"
                data-region={region}
                data-lang={isRTL ? "ar" : "en"}
              >
                <Button className="w-full rounded-none bg-[#d5ae5d] py-6 text-base font-bold text-[#0d3e2a] hover:bg-[#e0bd73]">{sd.sidebar.ctaBtn}</Button>
              </Link>
              <div className="mt-6 flex items-start gap-3 border-t border-white/12 pt-6">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#d5ae5d]" />
                <div>
                  <p className="mb-1 text-sm text-white/58">{sd.sidebar.callLabel}</p>
                  <p className="font-mono text-lg font-medium text-white" dir="ltr">{sd.sidebar.phone}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <TrustSignals isArabic={isRTL} regionPrefix={regionPrefix} />
      <LatestContentCarousels isArabic={isRTL} region={region} serviceSlug={id} />
    </div>
  );
}
