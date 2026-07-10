import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Scale, ShieldCheck, Globe, Clock, Lock, ArrowLeft, MessageCircle, CheckCircle2, Award } from "lucide-react";
import counseloLogo from "@assets/Screen_Shot_2026-07-01_at_12.26.11_AM_1782851175169.png";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";

// ── Structured Data ───────────────────────────────────────────────────────────

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "كاونسلو",
  "alternateName": "CounselO",
  "url": "https://counselo-legal.com/",
  "description": "منصة استشارات قانونية إلكترونية تخدم المملكة العربية السعودية وسوريا — استشارات قانونية احترافية بالعربية والإنجليزية خلال 24 ساعة عبر الواتساب أو البريد الإلكتروني.",
  "publisher": { "@type": "Organization", "name": "كاونسلو", "url": "https://counselo-legal.com" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "كاونسلو",
  "alternateName": "CounselO",
  "url": "https://counselo-legal.com",
  "logo": "https://counselo-legal.com/logo.png",
  "description": "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي والمستشار القانوني عمر البغدادي، بخبرة تمتد لأكثر من 30 عاماً وأكثر من 20,000 قضية في السعودية وسوريا.",
  "founder": {
    "@type": "Person",
    "name": "عمر البغدادي",
    "alternateName": "Omar Al-Baghdadi",
    "jobTitle": "محامٍ ومستشار قانوني",
    "description": "المحامي عمر البغدادي يمتلك خبرة تزيد على 30 عاماً في الممارسة القانونية وأكثر من 20,000 قضية في المملكة العربية السعودية وسوريا.",
    "worksFor": { "@type": "Organization", "name": "كاونسلو" },
    "sameAs": ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  },
  "areaServed": [
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "Country", "name": "Syria" },
  ],
  "availableLanguage": ["Arabic", "English"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966592850247",
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
      "acceptedAnswer": { "@type": "Answer", "text": "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي والمستشار القانوني عمر البغدادي بخبرة تزيد على 30 عاماً وأكثر من 20,000 قضية. نقدم استشارات قانونية سرية للأفراد والأسر والشركات في المملكة العربية السعودية وسوريا، بالعربية والإنجليزية، خلال 24 ساعة عبر الواتساب أو البريد الإلكتروني." },
    },
    {
      "@type": "Question",
      "name": "ما الدول التي يخدمها كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نخدم المملكة العربية السعودية وسوريا. الاستشارات تتم عبر الإنترنت دون الحاجة لزيارة مكتب." },
    },
    {
      "@type": "Question",
      "name": "كم يستغرق الرد على استفساري القانوني؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يضمن كاونسلو ردًّا قانونيًّا احترافيًّا خلال 24 ساعة من تقديم طلبك عبر الواتساب أو البريد الإلكتروني. الحالات العاجلة تُعطى أولوية." },
    },
    {
      "@type": "Question",
      "name": "هل الاستشارات القانونية على كاونسلو سرية؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نعم. جميع الاستشارات سرية تمامًا وفق مبادئ السرية المهنية بين المحامي والموكّل. لا تُشارَك معلوماتك الشخصية أو القانونية مع أي طرف ثالث." },
    },
    {
      "@type": "Question",
      "name": "ما اللغات المتاحة في كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يقدم كاونسلو استشاراته بالعربية والإنجليزية. جميع صفحات الخدمات والمقالات القانونية متوفرة باللغتين." },
    },
    {
      "@type": "Question",
      "name": "ما مجالات القانون التي يغطيها كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "يغطي كاونسلو: قانون الأسرة والطلاق، قانون العمل، القانون العقاري، القانون التجاري، الاستثمار الأجنبي، القانون الجنائي، القانون الإداري، العقود، البنوك والتمويل، الملكية الفكرية، الضرائب والزكاة، قانون الإنترنت والتقنية، الأخطاء الطبية، قانون التأمين، التحكيم والوساطة، وقانون الشركات." },
    },
    {
      "@type": "Question",
      "name": "كيف أبدأ استشارتي مع كاونسلو؟",
      "acceptedAnswer": { "@type": "Answer", "text": "الأمر بسيط: (1) اختر منطقتك — السعودية أو سوريا. (2) تصفح الخدمة المناسبة أو تواصل معنا مباشرة. (3) أرسل سؤالك القانوني عبر الواتساب (+966 59 285 0247) أو نموذج التواصل. ستحصل على رد قانوني سري ومتخصص خلال 24 ساعة." },
    },
    {
      "@type": "Question",
      "name": "هل يخدم كاونسلو الشركات أيضاً؟",
      "acceptedAnswer": { "@type": "Answer", "text": "نعم. يقدم كاونسلو استشاراته للأفراد والشركات على حد سواء. للشركات: نتولى العقود التجارية، تأسيس الشركات، تراخيص الاستثمار الأجنبي، الامتثال للعمل، تسوية النزاعات، وتحصيل الديون — في السعودية وسوريا." },
    },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { slug: "family-law",            ar: "قانون الأسرة" },
  { slug: "employment-law",        ar: "قانون العمل" },
  { slug: "real-estate",           ar: "القانون العقاري" },
  { slug: "business-law",          ar: "القانون التجاري" },
  { slug: "foreign-investment",    ar: "الاستثمار الأجنبي" },
  { slug: "criminal-law",          ar: "القانون الجنائي" },
  { slug: "administrative-law",    ar: "القانون الإداري" },
  { slug: "contracts",             ar: "العقود" },
  { slug: "arbitration",           ar: "التحكيم والوساطة" },
  { slug: "companies-law",         ar: "قانون الشركات" },
  { slug: "banking-finance",       ar: "البنوك والتمويل" },
  { slug: "intellectual-property", ar: "الملكية الفكرية" },
  { slug: "tax-zakat",             ar: "الضرائب والزكاة" },
  { slug: "cyber-law",             ar: "قانون الإنترنت والتقنية" },
  { slug: "medical-malpractice",   ar: "الأخطاء الطبية" },
  { slug: "insurance-law",         ar: "قانون التأمين" },
  { slug: "enforcement",           ar: "التنفيذ وتحصيل الديون" },
];

