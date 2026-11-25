import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH, ABDULLAH_PROFILE_PATHS, type Region } from "@workspace/api-zod/browser";
import { aboutContent, aboutRegions, syrianPartners } from "./about-content";

export function RegionalAboutTeam({ region, language }: { region: Region; language: "en" | "ar" }) {
  const isRTL = language === "ar";
  const local = aboutRegions[region][language];
  const viewFirmProfile = isRTL ? "عرض ملف المكتب" : "View firm profile";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <section id="team-office" className="about-partner about-shell" aria-labelledby="about-partner-heading">
    <div className="about-partner__identity">
      {region === "sa"
        ? <img className="about-partner__logo" src={ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH} width={569} height={762}
            alt={isRTL ? "شعار مكتب المحامي عبدالله العنزي" : "Abdullah Al-Anzi Law Office logo"} loading="lazy" decoding="async" />
        : <ShieldCheck size={32} strokeWidth={1.5} aria-hidden="true" />}
      <div className="about-partner__name">
        {region === "sa" && <p className="about-kicker">{aboutContent[language].partnerLabel}</p>}
        <h2 id="about-partner-heading">{local.partnerTitle}</h2>
      </div>
    </div>
    {region === "syr" ? <ul className="about-partner__offices">
      {syrianPartners[language].map(partner => <li key={partner.name}>
        <img className="about-partner__office-logo" src={partner.logo} alt={partner.logoAlt} width={700} height={300} loading="lazy" decoding="async" />
        <h3>{partner.name}</h3>
        <p>{partner.description}</p>
        <a className="about-button about-button--gold mt-4" href={partner.profileHref} aria-label={`${viewFirmProfile} — ${partner.name}`}>{viewFirmProfile}<Arrow size={17} aria-hidden="true" /></a>
      </li>)}
    </ul> : <>
      <p>{local.partnerText}</p>
      {region === "sa" && <Link className="about-button about-button--gold mt-4" href={ABDULLAH_PROFILE_PATHS[language]} aria-label={`${viewFirmProfile} — ${local.partnerTitle}`}>{viewFirmProfile}<Arrow size={17} aria-hidden="true" /></Link>}
    </>}
  </section>;
}
