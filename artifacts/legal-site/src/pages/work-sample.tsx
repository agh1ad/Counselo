import { Link, Redirect, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Calendar, Download, ExternalLink, FileCheck2, Languages, LockKeyhole, Scale, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { workJurisdictionRegion } from "@/lib/work-jurisdiction";
import { SEOHead } from "@/components/seo/SEOHead";
import { type WorkSamplePublic, documentLanguageLabel, formatWorkDate, localized } from "@/lib/work-samples";
import { fetchPublicJson, publicApiUrl, isMissingPublicContent } from "@/lib/public-api";
import { PdfDocumentPreview } from "@/components/content/pdf-document-preview";
import { ContentRecovery } from "@/components/content/content-recovery";
import { workAttachmentPath, publicWorkDocumentTextPath, WORK_CONTEXT, WORK_READER_GUIDANCE, workModifiedAt, COUNSELO_ENTITY_IDS, getServiceDefinition, getServicesForRegion } from "@workspace/api-zod/browser";

declare global {
  interface Window {
    // Injected by the server in og-pages.ts buildDynamicWorkHtml so the
    // React query has data immediately without a loading flash.
    __SSR_WORK__?: WorkSamplePublic;
  }
}

export default function WorkSample() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { lang, isRTL } = useLanguage();
  const { data: sample, isLoading, isError, error, isFetching, refetch } = useQuery<WorkSamplePublic>({
    queryKey: ["work-sample", slug],
    queryFn: () => fetchPublicJson<WorkSamplePublic>(`/api/work/${encodeURIComponent(slug)}`),
    // Use server-injected data (window.__SSR_WORK__) as the initial value so
    // the page renders instantly on first load without a loading flash.
    initialData: () => {
      if (
        typeof window !== "undefined" &&
        window.__SSR_WORK__ &&
        window.__SSR_WORK__.slug === slug
      ) {
        return window.__SSR_WORK__;
      }
      // Discovery cards omit the case detail fields and cannot stand in for
      // the complete work record while the detail endpoint is unavailable.
      return undefined;
    },
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  });

  const ar = lang === "ar";
  const workBasePath = ar ? "/ar/our-work" : "/our-work";
  const ui = ar ? {
    back: "العودة إلى أعمالنا", notFound: "نموذج العمل غير موجود", completed: "تاريخ نموذج العمل", jurisdiction: "النطاق القانوني", clientType: "نوع العميل", documentLanguage: "لغة المستند", challenge: "المسألة", approach: "العمل الذي قمنا به", outcome: "النتيجة أو القيمة المقدمة", document: "المستند المنقح", open: "فتح المستند في نافذة جديدة", download: "تنزيل نسخة", privacy: "حماية السرية", privacyText: "نُقحت بيانات العملاء والمعلومات السرية قبل النشر.", disclaimer: "هذا النموذج لأغراض توضيح الخبرة المهنية فقط. عُدّلت بعض التفاصيل أو حُجبت لحماية السرية، ولا تمثل النتائج السابقة ضماناً لنتيجة أي مسألة أخرى.", ctaTitle: "هل تحتاج إلى مستند أو حل قانوني مماثل؟", cta: "ناقش متطلباتك معنا",
  } : {
    back: "Back to Our Work", notFound: "Work sample not found", completed: "Work sample date", jurisdiction: "Jurisdiction", clientType: "Client type", documentLanguage: "Document language", challenge: "The matter", approach: "Work performed", outcome: "Outcome or value delivered", document: "Redacted document", open: "Open document in a new tab", download: "Download a copy", privacy: "Confidentiality protected", privacyText: "Client identities and confidential details were redacted before publication.", disclaimer: "This sample demonstrates professional experience only. Details may be modified or withheld to protect confidentiality, and past work or outcomes do not guarantee the result of another matter.", ctaTitle: "Need a similar legal document or solution?", cta: "Discuss Your Requirements",
  };

  if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">{ar ? "جارٍ التحميل…" : "Loading…"}</div>;
  if (isError && !isMissingPublicContent(error) && !sample) return <ContentRecovery isArabic={ar} retry={() => { void refetch(); }} retrying={isFetching} backHref={workBasePath} backLabel={ui.back} />;
  if (isMissingPublicContent(error) || !sample) return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4"><h1 className="text-2xl font-serif font-bold">{ui.notFound}</h1><Link href={workBasePath} className="text-primary hover:underline">{ui.back}</Link></div>;
  if (ar && !sample.titleAr) return <Redirect to={`/our-work/${sample.slug}`} replace />;
  if (!ar && !sample.titleEn) return <Redirect to={`/ar/our-work/${sample.slug}`} replace />;

  const title = localized(sample.titleEn, sample.titleAr, lang);
  const summary = localized(sample.summaryEn, sample.summaryAr, lang);
  const workType = localized(sample.workTypeEn, sample.workTypeAr, lang);
  const jurisdiction = localized(sample.jurisdictionEn, sample.jurisdictionAr, lang);
  const context = WORK_CONTEXT[sample.slug];
  const region = context ? context.region : workJurisdictionRegion(sample.jurisdictionEn, sample.jurisdictionAr);
  const modifiedAt = workModifiedAt(sample.slug, sample.updatedAt, sample.date);
  const creator = context?.creator === "baghdadi-law"
    ? { "@type": "LegalService", "@id": COUNSELO_ENTITY_IDS.alBaghdadiOffice, name: "Baghdadi Law", alternateName: "البغدادي للمحاماة" }
    : { "@type": "Organization", "@id": COUNSELO_ENTITY_IDS.organization, name: "CounselO Legal", alternateName: "كاونسلو للاستشارات القانونية" };
  const regionPrefix = `${region ? `/${region}` : ""}${ar ? "/ar" : ""}`;
  const contactPath = region ? `${regionPrefix}/contact` : (ar ? "/ar#contact" : "/#contact");
  const clientType = localized(sample.clientTypeEn, sample.clientTypeAr, lang);
  const challenge = localized(sample.challengeEn, sample.challengeAr, lang);
  const approach = localized(sample.approachEn, sample.approachAr, lang);
  const outcome = localized(sample.outcomeEn, sample.outcomeAr, lang);
  const seoTitle = localized(sample.seoTitleEn, sample.seoTitleAr, lang) || title;
  const seoDescription = localized(sample.seoDescriptionEn, sample.seoDescriptionAr, lang) || summary;
  const fileUrl = publicApiUrl(workAttachmentPath(sample));
  const textPath = publicWorkDocumentTextPath(sample);
  const canonicalPath = `${workBasePath}/${sample.slug}`;
  const canonical = `https://counselo-legal.com${canonicalPath}`;
  const validServiceSlugs = new Set(region ? getServicesForRegion(region).map((service) => service.slug) : []);
  const relatedServiceSlugs = (context?.relatedServiceSlugs ?? sample.relatedServiceSlugs ?? [])
    .filter((serviceSlug) => validServiceSlugs.has(serviceSlug))
    .slice(0, 2);
  const relatedService = region && relatedServiceSlugs[0]
    ? getServiceDefinition(relatedServiceSlugs[0], region)
    : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#work-sample`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${canonical}#webpage` },
    name: title,
    headline: title,
    description: seoDescription,
    url: canonical,
    dateCreated: sample.date,
    dateModified: modifiedAt,
    inLanguage: lang,
    genre: ["Legal case study", workType].filter(Boolean),
    contentLocation: jurisdiction,
    isAccessibleForFree: true,
    conditionsOfAccess: ar
      ? "دراسة مهنية منقحة منشورة مع حماية سرية العملاء"
      : "Published redacted professional case study with client confidentiality protected",
    about: relatedService
      ? { "@type": "Service", name: localized(relatedService.titleEn, relatedService.titleAr, lang), url: `https://counselo-legal.com${regionPrefix}/services/${relatedService.slug}` }
      : { "@type": "Thing", name: jurisdiction },
    keywords: [workType, jurisdiction, relatedService && localized(relatedService.titleEn, relatedService.titleAr, lang), "legal case study"].filter(Boolean),
    creator,
    copyrightHolder: creator,
    publisher: { "@id": COUNSELO_ENTITY_IDS.organization },
    isPartOf: { "@id": `https://counselo-legal.com${workBasePath}#webpage` },
    encoding: sample.hasFile ? { "@type": "MediaObject", contentUrl: new URL(fileUrl, "https://counselo-legal.com").href, encodingFormat: sample.fileMimeType } : undefined,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ar ? "الرئيسية" : "Home", item: `https://counselo-legal.com${ar ? "/ar" : "/"}` },
      { "@type": "ListItem", position: 2, name: ar ? "أعمالنا" : "Our Work", item: `https://counselo-legal.com${workBasePath}` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  return (
    <div className="counselo-editorial-page case-file-page min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead heroArtwork="platform" title={seoTitle} description={seoDescription} canonical={canonicalPath} noRegionPrefix contentLanguage={lang} sharedLanguageAlternates={sample.titleEn && sample.titleAr ? { en: `/our-work/${sample.slug}`, ar: `/ar/our-work/${sample.slug}` } : undefined} keywords={`${workType}, ${jurisdiction}, ${ar ? "نموذج عمل قانوني, صياغة قانونية, كاونسلو للاستشارات القانونية" : "legal work sample, legal drafting, CounselO Legal"}`} schema={schema} extraSchemas={[breadcrumbSchema]} ogType="article" articlePublishedTime={sample.date} articleModifiedTime={modifiedAt} />
      <section className="premium-page-hero text-white px-4 py-14">
        <div className="max-w-6xl mx-auto"><Link href={workBasePath} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm"><ArrowLeft className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} />{ui.back}</Link><div className="max-w-4xl"><div className="flex flex-wrap gap-2 mb-5">{workType && <span className="border border-white/25 bg-white/10 px-3 py-1 text-sm">{workType}</span>}{sample.featured && <span className="bg-white text-primary px-3 py-1 text-sm font-semibold">{ar ? "عمل مميز" : "Featured work"}</span>}</div><h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-5">{title}</h1><div className="premium-hero-rule mb-6" /><p className="text-lg text-white/75 leading-relaxed">{summary}</p></div></div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
          <div className="work-reading-body space-y-6">
            {context && <p className="text-sm text-muted-foreground">{ar ? "تحديث المحتوى: " : "Content updated: "}{modifiedAt?.slice(0, 10)}</p>}
            {context?.creator === "baghdadi-law" && <p>{ar ? "الجهة صاحبة الدراسة: " : "Study by: "}<a href={ar ? "https://www.baghdadilaw.co/ar/who-we-are" : "https://www.baghdadilaw.co/who-we-are"} className="text-primary underline">{ar ? "البغدادي للمحاماة" : "Baghdadi Law"}</a></p>}
            <div className="work-facts">
              {[
                [Calendar, ui.completed, formatWorkDate(sample.date, lang)],
                [Scale, ui.jurisdiction, jurisdiction],
                [FileCheck2, ar ? "نوع العمل" : "Work type", workType],
                [Languages, ui.documentLanguage, documentLanguageLabel(sample.documentLanguage, lang)],
              ].filter(([, , value]) => value).map(([Icon, label, value]) => {
                const ItemIcon = Icon as typeof Calendar;
                return <div key={String(label)} className="flex gap-3 border-b border-border py-3"><ItemIcon className="h-5 w-5 text-primary shrink-0" /><div><p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{String(label)}</p><p className="font-semibold">{String(value)}</p></div></div>;
              })}
            </div>
            {clientType && <div className="border-s-4 border-primary bg-muted/40 p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{ui.clientType}</p><p className="font-semibold">{clientType}</p></div>}
            {[[ui.challenge, challenge], [ui.approach, approach], [ui.outcome, outcome]].filter(([, value]) => value).map(([heading, value]) => <article key={heading}><h2 className="text-2xl font-serif font-bold mb-4">{heading}</h2><p className="text-muted-foreground leading-8 whitespace-pre-line">{value}</p></article>)}
            {context?.evidenceNote && <section aria-labelledby="work-evidence-heading" className="border-s-4 border-primary bg-muted/40 p-5"><h2 id="work-evidence-heading" className="text-xl font-serif font-bold mb-3">{ar ? "ما الذي يوضحه المستند المنشور؟" : "What does the published document establish?"}</h2><p className="text-muted-foreground leading-8">{context.evidenceNote[lang]}</p></section>}
            {WORK_READER_GUIDANCE[sample.slug]?.[lang].map(answer => <section key={answer.q}><h2 className="text-2xl font-serif font-bold mb-4">{answer.q}</h2><p className="text-muted-foreground leading-8">{answer.a}</p></section>)}
            <div className="border border-amber-200 bg-amber-50 text-amber-950 p-5 flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" /><p className="text-sm leading-relaxed">{ui.disclaimer}</p></div>
          </div>

          {sample.hasFile && <aside className="space-y-6">
            <div className="border border-border bg-card p-5 sticky top-28">
              <h2 className="text-xl font-serif font-bold mb-4">{context?.evidenceNote ? (ar ? "دراسة كاونسلو للاستشارات القانونية للحالة" : "CounselO Legal case study") : ui.document}</h2>
              <div id="work-document-preview" className="aspect-[3/4] bg-muted border border-border overflow-hidden mb-4 flex items-center justify-center">
                {sample.fileMimeType.startsWith("image/") ? <img src={fileUrl} alt={title} className="w-full h-full object-contain" /> : <PdfDocumentPreview key={fileUrl} src={fileUrl} title={`${ui.document}: ${title}`} isArabic={ar} />}
              </div>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 font-semibold hover:bg-primary/90"><ExternalLink className="h-4 w-4" />{ui.open}</a>
              <a href={`${fileUrl}?download=1`} download={sample.fileName} className="mt-2 w-full flex items-center justify-center gap-2 border border-border px-4 py-3 font-semibold hover:bg-muted"><Download className="h-4 w-4" />{ui.download}</a>
              {textPath && <a href={publicApiUrl(textPath)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">{ar ? "قراءة نص المستند" : "Read document as text"}</a>}
              <div className="mt-5 pt-5 border-t border-border"><div className="flex gap-2 font-semibold text-sm mb-2"><LockKeyhole className="h-4 w-4 text-primary" />{ui.privacy}</div><p className="text-xs text-muted-foreground leading-relaxed">{ui.privacyText}</p></div>
            </div>
          </aside>}
        </div>
      </section>

      <section className="bg-muted border-y border-border px-4 py-14 text-center"><h2 className="text-3xl font-serif font-bold mb-6">{ui.ctaTitle}</h2><Link href={contactPath} className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 font-semibold hover:bg-primary/90">{region ? ui.cta : (ar ? "اختر الاختصاص لمناقشة متطلباتك" : "Choose your jurisdiction to discuss your requirements")}<ArrowRight className={`h-4 w-4 ${ar ? "rotate-180" : ""}`} /></Link></section>
    </div>
  );
}
