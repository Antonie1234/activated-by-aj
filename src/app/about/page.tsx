import Link from 'next/link';

const credentials = [
  { icon: '🎾', title: 'Tennis Coach', detail: 'Certified tennis coach with 10+ years experience coaching all ages and skill levels, from beginners to competitive players.' },
  { icon: '🏓', title: 'Padel & Pickleball Coach', detail: 'Advanced certified in both Padel and Pickleball, bringing technical expertise and a competitive edge to every session.' },
  { icon: '🌊', title: 'Beach Sports', detail: 'Specialised in beach tennis, volleyball and outdoor movement — training that\'s fun, functional and high energy.' },
  { icon: '💪', title: 'Fitness & Conditioning', detail: 'Evidence-based strength, conditioning and bodyweight programming built around your goals and lifestyle.' },
];

const values = [
  { label: 'Energy', description: 'Every session is charged with intent and drive.' },
  { label: 'Purpose', description: 'Training is always connected to your bigger goals.' },
  { label: 'Results', description: 'Progress you can see, feel, and measure.' },
  { label: 'Community', description: 'You&apos;re not just a client — you&apos;re part of the movement.' },
];

export default function About() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--brand-blue)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Who I Am
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            MEET <span className="gold-text">AJ</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Coach. Athlete. Activator. On a mission to turn your energy into purpose.
          </p>
        </div>
      </section>

      {/* ── MAIN BIO ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="md:sticky md:top-28 rounded-lg overflow-hidden">
              <img
                src="/aj-pickleball.jpg"
                alt="AJ"
                className="w-full object-cover"
                style={{ maxHeight: '480px', objectPosition: 'top' }}
              />
            </div>

            {/* Bio content */}
            <div>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  AJ is more than a coach. He&apos;s a catalyst.
                </p>
                <p>
                  Growing up with a deep passion for sport and movement, he discovered early
                  that the way you move your body directly shapes how you show up in life.
                </p>
                <p>
                  That insight became the foundation of Activated by AJ — a coaching brand
                  built around one simple belief: <span className="text-white font-semibold">when you activate your body, you activate your life.</span>
                </p>
                <p>
                  With expertise across tennis, padel, pickleball and beach sports, AJ brings
                  a truly holistic approach to coaching. Every session is built around you —
                  your goals, your game, your lifestyle.
                </p>
                <p>
                  What drives AJ is simple. He believes every person has untapped potential
                  waiting to be unlocked. Whether you are picking up a racket for the first
                  time or pushing toward peak performance, AJ meets you where you are and
                  pushes you further than you thought possible.
                </p>
                <p>
                  He works with clients of all ages and fitness levels — from beginners
                  stepping onto the court for the first time, to competitive athletes chasing
                  their next level.
                </p>
                <p>
                  Former ITF ranked tennis player and national top 50 in South Africa — AJ
                  brings competitive experience and professional coaching credentials to every
                  session.
                </p>
              </div>
            </div>
          </div>

          {/* Stats bar — full width below photo/text columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { value: '10+', label: 'Years Coaching' },
              { value: '4', label: 'Countries' },
              { value: '5', label: 'Sports' },
              { value: 'All', label: 'Ages & Levels' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: 'var(--brand-gold)' }}>{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'var(--background)' }}>
        {/* A power button watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <svg width="580" height="580" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.12 }}>
            <polygon points="30,2 6,58 14,58 20,42 40,42 46,58 54,58" fill="white" />
            <polygon points="18,36 42,36 40,28 20,28" fill="black" />
            <path d="M 36.2,12.8 A 9,9 0 1 1 23.8,12.8" stroke="black" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <line x1="30" y1="10.5" x2="30" y2="18" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              Expertise
            </p>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              WHAT I BRING
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred) => (
              <div key={cred.title} className="card p-6" style={{ background: 'var(--surface)' }}>
                <div className="text-3xl mb-4">{cred.icon}</div>
                <h3 className="text-sm font-black uppercase text-white mb-2 tracking-tight">{cred.title}</h3>
                <div className="blue-divider mb-3" />
                <p className="text-gray-400 text-sm leading-relaxed">{cred.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="relative overflow-hidden" style={{ background: '#000' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-0">
          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              What Drives Me
            </p>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              MY VALUES
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">

            {/* LEFT: values stacked, aligned to top of video */}
            <div className="flex flex-col justify-start gap-7 py-8 pr-0 md:pr-10">
              {values.map((v) => (
                <div key={v.label}>
                  <h3 className="text-lg font-black mb-1" style={{ color: 'var(--brand-gold)' }}>{v.label}</h3>
                  <p className="text-white text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: v.description }} />
                </div>
              ))}
              <div className="mt-2">
                <Link href="/contact" className="btn-gold">
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* RIGHT: full-height video */}
            <div className="relative overflow-hidden" style={{ minHeight: '480px' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              >
                <source src="/tennismontage.mp4" type="video/mp4" />
              </video>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
