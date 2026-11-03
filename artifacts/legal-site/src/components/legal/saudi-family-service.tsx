import { Link } from "wouter";
import { ArrowRight, UsersRound, MonitorSmartphone, Languages, FileSearch, ClipboardCheck, MessagesSquare, MessageCircle } from "lucide-react";
import { legalProblemPath } from "@/lib/legal-problem-pages";
import { FAMILY_PROBLEM_GROUPS, saudiFamilyServiceCopy } from "./saudi-family-service-content";
import "./saudi-family-service.css";

type Problem = { slug: string; titleEn: string; titleAr: string };
const reasonIcons = [UsersRound, MonitorSmartphone, Languages, FileSearch, ClipboardCheck, MessagesSquare];

export function SaudiFamilyService({ isArabic, contactHref, problems }: {
  isArabic: boolean;
  contactHref: string;
  problems: Problem[];
}) {
  const c = saudiFamilyServiceCopy[isArabic ? "ar" : "en"];
  const groups = FAMILY_PROBLEM_GROUPS.map(slugs => slugs.flatMap(slug => problems.filter(problem => problem.slug === slug)));
  // Keep newly registered guides visible even before their editorial grouping is assigned.
  const assigned = new Set(groups.flat().map(problem => problem.slug));
  groups[3].push(...problems.filter(problem => !assigned.has(problem.slug)));

  return <div className="family-service-content">
    <section id="service-overview" className="family-service-introduction" aria-labelledby="service-overview-heading">
      <h2 id="service-overview-heading">{c.heading}</h2>
      <p className="family-service-introduction__lead">{c.introduction}</p>
      <p>{c.experience}</p>
      <p>{c.invitation}</p>
      <Link href={contactHref} className="family-service-contact" data-cta="contact" data-conversion-position="service-introduction" data-region="sa" data-lang={isArabic ? "ar" : "en"}>
        {c.contact}<ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>

    <section aria-labelledby="service-covers-heading" className="family-service-coverage">
      <h2 id="service-covers-heading">{c.coverageTitle}</h2>
      <p>{c.coverageIntro}</p>
      <ul className="family-service-coverage__grid speakable-covers">
        {c.coverage.map(item => <li key={item.title}>
          <h3>{item.title}</h3><p>{item.text}</p>
        </li>)}
      </ul>
    </section>

    <section id="service-legal-checks" className="family-service-reasons" aria-labelledby="service-legal-checks-heading">
      <h2 id="service-legal-checks-heading">{c.reasonsTitle}</h2>
      <p className="family-service-reasons__intro">{c.reasonsIntro}</p>
      <div className="family-service-reasons__grid">
        {c.reasons.map((reason, index) => {
          const Icon = reasonIcons[index];
          return <article key={reason.title}><Icon size={27} strokeWidth={1.7} aria-hidden="true" /><h3>{reason.title}</h3><p>{reason.text}</p></article>;
        })}
      </div>
    </section>

    <section className="family-service-problems" aria-labelledby="common-problems-heading">
      <h2 id="common-problems-heading">{c.problemsTitle}</h2>
      <p>{c.problemsIntro}</p>
      <div className="family-service-problems__grid">
        {groups.map((group, index) => <div className="family-service-problems__group" key={c.problemGroups[index]}>
          <h3>{c.problemGroups[index]}</h3>
          <ul>{group.map(problem => <li key={problem.slug}>
            <Link href={legalProblemPath("sa", isArabic ? "ar" : "en", "family-law", problem.slug)}>
              <span>{isArabic ? problem.titleAr : problem.titleEn}</span><ArrowRight size={17} aria-hidden="true" />
            </Link>
          </li>)}</ul>
        </div>)}
      </div>
    </section>

  </div>;
}

export function SaudiFamilyContact({ isArabic, contactHref, whatsappHref }: {
  isArabic: boolean;
  contactHref: string;
  whatsappHref: string;
}) {
  const c = saudiFamilyServiceCopy[isArabic ? "ar" : "en"];
  return <section id="service-contact" className="family-service-closing" aria-labelledby="service-contact-heading">
    <div className="family-service-closing__copy">
      <h2 id="service-contact-heading">{c.contactTitle}</h2>
      <p>{c.contactText}</p>
    </div>
    <div className="family-service-closing__actions">
      <Link href={contactHref} data-cta="contact" data-conversion-position="service-contact" data-region="sa" data-lang={isArabic ? "ar" : "en"} className="family-service-closing__primary">
        <span>{c.contact}</span><ArrowRight size={18} aria-hidden="true" />
      </Link>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-conversion-position="service-contact" data-region="sa" data-lang={isArabic ? "ar" : "en"} className="family-service-closing__secondary">
        <MessageCircle size={19} aria-hidden="true" /><span>{c.contactWhatsApp}</span>
      </a>
    </div>
    <p className="family-service-closing__note">{c.contactNote}</p>
  </section>;
}
