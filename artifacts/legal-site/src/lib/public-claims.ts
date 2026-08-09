/**
 * Neutral display wording for the unverified experience figure.
 * Keep this claim unchanged until documentary evidence supports a stronger,
 * jurisdiction-specific statement.
 */
export const COUNSELO_LEGAL_MATTERS_CLAIM = {
  en: "20,000+ legal matters and consultations",
  ar: "أكثر من 20,000 مسألة واستشارة قانونية",
} as const;

export const COUNSELO_LEGAL_MATTERS_STAT = {
  en: "20,000+",
  ar: "+20,000",
} as const;

/** Approved professional-start year used for the public experience claim. */
export const COUNSELO_PROFESSIONAL_START_YEAR = 1996;

export function getCounseloYearsOfPractice(referenceYear = new Date().getFullYear()) {
  return Math.max(0, referenceYear - COUNSELO_PROFESSIONAL_START_YEAR);
}

export function getCounseloLegalPracticeClaim(referenceYear = new Date().getFullYear()) {
  const years = getCounseloYearsOfPractice(referenceYear);
  return {
    en: `${years}+ years of legal practice`,
    ar: `${years}+ عاماً من الممارسة القانونية`,
  } as const;
}

export const COUNSELO_LEGAL_PRACTICE_CLAIM = getCounseloLegalPracticeClaim();
