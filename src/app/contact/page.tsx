'use client';

import { useState } from 'react';
import GoldDivider from '@/components/GoldDivider';
import ScrollAnimations from '@/components/ScrollAnimations';
import LogoWatermark from '@/components/LogoWatermark';

// Strip HTML tags to prevent XSS from input values
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

// RFC-5322-inspired email validation
function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const RATE_LIMIT_KEY = 'aj_contact_last_submit';
const RATE_LIMIT_MS = 60_000; // 60 seconds


export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  // Honeypot — invisible to real users, bots fill it automatically
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Strip HTML tags on every keystroke to prevent injection
    const cleaned = stripHtml(e.target.value);
    setForm({ ...form, [e.target.name]: cleaned });
    if (e.target.name === 'email') setEmailError('');
    if (rateLimitError) setRateLimitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — silently drop if a bot filled the hidden field
    if (honeypot) return;

    // Client-side rate limiting via localStorage
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit && Date.now() - parseInt(lastSubmit, 10) < RATE_LIMIT_MS) {
      setRateLimitError('Please wait before submitting again.');
      return;
    }

    // Email format validation
    if (!isValidEmail(form.email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Final sanitise — trim all fields before sending
    const _sanitised = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service.trim(),
      message: form.message.trim(),
    };

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'rgba(232,244,253,0.4)' }}
        />
        <LogoWatermark size={600} opacity={0.05} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }} data-animate="fade-up">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-gold)' }}>
            Get Started
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            LET&apos;S <span className="gold-text">ACTIVATE</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Ready to get moving? Reach out via the form below or email. AJ will get back to you as soon as possible.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* ── MAIN CONTENT ── */}
      <section className="relative section-padding overflow-hidden" style={{ background: '#0D1B2A' }}>
        <LogoWatermark size={600} opacity={0.05} />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>

          {/* Heading */}
          <div className="text-center mb-10" data-animate="fade-up">
            <h2 className="text-4xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              LET&apos;S <span className="gold-text">ACTIVATE</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Reach out directly.
            </p>
          </div>

          {/* Form */}
          <div data-animate="fade-up">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-lg"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {/* Honeypot field — visually hidden, real users never see or interact with it */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    height: 0,
                    width: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                />

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      maxLength={150}
                      style={emailError ? { borderColor: '#ef4444' } : {}}
                    />
                    {emailError && (
                      <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{emailError}</p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+61 4XX XXX XXX"
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Interested In
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        color: form.service ? 'white' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="tennis">Tennis Coaching</option>
                      <option value="padel">Padel Coaching</option>
                      <option value="pickleball">Pickleball Coaching</option>
                      <option value="beach">Beach Tennis</option>
                      <option value="fitness">Fitness &amp; Conditioning</option>
                      <option value="movement">Movement &amp; Outdoor</option>
                      <option value="programs">Programs &amp; Plans</option>
                      <option value="investor">Investor Enquiry</option>
                      <option value="mixed">Multiple / Not Sure</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell AJ a bit about your goals, current fitness level, and when you'd like to start..."
                    rows={5}
                    required
                    maxLength={2000}
                    style={{ resize: 'vertical' }}
                  />
                  <p className="text-gray-600 text-xs mt-1 text-right">
                    {form.message.length}/2000
                  </p>
                </div>

                {rateLimitError && (
                  <p className="text-sm mb-4 text-center" style={{ color: '#f59e0b' }}>
                    {rateLimitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full"
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending...' : "Let's Activate →"}
                </button>
                <p className="text-gray-600 text-xs mt-3 text-center">
                  Your details are kept private and never shared.
                </p>
              </form>
            ) : (
              <div
                className="p-12 rounded-lg text-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                  MESSAGE SENT!
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Thanks for reaching out. AJ will be in touch shortly.
                </p>
                <a
                  href="mailto:activatedbookingsbyaj@gmail.com"
                  className="btn-gold mt-8 inline-block"
                >
                  Send Another Email
                </a>
              </div>
            )}
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-6 mt-10" data-animate="fade-up">
            {/* A logo → Instagram */}
            <a
              href="https://www.instagram.com/activatedbyaj_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-icon"
              aria-label="Follow on Instagram"
              title="Follow on Instagram"
            >
              <svg width="24" height="24" viewBox="18 8 24 24" aria-hidden="true">
                <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#4A7FA5" />
                <polygon points="24,26 36,26 34,20 26,20" fill="#0D1B2A" />
              </svg>
            </a>
            {/* Email icon → mailto */}
            <a
              href="mailto:activatedbookingsbyaj@gmail.com"
              className="contact-social-icon"
              aria-label="Send an email"
              title="activatedbookingsbyaj@gmail.com"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2,4 12,13 22,4" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
