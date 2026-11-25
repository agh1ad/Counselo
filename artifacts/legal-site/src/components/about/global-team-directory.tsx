import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH, ABDULLAH_PROFILE_PATHS, COOPERATING_OFFICES } from "@workspace/api-zod/browser";
import { aboutRegions, syrianPartners } from "./about-content";
import { globalAboutContent } from "./global-about-content";

type Language = "en" | "ar";
const flags = {
  sa: "/images/optimized/saudi-arabia-flag.webp",
  syr: "/images/optimized/syria-flag.webp",
  uae: "/images/optimized/uae-flag.svg",
};

function CountryGroup({ country, name, children }: { country: keyof typeof flags; name: string; children: ReactNode }) {
  const id = `about-country-${country}`;
  return <article id={id} className="team-directory__country" aria-labelledby={`${id}-heading`}>
    <header className="team-directory__country-heading">
      <img src={flags[country]} width={32} height={22} alt="" loading="lazy" decoding="async" />
      <h3 id={`${id}-heading`}>{name}</h3>
    </header>
    <div className="team-directory__entries">{children}</div>
  </article>;
}

function OfficeMark({ src, width = 700, height = 300 }: { src: string; width?: number; height?: number }) {
  return <div className="team-directory__mark"><img src={src} alt="" width={width} height={height} loading="lazy" decoding="async" /></div>;
}

export function GlobalTeamDirectory({ language }: { language: Language }) {
  const ar = language === "ar";
  const c = globalAboutContent[language];
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const saudi = aboutRegions.sa[language];
  return <section id="team-office" className="about-shell team-directory" aria-labelledby="about-team-heading">
    <header className="team-directory__intro">
      <h2 id="about-team-heading">{c.countriesTitle}</h2>
      <p>{c.countriesIntro}</p>
    </header>
    <CountryGroup country="sa" name={saudi.country}>
      <div className="team-directory__office">
        <OfficeMark src={ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH} width={569} height={762} />
        <div>
          <h4>{ar ? COOPERATING_OFFICES.saudi.alternateName : COOPERATING_OFFICES.saudi.name}</h4>
          <p>{saudi.partnerText}</p>
          <div className="team-directory__links">
            <a href={ABDULLAH_PROFILE_PATHS[language]} aria-label={ar ? "ملف مكتب المحامي عبدالله العنزي" : "Abdullah Al-Anzi Law Office firm profile"}>{ar ? "ملف المكتب" : "Firm profile"}<Arrow /></a>
          </div>
        </div>
      </div>
    </CountryGroup>
    <CountryGroup country="syr" name={aboutRegions.syr[language].country}>
      {syrianPartners[language].map(partner => <div className="team-directory__office" key={partner.name}>
        <OfficeMark src={partner.logo} />
        <div>
          <h4>{partner.name}</h4>
          <p>{partner.description}</p>
          <div className="team-directory__links">
            <a href={partner.profileHref} aria-label={`${partner.profileLabel} — ${partner.name}`}>{partner.profileLabel}<Arrow /></a>
          </div>
        </div>
      </div>)}
    </CountryGroup>
    <CountryGroup country="uae" name={ar ? "الإمارات العربية المتحدة" : "United Arab Emirates"}>
      <div className="team-directory__uae">
        <h4>{ar ? "محامو كاونسلو في الإمارات" : "CounselO’s UAE legal team"}</h4>
        <p>{aboutRegions.uae[language].partnerText}</p>
      </div>
    </CountryGroup>
  </section>;
}
