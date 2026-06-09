import Link from 'next/link';

/**
 * Isolated layout for all /admin/* pages.
 * Replaces the site Navbar/Footer (hidden via ConditionalSiteChrome) with a
 * minimal admin top bar containing just the brand name and a back link.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A' }}>

      {/* ── Admin top bar ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: '#0D1B2A',
          borderBottom: '1px solid rgba(232,244,253,0.08)',
          padding: '0 24px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            color: '#E8F4FD',
            fontWeight: 900,
            fontSize: '13px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          ACTIVATED — Gallery Manager
        </span>

        <Link
          href="/"
          style={{
            color: '#4A7FA5',
            fontSize: '13px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.15s ease',
          }}
        >
          ← Back to site
        </Link>
      </header>

      {children}
    </div>
  );
}
