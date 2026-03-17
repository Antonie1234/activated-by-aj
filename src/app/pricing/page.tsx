import Link from 'next/link';

const packages = [
  {
    type: 'Private',
    price: 110,
    per: 'session',
    highlight: false,
    tagline: 'Your session. Your focus.',
    description: 'A dedicated one-on-one session with AJ, fully tailored to your goals, body, and schedule.',
    includes: [
      '1-on-1 with AJ',
      'Customised session plan',
      'Technique coaching & correction',
      'Progress tracking',
      'Post-session feedback',
      'Available in all 3 disciplines',
    ],
    cta: 'Book Private',
  },
  {
    type: 'Semi-Private',
    price: 130,
    per: 'session',
    highlight: true,
    tagline: 'Train together. Save more.',
    description: 'Bring a friend or partner and train together with AJ. Same quality coaching, shared energy.',
    includes: [
      '2 people with AJ',
      'Shared session programming',
      'Competitive, fun dynamic',
      'Group accountability',
      'Progress tracking for both',
      'Available in all 3 disciplines',
    ],
    cta: 'Book Semi-Private',
  },
];

const faqs = [
  {
    q: 'Where do sessions take place?',
    a: 'Sessions are run in and around Willoughby, Sydney. Specific locations depend on the discipline — AJ will confirm details when you book.',
  },
  {
    q: 'How do I pay?',
    a: 'Payment is arranged directly with AJ via bank transfer or cash. You\'ll sort this out when you confirm your booking.',
  },
  {
    q: 'What do I need to bring?',
    a: 'Just yourself and appropriate gear for the session type. AJ will advise on any specific equipment during your consultation.',
  },
  {
    q: 'Can I mix disciplines across my sessions?',
    a: 'Absolutely. Many clients combine tennis with strength training or movement work. AJ will help build a program that crosses disciplines where it makes sense.',
  },
  {
    q: 'Is there a minimum commitment?',
    a: 'No lock-in contracts. Sessions are paid as you go, though packages and programs are available for those who want structure.',
  },
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

      {/* ── PACKAGES ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.type}
                className="rounded-lg p-8 relative overflow-hidden"
                style={{
                  background: pkg.highlight ? 'var(--brand-blue)' : 'var(--surface)',
                  border: pkg.highlight
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid var(--border)',
                }}
              >
                {pkg.highlight && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'var(--brand-gold)', color: '#0a0a0a' }}
                  >
                    Popular
                  </div>
                )}

                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: pkg.highlight ? 'rgba(255,255,255,0.6)' : 'var(--brand-blue-light)' }}>
                  {pkg.type}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-black text-white">${pkg.price}</span>
                  <span className={pkg.highlight ? 'text-blue-200 text-sm' : 'text-gray-400 text-sm'}>/ {pkg.per}</span>
                </div>
                <p className="font-semibold text-sm mb-4" style={{ color: pkg.highlight ? 'var(--brand-gold)' : 'var(--brand-gold)' }}>
                  {pkg.tagline}
                </p>
                <p className={`text-sm leading-relaxed mb-8 ${pkg.highlight ? 'text-blue-100' : 'text-gray-400'}`}>
                  {pkg.description}
                </p>

                <ul className="space-y-3 mb-10">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={pkg.highlight
                          ? { background: 'rgba(255,255,255,0.15)', color: 'white' }
                          : { background: 'rgba(240,180,41,0.15)', color: 'var(--brand-gold)' }
                        }
                      >
                        ✓
                      </span>
                      <span className={`text-sm ${pkg.highlight ? 'text-blue-100' : 'text-gray-300'}`}>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={pkg.highlight ? 'btn-gold w-full text-center block' : 'btn-primary w-full text-center block'}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            * Prices are per session. Packages and programs available — ask AJ for details.
          </p>
        </div>
      </section>

      {/* ── WHAT'S COVERED ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            All Packages Include
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
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-black text-white text-sm uppercase mb-2">{item.label}</h3>
                <p className="text-gray-400 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              Questions
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-lg"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-bold text-white mb-3 text-sm">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
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
