/** Metadata only: the faithful document text is kept in the API server package. */
export interface PublicWorkDocumentTextMetadata {
  slug: string;
  sourceSHA256: string;
  sourceUpdatedAt: string;
  fileSize: number;
  language: "ar" | "en";
  checkedPageCount: number;
}

export const PUBLIC_WORK_DOCUMENT_TEXT_METADATA: readonly PublicWorkDocumentTextMetadata[] = [
  {
    "slug": "atfaqyh-atar-ltqdym-alkhdmat-altqnyh-whlwl-aldhka-alastnaay",
    "sourceSHA256": "a4cc094e35715a18057d443456f7e502c852dbbd17bcda6407e9643a42afa2f8",
    "sourceUpdatedAt": "2026-07-29T04:19:19.570Z",
    "fileSize": 311642,
    "language": "ar",
    "checkedPageCount": 29
  },
  {
    "slug": "maaljh-halh-khta-tby",
    "sourceSHA256": "4047835b789ea6c78d0b2f65bd3b884c553a4d3d6e8f58370ac50c37ab809612",
    "sourceUpdatedAt": "2026-07-30T10:00:29.728Z",
    "fileSize": 344031,
    "language": "ar",
    "checkedPageCount": 2
  },
  {
    "slug": "mswwlyh-almqawlyn",
    "sourceSHA256": "adad1163a5350acab3daed11294b3210cb2e1e485d3bc7a53417177f858d8898",
    "sourceUpdatedAt": "2026-07-31T01:22:56.232Z",
    "fileSize": 231804,
    "language": "ar",
    "checkedPageCount": 4
  },
  {
    "slug": "mnazah-tnfydh",
    "sourceSHA256": "a9192def36df93c50147a89970c4648603c14ec644b2a48580aead18c83a2c4f",
    "sourceUpdatedAt": "2026-09-28T19:11:15.287Z",
    "fileSize": 375717,
    "language": "ar",
    "checkedPageCount": 2
  },
  {
    "slug": "adrah-almkhatr-fy-aqd-tamyny",
    "sourceSHA256": "3c8f8e2bef276f5ee2c853e7cba7ebd8bd20575191d92f583f3039e0793fd2ba",
    "sourceUpdatedAt": "2026-09-28T18:15:57.428Z",
    "fileSize": 407890,
    "language": "ar",
    "checkedPageCount": 4
  },
  {
    "slug": "msthqat-mqawl-tayyd-alhkm-fy-alastynaf",
    "sourceSHA256": "3fa2210f5bbe323c27b1347651772e2cd0c71c5544aa618c0c27fee6992de4e9",
    "sourceUpdatedAt": "2026-10-18T09:51:32.498Z",
    "fileSize": 312646,
    "language": "ar",
    "checkedPageCount": 5
  }
];