const BLOG_POSTS = [
  { saSlug: "divorce-in-saudi-arabia",               syrSlug: "divorce-in-syria",                      ar: "الطلاق في المملكة: حقوقك وإجراءاتك القانونية" },
  { saSlug: "child-custody-saudi-arabia",            syrSlug: "child-custody-syria",                   ar: "الحضانة في المملكة: حقوق الوالدين والأطفال" },
  { saSlug: "wrongful-termination-saudi-labor-law",  syrSlug: "wrongful-termination-syrian-labor-law", ar: "الفصل التعسفي في قانون العمل: حقوقك القانونية" },
  { saSlug: "foreign-company-registration-saudi-arabia", syrSlug: "foreign-company-registration-syria", ar: "تسجيل شركة أجنبية 2026: دليل الترخيص" },
  { saSlug: "real-estate-disputes-saudi-arabia",     syrSlug: "real-estate-disputes-syria",            ar: "النزاعات العقارية: خياراتك القانونية" },
  { saSlug: "board-of-grievances-saudi-arabia",      syrSlug: "administrative-court-disputes-syria",   ar: "المحاكم الإدارية: كيف تطعن في قرارات الجهات" },
];

const FAQS = [
  { q: "ما هو كاونسلو؟", a: "كاونسلو منصة استشارات قانونية إلكترونية يقودها المحامي عمر البغدادي بخبرة 30+ عاماً وأكثر من 20,000 قضية. نقدم استشارات سرية للأفراد والشركات في السعودية وسوريا بالعربية والإنجليزية خلال 24 ساعة." },
  { q: "ما الدول التي يخدمها كاونسلو؟", a: "نخدم المملكة العربية السعودية وسوريا. الاستشارات تتم عبر الإنترنت دون الحاجة لزيارة مكتب." },
  { q: "كم يستغرق الرد؟", a: "يضمن كاونسلو ردًّا احترافيًّا خلال 24 ساعة من تقديم طلبك. الحالات العاجلة تُعطى أولوية." },
  { q: "هل الاستشارات سرية؟", a: "نعم، جميع الاستشارات سرية تمامًا وفق مبادئ السرية المهنية بين المحامي والموكّل. لا تُشارَك معلوماتك مع أي طرف ثالث." },
  { q: "ما اللغات المتاحة؟", a: "نقدم الاستشارات بالعربية والإنجليزية. جميع صفحات الخدمات والمقالات القانونية متوفرة باللغتين." },
  { q: "كيف أبدأ استشارتي؟", a: "اختر منطقتك (السعودية أو سوريا)، ثم أرسل سؤالك عبر الواتساب أو نموذج التواصل. ستحصل على رد متخصص خلال 24 ساعة." },
  { q: "هل يخدم كاونسلو الشركات؟", a: "نعم. نخدم الأفراد والشركات: تأسيس الشركات، العقود التجارية، تراخيص الاستثمار الأجنبي، نزاعات العمل، تحصيل الديون وغيرها." },
  { q: "ما مجالات القانون التي يغطيها كاونسلو؟", a: "قانون الأسرة والطلاق، قانون العمل، القانون العقاري، القانون التجاري، الاستثمار الأجنبي، الجنائي، الإداري، العقود، البنوك، الملكية الفكرية، الضرائب، قانون التقنية، الأخطاء الطبية، التأمين، التحكيم، وقانون الشركات." },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const serviceIcons = [Scale, ShieldCheck, Globe, Clock, Lock, CheckCircle2, Globe, Scale, ShieldCheck, Globe, Clock, Lock, CheckCircle2, Globe, Scale, ShieldCheck, Clock];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ArRegionPicker() {
  return (
    <div className="w-full bg-background" dir="rtl">
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>كاونسلو | استشارة قانونية أونلاين — السعودية وسوريا</title>
        <meta name="description" content="احصل على استشارة قانونية سرية في السعودية أو سوريا. استشارات بالعربية والإنجليزية خلال 24 ساعة. قانون الأسرة، العمل، العقارات، التجارة، الجنائي وأكثر." />
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
        <link rel="alternate" hrefLang="x-default" href="https://counselo-legal.com/" />
        <meta property="og:title" content="كاونسلو | استشارة قانونية أونلاين — السعودية وسوريا" />
        <meta property="og:description" content="استشارة قانونية سرية في السعودية أو سوريا بالعربية والإنجليزية خلال 24 ساعة." />
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
        <meta name="twitter:title" content="كاونسلو | استشارة قانونية أونلاين — السعودية وسوريا" />
        <meta name="twitter:description" content="استشارة قانونية سرية بالعربية والإنجليزية خلال 24 ساعة." />
        <meta name="twitter:image" content="https://counselo-legal.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16 pb-20 text-center overflow-hidden" aria-label="اختيار المنطقة">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, hsl(150 100% 10%) 0%, hsl(150 80% 15%) 100%)" }} />
        <div className="absolute start-0 top-0 w-1/2 h-full opacity-10 pointer-events-none z-0">
          <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(150 60% 60%) 0%, transparent 70%)" }} />
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center">
            <Link href="/sa/ar">
              <img
                src={counseloLogo}
                alt="كاونسلو — استشارات قانونية أونلاين للسعودية وسوريا"
                className="h-20 w-auto object-contain mb-10 hover:opacity-90 transition-opacity"
              />
            </Link>

            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 mb-8">
              مستشار قانوني معتمد · السعودية وسوريا
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6 max-w-3xl">
              استشارة قانونية أونلاين
              <br />
              <span className="text-white/70 italic">السعودية وسوريا</span>
            </h1>

            <div className="w-20 h-1 bg-white/40 mb-8" />

            <p className="text-xl text-white/75 mb-10 max-w-xl leading-relaxed font-light">
              استشارات قانونية احترافية وسرية بالعربية والإنجليزية —{" "}
              <strong className="text-white font-semibold">ضمان الرد خلال 24 ساعة.</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["السرية المهنية بين المحامي والموكّل", "ضمان الرد خلال 24 ساعة", "بالعربية والإنجليزية"].map((label) => (
                <span key={label} className="bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-4 py-2 uppercase tracking-wider">
                  {label}
                </span>
              ))}
            </div>

            <p className="text-white/40 text-xs mb-5 uppercase tracking-widest">اختر نطاق قضائك</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8">
              {[
                { href: "/syr/ar", flag: syrianFlag, label: "سوريا",                    alt: "سوريا — استشارة قانونية" },
                { href: "/sa/ar",  flag: saudiFlag,  label: "المملكة العربية السعودية", alt: "السعودية — استشارة قانونية" },
              ].map(({ href, flag, label, alt }) => (
                <Link key={href} href={href}>
                  <div className="group cursor-pointer flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/40 transition-all duration-200">
                    <img src={flag} alt={alt} className="object-cover shadow-lg" style={{ width: "72px", height: "48px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.2)" }} />
                    <div className="text-white font-semibold text-base">{label}</div>
                    <div className="flex items-center gap-1 text-white/50 text-xs group-hover:text-white/80 transition-colors">
                      <ArrowLeft className="h-3 w-3" /> ادخل
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/35">
              <Link href="/" className="hover:text-white/60 transition-colors">English</Link>
              <span className="text-white/15">·</span>
              <Link href="/sa" className="hover:text-white/60 transition-colors">السعودية — إنجليزي</Link>
              <span className="text-white/15">·</span>
              <Link href="/syr" className="hover:text-white/60 transition-colors">سوريا — إنجليزي</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section aria-label="أبرز أرقام كاونسلو" className="py-12 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { stat: "+30",      label: "عاماً من الخبرة القانونية" },
              { stat: "+20,000",  label: "قضية تمت معالجتها" },
              { stat: "24 ساعة", label: "ضمان الرد" },
              { stat: "2",        label: "دولتان: السعودية وسوريا" },
            ].map(({ stat, label }, i, arr) => (
              <motion.div key={stat} {...fadeIn} className={`text-center px-4 py-2 ${i < arr.length - 1 ? "border-l border-border" : ""}`}>
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 leading-tight text-center">{stat}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── */}
      <section className="py-24 bg-background" aria-labelledby="about-heading-ar">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">

            {/* About text — comes first in RTL so shows on right */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">عن كاونسلو</p>
              <h2 id="about-heading-ar" className="text-4xl font-serif font-bold text-foreground mb-6">
                استشارة قانونية احترافية<br />عبر الإنترنت
              </h2>
              <div className="w-16 h-1 bg-primary/40 mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-5">
                <strong className="text-foreground">كاونسلو</strong> منصة استشارات قانونية إلكترونية أسسها وقادها{" "}
                <strong className="text-foreground">المحامي والمستشار القانوني عمر البغدادي</strong>، صاحب خبرة تمتد لأكثر من{" "}
                <strong className="text-foreground">30 عاماً</strong> وأكثر من{" "}
                <strong className="text-foreground">20,000 قضية</strong> في السعودية وسوريا.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                نجعل الاستشارة القانونية المتخصصة في متناول الجميع — أفراداً وأسراً وشركات — دون الحاجة لزيارة المكتب. الاستشارات عبر الواتساب أو البريد الإلكتروني{" "}
                <strong className="text-foreground">بالعربية أو الإنجليزية</strong>، مع ضمان الرد{" "}
                <strong className="text-foreground">خلال 24 ساعة</strong>.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { Icon: Lock,  title: "سرية تامة",          body: "تُطبَّق قواعد السرية المهنية بين المحامي والموكّل. معلوماتك القانونية لا تُشارَك مع أي طرف ثالث." },
                  { Icon: Clock, title: "رد خلال 24 ساعة",    body: "قدّم سؤالك القانوني واحصل على رد متخصص خلال 24 ساعة — والحالات العاجلة تُعطى أولوية." },
                  { Icon: Globe, title: "أونلاين — دون مكتب", body: "استشِر من أي مكان عبر الواتساب أو البريد الإلكتروني. لا تنقل، لا انتظار، لا مواعيد." },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="bg-card border border-border p-5 border-r-2 border-r-primary">
                    <Icon className="h-5 w-5 text-primary mb-3" />
                    <div className="font-semibold text-foreground text-sm mb-1">{title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Founder card */}
            <motion.div {...fadeIn} className="lg:col-span-2">
              <div className="bg-primary p-8 text-white mb-6">
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
                      "محامٍ مرخّص في سوريا — رقم الترخيص 289",
                      "حاصل على لقب «الأستاذ» من نقابة المحامين في سوريا",
                      "محامٍ أول ومستشار قانوني في المملكة والإمارات وسوريا",
                      "أكثر من 20,000 قضية واستشارة في القانون المدني والتجاري والإداري والجزائي والتحكيم",
                      "أشرف على تأهيل أكثر من 40 محامياً مرخصاً في ثلاث ولايات قضائية",
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

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 bg-card border-y border-border" aria-labelledby="services-heading-ar">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">الخدمات القانونية</p>
            <h2 id="services-heading-ar" className="text-4xl font-serif font-bold text-foreground mb-4">مجالات الممارسة القانونية</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">متاحة في المملكة العربية السعودية وسوريا</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {SERVICES.map(({ slug, ar }, index) => {
              const Icon = serviceIcons[index] ?? Scale;
              return (
                <motion.div key={slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                  className="bg-background border border-border p-5 hover:border-primary/50 hover:shadow-md transition-all group">
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <div className="font-semibold text-foreground text-sm mb-3 leading-snug">{ar}</div>
                  <div className="flex gap-2 flex-wrap">
                    <Link href={`/sa/ar/services/${slug}`} className="text-xs px-2 py-0.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">السعودية</Link>
                    <Link href={`/syr/ar/services/${slug}`} className="text-xs px-2 py-0.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">سوريا</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/sa/ar/services" className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-8 py-3 hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" /> جميع خدمات السعودية
            </Link>
            <Link href="/syr/ar/services" className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-8 py-3 hover:border-primary/50 hover:shadow-sm transition-all">
              <ArrowLeft className="h-4 w-4" /> جميع خدمات سوريا
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-background" aria-labelledby="how-heading-ar">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">خطوات بسيطة</p>
            <h2 id="how-heading-ar" className="text-4xl font-serif font-bold text-foreground mb-4">كيف تعمل الخدمة؟</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">أربع خطوات للحصول على استشارة قانونية متخصصة</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { step: "01", title: "اختر نطاقك القضائي",   body: "اختر المملكة العربية السعودية أو سوريا. لكل منطقة صفحات خدمات وأدلة قانونية مخصصة وفق القانون المحلي." },
              { step: "02", title: "صف قضيتك القانونية",   body: "أرسل سؤالك القانوني عبر الواتساب أو نموذج التواصل — بالعربية أو الإنجليزية. أرفق المستندات إن لزم." },
              { step: "03", title: "ادفع رسوم الاستشارة",   body: "تُسدَّد رسوم الاستشارة عبر التحويل المصرفي قبل استلام الرأي القانوني. يُرسَل إليك تأكيد الدفع وموعد الرد المتوقع." },
              { step: "04", title: "احصل على رأي قانوني",  body: "يراجع المحامي عمر البغدادي أو أحد أعضاء فريق كاونسلو قضيتك ويردّ خلال 24 ساعة." },
            ].map(({ step, title, body }, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-card border border-border p-8 hover:border-primary/50 hover:shadow-md transition-all">
                <div className="text-6xl font-serif font-bold text-primary/10 absolute top-4 start-6 leading-none select-none" dir="ltr">{step}</div>
                <div className="text-primary font-mono text-sm font-bold mb-4" dir="ltr">{step}</div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/966592850247" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-semibold px-7 py-3 text-sm hover:opacity-90 transition-opacity">
              <MessageCircle className="h-4 w-4" />
              تواصل عبر الواتساب
            </a>
            <Link href="/sa/ar/contact" className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-7 py-3 text-sm hover:border-primary/50 hover:shadow-sm transition-all">
              <ArrowLeft className="h-4 w-4" /> نموذج التواصل
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEGAL BLOG ── */}
      <section className="py-24 bg-card border-y border-border" aria-labelledby="blog-heading-ar">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">مركز المعرفة القانونية</p>
            <h2 id="blog-heading-ar" className="text-4xl font-serif font-bold text-foreground mb-4">أدلة قانونية مجانية</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground">مقالات قانونية معمّقة للسعودية وسوريا</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {BLOG_POSTS.map(({ saSlug, syrSlug, ar }, i) => (
              <motion.div key={saSlug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border p-6 hover:border-primary/50 hover:shadow-md transition-all">
                <p className="text-primary font-medium text-xs uppercase tracking-widest mb-3">دليل قانوني</p>
                <h3 className="font-serif font-bold text-foreground text-base leading-snug mb-5">{ar}</h3>
                <div className="flex gap-3">
                  <Link href={`/sa/ar/blog/${saSlug}`} className="inline-flex items-center gap-1 text-xs border border-border text-muted-foreground px-3 py-1.5 hover:border-primary hover:text-primary transition-colors">
                    <ArrowLeft className="h-3 w-3" /> السعودية
                  </Link>
                  <Link href={`/syr/ar/blog/${syrSlug}`} className="inline-flex items-center gap-1 text-xs border border-border text-muted-foreground px-3 py-1.5 hover:border-primary hover:text-primary transition-colors">
                    <ArrowLeft className="h-3 w-3" /> سوريا
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/sa/ar/blog" className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-8 py-3 hover:bg-primary/90 transition-colors">
              <ArrowLeft className="h-4 w-4" /> مدونة السعودية القانونية
            </Link>
            <Link href="/syr/ar/blog" className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-8 py-3 hover:border-primary/50 hover:shadow-sm transition-all">
              <ArrowLeft className="h-4 w-4" /> مدونة سوريا القانونية
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-background" aria-labelledby="faq-heading-ar">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-3">الدعم والمساعدة</p>
            <h2 id="faq-heading-ar" className="text-4xl font-serif font-bold text-foreground mb-4">الأسئلة الشائعة</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <motion.div key={q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border border-r-2 border-r-primary p-6">
                <h3 className="font-serif font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary" aria-label="دعوة للتواصل">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <p className="text-white/60 uppercase tracking-widest text-sm font-medium mb-3">ابدأ الآن</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">هل أنت مستعد للحصول على استشارة قانونية متخصصة؟</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto mb-8" />
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="روابط التنقل في الموقع">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-muted-foreground mb-12">
              <div>
                <div className="font-semibold text-foreground mb-4">السعودية</div>
                <ul className="space-y-2.5">
                  <li><Link href="/sa/ar" className="hover:text-primary transition-colors">الرئيسية — السعودية</Link></li>
                  <li><Link href="/sa/ar/services" className="hover:text-primary transition-colors">جميع الخدمات</Link></li>
                  <li><Link href="/sa/ar/blog" className="hover:text-primary transition-colors">المدونة القانونية</Link></li>
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
                  <li><Link href="/syr/ar/blog" className="hover:text-primary transition-colors">المدونة القانونية</Link></li>
                  <li><Link href="/syr/ar/about" className="hover:text-primary transition-colors">من نحن</Link></li>
                  <li><Link href="/syr/ar/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
                  <li><Link href="/syr" className="hover:text-primary transition-colors">English</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">أبرز الخدمات</div>
                <ul className="space-y-2.5">
                  <li><Link href="/sa/ar/services/family-law" className="hover:text-primary transition-colors">قانون الأسرة</Link></li>
                  <li><Link href="/sa/ar/services/employment-law" className="hover:text-primary transition-colors">قانون العمل</Link></li>
                  <li><Link href="/sa/ar/services/real-estate" className="hover:text-primary transition-colors">القانون العقاري</Link></li>
                  <li><Link href="/sa/ar/services/business-law" className="hover:text-primary transition-colors">القانون التجاري</Link></li>
                  <li><Link href="/sa/ar/services/foreign-investment" className="hover:text-primary transition-colors">الاستثمار الأجنبي</Link></li>
                  <li><Link href="/sa/ar/services/criminal-law" className="hover:text-primary transition-colors">القانون الجنائي</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-4">أدلة قانونية</div>
                <ul className="space-y-2.5">
                  <li><Link href="/sa/ar/blog/divorce-in-saudi-arabia" className="hover:text-primary transition-colors">الطلاق في السعودية</Link></li>
                  <li><Link href="/sa/ar/blog/child-custody-saudi-arabia" className="hover:text-primary transition-colors">الحضانة</Link></li>
                  <li><Link href="/sa/ar/blog/wrongful-termination-saudi-labor-law" className="hover:text-primary transition-colors">الفصل التعسفي</Link></li>
                  <li><Link href="/sa/ar/blog/foreign-company-registration-saudi-arabia" className="hover:text-primary transition-colors">تسجيل الشركات</Link></li>
                  <li><Link href="/syr/ar/blog/divorce-in-syria" className="hover:text-primary transition-colors">الطلاق في سوريا</Link></li>
                  <li><Link href="/syr/ar/blog/wrongful-termination-syrian-labor-law" className="hover:text-primary transition-colors">فصل العمال — سوريا</Link></li>
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
    </div>
  );
}
