import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

export const metadata = {
  title: 'Investor Pathway | Activated by AJ',
  description:
    'Activated by AJ originates padel facility concepts, connects the right investors, and activates world-class facilities.',
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
    desc: 'The facility opens under the Activated brand. Coaching, community, and technology all operating under one identity.',
  },
];

const revenueStreams = [
  {
    title: 'COACHING BRAND',
    label: 'Live Now',
    body: 'Already live. Premium coaching and lifestyle brand delivering tennis, padel, pickleball, beach tennis, fitness and conditioning. A proven operating model with real clients — the foundation every facility is built on.',
    highlight: false,
  },
  {
    title: 'CONCEPT BROKER',
    label: 'Core Engine',
    body: 'The core engine. We identify padel opportunities, develop the concept, connect investors, structure the deal, and earn a success fee or equity stake.',
    highlight: true,
  },
  {
    title: 'AI PERFORMANCE TECHNOLOGY',
    label: 'In Development',
    sublabel: 'Powered by Reflect Motion',
    body: 'In partnership with Reflect Motion, every Activated facility runs AI-powered movement analysis as its standard performance layer — built to scale across every court we activate.',
    highlight: false,
  },
];

export default function InvestorPathway() {
  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: '#0D1B2A' }}
      >
        <LogoWatermark size={700} opacity={0.09} />
        {/* Gold glow orb */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 1 }}>
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
            Padel is the fastest growing racquet sport in the world. Fewer than 50 courts exist for 50,000+ active players.
            Activated by AJ originates the concept, connects the capital, and activates the facility.
            We don&apos;t build. We make the right things happen.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── FIVE STEP PROCESS ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
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
                data-animate="fade-up"
                data-animate-delay={String(i * 100)}
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
      <section className="section-padding relative overflow-hidden" style={{ background: '#0D1B2A' }}>
        <LogoWatermark size={600} opacity={0.07} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>
          <div className="text-center mb-14" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
              The Business
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              THREE REVENUE STREAMS
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {revenueStreams.map((stream, i) => (
              <div
                key={stream.title}
                className="flex flex-col p-8 rounded-2xl"
                data-animate="fade-up"
                data-animate-delay={String(i * 120)}
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
                <div className="mb-6 flex flex-wrap gap-2 items-center">
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
                  {'sublabel' in stream && stream.sublabel && (
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: 'rgba(201,168,76,0.06)', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      {stream.sublabel}
                    </span>
                  )}
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
