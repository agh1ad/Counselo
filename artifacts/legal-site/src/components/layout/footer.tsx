import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Adlix</span>
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Fast, reliable online legal consultations. Connect with verified attorneys in minutes — from anywhere, at any time.
            </p>
            <div className="flex space-x-4 text-white/60">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-6">Practice Areas</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/services/family-law" className="hover:text-white transition-colors">Family Law</Link></li>
              <li><Link href="/services/business-law" className="hover:text-white transition-colors">Business & Corporate</Link></li>
              <li><Link href="/services/criminal-defense" className="hover:text-white transition-colors">Criminal Defense</Link></li>
              <li><Link href="/services/real-estate" className="hover:text-white transition-colors">Real Estate Law</Link></li>
              <li><Link href="/services/immigration" className="hover:text-white transition-colors">Immigration Law</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Book Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/60 shrink-0" />
                <span>100 Legal Plaza, Suite 400<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/60 shrink-0" />
                <span>+1 (800) ADLIX-LAW</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/60 shrink-0" />
                <span>consult@adlix.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Adlix. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
