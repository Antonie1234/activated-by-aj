'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS = ['Tennis', 'Padel', 'Pickleball', 'Beach Sports', 'Reflect Motion'] as const;
type Tab = (typeof TABS)[number];

const DEFAULT_ORDER: Record<Tab, string[]> = {
  Tennis:          ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg', '/gallery/video-3.mov'],
  Padel:           ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg',  '/gallery/video-2.mov'],
  Pickleball:      [],
  'Beach Sports':  ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg',  '/gallery/video-4.mov',  '/gallery/video-5.mov'],
  'Reflect Motion': [], // managed entirely via admin uploads
};

const CORRECT_PASSWORD = 'activated2026';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isVideo(src: string): boolean {
  return /\.(mp4|mov|webm|ogg)$/i.test(src);
}

function basename(src: string): string {
  return src.split('/').pop() ?? src;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MediaThumb({ src }: { src: string }) {
  if (isVideo(src)) {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #0a0f1a, #0d1b2a)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '6px',
      }}>
        <svg width="20" height="22" viewBox="0 0 16 18" fill="#C8A951" aria-hidden="true">
          <polygon points="2,1 15,9 2,17" />
        </svg>
        <span style={{ color: 'rgba(232,244,253,0.45)', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center', padding: '0 4px', wordBreak: 'break-all' }}>
          {basename(src)}
        </span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
}

// ─── Password gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw]   = useState('');
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === CORRECT_PASSWORD) {
      onAuth();
    } else {
      setErr('Incorrect password.');
      setPw('');
    }
  };

  return (
    <div style={{
      background: '#0D1B2A', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{
        background: '#111', border: '1px solid #2a2a2a',
        borderRadius: '16px', padding: '40px 48px', maxWidth: '380px', width: '100%',
      }}>
        <p style={{ color: '#C8A951', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
          Admin
        </p>
        <h1 style={{ color: '#E8F4FD', fontSize: '28px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '24px' }}>
          Gallery Admin
        </h1>
        <form onSubmit={submit}>
          <label style={{ color: 'rgba(232,244,253,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(''); }}
            placeholder="Enter password"
            autoFocus
            style={{
              width: '100%', background: '#1a1a1a', border: `1px solid ${err ? '#ef4444' : '#3a3a3a'}`,
              borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none',
              marginBottom: '8px',
            }}
          />
          {err && <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>{err}</p>}
          <button
            type="submit"
            style={{
              width: '100%', background: '#4A7FA5', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
              marginTop: err ? 0 : '4px',
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminGallery() {
  const [authed,      setAuthed]      = useState(false);
  const [tab,         setTab]         = useState<Tab>('Tennis');
  const [order,       setOrder]       = useState<Record<Tab, string[]>>(DEFAULT_ORDER);
  const [loading,     setLoading]     = useState(false);
  const [message,     setMessage]     = useState('');
  const [dragIdx,     setDragIdx]     = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current order after auth
  useEffect(() => {
    if (!authed) return;
    fetch('/api/admin/gallery')
      .then((r) => r.json())
      .then((data: Record<string, string[]>) =>
        setOrder({ ...DEFAULT_ORDER, ...(data as Record<Tab, string[]>) })
      )
      .catch(() => {});
  }, [authed]);

  const files = order[tab] ?? [];

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (src: string) => {
    if (!confirm(`Delete ${basename(src)}?`)) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(
        `/api/admin/gallery?file=${encodeURIComponent(src)}&tab=${encodeURIComponent(tab)}`,
        { method: 'DELETE' }
      );
      if ((await res.json()).success) {
        setOrder((prev) => ({ ...prev, [tab]: prev[tab].filter((f) => f !== src) }));
        setMessage('✓ Deleted.');
      }
    } catch {
      setMessage('Delete failed — please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Upload ──────────────────────────────────────────────────────────────────
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    fd.append('tab', tab);

    setLoading(true);
    setMessage('Uploading…');
    try {
      const res  = await fetch('/api/admin/gallery', { method: 'POST', body: fd });
      const data = await res.json() as { success?: boolean; src?: string; error?: string };
      if (data.success && data.src) {
        setOrder((prev) => ({ ...prev, [tab]: [...prev[tab], data.src!] }));
        setMessage('✓ Uploaded successfully.');
      } else {
        setMessage(data.error ?? 'Upload failed.');
      }
    } catch {
      setMessage('Upload failed — please try again.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ── Drag to reorder ─────────────────────────────────────────────────────────
  const handleDragStart = (i: number) => setDragIdx(i);

  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    setDragOverIdx(i);
  };

  const handleDrop = async (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }

    const newOrder = [...files];
    const [moved]  = newOrder.splice(dragIdx, 1);
    newOrder.splice(targetIdx, 0, moved);

    setOrder((prev) => ({ ...prev, [tab]: newOrder }));
    setDragIdx(null);
    setDragOverIdx(null);

    try {
      await fetch('/api/admin/gallery/order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ tab, order: newOrder }),
      });
      setMessage('✓ Order saved.');
    } catch {
      setMessage('Failed to save order.');
    }
  };

  const handleDragEnd = () => {
    setDragIdx(null);
    setDragOverIdx(null);
  };

  // ─────────────────────────────────────────────────────────────────────────

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div style={{ background: '#0D1B2A', minHeight: '100vh', padding: '80px 0 60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <p style={{ color: '#C8A951', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
            Admin
          </p>
          <h1 style={{ color: '#E8F4FD', fontSize: '36px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Gallery Manager
          </h1>
          <p style={{ color: 'rgba(232,244,253,0.45)', fontSize: '13px' }}>
            Upload, delete, or drag to reorder media per tab. Changes are reflected on the site immediately.
          </p>
        </div>

        {/* Flash message */}
        {message && (
          <div style={{
            padding: '10px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px',
            background: message.startsWith('✓') ? 'rgba(200,169,81,0.10)' : 'rgba(239,68,68,0.10)',
            border: `1px solid ${message.startsWith('✓') ? 'rgba(200,169,81,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: message.startsWith('✓') ? '#C8A951' : '#ef4444',
          }}>
            {message}
          </div>
        )}

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(74,127,165,0.2)', marginBottom: '28px' }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setMessage(''); }}
              style={{
                padding: '10px 18px', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                background: 'transparent', border: 'none',
                borderBottom: tab === t ? '2px solid #C8A951' : '2px solid transparent',
                color: tab === t ? '#C8A951' : '#4A7FA5',
                cursor: 'pointer', marginBottom: '-1px',
                transition: 'color 0.15s ease', whiteSpace: 'nowrap',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pickleball / Reflect Motion info note */}
        {(tab === 'Pickleball' || tab === 'Reflect Motion') && (
          <div style={{
            padding: '14px 18px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: 'rgba(74,127,165,0.08)',
            border: '1px solid rgba(74,127,165,0.25)',
            color: '#4A7FA5',
            fontSize: '13px',
            lineHeight: 1.55,
          }}>
            {tab === 'Pickleball'
              ? 'Upload your Pickleball photos and videos here — they will appear on the site automatically.'
              : 'Upload your Reflect Motion photos and videos here — they will appear on the site automatically.'}
          </div>
        )}

        {/* Upload button */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            style={{
              background: '#4A7FA5', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '9px 20px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em',
              textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Upload to {tab}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.mp4,.mov"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
          <span style={{ color: 'rgba(232,244,253,0.3)', fontSize: '12px' }}>
            Accepted: jpg, jpeg, png, mp4, mov
          </span>
        </div>

        {/* File grid */}
        {files.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px', borderRadius: '12px',
            background: '#111', border: '1px solid #2a2a2a',
          }}>
            <p style={{ color: 'rgba(232,244,253,0.4)', fontSize: '14px' }}>
              No media in this tab yet. Upload something above.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '10px',
          }}>
            {files.map((src, i) => (
              <div
                key={src}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={() => handleDrop(i)}
                onDragEnd={handleDragEnd}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: dragOverIdx === i
                    ? '2px solid #C8A951'
                    : dragIdx === i
                    ? '2px solid rgba(200,169,81,0.35)'
                    : '1px solid #2a2a2a',
                  opacity: dragIdx === i ? 0.5 : 1,
                  background: '#111',
                  cursor: 'grab',
                  transition: 'border-color 0.1s ease, opacity 0.1s ease',
                  position: 'relative',
                }}
              >
                {/* Thumbnail */}
                <div style={{ height: '110px', position: 'relative', overflow: 'hidden' }}>
                  <MediaThumb src={src} />
                </div>

                {/* Footer: filename + delete */}
                <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{
                    color: 'rgba(232,244,253,0.5)', fontSize: '10px',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1,
                  }}>
                    {basename(src)}
                  </span>
                  <button
                    onClick={() => handleDelete(src)}
                    disabled={loading}
                    aria-label={`Delete ${basename(src)}`}
                    style={{
                      background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                      color: '#ef4444', borderRadius: '4px', width: '24px', height: '24px',
                      cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'background 0.15s ease',
                    }}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>

                {/* Drag handle indicator */}
                <div
                  style={{
                    position: 'absolute', top: '6px', left: '6px',
                    display: 'flex', flexDirection: 'column', gap: '3px',
                    padding: '4px', background: 'rgba(0,0,0,0.55)', borderRadius: '4px',
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                >
                  {[0,1,2].map((row) => (
                    <div key={row} style={{ display: 'flex', gap: '3px' }}>
                      {[0,1].map((col) => (
                        <div key={col} style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#E8F4FD' }} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Video badge */}
                {isVideo(src) && (
                  <div style={{
                    position: 'absolute', top: '6px', right: '6px',
                    background: 'rgba(200,169,81,0.85)', borderRadius: '3px',
                    padding: '2px 5px', fontSize: '9px', fontWeight: 700,
                    letterSpacing: '1px', color: '#0a0a0a', textTransform: 'uppercase',
                  }}>
                    Video
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p style={{ color: 'rgba(232,244,253,0.2)', fontSize: '11px', textAlign: 'center', marginTop: '28px' }}>
          {files.length} item{files.length !== 1 ? 's' : ''} in {tab} · Drag tiles to reorder
        </p>

      </div>
    </div>
  );
}
