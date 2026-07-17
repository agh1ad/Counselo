import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Eye,
  Globe2,
  Languages,
  Lightbulb,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
  Waypoints,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const founderPhoto = "/images/optimized/omar-founder-bio.png";
const visionArtwork = "/images/optimized/counselo-vision-manifesto.svg";

type ValueItem = { title: string; description: string; icon: LucideIcon };
type EcosystemItem = { title: string; description: string; icon: LucideIcon };

const copy = {
  ar: {
    seoTitle: "رؤيتنا لمنصة قانونية رقمية موثوقة | كاونسلو",
    seoDescription:
      "تعرّف على رؤية كاونسلو ورسالتها وقيمها لبناء مرجع قانوني رقمي عربي موثوق يجمع الخبرة القانونية والتقنية والسرية المهنية.",
    seoKeywords:
      "رؤية كاونسلو, منصة قانونية رقمية, مرجع قانوني عربي, خدمات قانونية إلكترونية, استشارات قانونية موثوقة, عمر رياض بغدادي",
    eyebrow: "رؤيتنا",
    title: "القانون… أقرب، أوضح، وأكثر موثوقية",
    lead:
      "لم تعد الخدمات القانونية تقتصر على المكاتب التقليدية أو الحدود الجغرافية. ومع تطور التقنية وتزايد احتياجات الأفراد والشركات، أصبح الوصول إلى المعرفة القانونية الدقيقة والخدمة الاحترافية ضرورة، لا مجرد خيار.",
    intro:
      "من هذا المنطلق جاءت كاونسلو: منصة قانونية رقمية تجمع بين الخبرة المهنية والتقنية الحديثة، وتقدّم المعرفة والخدمات القانونية وفق معايير عالية من الجودة والسرية والاحترافية.",
    trust: [
      { stat: "+30", label: "عاماً من الخبرة القانونية" },
      { stat: "رقمي", label: "وصول يتجاوز الحدود" },
      { stat: "عربي · English", label: "دعم قانوني متعدد اللغات" },
    ],
    whyEyebrow: "لماذا أُنشئت كاونسلو؟",
    whyTitle: "حلّ تحديات قانونية حقيقية، بخبرة عملية",
    whyBody:
      "على مدى أكثر من ثلاثين عاماً من الممارسة القانونية، لمس مؤسس كاونسلو تحديات متكررة لدى طالبي الخدمات القانونية. لذلك بُنيت المنصة حول المعرفة والاحترافية قبل أي شيء آخر.",
    challenges: [
      "صعوبة الوصول إلى معلومة قانونية موثوقة وواضحة.",
      "تفاوت مستوى الخدمات وغياب المعايير المتسقة.",
      "طول الإجراءات وضعف التواصل مع العميل.",
      "محدودية الاستفادة من التقنية في العمل القانوني.",
    ],
    visionLabel: "رؤيتنا",
    visionTitle: "المرجع القانوني الرقمي الأكثر موثوقية في العالم العربي",
    visionBody:
      "أن تصبح كاونسلو منصة تجمع المعرفة القانونية المتخصصة والخدمات القانونية الاحترافية، بما يواكب التطور التقني ويحقق أعلى معايير الجودة والسرية وسهولة الوصول.",
    missionLabel: "رسالتنا",
    missionTitle: "خبرة ودقة وتقنية، في خدمة قرار قانوني أفضل",
    missionBody:
      "تقديم خدمات قانونية متكاملة تعتمد على الخبرة والدقة والتقنية، مع الالتزام بأعلى معايير المهنية؛ لتمكين الأفراد والشركات من الوصول إلى حلول قانونية موثوقة بكفاءة وسهولة.",
    valuesEyebrow: "ما نؤمن به",
    valuesTitle: "قيم تحكم كل معرفة وخدمة نقدمها",
    valuesBody:
      "ليست قيماً معلّقة على الجدار؛ بل معايير عمل تَظهر في طريقة تعاملنا مع معلومات العميل، وصياغة الرأي القانوني، وتطوير تجربة الخدمة.",
    values: [
      { title: "الاحترافية", description: "منهج واضح ومعايير ثابتة في كل مرحلة.", icon: BriefcaseBusiness },
      { title: "النزاهة", description: "رأي قانوني مستقل وصريح يخدم مصلحة العميل.", icon: Scale },
      { title: "السرية", description: "حماية المعلومات والالتزام الصارم بالخصوصية المهنية.", icon: LockKeyhole },
      { title: "الدقة", description: "بحث متأنٍ وتفاصيل موثقة قبل تقديم التوجيه.", icon: Target },
      { title: "الابتكار", description: "تسخير التقنية لرفع جودة الوصول والخدمة.", icon: Lightbulb },
      { title: "التطوير المستمر", description: "معرفة تتجدد مع الأنظمة والممارسة والتقنية.", icon: Sparkles },
      { title: "احترام العميل", description: "تواصل واضح، ووقت مقدّر، وتجربة إنسانية.", icon: UserRoundCheck },
      { title: "المسؤولية المهنية", description: "التزام واعٍ بأثر كل رأي وإجراء قانوني.", icon: ShieldCheck },
    ] as ValueItem[],
    ecosystemEyebrow: "ما الذي يميز كاونسلو؟",
    ecosystemTitle: "أكثر من منصة لحجز استشارة",
    ecosystemBody:
      "كاونسلو منظومة قانونية رقمية صُمّمت لترافق الأفراد والشركات من المعرفة الأولية إلى الحل القانوني المتخصص.",
    ecosystem: [
      { title: "معرفة قانونية متخصصة", description: "مقالات ودراسات وأدلة عملية بلغة واضحة.", icon: BookOpen },
      { title: "استشارات عن بُعد", description: "وصول مهني ومرن أينما كان العميل.", icon: Globe2 },
      { title: "حلول للأعمال", description: "دعم قانوني للشركات ورواد الأعمال والمستثمرين.", icon: BriefcaseBusiness },
      { title: "التقاضي والتحكيم", description: "خبرة في إدارة النزاعات والتمثيل القانوني.", icon: Scale },
      { title: "نماذج وأدلة", description: "موارد عملية تساعد على الفهم والاستعداد.", icon: Waypoints },
      { title: "دعم متعدد اللغات", description: "خدمة قانونية تتجاوز حاجز اللغة والمكان.", icon: Languages },
      { title: "تجربة مدعومة بالتقنية", description: "أدوات حديثة لتحسين السرعة والوضوح والمتابعة.", icon: Sparkles },
    ] as EcosystemItem[],
    founderEyebrow: "كلمة المؤسس",
    founderQuote:
      "قوة المحامي لا تُقاس فقط بقدرته على كسب القضايا، بل بقدرته على بناء الثقة، وتقديم المعرفة، وإيجاد الحلول قبل نشوء النزاعات.",
    founderParagraphs: [
      "عندما بدأت رحلتي في العمل القانوني قبل أكثر من ثلاثين عاماً، ترسخت لديّ قناعة بأن الخدمة القانونية الحقيقية تبدأ بالفهم والثقة، لا بالإجراء وحده.",
      "واليوم تمثل كاونسلو امتداداً لهذه القناعة؛ مشروعاً يسخّر الخبرة القانونية والتقنية لخدمة الأفراد والشركات، ويضع الجودة والموثوقية معياراً أول لكل ما يقدمه.",
      "لا تتمثل رؤيتي في إنشاء منصة تقدم خدمات قانونية فحسب، بل في بناء مرجع قانوني رقمي يضيف قيمة حقيقية للمجتمع القانوني، ويجعل الوصول إلى المعرفة والخدمة الاحترافية أكثر سهولة وكفاءة.",
    ],
    founderName: "عمر رياض بغدادي",
    founderRole: "المحامي والمستشار القانوني · المؤسس",
    founderImageAlt: "المحامي والمستشار القانوني عمر رياض بغدادي، مؤسس كاونسلو",
    ctaEyebrow: "معرفة أوضح. قرار أكثر ثقة.",
    ctaTitle: "ابدأ خطوتك القانونية مع كاونسلو",
    ctaBody:
      "شاركنا مسألتك بسرية، وسيقوم فريق كاونسلو بمراجعتها وتوجيهك إلى المسار القانوني الأنسب.",
    ctaPrimary: "ابدأ استشارة",
    ctaSecondary: "تعرّف على المؤسس",
    home: "الرئيسية",
    pageName: "رؤيتنا",
  },
  en: {
    seoTitle: "Our Vision for Trusted Digital Legal Services | CounselO",
    seoDescription:
      "Discover CounselO's vision, mission and values: building a trusted Arab digital legal reference grounded in experience, technology and confidentiality.",
    seoKeywords:
      "CounselO vision, digital legal platform, Arab legal reference, online legal services, trusted legal consultation, Omar Riyad Al-Baghdadi",
    eyebrow: "Our Vision",
    title: "Law—closer, clearer, and more trustworthy",
    lead:
      "Legal services are no longer confined to traditional offices or geographic borders. As technology advances and the needs of people and businesses grow, access to accurate legal knowledge and professional service has become essential—not optional.",
    intro:
      "CounselO was created for that reality: a digital legal platform that brings professional experience and modern technology together, delivering legal knowledge and services to high standards of quality, confidentiality, and professionalism.",
    trust: [
      { stat: "30+", label: "Years of legal experience" },
      { stat: "Digital", label: "Access beyond borders" },
      { stat: "Arabic · English", label: "Multilingual legal support" },
    ],
    whyEyebrow: "Why CounselO was created",
    whyTitle: "Solving real legal-service challenges with practical experience",
    whyBody:
      "Across more than three decades of legal practice, CounselO's founder saw the same barriers facing people who needed legal help. The platform was therefore built around knowledge and professionalism first.",
    challenges: [
      "Difficulty finding reliable legal information in clear language.",
      "Inconsistent service quality and professional standards.",
      "Lengthy processes and limited communication with clients.",
      "Legal services that underuse modern technology.",
    ],
    visionLabel: "Our vision",
    visionTitle: "The Arab world's most trusted digital legal reference",
    visionBody:
      "To make CounselO the platform where specialized legal knowledge and professional legal services meet—keeping pace with technology while delivering the highest standards of quality, confidentiality, and accessibility.",
    missionLabel: "Our mission",
    missionTitle: "Experience, precision, and technology for better legal decisions",
    missionBody:
      "To provide integrated legal services grounded in experience, accuracy, and technology, with an unwavering commitment to professional standards—helping individuals and businesses reach reliable legal solutions efficiently and easily.",
    valuesEyebrow: "What we believe",
    valuesTitle: "Values that govern every insight and service we provide",
    valuesBody:
      "These are not words on a wall. They are working standards reflected in how we protect client information, form legal opinions, communicate, and improve the service experience.",
    values: [
      { title: "Professionalism", description: "A clear method and consistent standards at every stage.", icon: BriefcaseBusiness },
      { title: "Integrity", description: "Independent, candid advice focused on the client's interests.", icon: Scale },
      { title: "Confidentiality", description: "Strict protection of information and professional privacy.", icon: LockKeyhole },
      { title: "Precision", description: "Careful research and verified detail before guidance is given.", icon: Target },
      { title: "Innovation", description: "Technology used purposefully to improve access and service.", icon: Lightbulb },
      { title: "Continuous improvement", description: "Knowledge that evolves with law, practice, and technology.", icon: Sparkles },
      { title: "Respect for clients", description: "Clear communication, valued time, and a human experience.", icon: UserRoundCheck },
      { title: "Professional responsibility", description: "Careful ownership of every legal opinion and action.", icon: ShieldCheck },
    ] as ValueItem[],
    ecosystemEyebrow: "What makes CounselO different",
    ecosystemTitle: "More than a consultation-booking platform",
    ecosystemBody:
      "CounselO is a digital legal ecosystem designed to support individuals and businesses from initial understanding through to specialized legal solutions.",
    ecosystem: [
      { title: "Specialized legal knowledge", description: "Articles, studies, and practical guides in clear language.", icon: BookOpen },
      { title: "Remote consultations", description: "Flexible professional access wherever the client is.", icon: Globe2 },
      { title: "Business solutions", description: "Legal support for companies, founders, and investors.", icon: BriefcaseBusiness },
      { title: "Litigation and arbitration", description: "Experience in disputes and legal representation.", icon: Scale },
      { title: "Templates and guides", description: "Practical resources for understanding and preparation.", icon: Waypoints },
      { title: "Multilingual support", description: "Legal service that crosses language and location barriers.", icon: Languages },
      { title: "Technology-enabled experience", description: "Modern tools that improve speed, clarity, and follow-up.", icon: Sparkles },
    ] as EcosystemItem[],
    founderEyebrow: "A word from the founder",
    founderQuote:
      "A lawyer's strength is measured not only by the ability to win cases, but by the ability to build trust, share knowledge, and find solutions before disputes arise.",
    founderParagraphs: [
      "When I began my legal career more than thirty years ago, I came to believe that meaningful legal service starts with understanding and trust—not procedure alone.",
      "Today, CounselO extends that conviction: a project that puts legal experience and technology to work for individuals and businesses, with quality and reliability as the first measure of everything it provides.",
      "My vision is not simply to create another legal-services platform. It is to build a digital legal reference that brings real value to the legal community and makes professional knowledge and service easier and more efficient to access.",
    ],
    founderName: "Omar Riyad Al-Baghdadi",
    founderRole: "Lawyer & Legal Counsel · Founder",
    founderImageAlt: "Lawyer and Legal Counsel Omar Riyad Al-Baghdadi, founder of CounselO",
    ctaEyebrow: "Clearer knowledge. More confident decisions.",
    ctaTitle: "Take your next legal step with CounselO",
    ctaBody:
      "Share your matter confidentially. The CounselO team will review it and guide you toward the most appropriate legal path.",
    ctaPrimary: "Start a consultation",
    ctaSecondary: "Meet the founder",
    home: "Home",
    pageName: "Our Vision",
  },
} as const;

