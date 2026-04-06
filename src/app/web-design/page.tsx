import GoldDivider from '@/components/GoldDivider';

export const metadata = {
  title: 'Web Design Services | Activated by AJ',
  description:
    'Premium custom websites built for small businesses, personal brands and startups. Starter, Professional and Premium packages available.',
};

const packages = [
  {
    name: 'Starter',
    price: '$800',
    description: 'Everything you need to get online fast.',
    features: [
      '3 pages',
      'Contact form',
      'Mobile ready',
      'Live deployment',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$1,500',
    description: 'A complete web presence for growing brands.',
    features: [
      '6 pages',
      'Forms & gallery',
      'SEO optimised',
      '30-day support',
    ],
    popular: true,
    cta: 'Most Popular',
  },
  {
    name: 'Premium',
    price: '$2,400+',
    description: 'Advanced builds with no limits.',
    features: [
      'Unlimited pages',
      'Booking integration',
      'Advanced features',
      '60-day support',
    ],
    popular: false,
    cta: "Let's Talk",
  },
];

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We hop on a call so I can learn about your brand, goals, and what you need from your website.',
  },
  {
    number: '02',
    title: 'Proposal',
    description:
      'I put together a clear proposal with scope, timeline, and pricing — no surprises.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'I design and develop your site from scratch using the same tech stack as top companies.',
  },
  {
    number: '04',
    title: 'Review',
    description:
      "You review every page and request any tweaks. We refine until it's exactly right.",
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'Your site goes live on a custom domain — fast, secure, and ready for visitors.',
  },
];

export default function WebDesignPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: '80vh',
          background:
            'linear-gradient(160deg, #0a0a0a 60%, rgba(201,168,76,0.06) 100%)',
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
            background: 'radial-gradient(circle, rgba(240,180,41,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: 'var(--brand-blue-light)' }}
          >
            Web Design Services
          </p>
          <div className="gold-divider mx-auto mb-8" />

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
            startups — using the same tech stack as top companies.
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
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--brand-blue-light)' }}
            >
              Packages &amp; Pricing
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              CHOOSE YOUR PACKAGE
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Every site is custom-built — no templates, no shortcuts.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="card relative flex flex-col"
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
                  style={{ color: 'var(--brand-blue-light)' }}
                >
                  {pkg.name}
                </p>

                <p
                  className="text-4xl font-black mb-1"
                  style={{ color: 'var(--brand-gold)', letterSpacing: '-0.02em' }}
                >
                  {pkg.price}
                </p>

                <p className="text-sm text-gray-400 mb-6">{pkg.description}</p>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: 'rgba(240,180,41,0.15)',
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
            Prices in USD. Need something custom?{' '}
            <a
              href="mailto:activatedbookingsbyaj@gmail.com"
              className="underline"
              style={{ color: 'var(--brand-gold)' }}
            >
              Email me
            </a>{' '}
            and we'll build something tailored.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── HOW IT WORKS ── */}
      <section
        className="section-padding"
        style={{ background: 'var(--background)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--brand-blue-light)' }}
            >
              The Process
            </p>
            <div className="gold-divider mx-auto mb-6" />
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              HOW IT WORKS
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              A simple, transparent process from first contact to launch day.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex items-start gap-6 card"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: '1.75rem',
                }}
              >
                {/* Step number */}
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                  style={{
                    background: 'rgba(240,180,41,0.12)',
                    color: 'var(--brand-gold)',
                    border: '1px solid rgba(240,180,41,0.3)',
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white text-lg">{step.title}</h3>
                    {/* connector arrow for all but last */}
                    {i < steps.length - 1 && (
                      <span
                        className="text-xs hidden sm:inline"
                        style={{ color: 'rgba(240,180,41,0.4)' }}
                      >
                        →
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ── */}
      <section
        className="section-padding text-center"
        style={{
          background:
            'linear-gradient(135deg, var(--brand-blue) 0%, #0f4fa0 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4 text-white opacity-70"
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
            className="btn-gold text-base"
          >
            activatedbookingsbyaj@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
