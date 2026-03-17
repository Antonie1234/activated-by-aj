import Link from 'next/link';

const credentials = [
  { icon: '🎾', title: 'Tennis Coach', detail: 'Certified coaching with years of court experience across all skill levels' },
  { icon: '💪', title: 'Strength & Conditioning', detail: 'Evidence-based programming for strength, endurance, and athletic performance' },
  { icon: '🌊', title: 'Beach Sports', detail: 'Specialised in functional movement and outdoor performance training' },
  { icon: '📍', title: 'Sydney Based', detail: 'Training in and around Willoughby, servicing Greater Sydney' },
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
          <div className="gold-divider mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            MEET <span className="gold-text">AJ</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Coach. Athlete. Activator. Based in Willoughby, Sydney — on a mission to turn
            your energy into purpose.
          </p>
        </div>
      </section>

      {/* ── MAIN BIO ── */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Photo placeholder */}
            <div
              className="sticky top-28 rounded-lg overflow-hidden flex items-center justify-center"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                minHeight: '480px',
              }}
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-gray-500 text-sm">AJ Photo Coming Soon</p>
              </div>
            </div>

            {/* Bio content */}
            <div>
              <h2 className="text-3xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
                THE STORY
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  AJ is more than a coach — he&apos;s a catalyst. Growing up with a deep passion
                  for sport and movement, AJ discovered early that the way you move your body
                  directly shapes how you show up in life.
                </p>
                <p>
                  That insight became the foundation of Activated by AJ — a coaching brand
                  built around one simple belief: <span className="text-white font-semibold">when you activate your body, you activate your life.</span>
                </p>
                <p>
                  With expertise across tennis coaching, strength &amp; conditioning, and
                  outdoor movement and beach sports, AJ offers a truly holistic approach
                  to fitness. Every program is built around you — your goals, your body,
                  your lifestyle.
                </p>
                <p>
                  Based in Willoughby, Sydney, AJ works with clients of all ages and
                  fitness levels — from beginners stepping into sport for the first time, to
                  competitive athletes chasing peak performance.
                </p>
                <p>
                  If you&apos;re ready to stop going through the motions and start training with
                  purpose — AJ is ready for you.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-gold">
                  Book with AJ
                </Link>
                <Link href="/services" className="btn-outline">
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              What Drives Me
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              MY VALUES
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.label}
                className="p-6 rounded-lg"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              >
                <h3 className="text-xl font-black mb-2" style={{ color: 'var(--brand-gold)' }}>
                  {v.label}
                </h3>
                <p
                  className="text-gray-400 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: v.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ background: 'linear-gradient(135deg, var(--brand-blue) 0%, #0d4fa8 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="text-blue-100 mb-8">
            Ready to get activated? Reach out and let&apos;s build something great.
          </p>
          <Link href="/contact" className="btn-gold">
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
