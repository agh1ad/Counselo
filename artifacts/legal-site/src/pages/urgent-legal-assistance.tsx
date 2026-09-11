import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, Clock3, FileText, FilePenLine, MessageSquareText, Mail, MessageCircle, Globe2, ShieldCheck, ClipboardList, Copy, Check, Plus, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ENTITY_IDS, buildHreflangLinks, getServicesForRegion } from "@workspace/api-zod/browser";
import { urgentContactLinks, urgentCopy, urgentJurisdictions, urgentPath } from "@/lib/urgent-legal-assistance";
import "./urgent-legal-assistance.css";

export default function UrgentLegalAssistance() {
  const { isRTL, lang } = useLanguage();
  const [copyState, setCopyState] = useState<"idle" | "en" | "ar" | "error">("idle");
  const { region, regionPrefix } = useRegion();
  const [location] = useLocation();
  const regional = /^\/(sa|syr|uae)\//.test(location);
  const c = urgentCopy[lang];
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
  const related = getServicesForRegion(region).filter(service => ["contracts", "civil-law", "criminal-law", "business-law"].includes(service.clusterSlug));
  const schema = [
    { "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`, name: title, description: `${c.intro} ${c.timing} ${c.availability}`, url, serviceType: c.title, provider: { "@id": COUNSELO_ENTITY_IDS.organization }, availableChannel: [{ "@type": "ServiceChannel", serviceUrl: contacts.whatsapp, availableLanguage: ["Arabic", "English"] }] },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: `https://counselo-legal.com${regional ? regionPrefix : isRTL ? "/ar" : "/"}` },
      ...(regional ? [{ "@type": "ListItem", position: 2, name: isRTL ? "الخدمات" : "Services", item: `https://counselo-legal.com${regionPrefix}/services` }] : []),
      { "@type": "ListItem", position: regional ? 3 : 2, name: c.title, item: url },
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ];
  const copyChecklist = async () => {
    try {
      await navigator.clipboard.writeText(c.template);
      setCopyState(lang);
    } catch {
      setCopyState("error");
    }
  };
  const serviceIcons = [FileText, FilePenLine, ClipboardList];
  const sections = [
    ["urgent-scope", isRTL ? "المساعدة المتاحة" : "How we help"],
    ["urgent-process", isRTL ? "خطوات الطلب" : "The process"],
    ["urgent-documents", isRTL ? "تجهيز المستندات" : "Your documents"],
    ["urgent-coverage", isRTL ? "الاختصاص" : "Jurisdiction"],
    ["trust-signals-heading", isRTL ? "الأتعاب والنطاق" : "Fees and scope"],
    ["urgent-faq", isRTL ? "أسئلة شائعة" : "Questions"],
  ];
  const actions = <div className="urgent-actions">
    <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="urgent-service" className="urgent-button"><MessageCircle aria-hidden="true" />{c.whatsapp}</a>
    <a href={contacts.email} data-cta="email" data-conversion-position="urgent-service" className="urgent-button urgent-button-secondary"><Mail aria-hidden="true" />{c.email}</a>
  </div>;

  return <div className="urgent-page" dir={isRTL ? "rtl" : "ltr"}>
    <Helmet>{regional && <meta name="geo.region" content={{ sa: "SA", syr: "SY", uae: "AE" }[region]} />}</Helmet>
    <SEOHead title={title} description={description} canonical={path} noRegionPrefix
      contentLanguage={lang} regionalLanguageAlternates={alternates}
      sharedLanguageAlternates={{ en: urgentPath(false), ar: urgentPath(true), xDefault: urgentPath(false) }}
      ogImageAlt={isRTL ? "كاونسلو — المساعدة القانونية العاجلة" : "CounselO — Urgent Legal Assistance"}
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
            <p className="urgent-intro">{c.intro}</p>
            <div className="urgent-delivery-proposition"><span>{isRTL ? "هدف التسليم خلال" : "Target delivery within"}</span><strong>{isRTL ? "٣ ساعات" : "3 hours"}</strong></div>
            <p className="urgent-delivery-condition">{isRTL ? "بعد قبول الطلب واكتمال المستندات وتأكيد السداد." : "After acceptance, complete documents and confirmed payment."}</p>
            <a className="urgent-hero-explore" href="#urgent-scope">{isRTL ? "اختر المساعدة التي تحتاجها" : "Find the assistance you need"}<ArrowRight aria-hidden="true" /></a>
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
    <nav className="urgent-section-nav" aria-label={isRTL ? "أقسام المساعدة العاجلة" : "Urgent assistance sections"}><div className="urgent-shell">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>
    <section className="urgent-section urgent-scope-section" aria-labelledby="urgent-scope">
      <div className="urgent-shell">
        <div className="urgent-section-heading"><h2 id="urgent-scope">{c.scopeTitle}</h2></div>
        <div className="urgent-grid">{c.services.map(([heading, body], index) => {
          const Icon = serviceIcons[index];
          return <article key={heading}><span className="urgent-service-icon"><Icon aria-hidden="true" /></span><div><h3>{heading}</h3><p>{body}</p></div></article>;
        })}</div>
      </div>
    </section>
    <section className="urgent-section urgent-process" aria-labelledby="urgent-process">
      <div className="urgent-shell"><div className="urgent-section-heading"><h2 id="urgent-process">{c.stepsTitle}</h2></div>
        <ol>{c.steps.map(([heading, body], i) => <li key={heading}><span className="urgent-step-number" aria-hidden="true">{new Intl.NumberFormat(lang).format(i + 1)}</span><h3>{heading.replace(/^[1-5١-٥]\.\s*/, "")}</h3><p>{body}</p></li>)}</ol>
      </div>
    </section>
    <section className="urgent-section" aria-labelledby="urgent-documents">
      <div className="urgent-shell urgent-intake">
        <div className="urgent-intake-copy"><span className="urgent-section-icon"><ClipboardList aria-hidden="true" /></span><h2 id="urgent-documents">{c.documentsTitle}</h2>
          <p className="urgent-section-lead">{isRTL ? "جهّز التفاصيل مرة واحدة، ثم شاركها عبر وسيلة التواصل الأنسب لك." : "Prepare the details once, then share them through your preferred contact channel."}</p>
          <div className="urgent-privacy-note"><ShieldCheck aria-hidden="true" /><p>{c.privacy}</p></div><Link href={`${regionPrefix}/privacy-policy`} className="urgent-text-link">{isRTL ? "سياسة الخصوصية" : "Privacy policy"}<ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="urgent-document">
          <div className="urgent-document-heading"><FileText aria-hidden="true" /><h3>{c.template.split("\n")[0]}</h3></div>
          <ul className="urgent-template">{c.template.split("\n").slice(1).map(line => <li key={line}><span aria-hidden="true" /><span>{line.replace(/:$/, "")}</span></li>)}</ul>
          <div className="urgent-copy-footer"><button type="button" onClick={copyChecklist} className="urgent-copy-button">{copyState === lang ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copyState === lang ? (isRTL ? "تم نسخ القائمة" : "Checklist copied") : (isRTL ? "انسخ قائمة الطلب" : "Copy request checklist")}</button><p aria-live="polite">{copyState === lang ? (isRTL ? "ألصقها في رسالة واتساب أو البريد وأضف التفاصيل." : "Paste it into WhatsApp or email and add your details.") : copyState === "error" ? (isRTL ? "تعذر النسخ. يمكنك تحديد النص ونسخه، أو استخدام مسودة رسالة التواصل." : "Copy unavailable. Select the text to copy it, or use the prepared contact draft.") : (isRTL ? "أضف المستندات في المحادثة أو البريد بعد تأكيد وسيلة النقل." : "Attach documents in the conversation or email after confirming the transfer method.")}</p></div>
        </div>
      </div>
    </section>
    <section className="urgent-section urgent-coverage-section" aria-labelledby="urgent-coverage">
      <div className="urgent-shell urgent-coverage-layout">
        <div><span className="urgent-section-icon"><Globe2 aria-hidden="true" /></span><h2 id="urgent-coverage">{c.coverageTitle}</h2><p>{c.coverage}</p></div>
        {regional ? <aside className="urgent-country"><div className="urgent-country-label"><Globe2 aria-hidden="true" /><span>{jurisdiction[0]}</span></div><h3>{isRTL ? `تجهيز طلب عاجل في ${jurisdiction[0]}` : `Preparing an urgent request in ${jurisdiction[0]}`}</h3><p>{jurisdiction[1]}</p><Link href={urgentPath(isRTL)} className="urgent-text-link">{isRTL ? "هل تتعلق مسألتك بدولة أخرى؟" : "Does your matter concern another country?"}<ArrowUpRight aria-hidden="true" /></Link></aside> : <div className="urgent-jurisdictions">{(["sa", "syr", "uae"] as const).map(r => <Link key={r} href={urgentPath(isRTL, r)}><span>{urgentJurisdictions[r][lang][0]}</span><ArrowUpRight aria-hidden="true" /></Link>)}<p>{isRTL ? "لدولة أخرى، حدد الاختصاص في رسالتك." : "For another country, specify the jurisdiction in your message."}</p></div>}
      </div>
    </section>
    <section className="urgent-section urgent-trust" aria-labelledby="trust-signals-heading">
      <div className="urgent-shell urgent-trust-layout"><div><span className="urgent-section-icon"><ShieldCheck aria-hidden="true" /></span><h2 id="trust-signals-heading">{isRTL ? "نطاق واضح وأتعاب متفق عليها" : "Clear scope and agreed fees"}</h2><div className="urgent-policy-links"><Link href={`${regionPrefix}/about`}>{isRTL ? "عن كاونسلو والفريق" : "About CounselO and the team"}</Link><Link href={`${regionPrefix}/terms-of-service`}>{isRTL ? "شروط الخدمة" : "Terms of service"}</Link><Link href={`${regionPrefix}/privacy-policy`}>{isRTL ? "سياسة الخصوصية" : "Privacy policy"}</Link></div></div>
        <div className="urgent-fee-copy"><h3>{c.feesTitle}</h3><p>{c.fees}</p><h3 className="urgent-agreement-heading">{c.deliveryTitle}</h3><p>{c.delivery}</p><h3 className="urgent-agreement-heading">{c.handlingTitle}</h3><p>{c.handling}</p><div className="urgent-fee-boundary"><Check aria-hidden="true" /><p>{c.boundary}</p></div></div>
      </div>
    </section>
    <section className="urgent-section urgent-questions" aria-labelledby="urgent-faq"><div className="urgent-shell urgent-faq-layout"><div><h2 id="urgent-faq">{c.faqTitle}</h2><p>{isRTL ? "تفاصيل تساعدك على اتخاذ الخطوة التالية بوضوح." : "The practical details before you take the next step."}</p></div><div className="urgent-faq">{c.faqs.map(([q, a]) => <details key={q}><summary><span>{q}</span><Plus aria-hidden="true" /></summary><p>{a}</p></details>)}</div></div></section>
    <section className="urgent-section urgent-resources"><div className="urgent-shell urgent-resources-layout">
      {regional && <div><h2>{c.relatedTitle}</h2><div className="urgent-related-links">{related.map(service => <Link key={service.slug} href={`${regionPrefix}/services/${service.slug}`}><span>{isRTL ? service.titleAr : service.titleEn}</span><ArrowUpRight aria-hidden="true" /></Link>)}</div></div>}
      <aside className="urgent-reading"><BookOpen aria-hidden="true" /><h2>{isRTL ? "قراءة قانونية تساعدك على تجهيز طلبك" : "Legal reading to help prepare your request"}</h2><p>{isRTL ? "استعرض المقالات بحسب موضوع المسألة واختصاصها لفهم المصطلحات وتجهيز الأسئلة. القراءة العامة لا تؤكد قبول طلب عاجل أو تمدد أي ميعاد." : "Browse articles by topic and jurisdiction to understand terms and prepare questions. General reading does not confirm acceptance of an urgent request or extend any deadline."}</p><Link className="urgent-text-link" href={isRTL ? "/blog/ar" : "/blog"}>{isRTL ? "استعرض المقالات القانونية" : "Browse legal articles"}<ArrowUpRight aria-hidden="true" /></Link></aside>
    </div></section>
    <section className="urgent-last"><div className="urgent-shell"><div className="urgent-final-panel"><div><MessageSquareText aria-hidden="true" /><h2>{c.eyebrow}</h2><p>{isRTL ? "أخبرنا بما تحتاجه ومتى تحتاجه. نؤكد النطاق والأتعاب والموعد قبل الدفع." : "Tell us what you need and when you need it. We confirm scope, fees and timing before payment."}</p></div>{actions}</div></div></section>
  </div>;
}
