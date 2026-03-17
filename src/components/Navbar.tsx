'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/apparel', label: 'Apparel' },
  { href: '/contact', label: "Let's Activate" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.97)'
          : 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,42,42,0.8)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="Activated by AJ"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span
            className="font-black text-lg tracking-tight hidden sm:block"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span style={{ color: 'var(--brand-gold)' }}>ACTIVATED</span>
            <span className="text-white"> BY AJ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, -1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={
                pathname === link.href
                  ? { color: 'var(--brand-gold)' }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary ml-4 text-xs">
            Let&apos;s Activate
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ color: 'var(--brand-gold)' }}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-0' : ''}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 origin-left ${isOpen ? '-rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(12px)' }}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 text-sm font-medium rounded transition-colors ${
                pathname === link.href
                  ? 'font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
              style={
                pathname === link.href
                  ? { color: 'var(--brand-gold)', background: 'rgba(240,180,41,0.08)' }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
