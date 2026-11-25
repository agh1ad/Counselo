import { Link } from "wouter";
import {
  canonicalPublicUrl,
  COUNSELO_ENTITY_IDS,
  UAE_SYRIA_CONSULTATION_PATHS,
} from "@workspace/api-zod/browser";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  en: {
    home: "Home",
    title: "UAE–Syria cross-border legal consultation",
    description: "Prepare for a legal consultation involving the UAE and Syria. Identify the documents, deadlines and questions in each country and contact the CounselO Legal team.",
    intro: "You may live in the UAE and need someone to act for you in Syria, or have a Syrian contract and a payment dispute in the UAE. Tell CounselO Legal what you need to do in each country so our team can agree with you where the work should begin.",
    prepare: "What to include in your first message",
    checklist: [
      "Say who you are acting for, where the other parties are based and what decision or document you need.",
      "For a document signed in one country for use in the other, identify who issued it, who will receive it and any written instructions from the recipient.",
      "For a contract or dispute, include the relevant clause, where performance or payment was due, and any notice or hearing date. State which deadline comes first.",
    ],
    start: "Where to start",
    choice: "Choose the country where the next step needs to happen. If that is unclear, use either contact page and mention both countries in the same message.",
    uae: "United Arab Emirates",
    uaeText: "Start here if a UAE authority or counterparty has asked you for a Syrian document, or if your next contractual or procedural step is in the Emirates. Name the emirate and any authority or free zone involved.",
    uaeGuide: "Documents for use in the UAE",
    uaeContact: "Discuss the UAE side with us",
    uaeFees: "UAE services and consultation fees",
    syr: "Syria",
    syrText: "Start here if you live in the UAE and need a document or a representative for a property, inheritance or business matter in Syria. Identify the transaction, where the record is held and what you want the representative to do.",
    syrGuide: "Powers of attorney for use in Syria",
    syrContact: "Discuss the Syrian side with us",
    syrFees: "Syrian services and consultation fees",
    scope: "Scope and fees for work in both countries",
    scopeText: "Our team will identify which questions need advice in each country, what you will receive and who will handle any agreed local steps. The country directories show the published fees for individual consultations. We confirm the scope and fee for work involving both countries with you before it begins.",
  },
  ar: {
    home: "الرئيسية",
    title: "استشارة قانونية بين الإمارات وسوريا",
    description: "استعد لاستشارة قانونية بشأن مسألة تربط بين الإمارات وسوريا. حدّد المستندات والمواعيد والأسئلة في كل بلد وتواصل مع فريق كاونسلو للاستشارات القانونية.",
    intro: "قد تقيم في الإمارات وتحتاج إلى من ينوب عنك في سوريا، أو يكون لديك عقد أُبرم في سوريا وخلاف على دفعة مستحقة في الإمارات. اذكر لفريق كاونسلو للاستشارات القانونية ما تريد إنجازه في كل بلد لنتفق معك على نقطة البداية.",
    prepare: "ماذا تذكر في رسالتك الأولى؟",
    checklist: [
      "وضّح صفتك ومكان الأطراف الأخرى والقرار أو المستند الذي تحتاج إليه.",
      "إذا كان المستند صادراً في بلد وستستخدمه في البلد الآخر، فاذكر الجهة التي أصدرته والجهة التي ستتسلّمه وأي تعليمات خطية تلقيتها منها.",
      "إذا تعلّقت المسألة بعقد أو نزاع، فأرفق البند المعني وحدّد مكان التنفيذ أو السداد وتاريخ أي تبليغ أو جلسة. اذكر أقرب مهلة لديك.",
    ],
    start: "بأيّ البلدين تبدأ؟",
    choice: "ابدأ بالبلد الذي تحتاج إلى إجراء الخطوة التالية فيه. وإذا لم يتّضح لك ذلك، فاختر إحدى صفحتي التواصل واشرح صلة المسألة بالبلدين في رسالة واحدة.",
    uae: "الإمارات العربية المتحدة",
    uaeText: "ابدأ من الإمارات إذا طلبت منك جهة إماراتية أو الطرف الآخر في العقد مستنداً سورياً، أو كانت الخطوة التعاقدية أو الإجرائية المقبلة في الإمارات. اذكر الإمارة واسم الجهة أو المنطقة الحرة المعنية إن وُجدت.",
    uaeGuide: "مراجعة مستند لاستخدامه في الإمارات",
    uaeContact: "تواصل معنا بشأن الجانب الإماراتي",
    uaeFees: "خدمات الإمارات ورسوم الاستشارات",
    syr: "سوريا",
    syrText: "ابدأ من سوريا إذا كنت تقيم في الإمارات وتحتاج إلى مستند أو وكيل لمعاملة عقارية أو إرثية أو تجارية في سوريا. حدّد المعاملة ومكان حفظ السجل وما تريد تفويض الوكيل بالقيام به.",
    syrGuide: "مراجعة الوكالات لاستخدامها في سوريا",
    syrContact: "تواصل معنا بشأن الجانب السوري",
    syrFees: "خدمات سوريا ورسوم الاستشارات",
    scope: "نطاق العمل والأتعاب في البلدين",
    scopeText: "نحدّد معك الأسئلة التي تحتاج إلى مشورة في كل بلد، وما ستتسلّمه، ومن سيتولى الإجراءات المحلية المتفق عليها. تجد في دليل كل بلد رسوم الاستشارات الفردية المنشورة. ونتفق معك على نطاق العمل الذي يشمل البلدين وأتعابه قبل البدء به.",
  },
} as const;

