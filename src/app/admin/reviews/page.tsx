'use client';

import { useEffect, useState, useCallback } from 'react';

interface Review {
  id: string;
  name: string;
  email: string;
  sport: string;
  rating: number;
  message: string;
  submittedAt: string;
}

function Stars({ count }: { count: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= count ? '#C8A951' : 'rgba(74,127,165,0.25)', fontSize: '1rem' }}>★</span>
      ))}
    </span>
  );
}

export default function AdminReviews() {
  const [reviews,  setReviews]  = useState<Review[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [acting,   setActing]   = useState<string | null>(null); // id of review being acted on
  const [message,  setMessage]  = useState('');

  const fetchPending = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      setReviews(await res.json());
    } catch {
      setMessage('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPending(); }, [fetchPending]);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActing(id);
    setMessage('');
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(action === 'approve' ? '✓ Review approved and published.' : '✓ Review rejected and removed.');
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        setMessage(data.error ?? 'Action failed.');
      }
    } catch {
      setMessage('Network error. Please try again.');
    } finally {
      setActing(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ background: '#0D1B2A', minHeight: '100vh', padding: '80px 0 60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#C8A951', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
            Admin
          </p>
          <h1 style={{ color: '#E8F4FD', fontSize: '36px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Pending Reviews
          </h1>
          <p style={{ color: 'rgba(232,244,253,0.5)', fontSize: '14px' }}>
            Approve reviews to publish them on the Testimonials page. Rejected reviews are permanently removed.
          </p>
        </div>

        {/* Flash message */}
        {message && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: message.startsWith('✓') ? 'rgba(200,169,81,0.12)' : 'rgba(239,68,68,0.12)',
            border: `1px solid ${message.startsWith('✓') ? 'rgba(200,169,81,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: message.startsWith('✓') ? '#C8A951' : '#ef4444',
            fontSize: '14px',
          }}>
            {message}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p style={{ color: 'rgba(232,244,253,0.4)', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>
            Loading pending reviews…
          </p>
        )}

        {/* Empty */}
        {!loading && reviews.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            borderRadius: '12px',
            background: '#111',
            border: '1px solid #2a2a2a',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚡</div>
            <p style={{ color: '#E8F4FD', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
              No pending reviews
            </p>
            <p style={{ color: 'rgba(232,244,253,0.4)', fontSize: '13px' }}>
              New submissions will appear here for moderation.
            </p>
          </div>
        )}

        {/* Review cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reviews.map((r) => (
            <div
              key={r.id}
              style={{
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '24px',
                opacity: acting === r.id ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <span style={{ color: '#E8F4FD', fontWeight: 700, fontSize: '15px' }}>{r.name}</span>
                  <span style={{ color: 'rgba(232,244,253,0.35)', fontSize: '13px', marginLeft: '10px' }}>{r.email}</span>
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                  color: '#4A7FA5', background: 'rgba(74,127,165,0.12)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(74,127,165,0.25)',
                }}>
                  {r.sport}
                </span>
              </div>

              {/* Stars + date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Stars count={r.rating} />
                <span style={{ color: 'rgba(232,244,253,0.3)', fontSize: '12px' }}>
                  {formatDate(r.submittedAt)}
                </span>
              </div>

              {/* Message */}
              <p style={{ color: 'rgba(232,244,253,0.7)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                &ldquo;{r.message}&rdquo;
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleAction(r.id, 'approve')}
                  disabled={acting === r.id}
                  style={{
                    background: '#4A7FA5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: acting === r.id ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleAction(r.id, 'reject')}
                  disabled={acting === r.id}
                  style={{
                    background: 'transparent',
                    color: 'rgba(232,244,253,0.5)',
                    border: '1px solid rgba(232,244,253,0.18)',
                    borderRadius: '6px',
                    padding: '8px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: acting === r.id ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && reviews.length > 0 && (
          <p style={{ color: 'rgba(232,244,253,0.25)', fontSize: '12px', textAlign: 'center', marginTop: '32px' }}>
            {reviews.length} pending review{reviews.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
