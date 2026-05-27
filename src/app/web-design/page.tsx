import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

export const metadata = {
  title: 'Web Design Services | Activated by AJ',
  description:
    'Premium custom websites built for small businesses, personal brands and startups. Starter, Professional and Premium packages available.',
};

const packages = [
  {
    name: 'Starter',
    description: 'Everything you need to get online fast.',
    features: [
      '3 pages',
      'Contact form',
      'Mobile ready',
      'Live deployment',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    description: 'A complete web presence for growing brands.',
    features: [
      '6 pages',
      'Forms & gallery',
      'SEO optimised',
      '30-day support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    description: 'Advanced builds with no limits.',
    features: [
      'Unlimited pages',
      'Booking integration',
      'Advanced features',
      '60-day support',
    ],
    popular: false,
  },
];

export default function WebDesignPage() {
  return (
    <main>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: '80vh',
          background:
            'linear-gradient(160deg, #0a0a0a 60%, rgba(232,244,253,0.06) 100%)',
          paddingTop: '7rem',
          paddingBottom: '5rem',
        }}
      >
        {/* decorative gold glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,244,253,0.22) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <LogoWatermark size={600} opacity={0.06} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6" data-animate="fade-up">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--brand-gold)' }}
          >
            Web Design Services
          </p>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-none"
            style={{ letterSpacing: '-0.03em' }}
          >
            Premium Websites.
            <br />
            <span className="gold-text">Built From Scratch.</span>
          </h1>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            I design and build custom websites for small businesses, personal brands and
            startups, using the same tech stack as top companies.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:activatedbookingsbyaj@gmail.com"
              className="btn-gold"
            >
              Get a Free Quote
            </a>
            <a href="#packages" className="btn-outline">
              View Packages
            </a>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── PACKAGES ── */}
      <section
        id="packages"
        className="section-padding"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14" data-animate="fade-up">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--brand-gold)' }}
            >
              Packages
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              CHOOSE YOUR PACKAGE
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Every site is custom-built. No templates, no shortcuts.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className="card relative flex flex-col"
                data-animate="fade-up"
                data-animate-delay={String(i * 120)}
                style={{
                  background: 'var(--surface-2)',
                  border: pkg.popular
                    ? '2px solid var(--brand-gold)'
                    : '1px solid var(--border)',
                  padding: '2rem',
                }}
              >
                {pkg.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full"
                    style={{
                      background: 'var(--brand-gold)',
                      color: '#000',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--brand-gold)' }}
                >
                  {pkg.name}
                </p>

                <p className="text-sm italic mb-1" style={{ color: 'rgba(74,127,165,0.75)' }}>
                  Get in touch for a custom quote
                </p>

                <p className="text-sm text-gray-400 mb-6">{pkg.description}</p>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: 'rgba(74,127,165,0.15)',
                          color: 'var(--brand-gold)',
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:activatedbookingsbyaj@gmail.com"
                  className={pkg.popular ? 'btn-gold text-center' : 'btn-outline text-center'}
                  style={{ display: 'block' }}
                >
                  {pkg.popular ? 'Get Started' : 'Enquire Now'}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Need something custom?{' '}
            <a
              href="mailto:activatedbookingsbyaj@gmail.com"
              className="underline"
              style={{ color: 'var(--brand-gold)' }}
            >
              Email me
            </a>{' '}
            and we&apos;ll build something tailored.
          </p>

          <div className="text-center mt-10">
            <Link href="/contact" className="btn-gold">
              START A PROJECT
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ── */}
      <section
        className="section-padding text-center relative overflow-hidden"
        style={{ background: '#0A1628' }}
      >
        <LogoWatermark size={500} opacity={0.07} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--brand-gold)' }}
          >
            Let&apos;s Build Something Great
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            READY TO GET STARTED?
          </h2>
          <p className="text-white opacity-80 text-lg mb-8">
            Email me and let&apos;s talk about your project.
          </p>
          <a
            href="mailto:activatedbookingsbyaj@gmail.com"
            className="btn-gold text-sm sm:text-base"
            style={{ wordBreak: 'break-all' }}
          >
            activatedbookingsbyaj@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
