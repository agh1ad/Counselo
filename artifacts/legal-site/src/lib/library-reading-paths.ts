type ReadingPost = { slug: string; published?: boolean; titleAr?: string | null; titleEn?: string | null };

// Subject selection is editorial, not an inference from a keyword fragment.
// Resolve against current published records so removing an article removes its link.
export const LIBRARY_READING_PATHS = [
  { id: "contract-formation", ar: "تكوين العقد وصحته وتفسيره", en: "Contract formation, validity and interpretation", slugs: [
    "alaqd-fy-alqanwn-alswry", "alahlyh-fy-altaaqd-fy-alqanwn-alswry", "alrda-fy-alqanwn-alswry", "mhl-alaqd-fy-alqanwn-alswry", "consensual-formal-real-contracts-syrian-law", "defects-of-will-syrian-law", "contract-interpretation-syrian-courts", "performance-of-contracts-in-good-faith-under-syrian-law", "formation-of-commercial-contracts-saudi-law", "e-contracts-legal-validity-saudi-arabia",
  ] },
  { id: "contract-remedies", ar: "الإخلال بالعقد والفسخ والتعويض", en: "Contract breach, termination and compensation", slugs: [
    "Penalty-clause-in-saudi", "alfrq-byn-alfskh-waltawyd-fy-alaqwd-altjaryh", "almswwlyh-alaqdyh-fy-almaamlat-altjaryh", "almswwlyh-alaqdyh-fy-alqanwn-alswry", "altawyd-an-alakhlal-balaqd-fy-alqanwn-alswry", "contractual-liability-in-commercial-transactions", "fskh-alaqd-altjary-fy-alnzam-alsawdy", "alaywb-alkhfyh-fy-alaqwd-wathrha-alqanwny",
  ] },
  { id: "commercial-agreements", ar: "الامتياز والوكالة والتوريد والمقاولات", en: "Franchises, agencies, supply and construction", slugs: [
    "aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy", "aqwd-alwkalat-altjaryh-fy-alnzam-alsawd", "commercial-supply-contracts-in-saudi", "aqwd-almqawlat-fy-alnzam-alsawdy", "mta-ysthq-alwsyt-altjary-kaml-amwlth",
  ] },
  { id: "evidence", ar: "الإثبات والتوقيع والسندات", en: "Evidence, signatures and promissory notes", slugs: [
    "athbat-alaqwd-amam-alqda-alsawdy", "hdwd-alymyn-alhasmh-fy-alathbat-almdny-swry", "hyn-ykwn-alaqrar-aqwa-mn-alankar", "altwqya-ala-byad", "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy",
  ] },
  { id: "employment", ar: "الأجور وإنهاء العمل ومسؤولية العامل", en: "Wages, dismissal and employee liability", slugs: [
    "altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha", "anha-aqd-alaml-bdwn-sbb-mshrwa", "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh",
  ] },
  { id: "dispute-review", ar: "دراسة النزاع والتحكيم والتسوية ومراجعة الأحكام", en: "Dispute assessment, arbitration, settlement and judgment review", slugs: [
    "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh", "mta-ykwn-alqrar-aladary-qabla-llalgha-amam-dywan-almzalm", "mta-yfqd-shrt-althkym-athrh-alamly-fy-alnzaa", "mta-ykwn-alslh-afdl-mn-alastmrar-fy-alkhswmh", "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh", "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa", "mta-ysbh-astamal-alhq-tasfa-fy-alnzam-alsawdy", "almswwlyh-an-fal-alghyr",
  ] },
  { id: "drafting-governance", ar: "الصياغة والحوكمة ومنهجية المراجعة", en: "Drafting, governance and review methodology", slugs: [
    "adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy", "altwsyat-alamlyh-lsyaghh-aqd-qwy", "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya", "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh", "mnhjyh-5why-fy-alaml-alqanwny", "syghh-mdhkrh-tfahm-qablh-lltadyl",
  ] },
] as const;

export function libraryReadingPaths<T extends ReadingPost>(posts: T[], ar: boolean) {
  const available = new Map(posts.filter(post => post.published !== false && (ar ? post.titleAr : post.titleEn)?.trim()).map(post => [post.slug, post]));
  return LIBRARY_READING_PATHS.map(group => ({
    id: group.id,
    title: ar ? group.ar : group.en,
    posts: group.slugs.flatMap(slug => available.has(slug) ? [available.get(slug)!] : []),
  })).filter(group => group.posts.length > 0);
}
