import { useState } from "react";
import { readingSearchKey } from "@/lib/article-reading";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import * as m from "framer-motion/m";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, FileCheck2, FileText, Languages, LockKeyhole, Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { type WorkSamplePublic, documentLanguageLabel, formatWorkDate, localized, workSamplePath } from "@/lib/work-samples";
import { fetchPublicJson } from "@/lib/public-api";
import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";

declare global {
  interface Window {
    __SSR_WORK_SAMPLES__?: WorkSamplePublic[];
  }
}

export default function OurWork() {
  const [search, setSearch] = useState("");
  const { lang, isRTL } = useLanguage();
  const { regionPrefix } = useRegion();
  const { data: samples = [], isLoading } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: () => fetchPublicJson<WorkSamplePublic[]>("/api/work"),
    placeholderData: () =>
      typeof window !== "undefined"
        ? window.__SSR_WORK_SAMPLES__
        : undefined,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const ar = lang === "ar";
  const workBasePath = ar ? "/ar/our-work" : "/our-work";
  const visibleSamples = samples.filter((sample) => ar ? Boolean(sample.titleAr) : Boolean(sample.titleEn));
  const matchingSamples = visibleSamples.filter(sample => readingSearchKey(`${sample.titleEn} ${sample.titleAr} ${sample.workTypeEn} ${sample.workTypeAr} ${sample.jurisdictionEn} ${sample.jurisdictionAr}`).includes(readingSearchKey(search)));
  const ui = ar ? {
    eyebrow: "مكتبة كاونسلو للاستشارات القانونية · نماذج الأعمال",
    title: "نماذج الأعمال والمذكرات القانونية",
    intro: "نماذج مختارة ومنقحة من مستندات وأعمال قانونية أعدها فريق كاونسلو للاستشارات القانونية. نحذف بيانات العملاء والمعلومات السرية قبل النشر.",
    trustTitle: "كيف نحمي خصوصية العملاء",
    trustText: "لا ننشر أسماء العملاء أو بياناتهم أو تفاصيل تسمح بالتعرف عليهم. تُعرض هذه النماذج لإيضاح منهجية العمل وجودة الصياغة فقط.",
    empty: "ستُضاف نماذج أعمال منقحة قريباً.",
    view: "عرض نموذج العمل",
    featured: "عمل مميز",
    completed: "أُنجز",
    docLanguage: "لغة المستند",
    ctaTitle: "هل تحتاج إلى عمل قانوني بهذه العناية؟",
    ctaText: "شارك متطلباتك معنا للحصول على تقييم واضح لنطاق العمل والوقت والتكلفة قبل البدء.",
    cta: "ابدأ استشارتك",
  } : {
    eyebrow: "CounselO Legal Library · Selected Work",
    title: "Legal work samples and memoranda",
    intro: "A selection of redacted legal documents and professional work prepared by CounselO Legal. Client identities and confidential information are removed before publication.",
    trustTitle: "How client privacy is protected",
    trustText: "We do not publish client names, personal data, or identifying matter details. These samples demonstrate our working method and drafting quality only.",
    empty: "Redacted work samples will be added soon.",
    view: "View Work Sample",
    featured: "Featured work",
    completed: "Completed",
    docLanguage: "Document language",
    ctaTitle: "Need legal work prepared with this level of care?",
    ctaText: "Tell us what you need and receive a clear assessment of scope, timing, and cost before work begins.",
    cta: "Start a Consultation",
  };

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `https://counselo-legal.com${workBasePath}#webpage`,
      name: ar ? "نماذج أعمال كاونسلو للاستشارات القانونية" : "CounselO Legal Work Samples",
      description: ui.intro,
      url: `https://counselo-legal.com${workBasePath}`,
      inLanguage: ar ? "ar" : "en",
      isPartOf: { "@id": `https://counselo-legal.com${ar ? "/ar/legal-library" : "/legal-library"}#webpage` },
      about: { "@id": COUNSELO_ENTITY_IDS.organization },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: visibleSamples.length,
      itemListElement: matchingSamples.map((sample, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: localized(sample.titleEn, sample.titleAr, lang),
        url: `https://counselo-legal.com${workSamplePath(sample, ar)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ar ? "الرئيسية" : "Home", item: "https://counselo-legal.com/" },
        { "@type": "ListItem", position: 2, name: ar ? "المكتبة القانونية" : "Legal Library", item: `https://counselo-legal.com${ar ? "/ar/legal-library" : "/legal-library"}` },
        { "@type": "ListItem", position: 3, name: ui.title, item: `https://counselo-legal.com${workBasePath}` },
      ],
    },
  ];

  return (
    <div className="counselo-editorial-page legal-portfolio-page min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        heroArtwork="gold"
        title={ar ? "نماذج من أعمالنا القانونية | خبرة وصياغة احترافية | كاونسلو للاستشارات القانونية" : "Our Legal Work | Redacted Documents & Experience | CounselO Legal"}
        description={ar ? "اطلع على نماذج منقحة من العقود والمذكرات والأعمال القانونية التي أعدها فريق كاونسلو للاستشارات القانونية، مع حماية كاملة لسرية وخصوصية العملاء." : "View redacted contracts, legal documents, and selected professional work prepared by CounselO Legal, with client confidentiality and identifying information protected."}
        canonical={workBasePath}
        noRegionPrefix
        sharedLanguageAlternates={{ en: "/our-work", ar: "/ar/our-work" }}
        contentLanguage={lang}
        keywords={ar ? "نماذج عقود قانونية, أعمال محاماة, صياغة عقود, خبرة قانونية, نماذج قانونية كاونسلو للاستشارات القانونية" : "legal work samples, redacted contracts, contract drafting experience, law firm portfolio, CounselO Legal documents"}
        schema={schemas}
      />

      <section className="premium-page-hero text-white px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[#e0c078] text-xs font-semibold uppercase tracking-[0.18em] mb-5"><BriefcaseBusiness className="h-4 w-4" />{ui.eyebrow}</div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">{ui.title}</h1>
          <div className="premium-hero-rule mx-auto mb-7" />
          <p className="text-lg text-white/75 leading-relaxed max-w-3xl mx-auto">{ui.intro}</p>
          <Link href={ar ? "/ar/legal-library" : "/legal-library"} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#e0c078] hover:underline">
            {ar ? "العودة إلى المكتبة القانونية" : "Back to the Legal Library"}<ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} />
          </Link>
          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-10 text-sm">
            {[ar ? "صياغة مدروسة" : "Careful drafting", ar ? "مراجعة قانونية" : "Legal review", ar ? "سرية محفوظة" : "Confidentiality protected"].map((label, i) => (
              <div key={label} className="flex items-center justify-center gap-2 border border-white/20 bg-white/10 px-4 py-3"><BadgeCheck className="h-4 w-4" />{label}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-5">
          <label htmlFor="work-search" className="block font-semibold mb-2">{ar ? "ابحث في نماذج الأعمال" : "Search work samples"}</label>
          <input id="work-search" type="search" value={search} onChange={event => setSearch(event.target.value)} className="reading-search" placeholder={ar ? "الموضوع أو الدولة أو نوع المستند" : "Topic, country or document type"} />
          <p role="status" className="mt-2 text-sm text-muted-foreground">{ar ? `${matchingSamples.length} نموذج عمل` : `${matchingSamples.length} work samples`}</p>
          {search && matchingSamples.length === 0 && <p className="mt-4">{ar ? "لا توجد نتائج. جرّب كلمة أخرى." : "No matches. Try another keyword."}</p>}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">{[1,2,3].map((n) => <div key={n} className="h-80 bg-muted animate-pulse border border-border" />)}</div>
        ) : visibleSamples.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border"><FileText className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" /><p className="text-muted-foreground">{ui.empty}</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {matchingSamples.map((sample, index) => {
              const title = localized(sample.titleEn, sample.titleAr, lang);
              const summary = localized(sample.summaryEn, sample.summaryAr, lang);
              const workType = localized(sample.workTypeEn, sample.workTypeAr, lang);
              const jurisdiction = localized(sample.jurisdictionEn, sample.jurisdictionAr, lang);
              return (
                <m.article key={sample.slug} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * .06, .24) }} className="reading-result group border-b border-border flex flex-col">
                  <div className="py-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                      {workType && <span className="border border-border px-2.5 py-1">{workType}</span>}
                      {jurisdiction && <span className="border border-border px-2.5 py-1">{jurisdiction}</span>}
                    </div>
                    <h2 className="text-xl font-serif font-bold leading-snug mb-3 group-hover:text-primary transition-colors">{title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{summary}</p>
                    <div className="mt-auto space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-2"><Scale className="h-3.5 w-3.5" />{ui.completed}: {formatWorkDate(sample.date, lang)}</div>
                      <div className="flex items-center gap-2"><Languages className="h-3.5 w-3.5" />{ui.docLanguage}: {documentLanguageLabel(sample.documentLanguage, lang)}</div>
                    </div>
                    <Link href={workSamplePath(sample, ar)} className="mt-5 inline-flex items-center justify-between font-semibold text-primary hover:underline">{ui.view}<ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} /></Link>
                  </div>
                </m.article>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-muted border-y border-border px-4 py-16">
        <div className="max-w-4xl mx-auto text-center"><h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{ui.ctaTitle}</h2><p className="text-muted-foreground text-lg mb-7">{ui.ctaText}</p><Link href={`${regionPrefix}/contact`} className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 font-semibold hover:bg-primary/90">{ui.cta}<ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} /></Link></div>
      </section>
    </div>
  );
}
