'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Design tokens ────────────────────────────────────────────────────────────
const S = {
  bg:       '#0D1B2A',
  card:     '#162233',
  gold:     '#C8A951',
  platinum: '#E8F4FD',
  blue:     '#4A7FA5',
  border:   'rgba(232,244,253,0.1)',
  radius:   '6px',
} as const;

const PASSWORD = 'activated2026';
const AUTH_KEY  = 'activated-admin-auth';

// ─── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [pw,  setPw]  = useState('');
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      onAuth();
    } else {
      setErr('Incorrect password.');
      setPw('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: S.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{
        background: S.card, border: `1px solid ${S.border}`,
        borderRadius: '12px', padding: '44px 48px',
        width: '100%', maxWidth: '360px',
      }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{
            color: S.platinum, fontWeight: 900, fontSize: '22px',
            letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 6px',
          }}>
            ACTIVATED
          </p>
          <p style={{
            color: S.blue, fontSize: '11px', letterSpacing: '2.5px',
            textTransform: 'uppercase', margin: 0, fontWeight: 600,
          }}>
            Admin Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(''); }}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%', background: S.bg,
              border: `1px solid ${err ? '#ef4444' : 'rgba(232,244,253,0.15)'}`,
              borderRadius: S.radius, padding: '10px 14px',
              color: S.platinum, fontSize: '14px', outline: 'none',
              marginBottom: err ? '8px' : '14px',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s ease',
            }}
          />
          {err && (
            <p style={{ color: '#ef4444', fontSize: '12px', margin: '0 0 12px' }}>{err}</p>
          )}
          <button
            type="submit"
            style={{
              width: '100%', background: S.blue, color: '#fff', border: 'none',
              borderRadius: S.radius, padding: '11px',
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Sticky admin header ──────────────────────────────────────────────────────
function AdminHeader() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: S.card, borderBottom: `1px solid ${S.border}`,
      height: '54px', padding: '0 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Link
        href="/admin"
        style={{
          color: S.platinum, fontWeight: 900, fontSize: '14px',
          letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
        }}
      >
        ACTIVATED
      </Link>
      <Link
        href="/"
        style={{
          color: S.blue, fontSize: '13px', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '5px',
        }}
      >
        ← Back to site
      </Link>
    </header>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    // sessionStorage is only available on the client
    const stored = sessionStorage.getItem(AUTH_KEY);
    setAuthed(stored === 'true');
  }, []);

  // Blank navy while determining auth state (avoids hydration mismatch)
  if (authed === null) {
    return <div style={{ background: S.bg, minHeight: '100vh' }} />;
  }

  if (!authed) {
    return <LoginScreen onAuth={() => setAuthed(true)} />;
  }

  return (
    <div style={{ background: S.bg, minHeight: '100vh' }}>
      <AdminHeader />
      {children}
    </div>
  );
}
