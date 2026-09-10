import { alignSearchIntentCopy } from "./search-intent-copy";
import { qualifyProfessionalRoleCopy } from "./professional-role-scope";
import { qualifyEeatCopy } from "./eeat-scope";
import type { Translations, Lang } from "../contexts/LanguageContextCore";
import type { Region } from "../contexts/RegionContext";

/** The same immutable public copy pipeline runs before SSR and hydration. */
export function preparePublicTranslations(source: Translations, region: Region, lang: Lang): Translations {
  return qualifyEeatCopy(qualifyProfessionalRoleCopy(alignSearchIntentCopy(source, region, lang)));
}
