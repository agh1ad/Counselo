import type { UpdateRegion } from "./legal-updates.js";
export interface OfficialSource {
  id: string;
  region: UpdateRegion;
  name: string;
  nameAr: string;
  url: string;
}
// Exact origins only. SANA is an official announcement source, not a substitute for legislation.
export const officialSources: OfficialSource[] = [
  {
    id: "sa-moj",
    region: "sa",
    name: "Saudi Ministry of Justice",
    nameAr: "وزارة العدل السعودية",
    url: "https://www.moj.gov.sa/ar/MediaCenter/News/Pages/NewsArchive.aspx",
  },
  {
    id: "sa-gazette",
    region: "sa",
    name: "Umm Al-Qura Official Gazette",
    nameAr: "جريدة أم القرى الرسمية",
    url: "https://www.uqn.gov.sa/rssFeed/21",
  },
  {
    id: "sa-tax",
    region: "sa",
    name: "Zakat, Tax and Customs Authority",
    nameAr: "هيئة الزكاة والضريبة والجمارك",
    url: "https://zatca.gov.sa/en/MediaCenter/News/Pages/default.aspx",
  },
  {
    id: "sa-cma",
    region: "sa",
    name: "Capital Market Authority",
    nameAr: "هيئة السوق المالية",
    url: "https://cma.gov.sa/Market/NEWS/Pages/default.aspx",
  },
  {
    id: "sa-scb",
    region: "sa",
    name: "Saudi Central Bank",
    nameAr: "البنك المركزي السعودي",
    url: "https://www.sama.gov.sa/en-US/News/Pages/default.aspx",
  },
  {
    id: "sa-labor",
    region: "sa",
    name: "Ministry of Human Resources and Social Development",
    nameAr: "وزارة الموارد البشرية والتنمية الاجتماعية",
    url: "https://www.hrsd.gov.sa/media-center/news",
  },
  {
    id: "uae-law",
    region: "uae",
    name: "UAE Legislation",
    nameAr: "منصة تشريعات الإمارات",
    url: "https://www.uaelegislation.gov.ae/en/news",
  },
  {
    id: "uae-tax",
    region: "uae",
    name: "Federal Tax Authority",
    nameAr: "الهيئة الاتحادية للضرائب",
    url: "https://tax.gov.ae/en/media.centre/news.aspx",
  },
  {
    id: "uae-cb",
    region: "uae",
    name: "Central Bank of the UAE",
    nameAr: "مصرف الإمارات العربية المتحدة المركزي",
    url: "https://centralbank.ae/en/news-and-publications/news-and-insights/",
  },
  {
    id: "uae-economy",
    region: "uae",
    name: "UAE Ministry of Economy and Tourism",
    nameAr: "وزارة الاقتصاد والسياحة الإماراتية",
    url: "https://www.moet.gov.ae/en/web/guest/news",
  },
  {
    id: "syr-sana",
    region: "syr",
    name: "Syrian Arab News Agency — official announcements",
    nameAr: "الوكالة العربية السورية للأنباء — الإعلانات الرسمية",
    url: "https://sana.sy/en/information/",
  },
];
