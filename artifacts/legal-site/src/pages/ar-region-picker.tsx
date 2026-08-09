import { motion } from "framer-motion";
import { Link } from "wouter";
import { COUNSELO_ENTITY_IDS, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE, getConsultationProduct, OMAR_AL_BAGHDADI } from "@workspace/api-zod";
import { Helmet } from "react-helmet-async";
import { Globe, Clock, Lock, ArrowLeft, MessageCircle, CheckCircle2, Award } from "lucide-react";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { useEffect } from "react";
import { COUNSELO_LEGAL_MATTERS_CLAIM, COUNSELO_LEGAL_MATTERS_STAT, COUNSELO_LEGAL_PRACTICE_CLAIM } from "@/lib/public-claims";

const counseloLogo = "/images/optimized/counselo-region-logo.png";
const saudiFlag = "/images/optimized/saudi-arabia-flag.jpg";
const syrianFlag = "/images/optimized/syria-flag.jpg";
const uaeFlag = "/images/optimized/uae-flag.svg";
const comprehensiveConsultation = getConsultationProduct("comprehensive-consultation");

// ── Structured Data ───────────────────────────────────────────────────────────

const websiteSchema = {
  ...COUNSELO_WEBSITE,
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CounselO",
  "alternateName": "كاونسلو",
  "url": "https://counselo-legal.com/",
  "description": "كاونسلو منصة قانونية إلكترونية ثنائية اللغة للاستشارات القانونية السريعة والمهنية والموثوقة ومراجعة المستندات والإرشاد المنظم في الإمارات والسعودية وسوريا، مع وقت استجابة مستهدف خلال 24 ساعة.",
  "publisher": { "@id": COUNSELO_ENTITY_IDS.organization },
};

