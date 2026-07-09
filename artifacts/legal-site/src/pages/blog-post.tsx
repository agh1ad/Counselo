import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { staticBlogPosts } from "@/data/blog-posts";
import { SYR_BLOG_SLUG_TO_DB_SLUG } from "@/lib/syr-blog-slug-aliases";

interface BlogSection {
  heading?: string;
  body: string;
}

interface ApiPost {
  id: number;
  slug: string;
  date: string;
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();

  // Syria blog posts migrated to Syria-specific slugs. When the URL uses a new
  // Syria slug, look up the original database slug so content loads correctly.
  const dbSlug = (region === "syr" && SYR_BLOG_SLUG_TO_DB_SLUG[slug ?? ""])
    ? SYR_BLOG_SLUG_TO_DB_SLUG[slug!]
    : (slug ?? "");

  const staticPost = staticBlogPosts.find((p) => p.slug === dbSlug);
  const ssrInitialData: ApiPost | undefined = staticPost
    ? {
        id: 0,
        slug: staticPost.slug,
        date: staticPost.date,
        categoryEn: staticPost.category.en,
        categoryAr: staticPost.category.ar,
        readTime: staticPost.readTime,
        titleEn: staticPost.en.title,
        titleAr: staticPost.ar.title,
        excerptEn: staticPost.en.excerpt,
        excerptAr: staticPost.ar.excerpt,
        seoTitleEn: staticPost.en.seoTitle,
        seoTitleAr: staticPost.ar.seoTitle,
        seoDescriptionEn: staticPost.en.seoDescription,
        seoDescriptionAr: staticPost.ar.seoDescription,
        bodyEn: "",
        bodyAr: "",
        contentEn: staticPost.en.content,
        contentAr: staticPost.ar.content,
        published: true,
      }
    : undefined;

