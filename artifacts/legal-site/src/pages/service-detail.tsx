import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
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
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { TrustSignals } from "@/components/seo/TrustSignals";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";
import { getRegionalLegalSources, type LegalSource } from "@/lib/regional-legal-sources";
import { getLegalProblemPages, legalProblemPath } from "@/lib/legal-problem-pages";
import { COUNSELO_ENTITY_IDS, OMAR_AL_BAGHDADI, CONSULTATION_OPERATING_POLICY, getConsultationProduct } from "@workspace/api-zod";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const comprehensiveConsultation = getConsultationProduct("comprehensive-consultation");

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
  const overview       = typeof d.overview      === "string" ? d.overview      : null;
  const overview1      = typeof d.overview1     === "string" ? d.overview1     : null;
  const overview2      = typeof d.overview2     === "string" ? d.overview2     : null;
  const experienceNote = typeof d.experienceNote=== "string" ? d.experienceNote: null;
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
        ? `${data.title} في سوريا | استشارة قانونية أونلاين | كاونسلو`
        : `${data.title} في ${isUae ? "الإمارات" : "السعودية"} | استشارة قانونية أونلاين | كاونسلو`)
    : (isSyr
        ? (dataSeoTitle ?? `${data.title} Lawyer in Syria | Online Legal Consultation | CounselO`)
        : `${data.title} Lawyer in ${isUae ? "the UAE" : "Saudi Arabia"} | Online Legal Consultation | CounselO`);

  const seoDesc = isUae
    ? truncateMeta(isRTL
      ? `${data.subtitle} استشارة قانونية إماراتية أونلاين تراعي الاختصاص الاتحادي والمحلي والبرّ الرئيسي والمناطق الحرة بالعربية أو الإنجليزية.`
      : `${data.subtitle} UAE-focused online legal consultation covering federal, emirate-level, mainland and free-zone requirements in Arabic or English.`)
    : isRTL
      ? (syrSeo?.descAr ?? `${data.subtitle} — كاونسلو، منصة استشارات قانونية أونلاين في ${isSyr ? "سوريا" : "المملكة"}.`)
      : (syrSeo?.desc ?? `${data.subtitle} — CounselO, ${isSyr ? "Syria's" : "Saudi Arabia's"} online legal consultation platform.`);

  const seoKeywords = isUae && dataSeoKeywords
    ? dataSeoKeywords
    : isRTL
      ? (syrSeo?.kwAr ?? `${data.title} محامي ${isSyr ? "سوريا" : "المملكة العربية السعودية"}, استشارة قانونية أونلاين`)
      : (syrSeo?.kw ?? `${data.title} lawyer ${isSyr ? "Syria" : "Saudi Arabia"}, online legal consultation`);

  const serviceAddress = isUae
    ? { "@type": "PostalAddress", "addressCountry": "AE" }
    : isSyr
    ? { "@type": "PostalAddress", "addressCountry": "SY" }
    : { "@type": "PostalAddress", "addressCountry": "SA" };

  const hasFaqs = "faqs" in data && Array.isArray((data as Record<string, unknown>).faqs) && ((data as Record<string, unknown>).faqs as unknown[]).length > 0;
  const faqs = hasFaqs ? (data as Record<string, unknown>).faqs as { q: string; a: string }[] : [];
  const isJurisdictionSafe = (value: string) => {
    if (isUae) return !/(Saudi|KSA|SAMA|ZATCA|MISA|SAIP|Vision 2030|Syria|Syrian|السعود|ساما|هيئة الزكاة|سوريا|السوري)/i.test(value);
    if (isSyr) return !/(Saudi|KSA|SAMA|CMA|ZATCA|MISA|SAIP|CITC|Vision 2030|UAE|Emirates|DIFC|ADGM|السعود|ساما|هيئة الزكاة|الإمارات|مركز دبي المالي|أبوظبي العالمي)/i.test(value);
    return true;
  };
  const safeFaqs = faqs.filter((faq) => isJurisdictionSafe(`${faq.q} ${faq.a}`));
  const displayOverview = overview && isJurisdictionSafe(overview) ? overview : null;
  const displayOverview1 = overview1 && isJurisdictionSafe(overview1) ? overview1 : null;
  const displayOverview2 = overview2 && isJurisdictionSafe(overview2) ? overview2 : null;
  const displayExperienceNote = experienceNote && isJurisdictionSafe(experienceNote) ? experienceNote : null;
  const displayCovers = data.covers.filter((item) => isJurisdictionSafe(item));
  const uaeCommonIssues = Array.isArray(d.commonIssues)
    ? (d.commonIssues as string[]).filter(isJurisdictionSafe)
    : [];
  const uaeDocuments = Array.isArray(d.documents)
    ? (d.documents as string[]).filter(isJurisdictionSafe)
    : [];
  const searchContent = isUae ? undefined : SERVICE_SEARCH_CONTENT[id];
  const configuredRelatedServiceIds = isUae
    ? t.services.items.filter((service) => service.id !== id).slice(0, 3).map((service) => service.id)
    : (RELATED_SERVICES[id] ?? []).filter((serviceId) =>
        t.services.items.some((service) => service.id === serviceId),
      );
  const relatedServiceIds = [...new Set(configuredRelatedServiceIds)]
    .filter((serviceId) => serviceId !== id)
    .slice(0, 4);
  const commonIssues = isUae
    ? uaeCommonIssues
    : searchContent
      ? (isRTL ? searchContent.issuesAr : searchContent.issuesEn)
      : data.covers.slice(0, 5);
  const problemPages = getLegalProblemPages(region, id);
  const documents = isUae
    ? uaeDocuments
    : searchContent
      ? (isRTL ? searchContent.documentsAr : searchContent.documentsEn)
      : [];
  const countryName = isRTL
    ? (isSyr ? "سوريا" : isUae ? "الإمارات" : "السعودية")
    : (isSyr ? "Syria" : isUae ? "the United Arab Emirates" : "Saudi Arabia");
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
  const regionSeg = `/${region}`;
  const canonicalUrlFull = `https://counselo-legal.com${regionSeg}${langSeg}${canonicalPath}`;
  const regionBase = `https://counselo-legal.com${regionSeg}${langSeg}`;
  const inLanguage = isRTL ? (isSyr ? "ar-SY" : isUae ? "ar-AE" : "ar-SA") : (isSyr ? "en-SY" : isUae ? "en-AE" : "en-SA");
  const legalSources = getRegionalLegalSources(region, id);

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "@id": `https://counselo-legal.com/#${region}-service-${id}`,
      "name": isRTL ? `${data.title} — كاونسلو` : `${data.title} — CounselO`,
      "description": seoDesc,
      "url": canonicalUrlFull,
      "areaServed": { "@type": "Country", "name": isSyr ? "Syria" : isUae ? "United Arab Emirates" : "Saudi Arabia" },
      "availableLanguage": ["Arabic", "English"],
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
      "dateModified": "2026-08-02",
      "citation": legalSources.map((source) => source.href),
      "publisher": {
        "@type": "LegalService",
        "@id": COUNSELO_ENTITY_IDS.organization,
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
                ? `${data.title} في ${isSyr ? "سوريا" : isUae ? "الإمارات العربية المتحدة" : "المملكة العربية السعودية"}`
                : isUae
                  ? `${data.title} in the United Arab Emirates`
                  : `${data.title} Lawyer in ${isSyr ? "Syria" : "Saudi Arabia"}`}
            </h1>
            <div className="mb-6 h-px w-20 bg-[#d5ae5d]" />
            <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-white/72 lg:text-2xl">{data.subtitle}</p>
          </motion.div>
          </div>
      </section>

      <nav aria-label={isRTL ? "أقسام صفحة الخدمة" : "Service page sections"} className="service-anchor-rail sticky top-[4.5rem] z-[60] border-b border-[#0d4a31]/12 bg-white/95 backdrop-blur">
        <div className="premium-content-shell overflow-x-auto">
          <div className="flex min-w-max items-center gap-7 py-4 text-sm font-semibold text-[#355447]">
            <a href="#consultation-package-heading" className="service-anchor-link">{isRTL ? "حزمة الاستشارة" : "Consultation package"}</a>
            <a href="#service-overview" className="service-anchor-link">{isRTL ? "نظرة عامة" : "Overview"}</a>
            <a href="#counselO-role-heading" className="service-anchor-link">{isRTL ? "دور كاونسلو" : "How CounselO helps"}</a>
            <a href="#service-covers-heading" className="service-anchor-link">{sd.coversHeading}</a>
            {commonIssues.length > 0 && <a href="#common-problems-heading" className="service-anchor-link">{isRTL ? "المشكلات الشائعة" : "Common problems"}</a>}
            {documents.length > 0 && <a href="#documents-heading" className="service-anchor-link">{isRTL ? "المستندات" : "Documents"}</a>}
            <a href="#service-scope-heading" className="service-anchor-link">{isRTL ? "النطاق والتمثيل" : "Scope and representation"}</a>
            <a href="#service-process-heading" className="service-anchor-link">{isRTL ? "خطوات العمل" : "Our process"}</a>
            {displayFaqs.length > 0 && <a href="#service-faq-heading" className="service-anchor-link">{isRTL ? "الأسئلة الشائعة" : "FAQs"}</a>}
            <a href="#official-sources-heading" className="service-anchor-link">{isRTL ? "المصادر الرسمية" : "Legal sources"}</a>
            <a href="#related-services-heading" className="service-anchor-link">{isRTL ? "الخدمات المرتبطة" : "Related services"}</a>
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
                    ? `تساعد كاونسلو الأفراد والشركات في فهم مسائل ${data.title} في ${countryName}، ومراجعة المستندات، وتحديد الخيارات العملية، وبدء حزمة استشارة مهنية أونلاين عبر واتساب أو البريد الإلكتروني، مع تحديد القانون والجهة والنطاق قبل تأكيد العمل.`
                    : `CounselO helps individuals and businesses understand ${data.title.toLowerCase()} matters in ${countryName}, review documents, identify practical options, and begin a professional online consultation package through WhatsApp or email, with the law, authority and scope identified before work is confirmed.`}
                </p>
              </section>

              {comprehensiveConsultation && (
                <section className="service-content-band mb-12 border border-[#0d4a31]/14 bg-white p-7 lg:p-9" aria-labelledby="consultation-package-heading">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{isRTL ? "حزمة الاستشارة" : "Consultation package"}</p>
                  <h2 id="consultation-package-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-4">
                    {isRTL ? comprehensiveConsultation.titleAr : comprehensiveConsultation.titleEn}
                  </h2>
                  <p className="mb-6 max-w-3xl leading-relaxed text-muted-foreground">
                    {isRTL ? comprehensiveConsultation.summaryAr : comprehensiveConsultation.summaryEn}
                  </p>
                  <ul className="grid gap-3 text-muted-foreground sm:grid-cols-2">
                    {(isRTL ? comprehensiveConsultation.includesAr : comprehensiveConsultation.includesEn).map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-sm bg-[#eef4f0] p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid gap-4 border-t border-[#0d4a31]/14 pt-5 text-sm text-muted-foreground md:grid-cols-2">
                    <p><strong className="text-foreground">{isRTL ? "المخرج الأساسي:" : "Primary deliverable:"}</strong> {isRTL ? CONSULTATION_OPERATING_POLICY.deliveryAr : CONSULTATION_OPERATING_POLICY.deliveryEn}</p>
                    <p><strong className="text-foreground">{isRTL ? "المتابعة والتمثيل:" : "Follow-up and representation:"}</strong> {isRTL ? `${CONSULTATION_OPERATING_POLICY.monitoringAr} ${CONSULTATION_OPERATING_POLICY.representationAr}` : `${CONSULTATION_OPERATING_POLICY.monitoringEn} ${CONSULTATION_OPERATING_POLICY.representationEn}`}</p>
                  </div>
                </section>
              )}

              {/* Overview — handles both single-string and multi-paragraph formats */}
              <section id="service-overview" className="prose prose-green max-w-none mb-16 scroll-mt-36 speakable-overview" aria-labelledby="service-overview-heading">
                <h2 id="service-overview-heading" className="not-prose mb-5 text-3xl font-serif font-bold text-foreground">
                  {isRTL ? `عن ${data.title} في ${countryName}` : `About ${data.title} in ${countryName}`}
                </h2>
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
              </section>

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
                    {commonIssues.map((issue, index) => {
                      const problem = problemPages[index];
                      return (
                        <li key={issue} className="flex gap-3 border-b border-[#0d4a31]/10 py-4 text-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#aa7e28]" strokeWidth={1.5}/>
                          {problem ? (
                            <Link
                              href={legalProblemPath(region, isRTL ? "ar" : "en", id, problem.slug)}
                              className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                              {isRTL ? problem.titleAr : problem.titleEn}
                            </Link>
                          ) : <span>{issue}</span>}
                        </li>
                      );
                    })}
                  </ul>
                  {problemPages.length > 0 && (
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {isRTL
                        ? "افتح أي مسألة للاطلاع على المستندات المفيدة والمسار الأولي والاختصاص ذي الصلة."
                        : "Open a problem to see useful documents, the initial route and the relevant jurisdictional context."}
                    </p>
                  )}
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

              <section className="service-content-band mb-16 border border-[#0d4a31]/14 bg-white p-7 lg:p-9" aria-labelledby="service-scope-heading">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">{isRTL ? "النطاق والالتزام" : "Scope and engagement"}</p>
                <h2 id="service-scope-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-6">
                  {isRTL ? "ماذا يحدث بعد التقييم الأولي؟" : "What happens after the initial assessment?"}
                </h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="border-s-2 border-[#b4924a] bg-[#eef4f0] p-4">
                    <dt className="font-semibold text-foreground">{isRTL ? "الرد المتوقع" : "Response"}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? "وقت استجابة مهني مستهدف خلال 24 ساعة، بحسب النطاق والاستعجال واكتمال المعلومات وتوفر الخدمة." : "A professional response is targeted within 24 hours, subject to scope, urgency, intake completeness and service availability."}</dd>
                  </div>
                  <div className="border-s-2 border-[#b4924a] bg-[#eef4f0] p-4">
                    <dt className="font-semibold text-foreground">{isRTL ? "الرسوم والمخرجات" : "Fee and deliverable"}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? "يحدد المنتج والرسوم والمخرج بعد الدراسة الأولية وقبل بدء العمل المدفوع." : "The consultation product, fee and deliverable are confirmed after the initial study and before paid work begins."}</dd>
                  </div>
                  <div className="border-s-2 border-[#b4924a] bg-[#eef4f0] p-4">
                    <dt className="font-semibold text-foreground">{isRTL ? "التمثيل أمام المحاكم" : "Court representation"}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? "إذا طُلب أو أصبح ضرورياً، يمكن ترتيبه بتكليف مستقل عبر شريك أو مكتب متعاون مرخص في الدولة المعنية." : "If requested or necessary, it can be arranged under a separate engagement through a licensed partner professional or cooperating office in the relevant jurisdiction."}</dd>
                  </div>
                  <div className="border-s-2 border-[#b4924a] bg-[#eef4f0] p-4">
                    <dt className="font-semibold text-foreground">{isRTL ? "حدود الاستشارة" : "Consultation boundary"}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{isRTL ? "لا تنشئ الاستشارة وحدها تفويضاً بالتمثيل أو الحضور أو الإيداع أمام محكمة أو جهة." : "An online consultation alone does not create a mandate for court appearance, filing or representation."}</dd>
                  </div>
                </dl>
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
                    ? `أعدّها فريق المحتوى القانوني في كاونسلو، مع إسناد مسؤولية المراجعة القانونية إلى المراجع المبين في سجل المحتوى عند الاقتضاء. آخر تحديث جوهري: 13 يوليو 2026. هذه الصفحة معلومات عامة عن ${data.title} في ${countryName}، والروابط الرسمية فيها نقاط بدء للتحقق وليست بديلاً عن مراجعة النص النافذ والوقائع والاستشارة المتخصصة.`
                    : `Prepared by the CounselO legal content team, with legal-review responsibility assigned through the content record where applicable. Last substantive review: 13 July 2026. This page provides general information about ${data.title.toLowerCase()} in ${countryName}; the official links are starting points for verification and do not replace checking the operative text, facts and qualified advice.`}
                </div>
              </section>

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
                        <span>{isRTL ? related.title : related.title}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Link>
                    );
                  })}
                  <Link href={isRTL ? "/blog/ar" : "/blog"} className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31]/12 bg-white p-5 font-semibold text-foreground transition-colors hover:bg-[#eef4f0] hover:text-primary">
                    <span>{isRTL ? "مقالات وإرشادات قانونية" : "Legal articles and practical guides"}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                  <Link href={isRTL ? "/ar/legal-library" : "/legal-library"} className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31]/12 bg-white p-5 font-semibold text-foreground transition-colors hover:bg-[#eef4f0] hover:text-primary">
                    <span>{isRTL ? "مكتبة كاونسلو القانونية" : "CounselO Legal Library"}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                  <Link href={`${regionPrefix}/contact?service=${id}`} data-cta="contact" data-conversion-position="service-related" data-region={region} data-lang={isRTL ? "ar" : "en"} className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31] bg-[#0d4a31] p-5 font-semibold text-white transition-colors hover:bg-[#073d29]">
                    <span>{isRTL ? "ابدأ مناقشة مسألتك" : "Discuss your matter"}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#d5ae5d] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
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
                <li className="flex items-center gap-3"><MessageSquareText className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "مخرج مكتوب عبر واتساب أو البريد الإلكتروني" : "Written deliverable via WhatsApp or email"}</li>
                <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "النطاق والرسوم يؤكدان قبل العمل المدفوع" : "Scope and fee confirmed before paid work"}</li>
              </ul>
              <Button asChild className="w-full rounded-none bg-[#d5ae5d] py-6 text-base font-bold text-[#0d3e2a] hover:bg-[#e0bd73]">
                <Link
                  href={`${regionPrefix}/contact?service=${id}`}
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
            </motion.div>
          </div>
        </div>
      </div>
      <TrustSignals isArabic={isRTL} regionPrefix={regionPrefix} compact />
      <JurisdictionDisclosure jurisdiction={region} compact />
      <LatestContentCarousels isArabic={isRTL} region={region} serviceSlug={id} />
    </div>
  );
}
