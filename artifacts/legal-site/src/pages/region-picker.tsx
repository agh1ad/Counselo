import { Link } from "wouter";
import counseloLogo from "@assets/Screen_Shot_2026-07-01_at_12.26.11_AM_1782851175169.png";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";

export default function RegionPicker() {
  return (
    <div className="min-h-screen bg-[#162b20] flex flex-col items-center justify-center px-4 py-16">
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
