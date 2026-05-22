import Link from 'next/link';
import HeroParallax from '@/components/HeroParallax';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

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
    photo: 'https://images.pexels.com/photos/34015717/pexels-photo-34015717.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Tennis Coaching',
    description: 'One-on-one and group tennis sessions for all levels. Technique, strategy, footwork and mental game.',
    href: '/services#tennis',
    external: false,
  },
  {
    photo: '/aj-pickleball2.jpg',
    title: 'Padel & Pickleball',
    description: 'Advanced coaching in both Padel and Pickleball. Technical skills, tactics and competitive play for all levels.',
    href: '/services#padel',
    external: false,
  },
  {
    photo: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Fitness & Conditioning',
    description: 'Personalised strength, conditioning and bodyweight programs designed around your goals and lifestyle.',
    href: '/services#fitness',
    external: false,
  },
  {
    photo: '/aj-beach.jpg',
    title: 'Movement & Beach Sports',
    description: 'Dynamic outdoor training combining functional movement, beach tennis, volleyball and agility.',
    href: '/services#movement',
    external: false,
  },
  {
    photo: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Programs & Plans',
    description: 'Custom workout programs, recovery plans and nutrition guidance, designed to keep you progressing.',
    href: '/services#programs',
    external: false,
  },
  {
    photo: '',
    logoUrl: 'https://reflectmotion.com/logo.png',
    title: 'AI Performance Tech',
    description: 'Powered by Reflect Motion — AI movement analysis that tracks your technique, scores every rep, and delivers real-time coaching feedback.',
    href: 'https://www.reflectmotion.com',
    external: true,
  },
];

