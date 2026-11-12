/** Navigation and platform-wide coverage facts do not identify the law applied to a matter. */
export function jurisdictionEditorialContent(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
    .replace(/<section\b(?=[^>]*\bclass=["'][^"']*\bplatform-facts(?:\s|["']))[^>]*>[\s\S]*?<\/section>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

/** Explicit contrasts and intake-number labels do not assert Saudi law applies. */
export function jurisdictionAdviceForContaminationCheck(text: string): string {
  return text
    .replace(/Saudi anti-concealment rules should not be imported into the analysis\./g, "")
    .replace(/ولا تنقل إليه نظام مكافحة التستر السعودي\./g, "")
    .replace(/do not import a Saudi transfer procedure merely because the worker is Syrian\./g, "")
    .replace(/فلا تنقل إجراءات السعودية إلى الملف لمجرد أن العامل سوري\./g, "")
    .replace(/Regional intake phone & WhatsApp \(Saudi number\)/g, "Regional intake phone & WhatsApp")
    .replace(/رقم الاستقبال الإقليمي وواتساب \(رقم سعودي\)/g, "رقم الاستقبال الإقليمي وواتساب");
}
