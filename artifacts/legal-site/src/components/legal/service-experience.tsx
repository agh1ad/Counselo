import { Link } from "wouter";
import { ArrowRight, UsersRound, MonitorSmartphone, Languages, ShieldCheck, ClipboardCheck, MessagesSquare, MessageCircle } from "lucide-react";
import type { Region } from "@workspace/api-zod/browser";
import { legalProblemPath } from "@/lib/legal-problem-pages";
import { saudiFamilyServiceCopy, FAMILY_PROBLEM_GROUPS } from "./saudi-family-service-content";
import "./service-experience.css";

export type ExperienceCopy = {
  heading: string;
  introduction: string;
  experience: string;
  invitation: string;
  contact: string;
  coverageTitle: string;
  coverageIntro?: string;
  coverage: readonly { title: string; text?: string }[];
  contactTitle: string;
  contactText: string;
};
type Problem = { slug: string; titleEn: string; titleAr: string };
const reasonIcons = [UsersRound, MonitorSmartphone, Languages, ShieldCheck, ClipboardCheck, MessagesSquare];

export function CounselOFeatures({ isArabic }: { isArabic: boolean }) {
  const c = saudiFamilyServiceCopy[isArabic ? "ar" : "en"];
  return <section id="service-legal-checks" className="legal-experience-reasons" aria-labelledby="service-legal-checks-heading">
    <h2 id="service-legal-checks-heading">{c.reasonsTitle}</h2>
    <p className="legal-experience-reasons__intro">{c.reasonsIntro}</p>
    <div className="legal-experience-reasons__grid">{c.reasons.map((reason, index) => {
      const Icon = reasonIcons[index];
      return <article key={reason.title}><Icon size={27} strokeWidth={1.7} aria-hidden="true" /><h3>{reason.title}</h3><p>{reason.text}</p></article>;
    })}</div>
  </section>;
}

export function ServiceExperience({ copy: c, isArabic, region, service, contactHref, problems = [] }: {
  copy: ExperienceCopy; isArabic: boolean; region: Region; service: string; contactHref: string; problems?: Problem[];
}) {
  const family = region === "sa" && service === "family-law";
  const ContactLink = contactHref.startsWith("/") ? Link : "a";
  const familyCopy = saudiFamilyServiceCopy[isArabic ? "ar" : "en"];
  const groups = family ? FAMILY_PROBLEM_GROUPS.map(slugs => slugs.flatMap(slug => problems.filter(problem => problem.slug === slug))) : [];
  const assigned = new Set(groups.flat().map(problem => problem.slug));
  if (family) groups[3].push(...problems.filter(problem => !assigned.has(problem.slug)));
  const problemLink = (problem: Problem) => <Link href={legalProblemPath(region, isArabic ? "ar" : "en", service, problem.slug)}>
    <span>{isArabic ? problem.titleAr : problem.titleEn}</span><ArrowRight size={17} aria-hidden="true" />
  </Link>;
  return <div className="legal-experience-content">
    <section id="service-overview" className="legal-experience-introduction" aria-labelledby="service-overview-heading">
      <h2 id="service-overview-heading">{c.heading}</h2>
      <p className="legal-experience-introduction__lead">{c.introduction}</p>
      <p>{c.experience}</p>
      <p>{c.invitation}</p>
      <ContactLink href={contactHref} className="legal-experience-contact" data-cta={contactHref.startsWith("mailto:") ? "email" : "contact"} data-conversion-position="service-introduction" data-region={region} data-lang={isArabic ? "ar" : "en"}>
        {c.contact}<ArrowRight size={18} aria-hidden="true" />
      </ContactLink>
    </section>
    <section aria-labelledby="service-covers-heading" className="legal-experience-coverage">
      <h2 id="service-covers-heading">{c.coverageTitle}</h2>
      {c.coverageIntro && <p>{c.coverageIntro}</p>}
      <ul className="legal-experience-coverage__grid speakable-covers">{c.coverage.map(item => <li key={item.title}>
        <h3>{item.title}</h3>{item.text && <p>{item.text}</p>}
      </li>)}</ul>
    </section>
    <CounselOFeatures isArabic={isArabic} />
    {problems.length > 0 && <section className="legal-experience-problems" aria-labelledby="common-problems-heading">
      <h2 id="common-problems-heading">{family ? familyCopy.problemsTitle : isArabic ? "اختر المسألة التي تحتاج إلى المساعدة فيها" : "Find support for your specific issue"}</h2>
      <p>{family ? familyCopy.problemsIntro : isArabic ? "استكشف نطاق المراجعة القانونية لكل مسألة، واعرض ملفك على فريقنا للحصول على مشورة مخصصة." : "Explore the legal review available for each issue, then bring your matter to our team for advice tailored to your position."}</p>
      {family ? <div className="legal-experience-problems__grid">{groups.map((group, index) => <div className="legal-experience-problems__group" key={familyCopy.problemGroups[index]}>
        <h3>{familyCopy.problemGroups[index]}</h3><ul>{group.map(problem => <li key={problem.slug}>{problemLink(problem)}</li>)}</ul>
      </div>)}</div> : <ul className="legal-experience-problems__links">{problems.map(problem => <li key={problem.slug}>{problemLink(problem)}</li>)}</ul>}
    </section>}
  </div>;
}

export function ServiceContact({ copy: c, isArabic, region, contactHref, whatsappHref }: {
  copy: ExperienceCopy; isArabic: boolean; region: Region; contactHref: string; whatsappHref: string;
}) {
  const shared = saudiFamilyServiceCopy[isArabic ? "ar" : "en"];
  const ContactLink = contactHref.startsWith("/") ? Link : "a";
  return <section id="service-contact" className="legal-experience-closing" aria-labelledby="service-contact-heading">
    <div className="legal-experience-closing__copy"><h2 id="service-contact-heading">{c.contactTitle}</h2><p>{c.contactText}</p></div>
    <div className="legal-experience-closing__actions">
      <ContactLink href={contactHref} data-cta={contactHref.startsWith("mailto:") ? "email" : "contact"} data-conversion-position="service-contact" data-region={region} data-lang={isArabic ? "ar" : "en"} className="legal-experience-closing__primary">
        <span>{c.contact}</span><ArrowRight size={18} aria-hidden="true" />
      </ContactLink>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="service-contact" data-region={region} data-lang={isArabic ? "ar" : "en"} className="legal-experience-closing__secondary">
        <MessageCircle size={19} aria-hidden="true" /><span>{shared.contactWhatsApp}</span>
      </a>
    </div>
    <p className="legal-experience-closing__note">{shared.contactNote}</p>
  </section>;
}
