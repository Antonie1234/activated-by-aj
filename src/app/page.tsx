import Link from 'next/link';
import Image from 'next/image';
import HeroParallax from '@/components/HeroParallax';
import GoldDivider from '@/components/GoldDivider';

/* ── Shared gold SVG icons (match /services page) ── */
const TennisIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="19" cy="17" rx="12" ry="14" />
    <line x1="14" y1="4" x2="14" y2="30" />
    <line x1="19" y1="3" x2="19" y2="31" />
    <line x1="24" y1="4" x2="24" y2="30" />
    <line x1="8" y1="12" x2="30" y2="12" />
    <line x1="7" y1="17" x2="31" y2="17" />
    <line x1="8" y1="22" x2="30" y2="22" />
    <line x1="19" y1="31" x2="35" y2="43" strokeWidth="3" />
  </svg>
);

const PadelIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="19" cy="17" rx="12" ry="14" />
    <circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="23" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="18" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="23" cy="18" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="23" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="23" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="23" cy="23" r="1.5" fill="currentColor" stroke="none" />
    <line x1="19" y1="31" x2="35" y2="43" strokeWidth="3" />
  </svg>
);

const FitnessIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="17" width="5" height="10" rx="1.5" />
    <rect x="7" y="19" width="4" height="6" rx="1" />
    <line x1="11" y1="22" x2="33" y2="22" />
    <rect x="33" y="19" width="4" height="6" rx="1" />
    <rect x="37" y="17" width="5" height="10" rx="1.5" />
    <rect x="0" y="15" width="3" height="14" rx="1.5" />
    <rect x="41" y="15" width="3" height="14" rx="1.5" />
  </svg>
);

const MovementIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="28" cy="6" r="4" />
    <line x1="28" y1="10" x2="24" y2="22" />
    <line x1="26" y1="15" x2="16" y2="12" />
    <line x1="26" y1="15" x2="34" y2="20" />
    <line x1="24" y1="22" x2="14" y2="30" />
    <line x1="24" y1="22" x2="30" y2="34" />
    <line x1="14" y1="30" x2="8" y2="28" />
    <line x1="30" y1="34" x2="36" y2="38" />
    <line x1="4" y1="40" x2="40" y2="40" strokeWidth="1.5" />
  </svg>
);

const ProgramsIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="28" height="34" rx="3" />
    <rect x="16" y="4" width="12" height="8" rx="2" />
    <line x1="14" y1="20" x2="30" y2="20" />
    <line x1="14" y1="26" x2="30" y2="26" />
    <line x1="14" y1="32" x2="24" y2="32" />
    <polyline points="14,17 16,19 20,15" />
  </svg>
);

