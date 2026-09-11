import { correctWorkIntentFields } from "./work-intent-corrections.js";
import { createHash } from "node:crypto";
import { correctPublicWorkFields } from "./work-editorial-corrections.js";
import { WORK_CONTEXT } from "@workspace/api-zod";

type PublicWorkRecord = { slug: string; titleEn?: string | null; titleAr?: string | null; summaryEn?: string | null };

const COMMISSION_TRANSLATION = {
  titleEn: "Reducing a Commercial Commission Claim from SAR 3.48 Million to SAR 584,131",
  summaryEn: "CounselO analysed a commission undertaking and separated its payment conditions. The claim was reduced from SAR 3,480,000 to SAR 584,131, approximately 83.2%, with the judgment upheld on appeal.",
  workTypeEn: "Commercial commission claim — undertaking and claim reduction",
  jurisdictionEn: "Saudi Arabia",
  clientTypeEn: "Large commercial company",
  challengeEn: "The claimant sought a 3% commission on a project valued at SAR 116 million. The defendant had issued and stamped the undertaking, making a blanket denial of the obligation risky. The review therefore examined the separate conditions: 1% depended on an advance payment that had not occurred, while 2% was tied to amounts actually received rather than the entire project value.",
  approachEn: "CounselO reviewed the undertaking and associated financial records, then organised the defence around entitlement and calculation. Working with the legal representative, the team examined payment certificates, the absence of an advance payment and the amounts actually collected. This separated acknowledgement of the underlying undertaking from acceptance of the claimant’s calculation.",
  outcomeEn: "The claim fell from SAR 3,480,000 to SAR 584,131: a reduction of SAR 2,895,869, approximately 83.2%. The published case account records that the judgment was upheld on appeal. The work’s value lay in identifying the conditions for each part of the commission and limiting the calculation to the receipts established in the file. This result concerns the particular case and does not establish a universal commission rule.",
  seoTitleEn: "Commercial Commission Claim Reduced by 83.2% | CounselO",
  seoDescriptionEn: "A Saudi commission case: analysing a signed undertaking, separating advance-payment conditions and calculating entitlement against actual receipts.",
};

/** Fill verified legacy language gaps without overwriting later authored English. */
function applyWorkRepairs<T extends PublicWorkRecord>(sample: T): T {
  sample = correctPublicWorkFields(sample);
  const context = WORK_CONTEXT[sample.slug];
  if (context) sample = { ...sample, relatedServiceSlugs: context.relatedServiceSlugs, relatedBlogSlugs: context.relatedBlogSlugs, relatedWorkSlugs: context.relatedWorkSlugs };
  if (sample.slug === "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal" && !sample.titleEn?.trim() && createHash("sha256").update(String((sample as Record<string, unknown>).summaryAr ?? "")).digest("hex") === "36ef4552956789766938afbd806631d8d0afe38fbfd53db0cd6f5dbf64fbe214") {
    const additions = Object.fromEntries(Object.entries(COMMISSION_TRANSLATION).filter(([key]) => {
      const existing = (sample as Record<string, unknown>)[key];
      return typeof existing !== "string" || !existing.trim();
    }));
    return { ...sample, ...additions };
  }
  if (sample.slug === "adrah-almkhatr-fy-aqd-tamyny" && !sample.titleEn?.trim() && createHash("sha256").update(String((sample as Record<string, unknown>).summaryAr ?? "")).digest("hex") === "fe9d745fa1ecd40a28e04cc3246e004bf3a315ffe5d3b5524910e03dedcd9261") {
    return {
      ...sample,
      titleEn: "Insurance Requirements in a Saudi Construction Contract",
      summaryEn: sample.summaryEn?.trim() ? sample.summaryEn : "CounselO reviewed a contractor’s insurance policy and a notice requiring deficiencies to be corrected. The review identified additional-insured, waiver-of-subrogation and coverage-date issues and set out a response plan.",
      seoTitleEn: "Construction Insurance Contract Review | CounselO",
      seoDescriptionEn: "Reviewing additional insureds, waiver of subrogation and coverage dates after a main contractor’s notice, while preserving separate project claims.",
      ...(sample.titleAr === "ادراة المخاطر في عقد تأميني" ? { titleAr: "إدارة المخاطر في عقد تأميني" } : {}),
    };
  }
  if (sample.slug === "kyf-rfdt-almhkmh-qdyh-malyh-dkhmh-rghm-thbwt-althwyl" && createHash("sha256").update(String((sample as Record<string, unknown>).summaryAr ?? "")).digest("hex") === "bc48c568725101c9c36b027dce20878b2476053da49da41ab2d8f3a792836818") {
    // Translate only this recorded Arabic version; preserve later authored English.
    const translation = {
      titleEn: "Saudi Financial Claim Dismissed Despite Bank Transfers",
      workTypeEn: "Employment-related financial claim, release and bank transfers",
      jurisdictionEn: "Saudi Arabia",
      clientTypeEn: "Employee",
      challengeEn: "The client faced a claim for approximately three quarters of a million Saudi riyals, supported by bank statements and an accounting report prepared by the claimant company. The transfers themselves were documented. The issue was whether those transfers established an outstanding debt, taking account of how the money had been used for the company, the operational records and the financial release.",
      approachEn: "CounselO reviewed the legal and accounting material, traced the funds and compared the transfers with operational documents. The analysis focused on entitlement and the burden of proof rather than denying the transfers. The financial release and the authority of its issuer formed central parts of the defence described in the published account.",
      outcomeEn: "The published account records that the court dismissed the financial claim in full. It states that the court accepted the financial release and the authority of the person who issued it, and found no remaining liability for the amounts claimed. The account illustrates the role of operational records and a financial release in this particular dispute; it does not establish that bank transfers can never prove a debt or guarantee the same outcome in another case.",
    };
    const additions = Object.fromEntries(Object.entries(translation).filter(([key]) => {
      const existing = (sample as Record<string, unknown>)[key];
      return typeof existing !== "string" || !existing.trim();
    }));
    return { ...sample, ...additions };
  }
  return sample;
}

/** Public prose is plain text; do not expose Markdown control characters. */
function cleanWorkText<T extends PublicWorkRecord>(sample: T): T {
  const result = { ...sample } as Record<string, unknown>;
  for (const prefix of ["title", "summary", "workType", "jurisdiction", "clientType", "challenge", "approach", "outcome", "seoTitle", "seoDescription"]) {
    for (const language of ["En", "Ar"]) {
      const key = `${prefix}${language}`;
      if (typeof result[key] === "string") result[key] = (result[key] as string).replace(/\*\*([^]*?)\*\*/g, "$1").replace(/^([ \t]*)\* /gm, "$1• ");
    }
  }
  return result as T;
}

export function repairPublicWorkSample<T extends PublicWorkRecord>(sample: T): T {
  return correctWorkIntentFields(cleanWorkText(applyWorkRepairs(sample)));
}
