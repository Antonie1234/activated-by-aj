'use client';

import Link from 'next/link';
import AJLogo from './AJLogo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/faq', label: 'FAQ' },
  { href: '/apparel', label: 'Apparel' },
  { href: '/web-design', label: 'Digital Services' },
  { href: '/contact', label: "Let's Activate" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(42,42,42,0.8)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <AJLogo height={36} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium coaching, web design and lifestyle services — based in Sydney, Australia.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href="https://wa.me/61459575625"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs px-4 py-2 text-center"
              >
                WhatsApp
              </a>
              <a
                href="mailto:activatedbookingsbyaj@gmail.com"
                className="btn-outline text-xs px-4 py-2 text-center"
              >
                Email
              </a>
              <a
                href="https://www.instagram.com/activatedbyaj_"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs px-4 py-2 text-center"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: 'var(--brand-blue-light)' }}
            >
              Navigate
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: 'var(--brand-blue-light)' }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/61459575625"
                  className="text-white text-sm hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +61 459 575 625
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <a
                  href="mailto:activatedbookingsbyaj@gmail.com"
                  className="text-white text-sm hover:opacity-80 transition-opacity break-all"
                >
                  activatedbookingsbyaj@gmail.com
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/activatedbyaj_"
                  className="text-white text-sm hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @activatedbyaj_
                </a>
              </li>
              <li>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Website</p>
                <a
                  href="https://activated-by-aj.vercel.app"
                  className="text-white text-sm hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  activated-by-aj.vercel.app
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p>© {new Date().getFullYear()} Activated by AJ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
