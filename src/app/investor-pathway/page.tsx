import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';

export const metadata = {
  title: 'Investor Pathway | Activated by AJ',
  description:
    'Activated by AJ originates padel facility concepts, connects the right investors, and activates world-class facilities across Australia.',
};

const steps = [
  {
    num: '01',
    title: 'IDENTIFY',
    desc: 'We spot the opportunity. A development site, a tennis club converting to padel, a developer with land, or an investor looking for a concept.',
  },
  {
    num: '02',
    title: 'DEVELOP',
    desc: 'We build the concept. The Activated operating model, sports programming, coaching ecosystem, and brand story. This is the IP no investor can replicate alone.',
  },
  {
    num: '03',
    title: 'CONNECT',
    desc: 'We pitch to the right investors through the Activated network. Every connection is structured, documented, and legally protected from day one.',
  },
  {
    num: '04',
    title: 'STRUCTURE',
    desc: 'A formal agreement is signed. Success fee, equity stake, or hybrid. Defined upfront. Activated earns from the deal and the brand.',
  },
  {
    num: '05',
    title: 'ACTIVATE',
    desc: 'The facility opens under the Activated brand. Coaching, community, and technology all operating under one identity. AJ earns ongoing.',
  },
];

const revenueStreams = [
  {
    title: 'COACHING BRAND',
    label: 'Live Now',
    body: 'Already live. Premium coaching and lifestyle brand in Sydney. The existing client base underpins every investor conversation.',
    highlight: false,
  },
  {
    title: 'CONCEPT BROKER',
    label: 'Core Engine',
    body: 'The core engine. We identify padel opportunities, develop the concept, connect investors, structure the deal, and earn a success fee or equity stake.',
    highlight: true,
  },
  {
    title: 'AI TECH PLATFORM',
    label: 'In Development',
    body: 'In development. An AI coaching and performance platform built under the Activated brand. Plugs into every facility as a standard operating system.',
    highlight: false,
  },
];

export default function InvestorPathway() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: '#0D1B2A' }}
      >
        {/* Gold glow orb */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--brand-gold)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--brand-gold)' }}
            />
            Confidential Enquiries Welcome
          </div>

          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none mb-8"
            style={{ letterSpacing: '-0.03em' }}
          >
            THE INVESTOR<br />
            <span style={{ color: 'var(--brand-gold)' }}>PATHWAY</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Padel is Australia&apos;s fastest growing racquet sport. Fewer than 50 courts exist for 50,000+ active players.
            Activated by AJ originates the concept, connects the capital, and activates the facility.
            We don&apos;t build. We make the right things happen.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── FIVE STEP PROCESS ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              How It Works
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              THE FIVE STEP PROCESS
            </h2>
          </div>

          {/* Desktop: horizontal row */}
          <div className="hidden lg:flex gap-0 items-stretch">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex-1 flex flex-col items-center text-center px-6 py-8 relative"
                style={{
                  background: 'var(--surface)',
                  borderTop: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: '1px solid var(--border)',
                  borderRight: i === steps.length - 1 ? '1px solid var(--border)' : 'none',
                  borderRadius: i === 0 ? '14px 0 0 14px' : i === steps.length - 1 ? '0 14px 14px 0' : '0',
                }}
              >
                {/* Gold number */}
                <div
                  className="text-4xl font-black mb-4"
                  style={{ color: 'var(--brand-gold)', letterSpacing: '-0.03em' }}
                >
                  {step.num}
                </div>
                <h3 className="text-sm font-black text-white mb-3 uppercase tracking-widest">{step.title}</h3>
                <div className="w-6 h-0.5 mb-3 mx-auto" style={{ background: 'var(--brand-gold)' }} />
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: 'var(--brand-gold)', color: '#0D1B2A' }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="lg:hidden flex flex-col gap-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex gap-5 items-start p-6 rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="text-3xl font-black flex-shrink-0 w-14 text-center"
                  style={{ color: 'var(--brand-gold)', letterSpacing: '-0.03em' }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── THREE REVENUE STREAMS ── */}
      <section className="section-padding" style={{ background: '#0D1B2A' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
              The Business
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              THREE REVENUE STREAMS
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {revenueStreams.map((stream) => (
              <div
                key={stream.title}
                className="flex flex-col p-8 rounded-2xl"
                style={
                  stream.highlight
                    ? {
                        background: 'var(--brand-gold)',
                        border: '2px solid var(--brand-gold)',
                      }
                    : {
                        background: 'rgba(13,27,42,0.8)',
                        border: '1px solid rgba(201,168,76,0.3)',
                      }
                }
              >
                <div className="mb-6">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={
                      stream.highlight
                        ? { background: 'rgba(0,0,0,0.15)', color: '#0D1B2A' }
                        : { background: 'rgba(201,168,76,0.1)', color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.3)' }
                    }
                  >
                    {stream.label}
                  </span>
                </div>
                <h3
                  className="text-xl font-black mb-4 tracking-tight"
                  style={{ color: stream.highlight ? '#0D1B2A' : 'white', letterSpacing: '-0.01em' }}
                >
                  {stream.title}
                </h3>
                <div
                  className="w-8 h-0.5 mb-4"
                  style={{ background: stream.highlight ? 'rgba(13,27,42,0.4)' : 'var(--brand-gold)' }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: stream.highlight ? 'rgba(13,27,42,0.75)' : 'rgba(255,255,255,0.6)' }}
                >
                  {stream.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── WHAT YOU GET ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
              The Opportunity
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              WHAT YOU GET
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Investor card */}
            <div
              className="p-8 rounded-2xl"
              style={{ background: '#0D1B2A', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <div className="mb-6">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.08)' }}
                >
                  Investor
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
                If You Are an Investor
              </h3>
              <ul className="space-y-4">
                {[
                  'A fully developed concept, not just an idea',
                  'The Activated brand operating your facility',
                  'First-mover positioning in Australia\'s fastest growing sport',
                  'Access to the Activated investor network across multiple deals',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
                    >
                      ✓
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer card */}
            <div
              className="p-8 rounded-2xl"
              style={{ background: '#0D1B2A', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <div className="mb-6">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.08)' }}
                >
                  Developer / Facility Owner
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
                If You Are a Developer or Facility Owner
              </h3>
              <ul className="space-y-4">
                {[
                  'A premium brand that transforms your space into a destination',
                  'A fully developed operating model ready to build around',
                  'Introduction to capital partners through the Activated network',
                  'Long-term brand licensing revenue built into your facility',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--brand-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
                    >
                      ✓
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── CTA ── */}
      <section className="section-padding" style={{ background: 'var(--brand-gold)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#0D1B2A', letterSpacing: '-0.02em' }}
          >
            Serious enquiries only.
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(13,27,42,0.7)' }}>
            All conversations handled under strict confidentiality. Concept overviews, business plans, and working group
            details available upon request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-200 hover:opacity-90"
              style={{ background: '#0D1B2A', color: 'var(--brand-gold)' }}
            >
              Submit an Enquiry
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-200 hover:bg-[#0D1B2A] hover:text-[var(--brand-gold)]"
              style={{
                background: 'transparent',
                color: '#0D1B2A',
                border: '2px solid #0D1B2A',
              }}
            >
              About AJ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
