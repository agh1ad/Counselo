import { PracticeDirectory } from "./practice-directory";
import { regionalHomeFaqs } from "./regional-home-content";
import { COUNSELO_EXPERIENCE_SCOPE_NOTE } from "@/lib/public-claims";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Scale,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  BriefcaseBusiness,
  House,
  ShieldCheck,
  Users,
  Check,
} from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { ExperienceMethodologyNote } from "@/components/legal/ExperienceMethodologyNote";
import { COUNSELO_ENTITY_IDS } from "@workspace/api-zod/browser";
import en from "./saudi/content.en.json";
import ar from "./saudi/content.ar.json";
import "./saudi-homepage.css";

const icons = [
  Building2,
  Scale,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  BriefcaseBusiness,
  House,
  ShieldCheck,
  Users,
];
export default function SaudiHomepage({ isArabic }: { isArabic: boolean }) {
  const c = isArabic ? ar : en;
  const prefix = isArabic ? "/sa/ar" : "/sa";
  const arrow = <ArrowRight className="sa-arrow" aria-hidden="true" />;
  const text = (s: number, b: number, className?: string) => (
    <p key={b} className={className} data-sa-copy={`${s}:${b}`}>
      {c[s][b]}
    </p>
  );
  const paragraphs = (s: number, start: number, end: number) =>
    Array.from({ length: end - start }, (_, i) => text(s, start + i));
  const title = (s: number, id: string) => (
    <div className="sa-section-heading">
      <p className="sa-eyebrow" data-sa-copy={`${s}:0`}>
        {c[s][0]}
      </p>
      <h2 id={id} data-sa-copy={`${s}:1`}>
        {c[s][1].split("\n")[0]}
      </h2>
    </div>
  );
  const link = (s: number, b: number, href: string, primary = false) => (
    <Link
      data-sa-copy={`${s}:${b}`}
      href={href}
      className={primary ? "sa-button" : "sa-text-link"}
    >
      {c[s][b]}
      {arrow}
    </Link>
  );
  const originalFaq = Array.from({ length: 8 }, (_, i) => ({
    question: i === 0 ? c[8][1].split("\n")[1] : c[8][1 + i * 2],
    answer: c[8][2 + i * 2],
  }));
  const faq = [...originalFaq, ...regionalHomeFaqs("sa", isArabic).filter((_, i) => i !== 2)];
  return (
    <div className="sa-home" dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead
        title={c[0][1]}
        description={c[0][2]}
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://counselo-legal.com/#sa-service-directory",
          name: c[0][1],
          description: c[0][3],
          url: `https://counselo-legal.com${prefix}`,
          provider: { "@id": COUNSELO_ENTITY_IDS.organization },
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `https://counselo-legal.com${prefix}/contact`,
            availableLanguage: ["Arabic", "English"],
          },
        }}
        extraSchemas={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((q) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: { "@type": "Answer", text: q.answer },
            })),
          },
        ]}
      />
      <section className="sa-hero" aria-labelledby="sa-home-title">
        <div className="sa-container sa-hero-grid">
          <div className="sa-hero-copy">
            <p className="sa-eyebrow" data-sa-copy="0:0">
              {c[0][0]}
            </p>
            <h1 id="sa-home-title" data-sa-copy="0:1">
              {c[0][1]}
            </h1>
            {text(0, 2, "sa-lede")}
            {text(0, 3)}
            <div className="sa-actions">
              {link(0, 5, `${prefix}/contact`, true)}
              {link(0, 6, `${prefix}/services`)}
            </div>
          </div>
          <div className="sa-hero-visual">
            <div className="sa-map-caption">
              <img
                src="/images/optimized/saudi-arabia-flag.webp"
                width={36}
                height={24}
                alt=""
              />
              <span>
                {isArabic
                  ? "القانون السعودي. إرشاد مهني."
                  : "Saudi law. Professional guidance."}
              </span>
            </div>
            <img
              className="sa-map"
              src="/images/optimized/saudi-jurisdiction-map.svg"
              width={600}
              height={440}
              alt=""
              fetchPriority="high"
            />
            <div className="sa-map-footer">
              <Globe2 size={20} aria-hidden="true" />
              <span>
                {isArabic
                  ? "استشارتك تبدأ أينما كنت"
                  : "Your consultation starts wherever you are"}
              </span>
            </div>
          </div>
        </div>
        <div className="sa-container sa-hero-note">{text(0, 4)}</div>
        <div className="sa-metrics">
          <div className="sa-container">
            {c[0].slice(7).map((item, i) => (
              <div key={item} data-sa-copy={`0:${i + 7}`}>
                <strong>{item.split("\n")[0]}</strong>
                <span>{item.split("\n")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <p className="sa-container" style={{ fontSize: "0.85rem", lineHeight: 1.8, paddingBlock: "1rem" }}>{COUNSELO_EXPERIENCE_SCOPE_NOTE[isArabic ? "ar" : "en"]}</p>
      <PracticeDirectory region="sa" isArabic={isArabic} />
      <section
        id="sa-services"
        className="sa-section sa-container"
        aria-labelledby="sa-services-title"
      >
        <div className="sa-section-split">
          {title(1, "sa-services-title")}
          <div>{paragraphs(1, 2, 4)}</div>
        </div>
        <div className="sa-service-grid">
          {icons.map((Icon, i) => (
            <article key={i}>
              <Icon
                className="sa-service-icon"
                size={25}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 data-sa-copy={`1:${4 + i * 2}`}><Link href={`${prefix}/services/${["companies-law", "business-law", "contracts", "foreign-investment", "arbitration", "enforcement", "employment-law", "real-estate", "administrative-law", "family-law"][i]}`}>{c[1][4 + i * 2]}</Link></h3>
                {text(1, 5 + i * 2)}
              </div>
            </article>
          ))}
        </div>
        <div className="sa-section-action">
          {link(1, 24, `${prefix}/services`, true)}
        </div>
      </section>
      <section
        id="sa-business"
        className="sa-business sa-section"
        aria-labelledby="sa-business-title"
      >
        <div className="sa-container">
          <div className="sa-business-grid">
            <div>
              {title(2, "sa-business-title")}
              {text(2, 2)}
              {text(2, 5)}
            </div>
            <aside className="sa-audiences">
              {text(2, 3)}
              <ul data-sa-copy="2:4">
                {c[2][4].split("\n").map((item) => (
                  <li key={item}>
                    <Check size={17} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
          <div className="sa-business-bottom">
            {text(2, 6)}
            <div className="sa-actions">
              {link(2, 7, `${prefix}/services/business-law`)}
              {link(2, 8, `${prefix}/services/foreign-investment`)}
            </div>
          </div>
        </div>
      </section>
      <section
        id="sa-representation"
        className="sa-section sa-container"
        aria-labelledby="sa-representation-title"
      >
        <div className="sa-representation-grid">
          <div>
            {title(3, "sa-representation-title")}
            {paragraphs(3, 2, 5)}
            {text(3, 7, "sa-scope-note")}
          </div>
          <aside className="sa-office">
            <Scale size={38} strokeWidth={1.2} aria-hidden="true" />
            <p className="sa-eyebrow" data-sa-copy="3:8">
              {c[3][8]}
            </p>
            <h3 data-sa-copy="3:9">{c[3][9]}</h3>
            <p className="sa-license" data-sa-copy="3:10">
              {c[3][10].split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            {text(3, 11)}
            {link(3, 12, `${prefix}/contact`, true)}
          </aside>
        </div>
        <div className="sa-courts">
          {text(3, 5)}
          <ul data-sa-copy="3:6">
            {c[3][6].split("\n").map((item) => (
              <li key={item}>
                <Landmark size={19} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section
        id="sa-why"
        className="sa-why sa-section"
        aria-labelledby="sa-why-title"
      >
        <div className="sa-container">
          {title(4, "sa-why-title")}
          <div className="sa-proof-grid">
            <article>
              <h3 data-sa-copy="4:1">{c[4][1].split("\n")[1]}</h3>
              {text(4, 2)}
            </article>
            <article>
              <h3 data-sa-copy="4:3">{c[4][3]}</h3>
              {text(4, 4)}
              {text(4, 5, "sa-small")}
            </article>
          </div>
          <div className="sa-reasons">
            {[6, 8, 10, 12, 14].map((i) => (
              <article key={i}>
                <Check size={20} aria-hidden="true" />
                <h3 data-sa-copy={`4:${i}`}>{c[4][i]}</h3>
                {text(4, i + 1)}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="sa-founder"
        className="sa-section sa-container sa-founder"
        aria-labelledby="sa-founder-title"
      >
        <div className="sa-founder-photo">
          <img
            src="/omar-baghdadi.jpg"
            width={800}
            height={1200}
            alt={c[5][1]}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div>
          {title(5, "sa-founder-title")}
          {paragraphs(5, 2, 5)}
          <ul className="sa-founder-facts" data-sa-copy="5:5">
            {c[5][5].split("\n").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {link(5, 6, `https://omarbaghdadi.com${isArabic ? "/ar" : "/"}`)}
          <div className="sa-methodology">
            <ExperienceMethodologyNote isArabic={isArabic} />
          </div>
        </div>
      </section>
      <section
        id="sa-process"
        className="sa-process sa-section"
        aria-labelledby="sa-process-title"
      >
        <div className="sa-container">
          {title(6, "sa-process-title")}
          <ol className="sa-steps">
            {[1, 3, 5, 7].map((b, i) => (
              <li key={b}>
                <span className="sa-step-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 data-sa-copy={`6:${b}`}>
                  {(b === 1 ? c[6][b].split("\n")[1] : c[6][b]).replace(
                    /^\d+ — /,
                    "",
                  )}
                </h3>
                {text(6, b + 1)}
              </li>
            ))}
          </ol>
          <div className="sa-process-bottom">
            <div>
              {text(6, 9)}
              {text(6, 10)}
            </div>
            <div className="sa-actions">
              {link(6, 11, `${prefix}/contact`, true)}
              {link(6, 12, "https://wa.me/966594850247")}
            </div>
          </div>
        </div>
      </section>
      <section
        id="sa-insights"
        className="sa-section sa-container"
        aria-labelledby="sa-insights-title"
      >
        <div className="sa-section-split">
          {title(7, "sa-insights-title")}
          <div>
            {text(7, 2)}
            {text(7, 5)}
            <div className="sa-actions">
              {link(7, 6, "#sa-publications")}
              {link(7, 7, isArabic ? "/ar/our-work" : "/our-work")}
            </div>
          </div>
        </div>
        <div className="sa-topics">
          {text(7, 3)}
          <p data-sa-copy="7:4">
            {c[7][4].split(" · ").map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </p>
        </div>
      </section>
      <div id="sa-publications">
        <LatestContentCarousels isArabic={isArabic} region="sa" />
      </div>
      <section
        id="sa-faq"
        className="sa-section sa-container sa-faq-layout"
        aria-labelledby="sa-faq-title"
      >
        {title(8, "sa-faq-title")}
        <div className="sa-faq">
          {faq.map((q, i) => (
            <details key={q.question}>
              <summary data-sa-copy={i < 8 ? `8:${1 + i * 2}` : undefined}>
                {q.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p data-sa-copy={i < 8 ? `8:${2 + i * 2}` : undefined}>{q.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section
        id="sa-contact"
        className="sa-contact sa-section"
        aria-labelledby="sa-contact-title"
      >
        <div className="sa-container">
          {title(9, "sa-contact-title")}
          <div className="sa-contact-copy">{paragraphs(9, 2, 5)}</div>
          <div className="sa-actions">
            {link(9, 5, `${prefix}/contact`, true)}
            {link(9, 6, `${prefix}/contact`)}
            {link(9, 7, "https://wa.me/966594850247")}
          </div>
          {text(9, 8, "sa-small")}
        </div>
      </section>
    </div>
  );
}
