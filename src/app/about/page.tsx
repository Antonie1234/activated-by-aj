import Link from 'next/link';

const credentials = [
  {
    num: '01',
    title: 'Tennis Coach',
    detail: 'Certified tennis coach with 10+ years experience coaching all ages and skill levels, from beginners to competitive players.',
  },
  {
    num: '02',
    title: 'Padel & Pickleball Coach',
    detail: 'Advanced certified in both Padel and Pickleball, bringing technical expertise and a competitive edge to every session.',
  },
  {
    num: '03',
    title: 'Beach Sports',
    detail: 'Specialised in beach tennis, volleyball and outdoor movement — training that\'s fun, functional and high energy.',
  },
  {
    num: '04',
    title: 'Fitness & Conditioning',
    detail: 'Evidence-based strength, conditioning and bodyweight programming built around your goals and lifestyle.',
  },
];

const values = [
  { label: 'Energy', description: 'Every session is charged with intent and drive.' },
  { label: 'Purpose', description: 'Training is always connected to your bigger goals.' },
  { label: 'Results', description: 'Progress you can see, feel, and measure.' },
  { label: 'Community', description: "You're not just a client — you're part of the movement." },
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
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-6 blur-3xl pointer-events-none"
          style={{ background: 'var(--brand-gold)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Who I Am
          </p>
          <div className="gold-divider mb-6" />
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

            {/* Photo */}
            <div className="md:sticky md:top-28">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(240,180,41,0.2)' }}
              >
                <img
                  src="/aj-pickleball.jpg"
                  alt="AJ"
                  className="w-full object-cover"
                  style={{ maxHeight: '520px', objectPosition: 'top' }}
                />
              </div>
              {/* Quick stats below photo */}
              <div className="grid grid-cols-4 gap-0 mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                {[
                  { value: '10+', label: 'Years' },
                  { value: '4', label: 'Countries' },
                  { value: '5', label: 'Sports' },
                  { value: 'All', label: 'Levels' },
                ].map((stat, i, arr) => (
                  <div
                    key={stat.label}
                    className="py-4 text-center"
                    style={{
                      background: 'var(--surface-2)',
                      borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div className="text-xl font-black mb-0.5" style={{ color: 'var(--brand-gold)' }}>{stat.value}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio content */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
                The Story
              </p>
              <div className="gold-divider mb-6" />
              <h2 className="text-3xl font-black text-white mb-8" style={{ letterSpacing: '-0.02em' }}>
                MORE THAN A COACH
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>AJ is more than a coach. He&apos;s a catalyst.</p>
                <p>
                  Growing up with a deep passion for sport and movement, he discovered early
                  that the way you move your body directly shapes how you show up in life.
                </p>
                <p>
                  That insight became the foundation of Activated by AJ — a coaching brand
                  built around one simple belief:{' '}
                  <span className="text-white font-semibold">when you activate your body, you activate your life.</span>
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
                  Former ITF ranked tennis player and national top 50 in South Africa — AJ
                  brings competitive experience and professional coaching credentials to every
                  session.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-gold">
                  Work With AJ
                </Link>
                <Link href="/services" className="btn-outline">
                  See Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'var(--background)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <svg width="580" height="580" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
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
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              WHAT I BRING
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred) => (
              <div key={cred.title} className="card card-gold p-6 flex flex-col" style={{ background: 'var(--surface)' }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm mb-5 flex-shrink-0"
                  style={{
                    background: 'rgba(240,180,41,0.12)',
                    color: 'var(--brand-gold)',
                    border: '1px solid rgba(240,180,41,0.25)',
                  }}
                >
                  {cred.num}
                </div>
                <h3 className="text-sm font-black uppercase text-white mb-2 tracking-tight">{cred.title}</h3>
                <div className="blue-divider mb-3" />
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{cred.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COACHING PHILOSOPHY ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              How I Coach
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              MY COACHING PHILOSOPHY
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Technique First',
                body: 'Great results start with great foundations. Before speed, power or tactics — I build the technical base that everything else grows from. Solid technique is the shortcut to long-term improvement.',
                svg: (
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="26" cy="26" r="22" /><circle cx="26" cy="26" r="14" /><circle cx="26" cy="26" r="6" />
                    <line x1="26" y1="2" x2="26" y2="10" /><line x1="26" y1="42" x2="26" y2="50" />
                    <line x1="2" y1="26" x2="10" y2="26" /><line x1="42" y1="26" x2="50" y2="26" />
                  </svg>
                ),
              },
              {
                title: 'Mindset Matters',
                body: "Your body follows your mind. I coach the mental game as hard as the physical — confidence, focus and resilience are skills you can train. A strong mindset is what separates players when the score is close.",
                svg: (
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M26 44 C26 44 10 38 10 24 C10 16 16 10 22 10 C23.5 10 25 10.5 26 11.5 C27 10.5 28.5 10 30 10 C36 10 42 16 42 24 C42 38 26 44 26 44Z" />
                    <path d="M26 12 C26 12 20 18 20 24 C20 28 22 31 26 33" />
                    <path d="M26 12 C26 12 32 18 32 24 C32 28 30 31 26 33" />
                    <line x1="22" y1="7" x2="22" y2="4" /><line x1="26" y1="6" x2="26" y2="3" /><line x1="30" y1="7" x2="30" y2="4" />
                  </svg>
                ),
              },
              {
                title: 'Progress Over Perfection',
                body: "I don't chase perfect. I chase better. Consistent forward movement beats waiting for the ideal moment every time. Every session, every rep, every rally — we are building something bigger than yesterday.",
                svg: (
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="34" width="8" height="12" rx="1.5" /><rect x="20" y="24" width="8" height="22" rx="1.5" /><rect x="34" y="12" width="8" height="34" rx="1.5" />
                    <line x1="46" y1="20" x2="46" y2="6" /><polyline points="40,12 46,6 52,12" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="card card-gold flex flex-col items-center text-center p-8"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
              >
                <div className="mb-6" style={{ color: 'var(--brand-gold)' }}>{pillar.svg}</div>
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{pillar.title}</h3>
                <div className="w-8 h-0.5 mb-4 mx-auto" style={{ background: 'var(--brand-gold)' }} />
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES + VIDEO ── */}
      <section className="relative overflow-hidden" style={{ background: '#000' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-0">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              What Drives Me
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              MY VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">
            <div className="flex flex-col justify-start gap-7 py-8 pr-0 md:pr-10">
              {values.map((v) => (
                <div key={v.label} className="flex gap-4 items-start">
                  <div
                    className="w-1 rounded-full flex-shrink-0 mt-1"
                    style={{ height: '2.5rem', background: 'linear-gradient(180deg, var(--brand-gold), transparent)' }}
                  />
                  <div>
                    <h3 className="text-lg font-black mb-1" style={{ color: 'var(--brand-gold)' }}>{v.label}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
              <div className="mt-2">
                <Link href="/contact" className="btn-gold">
                  Get In Touch
                </Link>
              </div>
            </div>

            <div>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block',
                }}
              >
                <source src="/tennismontage.mp4" type="video/mp4" />
                <source src="/tennis-montage.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
