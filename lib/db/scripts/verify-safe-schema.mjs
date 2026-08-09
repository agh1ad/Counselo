import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const schemaDirectory = resolve(scriptDirectory, "../src/schema");

const [workSamplesSchema, blogPostsSchema] = await Promise.all([
  readFile(resolve(schemaDirectory, "work-samples.ts"), "utf8"),
  readFile(resolve(schemaDirectory, "blog-posts.ts"), "utf8"),
]);

const requiredSchemaMarkers = [
  ["work_samples.testimonials", workSamplesSchema, /testimonials:\s+jsonb\("testimonials"\)/],
  [
    "work_samples.testimonial_governance_version",
    workSamplesSchema,
    /testimonialGovernanceVersion:\s+integer\("testimonial_governance_version"\)/,
  ],
  [
    "blog_posts.legal_reviewer_name approved default",
    blogPostsSchema,
    /default\("Lawyer and Legal Counsel Omar Al-Baghdadi"\)/,
  ],
];

const missingMarkers = requiredSchemaMarkers
  .filter(([, source, marker]) => !marker.test(source))
  .map(([name]) => name);

if (missingMarkers.length > 0) {
  console.error(
    "Refusing database schema push: required production-safe schema markers are missing:",
  );
  for (const marker of missingMarkers) {
    console.error(`- ${marker}`);
  }
  console.error(
    "Use the approved CounselO schema before running a database push. This guard prevents accidental loss of testimonial data.",
  );
  process.exit(1);
}

console.log("Safe schema guard passed: protected testimonial fields and reviewer default are present.");
