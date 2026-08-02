import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import {
  getUaeService,
  UAE_CATEGORIES,
  UAE_SERVICES,
  type UaeLegalService,
} from "@/data/uae-legal-services";

const WHATSAPP = "https://wa.me/966594850247";
const EMAIL = "mailto:info@counselo-legal.com";

const copy = {
  en: {
    eyebrow: "UAE LAW · ONLINE LEGAL GUIDANCE",
    hero: "UAE legal guidance, without the office visit.",
    heroBody:
      "Clear, confidential legal support for people and businesses across the Emirates—grounded in the applicable federal, emirate-level and free-zone framework.",
    start: "Start a consultation",
    explore: "Explore legal services",
    trust: "Arabic & English · Confidential · Lawyer-led · UAE-focused",
    choose: "Tell us where to begin",
    chooseBody: "Select the area closest to your matter. We will confirm scope, jurisdiction and the appropriate next step before work begins.",
    select: "Select a legal area",
    servicesEyebrow: "COMPLETE UAE COVERAGE",
    servicesTitle: "Legal services built around the UAE system.",
    servicesBody: "From formation and contracts to family, courts and regulated sectors, each service starts with the governing jurisdiction and competent authority.",
    all: "All services",
    view: "View service",
    processEyebrow: "A CLEAR DIGITAL PROCESS",
    processTitle: "From question to legal direction.",
    jurisdictionEyebrow: "JURISDICTION MATTERS",
    jurisdictionTitle: "One country. Several legal environments.",
    jurisdictionBody: "We identify whether a matter belongs under federal or local rules, a mainland authority, a free zone, DIFC or ADGM before recommending a route.",
    steps: [
      ["01", "Describe the matter", "Share the facts, documents and deadline through a secure online channel."],
      ["02", "We identify the framework", "We assess emirate, authority, applicable law and forum."],
      ["03", "Scope and fee confirmed", "You receive a clear scope, deliverable and fee before legal work starts."],
      ["04", "Receive practical guidance", "Get a structured analysis, recommended steps and follow-up options."],
    ],
  },
  ar: {
    eyebrow: "قانون الإمارات · إرشاد قانوني عن بُعد",
    hero: "إرشاد قانوني إماراتي، دون زيارة المكتب.",
    heroBody:
      "دعم قانوني واضح وسري للأفراد والأعمال في جميع الإمارات، وفق الإطار الاتحادي والمحلي وأنظمة المناطق الحرة المنطبقة.",
    start: "ابدأ استشارتك",
    explore: "استكشف الخدمات القانونية",
    trust: "العربية والإنجليزية · سري · بإشراف قانوني · مختص بالإمارات",
    choose: "أخبرنا من أين نبدأ",
    chooseBody: "اختر المجال الأقرب لمسألتك. نؤكد النطاق والاختصاص والخطوة المناسبة قبل بدء العمل.",
    select: "اختر المجال القانوني",
    servicesEyebrow: "تغطية قانونية شاملة في الإمارات",
    servicesTitle: "خدمات مبنية حول النظام القانوني الإماراتي.",
    servicesBody: "من التأسيس والعقود إلى الأسرة والمحاكم والقطاعات المنظمة، تبدأ كل خدمة بتحديد الاختصاص والجهة المختصة.",
    all: "جميع الخدمات",
    view: "عرض الخدمة",
    processEyebrow: "مسار رقمي واضح",
    processTitle: "من السؤال إلى التوجيه القانوني.",
    jurisdictionEyebrow: "الاختصاص مهم",
    jurisdictionTitle: "دولة واحدة وبيئات قانونية متعددة.",
    jurisdictionBody: "نحدد ما إذا كانت المسألة تخضع لقواعد اتحادية أو محلية، أو لجهة في البرّ الرئيسي أو منطقة حرة أو مركز دبي المالي أو أبوظبي العالمي قبل التوصية بالمسار.",
    steps: [
      ["٠١", "صف المسألة", "شارك الوقائع والوثائق والموعد عبر قناة إلكترونية آمنة."],
      ["٠٢", "نحدد الإطار", "نقيّم الإمارة والجهة والقانون الواجب التطبيق والمنتدى المختص."],
      ["٠٣", "تأكيد النطاق والأتعاب", "تتلقى نطاقاً واضحاً ومخرجاً متوقعاً وأتعاباً قبل بدء العمل."],
      ["٠٤", "استلم توجيهاً عملياً", "تحصل على تحليل منظم وخطوات موصى بها وخيارات المتابعة."],
    ],
  },
} as const;

