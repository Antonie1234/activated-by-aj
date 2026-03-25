import Link from 'next/link';

const services = [
  {
    icon: '🎾',
    title: 'Tennis Coaching',
    description: 'One-on-one and group tennis sessions for all levels. Technique, strategy, footwork and mental game.',
    href: '/services#tennis',
  },
  {
    icon: '🏓',
    title: 'Padel & Pickleball',
    description: 'Advanced coaching in both Padel and Pickleball. Technical skills, tactics and competitive play for all levels.',
    href: '/services#padel',
  },
  {
    icon: '💪',
    title: 'Fitness & Conditioning',
    description: 'Personalised strength, conditioning and bodyweight programs designed around your goals and lifestyle.',
    href: '/services#fitness',
  },
  {
    icon: '🌊',
    title: 'Movement & Beach Sports',
    description: 'Dynamic outdoor training combining functional movement, beach tennis, volleyball and agility.',
    href: '/services#movement',
  },
  {
    icon: '📋',
    title: 'Programs & Plans',
    description: 'Custom workout programs, recovery plans and nutrition guidance — designed to keep you progressing.',
    href: '/services#programs',
  },
];


export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.5 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.6)' }} />
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

        {/* Watermark "A" icon */}
        <svg
          viewBox="18 8 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute pointer-events-none"
          style={{ width: '70vmin', height: '70vmin', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.30 }}
          aria-hidden="true"
        >
          <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#D4A843" />
          <polygon points="24,26 36,26 34,20 26,20" fill="#0a0a0a" />
        </svg>

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
            Tennis coaching, fitness &amp; strength training, and beach sports performance. Your Vibe Activates Your Tribe.
          </p>

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
              <p className="text-gray-400 leading-relaxed mb-8">
                Activated by AJ is more than a fitness brand. It&apos;s a movement. We specialise in tennis, strength training and functional movement — activating each individual&apos;s full potential. This journey isn&apos;t just about training harder. It&apos;s about becoming disciplined, confident and aligned with your purpose. It&apos;s about transforming your body, mindset and energy, while building a tribe of warriors who lead with grit and drive.
              </p>
              <Link href="/about" className="btn-primary">
                More About AJ
              </Link>
            </div>

            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
              <img
                src="/aj-photo.jpg"
                alt="AJ"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'var(--surface)' }}>
        {/* A power button watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <svg width="800" height="800" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
            <polygon points="30,2 6,58 14,58 20,42 40,42 46,58 54,58" fill="white" />
            <polygon points="18,36 42,36 40,28 20,28" fill="black" />
            <path d="M 36.2,12.8 A 9,9 0 1 1 23.8,12.8" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <line x1="30" y1="10.5" x2="30" y2="18" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              What I Offer
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              SERVICES
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
