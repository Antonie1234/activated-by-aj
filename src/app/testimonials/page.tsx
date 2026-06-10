'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

interface Testimonial {
  id?:      string;
  name:     string;
  initials: string;
  service:  string;
  filter:   string;
  quote:    string;
  rating:   number;
  photo?:   string;
}

// Maps review form sport → testimonial display fields (for approved reviews)
const SPORT_TO_SERVICE: Record<string, string> = {
  Tennis:         'Tennis Coaching',
  Padel:          'Padel Coaching',
  Pickleball:     'Pickleball Coaching',
  'Beach Sports': 'Beach Tennis',
  Fitness:        'Fitness & Conditioning',
  Other:          'Coaching',
};
const SPORT_TO_FILTER: Record<string, string> = {
  Tennis:         'Tennis',
  Padel:          'Padel',
  Pickleball:     'Pickleball',
  'Beach Sports': 'Beach Tennis',
  Fitness:        'Fitness',
  Other:          '',
};

const filters = ['All', 'Tennis', 'Pickleball', 'Padel', 'Beach Tennis', 'Fitness'];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C8A951' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [approved,     setApproved]     = useState<Testimonial[]>([]);

  // Managed testimonials — data/testimonials.json via admin tool
  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data: Testimonial[]) => setTestimonials(data))
      .catch(() => { /* endpoint unavailable — page shows approved reviews only */ });
  }, []);

  // Approved community reviews — feed in automatically after moderation
  useEffect(() => {
    fetch('/api/reviews/approved')
      .then((r) => r.json())
      .then((data: { name: string; sport: string; rating: number; message: string }[]) => {
        setApproved(
          data.map((r) => ({
            name:     r.name,
            initials: r.name.split(' ').map((n) => n[0] ?? '').join('').slice(0, 2).toUpperCase(),
            service:  SPORT_TO_SERVICE[r.sport] ?? 'Coaching',
            filter:   SPORT_TO_FILTER[r.sport]  ?? '',
            quote:    r.message,
            rating:   r.rating,
          }))
        );
      })
      .catch(() => { /* silently ignore */ });
  }, []);

  const allTestimonials = [...testimonials, ...approved];

  const filtered =
    activeFilter === 'All'
      ? allTestimonials
      : allTestimonials.filter((t) => t.filter === activeFilter);

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
            Real Results
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            TESTIMONIALS
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what the Activated community has to say.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── FILTER BAR ── */}
      <section style={{ background: 'var(--background)', paddingBottom: '0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center pb-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={
                  activeFilter === f
                    ? { background: 'var(--brand-gold)', color: '#0a0a0a', boxShadow: '0 4px 16px rgba(232,244,253,0.3)' }
                    : {
                        background: 'var(--surface)',
                        color: 'rgba(74,127,165,0.7)',
                        border: '1px solid var(--border)',
                      }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── TESTIMONIALS GRID ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No testimonials for this filter yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <div
                  key={t.id ?? `${t.name}-${t.filter}-${i}`}
                  className="card card-gold flex flex-col overflow-hidden"
                  data-animate="fade-up"
                  data-animate-delay={String((i % 3) * 100)}
                  style={{ background: 'var(--surface)' }}
                >
                  {/* Gold top accent line */}
                  <div style={{ height: 3, background: 'linear-gradient(90deg, var(--brand-gold), var(--brand-gold-light))', flexShrink: 0 }} />
                  <div className="p-8 flex flex-col flex-1">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4 mb-4">
                    {t.photo ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="rounded-full flex-shrink-0 object-cover"
                        style={{ width: 64, height: 64, objectPosition: t.name === 'Georgia' ? 'top center' : 'center' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 64, height: 64, borderRadius: '50%',
                          background: '#0D1B2A',
                          border: '2px solid var(--brand-gold)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ color: 'var(--brand-gold)', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.initials}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <div
                        className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                        style={{
                          background: 'rgba(74,127,165,0.15)',
                          color: 'var(--brand-gold)',
                          border: '1px solid rgba(74,127,165,0.35)',
                        }}
                      >
                        {t.service}
                      </div>
                    </div>
                  </div>
                  <StarRating count={t.rating} />
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center" data-animate="fade-up">
          <div className="text-5xl mb-6" style={{ color: 'var(--brand-gold)' }}>⚡</div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            READY TO WRITE YOUR OWN STORY?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Join the Activated community and start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Book Your Session
            </Link>
            <Link href="/contact" className="btn-outline">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
