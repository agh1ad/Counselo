import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
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
      "لم تعد الخدمات القانونية اليوم تقتصر على المكاتب التقليدية أو الحدود الجغرافية. فمع تطور التقنية وتزايد احتياجات الأفراد والشركات، أصبح الوصول إلى المعرفة القانونية الدقيقة والخدمة الاحترافية ضرورة، وليس مجرد خيار.",
    intro:
      "من هذا المنطلق جاءت كاونسلو؛ لتكون منصة قانونية رقمية تجمع بين الخبرة المهنية والتقنية الحديثة، وتقدم خدمات قانونية بمعايير عالية من الجودة والسرية والاحترافية.",
    trust: [
      { stat: "+30", label: "عاماً من الخبرة القانونية" },
      { stat: "رقمي", label: "وصول يتجاوز الحدود" },
      { stat: "عربي · English", label: "دعم قانوني متعدد اللغات" },
    ],
    whyEyebrow: "لماذا أُنشئت كاونسلو؟",
    whyTitle: "خبرة عملية تستجيب لتحديات قانونية حقيقية",
    whyBody:
      "على مدى أكثر من ثلاثين عامًا من الممارسة القانونية، شهدنا العديد من التحديات التي تواجه طالبي الخدمات القانونية، ومن أبرزها صعوبة الوصول إلى المعلومة الموثوقة، واختلاف مستوى الخدمات، وطول الإجراءات، وضعف الاستفادة من التقنيات الحديثة.",
    whyClosing:
      "ومن هنا جاءت فكرة إنشاء منصة يكون هدفها بناء بيئة قانونية رقمية تعتمد على المعرفة والاحترافية قبل أي شيء آخر.",
    challenges: [
      "صعوبة الوصول إلى معلومة قانونية موثوقة وواضحة.",
      "تفاوت مستوى الخدمات وغياب المعايير المتسقة.",
      "طول الإجراءات وضعف التواصل مع العميل.",
      "محدودية الاستفادة من التقنية في العمل القانوني.",
    ],
    visionLabel: "رؤيتنا",
    visionTitle: "المرجع القانوني الرقمي الأكثر موثوقية في العالم العربي",
    visionBody:
      "أن تصبح كاونسلو المرجع القانوني الرقمي الأكثر موثوقية في العالم العربي، ومنصة تجمع بين المعرفة القانونية المتخصصة والخدمات القانونية الاحترافية، بما يواكب التطور التقني ويحقق أعلى معايير الجودة والسرية.",
    missionLabel: "رسالتنا",
    missionTitle: "خبرة ودقة وتقنية، في خدمة قرار قانوني أفضل",
    missionBody:
      "تقديم خدمات قانونية متكاملة تعتمد على الخبرة، والدقة، والتقنية، مع الالتزام بأعلى معايير المهنية، بما يمكّن الأفراد والشركات من الوصول إلى حلول قانونية موثوقة بكفاءة وسهولة.",
    valuesEyebrow: "قيمنا",
    valuesTitle: "قيمنا المهنية",
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
    ecosystemTitle: "ليست مجرد منصة لحجز استشارة قانونية",
    ecosystemBody:
      "بل منظومة قانونية رقمية تضم خدمات وموارد متكاملة للأفراد والشركات.",
    ecosystem: [
      { title: "مقالات ودراسات قانونية متخصصة", description: "معرفة قانونية موثوقة بلغة واضحة.", icon: BookOpen },
      { title: "استشارات قانونية عن بُعد", description: "وصول مهني ومرن أينما كان العميل.", icon: Globe2 },
      { title: "حلول للشركات ورواد الأعمال", description: "دعم قانوني متكامل لقطاع الأعمال.", icon: BriefcaseBusiness },
      { title: "خدمات التقاضي والتحكيم", description: "خبرة في إدارة النزاعات والتمثيل القانوني.", icon: Scale },
      { title: "نماذج وأدلة قانونية", description: "موارد عملية تساعد على الفهم والاستعداد.", icon: Waypoints },
      { title: "دعم قانوني متعدد اللغات", description: "خدمة قانونية تتجاوز حاجز اللغة والمكان.", icon: Languages },
      { title: "استخدام التقنيات الحديثة لتحسين تجربة العميل", description: "أدوات حديثة تعزز السرعة والوضوح والمتابعة.", icon: Sparkles },
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
      "Today, legal services are no longer confined to traditional offices or geographic borders. As technology advances and the needs of individuals and businesses grow, access to accurate legal knowledge and professional service has become a necessity, not merely an option.",
    intro:
      "This is why CounselO was created: to be a digital legal platform that combines professional expertise with modern technology and provides legal services according to high standards of quality, confidentiality, and professionalism.",
    trust: [
      { stat: "30+", label: "Years of legal experience" },
      { stat: "Digital", label: "Access beyond borders" },
      { stat: "Arabic · English", label: "Multilingual legal support" },
    ],
    whyEyebrow: "Why CounselO was created",
    whyTitle: "Practical experience responding to real legal challenges",
    whyBody:
      "Over more than thirty years of legal practice, we have witnessed many of the challenges facing those seeking legal services. Among the most prominent are difficulty accessing reliable information, variations in service quality, lengthy procedures, and the limited use of modern technology.",
    whyClosing:
      "From this came the idea of creating a platform whose purpose is to build a digital legal environment founded on knowledge and professionalism above all else.",
    challenges: [
      "Difficulty finding reliable legal information in clear language.",
      "Inconsistent service quality and professional standards.",
      "Lengthy processes and limited communication with clients.",
      "Legal services that underuse modern technology.",
    ],
    visionLabel: "Our vision",
    visionTitle: "The Arab world's most trusted digital legal reference",
    visionBody:
      "For CounselO to become the most trusted digital legal reference in the Arab world: a platform that brings together specialized legal knowledge and professional legal services, keeps pace with technological development, and achieves the highest standards of quality and confidentiality.",
    missionLabel: "Our mission",
    missionTitle: "Experience, precision, and technology for better legal decisions",
    missionBody:
      "To provide integrated legal services based on expertise, precision, and technology, while adhering to the highest professional standards, enabling individuals and businesses to access reliable legal solutions efficiently and easily.",
    valuesEyebrow: "Our values",
    valuesTitle: "Our professional values",
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
    ecosystemTitle: "Not merely a platform for booking legal consultations",
    ecosystemBody:
      "It is an integrated digital legal ecosystem offering services and resources for individuals and businesses.",
    ecosystem: [
      { title: "Specialized legal articles and studies", description: "Reliable legal knowledge presented in clear language.", icon: BookOpen },
      { title: "Remote legal consultations", description: "Flexible professional access wherever the client is.", icon: Globe2 },
      { title: "Solutions for companies and entrepreneurs", description: "Integrated legal support for businesses.", icon: BriefcaseBusiness },
      { title: "Litigation and arbitration services", description: "Experience in dispute management and legal representation.", icon: Scale },
      { title: "Legal templates and guides", description: "Practical resources that support understanding and preparation.", icon: Waypoints },
      { title: "Multilingual legal support", description: "Legal service that crosses language and geographic barriers.", icon: Languages },
      { title: "Modern technology to improve the client experience", description: "Modern tools that enhance speed, clarity, and follow-up.", icon: Sparkles },
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

      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={regionPrefix} className="transition-colors hover:text-primary">{c.home}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">{c.pageName}</span>
          </nav>

          <article aria-labelledby="vision-title">
            <p className="text-sm font-semibold text-primary">{c.eyebrow}</p>
            <h1 id="vision-title" className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {c.title}
            </h1>
            <div id="vision-summary" className="mt-8 space-y-6 text-lg leading-9 text-foreground/75">
              <p>{c.lead}</p>
              <p>{c.intro}</p>
            </div>

            <section aria-labelledby="why-counselo-title" className="mt-14 rounded-3xl bg-muted/30 p-6 sm:p-8">
              <p className="text-sm font-semibold text-primary">{c.whyEyebrow}</p>
              <h2 id="why-counselo-title" className="mt-3 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {c.whyTitle}
              </h2>
              <p className="mt-5 text-lg leading-9 text-foreground/75">{c.whyBody}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.challenges.map((challenge) => (
                  <li key={challenge} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm leading-7 text-foreground/75">
                    {challenge}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg leading-9 text-foreground/75">{c.whyClosing}</p>
            </section>

            <section aria-labelledby="vision-statement-title" className="mt-14 border-s-2 border-primary ps-6">
              <p className="text-sm font-semibold text-primary">{c.visionLabel}</p>
              <h2 id="vision-statement-title" className="font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {c.visionTitle}
              </h2>
              <p className="mt-5 text-lg leading-9 text-foreground/75">{c.visionBody}</p>
            </section>

            <section aria-labelledby="mission-title" className="mt-14 border-s-2 border-primary ps-6">
              <p className="text-sm font-semibold text-primary">{c.missionLabel}</p>
              <h2 id="mission-title" className="mt-2 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {c.missionTitle}
              </h2>
              <p className="mt-5 text-lg leading-9 text-foreground/75">{c.missionBody}</p>
            </section>

            <section aria-labelledby="values-title" className="mt-14">
              <p className="text-sm font-semibold text-primary">{c.valuesEyebrow}</p>
              <h2 id="values-title" className="mt-3 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {c.valuesTitle}
              </h2>
              <p className="mt-4 text-lg leading-9 text-foreground/75">{c.valuesBody}</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {c.values.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-border p-5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground/65">{description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="ecosystem-title" className="mt-14">
              <p className="text-sm font-semibold text-primary">{c.ecosystemEyebrow}</p>
              <h2 id="ecosystem-title" className="mt-3 font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                {c.ecosystemTitle}
              </h2>
              <p className="mt-4 text-lg leading-9 text-foreground/75">{c.ecosystemBody}</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {c.ecosystem.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="rounded-2xl bg-muted/30 p-5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground/65">{description}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <article className="mt-16 border-t border-border pt-14" aria-labelledby="founder-message-title">
            <p className="text-sm font-semibold text-primary">{c.founderEyebrow}</p>
            <h2 id="founder-message-title" className="sr-only">{c.founderEyebrow}</h2>
            <blockquote id="founder-statement" className="mt-6 font-serif text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
              “{c.founderQuote}”
            </blockquote>
            <div className="mt-8 space-y-5 text-base leading-8 text-foreground/70 sm:text-lg sm:leading-9">
              {c.founderParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <footer className="mt-9">
              <p className="font-semibold text-foreground">{c.founderName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.founderRole}</p>
            </footer>
          </article>
        </div>
      </main>
    </div>
  );
}
