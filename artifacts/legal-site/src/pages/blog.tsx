import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { SYR_DB_SLUG_TO_NEW_SLUG } from "@/lib/syr-blog-slug-aliases";

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

export default function Blog() {
  const { lang, isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();

  const { data: posts = [], isLoading } = useQuery<ApiPost[]>({
    queryKey: ["blog-posts", region],
    queryFn: async () => {
      const res = await fetch("/api/blog/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json() as Promise<ApiPost[]>;
    },
    staleTime: 60_000,
  });

  const country = region === "syr" ? "Syrian" : "Saudi";
  const countryAr = region === "syr" ? "السورية" : "السعودية";

  const ui = {
    en: {
      eyebrow: "Legal Insights",
      heading: "Articles & Guides",
      subheading:
        `Practical legal guidance on ${country} family law, employment, real estate, business, foreign investment, and administrative law — written by the team of Lawyer and Legal Counsel Omar Al-Baghdadi.`,
      readMore: "Read Article",
      minRead: "min read",
      ctaHeading: "Have a Legal Question?",
      ctaDesc: "Our team answers online — via WhatsApp or email. No office visit required.",
      ctaBtn: "Book a Consultation",
      empty: "New articles are coming soon. Check back shortly.",
    },
    ar: {
      eyebrow: "رؤى قانونية",
      heading: "مقالات وأدلة",
      subheading:
        `إرشادات قانونية عملية في قانون الأسرة ${countryAr} والعمل والعقارات والأعمال والاستثمار الأجنبي والقانون الإداري — من فريق المحامي والمستشار القانوني عمر البغدادي.`,
      readMore: "اقرأ المقال",
      minRead: "د قراءة",
      ctaHeading: "هل لديك سؤال قانوني؟",
      ctaDesc: "فريقنا يجيب أونلاين — عبر واتساب أو البريد الإلكتروني. دون الحاجة لزيارة مكتب.",
      ctaBtn: "احجز استشارة",
      empty: "مقالات جديدة قادمة قريباً. تابعنا.",
    },
  }[lang];

  const categoryColors: Record<string, string> = {
    "Family Law": "bg-rose-50 text-rose-700 border-rose-200",
    "قانون الأسرة": "bg-rose-50 text-rose-700 border-rose-200",
    "Employment Law": "bg-blue-50 text-blue-700 border-blue-200",
    "قانون العمل": "bg-blue-50 text-blue-700 border-blue-200",
    "Foreign Investment": "bg-amber-50 text-amber-700 border-amber-200",
    "الاستثمار الأجنبي": "bg-amber-50 text-amber-700 border-amber-200",
    "Administrative Law": "bg-purple-50 text-purple-700 border-purple-200",
    "القانون الإداري": "bg-purple-50 text-purple-700 border-purple-200",
    "Real Estate Law": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "قانون العقارات": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Business Law": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "القانون التجاري": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <div className="w-full bg-background min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={isRTL
          ? `مدونة قانونية ${countryAr} | مقالات وإرشادات قانونية مجانية | قانوني`
          : `${country} Legal Blog | Free Legal Guides & Articles | CounselO`}
        description={isRTL
          ? `إرشادات قانونية مجانية وعملية في قانون الأسرة ${countryAr} وقانون العمل والعقارات والقانون التجاري والاستثمار الأجنبي والقانون الإداري — مقالات معمّقة بقلم فريق قانوني.`
          : `Free practical legal guides on ${country} family law, employment law, real estate, commercial law, foreign investment, and administrative law — in-depth articles from CounselO's expert legal team.`}
        canonical="/blog"
        keywords={isRTL
          ? `مدونة قانونية ${countryAr}, مقالات قانونية, إرشادات قانونية مجانية, قانون الأسرة ${countryAr}, قانون العمل ${countryAr}, القانون العقاري, القانون التجاري, الاستثمار الأجنبي, القانون الإداري, قانوني`
          : `${country} legal blog, free legal guides ${country === "Syrian" ? "Syria" : "Saudi Arabia"}, family law articles, employment law, real estate law guide, commercial law, foreign investment guide, administrative law, CounselO blog`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": isRTL ? "مدونة كاونسلو القانونية" : "CounselO Legal Blog",
            "description": isRTL
              ? `إرشادات قانونية معمّقة للأفراد والشركات في ${region === "syr" ? "سوريا" : "المملكة العربية السعودية"}`
              : `In-depth legal guides for individuals and businesses in ${region === "syr" ? "Syria" : "Saudi Arabia"}`,
            "url": `https://counselo-legal.com${region === "syr" ? "/syr" : "/sa"}${isRTL ? "/ar" : ""}/blog`,
            "publisher": { "@type": "Organization", "name": "CounselO", "url": "https://counselo-legal.com" },
            "inLanguage": [isRTL ? (region === "syr" ? "ar-SY" : "ar-SA") : (region === "syr" ? "en-SY" : "en-SA")],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": "https://counselo-legal.com/" },
              { "@type": "ListItem", "position": 2, "name": isRTL ? "المدونة" : "Blog", "item": `https://counselo-legal.com${region === "syr" ? "/syr" : "/sa"}${isRTL ? "/ar" : ""}/blog` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": isRTL ? "مقالات المدونة القانونية" : "Legal Blog Articles",
            "numberOfItems": posts.length,
            "itemListElement": posts.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": isRTL ? p.titleAr : p.titleEn,
              "url": `https://counselo-legal.com${region === "syr" ? "/syr" : "/sa"}${isRTL ? "/ar" : ""}/blog/${p.slug}`,
            })),
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-white/60" />
              <span className="text-white/60 text-sm font-medium uppercase tracking-widest">{ui.eyebrow}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              {ui.heading}
            </h1>
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
              <div key={i} className="bg-white border border-border h-72 animate-pulse rounded" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-lg">{ui.empty}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => {
              const hasEnglish = !!(post.titleEn && post.titleEn.trim());
              const useAr = isRTL || !hasEnglish;
              const title = useAr ? post.titleAr : post.titleEn;
              const excerpt = useAr ? post.excerptAr : (post.excerptEn || post.excerptAr);
              const category = useAr ? post.categoryAr : (post.categoryEn || post.categoryAr);
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-white border border-border flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-1 bg-primary w-full" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className={`text-xs font-medium px-2.5 py-1 border rounded-full ${categoryColors[category] ?? "bg-muted text-muted-foreground border-border"}`}>
                        {category}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime} {ui.minRead}
                      </span>
                    </div>
                    <h2 dir={useAr ? "rtl" : "ltr"} className="text-lg font-serif font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    <p dir={useAr ? "rtl" : "ltr"} className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">{formatDate(post.date, lang)}</span>
                      <Link
                        href={`${regionPrefix}/blog/${post.slug}`}
                        className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all"
                      >
                        {ui.readMore}
                        <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">{ui.ctaHeading}</h2>
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