export default function Vision() {
  const { isRTL } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const c = isRTL ? copy.ar : copy.en;
  const languageCode = isRTL
    ? region === "syr"
      ? "ar-SY"
      : "ar-SA"
    : region === "syr"
      ? "en-SY"
      : "en-SA";
  const pageUrl = `https://counselo-legal.com${regionPrefix}/vision`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: c.pageName,
      description: c.seoDescription,
      inLanguage: languageCode,
      dateModified: "2026-07-18",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://counselo-legal.com/#website",
        name: "CounselO",
        url: "https://counselo-legal.com/",
      },
      about: { "@id": "https://counselo-legal.com/#organization" },
      author: { "@id": "https://counselo-legal.com/#founder" },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#vision-title", "#vision-summary", "#founder-statement"],
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://counselo-legal.com/#organization",
      name: "CounselO",
      alternateName: "كاونسلو",
      url: "https://counselo-legal.com/",
      logo: "https://counselo-legal.com/logo.png",
      slogan: isRTL
        ? "القانون… أقرب، أوضح، وأكثر موثوقية"
        : "Law—closer, clearer, and more trustworthy",
      founder: { "@id": "https://counselo-legal.com/#founder" },
      knowsLanguage: ["ar", "en"],
      areaServed: {
        "@type": "Country",
        name: region === "syr" ? "Syria" : "Saudi Arabia",
      },
      email: "info@counselo-legal.com",
      telephone: "+966594850247",
      sameAs: ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://counselo-legal.com/#founder",
      name: "Omar Riyad Al-Baghdadi",
      alternateName: "عمر رياض بغدادي",
      jobTitle: isRTL ? "محامٍ ومستشار قانوني" : "Lawyer & Legal Counsel",
      image: "https://counselo-legal.com/omar-baghdadi.jpg",
      worksFor: { "@id": "https://counselo-legal.com/#organization" },
      sameAs: ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: c.home,
          item: `https://counselo-legal.com${regionPrefix}`,
        },
        { "@type": "ListItem", position: 2, name: c.pageName, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/vision"
        keywords={c.seoKeywords}
        schema={schema}
      />

      <section className="relative isolate bg-[#00351f] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 88%)",
          }}
        />
        <div aria-hidden="true" className="absolute -end-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#0c8a52]/30 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-0 start-[12%] -z-10 h-px w-3/4 bg-gradient-to-r from-transparent via-[#d8bd79]/70 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 md:pb-32 md:pt-28 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-14 flex items-center gap-2 text-xs text-white/55">
            <Link href={regionPrefix} className="transition-colors hover:text-white">{c.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#d8bd79]">{c.pageName}</span>
          </nav>

          <div className="grid items-end gap-14 lg:grid-cols-[1fr_20rem]">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-3 border border-[#d8bd79]/35 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#e3ca8c]">
                <Compass className="h-4 w-4" aria-hidden="true" />
                {c.eyebrow}
              </div>
              <h1 id="vision-title" className="max-w-4xl text-balance font-serif text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
                {c.title}
              </h1>
              <p id="vision-summary" className="mt-8 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
                {c.lead}
              </p>
            </div>

            <div className="border-s border-[#d8bd79]/45 ps-6 lg:mb-2">
              <p className="text-sm leading-7 text-white/65">{c.intro}</p>
              <div className="mt-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d8bd79]">
                <span className="h-px w-8 bg-[#d8bd79]" />
                CounselO · كاونسلو
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={isRTL ? "مؤشرات الثقة" : "Trust indicators"} className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid border border-border bg-white shadow-[0_24px_70px_rgba(0,53,31,0.12)] sm:grid-cols-3">
          {c.trust.map((item, index) => (
            <div key={item.label} className={`px-7 py-7 ${index ? "border-t border-border sm:border-s sm:border-t-0" : ""}`}>
              <div className="font-serif text-2xl font-bold text-primary">{item.stat}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white pb-8 pt-16 sm:pb-12 sm:pt-20" aria-label={isRTL ? "رؤية كاونسلو" : "CounselO vision"}>
        <figure className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-[#d9c58e]/55 bg-[#00351f] shadow-[0_24px_70px_rgba(0,53,31,0.13)]">
            <img
              src={visionArtwork}
              alt={isRTL ? "رؤيتنا في كاونسلو — طريق نحو معرفة قانونية أوضح وأكثر موثوقية" : "Our Vision at CounselO — a path toward clearer, more trusted legal knowledge"}
              width="1440"
              height="756"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
        </figure>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{c.whyEyebrow}</p>
            <h2 className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">{c.whyTitle}</h2>
            <p className="mt-7 text-lg leading-8 text-muted-foreground">{c.whyBody}</p>
          </div>
          <ol className="grid gap-px bg-border sm:grid-cols-2">
            {c.challenges.map((challenge, index) => (
              <li key={challenge} className="group bg-white p-7 transition-colors hover:bg-card">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-primary/20">0{index + 1}</span>
                  <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <p className="leading-7 text-foreground/80">{challenge}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#f3f8f5] py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="relative overflow-hidden bg-primary p-9 text-white sm:p-12">
            <Eye className="absolute -end-8 -top-8 h-44 w-44 text-white/[0.06]" aria-hidden="true" />
            <div className="relative">
              <div className="mb-10 flex h-12 w-12 items-center justify-center border border-white/25 bg-white/10">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">{c.visionLabel}</p>
              <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight sm:text-4xl">{c.visionTitle}</h2>
              <p className="mt-7 leading-8 text-white/75">{c.visionBody}</p>
            </div>
          </article>
          <article className="relative overflow-hidden border border-[#d9c58e]/55 bg-[#fbf7ed] p-9 text-[#173326] sm:p-12">
            <Target className="absolute -end-8 -top-8 h-44 w-44 text-[#a17d2b]/[0.07]" aria-hidden="true" />
            <div className="relative">
              <div className="mb-10 flex h-12 w-12 items-center justify-center border border-[#b69342]/35 bg-white/70">
                <Target className="h-6 w-6 text-[#8e6b1d]" aria-hidden="true" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8e6b1d]">{c.missionLabel}</p>
              <h2 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight sm:text-4xl">{c.missionTitle}</h2>
              <p className="mt-7 leading-8 text-[#385546]">{c.missionBody}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{c.valuesEyebrow}</p>
              <h2 className="mt-4 text-balance font-serif text-4xl font-bold sm:text-5xl">{c.valuesTitle}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">{c.valuesBody}</p>
          </div>

          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((value, index) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="group min-h-64 bg-white p-7 transition-all hover:-translate-y-1 hover:bg-[#f6faf7] hover:shadow-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-serif text-sm text-primary/30">0{index + 1}</span>
                  </div>
                  <h3 className="mt-9 text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#062f20] py-24 text-white sm:py-32">
        <div aria-hidden="true" className="absolute inset-y-0 end-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(37,139,86,.28),transparent_68%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8bd79]">{c.ecosystemEyebrow}</p>
            <h2 className="mt-4 text-balance font-serif text-4xl font-bold sm:text-5xl">{c.ecosystemTitle}</h2>
            <p className="mt-7 text-lg leading-8 text-white/65">{c.ecosystemBody}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.ecosystem.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={`${index === c.ecosystem.length - 1 ? "sm:col-span-2" : ""} border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-[#d8bd79]/35 hover:bg-white/[0.07]`}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-[#d8bd79]/25 text-[#d8bd79]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/55">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ec] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden border border-[#d9cda9] bg-white md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr]">
            <div className="relative aspect-[2/3] min-h-0 bg-[#dce8e0] md:aspect-auto">
              <img
                src={founderPhoto}
                alt={c.founderImageAlt}
                width="720"
                height="900"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center md:object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#032a1a] via-[#032a1a]/85 to-transparent px-7 pb-7 pt-24 text-white">
                <div className="font-serif text-xl font-bold">{c.founderName}</div>
                <div className="mt-1 text-sm text-white/65">{c.founderRole}</div>
              </div>
            </div>
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{c.founderEyebrow}</p>
              <blockquote id="founder-statement" className="relative mt-8 border-s-2 border-[#b89443] ps-7 font-serif text-2xl font-bold leading-relaxed text-[#173326] sm:text-3xl">
                “{c.founderQuote}”
              </blockquote>
              <div className="mt-9 space-y-5 text-base leading-8 text-muted-foreground">
                {c.founderParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <a
                href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
                target="_blank"
                rel="noopener noreferrer me"
                className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{c.ctaEyebrow}</p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-bold sm:text-5xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{c.ctaBody}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`${regionPrefix}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004f29]">
              {c.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 rtl:rotate-[-90deg]" aria-hidden="true" />
            </Link>
            <Link href={`${regionPrefix}/about`} className="inline-flex min-h-12 items-center justify-center border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
