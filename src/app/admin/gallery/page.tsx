'use client';

import { useState, useEffect, useRef } from 'react';

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

// ─── Constants ────────────────────────────────────────────────────────────────
const TABS = ['Tennis', 'Padel', 'Pickleball', 'Beach Sports', 'Reflect Motion'] as const;
type Tab = (typeof TABS)[number];

const DEFAULT_ORDER: Record<Tab, string[]> = {
  Tennis:          ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg', '/gallery/video-3.mov'],
  Padel:           ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg',  '/gallery/video-2.mov'],
  Pickleball:      [],
  'Beach Sports':  ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg',  '/gallery/video-4.mov',  '/gallery/video-5.mov'],
  'Reflect Motion':[],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isVideo(src: string): boolean {
  return /\.(mp4|mov|webm|ogg)$/i.test(src);
}
function basename(src: string): string {
  return src.split('/').pop() ?? src;
}

// ─── Media tile ───────────────────────────────────────────────────────────────
interface TileProps {
  src:           string;
  isDragging:    boolean;
  isDragOver:    boolean;
  onDelete:      () => void;
  onDragStart:   () => void;
  onDragOver:    (e: React.DragEvent) => void;
  onDrop:        () => void;
  onDragEnd:     () => void;
}

function MediaTile({
  src, isDragging, isDragOver,
  onDelete, onDragStart, onDragOver: handleDragOver, onDrop, onDragEnd,
}: TileProps) {
  const video = isVideo(src);
  const name  = basename(src);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      style={{
        background: S.card,
        border: isDragOver
          ? `2px solid ${S.gold}`
          : `1px solid ${S.border}`,
        borderRadius: S.radius,
        overflow: 'hidden',
        opacity: isDragging ? 0.35 : 1,
        cursor: 'grab',
        transition: 'opacity 0.15s ease, border-color 0.15s ease',
        userSelect: 'none',
      }}
    >
      {/* ── Thumbnail ── */}
      <div style={{ height: '108px', position: 'relative', overflow: 'hidden', background: '#0a0f1a' }}>
        {video ? (
          /* Video placeholder */
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '7px',
          }}>
            <svg width="18" height="20" viewBox="0 0 16 18" fill={S.gold} aria-hidden="true">
              <polygon points="2,1 15,9 2,17" />
            </svg>
          </div>
        ) : (
          /* Photo thumbnail */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}

        {/* Drag handle — top left */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '6px', left: '6px',
            background: 'rgba(0,0,0,0.5)', borderRadius: '4px',
            padding: '3px 5px', color: 'rgba(232,244,253,0.55)',
            fontSize: '13px', lineHeight: 1, cursor: 'grab',
          }}
          title="Drag to reorder"
        >
          ⠿
        </div>

        {/* Delete — top right */}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          aria-label={`Delete ${name}`}
          style={{
            position: 'absolute', top: '6px', right: '6px',
            background: 'rgba(239,68,68,0.82)', border: 'none',
            borderRadius: '4px', width: '22px', height: '22px',
            color: '#fff', fontSize: '15px', fontWeight: 700,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Video badge — bottom right */}
        {video && (
          <div style={{
            position: 'absolute', bottom: '6px', right: '6px',
            background: 'rgba(200,169,81,0.88)', borderRadius: '3px',
            padding: '2px 6px', fontSize: '9px', fontWeight: 700,
            color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.8px',
          }}>
            Video
          </div>
        )}
      </div>

      {/* ── Filename ── */}
      <div style={{
        padding: '8px 10px',
        color: 'rgba(232,244,253,0.45)', fontSize: '11px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {name}
      </div>
    </div>
  );
}

// ─── Gallery Manager ──────────────────────────────────────────────────────────
export default function GalleryManager() {
  const [activeTab,   setActiveTab]   = useState<Tab>('Tennis');
  const [order,       setOrder]       = useState<Record<Tab, string[]>>(DEFAULT_ORDER);
  const [loading,     setLoading]     = useState(false);
  const [msg,         setMsg]         = useState<{ text: string; ok: boolean } | null>(null);
  const [dragIdx,     setDragIdx]     = useState<number | null>(null);
  const [dragOver,    setDragOver]    = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Fetch current order on mount
  useEffect(() => {
    fetch('/api/admin/gallery')
      .then((r) => r.json())
      .then((data: Record<string, string[]>) => {
        setOrder({ ...DEFAULT_ORDER, ...(data as Record<Tab, string[]>) });
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  const files = order[activeTab] ?? [];
  const isEmptyDefault = activeTab === 'Pickleball' || activeTab === 'Reflect Motion';

  // Flash message — auto-dismiss after 3 s
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 3000);
    return () => clearTimeout(t);
  }, [msg]);

  // ── Tab switch ─────────────────────────────────────────────────────────────
  const switchTab = (t: Tab) => {
    setActiveTab(t);
    setDragIdx(null);
    setDragOver(null);
    setMsg(null);
  };

  // ── Upload ─────────────────────────────────────────────────────────────────
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    fd.append('tab', activeTab);

    setLoading(true);
    setMsg(null);
    try {
      const res  = await fetch('/api/admin/gallery/upload', { method: 'POST', body: fd });
      const data = await res.json() as { success?: boolean; src?: string; error?: string };
      if (data.success && data.src) {
        setOrder((prev) => ({ ...prev, [activeTab]: [...prev[activeTab], data.src!] }));
        setMsg({ text: '✓ Uploaded successfully.', ok: true });
      } else {
        setMsg({ text: data.error ?? 'Upload failed.', ok: false });
      }
    } catch {
      setMsg({ text: 'Upload failed — check your connection.', ok: false });
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (src: string) => {
    if (!confirm(`Delete "${basename(src)}"? This cannot be undone.`)) return;
    setLoading(true);
    setMsg(null);
    try {
      const res  = await fetch('/api/admin/gallery/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: src, tab: activeTab }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (data.success) {
        setOrder((prev) => ({ ...prev, [activeTab]: prev[activeTab].filter((f) => f !== src) }));
        setMsg({ text: '✓ Deleted.', ok: true });
      } else {
        setMsg({ text: data.error ?? 'Delete failed.', ok: false });
      }
    } catch {
      setMsg({ text: 'Delete failed.', ok: false });
    } finally {
      setLoading(false);
    }
  };

  // ── Drag-to-reorder ────────────────────────────────────────────────────────
  const handleDrop = async (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) {
      setDragIdx(null);
      setDragOver(null);
      return;
    }

    const next = [...files];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(targetIdx, 0, moved);

    setOrder((prev) => ({ ...prev, [activeTab]: next }));
    setDragIdx(null);
    setDragOver(null);

    try {
      const res  = await fetch('/api/admin/gallery/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tab: activeTab, order: next }),
      });
      const data = await res.json() as { success?: boolean };
      setMsg(data.success
        ? { text: '✓ Order saved.', ok: true }
        : { text: 'Order save failed.', ok: false }
      );
    } catch {
      setMsg({ text: 'Order save failed.', ok: false });
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '44px 28px 80px' }}>

      {/* Page heading */}
      <div style={{ marginBottom: '36px' }}>
        <p style={{
          color: S.gold, fontSize: '11px', fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 10px',
        }}>
          Admin
        </p>
        <h1 style={{
          color: S.platinum, fontSize: '30px', fontWeight: 900,
          letterSpacing: '-0.02em', margin: '0 0 6px',
        }}>
          Gallery Manager
        </h1>
        <p style={{ color: 'rgba(232,244,253,0.4)', fontSize: '13px', margin: 0 }}>
          Upload, reorder, and manage media for each sport tab on the public site.
        </p>
      </div>

      {/* Flash message */}
      {msg && (
        <div style={{
          padding: '10px 16px', borderRadius: S.radius, marginBottom: '20px', fontSize: '13px',
          background: msg.ok ? 'rgba(200,169,81,0.10)' : 'rgba(239,68,68,0.10)',
          border:     `1px solid ${msg.ok ? 'rgba(200,169,81,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color:      msg.ok ? S.gold : '#ef4444',
        }}>
          {msg.text}
        </div>
      )}

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 0, overflowX: 'auto',
        borderBottom: `1px solid rgba(74,127,165,0.18)`,
        marginBottom: '28px', scrollbarWidth: 'none',
      }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => switchTab(t)}
            style={{
              padding: '10px 20px', fontSize: '12px',
              fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
              background: 'transparent', border: 'none',
              borderBottom: activeTab === t ? `2px solid ${S.gold}` : '2px solid transparent',
              color: activeTab === t ? S.gold : S.blue,
              cursor: 'pointer', marginBottom: '-1px',
              transition: 'color 0.15s ease', whiteSpace: 'nowrap',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Info note for empty-default tabs */}
      {isEmptyDefault && (
        <div style={{
          padding: '12px 16px', borderRadius: S.radius, marginBottom: '20px',
          background: 'rgba(74,127,165,0.08)', border: '1px solid rgba(74,127,165,0.18)',
          color: S.blue, fontSize: '13px', lineHeight: 1.5,
        }}>
          Upload your {activeTab} photos and videos here — they will appear on the site automatically.
        </div>
      )}

      {/* Upload row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          style={{
            background: S.blue, color: '#fff', border: 'none',
            borderRadius: S.radius, padding: '9px 20px',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5"  y1="12" x2="19" y2="12" />
          </svg>
          Upload to {activeTab}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,.mp4,.mov"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <span style={{ color: 'rgba(232,244,253,0.28)', fontSize: '12px' }}>
          Accepted: jpg · jpeg · png · mp4 · mov
        </span>
      </div>

      {/* Media grid */}
      {files.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '52px 24px',
          border: `1px dashed rgba(74,127,165,0.18)`, borderRadius: S.radius,
          color: 'rgba(232,244,253,0.25)', fontSize: '14px',
        }}>
          No media yet. Upload something above.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(158px, 1fr))',
          gap: '10px',
        }}>
          {files.map((src, i) => (
            <MediaTile
              key={src}
              src={src}
              isDragging={dragIdx === i}
              isDragOver={dragOver === i}
              onDelete={() => handleDelete(src)}
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => { setDragIdx(null); setDragOver(null); }}
            />
          ))}
        </div>
      )}

      {/* Item count */}
      {files.length > 0 && (
        <p style={{
          color: 'rgba(232,244,253,0.2)', fontSize: '12px',
          textAlign: 'center', marginTop: '24px', marginBottom: 0,
        }}>
          {files.length} item{files.length !== 1 ? 's' : ''} in {activeTab} · Drag to reorder
        </p>
      )}
    </div>
  );
}
