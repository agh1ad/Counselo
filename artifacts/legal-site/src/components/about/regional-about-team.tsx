import type { Region } from "@workspace/api-zod/browser";
import { aboutRegions } from "./about-content";
import { TeamDirectoryEntries, TeamDirectoryFlag } from "./team-directory-entries";

export function RegionalAboutTeam({ region, language }: { region: Region; language: "en" | "ar" }) {
  const local = aboutRegions[region][language];
  const title = region === "sa"
    ? (language === "ar" ? "فريقنا القانوني في السعودية" : "Our legal team in Saudi Arabia")
    : local.partnerTitle;
  return <section id="team-office" className="about-shell team-directory team-directory--regional" aria-labelledby="about-partner-heading">
    <header className="team-directory__intro">
      <TeamDirectoryFlag region={region} />
      <h2 id="about-partner-heading">{title}</h2>
    </header>
    <div className="team-directory__register">
      <div className="team-directory__entries">
        <TeamDirectoryEntries region={region} language={language} regional />
      </div>
    </div>
  </section>;
}
