import { FAMILY_BRIEFS } from "./family.js";
import { EMPLOYMENT_BRIEFS } from "./employment.js";
import { PROPERTY_BRIEFS } from "./property.js";
import { BUSINESS_BRIEFS } from "./business.js";
import { COMPANY_INVESTMENT_BRIEFS } from "./company-investment.js";
import { CONTRACT_BRIEFS } from "./contracts.js";
import { ARBITRATION_ENFORCEMENT_BRIEFS } from "./arbitration-enforcement.js";
import { CRIMINAL_BRIEFS } from "./criminal.js";
import { CIVIL_BRIEFS } from "./civil.js";
import { ADMINISTRATIVE_BRIEFS } from "./administrative.js";
import { BANKING_BRIEFS } from "./banking.js";
import { IP_DIGITAL_BRIEFS } from "./ip-digital.js";
import { TAX_BRIEFS } from "./tax.js";
import { HEALTH_INSURANCE_BRIEFS } from "./health-insurance.js";
import { MOBILITY_CONSUMER_BRIEFS } from "./mobility-consumer.js";
import { REFINED_BRIEFS } from "./refinements.js";
import type { MatterIntentBrief } from "./types.js";

export const MATTER_INTENT_BRIEFS: readonly MatterIntentBrief[] = [
  ...FAMILY_BRIEFS, ...EMPLOYMENT_BRIEFS, ...PROPERTY_BRIEFS, ...BUSINESS_BRIEFS,
  ...COMPANY_INVESTMENT_BRIEFS, ...CONTRACT_BRIEFS, ...ARBITRATION_ENFORCEMENT_BRIEFS,
  ...CRIMINAL_BRIEFS, ...CIVIL_BRIEFS, ...ADMINISTRATIVE_BRIEFS, ...BANKING_BRIEFS,
  ...IP_DIGITAL_BRIEFS, ...TAX_BRIEFS, ...HEALTH_INSURANCE_BRIEFS,
  ...MOBILITY_CONSUMER_BRIEFS, ...REFINED_BRIEFS,
];
const byTitle = new Map<string, MatterIntentBrief>();
for (const item of MATTER_INTENT_BRIEFS) for (const title of item.titles) {
  if (byTitle.has(title)) throw new Error(`Duplicate matter intent brief: ${title}`);
  byTitle.set(title, item);
}
export function getMatterIntentBrief(title: string): MatterIntentBrief | undefined {
  return byTitle.get(title);
}
