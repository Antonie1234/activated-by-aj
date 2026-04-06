import Link from 'next/link';

/* ── Gold SVG Icons ── */
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

const PickleballIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="26" height="28" rx="13" />
    <circle cx="18" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="11" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="25" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="11" cy="19" r="2" fill="currentColor" stroke="none" />
    <circle cx="18" cy="19" r="2" fill="currentColor" stroke="none" />
    <circle cx="25" cy="19" r="2" fill="currentColor" stroke="none" />
    <circle cx="18" cy="26" r="2" fill="currentColor" stroke="none" />
    <line x1="18" y1="32" x2="18" y2="43" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const BeachTennisIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="10" r="5" />
    <line x1="32" y1="2" x2="32" y2="4" />
    <line x1="32" y1="16" x2="32" y2="18" />
    <line x1="24" y1="10" x2="26" y2="10" />
    <line x1="38" y1="10" x2="40" y2="10" />
    <path d="M2 28 Q8 22 14 28 Q20 34 26 28 Q32 22 38 28 Q41 31 44 28" />
    <path d="M2 36 Q8 30 14 36 Q20 42 26 36 Q32 30 38 36" />
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
    id: 'tennis',
    Icon: TennisIcon,
    title: 'Tennis Coaching',
    tagline: 'Master the court. Dominate the game.',
    description:
      'One-on-one and group sessions for all ages and levels. Technique, footwork, match strategy and mental game — built around you.',
    details: [
      'Private & group sessions',
      'All ages & skill levels',
      'Stroke technique & footwork',
      'Match strategy & mental game',
      'Junior & adult programs',
    ],
    image: 'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Tennis court with racket',
    accentColor: 'var(--brand-gold)',
  },
  {
    id: 'padel',
    Icon: PadelIcon,
    title: 'Padel Coaching',
    tagline: 'Two walls. One edge.',
    description:
      'Advanced Padel coaching covering shot selection, court positioning and match tactics. From first-timer to competitive player.',
    details: [
      'Advanced Padel certified',
      'Shot selection & placement',
      'Tactics & court positioning',
      'Beginner to competitive levels',
      'Private & group sessions',
    ],
    image: 'https://images.pexels.com/photos/32474981/pexels-photo-32474981.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Padel court and racket',
    imgStyle: { width: '100%', height: '400px', objectFit: 'cover' as const, borderRadius: '8px' },
    accentColor: 'var(--brand-blue-light)',
  },
  {
    id: 'pickleball',
    Icon: PickleballIcon,
    title: 'Pickleball Coaching',
    tagline: 'Fast-growing. Seriously fun.',
    description:
      'Master the fastest-growing racket sport. AJ breaks down technique, dinking, serve strategy and court awareness for all levels.',
    details: [
      'Beginner to advanced',
      'Serving & dinking technique',
      'Court positioning & strategy',
      'Patient, clear instruction',
      'Private & group sessions',
    ],
    image: 'https://images.pexels.com/photos/17299528/pexels-photo-17299528.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Pickleball paddle and court',
    imgStyle: { width: '100%', height: '400px', objectFit: 'cover' as const, borderRadius: '8px' },
    accentColor: 'var(--brand-gold)',
  },
  {
    id: 'beach',
    Icon: BeachTennisIcon,
    title: 'Beach Tennis',
    tagline: 'Train outdoors. Win on sand.',
    description:
      'High-energy beach tennis sessions combining athletic movement, racket technique and the raw energy of outdoor training.',
    details: [
      'Outdoor beach court sessions',
      'Movement & footwork on sand',
      'Technique & rally drills',
      'Private & group sessions',
      'All levels welcome',
    ],
    image: 'https://images.pexels.com/photos/1612872/pexels-photo-1612872.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Beach sport training',
    accentColor: 'var(--brand-blue-light)',
  },
  {
    id: 'fitness',
    Icon: FitnessIcon,
    title: 'Fitness & Conditioning',
    tagline: 'Build strength. Move better. Live stronger.',
    description:
      'Personalised strength and conditioning built around your body and goals. Science-backed, progress-tracked, and built to last.',
    details: [
      'Custom strength & conditioning plans',
      'One-on-one personal training',
      'Body composition & performance goals',
      'Mobility & injury prevention',
      'Progress tracking & accountability',
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Fitness and gym training',
    accentColor: 'var(--brand-gold)',
  },
  {
    id: 'movement',
    Icon: MovementIcon,
    title: 'Movement & Outdoor',
    tagline: 'Functional. Dynamic. Outdoors.',
    description:
      'Take training outside. Agility, coordination and functional fitness combined with the energy of outdoor sport and natural environments.',
    details: [
      'Outdoor functional training',
      'Agility, speed & coordination drills',
      'Beach volleyball & outdoor sport',
      'Group sessions available',
      'All fitness levels welcome',
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Outdoor movement training',
    accentColor: 'var(--brand-blue-light)',
  },
  {
    id: 'programs',
    Icon: ProgramsIcon,
    title: 'Programs & Plans',
    tagline: 'Structure. Progression. Results.',
    description:
      'Custom workout programs, recovery plans and nutrition guidance you can follow anywhere — designed to keep you progressing on your own schedule.',
    details: [
      'Custom workout programs',
      'Recovery & mobility plans',
      'Nutrition guidance',
      'Remote & self-guided options',
      'Regular check-ins & plan updates',
    ],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Training plan and notebook',
    accentColor: 'var(--brand-gold)',
  },
];

export default function Services() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-60 opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--brand-blue)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            What I Offer
          </p>
          <div className="gold-divider mx-auto mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            SERVICES
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Five sports. One coach. Built around activating your full potential.
          </p>
        </div>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      {services.map((service, index) => {
        const imageLeft = index % 2 === 0;
        const sectionBg = index % 2 === 0 ? 'var(--background)' : 'var(--surface)';

        return (
          <section
            key={service.id}
            id={service.id}
            style={{ background: sectionBg, borderTop: '1px solid var(--border)' }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
              <div className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${!imageLeft ? 'md:[&>*:first-child]:order-2' : ''}`}>

                {/* ── Image column ── */}
                <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 320 }}>
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover"
                    style={service.imgStyle ?? { minHeight: 320, maxHeight: 440 }}
                    loading="lazy"
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.2) 100%)',
                    }}
                  />
                  {/* Icon badge in corner */}
                  <div
                    className="absolute top-5 left-5 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(10,10,10,0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(240,180,41,0.3)',
                      color: 'var(--brand-gold)',
                    }}
                  >
                    <service.Icon />
                  </div>
                </div>

                {/* ── Text column ── */}
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: service.accentColor }}
                  >
                    {service.tagline}
                  </p>
                  <div
                    className="w-10 h-0.5 mb-5"
                    style={{ background: service.accentColor }}
                  />
                  <h2
                    className="text-3xl sm:text-4xl font-black text-white mb-4"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-gray-300">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{
                            background: `rgba(240,180,41,0.12)`,
                            color: 'var(--brand-gold)',
                            border: '1px solid rgba(240,180,41,0.25)',
                          }}
                        >
                          ✓
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-gold text-xs">
                      Book Now
                    </Link>
                    <Link href="/pricing" className="btn-outline text-xs">
                      View Pricing
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Not Sure Where to Start?
          </p>
          <div className="gold-divider mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            LET&apos;S FIND YOUR FIT
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Not sure which service is right for you? Reach out and AJ will help you figure out
            the best path forward — whether that&apos;s tennis, strength training, beach sports,
            or a combination of all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Chat with AJ
            </Link>
            <Link href="/pricing" className="btn-outline">
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
