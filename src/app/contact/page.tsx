'use client';

import { useState } from 'react';

const contactMethods = [
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+61 459 575 625',
    href: 'https://wa.me/61459575625',
    cta: 'Message AJ',
    color: 'var(--brand-gold)',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'activatedbookingsbyaj@gmail.com',
    href: 'mailto:activatedbookingsbyaj@gmail.com',
    cta: 'Send Email',
    color: 'var(--brand-blue-light)',
  },
  {
    icon: '📷',
    label: 'Instagram',
    value: '@activatedbyaj_',
    href: 'https://www.instagram.com/activatedbyaj_',
    cta: 'Follow AJ',
    color: 'var(--brand-gold)',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Willoughby, Sydney, Australia',
    href: null,
    cta: null,
    color: 'var(--brand-blue-light)',
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder — will integrate Resend/Supabase
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: 'var(--background)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-3xl pointer-events-none rounded-full"
          style={{ background: 'var(--brand-blue)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-blue-light)' }}>
            Get Started
          </p>
          <div className="gold-divider mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            LET&apos;S <span className="gold-text">ACTIVATE</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Ready to get moving? Reach out via the form below, WhatsApp, or email.
            AJ will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Methods */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-black text-white mb-8" style={{ letterSpacing: '-0.01em' }}>
                REACH OUT DIRECTLY
              </h2>
              {contactMethods.map((method) => (
                <div
                  key={method.label}
                  className="p-5 rounded-lg"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: method.color }}
                      >
                        {method.label}
                      </p>
                      <p className="text-white text-sm font-medium break-all">{method.value}</p>
                      {method.href && method.cta && (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-block mt-2 text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
                          style={{ color: method.color }}
                        >
                          {method.cta} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="p-5 rounded-lg mt-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(26,111,212,0.2) 0%, rgba(26,111,212,0.05) 100%)',
                  border: '1px solid rgba(26,111,212,0.25)',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand-blue-light)' }}>
                  Response Time
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  AJ typically responds within a few hours. For the fastest response,
                  WhatsApp is the best way to reach him.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-lg"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h2 className="text-xl font-black text-white mb-8" style={{ letterSpacing: '-0.01em' }}>
                    SEND A MESSAGE
                  </h2>
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
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+61 4XX XXX XXX"
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
                      style={{ resize: 'vertical' }}
                    />
                  </div>
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
                    In the meantime, feel free to WhatsApp directly for the fastest response.
                  </p>
                  <a
                    href="https://wa.me/61459575625"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold mt-8 inline-block"
                  >
                    Open WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
