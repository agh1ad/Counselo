/**
 * Keeps legacy service copy aligned with CounselO Legal's published role model.
 * Consultation, preparation and representation are delivered by CounselO's team.
 * Locally licensed team members handle work requiring local authorisation.
 * Owner-confirmed service model, 2026-11-18.
 */
export function qualifyProfessionalRoleCopy<T>(value: T): T {
  if (typeof value === "string") {
    const qualified = value
      .replace(/At CounselO Legal, we represent /gi, "CounselO’s locally licensed team lawyers represent ")
      .replace(/\bWe represent /g, "Our locally licensed team lawyers represent ")
      .replace(/\bwe represent /g, "our locally licensed team lawyers represent ")
      .replace(/\bRepresenting /g, "Our locally licensed team lawyers represent ")
      .replace(/\bWe file the claim\b/g, "Our locally licensed team lawyers file the claim")
      .replace(/\bOur criminal defense team files\b/g, "Our locally licensed criminal defense team files")
      .replace(/\bLicensed Legal Counsel · UAE · Saudi Arabia · Syria\b/g, "One Legal Team · Saudi Arabia · Syria · UAE")
      .replace(/\blicensed lawyers across three jurisdictions\b/gi, "lawyers across three jurisdictions")
      .replace(/Legal Consultant Omar Al-Baghdadi/g, "Legal Counsel Omar Al-Baghdadi")
      .replace(/نحن نمثل/g, "يمثل محامو فريقنا المرخصون محلياً")
      .replace(/تمثل كاونسلو للاستشارات القانونية/g, "يمثل فريق كاونسلو من المحامين المرخصين محلياً")
      .replace(/نمثل عملاء/g, "يمثل محامو فريقنا المرخصون محلياً عملاء")
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
