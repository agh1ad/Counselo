/**
 * Keeps legacy service copy aligned with CounselO's published role model.
 * CounselO can consult, review documents and coordinate work; formal court
 * representation and reserved filings require a separately scoped, licensed
 * practitioner or cooperating office.
 */
export function qualifyProfessionalRoleCopy<T>(value: T): T {
  if (typeof value === "string") {
    const qualified = value
      .replace(/At CounselO, we represent /g, "CounselO provides consultation and can coordinate representation through a separately engaged, appropriately licensed practitioner for ")
      .replace(/At CounselO, we represent /gi, "CounselO provides consultation and can coordinate representation through a separately engaged, appropriately licensed practitioner for ")
      .replace(/\bWe represent you\b/g, "A separately engaged, appropriately licensed practitioner may represent you")
      .replace(/\bWe represent clients\b/g, "A separately engaged, appropriately licensed practitioner may represent clients")
      .replace(/\bWe represent /g, "A separately engaged, appropriately licensed practitioner may represent ")
      .replace(/\bwe represent /g, "a separately engaged, appropriately licensed practitioner may represent ")
      .replace(/\bRepresenting clients\b/g, "Separately engaged, appropriately licensed practitioners may represent clients")
      .replace(/\bRepresenting /g, "Separately engaged, appropriately licensed practitioners may represent ")
      .replace(/\bfull representation\b/gi, "representation under a separate engagement")
      .replace(/\bmanage the full ([^—.!?]+) process\b/gi, "provide consultation on the $1 process and coordinate any separate filing or representation engagement")
      .replace(/\bWe file the claim\b/g, "A separately engaged, appropriately licensed practitioner may file the claim")
      .replace(/\bOur criminal defense team files\b/g, "A separately engaged, appropriately licensed criminal-defense practitioner may file")
      .replace(/\bLicensed Legal Counsel · UAE · Saudi Arabia · Syria\b/g, "Jurisdiction-Scoped Legal Guidance · Saudi Arabia · Syria · UAE")
      .replace(/\blicensed lawyers across three jurisdictions\b/gi, "lawyers across three jurisdictions")
      .replace(/Legal Consultant Omar Al-Baghdadi/g, "Legal Counsel Omar Al-Baghdadi")
      .replace(/نحن نمثل/g, "يمكن ترتيب التمثيل بشكل منفصل عبر مهني مرخص مناسب")
      .replace(/تمثل كاونسلو/g, "تقدم كاونسلو الاستشارة ويمكنها تنسيق التمثيل بشكل منفصل")
      .replace(/نمثل عملاء/g, "تقدم كاونسلو الاستشارة ويمكن ترتيب تمثيل منفصل للعملاء عبر مهني مرخص مناسب")
      .replace(/تمثيل كامل/g, "تمثيل بموجب تكليف مستقل")
      .replace(/محامياً مرخصاً في ثلاث ولايات قضائية/g, "محامياً في ثلاث ولايات قضائية");

    return qualified as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => qualifyProfessionalRoleCopy(item)) as T;
  }
  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      output[key] = qualifyProfessionalRoleCopy(item);
    }
    return output as T;
  }
  return value;
}
