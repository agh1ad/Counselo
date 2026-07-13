import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronDown, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_SEO_DATA } from "@/lib/seo-data-syr";
import { RELATED_SERVICES, SERVICE_SEARCH_CONTENT } from "@/lib/service-search-content";
import { TrustSignals } from "@/components/seo/TrustSignals";

type LegalSource = { en: string; ar: string; href: string };

const SAUDI_OFFICIAL_SOURCES: Record<string, LegalSource[]> = {
  "family-law": [{ en: "Saudi Personal Status Law", ar: "نظام الأحوال الشخصية السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/4d72d829-947b-45d5-b9b5-ae5800d6bac2/1" }],
  "employment-law": [{ en: "Saudi Labor Law", ar: "نظام العمل السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/08381293-6388-48e2-8ad2-a9a700f2aa94/1" }],
  "business-law": [
    { en: "Saudi Companies Law", ar: "نظام الشركات السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1" },
    { en: "Law of Commercial Courts", ar: "نظام المحاكم التجارية", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/38334008-3b70-4c6c-b3af-aba3016a8061/1" },
  ],
  "companies-law": [{ en: "Saudi Companies Law", ar: "نظام الشركات السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/a8376aea-1bc3-49d4-9027-aed900b555af/1" }],
  "foreign-investment": [{ en: "Saudi Investment Law", ar: "نظام الاستثمار السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/SearchDetails/?Id=eda86cc3-3a00-4b90-900d-b1d000c8a863&Query=+" }],
  contracts: [{ en: "Saudi Civil Transactions Law", ar: "نظام المعاملات المدنية السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1" }],
  "real-estate": [{ en: "Saudi Civil Transactions Law", ar: "نظام المعاملات المدنية السعودي", href: "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1" }],
};

const SAUDI_GENERAL_SOURCE: LegalSource = {
  en: "Saudi Ministry of Justice — Laws and Regulations",
  ar: "وزارة العدل السعودية — الأنظمة واللوائح",
  href: "https://moj.gov.sa/English/Pages/LawsAndRegulations.aspx",
};

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
    : (SAUDI_OFFICIAL_SOURCES[id] ?? [SAUDI_GENERAL_SOURCE]);

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
    <div className="w-full bg-background min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalPath}
        keywords={seoKeywords}
        schema={schemas}
        ogType="website"
      />
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-4 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href={regionPrefix} className="hover:text-primary transition-colors">{sd.breadcrumb.home}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="hover:text-primary transition-colors">{sd.breadcrumb.services}</Link>
            <ChevronRight className={`h-4 w-4 mx-2 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href={`${regionPrefix}/services`} className="inline-flex items-center text-primary mb-8 hover:underline underline-offset-4 text-sm font-medium">
                <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} /> {sd.backLink}
              </Link>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                {isRTL
                  ? `${data.title} في ${isSyr ? "سوريا" : "المملكة العربية السعودية"}`
                  : `${data.title} Lawyer in ${isSyr ? "Syria" : "Saudi Arabia"}`}
              </h1>
              <p className="text-2xl text-primary font-serif italic mb-10">{data.subtitle}</p>

              <section className="bg-card border-s-4 border-primary p-6 mb-10" aria-labelledby="service-answer-heading">
                <h2 id="service-answer-heading" className="text-2xl font-serif font-bold text-foreground mb-3">
                  {isRTL ? `استشارة ${data.title} في ${countryName}` : `${data.title} consultation in ${countryName}`}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isRTL
                    ? `تساعد كاونسلو الأفراد والشركات في فهم مسائل ${data.title}، ومراجعة المستندات، وتحديد الخيارات العملية، وبدء الاستشارة أونلاين بسرية عبر واتساب أو البريد الإلكتروني.`
                    : `CounselO helps individuals and businesses understand ${data.title.toLowerCase()} matters, review documents, identify practical options, and begin a confidential online consultation through WhatsApp or email.`}
                </p>
              </section>

              <nav aria-label={isRTL ? "محتويات الصفحة" : "On this page"} className="border border-border bg-background p-5 mb-12">
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
              <div className="prose prose-green max-w-none mb-16 speakable-overview">
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

              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.coversHeading}</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-16 speakable-covers">
                {displayCovers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {commonIssues.length > 0 && (
                <section className="mb-16" aria-labelledby="common-problems-heading">
                  <h2 id="common-problems-heading" className="text-3xl font-serif font-bold text-foreground mb-6 border-b border-border pb-4">
                    {isRTL ? "المشكلات القانونية الشائعة" : "Common legal problems we can assess"}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {commonIssues.map((issue) => <li key={issue} className="bg-card border border-border p-4 text-foreground">{issue}</li>)}
                  </ul>
                </section>
              )}

              {documents.length > 0 && (
                <section className="mb-16" aria-labelledby="documents-heading">
                  <h2 id="documents-heading" className="text-3xl font-serif font-bold text-foreground mb-6 border-b border-border pb-4">
                    {isRTL ? "مستندات تساعد في التقييم الأولي" : "Documents that help the initial assessment"}
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    {documents.map((document) => <li key={document} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5"/><span>{document}</span></li>)}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-5">
                    {isRTL ? "قد تختلف المستندات المطلوبة حسب الوقائع والجهة المختصة. لا ترسل النسخة الأصلية الوحيدة من أي مستند." : "Required documents vary by the facts and relevant authority. Do not send the only original copy of any document."}
                  </p>
                </section>
              )}

              <section className="mb-16" aria-labelledby="related-services-heading">
                <h2 id="related-services-heading" className="text-3xl font-serif font-bold text-foreground mb-6 border-b border-border pb-4">
                  {isRTL ? "خدمات قانونية مرتبطة" : "Related legal services"}
                </h2>
                <p className="text-muted-foreground mb-5">
                  {isRTL
                    ? "قد تتداخل المسألة الواحدة مع أكثر من مجال قانوني. استكشف الخدمات المرتبطة أو اطّلع على المقالات القانونية قبل طلب الاستشارة."
                    : "One matter can involve several areas of law. Explore closely related services or read the legal guides before requesting a consultation."}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedServiceIds.map((serviceId) => {
                    const related = sd.services[serviceId as keyof typeof sd.services];
                    return (
                      <Link
                        key={serviceId}
                        href={`${regionPrefix}/services/${serviceId}`}
                        className="border border-border bg-card p-4 font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        {isRTL ? `استشارة ${related.title}` : `${related.title} legal consultation`}
                      </Link>
                    );
                  })}
                  <Link href="/blog" className="border border-border bg-card p-4 font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                    {isRTL ? "مقالات وإرشادات قانونية" : "Legal articles and practical guides"}
                  </Link>
                  <Link href={`${regionPrefix}/contact?service=${id}`} className="border border-primary bg-primary/5 p-4 font-semibold text-primary hover:bg-primary hover:text-white transition-colors">
                    {isRTL ? `احجز استشارة ${data.title}` : `Book a ${data.title.toLowerCase()} consultation`}
                  </Link>
                </div>
              </section>

              <h2 id="service-process-heading" className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">{sd.processHeading}</h2>
              <div className="space-y-8 mb-16">
                {displayProcess.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== displayProcess.length - 1 && (
                      <div className="absolute start-6 top-14 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl relative z-10">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {displayFaqs.length > 0 && (
                <div className="mt-4">
                  <h2 id="service-faq-heading" className="text-3xl font-serif font-bold text-foreground mb-8 border-b border-border pb-4">
                    {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                  </h2>
                  <div className="space-y-3">
                    {displayFaqs.map((faq, i) => (
                      <div key={i} className="border border-border bg-card">
                        <button
                          className="w-full flex items-center justify-between p-5 text-start hover:bg-muted/30 transition-colors"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          aria-expanded={openFaq === i}
                        >
                          <span className="font-semibold text-foreground leading-snug pe-4">{faq.q}</span>
                          <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                        </button>
                        {openFaq === i && (
                          <div className="px-5 pb-5">
                            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <section className="mt-16 border-t border-border pt-10" aria-labelledby="official-sources-heading">
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
                      <a href={source.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 border border-border bg-card p-4 font-semibold text-primary hover:border-primary">
                        <span>{isRTL ? source.ar : source.en}</span><ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 bg-muted/50 border border-border p-4 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{isRTL ? "مسؤول المحتوى:" : "Content responsibility:"}</strong>{" "}
                  {isRTL
                    ? `فريق المحتوى القانوني في كاونسلو. آخر تحديث: 13 يوليو 2026. هذه الصفحة معلومات عامة عن ${data.title} في ${countryName} وليست بديلاً عن استشارة مبنية على الوقائع.`
                    : `CounselO legal content team. Last updated 13 July 2026. This page provides general information about ${data.title.toLowerCase()} in ${countryName} and does not replace advice based on the facts.`}
                </div>
              </section>

            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 bg-primary p-8 text-white">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{sd.sidebar.heading}</h3>
              <div className="w-12 h-1 bg-white/40 mb-6" />
              <p className="text-white/75 mb-8 leading-relaxed">
                {sd.sidebar.descPrefix}{data.title.toLowerCase()}{sd.sidebar.descSuffix}
              </p>
              <Link
                href={`${regionPrefix}/contact?service=${id}`}
                data-cta="contact"
                data-region={region}
                data-lang={isRTL ? "ar" : "en"}
              >
                <Button className="w-full py-6 text-lg rounded-none bg-white text-primary hover:bg-white/90">{sd.sidebar.ctaBtn}</Button>
              </Link>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/60 mb-2">{sd.sidebar.callLabel}</p>
                <p className="text-white font-mono font-medium text-lg" dir="ltr">{sd.sidebar.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <TrustSignals isArabic={isRTL} regionPrefix={regionPrefix} />
    </div>
  );
}
