import { ArrowLeft, ArrowRight } from "lucide-react";
import { ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH, ABDULLAH_PROFILE_PATHS, type Region } from "@workspace/api-zod/browser";
import { aboutRegions, syrianPartners } from "./about-content";

type Language = "en" | "ar";
const flags = {
  sa: "/images/optimized/saudi-arabia-flag.webp",
  syr: "/images/optimized/syria-flag.webp",
  uae: "/images/optimized/uae-flag.svg",
};

export function TeamDirectoryFlag({ region }: { region: Region }) {
  return <img src={flags[region]} width={32} height={22} alt="" loading="lazy" decoding="async" />;
}

export function TeamDirectoryEntries({ region, language, regional = false }: {
  region: Region;
  language: Language;
  regional?: boolean;
}) {
  const ar = language === "ar";
  const local = aboutRegions[region][language];
  if (region === "uae") {
    return <div className="team-directory__uae">
      {!regional && <h4>{ar ? "محامو كاونسلو في الإمارات" : "CounselO’s UAE legal team"}</h4>}
      <p>{local.partnerText}</p>
    </div>;
  }

  const offices = region === "syr" ? syrianPartners[language] : [{
    name: local.partnerTitle,
    description: local.partnerText,
    logo: ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH,
    profileHref: ABDULLAH_PROFILE_PATHS[language],
    profileLabel: ar ? "ملف المكتب" : "Firm profile",
  }];
  const Heading = regional ? "h3" : "h4";
  const Arrow = ar ? ArrowLeft : ArrowRight;
  return <>{offices.map(office => {
    const label = regional ? (ar ? "عرض ملف المكتب" : "View firm profile") : office.profileLabel;
    const accessibleLabel = region === "sa" && !regional
      ? (ar ? "ملف مكتب المحامي عبدالله العنزي" : "Abdullah Al-Anzi Law Office firm profile")
      : `${label} — ${office.name}`;
    return <div className={region === "syr" ? "team-directory__office team-directory__office--wordmark" : "team-directory__office"} key={office.name}>
      <div className="team-directory__mark">
        <img src={office.logo} alt="" width={region === "syr" ? 700 : 569} height={region === "syr" ? 300 : 762} loading="lazy" decoding="async" />
      </div>
      <div className="team-directory__description">
        <Heading>{office.name}</Heading>
        <p>{office.description}</p>
        <div className="team-directory__links">
          <a href={office.profileHref} aria-label={accessibleLabel}>{label}<Arrow aria-hidden="true" /></a>
        </div>
      </div>
    </div>;
  })}</>;
}
