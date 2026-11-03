import { ServiceExperience, ServiceContact } from "@/components/legal/service-experience";
import { servicePageCopy } from "@/lib/experience-page-copy";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, Clock3, FileText, FilePenLine, MessageSquareText, Mail, MessageCircle, Globe2, ShieldCheck, ClipboardList, Copy, Check, Plus, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ENTITY_IDS, buildHreflangLinks, getServicesForRegion } from "@workspace/api-zod/browser";
import { urgentContactLinks, urgentCopy, saudiUrgentCopy, urgentJurisdictions, urgentPath } from "@/lib/urgent-legal-assistance";
import "./urgent-legal-assistance.css";

export default function UrgentLegalAssistance() {
  const { isRTL, lang } = useLanguage();
  const { region, regionPrefix } = useRegion();
  const [location] = useLocation();
  const regional = /^\/(sa|syr|uae)\//.test(location);
  const c = saudiUrgentCopy[lang];
  const jurisdiction = urgentJurisdictions[region][lang];
  const path = urgentPath(isRTL, regional ? region : undefined);
  const url = `https://counselo-legal.com${path}`;
  const title = regional ? `${c.title} ${isRTL ? "في" : "in"} ${jurisdiction[0]}` : c.title;
  const description = isRTL
    ? `اطلب ${c.title}${regional ? ` في ${jurisdiction[0]}` : " لأي اختصاص"}: إعداد مذكرة قانونية أو لائحة دعوى وتدقيق عقد أو اتفاقية. أرسل المستندات والموعد عبر واتساب أو البريد.`
    : `Request urgent legal assistance${regional ? ` in ${jurisdiction[0]}` : " for any jurisdiction"}: legal memoranda, statements of claim and existing contract review. Send documents via WhatsApp or email.`;
  const contacts = urgentContactLinks(isRTL, regional ? jurisdiction[0] : undefined);
  const alternates = buildHreflangLinks(path).filter(value => !value.startsWith("x-default|")).map(value => {
    const [hrefLang, href] = value.split("|");
    return { hrefLang, href };
  });
  const schema = [
    { "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: title, description: `${c.intro} ${c.timing} ${c.availability}`, url, serviceType: c.title, provider: { "@id": COUNSELO_ENTITY_IDS.organization }, availableChannel: [{ "@type": "ServiceChannel", serviceUrl: contacts.whatsapp, availableLanguage: ["Arabic", "English"] }] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regional ? regionPrefix : isRTL ? "/ar" : "/"}` },
      ...(regional ? [{ "@type": "ListItem", position: 2, name: isRTL ? "الخدمات" : "Services", item: `https://counselo-legal.com${regionPrefix}/services` }] : []),
      { "@type": "ListItem", position: regional ? 3 : 2, name: c.title, item: url },
    ] },
  ];
  const actions = <div className="urgent-actions">
    <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="urgent-service" className="urgent-button"><MessageCircle aria-hidden="true" />{c.whatsapp}</a>
    <a href={contacts.email} data-cta="email" data-conversion-position="urgent-service" className="urgent-button urgent-button-secondary"><Mail aria-hidden="true" />{c.email}</a>
  </div>;

  const pageCopy = {
    ...servicePageCopy(region, "urgent-legal-assistance", lang, [], undefined),
    coverageTitle: c.scopeTitle,
    coverageIntro: isRTL ? "حدد المستند المطلوب وموعده. نؤكد قبول العمل ونطاقه وأتعابه وموعد تسليمه قبل السداد." : "Specify the document and deadline. We confirm acceptance, scope, fees and delivery time before payment.",
    coverage: c.services.map(([title, text]) => ({ title, text })),
    contact: isRTL ? "أرسل طلبك العاجل" : "Send your urgent request",
    contactTitle: isRTL ? "ضع طلبك العاجل بين يدي فريقنا." : "Bring your urgent request to our team.",
    contactText: isRTL ? "اذكر المطلوب والموعد مع الساعة والمنطقة الزمنية. نراجع المستندات ونؤكد إمكانية التنفيذ والتسليم." : "Tell us the work required and your deadline, including the time and time zone. We review the documents and confirm availability and delivery.",
  };
  if (!regional) {
    pageCopy.introduction = isRTL ? `يعدّ فريق كاونسلو المذكرات القانونية ولوائح الدعاوى ومراجعات العقود العاجلة أونلاين، مستنداً إلى خبرة الفريق في الصياغة القانونية وفحص المستندات والتحضير للإجراءات. حدد الدولة والجهة المعنية ليقيّم الفريق طلبك وفق اختصاصه.` : `CounselO’s experienced legal team prepares urgent legal memoranda, statements of claim and contract reviews online, drawing on the team’s experience in legal drafting, document analysis and procedural preparation. Tell us the country and authority involved so we can assess your request in its jurisdiction.`;
  }
  pageCopy.invitation = isRTL ? "تواصل مع فريقنا لتقييم طلبك بسرعة. تشمل الخدمة المستند المتفق عليه؛ ويُرتب أي تمثيل محلي عبر شركاء ومحامين مرخصين بتكليف مستقل." : "Contact our team for a prompt assessment. The service covers the agreed document; any local representation is arranged through licensed partners and lawyers under a separate engagement.";
  const contactHref = regional ? `${regionPrefix}/contact?service=urgent-legal-assistance#consultation-request` : contacts.email;

  return <div className={`urgent-page service-reading-page legal-experience-page${regional && region === "sa" ? " saudi-reading-page" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
    <Helmet>{regional && <meta name="geo.region" content={{ sa: "SA", syr: "SY", uae: "AE" }[region]} />}</Helmet>
    <SEOHead title={title} description={description} canonical={path} noRegionPrefix
      contentLanguage={lang} regionalLanguageAlternates={alternates}
      sharedLanguageAlternates={{ en: urgentPath(false), ar: urgentPath(true), xDefault: urgentPath(false) }}
      ogImageAlt={isRTL ? "كاونسلو للاستشارات القانونية — المساعدة القانونية العاجلة" : "CounselO Legal — Urgent Legal Assistance"}
      keywords={isRTL ? "مساعدة قانونية عاجلة، إعداد مذكرة قانونية، إعداد لائحة دعوى، تدقيق عقد، تدقيق اتفاقية" : "urgent legal assistance, urgent contract review, agreement review, legal memorandum, statement of claim"}
      schema={schema} />
    <section className="urgent-hero">
      <div className="urgent-shell">
        <nav className="urgent-breadcrumb" aria-label={isRTL ? "مسار الصفحة" : "Breadcrumb"}>
          <Link href={regional ? `${regionPrefix}/services` : isRTL ? "/ar" : "/"}>{regional ? (isRTL ? "الخدمات القانونية" : "Legal services") : (isRTL ? "الرئيسية" : "Home")}</Link>
          <span aria-hidden="true"> / </span><span>{c.title}</span>
        </nav>
        <div className="urgent-hero-grid">
          <div className="urgent-hero-copy">
            <p className="urgent-eyebrow"><Clock3 aria-hidden="true" />{c.eyebrow}</p>
            <h1>{title}</h1>
            <p className="urgent-intro">{pageCopy.hero}</p>
            <div className="urgent-delivery-proposition"><span>{isRTL ? "هدف التسليم خلال" : "Target delivery within"}</span><strong>{isRTL ? "٣ ساعات" : "3 hours"}</strong></div>
            <p className="urgent-delivery-condition">{isRTL ? "بعد قبول الطلب واكتمال المستندات وتأكيد السداد." : "After acceptance, complete documents and confirmed payment."}</p>
            <a className="urgent-hero-explore" href="#service-covers-heading">{isRTL ? "اختر المساعدة التي تحتاجها" : "Find the assistance you need"}<ArrowRight aria-hidden="true" /></a>
          </div>
          <aside className="urgent-request-panel" aria-labelledby="urgent-request-title">
            <div className="urgent-panel-symbol"><MessageSquareText aria-hidden="true" /></div>
            <h2 id="urgent-request-title">{isRTL ? "لنبدأ بما تحتاجه الآن" : "Tell us what you need now"}</h2>
            <p>{isRTL ? "المسألة، المستندات، والموعد المطلوب. نؤكد معك الخطوة التالية." : "Your matter, your documents, your deadline. We will confirm the next step with you."}</p>
            <p className="urgent-availability">{c.availability}</p>
            {actions}
            <p className="urgent-request-note">{isRTL ? "إرسال الرسالة لا يعني قبول الطلب ولا يبدأ به هدف التسليم. نؤكد القبول والأتعاب والموعد قبل الدفع." : "Sending a message does not mean acceptance or start the delivery target. We confirm acceptance, fees and timing before payment."}</p>
          </aside>
        </div>
      </div>
    </section>
    <div className="urgent-shell py-12 lg:py-16">
      <ServiceExperience copy={pageCopy} isArabic={isRTL} region={region} service="urgent-legal-assistance" contactHref={contactHref} />
      {!regional && <nav className="urgent-jurisdictions mb-10" aria-label={isRTL ? "اختر دولة المسألة" : "Choose the country for your matter"}>
        {(["sa", "syr", "uae"] as const).map(r => <Link key={r} href={urgentPath(isRTL, r)}><span>{urgentJurisdictions[r][lang][0]}</span><ArrowUpRight aria-hidden="true" /></Link>)}
      </nav>}
      <ServiceContact copy={pageCopy} isArabic={isRTL} region={region} contactHref={contactHref} whatsappHref={contacts.whatsapp} />
    </div>
  </div>;
}
