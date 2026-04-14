import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';

const lessonRates = [
  { duration: '30 mins', players: '1 player',  termly: '$65',          payg: '$70' },
  { duration: '45 mins', players: '1 player',  termly: '$85',          payg: '$90' },
  { duration: '45 mins', players: '2 players', termly: '$47 / person', payg: '$51 / person' },
  { duration: '60 mins', players: '1 player',  termly: '$110',         payg: '$115' },
  { duration: '60 mins', players: '2 players', termly: '$60 / person', payg: '$65 / person' },
  { duration: '60 mins', players: '3 players', termly: '$45 / person', payg: '$50 / person' },
  { duration: '60 mins', players: '4 players', termly: '$40 / person', payg: '$45 / person' },
];

export default function Pricing() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-20 right-0 w-80 h-80 opacity-10 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-gold)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Investment
          </p>
          <div className="gold-divider mx-auto mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            PRICING
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Straightforward pricing. No lock-in contracts. Just great coaching.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── PRIVATE LESSON RATES ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              Rates
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              PRIVATE LESSON RATES
            </h2>
            <p className="text-gray-400 text-sm">
              Applies across Tennis, Padel, Pickleball and Beach Sports.
            </p>
          </div>

          {/* Rate table — desktop */}
          <div className="hidden sm:block rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div
              className="grid grid-cols-4 px-6 py-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'var(--surface-2)', color: 'var(--brand-blue-light)' }}
            >
              <span>Duration</span>
              <span>Players</span>
              <span>Termly</span>
              <span>Pay As You Go</span>
            </div>
            {lessonRates.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-6 py-4 items-center transition-colors duration-150"
                style={{
                  background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <span className="font-bold text-white text-sm">{row.duration}</span>
                <span className="text-gray-400 text-sm">{row.players}</span>
                <span className="font-bold text-sm" style={{ color: 'var(--brand-gold)' }}>{row.termly}</span>
                <span className="text-gray-300 text-sm">{row.payg}</span>
              </div>
            ))}
          </div>

          {/* Rate cards — mobile */}
          <div className="sm:hidden space-y-3">
            {lessonRates.map((row, i) => (
              <div
                key={i}
                className="rounded-2xl p-4"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-white text-sm">{row.duration} · {row.players}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Termly</p>
                    <p className="font-bold text-sm" style={{ color: 'var(--brand-gold)' }}>{row.termly}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pay As You Go</p>
                    <p className="text-gray-300 text-sm">{row.payg}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── PROGRAMS & PACKAGES ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              More Options
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              PROGRAMS &amp; PACKAGES
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Fitness & Diet Programs */}
            <div
              className="card card-gold p-8 flex flex-col"
              style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                style={{ background: 'rgba(240,180,41,0.12)', border: '1px solid rgba(240,180,41,0.25)' }}
              >
                <svg width="20" height="20" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-gold)' }}>
                  <rect x="2" y="17" width="5" height="10" rx="1.5" /><rect x="7" y="19" width="4" height="6" rx="1" />
                  <line x1="11" y1="22" x2="33" y2="22" /><rect x="33" y="19" width="4" height="6" rx="1" />
                  <rect x="37" y="17" width="5" height="10" rx="1.5" /><rect x="0" y="15" width="3" height="14" rx="1.5" />
                  <rect x="41" y="15" width="3" height="14" rx="1.5" />
                </svg>
              </div>
              <h3 className="font-black text-white text-lg mb-2">Custom Fitness &amp; Diet Programs</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Receive a fully personalised fitness and nutrition plan built around your goals, lifestyle, and sport.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black" style={{ color: 'var(--brand-gold)' }}>From $100</span>
                <span className="text-gray-400 text-sm">one-off</span>
              </div>
            </div>

            {/* Monthly Coaching Packages — Popular */}
            <div
              className="card p-8 flex flex-col relative overflow-hidden"
              style={{
                background: 'var(--surface-2)',
                border: '2px solid var(--brand-gold)',
              }}
            >
              {/* Popular badge */}
              <div
                className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: 'var(--brand-gold)', color: '#0a0a0a' }}
              >
                Popular
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                style={{ background: 'rgba(240,180,41,0.15)', border: '1px solid rgba(240,180,41,0.3)' }}
              >
                <svg width="20" height="20" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-gold)' }}>
                  <rect x="8" y="8" width="28" height="34" rx="3" /><rect x="16" y="4" width="12" height="8" rx="2" />
                  <line x1="14" y1="20" x2="30" y2="20" /><line x1="14" y1="26" x2="30" y2="26" />
                  <line x1="14" y1="32" x2="24" y2="32" /><polyline points="14,17 16,19 20,15" />
                </svg>
              </div>
              <h3 className="font-black text-white text-lg mb-2">Monthly Coaching Packages</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Structured monthly programmes combining lessons, fitness, and accountability, tailored to your goals.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-white">Pricing on Application</span>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div
            className="mt-10 p-6 rounded-2xl text-center"
            style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
          >
            <p className="text-gray-300 mb-4">
              Not sure which option suits you? Get in touch and we&apos;ll find the right fit.
            </p>
            <Link href="/contact" className="btn-gold">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── WHAT'S COVERED ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            All Sessions Include
          </p>
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-10" style={{ letterSpacing: '-0.02em' }}>
            YOU ALWAYS GET THE BEST
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                label: 'Goal-Focused',
                detail: 'Every session is built around your specific targets',
                svg: (
                  <svg width="28" height="28" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="26" cy="26" r="22" /><circle cx="26" cy="26" r="14" /><circle cx="26" cy="26" r="6" />
                    <line x1="26" y1="2" x2="26" y2="10" /><line x1="26" y1="42" x2="26" y2="50" />
                    <line x1="2" y1="26" x2="10" y2="26" /><line x1="42" y1="26" x2="50" y2="26" />
                  </svg>
                ),
              },
              {
                label: 'Progress Tracking',
                detail: 'We measure what matters so you can see real results',
                svg: (
                  <svg width="28" height="28" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="34" width="8" height="12" rx="1.5" /><rect x="20" y="24" width="8" height="22" rx="1.5" />
                    <rect x="34" y="12" width="8" height="34" rx="1.5" />
                    <line x1="46" y1="20" x2="46" y2="6" /><polyline points="40,12 46,6 52,12" />
                  </svg>
                ),
              },
              {
                label: 'Direct Access',
                detail: 'WhatsApp AJ directly for questions between sessions',
                svg: (
                  <svg width="28" height="28" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M44 32C44 33.06 43.79 34.08 43.37 35.03C42.95 35.98 42.36 36.85 41.62 37.57C40.33 38.8 38.87 39.42 37.32 39.42C36.12 39.42 34.83 39.1 33.47 38.46L26 42L28.54 34.53C27.9 33.17 27.58 31.88 27.58 30.68C27.58 29.13 28.2 27.67 29.43 26.38C30.66 25.09 32.13 24.5 33.5 24.5" />
                    <path d="M26 8H14C10.69 8 8 10.69 8 14V30C8 33.31 10.69 36 14 36H16L22 42V36H26C29.31 36 32 33.31 32 30V20" />
                    <circle cx="40" cy="14" r="8" />
                    <line x1="40" y1="10" x2="40" y2="18" /><line x1="36" y1="14" x2="44" y2="14" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="card card-gold p-6 flex flex-col items-center text-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(240,180,41,0.10)',
                    border: '1px solid rgba(240,180,41,0.2)',
                    color: 'var(--brand-gold)',
                  }}
                >
                  {item.svg}
                </div>
                <h3 className="font-black text-white text-sm uppercase mb-2 tracking-tight">{item.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, var(--brand-blue) 0%, #0d4fa8 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            READY TO INVEST IN YOURSELF?
          </h2>
          <p className="text-blue-100 mb-8">Get in touch and lock in your first session.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Book Now</Link>
            <a
              href="https://wa.me/27713325218"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp AJ
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
