'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

const faqs = [
  {
    q: 'What sports and activities do you coach?',
    a: 'I coach tennis, padel, pickleball, beach tennis, and general fitness and conditioning. Sessions are available for all levels, from complete beginners to competitive players.',
  },
  {
    q: 'Where are sessions held?',
    a: "Sessions are held at a location that suits you — local courts, parks, and outdoor spaces. Just let me know your area when booking and we'll find something convenient.",
  },
  {
    q: 'How do I book a session?',
    a: "Simply fill in the contact form on the Let's Activate page or send an email. I'll get back to you within 24 hours to confirm a time.",
  },
  {
    q: 'Do you offer group sessions?',
    a: 'Yes, I offer both private one-on-one sessions and small group sessions for 2, 3 and 4 players. Check the Pricing page for full details.',
  },
  {
    q: 'What is the difference between termly and pay-as-you-go pricing?',
    a: 'Termly pricing means you commit to a full school term of sessions at a slightly reduced rate. Pay-as-you-go means you book and pay per session with no commitment required.',
  },
  {
    q: 'Do you offer fitness and conditioning programs?',
    a: 'Yes, I offer custom fitness and diet programs from $100 as a one-off, as well as monthly coaching packages tailored to your specific goals.',
  },
  {
    q: 'What level do I need to be to train with you?',
    a: 'All levels welcome, from complete beginners picking up a racquet for the first time, to experienced players looking to sharpen their competitive edge.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Please give at least 24 hours notice to cancel or reschedule a session. Late cancellations may be charged at the full session rate.',
  },
  {
    q: 'What should I bring to a session?',
    a: 'Comfortable sports clothing, a water bottle, and your racquet if you have one. Equipment can be provided if needed, just let me know when booking.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-gold)' }}
        />
        <LogoWatermark size={600} opacity={0.05} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 1 }} data-animate="fade-up">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
            Got Questions?
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            FAQ
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before your first session.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── ACCORDION ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
                data-animate="fade-up"
                data-animate-delay={String(i * 50)}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${openIndex === i ? 'rgba(74,127,165,0.4)' : 'var(--border)'}`,
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-bold text-white text-sm leading-snug">{faq.q}</span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-black transition-transform duration-200"
                    style={{
                      background: openIndex === i ? 'var(--brand-gold)' : 'rgba(74,127,165,0.15)',
                      color: openIndex === i ? '#000' : 'var(--brand-gold)',
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6">
                    <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center" data-animate="fade-up">
          <div className="text-5xl mb-6" style={{ color: 'var(--brand-gold)' }}>⚡</div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            STILL HAVE QUESTIONS?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Let&apos;s chat and I&apos;ll get back to you within 24 hours.
          </p>
          <Link href="/contact" className="btn-gold">
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