const services = [
  {
    Icon: TennisIcon,
    title: 'Tennis Coaching',
    description: 'One-on-one and group tennis sessions for all levels. Technique, strategy, footwork and mental game.',
    href: '/services#tennis',
  },
  {
    Icon: PadelIcon,
    title: 'Padel & Pickleball',
    description: 'Advanced coaching in both Padel and Pickleball. Technical skills, tactics and competitive play for all levels.',
    href: '/services#padel',
  },
  {
    Icon: FitnessIcon,
    title: 'Fitness & Conditioning',
    description: 'Personalised strength, conditioning and bodyweight programs designed around your goals and lifestyle.',
    href: '/services#fitness',
  },
  {
    Icon: MovementIcon,
    title: 'Movement & Beach Sports',
    description: 'Dynamic outdoor training combining functional movement, beach tennis, volleyball and agility.',
    href: '/services#movement',
  },
  {
    Icon: ProgramsIcon,
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
        {/* Full-screen background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/aj-photo.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45, zIndex: 0 }}
        >
          <source src="/hero-bg-aj.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.58)', zIndex: 1 }} />

        {/* Parallax background with animated shapes */}
        <HeroParallax />

        {/* Watermark "A" icon */}
        <svg
          viewBox="18 8 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute pointer-events-none"
          style={{ width: '70vmin', height: '70vmin', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.22, zIndex: 2 }}
          aria-hidden="true"
        >
          <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#C9A84C" />
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
            Padel · Racquet Sport · Lifestyle · Performance
          </div>

          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="text-white block">TURN YOUR</span>
            <span className="gold-text block">ENERGY</span>
            <span className="text-white block">INTO PURPOSE</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Your Vibe Activates Your Tribe.
          </p>

        </div>
      </section>

      <GoldDivider />

      {/* ── STATS BAR ── */}
      <section style={{ background: 'var(--surface)', borderTop: '2px solid rgba(240,180,41,0.2)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {[
              { stat: '7', label: 'Sports Coached' },
              { stat: '50+', label: 'Sessions Delivered' },
              { stat: '4', label: 'Countries Coached' },
              { stat: 'All Levels', label: 'Welcome' },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`text-center py-4 px-4 ${i < arr.length - 1 ? 'md:border-r md:border-[var(--border)]' : ''}`}
              >
                <p className="text-3xl sm:text-4xl font-black mb-2" style={{ color: 'var(--brand-gold)' }}>
                  {item.stat}
                </p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

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
                Activated by AJ is more than a coaching brand — it&apos;s a movement. We activate your full potential across tennis, padel, pickleball, beach sports and fitness. Discipline. Energy. Purpose. Let&apos;s build something.
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

      <GoldDivider />

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
                  className="card card-gold p-8 h-full flex flex-col"
                  style={{ background: 'var(--surface-2)' }}
                >
                  <div className="mb-5" style={{ color: 'var(--brand-gold)' }}>
                    <service.Icon />
                  </div>
                  <h3
                    className="text-lg font-black uppercase mb-3 tracking-tight group-hover:text-yellow-400 transition-colors"
                    style={{ letterSpacing: '-0.01em', color: 'white' }}
                  >
                    {service.title}
                  </h3>
                  <div className="blue-divider mb-4" />
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{service.description}</p>
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

      <GoldDivider />

      {/* ── THE MODEL ── */}
      <section className="section-padding" style={{ background: '#0D1B2A' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--brand-gold)' }}>
            The Model
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 text-white"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            WE ORIGINATE.<br />WE CONNECT.<br />WE ACTIVATE.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
            Activated by AJ is a sports facility concept broker and lifestyle brand. We identify premium padel opportunities,
            develop the full concept, connect the right investors, structure the deal, and brand every facility we create.
          </p>

          {/* Pillars */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
            {['Identify', 'Develop', 'Connect', 'Structure', 'Activate'].map((pillar, i, arr) => (
              <span key={pillar} className="flex items-center gap-3">
                <span className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--brand-gold)' }}>
                  {pillar}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-sm font-bold" style={{ color: 'rgba(201,168,76,0.4)' }}>·</span>
                )}
              </span>
            ))}
          </div>

          <Link href="/investor-pathway" className="btn-gold">
            Explore the Investor Pathway
          </Link>
        </div>
      </section>

      <GoldDivider />

      {/* ── TESTIMONIALS PREVIEW ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              Real Results
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              WHAT CLIENTS SAY
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Henry Leung',
                initials: 'HL',
                service: 'Tennis Coaching',
                quote: "AJ doesn't settle for mediocrity — he challenges me to dig deeper, work harder, and play smarter. I've seen dramatic improvements in my technique, endurance, and mental toughness.",
              },
              {
                name: 'Sharlene Robbins',
                initials: 'SR',
                service: 'Pickleball Coaching',
                quote: "AJ is incredibly patient and explains things clearly. His drills are challenging but fun, and he always tailors the lesson to enhance my progress. I'm now addicted to Pickleball!",
              },
              {
                name: 'C.B.',
                initials: 'CB',
                service: 'Performance Client',
                quote: "Over just one term, the progress has been nothing short of incredible. My strength, endurance and confidence have all improved dramatically. Highly recommend for anyone at any level.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="card p-8 flex flex-col"
                style={{ background: 'var(--surface)' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: '#0D1B2A',
                      border: '2px solid #C9A84C',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: '#C9A84C', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <div
                      className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
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
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: 'var(--brand-gold)' }}>★</span>
                  ))}
                </div>
                <div className="text-3xl mb-3" style={{ color: 'var(--brand-gold)', opacity: 0.5 }}>&ldquo;</div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials" className="btn-outline">
              See All Reviews
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── ACTIVATED PARTNERS ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              Trusted Network
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              ACTIVATED PARTNERS
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              People I trust and work alongside — extending the Activated network beyond sport.
            </p>
          </div>

          <div className="flex justify-center">
            {/* Premium editorial card */}
            <div
              className="relative w-full max-w-2xl rounded-2xl overflow-visible transition-all duration-300 hover:shadow-[0_8px_64px_rgba(0,0,0,0.6),0_0_32px_rgba(201,168,76,0.15),0_0_0_1px_rgba(201,168,76,0.5)]"
              style={{
                background: '#0D1B2A',
                border: '1px solid rgba(201,168,76,0.3)',
                boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)',
              }}
            >
              <div className="flex flex-col sm:flex-row items-stretch">

                {/* ── LEFT: photo ── */}
                <div
                  className="relative shrink-0 w-full sm:w-[200px] sm:-ml-6 sm:-my-6 z-10"
                  style={{ minHeight: '260px' }}
                >
                  <div
                    className="relative h-full rounded-xl overflow-hidden"
                    style={{
                      border: '2px solid #C9A84C',
                      boxShadow: '0 4px 24px rgba(201,168,76,0.2)',
                      minHeight: '260px',
                    }}
                  >
                    <Image
                      src="/lauren-seated.jpg"
                      alt="Lauren Beckage BSN RN"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      sizes="200px"
                    />
                    {/* subtle gold overlay at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16"
                      style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.6), transparent)' }}
                    />
                  </div>
                </div>

                {/* ── RIGHT: content ── */}
                <div className="flex flex-col justify-center px-8 py-8">
                  {/* Partner label */}
                  <div className="mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        color: '#C9A84C',
                        border: '1px solid rgba(201,168,76,0.4)',
                        background: 'rgba(201,168,76,0.08)',
                      }}
                    >
                      Activated Partner
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
                    Lauren IV
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#C9A84C' }}>
                    Mobile IV Therapy · Austin, Texas
                  </p>

                  <div className="gold-divider mb-5" />

                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    Looking for premium mobile IV therapy? I work alongside Lauren Beckage BSN RN — a registered nurse bringing wellness directly to your home, hotel or office.
                  </p>

                  <div>
                    <a
                      href="https://lauren-iv.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-200 hover:bg-[#C9A84C] hover:text-[#0D1B2A]"
                      style={{
                        color: '#C9A84C',
                        border: '2px solid #C9A84C',
                        background: 'transparent',
                      }}
                    >
                      Visit Lauren IV →
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

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
            Ready to get Activated? Let&apos;s build something together.
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
