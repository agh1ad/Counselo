import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import counseloLogo from "@assets/Screen_Shot_2026-07-01_at_12.26.11_AM_1782851175169.png";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";

const regionPickerSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CounselO",
  "alternateName": "CounselO Online Legal Consultations",
  "url": "https://counselo-legal.com/",
  "description": "Online legal consultation platform serving Saudi Arabia and Syria — professional Arabic & English legal advice within 24 hours via WhatsApp or email. 30+ years experience, 20,000+ cases.",
  "publisher": {
    "@type": "Organization",
    "name": "CounselO",
    "url": "https://counselo-legal.com",
    "logo": "https://counselo-legal.com/logo.png",
    "founder": { "@type": "Person", "name": "Omar Al-Baghdadi", "jobTitle": "Lawyer and Legal Counsel" },
    "areaServed": [
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Syria" },
    ],
    "availableLanguage": ["Arabic", "English"],
  },
};

export default function RegionPicker() {
  return (
    <div className="min-h-screen bg-[#162b20] flex flex-col items-center justify-center px-4 py-16">
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>CounselO | Online Legal Consultation in Saudi Arabia & Syria</title>
        <meta name="description" content="Get online legal consultation for Saudi Arabia or Syria in Arabic or English. Senior lawyer-led answers within 24 hours via WhatsApp or email." />
        <meta name="keywords" content="online legal consultation Saudi Arabia Syria, استشارة قانونية أونلاين السعودية سوريا, lawyer Saudi Arabia online, محامي أونلاين المملكة, محامي أونلاين سوريا, legal advice Middle East, مشورة قانونية الشرق الأوسط, CounselO, Omar Al-Baghdadi" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="MENA" />
        <meta name="geo.placename" content="Middle East" />
        <link rel="canonical" href="https://counselo-legal.com/" />
        <link rel="alternate" hrefLang="en-SA" href="https://counselo-legal.com/sa" />
        <link rel="alternate" hrefLang="ar-SA" href="https://counselo-legal.com/sa/ar" />
        <link rel="alternate" hrefLang="en-SY" href="https://counselo-legal.com/syr" />
        <link rel="alternate" hrefLang="ar-SY" href="https://counselo-legal.com/syr/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://counselo-legal.com/" />
        <meta property="og:title" content="CounselO | Online Legal Consultation in Saudi Arabia & Syria" />
        <meta property="og:description" content="Get online legal consultation for Saudi Arabia or Syria in Arabic or English. Senior lawyer-led answers within 24 hours via WhatsApp or email." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CounselO كاونسلو" />
        <meta property="og:url" content="https://counselo-legal.com/" />
        <meta property="og:image" content="https://counselo-legal.com/opengraph.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_SA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CounselOLegal" />
        <meta name="twitter:title" content="CounselO | Online Legal Consultation in Saudi Arabia & Syria" />
        <meta name="twitter:description" content="Get online legal consultation for Saudi Arabia or Syria in Arabic or English. Senior lawyer-led answers within 24 hours via WhatsApp or email." />
        <meta name="twitter:image" content="https://counselo-legal.com/opengraph.jpg" />
        <script type="application/ld+json">{JSON.stringify(regionPickerSchema)}</script>
      </Helmet>
      <div className="flex flex-col items-center gap-10 max-w-2xl w-full text-center">
        <img
          src={counseloLogo}
          alt="CounselO — Online Legal Consultations"
          className="h-24 w-auto object-contain"
        />

        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-2 leading-snug">
            Online Legal Consultation Platform
          </h1>
          <p className="text-white/60 text-sm">
            Select your region to continue · اختر منطقتك للمتابعة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg">
          <Link href="/sa">
            <div className="group cursor-pointer border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 transition-all duration-200 p-7 flex flex-col items-center gap-4 rounded-sm">
              <img
                src={saudiFlag}
                alt="Saudi Arabia"
                className="h-12 w-auto object-cover rounded-sm shadow border border-white/20"
                style={{ aspectRatio: "3/2", width: "72px" }}
              />
              <div>
                <div className="text-white font-semibold text-base mb-0.5">Saudi Arabia</div>
                <div className="text-white/60 text-sm">المملكة العربية السعودية</div>
              </div>
              <div className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                Enter →
              </div>
            </div>
          </Link>

          <Link href="/syr">
            <div className="group cursor-pointer border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 transition-all duration-200 p-7 flex flex-col items-center gap-4 rounded-sm">
              <img
                src={syrianFlag}
                alt="Syria"
                className="h-12 w-auto object-cover rounded-sm shadow border border-white/20"
                style={{ aspectRatio: "3/2", width: "72px" }}
              />
              <div>
                <div className="text-white font-semibold text-base mb-0.5">Syria</div>
                <div className="text-white/60 text-sm">سوريا</div>
              </div>
              <div className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                Enter →
              </div>
            </div>
          </Link>
        </div>

        <p className="text-white/30 text-xs max-w-sm leading-relaxed">
          Professional online legal consultations · Arabic & English · Response within 24 hours
          <br />
          استشارات قانونية إلكترونية احترافية · عربي وإنجليزي · ردّ خلال 24 ساعة
        </p>
      </div>
    </div>
  );
}
