import Link from 'next/link';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

export const metadata = {
  title: 'Investor Pathway | Activated',
  description:
    'Activated originates padel facility concepts, connects the right investors, and activates world-class facilities.',
};


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
            background: 'radial-gradient(circle, rgba(232,244,253,0.08) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 1 }}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: 'rgba(74,127,165,0.12)',
              border: '1px solid rgba(74,127,165,0.3)',
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

          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Padel is the fastest growing racquet sport in the world. Fewer than 50 courts exist for 50,000+ active players.
            Interested in investing in Padel? Let us show you how to embark on developing a Padel venue — an emerging sport ready to boom and delivering amazing return on investment.
          </p>
          <Link href="/contact" className="btn-primary">
            CONTACT US FOR MORE INFORMATION
          </Link>
        </div>
      </section>

    </>
  );
}
