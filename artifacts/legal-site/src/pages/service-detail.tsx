import { ReadingNavigation } from "@/components/legal/reading-navigation";
import { ReadingDetails } from "@/components/legal/reading-details";
import { serviceFrameworkCopy } from "@/lib/service-framework-copy";
import { saudiServiceBrief, saudiServiceBriefModifiedAt } from "@/lib/saudi-service-briefs";
import { ServiceProcess, ServiceReasons, ServiceCosts } from "@/components/legal/saudi-service-journey";
import { serviceLegalOverview } from "@/lib/service-legal-overviews";
import { serviceFrameworkSources } from "@/lib/service-framework-sources";
import { SEARCH_COPY_UPDATED_AT, searchIntentMeta, serviceSearchCopy } from "@/lib/search-intent-copy";
import * as m from "framer-motion/m";
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
import { SERVICE_INTAKE_CONTENT, UAE_RELATED_SERVICES, BILINGUAL_SERVICE_COVERAGE } from "@/lib/service-intake-content";
import { getServiceIntentFaqs } from "@/lib/service-intent-faqs";
import { editorialFaqs } from "@/lib/search-intent-editorial";
import { UAE_SERVICES } from "@/data/uae-legal-services";
import { buildUaeServicePageContent } from "@/data/uae-service-page-content";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { TrustSignals } from "@/components/seo/TrustSignals";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";
import { getRegionalLegalSources, type LegalSource } from "@/lib/regional-legal-sources";
import { serviceGuidanceUpdatedAt, sourceBackedSearchGuidance } from "@/lib/source-backed-search-guidance";
import { getLegalProblemPages, legalProblemPath } from "@/lib/legal-problem-pages";
import { COUNSELO_ENTITY_IDS, COUNSELO_ORGANIZATION, regionalServiceEntity, OMAR_AL_BAGHDADI, CONSULTATION_OPERATING_POLICY, getConsultationProduct } from "@workspace/api-zod/browser";

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

  const fallbackSeoTitle = isUae
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

  const fallbackSeoDesc = isUae
    ? truncateMeta(isRTL
      ? `${data.subtitle} استشارة قانونية إماراتية أونلاين تراعي الاختصاص الاتحادي والمحلي والبرّ الرئيسي والمناطق الحرة بالعربية أو الإنجليزية.`
      : `${data.subtitle} UAE-focused online legal consultation covering federal, emirate-level, mainland and free-zone requirements in Arabic or English.`)
    : isRTL
      ? (syrSeo?.descAr ?? `${data.subtitle} — كاونسلو للاستشارات القانونية، منصة استشارات قانونية أونلاين في ${isSyr ? "سوريا" : "المملكة"}.`)
      : (syrSeo?.desc ?? `${data.subtitle} — CounselO Legal, ${isSyr ? "Syria's" : "Saudi Arabia's"} online legal consultation platform.`);

  const seoKeywords = isUae && dataSeoKeywords
    ? dataSeoKeywords
    : isRTL
      ? (syrSeo?.kwAr ?? `${data.title} محامي ${isSyr ? "سوريا" : "المملكة العربية السعودية"}, استشارة قانونية أونلاين`)
      : (syrSeo?.kw ?? `${data.title} lawyer ${isSyr ? "Syria" : "Saudi Arabia"}, online legal consultation`);

  const currentMeta = searchIntentMeta(`${regionPrefix}/services/${id}`);
  const seoTitle = currentMeta?.title ?? fallbackSeoTitle;
  const seoDesc = currentMeta?.description ?? fallbackSeoDesc;

  const isJurisdictionSafe = (value: string) => {
    if (isUae) return !/(Saudi|KSA|SAMA|ZATCA|MISA|SAIP|Vision 2030|Syria|Syrian|السعود|ساما|هيئة الزكاة|سوريا|السوري)/i.test(value);
    if (isSyr) return !/(Saudi|KSA|SAMA|CMA|ZATCA|MISA|SAIP|CITC|Vision 2030|UAE|Emirates|DIFC|ADGM|السعود|ساما|هيئة الزكاة|الإمارات|مركز دبي المالي|أبوظبي العالمي)/i.test(value);
    return true;
  };
  const displayCovers = (!isUae && BILINGUAL_SERVICE_COVERAGE[id] ? BILINGUAL_SERVICE_COVERAGE[id][isRTL ? "ar" : "en"] : data.covers).filter((item) => isJurisdictionSafe(item));
  const uaeDocuments = Array.isArray(d.documents)
    ? (d.documents as string[]).filter(isJurisdictionSafe)
    : [];
  const searchContent = isUae ? undefined : SERVICE_SEARCH_CONTENT[id];
  const configuredRelatedServiceIds = isUae
    ? (UAE_RELATED_SERVICES[id] ?? [])
    : (RELATED_SERVICES[id] ?? []).filter((serviceId) =>
        t.services.items.some((service) => service.id === serviceId),
      );
  const relatedServiceIds = [...new Set(configuredRelatedServiceIds)]
    .filter((serviceId) => serviceId !== id)
    .slice(0, 4);
  const problemPages = getLegalProblemPages(region, id);
  const intake = SERVICE_INTAKE_CONTENT[id];
  const documents = intake ? intake.documents[isRTL ? "ar" : "en"] : isUae
    ? uaeDocuments
    : searchContent
      ? (isRTL ? searchContent.documentsAr : searchContent.documentsEn)
      : [];
  const countryName = isRTL
    ? (isSyr ? "سوريا" : isUae ? "الإمارات" : "السعودية")
    : (isSyr ? "Syria" : isUae ? "the United Arab Emirates" : "Saudi Arabia");
  const universalFaqs = isRTL
    ? [
        { q: `هل يمكن الحصول على استشارة ${data.title} أونلاين في ${countryName}؟`, a: "نعم. يمكن بدء التقييم القانوني ومراجعة المستندات عبر واتساب أو البريد الإلكتروني. إذا تطلبت المسألة حضوراً أو تمثيلاً رسمياً، يوضح الفريق الخطوة المناسبة بعد مراجعة التفاصيل." },
        { q: "ما المستندات التي أرسلها قبل الاستشارة؟", a: "أرسل العقود والمراسلات والإشعارات والقرارات وأي مستند يوضح التسلسل الزمني للوقائع. تجنب إرسال النسخ الوحيدة من الأصول، واحجب البيانات غير الضرورية." },
        { q: "متى يجب طلب المشورة القانونية؟", a: "اطلب المشورة بمجرد ظهور نزاع أو استلام إشعار أو قبل توقيع مستند مهم. التحرك المبكر يساعد على حفظ الأدلة وفهم الخيارات قبل اتخاذ قرار يصعب الرجوع عنه." },
        { q: "هل يمكن مراجعة عقد أو قرار أو ملف قبل بدء الإجراءات؟", a: "نعم. تساعد المراجعة الأولية على تحديد المخاطر ونقاط القوة والمعلومات الناقصة والمسار العملي المناسب قبل التفاوض أو تقديم أي طلب." },
        { q: "هل تبقى معلومات الاستشارة سرية؟", a: "تتعامل كاونسلو للاستشارات القانونية مع المعلومات والمستندات القانونية وفق التزامات السرية المهنية والخصوصية وحماية البيانات الواجبة التطبيق، مع مراعاة حالات الإفصاح المطلوبة أو المسموح بها قانوناً." },
      ]
    : [
        { q: `Can I get an online ${data.title.toLowerCase()} consultation for ${countryName}?`, a: "Yes. The initial legal assessment and document review can begin through WhatsApp or email. If formal representation or attendance is required, the team explains the appropriate next step after reviewing the matter." },
        { q: "What documents should I send before the consultation?", a: "Send relevant contracts, correspondence, notices, decisions, and a dated summary of events. Do not send the only copy of an original document, and redact unrelated sensitive information." },
        { q: "When should I seek legal advice?", a: "Seek advice when a dispute first appears, when you receive a notice, or before signing an important document. Early review helps preserve evidence and clarify options before an avoidable commitment is made." },
        { q: "Can CounselO Legal review a contract, decision, or case file before proceedings begin?", a: "Yes. An initial review can identify legal and practical risks, strengths, missing information, and the most appropriate route before negotiation or a formal filing." },
        { q: "Is my consultation information confidential?", a: "CounselO Legal handles legal information and documents under applicable professional-confidentiality, privacy and data-protection obligations, subject to legally required or permitted disclosures." },
      ];
  const uaeService = isUae ? UAE_SERVICES.find(service => service.slug === id) : undefined;
  const regionalFaqs = uaeService ? buildUaeServicePageContent(uaeService).faqs[isRTL ? "ar" : "en"] : universalFaqs;
  const frameworkSources = serviceFrameworkSources(region, id);
  const frameworkCopy = serviceFrameworkCopy(region, id, isRTL ? "ar" : "en");
  const legalOverview = serviceLegalOverview(region, id, isRTL ? "ar" : "en");
  const substantiveAnswers = [...sourceBackedSearchGuidance(region, id)]
    .sort((a, b) => Number(b.id.includes("-hub-")) - Number(a.id.includes("-hub-")))
    .slice(0, 3);
  const substantiveQuestions = new Set(substantiveAnswers.map(item => item[isRTL ? "ar" : "en"].q));
  const displayFaqs = [...getServiceIntentFaqs(region, id, isRTL, data.title, documents, displayCovers), ...editorialFaqs(`${regionPrefix}/services/${id}`, region, isRTL), ...regionalFaqs].filter(faq => !substantiveQuestions.has(faq.q));
  const openingGuidance = substantiveAnswers[0];
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
  const serviceSummary = intake ? `${isRTL ? `استشارة ${data.title} في ${countryName}.` : `${data.title} consultation in ${countryName}.`} ${intake.summary[isRTL ? "ar" : "en"]}` : isRTL
    ? `تقييم قانوني مركز لمسائل ${data.title} في ${countryName}: نحدد الإطار النظامي والجهة المختصة والمستندات والمواعيد والخيارات قبل تأكيد نطاق العمل.`
    : `A focused legal assessment for ${data.title.toLowerCase()} matters in ${countryName}: we identify the applicable framework, competent authority, documents, timing and options before confirming scope.`;
  const saudiBrief = saudiServiceBrief(region, id, isRTL ? "ar" : "en");
  const serviceContactHref = `${regionPrefix}/contact?service=${id}#consultation-request`;


  const schemas: object[] = [
    { "@context": "https://schema.org", ...regionalServiceEntity(region, id, data.title, seoDesc, isRTL ? "ar" : "en") },
    { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
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
      "dateModified": serviceGuidanceUpdatedAt(region, id, saudiBrief ? saudiServiceBriefModifiedAt(id) : SEARCH_COPY_UPDATED_AT),
      "citation": legalSources.map((source) => source.href),
      "about": { "@id": `https://counselo-legal.com/#${region}-service-${id}` },
      "publisher": {
        "@id": COUNSELO_ENTITY_IDS.organization,
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
    <div className={`counselo-editorial-page service-brief-page service-reading-page w-full bg-background min-h-screen${region === "sa" ? " saudi-reading-page" : ""}`}>
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
            <Link href={regionPrefix} className="transition-colors hover:text-[#d5ae5d]">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="transition-colors hover:text-[#d5ae5d]">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="font-medium text-white">{data.title}</span>
          </nav>

          <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
            {region !== "sa" && <Link href={`${regionPrefix}/services`} className="mb-7 inline-flex items-center text-sm font-medium text-[#d5ae5d] transition-colors hover:text-white">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} /> {sd.backLink}
            </Link>}
            <h1 className="mb-6 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-white lg:text-7xl">
              {serviceSearchCopy(id, region, isRTL ? "ar" : "en")?.heading ?? data.title}
            </h1>
            <div className="mb-6 h-px w-20 bg-[#d5ae5d]" />
            <p className="mb-7 max-w-3xl font-serif text-xl italic leading-relaxed text-white/72 lg:text-2xl">{saudiBrief?.intro ?? (intake ? intake.summary[isRTL ? "ar" : "en"] : serviceSummary)}</p>
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

      <ReadingNavigation enabled={true} pageKey={`${regionPrefix}/${id}`} label={isRTL ? "أقسام صفحة الخدمة" : "Service page sections"} className="service-anchor-rail sticky top-[4.5rem] z-[60] border-b border-[#0d4a31]/12 bg-white/95 backdrop-blur">
        <div className="premium-content-shell overflow-x-auto">
          <div className="flex min-w-max items-center gap-7 py-4 text-sm font-semibold text-[#355447]">
            <a href="#service-overview" className="service-anchor-link">{isRTL ? "الخطوات" : "Process"}</a>
            <a href="#service-scope-heading" className="service-anchor-link">{isRTL ? "الأتعاب" : "Fees"}</a>
            <a href="#service-faq-heading" className="service-anchor-link">{isRTL ? "الأسئلة" : "FAQs"}</a>
            <a href="#service-legal-checks" className="service-anchor-link">{isRTL ? "لماذا كاونسلو؟" : "Why CounselO?"}</a>
            <a href="#service-contact" className="service-anchor-link">{isRTL ? "تواصل معنا" : "Contact"}</a>
          </div>
        </div>
      </ReadingNavigation>

      <div className="premium-content-shell saudi-service-body py-12 lg:py-16">
        <div className="saudi-service-layout grid gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="saudi-service-main lg:col-span-8 xl:col-span-9">
            <m.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {openingGuidance && (
                <section id="service-direct-answer" className="mb-12 scroll-mt-36 border-s-4 border-[#b4924a] bg-[#eef4f0] p-6 lg:p-8" aria-labelledby="service-direct-answer-heading">
                  <h2 id="service-direct-answer-heading" className="mb-4 font-serif text-3xl leading-snug">{openingGuidance[isRTL ? "ar" : "en"].q}</h2>
                  <p className="text-lg leading-8">{openingGuidance[isRTL ? "ar" : "en"].a}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-6" aria-label={isRTL ? "مصادر هذا الشرح" : "Sources for this explanation"}>
                    {openingGuidance.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source[isRTL ? "ar" : "en"]}</a></li>)}
                  </ul>
                </section>
              )}
              <section id="service-overview" className="mb-12 scroll-mt-36" aria-labelledby="service-overview-heading">
                <h2 id="service-overview-heading" className="mb-6 font-serif text-3xl">{isRTL ? "كيف تحصل على الخدمة؟" : "How the service works"}</h2>
                <ServiceProcess isArabic={isRTL} />
                {saudiBrief && <div className="mt-6" data-saudi-service-brief={id}>
                  <h3 className="mb-3 font-serif text-xl">{region === "sa" ? (isRTL ? "اختر مسألتك" : "Choose your issue") : (isRTL ? "اختر المرحلة الأقرب إلى مسألتك" : "Choose the stage that matches your matter")}</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {saudiBrief.choices.map(choice => <li key={choice.path} className="min-w-0">
                      <Link href={`${regionPrefix}/services/${choice.path}`} className="block h-full border border-primary/20 bg-[#eef4f0] p-4 leading-7 text-primary underline underline-offset-4">{choice.label}<ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 rtl:rotate-180" /></Link>
                    </li>)}
                  </ul>

                </div>}
                {region === "sa" && <nav className="mt-5 flex flex-wrap gap-5 text-sm" aria-label={isRTL ? "روابط المسائل والمراجع" : "Issue guides and references"}>
                  <a className="text-primary underline underline-offset-4" href="#common-problems-heading">{isRTL ? "جميع المسائل" : "All issue guides"}</a>
                  <a className="text-primary underline underline-offset-4" href="#service-legal-framework">{isRTL ? "القواعد القانونية" : "Legal context"}</a>
                  <a className="text-primary underline underline-offset-4" href="#official-sources-heading">{isRTL ? "المصادر" : "Sources"}</a>
                </nav>}
              </section>

              <section id="service-legal-framework" className="service-answer-panel mb-12 border border-[#0d4a31]/14 border-s-4 border-s-[#b4924a] bg-[#eef4f0] p-6 lg:p-8" aria-labelledby="service-framework-heading">
                <h2 id="service-framework-heading" className="mb-5 font-serif text-3xl">{region === "sa" ? (isRTL ? "القواعد المرتبطة بمسألتك" : "Legal context") : (isRTL ? `عن ${data.title} في ${countryName}` : `About ${data.title} in ${countryName}`)}</h2>
                <p className="text-lg leading-8 text-muted-foreground">{legalOverview}</p>
                <ReadingDetails enabled={true} title={region === "sa" ? (isRTL ? "القواعد والإجابات القانونية" : "Legal rules and answers") : (isRTL ? "اقرأ الإطار القانوني والإجابات المسندة إلى مصادر" : "Read the legal framework and sourced answers")}>
                <div className="mt-6 border-t border-[#0d4a31]/15 pt-6" data-service-framework>
                  <h3 className="mb-3 font-serif text-2xl">{isRTL ? "الأطر القانونية والمسار المختص" : "Relevant frameworks and legal route"}</h3>
                  <p className="leading-8 text-muted-foreground">{frameworkCopy}</p>
                </div>
                {frameworkSources.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm">
                    {frameworkSources.map(source => <li key={source.href}><a className="text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">{isRTL ? source.ar : source.en}</a></li>)}
                  </ul>
                )}
                <h3 className="mb-5 mt-8 font-serif text-2xl">{isRTL ? "الإطار القانوني وأسئلة تغيّر المسار" : "Legal framework and questions that change the route"}</h3>
                {substantiveAnswers.slice(1).map((item, index) => {
                  const answer = item[isRTL ? "ar" : "en"];
                  const content = <>
                    <p className="mt-3 leading-8 text-muted-foreground">{answer.a}</p>
                    <ul className="mb-5 mt-4 space-y-2 text-sm" aria-label={isRTL ? "مصادر هذه الإجابة" : "Sources for this answer"}>
                      {item.sources.map(source => <li key={source.href}><a className="inline-flex items-start gap-2 text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer"><ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true"/><span>{isRTL ? source.ar : source.en}</span></a></li>)}
                    </ul>
                  </>;
                  return index === 0
                    ? <article key={item.id} data-source-answer={item.id}><h4 className="text-lg font-semibold">{answer.q}</h4>{content}</article>
                    : <details key={item.id} data-source-answer={item.id} className="border-t border-[#0d4a31]/15 py-4"><summary className="cursor-pointer font-semibold">{answer.q}</summary>{content}</details>;
                })}
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{region === "sa" ? (isRTL ? "المصادر نصوص أو إرشادات أو تقارير رسمية. تحقّق من التعديلات والنص النافذ وقت الواقعة." : "Sources include legislation, guidance and official reports. Check amendments and the text applicable when events occurred.") : (isRTL ? "تدعم المصادر الإجابات المرتبطة بها؛ وقد تكون نصاً تشريعياً أو إرشاداً من جهة مختصة أو تقريراً رسمياً، وليست جميعها نصوصاً تشريعية موحدة. يجب التحقق من التعديلات والنص النافذ وقت الواقعة. للاطلاع على الوقائع والمستندات والخطوات بمزيد من التفصيل، اختر المسألة المناسبة أدناه." : "Sources support the answers beside them and may be legislation, authority guidance or official reporting; they are not all consolidated legal texts. Check amendments and the text applicable when the events occurred. Choose a problem below for more detailed facts, documents and next steps.")}</p>
                </ReadingDetails>
              </section>

              <ServiceReasons isArabic={isRTL} regionPrefix={regionPrefix} />

              <h2 id="service-covers-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-7">{sd.coversHeading}</h2>
              <div className="service-content-band mb-16 grid bg-[#eef4f0] p-2 sm:grid-cols-2 speakable-covers">
                {displayCovers.map((item, i) => (
                  <div key={i} className="flex min-h-24 items-start gap-4 border-b border-e border-[#0d4a31]/12 bg-white/55 p-5 transition-colors hover:bg-white">
                    {region === "sa" ? <span aria-hidden="true" className="shrink-0 text-[#aa7e28]">✓</span> : <CheckCircle2 className="h-5 w-5 shrink-0 text-[#aa7e28] mt-0.5" strokeWidth={1.5} />}
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {problemPages.length > 0 && (
                <section className="mb-16" aria-labelledby="common-problems-heading">
                  <h2 id="common-problems-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-6">
                    {isRTL ? "المشكلات القانونية الشائعة" : "Common legal problems we can assess"}
                  </h2>
                  <ReadingDetails enabled={true} title={isRTL ? `استعرض ${problemPages.length} مسألة ومستنداتها وخطواتها` : `Browse ${problemPages.length} problem guides, documents and next steps`}>
                  <ul className="grid gap-x-9 border-y border-[#0d4a31]/14 py-3 sm:grid-cols-2">
                    {problemPages.map((problem) => (
                        <li key={problem.slug} className="flex gap-3 border-b border-[#0d4a31]/10 py-4 text-foreground">
                          {region === "sa" ? <span aria-hidden="true" className="shrink-0 text-[#aa7e28]">✓</span> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#aa7e28]" strokeWidth={1.5}/>}
                          <Link
                            href={legalProblemPath(region, isRTL ? "ar" : "en", id, problem.slug)}
                            className="font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {isRTL ? problem.titleAr : problem.titleEn}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  {region !== "sa" && <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {isRTL
                      ? "افتح أي مسألة للاطلاع على المستندات المفيدة والمسار الأولي والاختصاص ذي الصلة."
                      : "Open a problem to see useful documents, the initial route and the relevant jurisdictional context."}
                  </p>}
                  </ReadingDetails>
                </section>
              )}

              {documents.length > 0 && <ReadingDetails enabled title={isRTL ? "المستندات المفيدة للمراجعة" : "Documents to prepare"}>
                <ul id="documents-heading" className="grid gap-3 pb-5 text-muted-foreground sm:grid-cols-2">
                  {documents.map(document => <li key={document}>{document}</li>)}
                </ul>
              </ReadingDetails>}
              <ServiceCosts isArabic={isRTL} regionPrefix={regionPrefix} contactHref={serviceContactHref} region={region} />

              {displayFaqs.length > 0 && (
                <div className="legal-problem-deferred-section mt-4">
                  <h2 id="service-faq-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-8">
                    {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                  </h2>
                  <div className="border-t border-[#0d4a31]/18">
                    {displayFaqs.map((faq, i) => (
                      <details key={i} className="group border-b border-[#0d4a31]/18">
                        <summary className="flex w-full cursor-pointer list-none items-center justify-between py-6 text-start transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4924a] marker:content-none">
                          <span className="font-semibold text-foreground leading-snug pe-4">{faq.q}</span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#0d4a31]/14 bg-[#eef4f0]">
                            <ChevronDown className="h-4 w-4 text-primary transition-transform duration-200 group-open:rotate-180" />
                          </span>
                        </summary>
                          <div className="max-w-3xl pb-6">
                            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <section className="legal-problem-deferred-section service-legal-sources mt-16 scroll-mt-36 border-t border-[#0d4a31]/16 bg-[#eef4f0] p-7 lg:p-9" aria-labelledby="official-sources-heading">
                {region !== "sa" && <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{isRTL ? "الشفافية القانونية" : "Legal transparency"}</p>}
                <h2 id="official-sources-heading" className="text-3xl font-serif font-bold text-foreground mb-4">{isRTL ? "مصادر قانونية رسمية" : "Official legal sources"}</h2>
                <ReadingDetails enabled={true} title={isRTL ? "عرض المصادر ومسؤولية المحتوى" : "View sources and content responsibility"}>
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
                  {region === "sa" ? (isRTL ? "إعداد فريق المحتوى القانوني؛ تُبيّن مسؤولية المراجعة في سجل المحتوى عند الاقتضاء. آخر تحقق من مسار المصادر: 18 أغسطس 2026. معلومات عامة لا تغني عن مراجعة النص النافذ ووقائعك." : "Prepared by the legal content team; review responsibility is recorded where applicable. Source-routing verification: 18 August 2026. General information does not replace checking current law and your facts.") : (isRTL
                    ? `أعدّها فريق المحتوى القانوني في كاونسلو للاستشارات القانونية، مع إسناد مسؤولية المراجعة القانونية إلى المراجع المبين في سجل المحتوى عند الاقتضاء. آخر تحقق من مسار المصادر: 18 أغسطس 2026. هذه الصفحة معلومات عامة عن ${data.title} في ${countryName}، والروابط الرسمية فيها نقاط بدء للتحقق وليست بديلاً عن مراجعة النص النافذ والوقائع والاستشارة المتخصصة.`
                    : `Prepared by the CounselO Legal content team, with legal-review responsibility assigned through the content record where applicable. Source-routing verification: 18 August 2026. This page provides general information about ${data.title.toLowerCase()} in ${countryName}; the official links are starting points for verification and do not replace checking the operative text, facts and qualified advice.`)}
                </div>
                </ReadingDetails>
              </section>

              <aside className="my-8 border-s-4 border-[#b4924a] bg-[#eef4f0] p-5">
                <p className="mb-2 font-semibold">{region === "sa" ? (isRTL ? "لديك موعد قريب؟" : "Deadline approaching?") : (isRTL ? "هل تحتاج هذه الخدمة قبل موعد قريب؟" : "Need this service before a short deadline?")}</p>
                <Link href={`${regionPrefix}/services/urgent-legal-assistance`} className="text-primary underline underline-offset-4">{region === "sa" ? (isRTL ? "اطلب مساعدة عاجلة" : "Request urgent help") : (isRTL ? "اطلب المساعدة القانونية العاجلة وحدد موعد التسليم المطلوب" : "Request urgent legal assistance and specify your delivery deadline")}</Link>
              </aside>
              <section id="service-contact" className="service-content-band scroll-mt-36 bg-[#0d4a31] p-7 text-white lg:p-10" aria-labelledby="service-contact-heading">
                <p className="mb-4 text-sm leading-7 text-white/85">{isRTL ? "التواصل مع كاونسلو لا يوقف أو يمدد أي ميعاد. اذكر أي موعد قريب في طلبك." : "Contacting CounselO Legal does not stop or extend a deadline. Include any approaching date in your request."}</p>
                <h2 id="service-contact-heading" className="mb-4 font-serif text-3xl">{isRTL ? "ابدأ مراجعة مسألتك" : "Start a review of your matter"}</h2>
                <p className="max-w-3xl leading-7 opacity-90">{region === "sa" ? (isRTL ? "اذكر المطلوب والوقائع والميعاد. نتفق على النطاق والرسوم قبل العمل؛ التواصل وحده لا ينشئ تكليفاً مهنياً." : "Tell us your objective, key facts and deadline. We agree scope and fees before work; contacting us alone does not create a professional engagement.") : (isRTL ? "أرسل الهدف والوقائع الأساسية وأي ميعاد قريب والمستندات المتاحة. تؤكد كاونسلو للاستشارات القانونية نطاق العمل والرسوم والمخرج قبل بدء العمل المدفوع، ولا ينشئ التواصل وحده تكليفاً مهنياً." : "Send the objective, key facts, any approaching date and the available documents. CounselO Legal confirms scope, fee and deliverable before paid work begins; contacting us alone does not create a professional engagement.")}</p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href={serviceContactHref} data-cta="contact" data-conversion-position="service-contact" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 bg-white px-5 py-3 font-semibold text-primary hover:bg-white/90"><MessageSquareText size={18} />{isRTL ? "نموذج التواصل" : "Contact form"}</Link>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="service-contact" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 border border-white/50 px-5 py-3 font-semibold hover:bg-white/10"><Phone size={18} />WhatsApp</a>
                </div>
              </section>

              <section className="legal-problem-deferred-section mb-16 mt-16" aria-labelledby="related-services-heading">
                <h2 id="related-services-heading" className="scroll-mt-36 text-3xl font-serif font-bold text-foreground mb-6">
                  {isRTL ? "خدمات قانونية مرتبطة" : "Related legal services"}
                </h2>
                {region !== "sa" && <p className="text-muted-foreground mb-5">
                  {isRTL
                    ? "قد تتداخل المسألة الواحدة مع أكثر من مجال قانوني. استكشف الخدمات المرتبطة أو اطّلع على المقالات القانونية قبل طلب الاستشارة."
                    : "One matter can involve several areas of law. Explore closely related services or read the legal guides before requesting a consultation."}
                </p>}
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
                    <span>{isRTL ? "مكتبة كاونسلو للاستشارات القانونية" : "CounselO Legal Library"}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#b4924a] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                  <Link href={serviceContactHref} data-cta="contact" data-conversion-position="service-related" data-region={region} data-lang={isRTL ? "ar" : "en"} className="group flex items-center justify-between gap-4 border-b border-e border-[#0d4a31] bg-[#0d4a31] p-5 font-semibold text-white transition-colors hover:bg-[#073d29]">
                    <span>{isRTL ? "ابدأ مناقشة مسألتك" : "Discuss your matter"}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#d5ae5d] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </section>

            </m.div>
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
      {region !== "sa" && <>
        <TrustSignals isArabic={isRTL} regionPrefix={regionPrefix} compact />
        <JurisdictionDisclosure jurisdiction={region} compact />
      </>}
      <LatestContentCarousels isArabic={isRTL} region={region} serviceSlug={id} />
    </div>
  );
}
