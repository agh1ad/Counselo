import { Link } from "wouter";

/** A direct country choice fits above the explanatory copy on small screens. */
export function RegionQuickLinks({ isArabic }: { isArabic: boolean }) {
  return (
    <nav className="mt-6 lg:hidden" aria-label={isArabic ? "اختر دولة المسألة القانونية" : "Choose the country for your legal issue"}>
      <p className="mb-3 text-sm font-semibold text-white">
        {isArabic ? "اختر الدولة المتعلقة بمسألتك" : "Choose the country for your issue"}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {[
          { region: "sa", label: isArabic ? "السعودية" : "Saudi Arabia" },
          { region: "syr", label: isArabic ? "سوريا" : "Syria" },
          { region: "uae", label: isArabic ? "الإمارات" : "UAE" },
        ].map(({ region, label }) => (
          <Link key={region} href={`/${region}${isArabic ? "/ar" : ""}`} data-jurisdiction-choice={region}
            className="flex min-h-12 items-center justify-center border border-white bg-white px-2 py-3 text-center text-sm font-bold leading-5 text-[#0d4a31] transition-colors hover:bg-[#f2e6c8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
