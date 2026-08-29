import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import * as m from "framer-motion/m";
import { Link } from "wouter";
import { ArrowRight, BookOpen, BriefcaseBusiness, FileCheck2, Scale } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { fetchPublicJson } from "@/lib/public-api";
import { type WorkSamplePublic, localized } from "@/lib/work-samples";
import { blogPath, COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";

type LibraryPost = NonNullable<Window["__SSR_POSTS__"]>[number];

const JURISDICTIONS = [
  { key: "sa", en: "Saudi Arabia", ar: "المملكة العربية السعودية", path: "/sa" },
  { key: "syr", en: "Syria", ar: "سوريا", path: "/syr" },
  { key: "uae", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة", path: "/uae" },
] as const;

const Arrow = ({ rtl = false }: { rtl?: boolean }) => (
  <ArrowRight className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${rtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
);

export default function LegalLibrary() {
  const { lang, isRTL } = useLanguage();
  const { regionPrefix } = useRegion();
  const ar = lang === "ar";
  const libraryPath = ar ? "/ar/legal-library" : "/legal-library";
  const blogIndexPath = ar ? "/blog/ar" : "/blog";
  const workIndexPath = ar ? "/ar/our-work" : "/our-work";

  const { data: posts = [] } = useQuery<LibraryPost[]>({
    queryKey: ["blog-posts"],
    queryFn: () => fetchPublicJson<LibraryPost[]>("/api/blog/posts/discovery"),
    placeholderData: () => typeof window !== "undefined" ? window.__SSR_POSTS__ : undefined,
    staleTime: 0,
    refetchOnMount: "always",
  });
  const { data: samples = [] } = useQuery<WorkSamplePublic[]>({
    queryKey: ["work-samples"],
    queryFn: () => fetchPublicJson<WorkSamplePublic[]>("/api/work"),
    placeholderData: () => typeof window !== "undefined" ? window.__SSR_WORK_SAMPLES__ : undefined,
    staleTime: 0,
    refetchOnMount: "always",
  });

  const visiblePosts = useMemo(
    () => posts
      .filter((post) => post.published !== false && (ar ? post.titleAr && post.excerptAr : post.titleEn && post.excerptEn))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    [ar, posts],
  );
  const visibleSamples = useMemo(
    () => samples
      .filter((sample) => sample.published !== false && (ar ? sample.titleAr : sample.titleEn))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    [ar, samples],
  );
  const recentPosts = visiblePosts.slice(0, 3);
  const recentSamples = visibleSamples.slice(0, 4);

  const ui = ar ? {
    title: "معرفة قانونية منظّمة لقرارات عملية.",
    intro: "استكشف تحليلات قانونية مستقلة بالعربية والإنجليزية، ومراجع خضعت للمراجعة، وأعمالاً منقحة من كاونسلو تغطي السعودية وسوريا والإمارات.",
    browseArticles: "تصفح التحليلات القانونية",
    examineWork: "استعرض أعمالنا",
    articles: "المقالات والتحليلات القانونية",
    articlesText: "تحليل قانوني مستقل وإرشادات عملية حول التطورات المؤثرة في أعمالك والتزاماتك.",
    work: "نماذج من الأعمال القانونية",
    workText: "نماذج منقحة من الاتفاقيات والمذكرات والمستندات التي أعدها فريق كاونسلو.",
    jurisdictions: "تصفح حسب الاختصاص",
    latestArticles: "أحدث التحليلات القانونية",
    selectedWork: "أعمال قانونية مختارة",
    viewArticle: "قراءة المقال",
    viewWork: "استعراض العمل",
    viewAllArticles: "جميع المقالات",
    viewAllWork: "جميع الأعمال",
    methodology: "معيار نشر مبني على الثقة",
    methodologyText: "يحدد كل مورد لغته واختصاصه أو سياقه المهني ومؤلفه ومراجعه. ولا تُنشر أعمال العملاء إلا بعد تنقيحها وحماية الهوية.",
    principles: ["محتوى عربي وإنجليزي مستقل", "تحديد المؤلف والمراجعة القانونية", "أعمال منقحة مع حماية السرية"],
    ctaTitle: "هل تحتاج إلى تطبيق القانون على مسألتك؟",
    ctaText: "استخدم المكتبة لفهم الموضوع، ثم تحدث مع كاونسلو حول الوقائع والنطاق والخطوة التالية.",
    cta: "ابدأ استشارة",
  } : {
    title: "Legal knowledge, organised for practical decisions.",
    intro: "Explore independently written Arabic and English legal analysis, reviewed guidance, and redacted work from CounselO across Saudi Arabia, Syria and the UAE.",
    browseArticles: "Browse legal analysis",
    examineWork: "Examine our work",
    articles: "Legal Articles & Analysis",
    articlesText: "Independent legal analysis and practical guidance on developments that affect your business and obligations.",
    work: "Selected Legal Work",
    workText: "Redacted examples of agreements, memoranda, notices, and documents prepared by CounselO.",
    jurisdictions: "Browse by jurisdiction",
    latestArticles: "Latest legal analysis",
    selectedWork: "Selected legal work",
    viewArticle: "Read article",
    viewWork: "Examine work",
    viewAllArticles: "View all articles",
    viewAllWork: "View all work",
    methodology: "A publishing standard built for trust",
    methodologyText: "Each resource identifies its language, jurisdiction or professional context, author and reviewer. Client work is published only after redaction and identity protection.",
    principles: ["Independent Arabic and English content", "Named authorship and legal review", "Redacted work, confidentiality protected"],
    ctaTitle: "Need help applying the law to your matter?",
    ctaText: "Use the library to understand the issue, then speak with CounselO about the facts, scope, and next step.",
    cta: "Start a consultation",
  };

  const collectionItems = [
    ...recentPosts.map((post) => ({
      name: ar ? post.titleAr : post.titleEn,
      url: `https://counselo-legal.com${blogPath(post.slug, lang)}`,
    })),
    ...recentSamples.map((sample) => ({
      name: localized(sample.titleEn, sample.titleAr, lang),
      url: `https://counselo-legal.com${ar ? "/ar" : ""}/our-work/${sample.slug}`,
    })),
  ];
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `https://counselo-legal.com${libraryPath}#webpage`,
      name: ar ? "مكتبة كاونسلو القانونية" : "CounselO Legal Library",
      description: ui.intro,
      url: `https://counselo-legal.com${libraryPath}`,
      inLanguage: lang,
      isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
      about: { "@id": COUNSELO_ENTITY_IDS.organization },
      hasPart: [
        { "@type": "CollectionPage", name: ui.articles, url: `https://counselo-legal.com${blogIndexPath}` },
        { "@type": "CollectionPage", name: ui.work, url: `https://counselo-legal.com${workIndexPath}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: collectionItems.length,
      itemListElement: collectionItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ar ? "الرئيسية" : "Home", item: `https://counselo-legal.com${ar ? "/ar" : "/"}` },
        { "@type": "ListItem", position: 2, name: ar ? "المكتبة القانونية" : "Legal Library", item: `https://counselo-legal.com${libraryPath}` },
      ],
    },
  ];

  return (
    <div className="legal-library-page min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={ar ? "مكتبة كاونسلو القانونية | مقالات ونماذج أعمال قانونية" : "CounselO Legal Library | Articles, Analysis & Work Samples"}
        description={ar ? "استكشف مكتبة كاونسلو القانونية ثنائية اللغة: مقالات وتحليلات قانونية ونماذج أعمال منقحة تغطي السعودية وسوريا والإمارات." : "Explore the bilingual CounselO Legal Library: reviewed legal articles, practical analysis, and redacted work samples covering Saudi Arabia, Syria and the UAE."}
        canonical={libraryPath}
        noRegionPrefix
        sharedLanguageAlternates={{ en: "/legal-library", ar: "/ar/legal-library" }}
        contentLanguage={lang}
        keywords={ar ? "مكتبة قانونية, مقالات قانونية, نماذج أعمال قانونية, أبحاث قانونية, كاونسلو" : "legal library, legal articles, legal research, redacted legal work samples, CounselO"}
        schema={schemas}
      />

      <div>
        <section className="border-b border-[#c9a254]/45 bg-white">
          <div className="mx-auto grid min-h-[650px] max-w-[1440px] lg:grid-cols-[1.02fr_.98fr]">
            <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-20">
              <h1 className="max-w-3xl font-serif text-[clamp(3.1rem,5.2vw,5.7rem)] font-medium leading-[.98] tracking-[-.045em] text-[#073d2a]">{ui.title}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#25312d] md:text-xl">{ui.intro}</p>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-10">
                <Link href={blogIndexPath} className="group inline-flex min-h-14 items-center gap-5 bg-[#073d2a] px-7 font-semibold text-white transition-colors hover:bg-[#0d563a]">
                  {ui.browseArticles}<Arrow rtl={ar} />
                </Link>
                <Link href={workIndexPath} className="group inline-flex items-center gap-5 border-b border-[#b88b2f] py-2 font-semibold text-[#073d2a]">
                  {ui.examineWork}<Arrow rtl={ar} />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden bg-[#0d4a31] lg:min-h-full">
              <img src="/images/legal-library-index.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-center" width="1536" height="1024" fetchPriority="high" />
            </div>
          </div>
        </section>

        <section aria-label={ar ? "أقسام المكتبة" : "Library collections"} className="border-b border-[#d8c7a2] bg-white">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
            {[
              { icon: BookOpen, title: ui.articles, text: ui.articlesText, href: blogIndexPath },
              { icon: BriefcaseBusiness, title: ui.work, text: ui.workText, href: workIndexPath },
            ].map(({ icon: Icon, title, text, href }, index) => (
              <Link key={title} href={href} className={`group grid grid-cols-[auto_1fr_auto] gap-6 px-5 py-10 transition-colors hover:bg-[#f2f6f3] sm:px-8 lg:px-12 ${index === 0 ? "border-b border-[#d8c7a2] lg:border-b-0 lg:border-e" : ""}`}>
                <Icon className="mt-1 h-8 w-8 text-[#b1842a]" strokeWidth={1.4} />
                <div><h2 className="font-serif text-2xl font-semibold text-[#073d2a] md:text-3xl">{title}</h2><p className="mt-3 max-w-xl leading-7 text-[#52605a]">{text}</p></div>
                <Arrow rtl={ar} />
              </Link>
            ))}
          </div>
        </section>

        <section id="jurisdictions" aria-labelledby="jurisdiction-heading" className="border-b border-[#d8c7a2] bg-[#eef4f0]">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[.72fr_2.28fr]">
            <h2 id="jurisdiction-heading" className="flex items-center px-5 py-7 text-sm font-bold uppercase tracking-[.16em] text-[#8c681f] sm:px-8 lg:border-e lg:px-12">{ui.jurisdictions}</h2>
            <div className="grid sm:grid-cols-3">
              {JURISDICTIONS.map((item) => (
                <Link key={item.key} href={`${item.path}${ar ? "/ar" : ""}`} className="group flex items-center justify-between border-t border-[#d8c7a2] px-5 py-7 font-semibold text-[#073d2a] hover:bg-white sm:border-s sm:border-t-0 sm:px-7">
                  <span>{ar ? item.ar : item.en}</span><Arrow rtl={ar} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {recentPosts.length > 0 ? (
          <section id="latest-analysis" className="scroll-mt-28 bg-white px-5 py-20 sm:px-8 lg:py-24 lg:pl-12 lg:pr-40 xl:px-12">
            <div className="mx-auto max-w-[1260px]">
              <div className="mb-12 flex items-center gap-7">
                <h2 className="shrink-0 font-serif text-4xl font-medium tracking-[-.03em] text-[#10251e] md:text-5xl">{ui.latestArticles}</h2>
                <span className="hidden h-px flex-1 bg-[#c7a45d] sm:block" />
                <Link href={blogIndexPath} className="group hidden shrink-0 items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a] sm:inline-flex">{ui.viewAllArticles}<Arrow rtl={ar} /></Link>
              </div>
              <div className="grid lg:grid-cols-[1fr_1.25fr]">
                {recentPosts[0] ? (
                  <m.article initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-b border-[#c7a45d] pb-10 lg:border-b-0 lg:border-e lg:pe-12">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-[#9a711f]">{ar ? recentPosts[0].categoryAr : recentPosts[0].categoryEn}<span className="mx-3 text-[#8a918d]">|</span><time>{recentPosts[0].date}</time></p>
                    <h3 className="mt-6 font-serif text-3xl font-medium leading-[1.12] text-[#10251e] md:text-5xl">{ar ? recentPosts[0].titleAr : recentPosts[0].titleEn}</h3>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#52605a]">{ar ? recentPosts[0].excerptAr : recentPosts[0].excerptEn}</p>
                    <Link href={blogPath(recentPosts[0].slug, lang)} className="group mt-7 inline-flex items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a]">{ui.viewArticle}<Arrow rtl={ar} /></Link>
                  </m.article>
                ) : null}
                <div className="lg:ps-10">
                  {recentPosts.slice(1).map((post, index) => (
                    <m.article key={post.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="border-b border-[#c7a45d] py-9 first:pt-9 lg:first:pt-0">
                      <p className="text-xs font-bold uppercase tracking-[.12em] text-[#9a711f]">{ar ? post.categoryAr : post.categoryEn}<span className="mx-3 text-[#8a918d]">|</span><time>{post.date}</time></p>
                      <h3 className="mt-4 font-serif text-2xl font-medium leading-tight text-[#10251e] md:text-3xl">{ar ? post.titleAr : post.titleEn}</h3>
                      <p className="mt-3 line-clamp-2 leading-7 text-[#52605a]">{ar ? post.excerptAr : post.excerptEn}</p>
                      <Link href={blogPath(post.slug, lang)} className="group mt-5 inline-flex items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a]">{ui.viewArticle}<Arrow rtl={ar} /></Link>
                    </m.article>
                  ))}
                </div>
              </div>
              <Link href={blogIndexPath} className="group mt-8 inline-flex items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a] sm:hidden">{ui.viewAllArticles}<Arrow rtl={ar} /></Link>
            </div>
          </section>
        ) : null}

        {recentSamples.length > 0 ? (
          <section id="selected-work" className="scroll-mt-28 border-y border-[#d8c7a2] bg-[#eef4f0] px-5 py-20 sm:px-8 lg:py-24 lg:pl-12 lg:pr-40 xl:px-12">
            <div className="mx-auto max-w-[1260px]">
              <div className="mb-8 flex items-center gap-7">
                <h2 className="shrink-0 font-serif text-4xl font-medium tracking-[-.03em] text-[#10251e] md:text-5xl">{ui.selectedWork}</h2>
                <span className="hidden h-px flex-1 bg-[#c7a45d] sm:block" />
                <Link href={workIndexPath} className="group hidden shrink-0 items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a] sm:inline-flex">{ui.viewAllWork}<Arrow rtl={ar} /></Link>
              </div>
              <div className="border-t border-[#c7a45d]">
                {recentSamples.map((sample, index) => (
                  <m.article key={sample.slug} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-5 border-b border-[#c7a45d] py-8 md:grid-cols-[90px_1.35fr_1fr_auto] md:items-center">
                    <span className="font-serif text-5xl font-medium text-[#0d4a31]">{String(index + 1).padStart(2, "0")}</span>
                    <div className="md:border-s md:border-[#c7a45d] md:ps-9">
                      <p className="text-xs font-bold uppercase tracking-[.12em] text-[#9a711f]">{localized(sample.workTypeEn, sample.workTypeAr, lang)}<span className="mx-3 text-[#8a918d]">|</span>{localized(sample.jurisdictionEn, sample.jurisdictionAr, lang)}</p>
                      <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-[#10251e]">{localized(sample.titleEn, sample.titleAr, lang)}</h3>
                    </div>
                    <p className="line-clamp-3 leading-7 text-[#52605a]">{localized(sample.summaryEn, sample.summaryAr, lang)}</p>
                    <Link href={`${ar ? "/ar" : ""}/our-work/${sample.slug}`} className="group inline-flex w-fit items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a]">{ui.viewWork}<Arrow rtl={ar} /></Link>
                  </m.article>
                ))}
              </div>
              <Link href={workIndexPath} className="group mt-8 inline-flex items-center gap-4 border-b border-[#073d2a] pb-1 font-medium text-[#073d2a] sm:hidden">{ui.viewAllWork}<Arrow rtl={ar} /></Link>
            </div>
          </section>
        ) : null}

        <section id="publishing-standard" className="scroll-mt-28 bg-white px-5 py-20 sm:px-8 lg:py-24 lg:pl-12 lg:pr-40 xl:px-12">
          <div className="mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <div>
              <Scale className="mb-7 h-8 w-8 text-[#b1842a]" strokeWidth={1.4} />
              <h2 className="max-w-lg font-serif text-4xl font-medium leading-[1.05] tracking-[-.035em] text-[#073d2a] md:text-6xl">{ui.methodology}</h2>
              <div className="mt-7 h-0.5 w-20 bg-[#c79938]" />
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#52605a]">{ui.methodologyText}</p>
            </div>
            <ol className="border-t border-[#c7a45d]">
              {ui.principles.map((principle, index) => (
                <li key={principle} className="grid grid-cols-[72px_1fr] items-center border-b border-[#c7a45d] py-7 sm:grid-cols-[110px_1fr]">
                  <span className="font-serif text-4xl text-[#c18f25] sm:text-5xl">{String(index + 1).padStart(2, "0")}</span>
                  <strong className="border-s border-[#c7a45d] py-3 ps-7 text-lg text-[#073d2a] sm:text-xl">{principle}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-[#c69a40] bg-[#0d4a31] px-5 py-16 text-white sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1260px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <h2 className="max-w-2xl font-serif text-4xl font-medium leading-tight md:text-5xl">{ui.ctaTitle}</h2>
            <div className="border-s border-[#c69a40] ps-7 lg:ps-12">
              <p className="max-w-xl text-lg leading-8 text-white/78">{ui.ctaText}</p>
              <Link href={`${regionPrefix}/contact`} className="group mt-7 inline-flex min-h-14 items-center gap-5 border border-[#d2aa5a] px-7 font-semibold text-white hover:bg-white/10">{ui.cta}<Arrow rtl={ar} /></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