function useUaeCopy() {
  const { lang, isRTL } = useLanguage();
  return { lang, isRTL, c: copy[lang] };
}

function Arrow({ rtl }: { rtl: boolean }) {
  return rtl ? <ArrowLeft aria-hidden="true" /> : <ArrowRight aria-hidden="true" />;
}

function LegalServiceSchema({ service, lang }: { service: UaeLegalService; lang: "en" | "ar" }) {
  const { regionPrefix } = useRegion();
  return (
    <SEOHead
      title={service.title[lang]}
      description={service.overview[lang]}
      canonical={`/services/${service.slug}`}
      keywords={`${service.title[lang]}, UAE law, UAE lawyer, online legal consultation UAE, CounselO`}
      schema={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title[lang],
          description: service.overview[lang],
          url: `https://counselo-legal.com${regionPrefix}/services/${service.slug}`,
          areaServed: { "@type": "Country", name: "United Arab Emirates" },
          provider: { "@type": "LegalService", name: "CounselO", url: "https://counselo-legal.com/uae" },
          availableLanguage: ["Arabic", "English"],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: lang === "ar" ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regionPrefix}` },
            { "@type": "ListItem", position: 2, name: lang === "ar" ? "الخدمات" : "Services", item: `https://counselo-legal.com${regionPrefix}/services` },
            { "@type": "ListItem", position: 3, name: service.title[lang] },
          ],
        },
      ]}
    />
  );
}

