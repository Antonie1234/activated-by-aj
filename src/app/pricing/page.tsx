import Link from 'next/link';

const lessonRates = [
  { duration: '30 mins', players: '1 player',   termly: '$65',          payg: '$70' },
  { duration: '45 mins', players: '1 player',   termly: '$85',          payg: '$90' },
  { duration: '45 mins', players: '2 players',  termly: '$47 / person', payg: '$51 / person' },
  { duration: '60 mins', players: '1 player',   termly: '$110',         payg: '$115' },
  { duration: '60 mins', players: '2 players',  termly: '$60 / person', payg: '$65 / person' },
  { duration: '60 mins', players: '3 players',  termly: '$45 / person', payg: '$50 / person' },
  { duration: '60 mins', players: '4 players',  termly: '$40 / person', payg: '$45 / person' },
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

          {/* Rate table */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-4 px-6 py-3 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'var(--surface-2)', color: 'var(--brand-blue-light)' }}
            >
              <span>Duration</span>
              <span>Players</span>
              <span>Termly</span>
              <span>Pay As You Go</span>
            </div>

            {/* Rows */}
            {lessonRates.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-6 py-4 items-center"
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
        </div>
      </section>

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
              className="p-8 rounded-lg"
              style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
            >
              <div className="text-3xl mb-4">💪</div>
              <h3 className="font-black text-white text-lg mb-2">Custom Fitness &amp; Diet Programs</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Receive a fully personalised fitness and nutrition plan built around your goals, lifestyle, and sport.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black" style={{ color: 'var(--brand-gold)' }}>From $100</span>
                <span className="text-gray-400 text-sm">one-off</span>
              </div>
            </div>

            {/* Monthly Coaching Packages */}
            <div
              className="p-8 rounded-lg relative overflow-hidden"
              style={{ background: 'var(--brand-blue)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: 'var(--brand-gold)', color: '#0a0a0a' }}
              >
                Popular
              </div>
              <div className="text-3xl mb-4">📅</div>
              <h3 className="font-black text-white text-lg mb-2">Monthly Coaching Packages</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Structured monthly programmes combining lessons, fitness, and accountability — tailored to your goals.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">Pricing on Application</span>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div
            className="mt-10 p-6 rounded-lg text-center"
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
              { icon: '🎯', label: 'Goal-Focused', detail: 'Every session is built around your specific targets' },
              { icon: '📊', label: 'Progress Tracking', detail: 'We measure what matters so you can see real results' },
              { icon: '💬', label: 'Direct Access', detail: 'WhatsApp AJ directly for questions between sessions' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-lg"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-black text-white text-sm uppercase mb-2">{item.label}</h3>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ── CTA ── */}
      <section
        style={{ background: 'linear-gradient(135deg, var(--brand-blue) 0%, #0d4fa8 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            READY TO INVEST IN YOURSELF?
          </h2>
          <p className="text-blue-100 mb-8">Get in touch and lock in your first session.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Book Now</Link>
            <a
              href="https://wa.me/61459575625"
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
