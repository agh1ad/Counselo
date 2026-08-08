import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod";
import { fetchPublicJson } from "@/lib/public-api";
import { blogPath, hasQualityBilingualBlogContent } from "@workspace/api-zod";

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
  seoTitleEn?: string;
  seoTitleAr?: string;
  seoDescriptionEn?: string;
  seoDescriptionAr?: string;
  bodyEn?: string;
  bodyAr?: string;
  contentEn?: Array<{ body?: string }>;
  contentAr?: Array<{ body?: string }>;
  published: boolean;
  relatedServiceSlugs?: string[];
  relatedBlogSlugs?: string[];
  relatedWorkSlugs?: string[];
}

declare global {
  interface Window {
    __SSR_POSTS__?: ApiPost[];
  }
}

function formatDate(dateStr: string, lang: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(lang === "ar" ? "ar-AE" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const { lang, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const articlePath = (post: ApiPost) => hasQualityBilingualBlogContent(post)
    ? blogPath(post.slug, lang === "ar" ? "ar" : "en")
    : blogPath(post.slug);

  const { data: posts = [], isLoading } = useQuery<ApiPost[]>({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPublicJson<ApiPost[]>("/api/blog/posts"),
    // Render the deployment snapshot immediately, but do not let it suppress
    // the live request for posts published after that deployment.
    placeholderData: () =>
      typeof window !== "undefined" ? window.__SSR_POSTS__ : undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: "always",
  });

  const ui = {
    en: {
      eyebrow: "Legal Insights",
      heading: "Articles & Guides",
      subheading: "A shared legal publication covering UAE, Saudi and Syrian law, with jurisdiction clearly identified in every country-specific article — written by CounselO's legal content team.",
      readMore: "Read Article",
      minRead: "min read",
      ctaHeading: "Have a Legal Question?",
      ctaDesc:
        "Our team answers online — via WhatsApp or email. No office visit required.",
      ctaBtn: "Book a Consultation",
      empty: "New articles are coming soon. Check back shortly.",
    },
    ar: {
      eyebrow: "رؤى قانونية",
      heading: "مقالات وأدلة",
      subheading: "منصة قانونية مشتركة تغطي قوانين الإمارات والسعودية وسوريا، مع بيان الاختصاص بوضوح في كل مقال خاص بدولة — من فريق المحتوى القانوني في كاونسلو.",
      readMore: "اقرأ المقال",
      minRead: "د قراءة",
      ctaHeading: "هل لديك سؤال قانوني؟",
      ctaDesc:
        "فريقنا يجيب أونلاين — عبر واتساب أو البريد الإلكتروني. دون الحاجة لزيارة مكتب.",
      ctaBtn: "احجز استشارة",
      empty: "مقالات جديدة قادمة قريباً. تابعنا.",
    },
  }[lang];

  return (
    <div
      className="counselo-editorial-page legal-journal-page w-full bg-background min-h-screen"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <SEOHead
        title={
          isRTL
            ? "رؤى كاونسلو القانونية العالمية | مقالات وأدلة"
            : "Global Legal Insights | Articles & Guides | CounselO"
        }
        description={
          isRTL
            ? "منصة كاونسلو القانونية المشتركة لمقالات وأدلة حول قوانين الإمارات والسعودية وسوريا، مع تحديد الاختصاص القانوني لكل مقال بوضوح."
            : "CounselO's shared publication for legal articles and guides covering UAE, Saudi and Syrian law, with each article's jurisdiction clearly identified."
        }
        canonical="/blog"
        noRegionPrefix
        keywords={
          isRTL
            ? "رؤى قانونية, مقالات قانونية, قانون الإمارات, القانون السعودي, القانون السوري, قانون العمل, القانون التجاري, كاونسلو"
            : "global legal insights, UAE law articles, Saudi law articles, Syrian law articles, employment law, commercial law, CounselO"
        }
        schema={[
          {
            "@context": "https://schema.org",
            "@type": ["CollectionPage", "Blog"],
            "@id": "https://counselo-legal.com/blog#collection",
            name: isRTL ? "رؤى كاونسلو القانونية العالمية" : "CounselO Global Legal Insights",
            description: isRTL
              ? "مقالات وأدلة قانونية مشتركة تغطي قوانين الإمارات والسعودية وسوريا"
              : "A shared legal publication covering UAE, Saudi and Syrian law",
            url: "https://counselo-legal.com/blog",
            publisher: {
              "@type": "Organization",
              "@id": COUNSELO_ENTITY_IDS.organization,
              name: "CounselO",
              alternateName: "كاونسلو",
              url: "https://counselo-legal.com",
            },
            inLanguage: ["ar", "en"],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://counselo-legal.com/blog#item-list",
            name: isRTL ? "مقالات كاونسلو القانونية" : "CounselO legal articles",
            url: "https://counselo-legal.com/blog",
            itemListElement: posts.slice(0, 50).map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: isRTL ? post.titleAr || post.titleEn : post.titleEn || post.titleAr,
              url: `https://counselo-legal.com${articlePath(post)}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: isRTL ? "الرئيسية" : "Home",
                item: "https://counselo-legal.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: isRTL ? "المدونة" : "Blog",
                item: "https://counselo-legal.com/blog",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: isRTL ? "مقالات المدونة القانونية" : "Legal Blog Articles",
            numberOfItems: posts.length,
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: isRTL ? (p.titleAr || p.titleEn) : (p.titleEn || p.titleAr),
              url: `https://counselo-legal.com${articlePath(p)}`,
            })),
          },
        ]}
      />

      {/* Hero */}
      <section className="premium-page-hero py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-[#d4af60]" />
              <span className="text-[#e0c078] text-xs font-semibold uppercase tracking-[0.18em]">
                {ui.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              {ui.heading}
            </h1>
            <div className="premium-hero-rule mx-auto mb-6" />
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {ui.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-border h-72 animate-pulse rounded"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-lg">{ui.empty}</p>
          </div>
        ) : (
          <div>
            {posts.slice(0, 1).map((post) => {
              const hasEnglish = !!(post.titleEn && post.titleEn.trim());
              const hasArabic = !!(post.titleAr && post.titleAr.trim());
              const useAr = hasArabic && (isRTL || !hasEnglish);
              const title = useAr ? post.titleAr : post.titleEn;
              const excerpt = useAr ? post.excerptAr : post.excerptEn;
              const category = useAr ? post.categoryAr : post.categoryEn;
              return (
                <motion.article
                  key={post.slug}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative mb-14 grid min-h-[360px] overflow-hidden border border-[#0d4a31] bg-[#0d4a31] text-white lg:grid-cols-[1.05fr_0.95fr]"
                >
                  <div className="relative z-10 flex flex-col p-8 sm:p-10 lg:p-12">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4b66c]">
                      {isRTL ? "المقال المميز" : "Featured insight"} · {category}
                    </p>
                    <h2 dir={useAr ? "rtl" : "ltr"} className="mb-5 max-w-2xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                      {title}
                    </h2>
                    <p dir={useAr ? "rtl" : "ltr"} className="mb-8 max-w-xl text-base leading-relaxed text-white/65">
                      {excerpt}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-6 text-xs text-white/55">
                      <span>{formatDate(post.date, lang)}</span>
                      <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {post.readTime} {ui.minRead}</span>
                      <Link href={articlePath(post)} className="inline-flex items-center gap-2 border-b border-[#d4b66c] pb-1 font-semibold text-white">
                        {ui.readMore}<ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                  </div>
                  <div className="relative min-h-56 overflow-hidden border-t border-white/15 bg-white lg:border-s lg:border-t-0">
                    <img src="/images/optimized/counselo-platform-line-art-v1.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(248,246,240,0.3))]" />
                  </div>
                </motion.article>
              );
            })}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.slice(1).map((post, i) => {
                const hasEnglish = Boolean(post.titleEn?.trim());
                const hasArabic = Boolean(post.titleAr?.trim());
                const useAr = hasArabic && (isRTL || !hasEnglish);
                const title = useAr ? post.titleAr : post.titleEn;
                const category = useAr ? post.categoryAr : post.categoryEn;
                const excerpt = useAr ? post.excerptAr : post.excerptEn;
                return (
                  <motion.article key={post.slug} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.18) }}
                    className="group flex min-h-80 flex-col border border-[#0d4a31]/15 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#b58b32] hover:shadow-[0_18px_45px_rgba(0,61,34,0.09)]">
                    <div className="mb-7 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center border border-[#0d4a31]/18 bg-[#eef4f0] text-[#0d4a31]">
                        <BookOpen className="h-6 w-6" strokeWidth={1.4} />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7735]">{category}</span>
                    </div>
                    <h2 dir={useAr ? "rtl" : "ltr"} className="mb-4 font-serif text-xl font-semibold leading-snug text-[#0d4a31] transition-colors group-hover:text-[#aa7e28]">{title}</h2>
                    <p dir={useAr ? "rtl" : "ltr"} className="mb-7 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#0d4a31]/12 pt-5 text-xs text-muted-foreground">
                      <span>{formatDate(post.date, lang)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime} {ui.minRead}</span>
                    </div>
                    <Link href={articlePath(post)} className="mt-5 inline-flex items-center justify-between text-sm font-semibold text-primary">
                      {ui.readMore}<ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
            {ui.ctaHeading}
          </h2>
          <p className="text-muted-foreground mb-6">{ui.ctaDesc}</p>
          <Link href={`${regionPrefix}/contact`}>
            <button className="bg-primary text-white font-semibold px-8 py-3 hover:bg-primary/90 transition-colors">
              {ui.ctaBtn}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
