import { ServiceExperience, ServiceContact } from "@/components/legal/service-experience";
import { problemPageCopy } from "@/lib/experience-page-copy";
import { SERVICE_EXPERIENCE_UPDATED_AT } from "@/lib/service-experience-content";
import { problemContentDescription } from "@/lib/problem-content-quality";
import { serviceSearchCopy } from "@/lib/search-intent-copy";
import { Link, Redirect, useParams } from "wouter";
import { ChevronRight, Mail, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { LEGAL_PROBLEM_REDIRECTS, getLegalProblemLanguageAlternates, getLegalProblemPage } from "@/lib/legal-problem-pages";
import { getRegionalLegalSources, type LegalSource } from "@/lib/regional-legal-sources";
import { buildArabicProblemTitle, buildEnglishProblemTitle } from "@/lib/problem-snippet";
import { COUNSELO_ENTITY_IDS, COUNSELO_ORGANIZATION, OMAR_AL_BAGHDADI } from "@workspace/api-zod/browser";
import { getMatterAnswer } from "@/lib/matter-answer";
import { matterSourceGuidance } from "@/lib/matter-source-guidance";

export default function LegalProblemDetail() {
  const { id = "", problem = "" } = useParams<{ id: string; problem: string }>();
  const { t, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const page = getLegalProblemPage(region, id, problem);
  const parent = t.serviceDetail.services[id as keyof typeof t.serviceDetail.services] as Record<string, unknown> | undefined;
  const redirect = LEGAL_PROBLEM_REDIRECTS[`${regionPrefix}/services/${id}/${problem}`];
  if (redirect) return <Redirect to={redirect} replace />;

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

  const parentTitle = serviceSearchCopy(id, region, isRTL ? "ar" : "en")?.label ?? (isRTL ? page.serviceTitleAr : page.serviceTitleEn);
  const countryName = region === "uae" ? (isRTL ? "الإمارات" : "the UAE") : region === "syr" ? (isRTL ? "سوريا" : "Syria") : (isRTL ? "السعودية" : "Saudi Arabia");
  const canonical = `/services/${id}/${problem}`;
  const sourceGuidance = matterSourceGuidance(region, id, problem);
  const pageCopy = problemPageCopy(page, isRTL ? "ar" : "en");
  const serviceContactHref = `${regionPrefix}/contact?service=${id}#consultation-request`;
  const title = isRTL
    ? buildArabicProblemTitle({
        titleAr: page.titleAr,
        serviceTitleAr: page.serviceTitleAr,
        countryNameAr: countryName,
      })
    : buildEnglishProblemTitle({
        titleEn: page.titleEn,
        serviceTitleEn: page.serviceTitleEn,
        countryNameEn: countryName,
      });
  const directAnswer = getMatterAnswer(region, id, problem);
  const description = directAnswer?.description[isRTL ? "ar" : "en"] ?? problemContentDescription(pageCopy.hero, countryName, isRTL);
  const keywords = [
    isRTL ? page.titleAr : page.titleEn,
    isRTL ? `استشارة ${page.serviceTitleAr} في ${countryName}` : `${page.serviceTitleEn} consultation in ${countryName.replace(/^the /, "")}`,
    parentTitle,
    isRTL ? "استشارة قانونية أونلاين" : "online legal consultation",
  ].filter((value, index, list) => list.indexOf(value) === index).join(", ");
  const sources: LegalSource[] = [...new Map([...(directAnswer?.sources ?? []), ...getRegionalLegalSources(region, id), ...sourceGuidance.flatMap(item => item.sources)].map(source => [source.href, source])).values()];
  const whatsappUrl = `https://wa.me/966594850247?text=${encodeURIComponent(isRTL ? `مرحباً كاونسلو للاستشارات القانونية، أحتاج إلى مراجعة بخصوص: ${page.titleAr}.` : `Hello CounselO Legal, I need a review regarding: ${page.titleEn}.`)}`;

  return (
    <div className="counselo-editorial-page service-brief-page service-reading-page legal-experience-page w-full bg-background min-h-screen" id="legal-problem-page">
      <SEOHead heroArtwork="gold"
        title={title}
        description={description}
        preferPageMetadata
        canonical={canonical}
        keywords={keywords}
        contentLanguage={isRTL ? "ar" : "en"}
        regionalLanguageAlternates={getLegalProblemLanguageAlternates(page)}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `https://counselo-legal.com${regionPrefix}${canonical}#webpage`,
          "headline": isRTL ? page.titleAr : page.titleEn,
          "description": description,
          "url": `https://counselo-legal.com${regionPrefix}${canonical}`,
          "dateModified": SERVICE_EXPERIENCE_UPDATED_AT,
          "citation": sources.map(source => source.href),
          "author": { "@id": COUNSELO_ENTITY_IDS.omar },
          "publisher": { "@id": "https://counselo-legal.com/#organization" },
          "about": {
            "@type": "Service",
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
          ...COUNSELO_ORGANIZATION,
        }, {
          "@context": "https://schema.org",
          ...OMAR_AL_BAGHDADI,
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
            <Link href={regionPrefix} className="inline-flex min-h-8 items-center transition-colors hover:text-[#d5ae5d]">{isRTL ? "الرئيسية" : "Home"}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services`} className="inline-flex min-h-8 items-center transition-colors hover:text-[#d5ae5d]">{isRTL ? "الخدمات" : "Services"}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <Link href={`${regionPrefix}/services/${id}`} className="inline-flex min-h-8 items-center transition-colors hover:text-[#d5ae5d]">{parentTitle}</Link>
            <ChevronRight className={`mx-2 h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="font-medium text-white">{isRTL ? page.titleAr : page.titleEn}</span>
          </nav>
          <div className="max-w-5xl">
            <p className="mb-5 text-sm uppercase tracking-[0.18em] text-[#d5ae5d]">{parentTitle}</p>
            <h1 className="mb-6 max-w-5xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-white lg:text-7xl">{`${isRTL ? page.titleAr : page.titleEn}${(isRTL ? page.titleAr : page.titleEn).endsWith(countryName) ? "" : ` ${isRTL ? "في" : "in"} ${countryName}`}`}</h1>
            <div className="mb-6 h-px w-20 bg-[#d5ae5d]" />
            <p className="mb-7 max-w-3xl font-serif text-xl italic leading-relaxed text-white/72 lg:text-2xl">{pageCopy.hero}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`${regionPrefix}/contact?service=${id}#consultation-request`} data-cta="contact" data-conversion-position="problem-hero" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 bg-[#d5ae5d] px-5 py-3 font-bold text-[#0d3e2a] transition-colors hover:bg-[#e0bd73]">
                <MessageSquareText size={18} /> {isRTL ? "أرسل المسألة للمراجعة" : "Send your matter for review"}
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="problem-hero" data-region={region} data-lang={isRTL ? "ar" : "en"} className="inline-flex items-center gap-2 border border-white/45 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                <Phone size={18} /> WhatsApp
              </a>
            </div>
            <p className="mt-4 max-w-3xl text-xs leading-5 text-white/58">{isRTL ? "اذكر الدولة وأي ميعاد قريب والنتيجة المطلوبة. نؤكد النطاق والرسوم قبل بدء العمل المدفوع." : "State the jurisdiction, any urgent date and the outcome you need. Scope and fee are confirmed before paid work begins."}</p>
          </div>
        </div>
      </section>

      <div className="premium-content-shell saudi-service-body py-12 lg:py-16">
        <div className="saudi-service-layout grid gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="saudi-service-main lg:col-span-8 xl:col-span-9">
            <ServiceExperience copy={pageCopy} isArabic={isRTL} region={region} service={id} contactHref={serviceContactHref} />
            <ServiceContact copy={pageCopy} isArabic={isRTL} region={region} contactHref={serviceContactHref} whatsappHref={whatsappUrl} />
          </div>

          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
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
              </ul>
              <Link href={`${regionPrefix}/contact?service=${id}#consultation-request`} data-cta="contact" data-conversion-position="problem-sidebar" data-region={region} data-lang={isRTL ? "ar" : "en"} className="block w-full bg-[#d5ae5d] px-5 py-4 text-center font-bold text-[#0d3e2a] transition-colors hover:bg-[#e0bd73]">
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

      <LatestContentCarousels isArabic={isRTL} region={region} serviceSlug={id} />
    </div>
  );
}