export default function UaeSyriaConsultation() {
  const { lang, isRTL } = useLanguage();
  const c = copy[lang];
  const path = UAE_SYRIA_CONSULTATION_PATHS[lang];
  const url = canonicalPublicUrl(path);
  const home = isRTL ? "/ar" : "/";
  const suffix = isRTL ? "/ar" : "";
  const countries = [
    { region: "uae", name: c.uae, text: c.uaeText, guide: c.uaeGuide, link: "commercial-contracts/document-attestation-and-legalisation-problem", contact: c.uaeContact, fees: c.uaeFees },
    { region: "syr", name: c.syr, text: c.syrText, guide: c.syrGuide, link: "contracts/power-of-attorney-drafting-and-authority-problem", contact: c.syrContact, fees: c.syrFees },
  ];
  const linkClass = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
  return (
    <div className="counselo-editorial-page">
      <SEOHead title={c.title} description={c.description} canonical={path} noRegionPrefix
        contentLanguage={lang} sharedLanguageAlternates={UAE_SYRIA_CONSULTATION_PATHS}
        keywords={c.title} ogImageAlt={isRTL ? "كاونسلو للاستشارات القانونية" : "CounselO Legal"}
        schema={[{
          "@context": "https://schema.org", "@type": "Service", name: c.title, url,
          description: c.description, provider: { "@id": COUNSELO_ENTITY_IDS.organization },
          areaServed: [{ "@type": "Country", name: "United Arab Emirates" }, { "@type": "Country", name: "Syria" }],
        }, {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: c.home, item: canonicalPublicUrl(home) },
            { "@type": "ListItem", position: 2, name: c.title, item: url },
          ],
        }]} />
      <section className="premium-page-hero py-16 text-white lg:py-24">
        <div className="premium-content-shell">
          <nav aria-label={isRTL ? "مسار الصفحة" : "Breadcrumb"} className="mb-7 text-sm text-white/85">
            <Link href={home} className="underline underline-offset-4">{c.home}</Link>
            <span aria-hidden="true"> / </span><span aria-current="page">{c.title}</span>
          </nav>
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight md:text-6xl">{c.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">{c.intro}</p>
        </div>
      </section>
      <div className="premium-content-shell py-12 lg:py-16">
        <section aria-labelledby="country-heading">
          <h2 id="country-heading" className="font-serif text-3xl font-bold">{c.start}</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">{c.choice}</p>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {countries.map(country => {
              const prefix = `/${country.region}${suffix}`;
              return <section key={country.region} className="border border-border bg-card p-6 lg:p-8">
                <h3 className="font-serif text-2xl font-bold">{country.name}</h3>
                <p className="mt-3 leading-8">{country.text}</p>
                <ul className="mt-4 space-y-3">
                  <li><Link href={`${prefix}/contact#consultation-request`} className={linkClass}>{country.contact}</Link></li>
                  <li><Link href={`${prefix}/services/${country.link}`} className={linkClass}>{country.guide}</Link></li>
                  <li><Link href={`${prefix}/services#complete-service-directory`} className={linkClass}>{country.fees}</Link></li>
                </ul>
              </section>;
            })}
          </div>
        </section>
        <section aria-labelledby="prepare-heading" className="mt-12 max-w-3xl">
          <h2 id="prepare-heading" className="font-serif text-3xl font-bold">{c.prepare}</h2>
          <ul className="mt-4 list-disc space-y-3 ps-6 leading-8">{c.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section aria-labelledby="fee-heading" className="mt-10 max-w-3xl border-t border-border pt-8">
          <h2 id="fee-heading" className="font-serif text-2xl font-bold">{c.scope}</h2>
          <p className="mt-3 leading-8 text-muted-foreground">{c.scopeText}</p>
        </section>
      </div>
    </div>
  );
}
