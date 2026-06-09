'use client';

import Link from 'next/link';
import AJLogo from './AJLogo';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/investor-pathway', label: 'Investor Pathway' },
  { href: '/web-design', label: 'Digital Services' },
  { href: '/contact', label: "Let's Activate" },
];

const serviceLinks = [
  { href: '/services#tennis', label: 'Tennis Coaching' },
  { href: '/services#padel', label: 'Padel & Pickleball' },
  { href: '/services#fitness', label: 'Fitness & Conditioning' },
  { href: '/services#movement', label: 'Movement & Beach Sports' },
  { href: '/services#programs', label: 'Programs & Plans' },
  { href: '/web-design', label: 'Web Design' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 animate-footer-logo">
              <AJLogo height={52} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Originating, connecting, and activating the future of racquet sport.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#4A7FA5' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Our Services */}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#4A7FA5' }}>
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Get In Touch */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#4A7FA5' }}>
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:activatedbookingsbyaj@gmail.com"
                className="text-gray-400 text-sm hover:text-white transition-colors break-all"
              >
                activatedbookingsbyaj@gmail.com
              </a>
              <a
                href="https://www.instagram.com/activatedbyaj_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                @activatedbyaj_
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600"
          style={{ borderTop: '1px solid rgba(232,244,253,0.12)' }}
        >
          <p>© 2026 Activated. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/reviews" className="hover:text-gray-400 transition-colors">Leave a Review</a>
            <a href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
