import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { name: "All Products", href: "/products" },
    { name: "Pipes", href: "/products?category=pipes" },
    { name: "Fittings", href: "/products?category=fittings" },
    { name: "Valves", href: "/products?category=valves" },
    { name: "Fixtures", href: "/products?category=fixtures" },
  ],
  Company: [
    { name: "Home", href: "/home" },
    { name: "Categories", href: "/categories" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/home" className="flex items-center gap-3 mb-4">
              <Image
                src="/icon.png"
                alt="Habib Store"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-white font-bold text-lg">Habib Store</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted plumbing supplier in KPK. Quality pipes, fittings &
              sanitaryware delivered across Peshawar, Mardan, Swat &amp;
              Abbottabad.
            </p>
            {/* Social / Contact quick links */}
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://wa.me/923118688410"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <MessageCircle size={15} /> +92 311 8688410
              </a>
              <a
                href="tel:+923359183182"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Phone size={15} /> +92 335 9183182
              </a>
              <a
                href="mailto:info@habibstore.pk"
                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
              >
                <Mail size={15} /> info@habibstore.pk
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact / Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Visit Us
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-orange-400" />
                <span>Shop #5, Saddar Road, Swabi, KPK, Pakistan</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <div>
                  <p>Mon–Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-slate-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Habib Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
