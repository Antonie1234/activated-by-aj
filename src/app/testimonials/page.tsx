import Link from 'next/link';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Willoughby, Sydney',
    service: 'Fitness & Strength',
    quote:
      "AJ completely transformed how I approach training. He doesn't just give you a workout — he gives you a mindset. I'm stronger, faster, and more confident than I've ever been.",
    rating: 5,
  },
  {
    name: 'James T.',
    location: 'Chatswood, Sydney',
    service: 'Tennis Coaching',
    quote:
      "I'd been playing tennis for years but felt stuck at the same level. Three months with AJ and I'm playing the best tennis of my life. His coaching style is direct, fun, and incredibly effective.",
    rating: 5,
  },
  {
    name: 'Priya K.',
    location: 'Neutral Bay, Sydney',
    service: 'Movement & Beach Sports',
    quote:
      "Beach training with AJ is unlike anything else. It's hard, it's fun, and you leave feeling absolutely alive. The energy he brings to every session is contagious.",
    rating: 5,
  },
  {
    name: 'Daniel R.',
    location: 'Lane Cove, Sydney',
    service: 'Private Training',
    quote:
      "AJ doesn't just coach you — he activates something inside you that you didn't know was there. Best investment I've made in my health.",
    rating: 5,
  },
  {
    name: 'Emma L.',
    location: 'Mosman, Sydney',
    service: 'Semi-Private Training',
    quote:
      "My friend and I train together with AJ twice a week. The sessions are challenging, personalised, and we push each other to new levels every single time. Highly recommend the semi-private format.",
    rating: 5,
  },
  {
    name: 'Mike O.',
    location: 'St Leonards, Sydney',
    service: 'Tennis Coaching',
    quote:
      "Started from zero tennis knowledge and now I'm playing weekly comp games. AJ's patient, encouraging, and knows exactly how to break down complex skills into something you can actually do.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--brand-gold)' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-gold)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Real Results
          </p>
          <div className="gold-divider mx-auto mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            TESTIMONIALS
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what the Activated by AJ community has to say.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS GRID ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card p-8 flex flex-col"
                style={{ background: 'var(--surface)' }}
              >
                <StarRating count={t.rating} />
                <div className="text-3xl mt-4 mb-3" style={{ color: 'var(--brand-gold)', opacity: 0.5 }}>&ldquo;</div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{t.location}</p>
                  <div
                    className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(26,111,212,0.15)',
                      color: 'var(--brand-blue-light)',
                      border: '1px solid rgba(26,111,212,0.25)',
                    }}
                  >
                    {t.service}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6" style={{ color: 'var(--brand-gold)' }}>⚡</div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            READY TO WRITE YOUR OWN STORY?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Join the Activated by AJ community and start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Book Your Session
            </Link>
            <Link href="/pricing" className="btn-outline">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