const organizationSchema = {
  ...COUNSELO_ORGANIZATION,
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://counselo-legal.com",
  "logo": "https://counselo-legal.com/logo.png",
  "description": "كاونسلو منصة قانونية إلكترونية ثنائية اللغة للاستشارات القانونية السريعة والمهنية والموثوقة، يقودها المحامي والمستشار القانوني عمر البغدادي، وتقدم إرشاداً محدد الاختصاص في الإمارات والسعودية وسوريا.",
  "founder": {
    ...OMAR_AL_BAGHDADI,
    "jobTitle": "محامٍ ومستشار قانوني",
    "description": `يمتلك المحامي عمر البغدادي ${COUNSELO_LEGAL_PRACTICE_CLAIM.ar} وتعامل مع ${COUNSELO_LEGAL_MATTERS_CLAIM.ar} في المنطقة.`,
    "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  },
  "areaServed": [
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "Country", "name": "Syria" },
  ],
  "availableLanguage": ["Arabic", "English"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966594850247",
    "contactType": "customer service",
    "areaServed": ["SA", "SY"],
    "availableLanguage": ["Arabic", "English"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما هو كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": `كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي والمستشار القانوني عمر البغدادي بـ${COUNSELO_LEGAL_PRACTICE_CLAIM.ar} و${COUNSELO_LEGAL_MATTERS_CLAIM.ar}. نقدم إرشاداً قانونياً محدد الاختصاص في الإمارات والسعودية وسوريا بالعربية والإنجليزية.` },
    },
    {
      "@type": "Question",
      "name": "ما الدول التي يخدمها كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نقدم خدمات قانونية خاصة بالإمارات العربية المتحدة والمملكة العربية السعودية وسوريا، مع مراعاة القانون والجهات والإجراءات المنطبقة في كل دولة." },
    },
    {
      "@type": "Question",
      "name": "كم يستغرق الرد على استفساري القانوني؟",
      "acceptedAnswer": { "@type": "Answer", "text": "تستهدف كاونسلو تقديم رد مهني خلال 24 ساعة، بحسب نطاق المسألة ودرجة الاستعجال واكتمال المعلومات وتوفر الخدمة." },
    },
    {
      "@type": "Question",
      "name": "هل الاستشارات القانونية على كاونسلو سرية؟",
      "acceptedAnswer": { "@type": "Answer", "text": "تُعامل المعلومات بسرية وفق الالتزامات المهنية والتعاقدية وواجبات الخصوصية وحماية البيانات المنطبقة، مع مراعاة الإفصاحات التي يوجبها القانون أو يسمح بها." },
    },
    {
      "@type": "Question",
      "name": "ما اللغات المتاحة في كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يقدم كاونسلو استشاراته بالعربية والإنجليزية. صفحات الخدمات متاحة باللغتين، ويُنشر كل مقال باللغة المختارة له." },
    },
    {
      "@type": "Question",
      "name": "ما مجالات القانون التي يغطيها كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يغطي كاونسلو: قانون الأسرة والطلاق، قانون العمل، القانون العقاري، القانون التجاري، الاستثمار الأجنبي، القانون الجنائي، القانون الإداري، العقود، البنوك والتمويل، الملكية الفكرية، الضرائب والزكاة، قانون الإنترنت والتقنية، الأخطاء الطبية، قانون التأمين، التحكيم والوساطة، وقانون الشركات." },
    },
    {
      "@type": "Question",
      "name": "كيف أبدأ استشارتي مع كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "الأمر بسيط: (1) اختر الإمارات أو السعودية أو سوريا. (2) تصفح الخدمة المناسبة أو تواصل معنا مباشرة. (3) أرسل سؤالك عبر النموذج أو واتساب. نستهدف الرد خلال 24 ساعة بحسب نطاق المسألة ودرجة استعجالها." },
    },
    {
      "@type": "Question",
      "name": "هل يخدم كاونسلو الشركات أيضاً؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نعم. يقدم كاونسلو خدمات للأفراد والشركات ضمن منصات خاصة بالإمارات والسعودية وسوريا، تشمل العقود وتأسيس الشركات والاستثمار والعمل والنزاعات." },
    },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "ما هو كاونسلو؟", a: "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي عمر البغدادي بخبرة 30+ عاماً من الممارسة القانونية وأكثر من 20,000 مسألة واستشارة قانونية واستشارة. نقدم إرشاداً قانونياً محدد الاختصاص في الإمارات والسعودية وسوريا." },
  { q: "ما الدول التي يخدمها كاونسلو؟", a: "نقدم خدمات قانونية خاصة بالإمارات العربية المتحدة والمملكة العربية السعودية وسوريا، مع مراعاة القانون والجهات والإجراءات المنطبقة في كل دولة." },
  { q: "كم يستغرق الرد؟", a: "تستهدف كاونسلو تقديم رد مهني خلال 24 ساعة، بحسب نطاق المسألة ودرجة الاستعجال واكتمال المعلومات وتوفر الخدمة." },
  { q: "هل الاستشارات سرية؟", a: "تُعامل المعلومات بسرية وفق الالتزامات المهنية والتعاقدية وواجبات الخصوصية وحماية البيانات المنطبقة، مع مراعاة الإفصاحات التي يوجبها القانون أو يسمح بها." },
  { q: "ما اللغات المتاحة؟", a: "نقدم الاستشارات بالعربية والإنجليزية. صفحات الخدمات متاحة باللغتين، ويُنشر كل مقال باللغة المختارة له." },
  { q: "كيف أبدأ استشارتي؟", a: "اختر الإمارات أو السعودية أو سوريا، ثم أرسل سؤالك عبر النموذج أو واتساب. نستهدف الرد خلال 24 ساعة بحسب نطاق المسألة ودرجة استعجالها." },
  { q: "هل يخدم كاونسلو الشركات؟", a: "نعم. نخدم الأفراد والشركات: تأسيس الشركات، العقود التجارية، تراخيص الاستثمار الأجنبي، نزاعات العمل، تحصيل الديون وغيرها." },
  { q: "ما مجالات القانون التي يغطيها كاونسلو؟", a: "قانون الأسرة والطلاق، قانون العمل، القانون العقاري، القانون التجاري، الاستثمار الأجنبي، الجنائي، الإداري، العقود، البنوك، الملكية الفكرية، الضرائب، قانون التقنية، الأخطاء الطبية، التأمين، التحكيم، وقانون الشركات." },
];

const fadeIn = {
  initial: false as const,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};


// ── Component ─────────────────────────────────────────────────────────────────

