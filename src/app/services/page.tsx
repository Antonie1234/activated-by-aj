import Link from 'next/link';

const services = [
  {
    id: 'tennis',
    icon: '🎾',
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
    color: 'var(--brand-gold)',
  },
  {
    id: 'padel',
    icon: '🏸',
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
    color: 'var(--brand-blue-light)',
  },
  {
    id: 'pickleball',
    icon: '🏓',
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
    color: 'var(--brand-gold)',
  },
  {
    id: 'beach',
    icon: '🏖️',
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
    color: 'var(--brand-blue-light)',
  },
  {
    id: 'fitness',
    icon: '💪',
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
    color: 'var(--brand-gold)',
  },
  {
    id: 'movement',
    icon: '🌊',
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
    color: 'var(--brand-blue-light)',
  },
  {
    id: 'programs',
    icon: '📋',
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
    color: 'var(--brand-gold)',
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

      {/* ── SERVICE CARDS GRID ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="card p-8 flex flex-col"
                style={{ background: 'var(--surface)' }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <div className="w-10 h-0.5 mb-4" style={{ background: service.color }} />
                <h2
                  className="text-xl font-black text-white mb-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {service.title}
                </h2>
                <p className="font-semibold text-sm mb-4" style={{ color: service.color }}>
                  {service.tagline}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="flex-shrink-0 font-bold" style={{ color: service.color }}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 mt-auto">
                  <Link href="/contact" className="btn-gold text-xs flex-1 text-center">
                    Book Now
                  </Link>
                  <Link href="/pricing" className="btn-outline text-xs flex-1 text-center">
                    Pricing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
