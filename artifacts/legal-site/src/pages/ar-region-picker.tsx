import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function ArRegionPicker() {
  return (
    <div className="min-h-screen bg-[#162b20] text-white" dir="rtl">
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

      {/* ── Top accent bar ────────────────────────────────────────────────── */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #C9A84C 0%, #e8c96a 50%, #C9A84C 100%)" }} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center px-4 pt-16 pb-20 text-center overflow-hidden"
        aria-label="اختيار المنطقة"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        <Link href="/sa/ar">
          <img
            src={counseloLogo}
            alt="كاونسلو — استشارات قانونية أونلاين للسعودية وسوريا"
            className="relative h-20 w-auto object-contain mb-8 hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* credential badge */}
        <div
          className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs tracking-widest"
          style={{ border: "1px solid rgba(201,168,76,0.35)", color: "#C9A84C" }}
        >
          <span style={{ width: "20px", height: "1px", background: "#C9A84C", display: "inline-block" }} />
          مستشار قانوني معتمد · السعودية وسوريا
          <span style={{ width: "20px", height: "1px", background: "#C9A84C", display: "inline-block" }} />
        </div>

        <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-5 leading-tight max-w-3xl">
          استشارة قانونية أونلاين
          <br />
          <span style={{ color: "#C9A84C" }}>السعودية وسوريا</span>
        </h1>

        <p className="relative text-lg mb-10 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          استشارات قانونية احترافية وسرية بالعربية والإنجليزية — ضمان الرد خلال 24 ساعة.
        </p>

        {/* trust badges */}
        <div className="relative flex flex-wrap justify-center gap-4 mb-10">
          {[
            "السرية المهنية بين المحامي والموكّل",
            "ضمان الرد خلال 24 ساعة",
            "بالعربية والإنجليزية",
          ].map((label) => (
            <div
              key={label}
              className="px-4 py-2 text-xs"
              style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)", color: "rgba(255,255,255,0.7)" }}
            >
              {label}
            </div>
          ))}
        </div>

        <p className="relative text-xs mb-5 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>اختر نطاق قضائك</p>

        {/* region cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-6">
          {[
            { href: "/sa/ar",  flag: saudiFlag,  label: "المملكة العربية السعودية", alt: "السعودية — استشارة قانونية" },
            { href: "/syr/ar", flag: syrianFlag, label: "سوريا",                    alt: "سوريا — استشارة قانونية" },
          ].map(({ href, flag, label, alt }) => (
            <Link key={href} href={href}>
              <div
                className="group cursor-pointer flex flex-col items-center gap-4 p-8 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <img
                  src={flag}
                  alt={alt}
                  className="object-cover shadow-lg"
                  style={{ width: "72px", height: "48px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.15)" }}
                />
                <div className="text-white font-semibold text-base">{label}</div>
                <div className="text-xs tracking-widest transition-colors" style={{ color: "rgba(201,168,76,0.6)" }}>
                  ادخل ←
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* language switcher */}
        <div className="relative flex flex-wrap justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          <Link href="/" className="hover:text-white/60 transition-colors">English</Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <Link href="/sa" className="hover:text-white/60 transition-colors">السعودية — إنجليزي</Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <Link href="/syr" className="hover:text-white/60 transition-colors">سوريا — إنجليزي</Link>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section
        aria-label="أبرز أرقام كاونسلو"
        style={{ borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}
        className="py-10 px-4"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "+30",      label: "عاماً من الخبرة القانونية" },
            { stat: "+20,000",  label: "قضية تمت معالجتها" },
            { stat: "24 ساعة", label: "ضمان الرد" },
            { stat: "2",        label: "دولتان: السعودية وسوريا" },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div className="text-3xl md:text-4xl font-serif font-bold mb-1" style={{ color: "#C9A84C" }} dir="ltr">{stat}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founder & About ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20" aria-labelledby="about-heading-ar">
        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* founder card */}
          <div
            className="md:col-span-2 p-8 text-center"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <div
              className="mx-auto mb-5 flex items-center justify-center text-2xl font-serif font-bold"
              style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.08)", color: "#C9A84C" }}
            >
              ع.ب
            </div>
            <div className="text-white font-serif font-bold text-lg mb-1">عمر البغدادي</div>
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "#C9A84C" }}>محامٍ ومستشار قانوني</div>
            <div
              className="text-xs leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}
            >
              أكثر من 30 عاماً من الممارسة القانونية في السعودية وسوريا. متخصص في القانون المدني والتجاري والأسري والإداري.
            </div>
            <a
              href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
              style={{ color: "#C9A84C" }}
              dir="ltr"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn Profile
            </a>
          </div>

          {/* about text */}
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>عن كاونسلو</div>
            <h2 id="about-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-5 leading-snug">
              استشارة قانونية احترافية<br />عبر الإنترنت
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
              <strong className="text-white">كاونسلو</strong> منصة استشارات قانونية إلكترونية أسسها وقادها{" "}
              <strong className="text-white">المحامي والمستشار القانوني عمر البغدادي</strong>، صاحب خبرة تمتد لأكثر من{" "}
              <strong className="text-white">30 عاماً</strong> وأكثر من{" "}
              <strong className="text-white">20,000 قضية</strong> في السعودية وسوريا.
            </p>
            <p className="leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem" }}>
              نجعل الاستشارة القانونية المتخصصة في متناول الجميع — أفراداً وأسراً وشركات — دون الحاجة لزيارة المكتب. الاستشارات عبر الواتساب أو البريد الإلكتروني{" "}
              <strong className="text-white">بالعربية أو الإنجليزية</strong>، مع ضمان الرد{" "}
              <strong className="text-white">خلال 24 ساعة</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "سرية تامة", body: "تُطبَّق قواعد السرية المهنية بين المحامي والموكّل. معلوماتك القانونية لا تُشارَك مع أي طرف ثالث." },
                { title: "رد خلال 24 ساعة", body: "قدّم سؤالك القانوني واحصل على رد متخصص خلال 24 ساعة — والحالات العاجلة تُعطى أولوية." },
                { title: "أونلاين — دون مكتب", body: "استشِر من أي مكان عبر الواتساب أو البريد الإلكتروني. لا تنقل، لا انتظار، لا مواعيد." },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="p-4"
                  style={{ background: "rgba(255,255,255,0.03)", borderRight: "2px solid rgba(201,168,76,0.35)" }}
                >
                  <div className="text-white font-semibold text-sm mb-2">{title}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Areas ────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        aria-labelledby="services-heading-ar"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>الخدمات القانونية</div>
            <h2 id="services-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              مجالات الممارسة القانونية
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>متاحة في المملكة العربية السعودية وسوريا</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {SERVICES.map(({ slug, ar }) => (
              <div
                key={slug}
                className="transition-all duration-150"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <div className="p-4">
                  <div className="font-semibold text-white text-sm mb-3 leading-snug">{ar}</div>
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={`/sa/ar/services/${slug}`}
                      className="text-xs px-2 py-0.5 transition-colors"
                      style={{ color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      SA
                    </Link>
                    <Link
                      href={`/syr/ar/services/${slug}`}
                      className="text-xs px-2 py-0.5 transition-colors"
                      style={{ color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      SYR
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 flex-wrap">
            <Link
              href="/sa/ar/services"
              className="text-sm font-semibold px-6 py-3 transition-opacity hover:opacity-80"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
            >
              جميع خدمات السعودية ←
            </Link>
            <Link
              href="/syr/ar/services"
              className="text-sm font-semibold px-6 py-3 transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
            >
              جميع خدمات سوريا ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20" aria-labelledby="how-heading-ar">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>خطوات بسيطة</div>
          <h2 id="how-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white">
            كيف تعمل المنصة؟
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { step: "01", title: "اختر نطاقك القضائي", body: "اختر المملكة العربية السعودية أو سوريا. لكل منطقة استشارات متخصصة وفق نظامها القانوني وصفحات خدمات مفصّلة." },
            { step: "02", title: "صِف مسألتك القانونية", body: "أرسل سؤالك القانوني عبر الواتساب أو نموذج التواصل بالعربية أو الإنجليزية. يمكنك إرفاق المستندات ذات الصلة." },
            { step: "03", title: "احصل على استشارة متخصصة", body: "يراجع المحامي عمر البغدادي أو أحد أعضاء فريق كاونسلو المؤهلين مسألتك ويرد عليها خلال 24 ساعة." },
          ].map(({ step, title, body }) => (
            <div key={step} className="text-center">
              <div className="text-6xl font-serif font-bold mb-4 leading-none" style={{ color: "rgba(201,168,76,0.12)" }} dir="ltr">{step}</div>
              <h3 className="font-serif font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://wa.me/966592850247"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold px-7 py-3 text-sm transition-opacity hover:opacity-90"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            تواصل عبر الواتساب
          </a>
          <Link
            href="/sa/ar/contact"
            className="font-semibold px-7 py-3 text-sm transition-all hover:bg-white/8"
            style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)" }}
          >
            نموذج التواصل
          </Link>
        </div>
      </section>

      {/* ── Legal Blog ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        aria-labelledby="blog-heading-ar"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>مركز المعرفة</div>
            <h2 id="blog-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              مقالات قانونية مجانية
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              مقالات قانونية معمّقة للسعودية وسوريا
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {BLOG_POSTS.map(({ saSlug, syrSlug, ar }) => (
              <div
                key={saSlug}
                className="p-5 transition-all duration-150"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(201,168,76,0.6)" }}>مقال قانوني</div>
                <h3 className="font-serif font-semibold text-white text-sm leading-snug mb-4">{ar}</h3>
                <div className="flex gap-3">
                  <Link
                    href={`/sa/ar/blog/${saSlug}`}
                    className="text-xs px-3 py-1 transition-colors"
                    style={{ color: "rgba(201,168,76,0.8)", border: "1px solid rgba(201,168,76,0.25)" }}
                  >
                    السعودية ←
                  </Link>
                  <Link
                    href={`/syr/ar/blog/${syrSlug}`}
                    className="text-xs px-3 py-1 transition-colors"
                    style={{ color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    سوريا ←
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 flex-wrap">
            <Link
              href="/sa/ar/blog"
              className="text-sm font-semibold px-6 py-3 transition-opacity hover:opacity-80"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
            >
              مدونة السعودية القانونية ←
            </Link>
            <Link
              href="/syr/ar/blog"
              className="text-sm px-6 py-3 transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
            >
              مدونة سوريا القانونية ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-20" aria-labelledby="faq-heading-ar">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>الدعم</div>
          <h2 id="faq-heading-ar" className="text-2xl md:text-3xl font-serif font-bold text-white">
            الأسئلة الشائعة
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <div
              key={q}
              className="p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRightWidth: "2px", borderRightColor: "rgba(201,168,76,0.4)" }}
            >
              <h3 className="font-serif font-semibold text-white text-sm mb-2">{q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center"
        aria-label="الدعوة للعمل"
        style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.03)" }}
      >
        <div className="max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "#C9A84C" }}>ابدأ الآن</div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            هل أنت مستعد للحصول على استشارة قانونية؟
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
            اختر منطقتك للوصول إلى الخدمات القانونية المتخصصة والمقالات وحجز الاستشارة.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/sa/ar"
              className="font-bold px-10 py-3.5 text-sm transition-opacity hover:opacity-90"
              style={{ background: "#C9A84C", color: "#162b20" }}
            >
              المملكة العربية السعودية ←
            </Link>
            <Link
              href="/syr/ar"
              className="font-bold px-10 py-3.5 text-sm transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              سوريا ←
            </Link>
          </div>
        </div>

        {/* footer nav */}
        <nav
          className="max-w-4xl mx-auto pt-12 text-right"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          aria-label="روابط الموقع"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>السعودية</div>
              <ul className="space-y-2">
                <li><Link href="/sa/ar" className="hover:text-white transition-colors">الرئيسية — SA</Link></li>
                <li><Link href="/sa/ar/services" className="hover:text-white transition-colors">جميع الخدمات</Link></li>
                <li><Link href="/sa/ar/blog" className="hover:text-white transition-colors">المدونة القانونية</Link></li>
                <li><Link href="/sa/ar/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link href="/sa/ar/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
                <li><Link href="/sa" className="hover:text-white transition-colors" dir="ltr">English</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>سوريا</div>
              <ul className="space-y-2">
                <li><Link href="/syr/ar" className="hover:text-white transition-colors">الرئيسية — SYR</Link></li>
                <li><Link href="/syr/ar/services" className="hover:text-white transition-colors">جميع الخدمات</Link></li>
                <li><Link href="/syr/ar/blog" className="hover:text-white transition-colors">المدونة القانونية</Link></li>
                <li><Link href="/syr/ar/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link href="/syr/ar/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
                <li><Link href="/syr" className="hover:text-white transition-colors" dir="ltr">English</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>أبرز الخدمات</div>
              <ul className="space-y-2">
                <li><Link href="/sa/ar/services/family-law" className="hover:text-white transition-colors">قانون الأسرة</Link></li>
                <li><Link href="/sa/ar/services/employment-law" className="hover:text-white transition-colors">قانون العمل</Link></li>
                <li><Link href="/sa/ar/services/real-estate" className="hover:text-white transition-colors">القانون العقاري</Link></li>
                <li><Link href="/sa/ar/services/business-law" className="hover:text-white transition-colors">القانون التجاري</Link></li>
                <li><Link href="/sa/ar/services/foreign-investment" className="hover:text-white transition-colors">الاستثمار الأجنبي</Link></li>
                <li><Link href="/sa/ar/services/criminal-law" className="hover:text-white transition-colors">القانون الجنائي</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>مقالات قانونية</div>
              <ul className="space-y-2">
                <li><Link href="/sa/ar/blog/divorce-in-saudi-arabia" className="hover:text-white transition-colors">الطلاق في المملكة</Link></li>
                <li><Link href="/sa/ar/blog/child-custody-saudi-arabia" className="hover:text-white transition-colors">الحضانة في المملكة</Link></li>
                <li><Link href="/sa/ar/blog/wrongful-termination-saudi-labor-law" className="hover:text-white transition-colors">الفصل التعسفي</Link></li>
                <li><Link href="/sa/ar/blog/foreign-company-registration-saudi-arabia" className="hover:text-white transition-colors">تسجيل شركة أجنبية</Link></li>
                <li><Link href="/syr/ar/blog/divorce-in-syria" className="hover:text-white transition-colors">الطلاق في سوريا</Link></li>
                <li><Link href="/syr/ar/blog/wrongful-termination-syrian-labor-law" className="hover:text-white transition-colors">الفصل التعسفي — سوريا</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="max-w-4xl mx-auto mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)" }}
        >
          <span>© 2026 كاونسلو. جميع الحقوق محفوظة.</span>
          <div className="flex gap-4">
            <Link href="/sa/ar/privacy-policy" className="hover:text-white/50 transition-colors">سياسة الخصوصية</Link>
            <span>·</span>
            <Link href="/sa/ar/terms-of-service" className="hover:text-white/50 transition-colors">شروط الخدمة</Link>
            <span>·</span>
            <a href="https://www.linkedin.com/in/lawyeromarbaghdadi/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors" dir="ltr">LinkedIn</a>
          </div>
        </div>
      </section>
    </div>
  );
}
