import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, FileCheck2, FileText, Languages, LockKeyhole, Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { type WorkSamplePublic, documentLanguageLabel, formatWorkDate, localized } from "@/lib/work-samples";

export default function OurWork() {
  const { lang, isRTL } = useLanguage();
  const { regionPrefix } = useRegion();
  const { data: samples = [], isLoading } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: async () => {
      const response = await fetch("/api/work");
      if (!response.ok) throw new Error("Unable to load work samples");
      return response.json() as Promise<WorkSamplePublic[]>;
    },
    staleTime: 60_000,
  });

  const ar = lang === "ar";
  const workBasePath = ar ? "/ar/our-work" : "/our-work";
  const visibleSamples = samples.filter((sample) => ar ? Boolean(sample.titleAr) : Boolean(sample.titleEn));
  const ui = ar ? {
    eyebrow: "نماذج من أعمالنا",
    title: "خبرة قانونية يمكن الاطلاع عليها",
    intro: "نماذج مختارة ومنقحة من مستندات وأعمال قانونية أعدها فريق كاونسلو. نحذف بيانات العملاء والمعلومات السرية قبل النشر.",
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
    eyebrow: "Selected Work",
    title: "Legal experience you can examine",
    intro: "A selection of redacted legal documents and professional work prepared by CounselO. Client identities and confidential information are removed before publication.",
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
      name: ar ? "نماذج أعمال كاونسلو القانونية" : "CounselO Legal Work Samples",
      description: ui.intro,
      url: `https://counselo-legal.com${workBasePath}`,
      inLanguage: ar ? "ar" : "en",
      isPartOf: { "@id": "https://counselo-legal.com/#website" },
      about: { "@id": "https://counselo-legal.com/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: visibleSamples.length,
      itemListElement: visibleSamples.map((sample, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: localized(sample.titleEn, sample.titleAr, lang),
        url: `https://counselo-legal.com${workBasePath}/${sample.slug}`,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={ar ? "نماذج من أعمالنا القانونية | خبرة وصياغة احترافية | كاونسلو" : "Our Legal Work | Redacted Documents & Experience | CounselO"}
        description={ar ? "اطلع على نماذج منقحة من العقود والمذكرات والأعمال القانونية التي أعدها فريق كاونسلو، مع حماية كاملة لسرية وخصوصية العملاء." : "View redacted contracts, legal documents, and selected professional work prepared by CounselO, with client confidentiality and identifying information protected."}
        canonical={workBasePath}
        noRegionPrefix
        sharedLanguageAlternates={{ en: "/our-work", ar: "/ar/our-work" }}
        contentLanguage={lang}
        keywords={ar ? "نماذج عقود قانونية, أعمال محاماة, صياغة عقود, خبرة قانونية, نماذج قانونية كاونسلو" : "legal work samples, redacted contracts, contract drafting experience, law firm portfolio, CounselO legal documents"}
        schema={schemas}
      />

      <section className="bg-primary text-white px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-white/70 text-sm font-semibold uppercase tracking-widest mb-5"><BriefcaseBusiness className="h-4 w-4" />{ui.eyebrow}</div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">{ui.title}</h1>
          <p className="text-lg text-white/75 leading-relaxed max-w-3xl mx-auto">{ui.intro}</p>
          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-10 text-sm">
            {[ar ? "صياغة مدروسة" : "Careful drafting", ar ? "مراجعة قانونية" : "Legal review", ar ? "سرية محفوظة" : "Confidentiality protected"].map((label, i) => (
              <div key={label} className="flex items-center justify-center gap-2 border border-white/20 bg-white/10 px-4 py-3"><BadgeCheck className="h-4 w-4" />{label}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-border bg-muted/40 p-6 md:p-8 flex flex-col md:flex-row gap-5 mb-12">
          <div className="h-12 w-12 shrink-0 bg-primary/10 text-primary flex items-center justify-center"><LockKeyhole className="h-6 w-6" /></div>
          <div><h2 className="text-xl font-serif font-bold mb-2">{ui.trustTitle}</h2><p className="text-muted-foreground leading-relaxed max-w-4xl">{ui.trustText}</p></div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">{[1,2,3].map((n) => <div key={n} className="h-80 bg-muted animate-pulse border border-border" />)}</div>
        ) : visibleSamples.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border"><FileText className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" /><p className="text-muted-foreground">{ui.empty}</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleSamples.map((sample, index) => {
              const title = localized(sample.titleEn, sample.titleAr, lang);
              const summary = localized(sample.summaryEn, sample.summaryAr, lang);
              const workType = localized(sample.workTypeEn, sample.workTypeAr, lang);
              const jurisdiction = localized(sample.jurisdictionEn, sample.jurisdictionAr, lang);
              return (
                <motion.article key={sample.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * .06, .24) }} className="group border border-border bg-card flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="h-44 bg-gradient-to-br from-primary/10 via-muted to-primary/5 flex items-center justify-center relative border-b border-border">
                    <div className="w-20 h-24 bg-white border border-border shadow-md flex items-center justify-center"><FileCheck2 className="h-9 w-9 text-primary" /></div>
                    {sample.featured && <span className="absolute top-4 start-4 bg-primary text-white text-xs font-semibold px-3 py-1">{ui.featured}</span>}
                    <span className="absolute bottom-4 end-4 bg-background/90 border border-border text-xs px-2 py-1 uppercase">{sample.fileMimeType === "application/pdf" ? "PDF" : "IMAGE"}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                      {workType && <span className="border border-border px-2.5 py-1">{workType}</span>}
                      {jurisdiction && <span className="border border-border px-2.5 py-1">{jurisdiction}</span>}
                    </div>
                    <h2 className="text-xl font-serif font-bold leading-snug mb-3 group-hover:text-primary transition-colors">{title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-5">{summary}</p>
                    <div className="mt-auto space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-2"><Scale className="h-3.5 w-3.5" />{ui.completed}: {formatWorkDate(sample.date, lang)}</div>
                      <div className="flex items-center gap-2"><Languages className="h-3.5 w-3.5" />{ui.docLanguage}: {documentLanguageLabel(sample.documentLanguage, lang)}</div>
                    </div>
                    <Link href={`${workBasePath}/${sample.slug}`} className="mt-5 inline-flex items-center justify-between font-semibold text-primary hover:underline">{ui.view}<ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} /></Link>
                  </div>
                </motion.article>
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
