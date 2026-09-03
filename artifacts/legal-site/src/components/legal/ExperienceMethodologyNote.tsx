import { COUNSELO_EXPERIENCE_SCOPE_NOTE } from "@/lib/public-claims";

type ExperienceMethodologyNoteProps = {
  isArabic: boolean;
  className?: string;
  id?: string;
};

/**
 * Keeps the public methodology and limitation for CounselO's experience-volume
 * figure identical wherever that figure is used.
 */
export function ExperienceMethodologyNote({
  isArabic,
  className = "",
  id,
}: ExperienceMethodologyNoteProps) {
  return (
    <p id={id} className={className}>
      {isArabic ? COUNSELO_EXPERIENCE_SCOPE_NOTE.ar : COUNSELO_EXPERIENCE_SCOPE_NOTE.en}
    </p>
  );
}
