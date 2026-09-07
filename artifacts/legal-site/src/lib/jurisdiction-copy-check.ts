/** Approved jurisdiction boundaries are not offers to apply another country's law. */
export function saudiTermsOutsideJurisdictionBoundaries(text: string): string[] {
  const checked = text
    .replace(/a label used in Saudi anti-concealment law cannot simply be imported into a Syrian file\./g, "")
    .replace(/فلا ينقل وصف التستر الوارد في النظام السعودي آلياً إلى ملف سوري\./g, "");
  return [...new Set(checked.match(/Saudi(?: Arabia)?|\bKSA\b|\bSAMA\b|\bCMA\b|\bZATCA\b|\bMISA\b|\bSAIP\b|\bCITC\b|Vision 2030|السعود(?:ية|ي)?|ساما|هيئة الزكاة/gi) ?? [])];
}
