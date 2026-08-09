import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, Mail, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { TrustSignals } from "@/components/seo/TrustSignals";
import { JurisdictionDisclosure } from "@/components/legal/JurisdictionDisclosure";
import { getLegalProblemPage, getLegalProblemPages, legalProblemPath } from "@/lib/legal-problem-pages";
import { getRegionalLegalSources, type LegalSource } from "@/lib/regional-legal-sources";
import { COUNSELO_ENTITY_IDS, getConsultationProduct } from "@workspace/api-zod";
import { COUNSELO_LEGAL_MATTERS_CLAIM } from "@/lib/public-claims";

function truncateSeo(value: string, max = 158): string {
  if (value.length <= max) return value;
  const shortened = value.slice(0, max - 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 110 ? boundary : shortened.length).replace(/[,:;]$/, "")}.`;
}

function truncateTitle(value: string, max = 65): string {
  if (value.length <= max) return value;
  const shortened = value.slice(0, max - 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 24 ? boundary : shortened.length).replace(/[|،,:;]$/, "")}`;
}

export default function LegalProblemDetail() {
  const { id = "", problem = "" } = useParams<{ id: string; problem: string }>();
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const page = getLegalProblemPage(region, id, problem);
  const parent = t.serviceDetail.services[id as keyof typeof t.serviceDetail.services] as Record<string, unknown> | undefined;

  if (!page || !parent) {
    return (
      <main className="min-h-[55vh] flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-serif text-4xl mb-4">{isRTL ? "الصفحة غير موجودة" : "Page not found"}</h1>
          <Link href={`${regionPrefix}/services`} className="text-primary hover:underline">
            {isRTL ? "عرض مجالات الخدمات" : "View service areas"}
          </Link>
        </div>
      </main>
    );
  }

  const parentTitle = isRTL ? page.serviceTitleAr : page.serviceTitleEn;
  const parentOverview = typeof parent.overview === "string"
    ? parent.overview
    : isRTL
      ? `تقدم كاونسلو المشورة في ${page.serviceTitleAr} وفق الوقائع والاختصاص والمستندات الخاصة بكل ملف.`
      : `CounselO advises on ${page.serviceTitleEn.toLowerCase()} according to the facts, jurisdiction and documents of each matter.`;
  const documents = isRTL ? page.documentsAr : page.documentsEn;
  const countryName = region === "uae" ? (isRTL ? "الإمارات" : "the UAE") : region === "syr" ? (isRTL ? "سوريا" : "Syria") : (isRTL ? "السعودية" : "Saudi Arabia");
  const canonical = `/services/${id}/${problem}`;
  const title = truncateTitle(isRTL
    ? `${page.titleAr} في ${countryName} | استشارة قانونية أونلاين | كاونسلو`
    : `${page.titleEn} in ${countryName} | Online Legal Consultation | CounselO`);
  const description = truncateSeo(isRTL
    ? `استشارة ${page.titleAr} في ${countryName}: الوقائع والأدلة والخيارات والمستندات وحزمة كاونسلو المكتوبة عبر واتساب أو البريد الإلكتروني.`
    : `${page.titleEn} in ${countryName}: facts, evidence, options, documents and CounselO’s written consultation package via WhatsApp or email.`);
  const keywords = [
    page.titleEn,
    `${page.titleEn} lawyer ${countryName}`,
    `${page.titleEn} legal consultation`,
    parentTitle,
    "online legal consultation",
    isRTL ? page.titleAr : `${page.titleEn} lawyer`,
    ...(isRTL ? page.searchVariantsAr : page.searchVariantsEn),
  ].join(", ");
  const sources: LegalSource[] = getRegionalLegalSources(region, id);
  const relatedProblems = getLegalProblemPages(region, id).filter((item) => item.slug !== problem).slice(0, 4);
  const consultationPackage = getConsultationProduct("comprehensive-consultation");
  const whatsappUrl = `https://wa.me/966594850247?text=${encodeURIComponent(isRTL ? `مرحباً كاونسلو، أحتاج إلى مراجعة بخصوص: ${page.titleAr}.` : `Hello CounselO, I need a review regarding: ${page.titleEn}.`)}`;

  return (
    <div className="counselo-editorial-page service-brief-page w-full bg-background min-h-screen" id="main-content">
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        keywords={keywords}
        contentLanguage={isRTL ? "ar" : "en"}
        schema={{
          "@type": "WebPage",
          "@id": `https://counselo-legal.com${regionPrefix}${isRTL ? "/ar" : ""}${canonical}#webpage`,
          "headline": isRTL ? page.titleAr : page.titleEn,
          "description": description,
          "url": `https://counselo-legal.com${regionPrefix}${isRTL ? "/ar" : ""}${canonical}`,
          "dateModified": "2026-08-08",
          "author": { "@id": "https://counselo-legal.com/#person-omar-al-baghdadi" },
          "publisher": { "@id": "https://counselo-legal.com/#organization" },
          "about": {
            "@type": "LegalService",
            "@id": `https://counselo-legal.com/#${region}-service-${id}`,
            "name": parentTitle,
            "provider": { "@id": COUNSELO_ENTITY_IDS.organization },
          },
          "isPartOf": { "@id": "https://counselo-legal.com/#website" },
          "inLanguage": isRTL ? "ar" : "en",
          "keywords": keywords,
        }}
        extraSchemas={[{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": (isRTL ? page.faqs.ar : page.faqs.en).map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a },
          })),
        }, {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": `https://counselo-legal.com${regionPrefix}` },
            { "@type": "ListItem", "position": 2, "name": isRTL ? "الخدمات" : "Services", "item": `https://counselo-legal.com${regionPrefix}/services` },
            { "@type": "ListItem", "position": 3, "name": parentTitle, "item": `https://counselo-legal.com${regionPrefix}/services/${id}` },
            { "@type": "ListItem", "position": 4, "name": isRTL ? page.titleAr : page.titleEn, "item": `https://counselo-legal.com${regionPrefix}/services/${id}/${problem}` },
          ],
        }]}
      />

      <section className="service-detail-hero">
        <div className="premium-content-shell relative z-10 py-14 lg:py-20">
          <nav aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"} className="mb-9 flex flex-wrap items-center text-sm text-white/62">
            <Link href={regionPrefix} className="transition-colors hover:text-[#d5ae5d]">{isRTL ? "الرئيسية" : "Home"}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="transition-colors hover:text-[#d5ae5d]">{isRTL ? "الخدمات" : "Services"}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services/${id}`} className="transition-colors hover:text-[#d5ae5d]">{parentTitle}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="font-medium text-white">{isRTL ? page.titleAr : page.titleEn}</span>
          </nav>
          <div className="max-w-5xl">
            <Link href={`${regionPrefix}/services/${id}`} className="mb-7 inline-flex items-center text-sm font-medium text-[#d5ae5d] transition-colors hover:text-white">
              <ArrowLeft className={`me-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {isRTL ? "العودة إلى الخدمة الرئيسية" : "Back to the main service"}
            </Link>
            <p className="mb-5 text-sm uppercase tracking-[0.18em] text-[#d5ae5d]">{parentTitle}</p>
            <h1 className="mb-6 max-w-5xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-white lg:text-7xl">{isRTL ? page.titleAr : page.titleEn}</h1>
            <div className="mb-6 h-px w-20 bg-[#d5ae5d]" />
            <p className="max-w-4xl font-serif text-xl italic leading-relaxed text-white/72 lg:text-2xl">{isRTL ? page.overview.ar : page.overview.en}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0d4a31]/12 bg-white" aria-label={isRTL ? "مؤشرات الثقة" : "Trust highlights"}>
        <div className="premium-content-shell grid gap-5 py-6 sm:grid-cols-3">
          <div className="border-s-2 border-[#d5ae5d] ps-4">
            <p className="font-serif text-2xl text-[#0d4a31]">30+</p>
            <p className="text-sm text-muted-foreground">{isRTL ? "عاماً من الخبرة القانونية الإقليمية" : "Years of regional legal experience"}</p>
          </div>
          <div className="border-s-2 border-[#d5ae5d] ps-4">
            <p className="font-serif text-2xl text-[#0d4a31]">20,000+</p>
            <p className="text-sm text-muted-foreground">{isRTL ? COUNSELO_LEGAL_MATTERS_CLAIM.ar : COUNSELO_LEGAL_MATTERS_CLAIM.en}</p>
          </div>
          <div className="border-s-2 border-[#d5ae5d] ps-4">
            <p className="font-serif text-2xl text-[#0d4a31]">WhatsApp · Email</p>
            <p className="text-sm text-muted-foreground">{isRTL ? "مخرج مكتوب بالعربية أو الإنجليزية" : "Written output in Arabic or English"}</p>
          </div>
        </div>
      </section>

      <nav aria-label={isRTL ? "أقسام صفحة المشكلة" : "Problem page sections"} className="service-anchor-rail sticky top-[4.5rem] z-30 border-b border-[#0d4a31]/12 bg-white/95 backdrop-blur">
        <div className="premium-content-shell overflow-x-auto">
          <div className="flex min-w-max items-center gap-7 py-4 text-sm font-semibold text-[#355447]">
            <a href="#service-context" className="service-anchor-link">{isRTL ? "الخدمة الرئيسية" : "Main service"}</a>
            <a href="#problem-questions" className="service-anchor-link">{isRTL ? "الأسئلة القانونية" : "Legal questions"}</a>
            <a href="#problem-deliverables" className="service-anchor-link">{isRTL ? "ما نقدمه" : "What we deliver"}</a>
            <a href="#problem-process" className="service-anchor-link">{isRTL ? "المسار العملي" : "Our process"}</a>
            <a href="#consultation-package" className="service-anchor-link">{isRTL ? "حزمة الاستشارة" : "Consultation package"}</a>
            <a href="#problem-documents" className="service-anchor-link">{isRTL ? "المستندات" : "Documents"}</a>
            <a href="#problem-experience" className="service-anchor-link">{isRTL ? "لماذا كاونسلو" : "Why CounselO"}</a>
            <a href="#trust-signals-heading" className="service-anchor-link">{isRTL ? "الثقة والشفافية" : "Trust and transparency"}</a>
            <a href="#problem-faq" className="service-anchor-link">{isRTL ? "الأسئلة الشائعة" : "FAQs"}</a>
            <a href="#problem-contact" className="service-anchor-link">{isRTL ? "تواصل معنا" : "Contact"}</a>
          </div>
        </div>
      </nav>

      <div className="premium-content-shell py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="lg:col-span-8 space-y-16 xl:col-span-9">
        <section id="service-context" className="service-answer-panel mb-12 scroll-mt-36 border border-[#0d4a31]/14 border-s-4 border-s-[#b4924a] bg-[#eef4f0] p-6 lg:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{isRTL ? "الخدمة الرئيسية" : "Main service"}</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-5">{isRTL ? `مكان مسألة ${page.titleAr} ضمن ${parentTitle}` : `Where ${page.titleEn.toLowerCase()} fits within ${parentTitle}`}</h2>
          <p className="text-lg leading-8 max-w-4xl">{parentOverview}</p>
          <p className="mt-5 max-w-4xl leading-7 text-muted-foreground">{isRTL ? `هذه الصفحة تركز على ${page.titleAr} تحديداً، ولا تستبدل دراسة الوقائع والمستندات الخاصة بملفك.` : `This page then narrows the review to ${page.titleEn.toLowerCase()} and does not replace a matter-specific study of your facts and documents.`}</p>
        </section>

        <section id="problem-questions" className="scroll-mt-36">
          <div>
            <h2 className="font-serif text-3xl mb-5">{isRTL ? "الأسئلة التي يجب فحصها" : "Questions that must be checked"}</h2>
            <ul className="space-y-3">
              {(isRTL ? page.keyQuestions.ar : page.keyQuestions.en).map((item) => (
                <li key={item} className="flex gap-3 leading-7"><CheckCircle2 className="text-primary shrink-0 mt-1" size={19} />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="problem-deliverables" className="scroll-mt-36">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{isRTL ? "مخرج هذه المسألة" : "Matter-specific output"}</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-3">{isRTL ? `ماذا تقدم كاونسلو في مسألة ${page.titleAr}؟` : `What CounselO delivers for ${page.titleEn.toLowerCase()}`}</h2>
          <p className="mb-7 max-w-4xl leading-7 text-muted-foreground">{isRTL ? "المخرج ليس شرحاً عاماً للخدمة؛ بل مراجعة مركزة للمشكلة التي أرسلتها والنتيجة التي تريد الوصول إليها." : "The deliverable is not a general explanation of the service. It is a focused review of the problem you submit and the outcome you need."}</p>
          <div className="grid md:grid-cols-2 gap-5">
            {(isRTL ? page.deliverables.ar : page.deliverables.en).map((item, index) => (
              <div key={item} className="border border-border p-6">
                <span className="text-primary font-semibold">0{index + 1}</span>
                <p className="font-medium mt-3 leading-7">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="problem-process" className="scroll-mt-36">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{isRTL ? "من التواصل إلى المخرج" : "From first contact to deliverable"}</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-3">{isRTL ? "كيف تسير المساعدة خطوة بخطوة؟" : "How the work moves forward"}</h2>
          <p className="mb-7 max-w-3xl leading-7 text-muted-foreground">{isRTL ? "كل خطوة لها غرض واضح: فهم المسألة، تأكيد نطاق العمل، ثم تسليم مخرج عملي يمكن اتخاذ القرار على أساسه." : "Each stage has a clear purpose: understand the issue, agree the scope, and deliver a practical output you can use to decide what happens next."}</p>
          <ol className="space-y-4">
            {(isRTL ? page.process.ar : page.process.en).map((step, index) => (
              <li key={step.title} className="flex gap-4 border-s-2 border-primary/30 bg-muted/30 p-5 leading-7">
                <span className="font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div><h3 className="mb-1 font-semibold">{step.title}</h3><p className="text-muted-foreground">{step.desc}</p></div>
              </li>
            ))}
          </ol>
        </section>

        {consultationPackage && (
          <section id="consultation-package" className="service-content-band scroll-mt-36 border border-[#d5ae5d]/60 bg-[#fbf8ef] p-7 lg:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{isRTL ? "الخدمة المدفوعة" : "Paid service"}</p>
            <h2 className="font-serif text-3xl lg:text-4xl mb-4">{isRTL ? consultationPackage.titleAr : consultationPackage.titleEn}</h2>
            <p className="max-w-4xl leading-7">{isRTL ? consultationPackage.summaryAr : consultationPackage.summaryEn}</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {(isRTL ? consultationPackage.includesAr : consultationPackage.includesEn).slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3 leading-7"><CheckCircle2 className="mt-1 shrink-0 text-primary" size={19} />{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">{isRTL ? "تُحدد الرسوم وطريقة الدفع بعد الدراسة الأولية للطلب وقبل بدء العمل المدفوع." : "The fee and payment method are confirmed after the initial study of the request and before paid work begins."}</p>
          </section>
        )}

        <section id="problem-experience" className="service-content-band scroll-mt-36 border-y border-[#0d4a31]/14 bg-[#eef4f0] p-7 py-12 lg:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{isRTL ? "الخبرة والملاءمة" : "Experience and fit"}</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-5">{isRTL ? "لماذا كاونسلو مناسبة لهذه المسألة؟" : "Why CounselO is equipped for this matter"}</h2>
          <p className="text-lg leading-8 max-w-5xl">{isRTL ? page.experience.ar : page.experience.en}</p>
        </section>

        <section id="problem-documents" className="service-content-band scroll-mt-36 border border-[#0d4a31]/14 bg-white p-7 lg:p-10">
          <div className="flex gap-4 items-start">
            <FileText className="text-primary shrink-0" size={24} />
            <div>
              <h2 className="font-serif text-3xl mb-3">{isRTL ? "المستندات التي تساعدنا على البدء" : "Documents that help us start"}</h2>
              <p className="mb-5 leading-7 text-muted-foreground">{isRTL ? "أرسل نسخاً واضحة مما يتوافر لديك. لا ترسل النسخة الوحيدة من أي أصل، واحجب البيانات غير اللازمة للمراجعة." : "Send clear copies of what you have. Do not send the only copy of an original, and redact information that is not needed for the review."}</p>
              <ul className="grid gap-3 md:grid-cols-2">
                {documents.map((item) => <li key={item} className="flex gap-3 leading-7"><CheckCircle2 className="text-primary shrink-0 mt-1" size={19} />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="problem-sources" className="service-content-band scroll-mt-36 border border-[#0d4a31]/14 bg-[#eef4f0] p-7 lg:p-9">
          <h2 className="font-serif text-3xl mb-5">{isRTL ? "المصادر والاختصاص" : "Sources and jurisdiction"}</h2>
          <p className="text-muted-foreground leading-7 mb-4">{isRTL ? `تختلف النتيجة بحسب وقائع المسألة والاختصاص في ${countryName}.` : `The result depends on the facts and the competent forum in ${countryName}.`}</p>
          <ul className="space-y-2">
            {sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{isRTL ? source.ar : source.en}</a></li>)}
          </ul>
          <p className="text-xs text-muted-foreground mt-5">{isRTL ? "هذه الصفحة معلومات عامة وليست بديلاً عن دراسة قانونية مخصصة. الروابط الرسمية نقاط بدء للتحقق من النص النافذ، ولا تثبت وحدها انطباق قاعدة أو ميعاد أو وسيلة معالجة على وقائعك." : "This page provides general information and is not a substitute for a matter-specific legal study. Official links are starting points for checking operative law; they do not alone establish that a rule, deadline or remedy applies to your facts."}</p>
        </section>

        <section id="problem-faq" className="scroll-mt-36">
          <h2 className="font-serif text-3xl lg:text-4xl mb-7">{isRTL ? "الأسئلة الشائعة" : "Frequently asked questions"}</h2>
          <div className="space-y-4">
            {(isRTL ? page.faqs.ar : page.faqs.en).map((faq) => (
              <details key={faq.q} className="border border-border bg-white p-5">
                <summary className="cursor-pointer font-semibold leading-7">{faq.q}</summary>
                <p className="mt-3 leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="problem-contact" className="service-content-band scroll-mt-36 bg-[#0d4a31] p-7 text-white lg:p-10" aria-labelledby="problem-contact-heading">
          <h2 id="problem-contact-heading" className="font-serif text-3xl mb-4">{isRTL ? "ابدأ مراجعة مسألتك" : "Start a review of your matter"}</h2>
          <p className="leading-7 max-w-3xl opacity-90">
            {isRTL ? "أرسل الوقائع والمستندات الأساسية عبر واتساب أو البريد الإلكتروني. تؤكد كاونسلو النطاق والرسوم والمخرج قبل بدء العمل المدفوع." : "Send the key facts and documents through WhatsApp, email or the consultation form. CounselO confirms scope, fee and deliverable before paid work begins."}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href={`${regionPrefix}/contact?service=${id}`} data-cta="contact" data-conversion-position="problem-contact" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 bg-white px-5 py-3 font-semibold text-primary hover:bg-white/90">
              <MessageSquareText size={18} /> {isRTL ? "نموذج التواصل" : "Contact form"}
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="problem-contact" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 border border-white/50 px-5 py-3 font-semibold hover:bg-white/10">
              <Phone size={18} /> WhatsApp
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
            <a href="tel:+966594850247" className="inline-flex items-center gap-2"><Phone size={15} /><span dir="ltr">+966 59 485 0247</span></a>
            <a href="mailto:info@counselo-legal.com" className="inline-flex items-center gap-2"><Mail size={15} />info@counselo-legal.com</a>
          </div>
        </section>

        {relatedProblems.length > 0 && (
          <section>
            <h2 className="font-serif text-3xl mb-5">{isRTL ? "مسائل مرتبطة" : "Related legal problems"}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {relatedProblems.map((related) => <Link key={related.slug} href={legalProblemPath(region, isRTL ? "ar" : "en", id, related.slug)} className="border border-border p-4 hover:border-primary transition-colors">{isRTL ? related.titleAr : related.titleEn}</Link>)}
            </div>
          </section>
        )}
          </div>

          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="service-consultation-panel sticky top-36 overflow-hidden bg-[#0d4a31] p-7 text-white shadow-[0_24px_65px_rgba(13,74,49,0.18)] lg:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d5ae5d]">{isRTL ? "مراجعة قانونية محددة" : "Matter-specific legal review"}</p>
              <h2 className="mb-4 font-serif text-3xl font-semibold leading-tight text-white">{isRTL ? `استشارة ${page.titleAr}` : `${page.titleEn} consultation`}</h2>
              <div className="mb-6 h-px w-14 bg-[#d5ae5d]" />
              <p className="mb-7 leading-relaxed text-white/68">
                {isRTL ? "نراجع الوقائع والمستندات ونحدد النطاق والرسوم والمخرج قبل بدء العمل المدفوع." : "We review the facts and documents, then confirm scope, fee and deliverable before paid work begins."}
              </p>
              <ul className="mb-7 space-y-3 border-y border-white/12 py-5 text-sm text-white/82">
                <li className="flex items-center gap-3"><MessageSquareText className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "مخرج مكتوب عبر واتساب أو البريد" : "Written deliverable via WhatsApp or email"}</li>
                <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "النطاق والرسوم قبل العمل" : "Scope and fee confirmed first"}</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#d5ae5d]" />{isRTL ? "استجابة مستهدفة خلال 24 ساعة" : "Target response within 24 hours"}</li>
              </ul>
              <Link href={`${regionPrefix}/contact?service=${id}`} data-cta="contact" data-conversion-position="problem-sidebar" data-region={region} data-lang={isRTL ? "ar" : "en"} className="block w-full bg-[#d5ae5d] px-5 py-4 text-center font-bold text-[#0d3e2a] transition-colors hover:bg-[#e0bd73]">
                {isRTL ? "اطلب مراجعة قانونية" : "Request a legal review"}
              </Link>
              <div className="mt-6 space-y-3 border-t border-white/12 pt-6 text-sm text-white/80">
                <a href="tel:+966594850247" className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#d5ae5d]" /><span dir="ltr">+966 59 485 0247</span></a>
                <a href="mailto:info@counselo-legal.com" className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#d5ae5d]" />info@counselo-legal.com</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <TrustSignals isArabic={isRTL} regionPrefix={regionPrefix} />
      <JurisdictionDisclosure jurisdiction={region} compact />
      <LatestContentCarousels isArabic={isRTL} region={region} serviceSlug={id} />
    </div>
  );
}
