import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import counseloLogo from "@assets/Screen_Shot_2026-07-01_at_12.26.11_AM_1782851175169.png";

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src={counseloLogo} alt="CounselO — Online Legal Consultations" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">{f.tagline}</p>
            <div className="flex space-x-4 rtl:space-x-reverse text-white/60">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a
                href="https://www.linkedin.com/in/lawyeromarbaghdadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn — Lawyer Omar Al-Baghdadi"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-6">{f.practiceAreasHeading}</h3>
            <ul className="space-y-3 text-sm text-white/70">
              {f.practiceAreaLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-6">{f.quickLinksHeading}</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">{f.links.home}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">{f.links.allServices}</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">{f.links.about}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{f.links.blog}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{f.links.contact}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{f.links.book}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-6">{f.contactHeading}</h3>
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
            <Link href="/privacy-policy" className="hover:text-white transition-colors">{f.privacy}</Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
