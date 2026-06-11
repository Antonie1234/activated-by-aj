'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

// ─── Security helpers ─────────────────────────────────────────────────────────

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const RATE_LIMIT_KEY = 'aj_review_last_submit';
const RATE_LIMIT_MS  = 120_000; // 2 minutes

// ─── Star rating input ────────────────────────────────────────────────────────

function StarInput({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHover(star)}
          onClick={() => onChange(star)}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          style={{
            fontSize: '2rem',
            lineHeight: 1,
            color: star <= (hover || rating) ? '#C8A951' : 'rgba(74,127,165,0.3)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 3px',
            transition: 'color 0.1s ease',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeaveReview() {
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    sport:   '',
    message: '',
  });
  const [rating,    setRating]    = useState(0);
  const [honeypot,  setHoneypot]  = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: stripHtml(e.target.value) });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Honeypot
    if (honeypot) return;

    // Client-side rate limiting
    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (last && Date.now() - parseInt(last, 10) < RATE_LIMIT_MS) {
      setError('Please wait a moment before submitting again.');
      return;
    }

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.sport || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (form.message.trim().length < 10) {
      setError('Your review is a little short — tell us more!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          sport:   form.sport,
          rating,
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
        setSubmitted(true);
      }
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: '#0D1B2A' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-gold)' }}
        />
        <LogoWatermark size={580} opacity={0.05} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 1 }} data-animate="fade-up">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#C8A951' }}>
            Client Reviews
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            SHARE YOUR <span style={{
              background: 'linear-gradient(135deg, #C8A951 0%, #e0c97a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>EXPERIENCE</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Trained with AJ? We&apos;d love to hear about your journey. Your review helps others find the right coach.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── FORM ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {submitted ? (
            /* ── THANK-YOU STATE ── */
            <div
              className="p-12 rounded-2xl text-center"
              style={{ background: 'var(--surface)', border: '1px solid rgba(200,169,81,0.3)' }}
            >
              {/* Gold checkmark in a circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(200,169,81,0.12)', border: '1px solid rgba(200,169,81,0.4)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A951" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,15 10,21 24,7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-3" style={{ color: '#E8F4FD', letterSpacing: '-0.02em' }}>
                Thank You!
              </h2>
              <p className="leading-relaxed max-w-md mx-auto mb-8" style={{ color: '#4A7FA5' }}>
                Your review has been received and will appear once approved.
              </p>
              <Link href="/" className="btn-gold">
                Back to Home
              </Link>
            </div>

          ) : (
            /* ── FORM STATE ── */
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              data-animate="fade-up"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute', opacity: 0, height: 0, width: 0,
                  border: 'none', padding: 0, margin: 0, overflow: 'hidden', pointerEvents: 'none',
                }}
              />

              <h2 className="text-xl font-black text-white mb-8" style={{ letterSpacing: '-0.01em' }}>
                YOUR REVIEW
              </h2>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Email * <span className="normal-case font-normal text-gray-600">(not displayed)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    maxLength={150}
                  />
                </div>
              </div>

              {/* Sport */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Sport / Service *
                </label>
                <select
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                  required
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: form.sport ? 'white' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  <option value="">Select a sport or service</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Padel">Padel</option>
                  <option value="Pickleball">Pickleball</option>
                  <option value="Beach Sports">Beach Sports</option>
                  <option value="Fitness">Fitness &amp; Conditioning</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Star rating */}
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Your Rating *
                </label>
                <StarInput rating={rating} onChange={setRating} />
                {rating > 0 && (
                  <p className="text-xs mt-1" style={{ color: '#C8A951' }}>
                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Your Review *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your experience training with AJ — what improved, what you enjoyed, and what you'd tell someone considering it..."
                  rows={5}
                  required
                  maxLength={2000}
                  style={{ resize: 'vertical' }}
                />
                <p className="text-gray-600 text-xs mt-1 text-right">
                  {form.message.length} / 2000
                </p>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm mb-4 text-center" style={{ color: '#ef4444' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <p className="text-gray-600 text-xs mt-3 text-center">
                Reviews are moderated before appearing publicly. Your email is never shown.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
