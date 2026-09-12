import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  updateEditorialSchema,
  routeToFlatFilename,
  type UpdateRegion,
} from "@workspace/api-zod";
export function validateEditorial(value: unknown, region: UpdateRegion) {
  const editorial = updateEditorialSchema.parse(value || {});
  if (Boolean(editorial.correctionEn) !== Boolean(editorial.correctionAr))
    throw new Error("Corrections require both English and Arabic");
  if (editorial.correctionAr && !/[\u0600-\u06ff]/.test(editorial.correctionAr))
    throw new Error("Arabic correction is missing");
  if (editorial.status === "superseded" && !editorial.successorSlug)
    throw new Error("Select the later published update");
  if (editorial.status === "current" && editorial.successorSlug)
    throw new Error("A replacement link requires superseded status");
  if (
    editorial.imageUrl &&
    (!editorial.imageAltEn || !/[\u0600-\u06ff]/.test(editorial.imageAltAr))
  )
    throw new Error(
      "Representative images need meaningful English and Arabic alternatives",
    );
  const root = existsSync(resolve("artifacts/legal-site/dist/public/__pages"))
    ? resolve("artifacts/legal-site/dist/public/__pages")
    : resolve("../legal-site/dist/public/__pages");
  for (const path of editorial.relatedMatterPaths) {
    if (
      !path.startsWith(`/${region}/services/`) ||
      !existsSync(resolve(root, routeToFlatFilename(path))) ||
      !existsSync(
        resolve(
          root,
          routeToFlatFilename(path.replace(`/${region}/`, `/${region}/ar/`)),
        ),
      )
    )
      throw new Error(
        "Related matter must be an existing bilingual page in the same jurisdiction",
      );
  }
  return editorial;
}
