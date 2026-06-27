import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Adlix</span>
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">{f.tagline}</p>
            <div className="flex space-x-4 rtl:space-x-reverse text-white/60">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
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
                <span>{f.phone}</span>
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
            &copy; {new Date().getFullYear()} Adlix. {f.copyright}
          </p>
          <div className="flex gap-4 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">{f.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{f.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