export function UaeHome() {
  const { lang, isRTL, c } = useUaeCopy();
  const { regionPrefix } = useRegion();
  const [selected, setSelected] = useState(UAE_SERVICES[0].slug);
  const [category, setCategory] = useState<keyof typeof UAE_CATEGORIES | "all">("all");
  const visible = useMemo(
    () => category === "all" ? UAE_SERVICES : UAE_SERVICES.filter((service) => service.category === category),
    [category],
  );
  const selectedService = getUaeService(selected) ?? UAE_SERVICES[0];

  const faq = lang === "ar"
    ? [
        ["هل تغطي خدمات كاونسلو جميع الإمارات؟", "نعم. نبدأ بتحديد الإمارة والجهة أو المنطقة الحرة المختصة لأن الإجراءات والجهات قد تختلف بحسب الموقع ونوع المسألة."],
        ["هل تختلف قواعد مركز دبي المالي وأبوظبي العالمي؟", "قد تنطبق في DIFC وADGM أطر قضائية وتنظيمية متميزة. نحدد النظام والمنتدى المختص قبل تقديم التوجيه."],
        ["هل الاستشارة متاحة بالعربية والإنجليزية؟", "نعم، تجربة الموقع والاستشارات متاحة باللغتين العربية والإنجليزية."],
      ]
    : [
        ["Does CounselO cover every emirate?", "Yes. We first identify the emirate, authority or free zone involved because procedures and competent bodies can vary by location and subject."],
        ["Are DIFC and ADGM rules different?", "DIFC and ADGM can have distinct court and regulatory frameworks. We identify the governing regime and forum before advising."],
        ["Can I consult in Arabic or English?", "Yes. The site and legal consultation journey are available in both Arabic and English."],
      ];

  return (
    <div className="uae-site">
      <SEOHead
        title={lang === "ar" ? "استشارات قانونية في الإمارات أونلاين" : "UAE Online Legal Consultation"}
        description={lang === "ar" ? "استشارات قانونية إماراتية سرية للأفراد والشركات في جميع الإمارات، بالعربية والإنجليزية، وفق الاختصاص والقانون المنطبق." : "Confidential UAE legal guidance for individuals and businesses across the Emirates, in Arabic and English, grounded in the applicable jurisdiction and law."}
        canonical="/"
        keywords={lang === "ar" ? "استشارة قانونية الإمارات, محامي أونلاين الإمارات, قانون الشركات الإماراتي, قانون العمل الإماراتي" : "UAE legal consultation, online lawyer UAE, UAE company law, UAE employment law, Dubai legal advice, Abu Dhabi lawyer"}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "CounselO UAE",
            url: "https://counselo-legal.com/uae",
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
            availableLanguage: ["Arabic", "English"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "UAE Legal Services",
              itemListElement: UAE_SERVICES.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title[lang], url: `https://counselo-legal.com${regionPrefix}/services/${service.slug}` } })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{ "@type": "ListItem", position: 1, name: lang === "ar" ? "كاونسلو الإمارات" : "CounselO UAE", item: `https://counselo-legal.com${regionPrefix}` }],
          },
        ]}
      />

      <section className="uae-hero" aria-labelledby="uae-hero-title">
        <div className="uae-shell uae-hero-grid">
          <div className="uae-hero-copy">
            <p className="uae-eyebrow">{c.eyebrow}</p>
            <h1 id="uae-hero-title">{c.hero}</h1>
            <p className="uae-lede">{c.heroBody}</p>
            <div className="uae-actions">
              <Link href={`${regionPrefix}/contact`} className="uae-btn uae-btn-primary">{c.start}<Arrow rtl={isRTL} /></Link>
              <Link href={`${regionPrefix}/services`} className="uae-btn uae-btn-quiet">{c.explore}</Link>
            </div>
            <p className="uae-trust"><ShieldCheck aria-hidden="true" />{c.trust}</p>
          </div>

          <aside className="uae-intake" aria-labelledby="intake-title">
            <div className="uae-intake-head">
              <span>01</span>
              <div><h2 id="intake-title">{c.choose}</h2><p>{c.chooseBody}</p></div>
            </div>
            <label htmlFor="uae-service-select">{c.select}</label>
            <select id="uae-service-select" value={selected} onChange={(event) => setSelected(event.target.value)}>
              {UAE_SERVICES.map((service) => <option key={service.slug} value={service.slug}>{service.title[lang]}</option>)}
            </select>
            <div className="uae-intake-result">
              <p>{selectedService.short[lang]}</p>
              <Link href={`${regionPrefix}/contact?service=${selectedService.slug}`}>{c.start}<Arrow rtl={isRTL} /></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="uae-services-band" aria-labelledby="uae-services-title">
        <div className="uae-shell">
          <div className="uae-section-intro">
            <p className="uae-eyebrow">{c.servicesEyebrow}</p>
            <h2 id="uae-services-title">{c.servicesTitle}</h2>
            <p>{c.servicesBody}</p>
          </div>
          <div className="uae-service-explorer">
            <div className="uae-category-rail" role="tablist" aria-label={c.select}>
              <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>{c.all}<span>{UAE_SERVICES.length}</span></button>
              {(Object.keys(UAE_CATEGORIES) as Array<keyof typeof UAE_CATEGORIES>).map((key) => (
                <button key={key} className={category === key ? "active" : ""} onClick={() => setCategory(key)}>{UAE_CATEGORIES[key][lang]}<span>{UAE_SERVICES.filter((service) => service.category === key).length}</span></button>
              ))}
            </div>
            <div className="uae-service-list">
              {visible.map((service, index) => (
                <Link key={service.slug} href={`${regionPrefix}/services/${service.slug}`} className="uae-service-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{service.title[lang]}</h3><p>{service.short[lang]}</p></div>
                  <Arrow rtl={isRTL} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="uae-process" aria-labelledby="uae-process-title">
        <div className="uae-shell">
          <p className="uae-eyebrow">{c.processEyebrow}</p>
          <h2 id="uae-process-title">{c.processTitle}</h2>
          <div className="uae-process-grid">
            {c.steps.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="uae-jurisdiction">
        <div className="uae-shell uae-jurisdiction-grid">
          <div><p className="uae-eyebrow">{c.jurisdictionEyebrow}</p><h2>{c.jurisdictionTitle}</h2></div>
          <div><p>{c.jurisdictionBody}</p><ul><li><Check /> UAE federal and emirate-level rules</li><li><Check /> Mainland and free-zone authorities</li><li><Check /> DIFC and ADGM distinctions</li><li><Check /> Courts, arbitration and enforcement</li></ul></div>
        </div>
      </section>
    </div>
  );
}

export function UaeServices() {
  const { lang, isRTL, c } = useUaeCopy();
  const { regionPrefix } = useRegion();
  return (
    <div className="uae-site uae-inner">
      <SEOHead title={lang === "ar" ? "جميع الخدمات القانونية في الإمارات" : "All UAE Legal Services"} description={c.servicesBody} canonical="/services" keywords="UAE legal services, UAE lawyer online, Dubai law firm, Abu Dhabi legal advice" schema={[{ "@context": "https://schema.org", "@type": "CollectionPage", name: c.servicesTitle, url: `https://counselo-legal.com${regionPrefix}/services` }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: lang === "ar" ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regionPrefix}` }, { "@type": "ListItem", position: 2, name: lang === "ar" ? "الخدمات" : "Services" }] }]} />
      <header className="uae-inner-hero"><div className="uae-shell"><p className="uae-eyebrow">{c.servicesEyebrow}</p><h1>{lang === "ar" ? "جميع الخدمات القانونية في الإمارات" : "All UAE legal services"}</h1><p>{c.servicesBody}</p></div></header>
      <div className="uae-shell uae-all-services">
        {(Object.keys(UAE_CATEGORIES) as Array<keyof typeof UAE_CATEGORIES>).map((category) => (
          <section key={category}><h2>{UAE_CATEGORIES[category][lang]}</h2><div className="uae-service-list">{UAE_SERVICES.filter((service) => service.category === category).map((service, index) => <Link key={service.slug} href={`${regionPrefix}/services/${service.slug}`} className="uae-service-row"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{service.title[lang]}</h3><p>{service.short[lang]}</p></div><Arrow rtl={isRTL} /></Link>)}</div></section>
        ))}
      </div>
    </div>
  );
}

export function UaeServiceDetail() {
  const { id = "" } = useParams();
  const { lang, isRTL } = useUaeCopy();
  const { regionPrefix } = useRegion();
  const service = getUaeService(id);
  if (!service) return <div className="uae-site uae-not-found"><h1>{lang === "ar" ? "الخدمة غير موجودة" : "Service not found"}</h1><Link href={`${regionPrefix}/services`}>{lang === "ar" ? "جميع الخدمات" : "All services"}</Link></div>;
  const related = UAE_SERVICES.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 3);
  return (
    <article className="uae-site uae-detail">
      <LegalServiceSchema service={service} lang={lang} />
      <header className="uae-detail-hero"><div className="uae-shell"><Link href={`${regionPrefix}/services`} className="uae-back"><Arrow rtl={!isRTL} />{lang === "ar" ? "جميع الخدمات" : "All services"}</Link><p className="uae-eyebrow">{UAE_CATEGORIES[service.category][lang]} · UAE</p><h1>{service.title[lang]}</h1><p>{service.short[lang]}</p></div></header>
      <div className="uae-shell uae-detail-grid">
        <main><section><h2>{lang === "ar" ? "كيف نساعد" : "How we help"}</h2><p>{service.overview[lang]}</p></section><section><h2>{lang === "ar" ? "ما تغطيه الخدمة" : "What this service covers"}</h2><ul className="uae-check-list">{service.covers[lang].map((item) => <li key={item}><Check />{item}</li>)}</ul></section><section><h2>{lang === "ar" ? "مفاهيم قانونية رئيسية" : "Key UAE legal concepts"}</h2><ul className="uae-concepts">{service.concepts[lang].map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>{lang === "ar" ? "خدمات مرتبطة" : "Related legal services"}</h2><div className="uae-related-links">{related.map((item) => <Link key={item.slug} href={`${regionPrefix}/services/${item.slug}`}>{item.title[lang]}<Arrow rtl={isRTL} /></Link>)}<Link href="/blog">{lang === "ar" ? "مركز كاونسلو للمعرفة القانونية" : "CounselO legal knowledge centre"}<Arrow rtl={isRTL} /></Link></div></section></main>
        <aside><p className="uae-eyebrow">{lang === "ar" ? "مصدر رسمي" : "OFFICIAL SOURCE"}</p><a href={service.authority.href} target="_blank" rel="noreferrer">{service.authority[lang]}<ExternalLink /></a><hr/><h2>{lang === "ar" ? "ناقش مسألتك بسرية" : "Discuss your matter confidentially"}</h2><p>{lang === "ar" ? "نؤكد الاختصاص والنطاق والخطوة التالية قبل بدء العمل." : "We confirm jurisdiction, scope and the next step before work begins."}</p><Link href={`${regionPrefix}/contact?service=${service.slug}`} className="uae-btn uae-btn-primary">{lang === "ar" ? "ابدأ الاستشارة" : "Start a consultation"}<Arrow rtl={isRTL} /></Link></aside>
      </div>
      <section className="uae-trust-band" aria-labelledby="trust-signals-heading"><div className="uae-shell"><div><p className="uae-eyebrow">{lang === "ar" ? "الثقة والشفافية" : "TRUST & TRANSPARENCY"}</p><h2 id="trust-signals-heading">{lang === "ar" ? "نطاق واضح قبل بدء العمل." : "A clear scope before work begins."}</h2></div><ul><li><ShieldCheck />{lang === "ar" ? "تواصل سري" : "Confidential communication"}</li><li><Check />{lang === "ar" ? "تأكيد الاختصاص" : "Jurisdiction confirmed"}</li><li><Check />{lang === "ar" ? "نطاق وأتعاب مسبقة" : "Scope and fee agreed in advance"}</li></ul></div></section>
    </article>
  );
}

const staticCopy = {
  about: {
    en: ["About CounselO UAE", "Legal direction begins with the correct jurisdiction.", "CounselO is a bilingual digital legal platform. For UAE matters, our workflow starts by identifying the emirate, authority, governing framework and forum before advice is scoped.", "We support individuals, founders, investors and established businesses across corporate, personal, contentious and regulated-sector matters. Where a task requires UAE rights of audience, notarisation or physical attendance, the scope is coordinated with appropriately licensed local professionals."],
    ar: ["عن كاونسلو الإمارات", "يبدأ التوجيه القانوني بتحديد الاختصاص الصحيح.", "كاونسلو منصة قانونية رقمية ثنائية اللغة. في مسائل الإمارات نبدأ بتحديد الإمارة والجهة والإطار القانوني والمنتدى المختص قبل تحديد نطاق المشورة.", "ندعم الأفراد والمؤسسين والمستثمرين والشركات في المسائل المؤسسية والشخصية والنزاعات والقطاعات المنظمة. وعندما تتطلب المهمة حق تمثيل أو توثيقاً أو حضوراً فعلياً في الإمارات، يُنسّق النطاق مع مهنيين محليين مرخصين حسب الأصول."],
  },
  vision: {
    en: ["Our UAE vision", "Make jurisdiction-specific legal guidance easier to access.", "Legal information should be clear enough to act on and precise enough to respect the forum that will apply it. Our UAE platform combines bilingual access, structured intake and service pages grounded in real UAE legal concepts.", "The aim is not to replace fact-specific advice. It is to help every client reach the right question, documents, authority and next step faster."],
    ar: ["رؤيتنا في الإمارات", "تسهيل الوصول إلى توجيه قانوني محدد بالاختصاص.", "يجب أن تكون المعلومة القانونية واضحة بما يكفي للعمل ودقيقة بما يكفي لاحترام الجهة التي ستطبقها. تجمع منصتنا الإماراتية بين الوصول باللغتين والاستقبال المنظم وصفحات خدمات مبنية على مفاهيم قانونية إماراتية حقيقية.", "الهدف ليس استبدال المشورة المرتبطة بالوقائع، بل مساعدة كل عميل على الوصول أسرع إلى السؤال والوثائق والجهة والخطوة التالية الصحيحة."],
  },
} as const;

export function UaeAbout({ page = "about" }: { page?: "about" | "vision" }) {
  const { lang } = useUaeCopy();
  const content = staticCopy[page][lang];
  const { regionPrefix } = useRegion();
  return <div className="uae-site uae-static"><SEOHead title={content[0]} description={content[2]} canonical={`/${page}`} schema={[{ "@context": "https://schema.org", "@type": "AboutPage", name: content[0], description: content[2], url: `https://counselo-legal.com${regionPrefix}/${page}` }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: lang === "ar" ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regionPrefix}` }, { "@type": "ListItem", position: 2, name: content[0] }] }]} /><header className="uae-inner-hero"><div className="uae-shell"><p className="uae-eyebrow">COUNSELO UAE</p><h1>{content[0]}</h1><p>{content[1]}</p></div></header><div className="uae-shell uae-static-copy"><p>{content[2]}</p><p>{content[3]}</p></div></div>;
}

export function UaeContact() {
  const { lang } = useUaeCopy();
  const { regionPrefix } = useRegion();
  const description = lang === "ar" ? "ابدأ استشارة قانونية سرية لمسألة في الإمارات، بالعربية أو الإنجليزية، مع تحديد الإمارة والاختصاص والخطوة المناسبة قبل بدء العمل." : "Start a confidential UAE legal consultation in Arabic or English, with the emirate, jurisdiction and appropriate next step confirmed before work begins.";
  return <div className="uae-site uae-static"><SEOHead title={lang === "ar" ? "تواصل مع كاونسلو الإمارات" : "Contact CounselO UAE"} description={description} canonical="/contact" schema={[{ "@context": "https://schema.org", "@type": "ContactPage", name: lang === "ar" ? "تواصل مع كاونسلو الإمارات" : "Contact CounselO UAE", description, url: `https://counselo-legal.com${regionPrefix}/contact` }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: lang === "ar" ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regionPrefix}` }, { "@type": "ListItem", position: 2, name: lang === "ar" ? "تواصل" : "Contact" }] }]} /><header className="uae-inner-hero"><div className="uae-shell"><p className="uae-eyebrow">{lang === "ar" ? "تواصل سري" : "CONFIDENTIAL CONTACT"}</p><h1>{lang === "ar" ? "ابدأ بمسألتك القانونية." : "Start with your legal matter."}</h1><p>{lang === "ar" ? "اذكر الإمارة ونوع المسألة والموعد وأي وثائق رئيسية. سنؤكد نطاق المتابعة المناسب." : "Tell us the emirate, type of matter, deadline and key documents. We will confirm the appropriate follow-up scope."}</p></div></header><div className="uae-shell uae-contact-grid"><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /><span><strong>WhatsApp</strong><small>{lang === "ar" ? "ابدأ محادثة سرية" : "Start a confidential conversation"}</small></span><ArrowRight /></a><a href={EMAIL}><Mail /><span><strong>info@counselo-legal.com</strong><small>{lang === "ar" ? "أرسل ملخصاً ووثائقك" : "Send a summary and your documents"}</small></span><ArrowRight /></a><Link href={`${regionPrefix}/services`}><ShieldCheck /><span><strong>{lang === "ar" ? "راجع الخدمات أولاً" : "Review services first"}</strong><small>{lang === "ar" ? "اعثر على المجال الأقرب لمسألتك" : "Find the area closest to your matter"}</small></span><ArrowRight /></Link></div></div>;
}

export function UaeLegalNotice({ kind }: { kind: "terms-of-service" | "privacy-policy" }) {
  const { lang } = useUaeCopy();
  const privacy = kind === "privacy-policy";
  const title = lang === "ar" ? (privacy ? "سياسة الخصوصية" : "شروط الخدمة") : (privacy ? "Privacy policy" : "Terms of service");
  const intro = lang === "ar" ? (privacy ? "توضح هذه السياسة كيفية التعامل مع بيانات التواصل والوثائق المرسلة عبر منصتنا القانونية." : "تنظم هذه الشروط استخدام منصة كاونسلو وطلب الخدمات القانونية لمسائل الإمارات، وتوضح حدود المعلومات العامة ونطاق بدء العلاقة المهنية.") : (privacy ? "This policy explains how contact details and documents submitted through our legal platform are handled." : "These terms govern use of CounselO and requests for legal services concerning UAE matters.");
  const sections = privacy
    ? (lang === "ar" ? [["البيانات التي نجمعها", "قد تشمل بيانات الاتصال ووصف المسألة والوثائق التي تختار إرسالها وبيانات تقنية محدودة لازمة للأمان والتشغيل."], ["الغرض والاحتفاظ", "نستخدم البيانات لتقييم الطلب والتواصل وتقديم الخدمة والوفاء بالالتزامات القانونية. نحتفظ بها فقط بالقدر اللازم للغرض والالتزامات المنطبقة."], ["المشاركة والأمان", "لا نبيع بياناتك. قد تُشارك فقط مع مزودي خدمة ضروريين أو مهنيين مرخصين ضمن نطاقك أو عندما يقتضي القانون."]] : [["Data we collect", "This may include contact details, your description of the matter, documents you choose to send and limited technical data needed for security and operation."], ["Purpose and retention", "We use data to assess requests, communicate, deliver services and meet legal obligations. It is retained only as needed for those purposes and applicable duties."], ["Sharing and security", "We do not sell personal data. It is shared only with necessary service providers, appropriately licensed professionals within your scope, or where law requires."]])
    : (lang === "ar" ? [["لا تنشأ علاقة بمجرد التصفح", "المعلومات العامة لا تُعد رأياً قانونياً، ولا تنشأ علاقة مهنية حتى قبول نطاق مكتوب وتأكيده."], ["تحديد الاختصاص", "تعتمد المشورة على الوقائع والإمارة والجهة والقانون والمنتدى. تقع على العميل مسؤولية تقديم معلومات دقيقة وكاملة."], ["المهنيون المحليون", "عندما تتطلب المسألة ترخيصاً أو تمثيلاً أو حضوراً محلياً، قد يُنسق العمل مع مهنيين مرخصين وفق نطاق منفصل."]] : [["No engagement from browsing", "General information is not legal advice, and no professional engagement exists until a written scope is accepted and confirmed."], ["Jurisdiction and facts", "Advice depends on facts, emirate, authority, governing law and forum. Clients are responsible for providing accurate and complete information."], ["Locally licensed professionals", "Where a matter requires local licensing, representation or attendance, work may be coordinated with appropriately licensed professionals under a separate scope."]]);
  const { regionPrefix } = useRegion();
  return <article className="uae-site uae-static"><SEOHead title={title} description={intro} canonical={`/${kind}`} schema={[{ "@context": "https://schema.org", "@type": "WebPage", name: title, description: intro, url: `https://counselo-legal.com${regionPrefix}/${kind}` }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: lang === "ar" ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regionPrefix}` }, { "@type": "ListItem", position: 2, name: title }] }]} /><header className="uae-inner-hero"><div className="uae-shell"><p className="uae-eyebrow">COUNSELO UAE</p><h1>{title}</h1><p>{intro}</p></div></header><div className="uae-shell uae-policy">{sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}</div></article>;
}