export default function ArRegionPicker() {
  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <main className="w-full bg-background" dir="rtl" id="main-content">
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>كاونسلو | استشارة قانونية أونلاين — الإمارات والسعودية وسوريا</title>
        <meta name="description" content="كاونسلو منصة قانونية إلكترونية ثنائية اللغة للاستشارات القانونية السريعة والمهنية والموثوقة ومراجعة المستندات والإرشاد المنظم في الإمارات والسعودية وسوريا." />
        <meta name="keywords" content="استشارة قانونية أونلاين السعودية, استشارة قانونية أونلاين سوريا, محامي أونلاين المملكة, محامي أونلاين سوريا, كاونسلو, عمر البغدادي, مشورة قانونية الشرق الأوسط, online legal consultation Saudi Arabia Syria" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="كاونسلو — المحامي والمستشار القانوني عمر البغدادي" />
        <meta name="geo.region" content="MENA" />
        <meta name="geo.placename" content="الشرق الأوسط" />
        <link rel="canonical" href="https://counselo-legal.com/ar" />
        <link rel="alternate" hrefLang="ar" href="https://counselo-legal.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://counselo-legal.com/" />
        <link rel="alternate" hrefLang="en-SA" href="https://counselo-legal.com/sa" />
        <link rel="alternate" hrefLang="ar-SA" href="https://counselo-legal.com/sa/ar" />
        <link rel="alternate" hrefLang="en-SY" href="https://counselo-legal.com/syr" />
        <link rel="alternate" hrefLang="ar-SY" href="https://counselo-legal.com/syr/ar" />
        <link rel="alternate" hrefLang="en-AE" href="https://counselo-legal.com/uae" />
        <link rel="alternate" hrefLang="ar-AE" href="https://counselo-legal.com/uae/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://counselo-legal.com/" />
        <meta property="og:title" content="كاونسلو | استشارة قانونية أونلاين — الإمارات والسعودية وسوريا" />
        <meta property="og:description" content="اختر الإمارات أو السعودية أو سوريا للحصول على إرشاد قانوني سري ومحدد الاختصاص بالعربية أو الإنجليزية." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="كاونسلو CounselO" />
        <meta property="og:url" content="https://counselo-legal.com/ar" />
        <meta property="og:image" content="https://counselo-legal.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="كاونسلو — استشارات قانونية أونلاين للسعودية وسوريا" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:locale:alternate" content="ar_SY" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CounselOLegal" />
        <meta name="twitter:title" content="كاونسلو | استشارة قانونية أونلاين — الإمارات والسعودية وسوريا" />
        <meta name="twitter:description" content="استشارة قانونية سرية بالعربية والإنجليزية خلال 24 ساعة." />
        <meta name="twitter:image" content="https://counselo-legal.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="region-picker-hero relative isolate min-h-[88svh] overflow-hidden bg-[#073d2b] px-4 pb-16 pt-10 text-white sm:px-6 lg:px-8 lg:pb-20 lg:pt-14" aria-label="اختيار المنطقة">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_28%_42%,rgba(194,157,70,0.12),transparent_30%)]" />
        <img
          src="/images/optimized/counselo-platform-line-art-v1.png"
          alt=""
          aria-hidden="true"
          width="1200"
          height="900"
          decoding="async"
          className="pointer-events-none absolute -start-32 top-4 -z-10 hidden h-[92%] w-auto max-w-none object-contain opacity-[0.13] lg:block"
        />

        <div className="relative mx-auto w-full max-w-[1380px]">
          <div className="mb-10 flex items-center justify-between border-b border-[#0d4a31]/15 bg-white px-4 pb-4 pt-3">
            <Link href="/sa/ar" aria-label="كاونسلو السعودية">
              <img
                src={counseloLogo}
                alt="كاونسلو — استشارات قانونية أونلاين للإمارات والسعودية وسوريا"
                width="193"
                height="80"
                fetchPriority="high"
                decoding="async"
                className="h-14 w-auto object-contain transition-opacity hover:opacity-80 sm:h-16"
              />
            </Link>
            <Link href="/" className="border-b border-[#b58b32] pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d4a31] transition-colors hover:text-[#b58b32]" dir="ltr">
              English
            </Link>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <p className="mb-6 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">
                مستشار قانوني معتمد · الإمارات · السعودية · سوريا
              </p>
              <h1 className="font-serif text-[clamp(2.75rem,5.5vw,5.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
                استشارة قانونية
                <br />
                <span className="font-normal text-[#d5ae5d]">عبر الإنترنت.</span>
              </h1>
              <div className="my-8 flex items-center gap-3" aria-hidden="true">
                <span className="h-px w-20 bg-[#b58b32]" />
                <span className="h-2 w-2 rotate-45 border border-[#b58b32]" />
              </div>
              <p className="max-w-xl text-lg font-light leading-8 text-white/72 sm:text-xl">
                استشارات قانونية احترافية وسرية بالعربية والإنجليزية —{" "}
                <strong className="font-semibold text-white">وقت استجابة مستهدف خلال 24 ساعة.</strong>
              </p>

              <div className="mt-10 grid max-w-xl gap-0 border-y border-white/20 sm:grid-cols-3">
                {["السرية المهنية القانونية", "وقت استجابة مستهدف خلال 24 ساعة", "بالعربية والإنجليزية"].map((label, index) => (
                  <div key={label} className={`flex min-h-16 items-center py-4 text-[0.72rem] font-semibold leading-5 tracking-[0.04em] text-white/78 ${index > 0 ? "border-t border-white/20 sm:border-e sm:border-t-0 sm:pe-5" : ""}`}>
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:pt-14">
              <div className="mb-6 flex items-end justify-between gap-5">
                <div>
                  <p className="mb-2 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">اختر نطاق قضائك</p>
                  <h2 className="font-serif text-3xl text-white sm:text-4xl">أين تحتاج إلى الاستشارة؟</h2>
                </div>
                <span className="hidden text-xs tracking-[0.08em] text-white/50 sm:block">اختر للدخول</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { href: "/sa/ar", flag: saudiFlag, label: "المملكة العربية السعودية", alt: "السعودية — استشارة قانونية", number: "٠١", dark: true },
                  { href: "/syr/ar", flag: syrianFlag, label: "سوريا", alt: "سوريا — استشارة قانونية", number: "٠٢", dark: false },
                  { href: "/uae/ar", flag: uaeFlag, label: "الإمارات العربية المتحدة", alt: "الإمارات — استشارة قانونية", number: "٠٣", dark: true },
                ].map(({ href, flag, label, alt, number, dark }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`group relative min-h-[310px] overflow-hidden border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[390px] sm:p-8 ${
                      dark
                        ? "border-[#0d4a31] bg-[#0d4a31] text-white"
                        : "border-[#0d4a31]/25 bg-[#eef4f0]/85 text-[#0d4a31] backdrop-blur-sm hover:border-[#b58b32]"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[#b58b32] transition-all duration-300 group-hover:h-2" />
                    <div className="flex items-start justify-between">
                      <span className={`font-serif text-5xl ${dark ? "text-white/15" : "text-[#0d4a31]/12"}`}>{number}</span>
                      <img src={flag} alt={alt} width="72" height="48" decoding="async" className="h-11 w-[66px] border border-white/25 object-cover shadow-md" />
                    </div>
                    <div className="absolute inset-x-7 bottom-7 sm:inset-x-8 sm:bottom-8">
                      <p className={`mb-3 text-[0.7rem] font-semibold tracking-[0.08em] ${dark ? "text-[#d4b66c]" : "text-[#9b7426]"}`}>خدمات قانونية أونلاين في</p>
                      <h3 className="mb-7 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{label}</h3>
                      <span className={`flex items-center justify-between border-t pt-4 text-xs font-semibold tracking-[0.08em] ${dark ? "border-white/25 text-white/75" : "border-[#0d4a31]/20 text-[#0d4a31]/70"}`}>
                        ادخل المنصة
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/58" dir="ltr">
                <Link href="/sa" className="transition-colors hover:text-[#aa7e28]">Saudi Arabia — English</Link>
                <span aria-hidden="true">·</span>
                <Link href="/syr" className="transition-colors hover:text-[#aa7e28]">Syria — English</Link>
                <span aria-hidden="true">·</span>
                <Link href="/uae" className="transition-colors hover:text-[#aa7e28]">UAE — English</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ANSWER-FIRST PLATFORM SUMMARY ── */}
      <section className="border-b border-[#0d4a31]/10 bg-white py-20 lg:py-24" aria-labelledby="platform-heading-ar">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">منصة كاونسلو</p>
              <h2 id="platform-heading-ar" className="font-serif text-4xl font-semibold leading-tight text-[#0d4a31] sm:text-5xl">بوابة إلكترونية واحدة للمساعدة القانونية</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p><strong className="text-foreground">كاونسلو منصة قانونية إلكترونية ثنائية اللغة للأفراد والأسر والشركات الباحثين عن استشارة قانونية مهنية ومراجعة المستندات وإرشاد قانوني منظم.</strong> اختر نطاقك القضائي أولاً، ثم صف المسألة بالعربية أو الإنجليزية لتحصل على خطوة تالية محددة وفق القانون والجهة المختصة.</p>
              <p>تتوفر الخدمات أونلاين في الإمارات العربية المتحدة والسعودية وسوريا. تستهدف كاونسلو تقديم رد مهني خلال 24 ساعة، بحسب نطاق المسألة والاستعجال واكتمال المعلومات وتوفر الخدمة.</p>
              <dl className="grid gap-3 pt-3 sm:grid-cols-2" aria-label="نطاق المنصة">
                {[
                  ["ما نقدمه", "استشارات وتحليل أولي ومراجعة مستندات وإرشاد قانوني مكتوب"],
                  ["أين", "الإمارات · السعودية · سوريا"],
                  ["اللغات", "العربية والإنجليزية"],
                  ["التمثيل أمام المحاكم", "إذا طُلب أو أصبح ضرورياً، يرتب بشكل مستقل عبر مهنيين شركاء أو مكاتب متعاونة مرخصة في الدولة المعنية"],
                ].map(([label, value]) => <div key={label} className="border-s-2 border-[#b58b32] bg-[#eef4f0] px-4 py-3"><dt className="text-xs font-bold tracking-[0.1em] text-[#0d4a31]/65">{label}</dt><dd className="mt-1 text-sm leading-6 text-foreground">{value}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {comprehensiveConsultation && (
        <section className="border-b border-[#0d4a31]/10 bg-[#eef4f0] py-20 lg:py-24" aria-labelledby="consultation-package-heading-ar">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">حزمة الاستشارة</p>
                <h2 id="consultation-package-heading-ar" className="font-serif text-4xl font-semibold leading-tight text-[#0d4a31] sm:text-5xl">الاستشارة القانونية الإلكترونية المتكاملة</h2>
                <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">{comprehensiveConsultation.summaryAr}</p>
              </div>
              <div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {comprehensiveConsultation.includesAr.map((item) => <li key={item} className="flex items-start gap-3 border-s-2 border-[#b58b32] bg-white px-4 py-3 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}
                </ul>
                <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">النطاق:</strong> تُدرج متابعة المسألة فقط إذا تم الاتفاق عليها. أما التمثيل أمام المحاكم والإيداع والأعمال المحجوزة مهنياً فهي منفصلة ويمكن ترتيبها عبر شريك أو مكتب متعاون مرخص عند طلبها أو ضرورتها.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── STATS BAR ── */}
      <section aria-label="أبرز أرقام كاونسلو" className="border-y border-white/10 bg-[#073d29] py-11 text-white">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { stat: "+30",      label: "عاماً من الخبرة القانونية" },
              { stat: COUNSELO_LEGAL_MATTERS_STAT.ar,  label: "مسائل واستشارات قانونية" },
              { stat: "24 ساعة", label: "وقت الاستجابة المستهدف" },
              { stat: "3",        label: "ثلاث دول: الإمارات والسعودية وسوريا" },
            ].map(({ stat, label }, i, arr) => (
              <motion.div key={stat} {...fadeIn} className={`px-4 py-3 text-center ${i < arr.length - 1 ? "border-s border-white/15" : ""}`}>
                <div className="mb-2 text-center font-serif text-3xl font-semibold leading-tight text-[#d4b66c] md:text-4xl">{stat}</div>
                <div className="text-center text-[0.7rem] font-medium tracking-[0.08em] text-white/65">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="bg-[#eef4f0] py-24 lg:py-32" aria-labelledby="about-heading-ar">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-5 lg:gap-24">

            {/* About text — comes first in RTL so shows on right */}
            <motion.div initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">عن كاونسلو</p>
              <h2 id="about-heading-ar" className="mb-6 font-serif text-4xl font-semibold leading-tight text-[#0d4a31] sm:text-5xl lg:text-6xl">
                استشارة قانونية احترافية<br />عبر الإنترنت
              </h2>
              <div className="mb-8 flex items-center gap-3"><span className="h-px w-20 bg-[#b58b32]" /><span className="h-2 w-2 rotate-45 border border-[#b58b32]" /></div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                <strong className="text-foreground">كاونسلو</strong> منصة قانونية إلكترونية سريعة ومهنية وموثوقة أسسها وقادها{" "}
                <strong className="text-foreground">المحامي والمستشار القانوني عمر البغدادي</strong>، صاحب خبرة تمتد لأكثر من{" "}
                <strong className="text-foreground">30+ عاماً من الممارسة القانونية</strong> وأكثر من{" "}
                <strong className="text-foreground">أكثر من 20,000 مسألة واستشارة قانونية واستشارة</strong> في المنطقة.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                نجعل الاستشارة القانونية المتخصصة في متناول الجميع — أفراداً وأسراً وشركات — دون الحاجة لزيارة المكتب. الاستشارات عبر الواتساب أو البريد الإلكتروني{" "}
                <strong className="text-foreground">بالعربية أو الإنجليزية</strong>، مع وقت استجابة مستهدف{" "}
                <strong className="text-foreground">خلال 24 ساعة</strong>.
              </p>
              <div className="mt-10 grid border-y border-[#0d4a31]/20 sm:grid-cols-3">
                {[
                  { Icon: Lock,  title: "سرية مهنية",          body: "تُعامل المعلومات وفق الالتزامات المهنية والخصوصية وحماية البيانات المنطبقة، مع مراعاة الاستثناءات القانونية الموضحة في سياسة الخصوصية." },
                  { Icon: Clock, title: "وقت استجابة مستهدف خلال 24 ساعة",    body: "تستهدف كاونسلو تقديم رد مهني خلال 24 ساعة بحسب النطاق والاستعجال واكتمال المعلومات وتوفر الخدمة." },
                  { Icon: Globe, title: "أونلاين — دون مكتب", body: "استشِر من أي مكان عبر الواتساب أو البريد الإلكتروني. لا تنقل، لا انتظار، لا مواعيد." },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="border-b border-[#0d4a31]/20 p-5 last:border-b-0 sm:border-b-0 sm:border-s sm:last:border-s-0">
                    <Icon className="mb-4 h-6 w-6 text-[#aa7e28]" strokeWidth={1.5} />
                    <div className="mb-2 font-serif text-base font-semibold text-[#0d4a31]">{title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Founder card */}
            <motion.div {...fadeIn} className="lg:col-span-2">
              <div className="relative mb-6 overflow-hidden border-t-4 border-[#b58b32] bg-[#0d4a31] p-8 text-white shadow-[0_24px_70px_rgba(13,74,49,0.14)] lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg">محامٍ ومستشار قانوني</div>
                    <div className="text-white/70 text-sm mb-2">عمر البغدادي</div>
                    <a
                      href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-xs transition-colors border border-white/25 hover:border-white/50 px-2 py-1"
                      dir="ltr"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">المؤهلات والإنجازات</p>
                  <ul className="space-y-3">
                    {[
                      "خريج كلية الحقوق — جامعة دمشق (1996)",
                      "قيادة قانونية إقليمية؛ ويُحدد التمثيل المحلي بشكل مستقل",
                      "حاصل على لقب «الأستاذ» من نقابة المحامين في سوريا",
                      "محامٍ أول ومستشار قانوني في المملكة والإمارات وسوريا",
                      `${COUNSELO_LEGAL_MATTERS_CLAIM.ar} في القانون المدني والتجاري والإداري والجزائي والتحكيم`,
                      "درّب أو أشرف على أكثر من 40 محامياً",
                      "نجل المحامي رياض البغدادي، مؤسس مكتب البغدادي للمحاماة (تأسس 1957)",
                      "خبير في النزاعات العابرة للحدود والقضايا متعددة الولايات",
                    ].map((c, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── JURISDICTIONS ── */}
      <section className="border-y border-[#0d4a31]/10 bg-white py-24 lg:py-32" aria-labelledby="jurisdictions-heading-ar">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16 max-w-3xl">
            <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">اختر الاختصاص القضائي</p>
            <h2 id="jurisdictions-heading-ar" className="mb-4 font-serif text-5xl font-semibold text-[#0d4a31] sm:text-6xl">ثلاث بيئات قانونية ونقطة بداية واحدة</h2>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-20 bg-[#b58b32]" /><span className="h-2 w-2 rotate-45 border border-[#b58b32]" /></div>
            <p className="text-muted-foreground">ابدأ بالدولة التي ينطبق قانونها وجهاتها المختصة. يحتوي كل مركز إقليمي على دليل خدماته ومصادره ومسار الاستشارة ومحتواه الثنائي اللغة.</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { href: "/sa/ar", name: "المملكة العربية السعودية", body: "إرشاد قانوني خاص بالسعودية في مسائل الأسرة والتجارة والعمل والعقارات والاستثمار والنزاعات.", icon: "🇸🇦" },
              { href: "/syr/ar", name: "سوريا", body: "استشارات ومراجعة مستندات وإرشاد منظم وفق القانون السوري للأفراد والأسر والشركات.", icon: "🇸🇾" },
              { href: "/uae/ar", name: "الإمارات العربية المتحدة", body: "إرشاد قانوني وفق الأطر الاتحادية والمحلية والبر الرئيسي والمناطق الحرة في الإمارات.", icon: "🇦🇪" },
            ].map(({ href, name, body, icon }) => (
              <Link key={href} href={href} className="group flex min-h-64 flex-col border border-[#0d4a31]/15 bg-[#f8faf8] p-7 transition-all hover:-translate-y-1 hover:border-[#b58b32] hover:bg-[#eef4f0] hover:shadow-[0_18px_45px_rgba(0,61,34,0.09)]">
                <div className="mb-7 flex items-start justify-between"><span className="text-4xl" aria-hidden="true">{icon}</span><Globe className="h-6 w-6 text-[#aa7e28]" strokeWidth={1.4} /></div>
                <h3 className="font-serif text-2xl font-semibold text-[#0d4a31] group-hover:text-primary">{name}</h3>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{body}</p>
                <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-primary">افتح المركز الإقليمي <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative overflow-hidden bg-[#073d29] py-24 text-white lg:py-32" aria-labelledby="how-heading-ar">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="mb-16 max-w-3xl">
            <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#d4b66c]">خطوات بسيطة</p>
            <h2 id="how-heading-ar" className="mb-4 font-serif text-5xl font-semibold text-white sm:text-6xl">كيف تعمل الخدمة؟</h2>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-20 bg-[#d4b66c]" /><span className="h-2 w-2 rotate-45 border border-[#d4b66c]" /></div>
            <p className="text-white/60">أربع خطوات للحصول على استشارة قانونية متخصصة</p>
          </motion.div>

          <div className="relative mb-12 grid md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "اختر نطاقك القضائي",   body: "اختر الإمارات أو السعودية أو سوريا. لكل دولة خدمات ومحتوى مخصص وفق القانون والجهات المنطبقة فيها." },
              { step: "02", title: "صف قضيتك القانونية",   body: "أرسل سؤالك القانوني عبر الواتساب أو نموذج التواصل — بالعربية أو الإنجليزية. أرفق المستندات إن لزم." },
              { step: "03", title: "أكد النطاق والرسوم",   body: "بعد الدراسة الأولية، تؤكد كاونسلو منتج الاستشارة والنطاق والرسوم والخطوة التالية. لا يحدد سعر ثابت قبل فهم المسألة." },
              { step: "04", title: "استلم إرشاداً منظماً",  body: "يراجع مهني مؤهل من كاونسلو المسألة ويرد عبر القناة المتفق عليها، مع وقت استجابة مستهدف خلال 24 ساعة بحسب النطاق والاستعجال." },
            ].map(({ step, title, body }, i) => (
              <motion.div key={step} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative border-b border-white/15 p-8 transition-colors hover:bg-white/[0.04] md:border-s lg:border-b-0">
                <div className="absolute start-6 top-4 select-none font-serif text-6xl font-bold leading-none text-white/[0.06]" dir="ltr">{step}</div>
                <div className="mb-5 font-mono text-sm font-bold text-[#d4b66c]" dir="ltr">{step}</div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{body}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/966594850247" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0d4a31] text-white font-semibold px-7 py-3 text-sm hover:bg-[#073d2b] transition-colors">
              <MessageCircle className="h-4 w-4" />
              تواصل عبر الواتساب
            </a>
            <Link href="/sa/ar/contact" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-[#d4b66c] hover:text-[#d4b66c]">
              <ArrowLeft className="h-4 w-4" /> نموذج التواصل
            </Link>
          </div>
        </div>
      </section>

      <LatestContentCarousels isArabic />

      {/* ── FAQ ── */}
      <section className="bg-[#eef4f0] py-24 lg:py-32" aria-labelledby="faq-heading-ar">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-8">
          <motion.div {...fadeIn} className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#aa7e28]">الدعم والمساعدة</p>
            <h2 id="faq-heading-ar" className="mb-6 font-serif text-5xl font-semibold leading-tight text-[#0d4a31]">الأسئلة الشائعة</h2>
            <div className="flex items-center gap-3"><span className="h-px w-20 bg-[#b58b32]" /><span className="h-2 w-2 rotate-45 border border-[#b58b32]" /></div>
          </motion.div>
          <div className="border-t border-[#0d4a31]/20">
            {FAQS.map(({ q, a }, i) => (
              <motion.div key={q} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border-b border-[#0d4a31]/20 py-7">
                <h3 className="mb-3 font-serif text-lg font-semibold text-[#0d4a31]">{q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#0d4a31] py-24 lg:py-32" aria-label="دعوة للتواصل">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <p className="mb-4 text-xs font-bold tracking-[0.12em] text-[#d4b66c]">ابدأ الآن</p>
            <h2 className="mb-5 font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl">هل أنت مستعد للحصول على استشارة قانونية متخصصة؟</h2>
            <div className="mx-auto mb-8 flex w-fit items-center gap-3"><span className="h-px w-20 bg-[#d4b66c]" /><span className="h-2 w-2 rotate-45 border border-[#d4b66c]" /></div>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              اختر نطاقك القضائي للوصول إلى الخدمات القانونية المتخصصة والأدلة المجانية وحجز الاستشارات.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/sa/ar" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-10 py-3.5 text-sm hover:bg-white/90 transition-colors">
                <ArrowLeft className="h-4 w-4" /> المملكة العربية السعودية
              </Link>
              <Link href="/syr/ar" className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-3.5 text-sm hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-4 w-4" /> سوريا
              </Link>
              <Link href="/uae/ar" className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-10 py-3.5 text-sm hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-4 w-4" /> الإمارات العربية المتحدة
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="border-t border-white/10 bg-[#062d20] py-16 text-white [&_.text-foreground]:text-white [&_.text-muted-foreground]:text-white/55 [&_a:hover]:text-[#d4b66c]">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="روابط التنقل في الموقع">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-muted-foreground mb-12">
              <div>
                <div className="font-semibold text-foreground mb-4">السعودية</div>
                <ul className="space-y-2.5">
                  <li><Link href="/sa/ar" className="hover:text-primary transition-colors">الرئيسية — السعودية</Link></li>
                  <li><Link href="/sa/ar/services" className="hover:text-primary transition-colors">جميع الخدمات</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة القانونية</Link></li>
                  <li><Link href="/sa/ar/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                  <li><Link href="/sa/ar/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                  <li><Link href="/sa" className="hover:text-primary transition-colors">English</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">سوريا</div>
                <ul className="space-y-2.5">
                  <li><Link href="/syr/ar" className="hover:text-primary transition-colors">الرئيسية — سوريا</Link></li>
                  <li><Link href="/syr/ar/services" className="hover:text-primary transition-colors">جميع الخدمات</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة القانونية</Link></li>
                  <li><Link href="/syr/ar/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                  <li><Link href="/syr/ar/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                  <li><Link href="/syr" className="hover:text-primary transition-colors">English</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">الإمارات</div>
                <ul className="space-y-2.5">
                  <li><Link href="/uae/ar" className="hover:text-primary transition-colors">الرئيسية — الإمارات</Link></li>
                  <li><Link href="/uae/ar/services" className="hover:text-primary transition-colors">جميع الخدمات</Link></li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">المدونة القانونية</Link></li>
                  <li><Link href="/uae/ar/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                  <li><Link href="/uae/ar/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                  <li><Link href="/uae" className="hover:text-primary transition-colors">English</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">المصادر</div>
                <ul className="space-y-2.5">
                  <li><Link href="/blog" className="hover:text-primary transition-colors">مركز المعرفة</Link></li>
                  <li><Link href="/ar/our-work" className="hover:text-primary transition-colors">دراسات الحالة والأعمال</Link></li>
                  <li><Link href="/sa/ar/about" className="hover:text-primary transition-colors">عن كاونسلو</Link></li>
                  <li><Link href="/sa/ar/contact" className="hover:text-primary transition-colors">ابدأ استشارة</Link></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <span>© 2026 كاونسلو. جميع الحقوق محفوظة.</span>
            <div className="flex gap-4" dir="ltr">
              <Link href="/sa/ar/privacy-policy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
              <span>·</span>
              <Link href="/sa/ar/terms-of-service" className="hover:text-primary transition-colors">شروط الاستخدام</Link>
              <span>·</span>
              <a href="https://www.linkedin.com/in/lawyeromarbaghdadi/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
