import { Link } from "wouter";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
const counseloLogo = "/images/optimized/counselo-footer-logo.png";

export function Footer() {
  const { t, lang } = useLanguage();
  const { regionPrefix } = useRegion();
  const f = t.footer;

  const p = (path: string) => regionPrefix + path;
  const workPath = lang === "ar" ? "/ar/our-work" : "/our-work";

  return (
    <footer className="bg-[#002d19] pt-16 pb-8 relative overflow-hidden">
      <img
        src="/images/optimized/counselo-gold-legal-line-art-v1.png"
        alt=""
        aria-hidden="true"
        width="1254"
        height="1254"
        loading="lazy"
        decoding="async"
        className="absolute w-[28rem] -end-24 top-16 opacity-[0.1] pointer-events-none"
      />
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4af60]/65 to-transparent absolute top-0 inset-x-0" />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href={regionPrefix} className="flex items-center gap-2 mb-6">
              <img src={counseloLogo} alt="CounselO — Online Legal Consultations" width="64" height="64" loading="lazy" decoding="async" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">{f.tagline}</p>
            <div className="flex space-x-4 rtl:space-x-reverse text-white/60">
              {/* TODO: Replace with real social media page URLs when accounts are created */}
              <a
                href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn — Lawyer Omar Al-Baghdadi"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#e0c078] text-xs uppercase tracking-[0.18em] font-sans font-semibold mb-6">{f.practiceAreasHeading}</h3>
            <ul className="space-y-3 text-sm text-white/70">
              {f.practiceAreaLinks.map((link) => (
                <li key={link.href}><Link href={regionPrefix + link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#e0c078] text-xs uppercase tracking-[0.18em] font-sans font-semibold mb-6">{f.quickLinksHeading}</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href={regionPrefix} className="hover:text-white transition-colors">{f.links.home}</Link></li>
              <li><Link href={p("/services")} className="hover:text-white transition-colors">{f.links.allServices}</Link></li>
              <li><Link href={p("/about")} className="hover:text-white transition-colors">{f.links.about}</Link></li>
              <li><Link href={p("/vision")} className="hover:text-white transition-colors">{lang === "ar" ? "رؤيتنا" : "Our Vision"}</Link></li>
              <li><Link href={workPath} className="hover:text-white transition-colors">{f.links.ourWork}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{f.links.blog}</Link></li>
              <li><Link href={p("/contact")} className="hover:text-white transition-colors">{f.links.contact}</Link></li>
              <li><Link href={p("/contact")} className="hover:text-white transition-colors">{f.links.book}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#e0c078] text-xs uppercase tracking-[0.18em] font-sans font-semibold mb-6">{f.contactHeading}</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/60 shrink-0" />
                <span className="whitespace-pre-line">{f.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/60 shrink-0" />
                <span dir="ltr">{f.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/60 shrink-0" />
                <span>{f.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} CounselO. {f.copyright}
          </p>
          <div className="flex gap-4 text-sm text-white/60">
            <Link href={p("/privacy-policy")} className="hover:text-white transition-colors">{f.privacy}</Link>
            <span className="text-white/20">|</span>
            <Link href={p("/terms-of-service")} className="hover:text-white transition-colors">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