  const { data: post, isLoading, isError } = useQuery<ApiPost>({
    queryKey: ["blog-post", dbSlug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/posts/${dbSlug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json() as Promise<ApiPost>;
    },
    initialData: ssrInitialData,
    staleTime: 60_000,
    retry: false,
  });

  const ui = {
    en: {
      back: "Back to Blog",
      minRead: "min read",
      consultHeading: "Need Legal Advice?",
      consultDesc:
        region === "syr"
          ? "CounselO offers confidential online legal consultations via WhatsApp or email — no office visit required. Founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi: 30+ years of legal practice, 20,000+ cases handled."
          : "CounselO offers confidential online legal consultations via WhatsApp or email — no office visit required. Founded and led by Lawyer and Legal Counsel Omar Al-Baghdadi: 30+ years of legal practice, 20,000+ cases handled across Saudi Arabia.",
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
        <Link href={`${regionPrefix}/blog`} className="text-primary font-medium hover:underline">{ui.backBlog}</Link>
      </div>
    );
  }

  // If post has no English content, fall back to Arabic even on English pages
  const hasEnglish = !!(post.titleEn && post.titleEn.trim());
  const useAr = isRTL || !hasEnglish;
  const contentDir = useAr ? "rtl" : "ltr";

  const title = useAr ? post.titleAr : post.titleEn;
  const excerpt = useAr ? post.excerptAr : (post.excerptEn || post.excerptAr);
  const seoTitle = useAr ? (post.seoTitleAr || post.titleAr) : (post.seoTitleEn || post.titleEn || post.seoTitleAr || post.titleAr);
  const seoDesc = useAr ? (post.seoDescriptionAr || post.excerptAr) : (post.seoDescriptionEn || post.excerptEn || post.seoDescriptionAr || post.excerptAr);
  const category = useAr ? post.categoryAr : (post.categoryEn || post.categoryAr);
  const body = useAr ? post.bodyAr : (post.bodyEn || post.bodyAr);
  const content = useAr ? post.contentAr : (post.contentEn?.length ? post.contentEn : post.contentAr);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoTitle,
    "description": seoDesc,
    "datePublished": post.date,
    "dateModified": post.date,
    "image": {
      "@type": "ImageObject",
      "url": "https://counselo-legal.com/og-image.png",
      "width": 1200,
      "height": 630,
    },
    "author": {
      "@type": "Organization",
      "name": "CounselO",
      "url": "https://counselo-legal.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://counselo-legal.com/logo.png",
        "width": 512,
        "height": 512,
      },
    },
    "publisher": {
      "@type": "Organization",
      "name": "CounselO",
      "url": "https://counselo-legal.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://counselo-legal.com/logo.png",
        "width": 512,
        "height": 512,
      },
    },
    "about": { "@type": "LegalService", "areaServed": region === "syr" ? "Syria" : "Saudi Arabia" },
  };

  const regionBase = region === "syr" ? "https://counselo-legal.com/syr" : "https://counselo-legal.com/sa";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo-legal.com/" },
      { "@type": "ListItem", "position": 2, "name": isRTL ? "المدونة" : "Blog", "item": `${regionBase}/blog` },
      { "@type": "ListItem", "position": 3, "name": seoTitle, "item": `${regionBase}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="w-full bg-background min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={`/blog/${post.slug}`}
        keywords={isRTL
          ? region === "syr"
            ? `${category}, مقالات قانونية سورية, إرشادات قانونية مجانية سوريا, كاونسلو, مدونة كاونسلو القانونية, استشارة قانونية أونلاين سوريا`
            : `${category}, مقالات قانونية سعودية, إرشادات قانونية مجانية, كاونسلو, مدونة كاونسلو القانونية`
          : region === "syr"
            ? `${category}, Syrian legal articles, free legal guides Syria, CounselO blog, online legal advice Syria, Syrian law`
            : `${category}, Saudi legal articles, free legal guides Saudi Arabia, CounselO blog, online legal advice KSA`}
        ogType="article"
        articlePublishedTime={post.date}
        articleAuthor={isRTL ? "فريق كاونسلو" : "CounselO Team"}
        articleSection={category}
        extraSchemas={[articleSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href={`${regionPrefix}/blog`} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors">
              <BackArrow className="h-4 w-4" /> {ui.back}
            </Link>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-white/15 text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/20">
                {category}
              </span>
              <span className="text-white/50 text-xs flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date, lang)}
              </span>
              <span className="text-white/50 text-xs flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readTime} {ui.minRead}
              </span>
            </div>
            <h1 dir={contentDir} className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4">
              {title}
            </h1>
            <p dir={contentDir} className="text-lg text-white/70 leading-relaxed">{excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article body */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-slate max-w-none tiptap-content" dir={contentDir}>
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

            <div className="mt-10 p-4 bg-muted/50 border border-border text-xs text-muted-foreground leading-relaxed">
              {ui.disclaimer}
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center font-medium" dir="rtl">
              حقوق النشر والملكية محفوظة لكاونسيلو
            </div>
            <div className="mt-8">
              <Link href={`${regionPrefix}/blog`} className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm">
                <BackArrow className="h-4 w-4" /> {ui.back}
              </Link>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
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
                    href="https://wa.me/966592850247"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 text-sm hover:opacity-90 transition-opacity"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {ui.whatsapp}
                  </a>
                  <Link
                    href={`${regionPrefix}/contact`}
                    className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-2.5 text-sm hover:bg-white/20 transition-colors"
                  >
                    {ui.consultation}
                  </Link>
                </div>
              </div>

              <div className="border border-border p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
                  {lang === "en" ? "Written by" : "بقلم"}
                </p>
                <p className="font-serif font-bold text-foreground">
                  {lang === "en" ? "CounselO Team" : "فريق كاونسلو"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "en"
                    ? "Online Legal Consultations — Saudi Arabia & Syria"
                    : "استشارات قانونية أونلاين — السعودية وسوريا"}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}
