'use client';

import { useState } from 'react';

export default function Apparel() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    window.open(
      `mailto:activatedbookingsbyaj@gmail.com?subject=Apparel%20Waitlist&body=Add%20me%20to%20the%20Activated%20Apparel%20waitlist%3A%20${encodeURIComponent(email)}`
    );
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(ellipse at center, var(--brand-gold) 0%, transparent 70%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(240,180,41,0.5) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(240,180,41,0.5) 80px)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20">
          {/* Coming soon badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: 'rgba(240,180,41,0.12)',
              border: '1px solid rgba(240,180,41,0.3)',
              color: 'var(--brand-gold)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--brand-gold)' }}
            />
            Dropping Soon
          </div>

          <div className="text-7xl mb-6">👕</div>

          <h1
            className="text-5xl sm:text-7xl font-black leading-none mb-4 tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block text-white">ACTIVATED APPAREL</span>
            <span className="block gold-text">COMING SOON</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            The Activated by AJ apparel range is dropping soon. Drop your email below to be first to know.
          </p>

          {/* Email sign-up */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 text-sm"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '0.875rem 1.25rem',
                    borderRadius: '4px',
                    color: 'white',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold whitespace-nowrap"
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Joining...' : 'Notify Me'}
                </button>
              </div>
              <p className="text-gray-600 text-xs mt-3">
                No spam. Just the drop date — we promise.
              </p>
            </form>
          ) : (
            <div
              className="max-w-md mx-auto p-6 rounded-lg text-center"
              style={{
                background: 'rgba(240,180,41,0.1)',
                border: '1px solid rgba(240,180,41,0.25)',
              }}
            >
              <div className="text-3xl mb-3">🔥</div>
              <p className="font-bold text-white mb-1">You&apos;re on the list!</p>
              <p className="text-gray-400 text-sm">
                We&apos;ll hit you up as soon as the drop is confirmed.
              </p>
            </div>
          )}

          {/* Preview teaser cards */}
          <div className="mt-20 grid grid-cols-3 gap-4 max-w-sm mx-auto opacity-30">
            {['TEE', 'HOODIE', 'CAP'].map((item) => (
              <div
                key={item}
                className="rounded-lg p-4 text-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="text-2xl mb-2">
                  {item === 'TEE' ? '👕' : item === 'HOODIE' ? '🧥' : '🧢'}
                </div>
                <p className="text-xs font-bold uppercase text-gray-500">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest">Coming Soon</p>
        </div>
      </section>
    </>
  );
}
