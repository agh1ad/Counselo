import { getConsultationPrices, getConsultationPrice, getServicesForRegion, type Region } from "@workspace/api-zod/browser";

export function getContactServiceOptions(region: Region, isArabic: boolean) {
  const services = getServicesForRegion(region);
  const regionalOptions = services.map(service => ({ value: service.slug, label: isArabic ? service.titleAr : service.titleEn }));
  return [
    ...getConsultationPrices(region).map(category => ({ value: category.id, label: isArabic ? category.titleAr : category.titleEn })),
    ...regionalOptions.filter(service => service.value === "urgent-legal-assistance"),
  ];
}

/** A service link retains that service's fee, including older links naming a subtopic category. */
export function getContactServicePrefill(region: Region, search: string): string {
  const params = new URLSearchParams(search);
  const requestedService = params.get("service") ?? "";
  if (requestedService !== "urgent-legal-assistance") {
    const category = getConsultationPrice(region, requestedService)
      ?? getConsultationPrice(region, params.get("consultation") ?? "");
    if (category) return category.id;
  }
  return getContactServiceOptions(region, false).some(option => option.value === requestedService) ? requestedService : "";
}

/** Selecting a legal field alone does not commission a paid consultation. */
export function getContactConsultationPrice(region: Region, search: string, selectedService: string) {
  const params = new URLSearchParams(search);
  if (params.get("service") === "urgent-legal-assistance"
    || !getConsultationPrice(region, params.get("consultation") ?? "")) return undefined;
  // The selected parent service remains authoritative, including legacy links
  // that name a differently priced subtopic in the consultation parameter.
  return getConsultationPrice(region, selectedService);
}
