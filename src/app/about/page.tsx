import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

const values = [
  { label: 'Energy', description: 'Every session is charged with intent and drive.' },
  { label: 'Purpose', description: 'Training is always connected to your bigger goals.' },
  { label: 'Results', description: 'Progress you can see, feel, and measure.' },
  { label: 'Community', description: "You're not just a client. You're part of the movement." },
];

export default function About() {
  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'rgba(201,168,76,0.15)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-6 blur-3xl pointer-events-none"
          style={{ background: 'var(--brand-gold)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center" data-animate="fade-up">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
            Who I Am
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            MEET <span className="gold-text">AJ</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Coach. Athlete. Activator. On a mission to turn your energy into purpose.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── MAIN BIO ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Photo */}
            <div className="md:sticky md:top-28" data-animate="slide-left">
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
            </div>

            {/* Bio content */}
            <div data-animate="slide-right">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
                The Story
              </p>
              <h2 className="text-3xl font-black text-white mb-8" style={{ letterSpacing: '-0.02em' }}>
                MORE THAN A COACH
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  Former ITF Top 800-ranked player and internationally qualified coach across tennis, padel, pickleball, beach tennis and fitness. Over a decade of elite coaching experience across South Africa, Thailand, the United States and beyond.
                </p>
                <p>
                  Before coaching was a career, it was a way of life. Growing up competing on the national circuit in South Africa, representing at Junior Davis Cup level, and training in professional squads — the standard was always high. That competitive foundation is what every client gets access to.
                </p>
                <p>
                  Off the court, AJ is building something bigger. Activated by AJ is a premium racquet sport brand and facility development platform. Reflect Motion is the AI performance technology layer powering it. The vision is a fully integrated sports ecosystem — and it&apos;s already in motion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <GoldDivider />

      {/* ── COACHING PHILOSOPHY ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
              How I Coach
            </p>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              MY COACHING PHILOSOPHY
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Technique First',
                body: 'Great results start with great foundations. Before speed, power or tactics, I build the technical base that everything else grows from. Solid technique is the shortcut to long-term improvement.',
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
                body: "Your body follows your mind. I coach the mental game as hard as the physical. Confidence, focus and resilience are skills you can train. A strong mindset is what separates players when the score is close.",
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
                body: "I don't chase perfect. I chase better. Consistent forward movement beats waiting for the ideal moment every time. Every session, every rep, every rally. We are building something bigger than yesterday.",
                svg: (
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="34" width="8" height="12" rx="1.5" /><rect x="20" y="24" width="8" height="22" rx="1.5" /><rect x="34" y="12" width="8" height="34" rx="1.5" />
                    <line x1="46" y1="20" x2="46" y2="6" /><polyline points="40,12 46,6 52,12" />
                  </svg>
                ),
              },
            ].map((pillar, i) => (
              <div
                key={pillar.title}
                className="card card-gold flex flex-col items-center text-center p-8"
                data-animate="fade-up"
                data-animate-delay={String(i * 120)}
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

      <GoldDivider />

      {/* ── VALUES + VIDEO ── */}
      <section className="relative overflow-hidden section-padding" style={{ background: '#000' }}>
        <LogoWatermark size={700} opacity={0.1} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — Values */}
            <div data-animate="slide-left">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
                What Drives Me
              </p>
              <h2 className="text-4xl font-black text-white mb-10" style={{ letterSpacing: '-0.02em' }}>
                MY VALUES
              </h2>
              <div className="flex flex-col gap-7">
                {values.map((v) => (
                  <div key={v.label} className="flex gap-5 items-start">
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
              </div>
              <div className="mt-10">
                <Link href="/contact" className="btn-gold">
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* RIGHT — Video */}
            <div data-animate="slide-right">
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  display: 'block',
                  border: '1px solid rgba(201,168,76,0.2)',
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
