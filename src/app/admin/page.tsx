'use client';

import Link from 'next/link';

// Client Component: the cards use hover event handlers, which are not allowed
// in Server Components (this was failing `next build` and blocking deploys).
// Auth is handled by the admin layout — this page is only visible when authenticated.
export default function AdminDashboard() {
  const cards = [
    {
      href:  '/admin/gallery',
      title: 'Gallery Manager',
      desc:  'Upload, organise, and reorder media across all sport tabs.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A7FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      ),
      iconBg:     'rgba(74,127,165,0.14)',
      iconBorder: 'rgba(74,127,165,0.25)',
    },
    {
      href:  '/admin/reviews',
      title: 'Review Moderation',
      desc:  'Approve or reject client reviews before they appear on the site.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      iconBg:     'rgba(200,169,81,0.12)',
      iconBorder: 'rgba(200,169,81,0.25)',
    },
  ];

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '52px 28px 80px' }}>

      {/* Page heading */}
      <div style={{ marginBottom: '44px' }}>
        <p style={{
          color: '#C8A951', fontSize: '11px', fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 10px',
        }}>
          Dashboard
        </p>
        <h1 style={{
          color: '#E8F4FD', fontSize: '32px', fontWeight: 900,
          letterSpacing: '-0.02em', margin: 0,
        }}>
          Admin Panel
        </h1>
      </div>

      {/* Navigation cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {cards.map((card) => (
          <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
            <div
              style={{
                background: '#162233',
                border: '1px solid rgba(232,244,253,0.1)',
                borderRadius: '8px',
                padding: '28px',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,244,253,0.22)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,244,253,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '46px', height: '46px', borderRadius: '8px',
                background: card.iconBg, border: `1px solid ${card.iconBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px', flexShrink: 0,
              }}>
                {card.icon}
              </div>

              <h2 style={{
                color: '#E8F4FD', fontSize: '16px', fontWeight: 700,
                margin: '0 0 7px', letterSpacing: '-0.01em',
              }}>
                {card.title}
              </h2>
              <p style={{
                color: 'rgba(232,244,253,0.45)', fontSize: '13px',
                margin: 0, lineHeight: 1.55,
              }}>
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