export default function Home() {
  return (
    <>
      <ScrollAnimations />

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
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.45 }}
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
          <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#E8F4FD" />
          <polygon points="24,26 36,26 34,20 26,20" fill="#0a0a0a" />
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: 'rgba(232,244,253,0.1)',
              border: '1px solid rgba(232,244,253,0.25)',
              color: 'var(--brand-gold)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--brand-gold)' }}
            />
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>Padel</span>
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', opacity: 0.6 }}>·</span>
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>Racquet Sport</span>
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', opacity: 0.6 }}>·</span>
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>Lifestyle</span>
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', opacity: 0.6 }}>·</span>
            <span style={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>Performance</span>
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

      {/* ── ABOUT TEASER ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-animate="slide-left">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E8F4FD' }}>
                Meet AJ
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                COACHING THAT <span className="gold-text">ACTIVATES</span> YOU
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Activated by AJ is more than a coaching brand. It&apos;s a movement built around one standard of excellence. I activate your full potential across tennis, padel, pickleball, beach sports and fitness. Discipline. Energy. Purpose. Let&apos;s build something.
              </p>
              <Link href="/about" className="btn-primary">
                More About AJ
              </Link>
            </div>

            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '1 / 1' }} data-animate="slide-right">
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

      {/* ── THE MODEL ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#0D1B2A' }}>
        <LogoWatermark size={600} opacity={0.08} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 1 }} data-animate="fade-up">
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
                  <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}> · </span>
                )}
              </span>
            ))}
          </div>

          <Link href="/investor-pathway" className="btn-gold-outline">
            Explore the Investor Pathway
          </Link>
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
          <div className="text-center mb-10" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E8F4FD' }}>
              What I Offer
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              SERVICES
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const cardInner = (
                <div
                  className="card card-gold h-full flex flex-col overflow-hidden"
                  style={{ background: 'var(--surface-2)' }}
                >
                  {'logoUrl' in service && service.logoUrl ? (
                    <div
                      className="w-full h-48 flex items-center justify-center"
                      style={{
                        background: '#0D1B2A',
                        borderBottom: '1px solid rgba(232,244,253,0.15)',
                      }}
                    >
                      <img
                        src={service.logoUrl}
                        alt={service.title}
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        style={{ maxHeight: 60, maxWidth: '55%' }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={service.photo}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className="text-base font-black uppercase mb-2 tracking-tight transition-colors"
                      style={{ letterSpacing: '-0.01em', color: 'white' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">{service.description}</p>
                  </div>
                </div>
              );
              return service.external ? (
                <a
                  key={service.title}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  data-animate="fade-up"
                  data-animate-delay={String(i * 100)}
                >{cardInner}</a>
              ) : (
                <Link
                  key={service.title}
                  href={service.href}
                  className="block group"
                  data-animate="fade-up"
                  data-animate-delay={String(i * 100)}
                >{cardInner}</Link>
              );
            })}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── TESTIMONIALS PREVIEW ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E8F4FD' }}>
              Real Results
            </p>
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
                quote: "AJ doesn't settle for mediocrity. He challenges me to dig deeper, work harder, and play smarter. I've seen dramatic improvements in my technique, endurance, and mental toughness.",
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
            ].map((t, i) => (
              <Link
                key={t.name}
                href="/testimonials"
                className="block group"
                data-animate="fade-up"
                data-animate-delay={String(i * 150)}
              >
                <div
                  className="card p-8 flex flex-col h-full transition-all duration-200"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: '#0D1B2A',
                        border: '2px solid #E8F4FD',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: '#E8F4FD', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.initials}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <div
                        className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
                        style={{
                          background: 'rgba(232, 244, 253, 0.1)',
                          color: '#E8F4FD',
                          border: '1px solid rgba(232, 244, 253, 0.3)',
                        }}
                      >
                        {t.service}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} style={{ color: 'var(--brand-gold)' }}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">{t.quote}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── ACTIVATED PARTNERS ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#0D1B2A' }}>
        {/* Dot-grid tech pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(232,244,253,0.045) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>
          <div className="text-center mb-10" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#E8F4FD' }}>
              Trusted Network
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              ACTIVATED PARTNERS
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              People I trust and work alongside, extending the Activated network beyond sport.
            </p>
          </div>

          <div className="max-w-md mx-auto">

            {/* ── Reflect Motion card ── */}
            <div
              className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_64px_rgba(0,0,0,0.7),0_0_32px_rgba(232,244,253,0.08)]"
              style={{
                background: '#070F18',
                border: '1px solid rgba(232,244,253,0.15)',
              }}
              data-animate="fade-up"
            >
              {/* Radial glow centred behind logo area */}
              <div
                className="absolute top-0 left-1/2 pointer-events-none"
                style={{
                  width: 360,
                  height: 260,
                  transform: 'translateX(-50%)',
                  background: 'radial-gradient(circle, rgba(232,244,253,0.05) 0%, transparent 70%)',
                }}
              />

              <div className="relative flex flex-col items-center text-center px-8 py-10" style={{ zIndex: 1 }}>
                {/* Activated Partner badge */}
                <div className="mb-7">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                    style={{
                      color: '#E8F4FD',
                      border: '1px solid rgba(232,244,253,0.25)',
                      background: 'rgba(232,244,253,0.05)',
                    }}
                  >
                    Activated Partner
                  </span>
                </div>

                {/* Logo — larger, centred */}
                <div className="mb-5">
                  <img
                    src="https://reflectmotion.com/logo.png"
                    alt="Reflect Motion"
                    style={{ height: 56, width: 'auto', objectFit: 'contain' }}
                  />
                </div>

                {/* Subtitle */}
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ color: 'var(--brand-gold)', letterSpacing: '0.12em' }}
                >
                  AI-Powered Movement Analysis
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  Reflect Motion uses AI computer vision to analyse your movement in real time, score every rep, and deliver personalised coaching feedback. Built for athletes, coaches, and anyone serious about performance.
                </p>

                {/* Coach Code — monospace techy badge */}
                <div
                  className="mb-8 px-6 py-3 rounded-lg"
                  style={{
                    background: 'rgba(4,8,14,0.8)',
                    border: '1px solid rgba(232,244,253,0.1)',
                  }}
                >
                  <p
                    className="text-gray-600 uppercase tracking-widest mb-1"
                    style={{ fontSize: '0.65rem' }}
                  >
                    Coach Code
                  </p>
                  <p
                    style={{
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      color: '#E8F4FD',
                      fontSize: '1.05rem',
                      letterSpacing: '0.28em',
                      fontWeight: 700,
                    }}
                  >
                    MPTYSA
                  </p>
                </div>

                {/* Full-width CTA button */}
                <a
                  href="https://www.reflectmotion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ display: 'block', width: '100%', textAlign: 'center' }}
                >
                  Get Started Free
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
