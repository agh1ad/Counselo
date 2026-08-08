import { useParams, Link, Redirect, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { TrustSignals } from "@/components/seo/TrustSignals";
import { type WorkSamplePublic, localized } from "@/lib/work-samples";
import { fetchPublicJson } from "@/lib/public-api";
import {
  articleJurisdictionLabel,
  assignArticleProvenance,
  blogPath,
  hasQualityBilingualBlogContent,
  COUNSELO_ENTITY_IDS,
} from "@workspace/api-zod";

const BLOG_CATEGORY_TO_SERVICE: Record<string, { slug: string; nameEn: string; nameAr: string }> = {
  "Family Law":        { slug: "family-law",       nameEn: "Family Law Services",              nameAr: "خدمات قانون الأسرة" },
  "قانون الأسرة":      { slug: "family-law",       nameEn: "Family Law Services",              nameAr: "خدمات قانون الأسرة" },
  "Employment Law":    { slug: "employment-law",    nameEn: "Employment Law Services",          nameAr: "خدمات قانون العمل" },
  "قانون العمل":       { slug: "employment-law",    nameEn: "Employment Law Services",          nameAr: "خدمات قانون العمل" },
  "Real Estate Law":   { slug: "real-estate",       nameEn: "Real Estate Law Services",         nameAr: "خدمات القانون العقاري" },
  "قانون العقارات":    { slug: "real-estate",       nameEn: "Real Estate Law Services",         nameAr: "خدمات القانون العقاري" },
  "Foreign Investment":{ slug: "foreign-investment",nameEn: "Foreign Investment Services",      nameAr: "خدمات الاستثمار الأجنبي" },
  "الاستثمار الأجنبي": { slug: "foreign-investment",nameEn: "Foreign Investment Services",      nameAr: "خدمات الاستثمار الأجنبي" },
  "Administrative Law":{ slug: "administrative-law",nameEn: "Administrative Law Services",      nameAr: "خدمات القانون الإداري" },
  "القانون الإداري":   { slug: "administrative-law",nameEn: "Administrative Law Services",      nameAr: "خدمات القانون الإداري" },
  "Business Law":      { slug: "business-law",      nameEn: "Business Law Services",            nameAr: "خدمات القانون التجاري" },
  "القانون التجاري":   { slug: "business-law",      nameEn: "Business Law Services",            nameAr: "خدمات القانون التجاري" },
};

interface BlogSection {
  heading?: string;
  body: string;
}

interface ApiPost {
  id: number;
  slug: string;
  date: string;
  updatedAt?: string;
  categoryEn: string;
  categoryAr: string;
  readTime: number;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  bodyEn: string;
  bodyAr: string;
  contentEn: BlogSection[];
  contentAr: BlogSection[];
  published: boolean;
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
  relatedWorkSlugs: string[];
  contentType?: "legal-guidance" | "professional-commentary";
  aiLinksAssignedAt?: string;
  primaryAuthorName?: string;
  primaryAuthorNameAr?: string;
  primaryAuthorUrl?: string;
  legalReviewerName?: string;
  legalReviewerNameAr?: string;
  legalReviewerUrl?: string;
  jurisdiction?: "uae" | "sa" | "syr";
  applicableLaw?: string;
  applicableLawAr?: string;
  sources?: Array<{ titleEn: string; titleAr: string; href: string }>;
  keyLegalUpdateNote?: string;
  keyLegalUpdateNoteAr?: string;
  contentMethodology?: string;
  contentMethodologyAr?: string;
  lastSubstantiveReviewAt?: string;
  correctionUrl?: string;
}

function formatDate(dateStr: string, lang: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function normalizeDescription(primary: string, fallback: string): string {
  const combined = primary.trim().length >= 80
    ? primary.trim()
    : `${primary.trim()} ${fallback.trim()}`.trim();
  if (combined.length <= 170) return combined;
  return `${combined.slice(0, 167).replace(/\s+\S*$/, "").trimEnd()}…`;
}

declare global {
  interface Window {
    __SSR_POST__?: ApiPost;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [location] = useLocation();
  const { lang, isRTL } = useLanguage();
  const requestedLanguage = location.startsWith("/blog/ar/")
    ? "ar"
    : location.startsWith("/blog/en/")
      ? "en"
      : undefined;

  const dbSlug = slug ?? "";

  const { data: post, isLoading, isError } = useQuery<ApiPost>({
    queryKey: ["blog-post", dbSlug],
    queryFn: () => fetchPublicJson<ApiPost>(`/api/blog/posts/${encodeURIComponent(dbSlug)}`),
    // Use server-injected data (window.__SSR_POST__) as the initial value so
    // the page renders instantly on first load without a loading flash.
    initialData: () => {
      if (
        typeof window !== "undefined" &&
        window.__SSR_POST__ &&
        window.__SSR_POST__.slug === dbSlug
      ) {
        return window.__SSR_POST__;
      }
      if (typeof window !== "undefined") {
        return (window.__SSR_POSTS__ as ApiPost[] | undefined)?.find(
          (candidate) => candidate.slug === dbSlug,
        );
      }
      return undefined;
    },
    staleTime: 60_000,
    retry: false,
  });
  const { data: allPosts = [] } = useQuery<ApiPost[]>({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPublicJson<ApiPost[]>("/api/blog/posts"),
    initialData: () => typeof window !== "undefined" ? window.__SSR_POSTS__ as ApiPost[] | undefined : undefined,
    staleTime: 60_000,
  });
  const { data: allWork = [] } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: () => fetchPublicJson<WorkSamplePublic[]>("/api/work"),
    initialData: () => typeof window !== "undefined" ? window.__SSR_WORK_SAMPLES__ : undefined,
    staleTime: 60_000,
  });

  const ui = {
    en: {
      back: "Back to Blog",
      minRead: "min read",
      consultHeading: "Need Legal Advice?",
      consultDesc:
        "CounselO offers confidential online legal consultations for its supported jurisdictions via WhatsApp or email — no office visit required. Founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi: 30+ years of legal practice, 20,000+ matters handled.",
      whatsapp: "Chat on WhatsApp",
      consultation: "Start Consultation",
      disclaimer:
        "This article is for awareness purposes only and does not constitute legal advice. For advice on your specific situation, please consult a qualified lawyer.",
      notFound: "Article Not Found",
      notFoundDesc: "This article does not exist or may have been moved.",
      backBlog: "Return to Blog",
      loading: "Loading article…",
    },
    ar: {
      back: "العودة إلى المدونة",
      minRead: "د قراءة",
      consultHeading: "هل تحتاج إلى مشورة قانونية؟",
      consultDesc: "يقدم كاونسلو استشارات سرية عبر واتساب أو البريد الإلكتروني — دون الحاجة لزيارة مكتب. من تأسيس المحامي والمستشار القانوني عمر البغدادي — خبرة قانونية تزيد على 30 عاماً.",
      whatsapp: "تواصل عبر واتساب",
      consultation: "ابدأ الاستشارة",
      disclaimer:
        "هذا المقال لأغراض توعوية فحسب ولا يُعدّ مشورة قانونية. للحصول على نصيحة في وضعك المحدد، يرجى التواصل مع محامٍ متخصص.",
      notFound: "المقال غير موجود",
      notFoundDesc: "هذا المقال غير موجود أو ربما نُقل.",
      backBlog: "العودة إلى المدونة",
      loading: "جارٍ تحميل المقال…",
    },
  }[lang];

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir={isRTL ? "rtl" : "ltr"}>
        <p className="text-muted-foreground animate-pulse">{ui.loading}</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4" dir={isRTL ? "rtl" : "ltr"}>
        <h1 className="text-2xl font-serif font-bold text-foreground">{ui.notFound}</h1>
        <p className="text-muted-foreground">{ui.notFoundDesc}</p>
        <Link href="/blog" className="text-primary font-medium hover:underline">{ui.backBlog}</Link>
      </div>
    );
  }

  const hasEnglish = !!(post.titleEn && post.titleEn.trim());
  const hasArabic = !!(post.titleAr && post.titleAr.trim());
  const isBilingual = hasQualityBilingualBlogContent(post);
  if (requestedLanguage && !isBilingual) {
    return <Redirect to={blogPath(post.slug)} replace />;
  }
  const useAr = requestedLanguage === "ar"
    || (!requestedLanguage && hasArabic && (isRTL || !hasEnglish));
  const contentDir = useAr ? "rtl" : "ltr";

  const title = useAr ? post.titleAr : post.titleEn;
  const excerpt = useAr ? post.excerptAr : post.excerptEn;
  const seoTitle = useAr ? (post.seoTitleAr || post.titleAr) : (post.seoTitleEn || post.titleEn);
  const rawSeoDesc = useAr ? (post.seoDescriptionAr || post.excerptAr) : (post.seoDescriptionEn || post.excerptEn);
  const seoDesc = normalizeDescription(rawSeoDesc, excerpt);
  const category = useAr ? post.categoryAr : post.categoryEn;
  const body = useAr ? post.bodyAr : post.bodyEn;
  const content = (useAr ? post.contentAr : post.contentEn) ?? [];
  const articleSearchText = `${post.titleEn} ${post.titleAr} ${post.excerptEn} ${post.excerptAr} ${post.categoryEn} ${post.categoryAr}`;
  const articleRegion = /United Arab Emirates|\bUAE\b|الإمارات/i.test(articleSearchText)
    ? "uae"
    : /Syria|Syrian|سوريا|السوري/i.test(articleSearchText)
      ? "syr"
      : "sa";
  const articleRegionPrefix = `/${articleRegion}${useAr ? "/ar" : ""}`;
  const fallbackProvenance = assignArticleProvenance(post);
  const contentType = post.contentType ?? "professional-commentary";
  const provenance = {
    ...assignArticleProvenance({ ...post, contentType }),
    primaryAuthorName: post.primaryAuthorName || fallbackProvenance.primaryAuthorName,
    primaryAuthorNameAr: post.primaryAuthorNameAr || fallbackProvenance.primaryAuthorNameAr,
    primaryAuthorUrl: post.primaryAuthorUrl || fallbackProvenance.primaryAuthorUrl,
    legalReviewerName: post.legalReviewerName || fallbackProvenance.legalReviewerName,
    legalReviewerNameAr: post.legalReviewerNameAr || fallbackProvenance.legalReviewerNameAr,
    legalReviewerUrl: post.legalReviewerUrl || fallbackProvenance.legalReviewerUrl,
    applicableLaw: contentType === "legal-guidance" ? (post.applicableLaw || fallbackProvenance.applicableLaw) : "",
    applicableLawAr: contentType === "legal-guidance" ? (post.applicableLawAr || fallbackProvenance.applicableLawAr) : "",
    keyLegalUpdateNote: contentType === "legal-guidance" ? (post.keyLegalUpdateNote || fallbackProvenance.keyLegalUpdateNote) : fallbackProvenance.keyLegalUpdateNote,
    keyLegalUpdateNoteAr: contentType === "legal-guidance" ? (post.keyLegalUpdateNoteAr || fallbackProvenance.keyLegalUpdateNoteAr) : fallbackProvenance.keyLegalUpdateNoteAr,
    contentMethodology: contentType === "legal-guidance" ? (post.contentMethodology || fallbackProvenance.contentMethodology) : fallbackProvenance.contentMethodology,
    contentMethodologyAr: contentType === "legal-guidance" ? (post.contentMethodologyAr || fallbackProvenance.contentMethodologyAr) : fallbackProvenance.contentMethodologyAr,
    correctionUrl: post.correctionUrl || fallbackProvenance.correctionUrl,
    sources: contentType === "legal-guidance" ? (post.sources?.length ? post.sources : fallbackProvenance.sources) : [],
    jurisdiction: contentType === "legal-guidance" ? (post.jurisdiction || fallbackProvenance.jurisdiction) : undefined,
    lastSubstantiveReviewAt: post.lastSubstantiveReviewAt || fallbackProvenance.lastSubstantiveReviewAt,
  };
  const relatedPosts = (post.relatedBlogSlugs ?? [])
    .map((relatedSlug) => allPosts.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is ApiPost => Boolean(candidate));
  const relatedWork = (post.relatedWorkSlugs ?? [])
    .map((relatedSlug) => allWork.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is WorkSamplePublic => Boolean(candidate));

  const canonicalArticlePath = blogPath(post.slug, requestedLanguage);
  const canonicalArticleUrl = `https://counselo-legal.com${canonicalArticlePath}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalArticleUrl}#article`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${canonicalArticleUrl}#webpage` },
    "headline": seoTitle,
    "description": seoDesc,
    "inLanguage": useAr ? "ar" : "en",
    "datePublished": post.date,
    "dateModified": provenance.lastSubstantiveReviewAt,
    "image": {
      "@type": "ImageObject",
      "url": "https://counselo-legal.com/og-image.png",
      "width": 1200,
      "height": 630,
    },
    "author": {
      "@type": "Organization",
      "@id": COUNSELO_ENTITY_IDS.organization,
      "name": useAr ? provenance.primaryAuthorNameAr : provenance.primaryAuthorName,
      "url": `https://counselo-legal.com${provenance.primaryAuthorUrl}`,
      "logo": {
        "@type": "ImageObject",
        "url": "https://counselo-legal.com/logo.png",
        "width": 512,
        "height": 512,
      },
    },
    "publisher": {
      "@type": "Organization",
      "@id": COUNSELO_ENTITY_IDS.organization,
      "name": "CounselO",
      "url": "https://counselo-legal.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://counselo-legal.com/logo.png",
        "width": 512,
        "height": 512,
      },
    },
    "reviewedBy": {
      "@type": "Person",
      "@id": COUNSELO_ENTITY_IDS.omar,
      "name": useAr ? provenance.legalReviewerNameAr : provenance.legalReviewerName,
      "url": `https://counselo-legal.com${provenance.legalReviewerUrl}`,
    },
    ...(contentType === "legal-guidance" ? {
      "citation": provenance.sources.map((source) => source.href),
      "about": {
        "@type": "LegalService",
        "areaServed": articleRegion === "uae" ? "United Arab Emirates" : articleRegion === "syr" ? "Syria" : "Saudi Arabia",
      },
    } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo-legal.com/" },
      { "@type": "ListItem", "position": 2, "name": isRTL ? "المدونة" : "Blog", "item": "https://counselo-legal.com/blog" },
      { "@type": "ListItem", "position": 3, "name": seoTitle, "item": canonicalArticleUrl },
    ],
  };

  return (
    <div className="counselo-editorial-page legal-article-page w-full bg-background min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={canonicalArticlePath}
        noRegionPrefix
        sharedLanguageAlternates={isBilingual ? {
          en: blogPath(post.slug, "en"),
          ar: blogPath(post.slug, "ar"),
          xDefault: blogPath(post.slug, "en"),
        } : undefined}
        contentLanguage={useAr ? "ar" : "en"}
        keywords={useAr
          ? `${category}, مقالات قانونية, إرشادات قانونية مجانية, كاونسلو, مدونة كاونسلو القانونية, استشارة قانونية أونلاين`
          : `${category}, legal articles, free legal guides, CounselO blog, online legal advice, CounselO`}
        ogType="article"
        articlePublishedTime={post.date}
        articleAuthor={useAr ? "فريق كاونسلو" : "CounselO Team"}
        articleSection={category}
        extraSchemas={[articleSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <section className="premium-page-hero text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors">
              <BackArrow className="h-4 w-4" /> {ui.back}
            </Link>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-white/10 text-[#e0c078] text-xs font-medium px-3 py-1 border border-[#d4af60]/35">
                {category}
              </span>
              <span className="text-white/50 text-xs flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date, useAr ? "ar" : "en")}
              </span>
              <span className="text-white/50 text-xs flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readTime} {ui.minRead}
              </span>
            </div>
            <h1 dir={contentDir} className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4">
              {title}
            </h1>
            <div className="premium-hero-rule mb-6" />
            <p dir={contentDir} className="text-lg text-white/70 leading-relaxed">{excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="premium-content-shell py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article body */}
          <motion.article
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <section className="mb-10 border border-border bg-muted/25 p-5" aria-labelledby="article-provenance-heading">
              <h2 id="article-provenance-heading" className="text-lg font-serif font-bold text-foreground mb-4">
                {contentType === "legal-guidance" ? (useAr ? "بيانات المراجعة والمصادر" : "Review and source information") : (useAr ? "بيانات المقال التحريري" : "Editorial information")}
              </h2>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold text-foreground">{useAr ? "كتب بواسطة" : "Written by"}</dt><dd><a className="text-primary hover:underline" href={provenance.primaryAuthorUrl}>{useAr ? provenance.primaryAuthorNameAr : provenance.primaryAuthorName}</a></dd></div>
                <div><dt className="font-semibold text-foreground">{contentType === "legal-guidance" ? (useAr ? "راجع قانونياً بواسطة" : "Legally reviewed by") : (useAr ? "راجعها" : "Reviewed by")}</dt><dd><a className="text-primary hover:underline" href={provenance.legalReviewerUrl}>{useAr ? provenance.legalReviewerNameAr : provenance.legalReviewerName}</a></dd></div>
                {contentType === "legal-guidance" && provenance.jurisdiction && <div><dt className="font-semibold text-foreground">{useAr ? "الاختصاص" : "Jurisdiction"}</dt><dd>{articleJurisdictionLabel(provenance.jurisdiction, useAr)}</dd></div>}
                <div><dt className="font-semibold text-foreground">{useAr ? "تاريخ النشر" : "Publication date"}</dt><dd>{formatDate(post.date, useAr ? "ar" : "en")}</dd></div>
                <div><dt className="font-semibold text-foreground">{useAr ? (contentType === "legal-guidance" ? "آخر مراجعة جوهرية" : "آخر مراجعة تحريرية") : (contentType === "legal-guidance" ? "Last substantive review" : "Last editorial review")}</dt><dd>{formatDate(provenance.lastSubstantiveReviewAt, useAr ? "ar" : "en")}</dd></div>
                {contentType === "legal-guidance" && <div><dt className="font-semibold text-foreground">{useAr ? "القانون المنطبق" : "Applicable law"}</dt><dd>{useAr ? provenance.applicableLawAr : provenance.applicableLaw}</dd></div>}
              </dl>
              <div className="mt-4 space-y-3 text-sm">
                {contentType === "legal-guidance" && <div><p className="font-semibold text-foreground">{useAr ? "المصادر والاقتباسات" : "Sources and citations"}</p><ul className="list-disc ms-5 mt-1 space-y-1">{provenance.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{useAr ? source.titleAr : source.titleEn}</a></li>)}</ul></div>}
                <p><strong>{useAr ? (contentType === "legal-guidance" ? "ملاحظة قانونية مهمة:" : "طبيعة هذا المقال:") : (contentType === "legal-guidance" ? "Key legal update note:" : "Article basis:")}</strong> {useAr ? provenance.keyLegalUpdateNoteAr : provenance.keyLegalUpdateNote}</p>
                <p><strong>{useAr ? "المنهجية:" : "Methodology:"}</strong> {useAr ? provenance.contentMethodologyAr : provenance.contentMethodology}</p>
                <p className="text-xs text-muted-foreground">{ui.disclaimer}</p>
                <a href={provenance.correctionUrl} className="text-primary hover:underline">{useAr ? "الإبلاغ عن تصحيح أو خطأ" : "Report a correction or factual error"}</a>
              </div>
            </section>
            <div className="legal-article-body prose prose-slate max-w-none tiptap-content" dir={contentDir}>
              {body ? (
                <div dangerouslySetInnerHTML={{ __html: body }} />
              ) : (
                content.map((section, i) => (
                  <div key={i} className="mb-8">
                    {section.heading && (
                      <h2 className="text-xl font-serif font-bold text-foreground mb-3 mt-8 first:mt-0">
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-foreground/80 leading-relaxed text-base">{section.body}</p>
                  </div>
                ))
              )}
            </div>

            {(relatedPosts.length > 0 || relatedWork.length > 0) && (
              <section className="mt-10 border-t border-border pt-8" aria-labelledby="related-content-heading">
                <h2 id="related-content-heading" className="text-2xl font-serif font-bold text-foreground mb-5">
                  {useAr ? "محتوى قانوني ذو صلة" : "Related legal content"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => {
                    const relatedUseAr = Boolean(related.titleAr) && (useAr || !related.titleEn);
                    return (
                      <Link key={related.slug} href={hasQualityBilingualBlogContent(related) ? blogPath(related.slug, useAr ? "ar" : "en") : blogPath(related.slug)} className="border border-border bg-card p-4 hover:border-primary transition-colors">
                        <span className="text-xs uppercase tracking-wider text-primary font-semibold">{useAr ? "مقال" : "Article"}</span>
                        <span className="block font-semibold text-foreground mt-2">{relatedUseAr ? related.titleAr : related.titleEn}</span>
                      </Link>
                    );
                  })}
                  {relatedWork.map((related) => (
                    <Link key={related.slug} href={`${useAr ? "/ar" : ""}/our-work/${related.slug}`} className="border border-border bg-card p-4 hover:border-primary transition-colors">
                      <span className="text-xs uppercase tracking-wider text-primary font-semibold">{useAr ? "من أعمالنا" : "Our Work"}</span>
                      <span className="block font-semibold text-foreground mt-2">{localized(related.titleEn, related.titleAr, useAr ? "ar" : "en")}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10 p-4 bg-muted/50 border border-border text-xs text-muted-foreground leading-relaxed">
              {ui.disclaimer}
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center font-medium" dir="rtl">
              حقوق النشر والملكية محفوظة لكاونسيلو
            </div>
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm">
                <BackArrow className="h-4 w-4" /> {ui.back}
              </Link>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28">
              <div className="bg-primary text-white p-6 mb-6">
                <MessageCircle className="h-6 w-6 text-white/70 mb-3" />
                <h3 className="text-lg font-serif font-bold text-white mb-2">{ui.consultHeading}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">{ui.consultDesc}</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/966594850247"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    data-region={articleRegion}
                    data-lang={useAr ? "ar" : "en"}
                    className="flex items-center justify-center gap-2 bg-[#0d4a31] text-white font-semibold py-2.5 text-sm hover:bg-[#073d2b] transition-colors"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {ui.whatsapp}
                  </a>
                  <Link
                    href={`${articleRegionPrefix}/contact`}
                    data-cta="contact"
                    data-region={articleRegion}
                    data-lang={useAr ? "ar" : "en"}
                    className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-2.5 text-sm hover:bg-white/20 transition-colors"
                  >
                    {ui.consultation}
                  </Link>
                </div>
              </div>

              <div className="border border-border p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
                  {lang === "en" ? "Content information" : "معلومات المحتوى"}
                </p>
                <p className="font-serif font-bold text-foreground">
                  {lang === "en" ? "CounselO Legal Content Team" : "فريق المحتوى القانوني في كاونسلو"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "en"
                    ? `Published ${formatDate(post.date, lang)}${post.updatedAt ? ` · Updated ${formatDate(post.updatedAt, lang)}` : ""}`
                    : `نُشر ${formatDate(post.date, lang)}${post.updatedAt ? ` · حُدّث ${formatDate(post.updatedAt, lang)}` : ""}`}
                </p>
                <Link href={`${articleRegionPrefix}/about`} className="inline-flex mt-3 text-sm font-semibold text-primary hover:underline">
                  {lang === "en" ? "Legal leadership and experience" : "القيادة والخبرة القانونية"}
                </Link>
              </div>

              {(() => {
                const assignedSlug = post.relatedServiceSlugs?.[0];
                const categoryService = BLOG_CATEGORY_TO_SERVICE[post.categoryEn] ?? BLOG_CATEGORY_TO_SERVICE[post.categoryAr];
                const svc = assignedSlug
                  ? {
                      slug: assignedSlug,
                      nameEn: categoryService?.slug === assignedSlug ? categoryService.nameEn : "Related Legal Service",
                      nameAr: categoryService?.slug === assignedSlug ? categoryService.nameAr : "الخدمة القانونية ذات الصلة",
                    }
                  : categoryService;
                if (!svc) return null;
                return (
                  <div className="border border-border p-5 mt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-3">
                      {lang === "en" ? "Related Service" : "الخدمة ذات الصلة"}
                    </p>
                    <Link
                      href={`${articleRegionPrefix}/services/${svc.slug}`}
                      className="font-semibold text-primary hover:underline underline-offset-2 block mb-3"
                      data-cta="service-link"
                      data-region={articleRegion}
                      data-lang={lang}
                    >
                      {lang === "en" ? svc.nameEn : svc.nameAr}
                    </Link>
                    <Link
                      href="/blog"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block mb-2"
                    >
                      {lang === "en" ? "← Back to Blog" : "المدونة ←"}
                    </Link>
                    <Link
                      href={`${articleRegionPrefix}/contact`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      data-cta="contact"
                      data-region={articleRegion}
                      data-lang={lang}
                    >
                      {lang === "en" ? "Book a Consultation →" : "← احجز استشارة"}
                    </Link>
                  </div>
                );
              })()}
            </div>
          </motion.aside>
        </div>
      </section>
      <TrustSignals isArabic={useAr} regionPrefix={articleRegionPrefix} compact />
    </div>
  );
}
