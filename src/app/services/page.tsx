import Link from 'next/link';

const services = [
  {
    id: 'tennis',
    icon: '🎾',
    title: 'Tennis Coaching',
    tagline: 'Master the court. Dominate the game.',
    description:
      'Whether you&apos;re a complete beginner or an experienced competitor, AJ&apos;s tennis coaching is built around your game. Sessions focus on technique, footwork, match strategy, and mental resilience.',
    details: [
      'Private & semi-private sessions',
      'All skill levels welcome — beginner to advanced',
      'Technique, footwork & stroke development',
      'Match strategy & mental game',
      'Junior & adult programs',
      'Flexible scheduling around Willoughby & Sydney',
    ],
    color: 'var(--brand-gold)',
  },
  {
    id: 'fitness',
    icon: '🏋️',
    title: 'Fitness & Strength Training',
    tagline: 'Build strength. Move better. Live stronger.',
    description:
      'Personalised strength and conditioning sessions designed to meet your body where it is and take it further. AJ&apos;s fitness programs are science-backed, goal-focused, and built to last.',
    details: [
      'Customised strength & conditioning plans',
      'One-on-one personal training',
      'Body composition & performance goals',
      'Mobility, flexibility & injury prevention',
      'Nutrition guidance',
      'Progress tracking & accountability',
    ],
    color: 'var(--brand-blue-light)',
  },
  {
    id: 'movement',
    icon: '🌊',
    title: 'Movement & Beach Sports',
    tagline: 'Train outdoors. Move with purpose.',
    description:
      'Take your training outside. AJ&apos;s movement and beach sports sessions combine functional fitness, agility, coordination, and the energy of outdoor training — on the sand, in the water, and beyond.',
    details: [
      'Beach & outdoor functional training',
      'Agility, speed & coordination drills',
      'Beach volleyball, frisbee & water sports',
      'Fun, dynamic group sessions available',
      'Sydney&apos;s best outdoor locations',
      'Suitable for all fitness levels',
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
            Three disciplines. One mission. Activating your full athletic potential.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="rounded-lg overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                {/* Content */}
                <div className="p-8 sm:p-12 md:[direction:ltr]">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <div
                    className="w-10 h-0.5 mb-4"
                    style={{ background: service.color }}
                  />
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                    {service.title}
                  </h2>
                  <p className="font-semibold mb-6 text-sm" style={{ color: service.color }}>
                    {service.tagline}
                  </p>
                  <p
                    className="text-gray-400 leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <Link href="/pricing" className="btn-primary text-xs">
                    View Pricing
                  </Link>
                  <Link href="/contact" className="btn-outline text-xs ml-3">
                    Book Now
                  </Link>
                </div>

                {/* Details */}
                <div
                  className="p-8 sm:p-12 md:[direction:ltr]"
                  style={{ background: 'var(--surface-2)' }}
                >
                  <h3
                    className="text-xs font-bold uppercase tracking-widest mb-6"
                    style={{ color: 'var(--brand-blue-light)' }}
                  >
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-4">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <span
                          className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                          style={{
                            background: `${service.color}22`,
                            color: service.color,
                            border: `1px solid ${service.color}44`,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          className="text-gray-300 text-sm"
                          dangerouslySetInnerHTML={{ __html: detail }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ / NOTE ── */}
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
            or a combination of all three.
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
