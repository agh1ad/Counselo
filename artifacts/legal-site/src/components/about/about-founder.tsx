import { ArrowLeft, ArrowRight } from "lucide-react";
import { OMAR_OFFICIAL_PROFILE_URL, OMAR_PORTRAIT } from "@workspace/api-zod/browser";
import "./about-founder.css";

interface FounderContent {
  founderLabel: string;
  founderName: string;
  founderRole: string;
  founderIntro: string;
  founderExperience: string;
  founderFacts: readonly { title: string; text: string }[];
  profileLink: string;
}

export function AboutFounder({ content: c, language }: { content: FounderContent; language: "en" | "ar" }) {
  const isRTL = language === "ar";
  const languagePath = isRTL ? "/ar" : "";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <section className="global-founder" aria-labelledby="about-founder-heading">
    <div className="about-shell global-founder__grid">
      <figure className="global-founder__portrait">
        <img src="/omar-baghdadi.jpg" alt={isRTL ? "المحامي والمستشار القانوني عمر البغدادي، مؤسس كاونسلو" : "Lawyer and legal counsel Omar Al-Baghdadi, founder of CounselO Legal"} width={OMAR_PORTRAIT.width} height={OMAR_PORTRAIT.height} loading="lazy" decoding="async" />
      </figure>
      <header className="global-founder__identity">
        <p className="global-founder__label">{c.founderLabel}</p>
        <h2 id="about-founder-heading">{c.founderName}</h2>
        <p className="global-founder__role">{c.founderRole}</p>
      </header>
      <div className="global-founder__bio">
        <p className="global-founder__intro">{c.founderIntro}</p>
        <p>{c.founderExperience}</p>
        <dl className="global-founder__facts">
          {c.founderFacts.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}
        </dl>
        <a className="global-founder__profile" href={`${OMAR_OFFICIAL_PROFILE_URL}${languagePath}`} target="_blank" rel="noopener noreferrer">
          {c.profileLink}<Arrow size={17} aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>;
}
