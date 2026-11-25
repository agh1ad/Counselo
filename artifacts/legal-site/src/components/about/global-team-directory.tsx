import type { Region } from "@workspace/api-zod/browser";
import { aboutRegions } from "./about-content";
import { GLOBAL_ABOUT_JURISDICTIONS, globalAboutContent } from "./global-about-content";
import { TeamDirectoryEntries, TeamDirectoryFlag } from "./team-directory-entries";

type Language = "en" | "ar";

function CountryGroup({ region, language }: { region: Region; language: Language }) {
  const id = `about-country-${region}`;
  const name = region === "uae"
    ? (language === "ar" ? "الإمارات العربية المتحدة" : "United Arab Emirates")
    : aboutRegions[region][language].country;
  return <article id={id} className="team-directory__country" aria-labelledby={`${id}-heading`}>
    <header className="team-directory__country-heading">
      <TeamDirectoryFlag region={region} />
      <h3 id={`${id}-heading`}>{name}</h3>
    </header>
    <div className="team-directory__entries"><TeamDirectoryEntries region={region} language={language} /></div>
  </article>;
}

export function GlobalTeamDirectory({ language }: { language: Language }) {
  const c = globalAboutContent[language];
  return <section id="team-office" className="about-shell team-directory" aria-labelledby="about-team-heading">
    <header className="team-directory__intro">
      <h2 id="about-team-heading">{c.countriesTitle}</h2>
      <p>{c.countriesIntro}</p>
    </header>
    <div className="team-directory__register">
      {GLOBAL_ABOUT_JURISDICTIONS.map(region => <CountryGroup key={region} region={region} language={language} />)}
    </div>
  </section>;
}
