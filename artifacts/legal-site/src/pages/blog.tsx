import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { blogPosts, formatDate } from "@/data/blog-posts";

export default function Blog() {
  const { lang, isRTL } = useLanguage();

  const ui = {
    en: {
      eyebrow: "Legal Insights",
      heading: "Articles & Guides",
      subheading:
        "Practical legal guidance on Saudi family law, employment, real estate, business, foreign investment, and administrative law — written by the team of Lawyer Omar Al-Baghdadi.",
      readMore: "Read Article",
      minRead: "min read",
      ctaHeading: "Have a Legal Question?",
      ctaDesc:
        "Our team answers online — via WhatsApp or email. No office visit required.",
      ctaBtn: "Book a Consultation",
    },
    ar: {
      eyebrow: "رؤى قانونية",
      heading: "مقالات وأدلة",
      subheading:
        "إرشادات قانونية عملية في قانون الأسرة السعودي والعمل والعقارات والأعمال والاستثمار الأجنبي والقانون الإداري — من فريق المحامي عمر البغدادي.",
      readMore: "اقرأ المقال",
      minRead: "د قراءة",
      ctaHeading: "هل لديك سؤال قانوني؟",
      ctaDesc: "فريقنا يجيب أونلاين — عبر واتساب أو البريد الإلكتروني. دون الحاجة لزيارة مكتب.",
      ctaBtn: "احجز استشارة",
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
  };

  return (
    <div className="w-full bg-background min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title="Saudi Arabian Law Blog | Legal Articles & Guides | Adlix"
        description="Practical legal guides on Saudi family law, employment law, real estate, foreign investment, and administrative law. Written by Lawyer Omar Al-Baghdadi's team — 30+ years of Saudi legal experience."
        canonical="/blog"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => {
            const data = post[lang];
            const category = post.category[lang];
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white border border-border flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                {/* Category colour bar */}
                <div className="h-1 bg-primary w-full" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className={`text-xs font-medium px-2.5 py-1 border rounded-full ${categoryColors[category] ?? "bg-muted text-muted-foreground border-border"}`}>
                      {category}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime} {ui.minRead}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-serif font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {data.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {data.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">{formatDate(post.date, lang)}</span>
                    <Link
                      href={`/blog/${post.slug}`}
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
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">{ui.ctaHeading}</h2>
          <p className="text-muted-foreground mb-6">{ui.ctaDesc}</p>
          <Link href="/contact">
            <button className="bg-primary text-white font-semibold px-8 py-3 hover:bg-primary/90 transition-colors">
              {ui.ctaBtn}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
