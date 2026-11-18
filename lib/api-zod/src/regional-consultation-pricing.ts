import { getServicesForRegion, type Region } from "./region-services.js";
import {
  SAUDI_CONSULTATION_PRICES,
  SAUDI_CONSULTATION_PRICES_UPDATED_AT,
  SAUDI_CONSULTATION_SCOPE,
  type SaudiConsultationCategoryId,
} from "./saudi-consultation-pricing.js";

export type ConsultationPrice = {
  readonly id: string;
  readonly titleEn: string;
  readonly titleAr: string;
  readonly amount: number;
  readonly currency: "SAR" | "AED" | "USD";
  readonly region: Region;
};

export const CONSULTATION_PRICES_UPDATED_AT = SAUDI_CONSULTATION_PRICES_UPDATED_AT;
export const CONSULTATION_SCOPE = SAUDI_CONSULTATION_SCOPE;

// CounselO's selected fixed fees, not market averages or currency conversions.
const SYRIAN_AMOUNTS: Readonly<Record<SaudiConsultationCategoryId, number>> = {
  "family-law": 40,
  "business-law": 60,
  "real-estate": 50,
  "employment-law": 40,
  "foreign-investment": 100,
  "administrative-law": 60,
  "arbitration": 100,
  "enforcement": 50,
  "companies-law": 75,
  "contracts": 60,
  "criminal-law": 60,
  "banking-finance": 75,
  "intellectual-property": 60,
  "tax-zakat": 75,
  "cyber-law": 60,
  "medical-malpractice": 100,
  "insurance-law": 60,
  "civil-law": 50,
  "civil-procedure": 50,
  "criminal-procedure": 60,
  "wills-estates": 60,
  "insolvency-restructuring": 100,
  "immigration-residency": 50,
  "maritime-aviation-transport": 100,
  "consumer-ecommerce": 50,
};

const UAE_AMOUNTS: Readonly<Record<string, number>> = {
  "corporate-commercial": 450,
  "foreign-investment-market-entry": 600,
  "commercial-contracts": 400,
  "employment-labour": 300,
  "real-estate-construction": 350,
  "family-personal-status": 300,
  "wills-estates": 400,
  "criminal-investigations": 400,
  "arbitration-mediation": 600,
  "litigation-court-disputes": 400,
  "enforcement-debt-recovery": 350,
  "banking-finance": 500,
  "insolvency-restructuring": 600,
  "tax-vat": 500,
  "intellectual-property": 400,
  "technology-data-protection": 400,
  "insurance": 400,
  "healthcare-medical-liability": 600,
  "immigration-residency": 300,
  "maritime-aviation-transport": 600,
  "administrative-regulatory": 400,
  "consumer-ecommerce": 300,
};

const syrianServices = new Map(getServicesForRegion("syr").map(service => [service.slug, service]));

const prices: Readonly<Record<Region, readonly ConsultationPrice[]>> = {
  sa: SAUDI_CONSULTATION_PRICES.map(({ priceSAR, ...category }) => ({
    ...category, amount: priceSAR, currency: "SAR", region: "sa",
  })),
  syr: SAUDI_CONSULTATION_PRICES.map(({ priceSAR: _priceSAR, ...category }) => {
    const service = syrianServices.get(category.id);
    return {
      ...category,
      titleEn: service?.titleEn ?? category.titleEn,
      titleAr: service?.titleAr ?? category.titleAr,
      amount: SYRIAN_AMOUNTS[category.id], currency: "USD", region: "syr",
    };
  }),
  uae: getServicesForRegion("uae").filter(service => service.kind !== "priority-intake").map(service => {
    const amount = UAE_AMOUNTS[service.slug];
    if (!amount) throw new Error(`Missing UAE consultation fee: ${service.slug}`);
    return { id: service.slug, titleEn: service.titleEn, titleAr: service.titleAr, amount, currency: "AED", region: "uae" };
  }),
};

const pricesByRegion = {
  sa: new Map(prices.sa.map(category => [category.id, category])),
  syr: new Map(prices.syr.map(category => [category.id, category])),
  uae: new Map(prices.uae.map(category => [category.id, category])),
};

/** Published categories do not create public service routes. */
export function getConsultationPrices(region: Region): readonly ConsultationPrice[] {
  return prices[region];
}

/**
 * Every topic within a service uses that service's published consultation fee.
 * Urgent commissioned drafting and representation are quoted separately.
 */
export function getConsultationPrice(region: Region, serviceSlug: string, _problemSlug?: string): ConsultationPrice | undefined {
  return pricesByRegion[region].get(serviceSlug);
}

/** @deprecated Each service has one consultation fee for all of its topics. */
export function getConsultationRelatedPrices(_region: Region, _serviceSlug: string): readonly ConsultationPrice[] {
  return [];
}
