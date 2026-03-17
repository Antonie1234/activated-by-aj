import Link from 'next/link';

const services = [
  {
    icon: '🎾',
    title: 'Tennis Coaching',
    description:
      'One-on-one and group tennis sessions for all levels. Develop technique, strategy, and mental game.',
    href: '/services#tennis',
  },
  {
    icon: '🏋️',
    title: 'Fitness & Strength',
    description:
      'Personalised strength and conditioning programs designed to unlock your physical potential.',
    href: '/services#fitness',
  },
  {
    icon: '🌊',
    title: 'Movement & Beach Sports',
    description:
      'Dynamic outdoor training combining functional movement, agility, and beach sport performance.',
    href: '/services#movement',
  },
];

const stats = [
  { value: '100+', label: 'Clients Trained' },
  { value: '5+', label: 'Years Experience' },
  { value: '3', label: 'Disciplines' },
  { value: 'Sydney', label: 'Based' },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(26,111,212,0.5) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(26,111,212,0.5) 80px)',
          }}
        />
        {/* Blue glow */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--brand-blue)' }}
        />
        {/* Gold glow */}
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--brand-gold)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: 'rgba(240,180,41,0.12)',
              border: '1px solid rgba(240,180,41,0.25)',
              color: 'var(--brand-gold)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--brand-gold)' }}
            />
            Personal Coaching · Sydney
          </div>

          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block text-white">TURN YOUR</span>
            <span className="block gold-text">ENERGY INTO</span>
            <span className="block text-white">PURPOSE</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Tennis coaching, fitness &amp; strength training, and beach sports performance —
            with AJ in Willoughby, Sydney.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold text-sm">
              Book a Session
            </Link>
            <Link href="/services" className="btn-outline text-sm">
              Explore Services
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div
              className="w-px h-10 animate-pulse"
              style={{ background: 'var(--brand-gold)' }}
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-3xl sm:text-4xl font-black mb-1"
                  style={{ color: 'var(--brand-gold)' }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
                Meet AJ
              </p>
              <div className="gold-divider mb-6" />
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                COACHING THAT <span className="gold-text">ACTIVATES</span> YOU
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                AJ is a passionate personal coach based in Willoughby, Sydney. With a background
                spanning tennis, strength &amp; conditioning, and outdoor movement — AJ brings an
                energetic, results-driven approach to every session.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you&apos;re picking up a racket for the first time or training to peak performance,
                AJ meets you where you are and pushes you further than you thought possible.
              </p>
              <Link href="/about" className="btn-primary">
                More About AJ
              </Link>
            </div>

            {/* Placeholder image card */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-gray-500 text-sm">AJ Photo Coming Soon</p>
              </div>
              <div
                className="absolute top-0 left-0 w-16 h-16"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-gold) 0%, transparent 70%)',
                  opacity: 0.3,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16"
                style={{
                  background: 'linear-gradient(315deg, var(--brand-blue) 0%, transparent 70%)',
                  opacity: 0.3,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              What I Offer
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              SERVICES
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="block group">
                <div
                  className="card p-8 h-full"
                  style={{ background: 'var(--surface-2)' }}
                >
                  <div className="text-4xl mb-5">{service.icon}</div>
                  <h3
                    className="text-lg font-black uppercase mb-3 tracking-tight group-hover:text-yellow-400 transition-colors"
                    style={{ letterSpacing: '-0.01em', color: 'white' }}
                  >
                    {service.title}
                  </h3>
                  <div className="blue-divider mb-4" />
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  <p
                    className="mt-6 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-block"
                    style={{ color: 'var(--brand-blue-light)' }}
                  >
                    Learn More →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/pricing" className="btn-primary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL HIGHLIGHT ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6" style={{ color: 'var(--brand-gold)' }}>&ldquo;</div>
          <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-8" style={{ letterSpacing: '-0.02em' }}>
            AJ doesn&apos;t just coach you — he activates something inside you that you didn&apos;t know was there.
          </blockquote>
          <p className="text-gray-500 text-sm uppercase tracking-widest">— Sydney Client</p>
          <div className="mt-10">
            <Link href="/testimonials" className="btn-outline">
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--brand-blue) 0%, #0d4fa8 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            READY TO GET ACTIVATED?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Book your first session today — Willoughby, Sydney.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Book Now
            </Link>
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
