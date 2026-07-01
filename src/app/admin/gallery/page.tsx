'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const S = {
  bg:      '#0D1B2A',
  card:    '#162233',
  gold:    '#C8A951',
  plat:    '#E8F4FD',
  blue:    '#4A7FA5',
  border:  'rgba(232,244,253,0.1)',
  radius:  '6px',
} as const;

// ─── Shared helpers ───────────────────────────────────────────────────────────
function isVideo(src: string) { return /\.(mp4|mov|webm|ogg)$/i.test(src); }
// preload="metadata" alone doesn't guarantee a decoded frame in every browser
// (Firefox in particular can leave the tile blank) — an explicit poster
// guarantees the thumbnail always paints.
function posterFor(src: string) { return src.replace(/\.(mp4|mov|webm|ogg)$/i, '-poster.jpg'); }
function basename(src: string) { return src.split('/').pop() ?? src; }

// ─── Sub-tab bar ──────────────────────────────────────────────────────────────
function SubTabBar<T extends string>({ tabs, active, onChange }: { tabs: readonly T[]; active: T; onChange: (t: T) => void }) {
  return (
    <div style={{ display: 'flex', gap: 0, overflowX: 'auto', borderBottom: `1px solid ${S.border}`, marginBottom: '24px', scrollbarWidth: 'none' }}>
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: '8px 16px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
          textTransform: 'uppercase', background: 'transparent', border: 'none',
          borderBottom: active === t ? `2px solid ${S.gold}` : '2px solid transparent',
          color: active === t ? S.gold : S.blue,
          cursor: 'pointer', marginBottom: '-1px', whiteSpace: 'nowrap',
          transition: 'color 0.15s ease',
        }}>
          {t}
        </button>
      ))}
    </div>
  );
}

// ─── Flash message ────────────────────────────────────────────────────────────
function Flash({ msg }: { msg: { text: string; ok: boolean } | null }) {
  if (!msg) return null;
  return (
    <div style={{
      padding: '10px 16px', borderRadius: S.radius, marginBottom: '18px', fontSize: '13px',
      background: msg.ok ? 'rgba(200,169,81,0.1)' : 'rgba(239,68,68,0.1)',
      border: `1px solid ${msg.ok ? 'rgba(200,169,81,0.3)' : 'rgba(239,68,68,0.3)'}`,
      color: msg.ok ? S.gold : '#ef4444',
    }}>
      {msg.text}
    </div>
  );
}

// ─── Media tile card ──────────────────────────────────────────────────────────
interface TileCardProps {
  src: string;
  badge?: string;
  isDragging: boolean; isDragOver: boolean;
  onDelete: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
}
function TileCard({ src, badge, isDragging, isDragOver, onDelete, onDragStart, onDragOver: dov, onDrop, onDragEnd }: TileCardProps) {
  return (
    <div draggable onDragStart={onDragStart} onDragOver={dov} onDrop={onDrop} onDragEnd={onDragEnd}
      style={{
        background: S.card, borderRadius: S.radius, overflow: 'hidden',
        border: isDragOver ? `2px solid ${S.gold}` : `1px solid ${S.border}`,
        opacity: isDragging ? 0.35 : 1, cursor: 'grab',
        transition: 'opacity 0.15s ease, border-color 0.15s ease', userSelect: 'none',
      }}>
      {/* Thumbnail / placeholder */}
      <div style={{ height: '100px', position: 'relative', overflow: 'hidden', background: '#0a0f1a' }}>
        {isVideo(src) ? (
          <>
            {/* Real first-frame preview — preload="metadata" loads the frame, not the file */}
            <video
              src={src}
              muted
              playsInline
              preload="metadata"
              poster={posterFor(src)}
              className="w-full h-full object-cover"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            />
            {/* Gold play glyph over the frame */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,15,26,0.25)' }}>
              <svg width="16" height="18" viewBox="0 0 16 18" fill={S.gold} style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }}><polygon points="2,1 15,9 2,17" /></svg>
            </div>
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        {/* Sport badge — bottom right */}
        {badge && (
          <div style={{
            position: 'absolute', bottom: '5px', right: '5px',
            background: 'rgba(200,169,81,0.88)', borderRadius: '3px',
            padding: '2px 6px', fontSize: '8px', fontWeight: 700,
            color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.8px',
            zIndex: 2,
          }}>
            {badge}
          </div>
        )}
        {/* Drag handle */}
        <div aria-hidden style={{ position: 'absolute', top: '5px', left: '5px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', padding: '2px 5px', color: 'rgba(232,244,253,0.5)', fontSize: '12px', cursor: 'grab' }}>⠿</div>
        {/* Delete */}
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Delete"
          style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239,68,68,0.8)', border: 'none', borderRadius: '4px', width: '20px', height: '20px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
      </div>
      {/* Filename */}
      <div style={{ padding: '6px 8px', color: 'rgba(232,244,253,0.4)', fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{basename(src)}</div>
    </div>
  );
}

// ─── Reusable media grid section ──────────────────────────────────────────────
interface MediaGridProps {
  files: string[];
  loading: boolean;
  acceptExt: string;
  uploadLabel: string;
  badge?: string;
  onUpload: (files: File[]) => void;
  onDelete: (src: string) => void;
  onReorder: (newFiles: string[]) => void;
}
function MediaGrid({ files, loading, acceptExt, uploadLabel, badge, onUpload, onDelete, onReorder }: MediaGridProps) {
  const [dragIdx,  setDragIdx]  = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) { setDragIdx(null); setDragOver(null); return; }
    const next = [...files];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(targetIdx, 0, moved);
    setDragIdx(null); setDragOver(null);
    onReorder(next);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => fileRef.current?.click()} disabled={loading}
          style={{ background: S.blue, color: '#fff', border: 'none', borderRadius: S.radius, padding: '9px 18px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '7px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          {uploadLabel}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept={acceptExt}
          multiple
          onChange={(e) => {
            const fl = e.target.files;
            if (fl && fl.length > 0) {
              onUpload(Array.from(fl));
              if (fileRef.current) fileRef.current.value = '';
            }
          }}
          style={{ display: 'none' }}
        />
        <span style={{ color: 'rgba(232,244,253,0.28)', fontSize: '12px' }}>
          jpg · png · mp4 · mov — select multiple files at once
        </span>
      </div>

      {files.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', border: `1px dashed rgba(74,127,165,0.18)`, borderRadius: S.radius, color: 'rgba(232,244,253,0.25)', fontSize: '13px' }}>
          No media yet. Upload something above.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: '10px' }}>
          {files.map((src, i) => (
            <TileCard key={src} src={src} badge={badge}
              isDragging={dragIdx === i} isDragOver={dragOver === i}
              onDelete={() => onDelete(src)}
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => { setDragIdx(null); setDragOver(null); }}
            />
          ))}
        </div>
      )}
      {files.length > 0 && (
        <p style={{ color: 'rgba(232,244,253,0.2)', fontSize: '11px', textAlign: 'center', marginTop: '16px' }}>
          {files.length} item{files.length !== 1 ? 's' : ''} · Drag to reorder
        </p>
      )}
    </>
  );
}

// ─── PHOTOS TAB (accepts photos AND videos — videos become grid play tiles) ───
const PHOTO_SPORTS = ['Tennis', 'Padel', 'Pickleball', 'Beach Sports', 'Reflect Motion'] as const;
type PhotoSport = (typeof PHOTO_SPORTS)[number];
const PHOTO_KEY: Record<PhotoSport, string> = {
  Tennis: 'tennis', Padel: 'padel', Pickleball: 'pickleball', 'Beach Sports': 'beach', 'Reflect Motion': 'reflect',
};
const EMPTY_PHOTOS: Record<PhotoSport, string[]> = {
  Tennis: [], Padel: [], Pickleball: [], 'Beach Sports': [], 'Reflect Motion': [],
};

function PhotosTab() {
  const [sport,   setSport]   = useState<PhotoSport>('Tennis');
  const [order,   setOrder]   = useState<Record<PhotoSport, string[]>>(EMPTY_PHOTOS);
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then((d: { photos?: Record<string, string[]> }) => {
      if (d.photos) setOrder(prev => PHOTO_SPORTS.reduce((acc, s) => { acc[s] = d.photos![PHOTO_KEY[s]] ?? prev[s]; return acc; }, { ...prev }));
    }).catch(() => {});
  }, []);

  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(null), 3000); return () => clearTimeout(t); } }, [msg]);

  const files    = order[sport] ?? [];
  const sportKey = PHOTO_KEY[sport];

  const handleUpload = async (selected: File[]) => {
    const fd = new FormData();
    for (const f of selected) fd.append('files', f);
    fd.append('tab', sport);
    fd.append('mediaType', 'photo');

    setLoading(true); setMsg(null);
    try {
      const d = await (await fetch('/api/admin/gallery/upload', { method: 'POST', body: fd })).json() as { success?: boolean; srcs?: string[]; error?: string };
      if (d.success && d.srcs) {
        setOrder(p => ({ ...p, [sport]: [...p[sport], ...d.srcs!] }));
        setMsg({ text: `✓ Uploaded ${d.srcs.length} file${d.srcs.length !== 1 ? 's' : ''}.`, ok: true });
      } else setMsg({ text: d.error ?? 'Upload failed.', ok: false });
    } catch { setMsg({ text: 'Upload failed.', ok: false }); } finally { setLoading(false); }
  };

  const handleDelete = async (src: string) => {
    if (!confirm(`Delete "${basename(src)}"? This permanently removes the file.`)) return;
    setLoading(true); setMsg(null);
    try {
      const d = await (await fetch('/api/admin/gallery/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: src, sport: sportKey, mediaType: 'photo' }) })).json() as { success?: boolean };
      if (d.success) { setOrder(p => ({ ...p, [sport]: p[sport].filter(f => f !== src) })); setMsg({ text: '✓ Deleted.', ok: true }); }
    } catch { setMsg({ text: 'Delete failed.', ok: false }); } finally { setLoading(false); }
  };

  const handleReorder = async (newFiles: string[]) => {
    setOrder(p => ({ ...p, [sport]: newFiles }));
    try {
      await fetch('/api/admin/gallery/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mediaType: 'photo', sport: sportKey, order: newFiles }) });
      setMsg({ text: '✓ Order saved.', ok: true });
    } catch { setMsg({ text: 'Order save failed.', ok: false }); }
  };

  return (
    <>
      <Flash msg={msg} />
      <SubTabBar tabs={PHOTO_SPORTS} active={sport} onChange={s => { setSport(s); setMsg(null); }} />
      <div style={{ padding: '10px 14px', borderRadius: S.radius, marginBottom: '18px', background: 'rgba(74,127,165,0.08)', border: '1px solid rgba(74,127,165,0.18)', color: S.blue, fontSize: '13px', lineHeight: 1.5 }}>
        Photos and videos uploaded here appear in the {sport} grid on the site. Videos autoplay silently in the grid. The first item is the large hero tile.
      </div>
      <MediaGrid files={files} loading={loading} acceptExt="image/jpeg,image/jpg,image/png,video/mp4,video/quicktime" uploadLabel="UPLOAD MEDIA"
        onUpload={handleUpload} onDelete={handleDelete} onReorder={handleReorder} />
    </>
  );
}

// ─── VIDEOS TAB (stored for future use; not currently shown on the site) ─────
const VIDEO_SPORTS = ['General', 'Tennis', 'Padel', 'Pickleball', 'Beach Sports'] as const;
type VideoSport = (typeof VIDEO_SPORTS)[number];
const VIDEO_KEY: Record<VideoSport, string> = {
  General: 'general', Tennis: 'tennis', Padel: 'padel', Pickleball: 'pickleball', 'Beach Sports': 'beach',
};
const EMPTY_VIDEOS: Record<VideoSport, string[]> = {
  General: [], Tennis: [], Padel: [], Pickleball: [], 'Beach Sports': [],
};

function VideosTab() {
  const [sport,   setSport]   = useState<VideoSport>('General');
  const [order,   setOrder]   = useState<Record<VideoSport, string[]>>(EMPTY_VIDEOS);
  const [loading, setLoading] = useState(false);
  const [msg,     setMsg]     = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then((d: { videos?: Record<string, string[]> }) => {
      if (d.videos) setOrder(prev => VIDEO_SPORTS.reduce((acc, s) => { acc[s] = d.videos![VIDEO_KEY[s]] ?? prev[s]; return acc; }, { ...prev }));
    }).catch(() => {});
  }, []);

  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(null), 3000); return () => clearTimeout(t); } }, [msg]);

  const files    = order[sport] ?? [];
  const sportKey = VIDEO_KEY[sport];

  const handleUpload = async (selected: File[]) => {
    const fd = new FormData();
    for (const f of selected) fd.append('files', f);
    fd.append('tab', sport);
    fd.append('mediaType', 'video');

    setLoading(true); setMsg(null);
    try {
      const d = await (await fetch('/api/admin/gallery/upload', { method: 'POST', body: fd })).json() as { success?: boolean; srcs?: string[]; error?: string };
      if (d.success && d.srcs) {
        setOrder(p => ({ ...p, [sport]: [...p[sport], ...d.srcs!] }));
        setMsg({ text: `✓ Uploaded ${d.srcs.length} video${d.srcs.length !== 1 ? 's' : ''}.`, ok: true });
      } else setMsg({ text: d.error ?? 'Upload failed.', ok: false });
    } catch { setMsg({ text: 'Upload failed.', ok: false }); } finally { setLoading(false); }
  };

  const handleDelete = async (src: string) => {
    if (!confirm(`Delete "${basename(src)}"? This permanently removes the file.`)) return;
    setLoading(true); setMsg(null);
    try {
      const d = await (await fetch('/api/admin/gallery/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: src, sport: sportKey, mediaType: 'video' }) })).json() as { success?: boolean };
      if (d.success) { setOrder(p => ({ ...p, [sport]: p[sport].filter(f => f !== src) })); setMsg({ text: '✓ Deleted.', ok: true }); }
    } catch { setMsg({ text: 'Delete failed.', ok: false }); } finally { setLoading(false); }
  };

  const handleReorder = async (newFiles: string[]) => {
    setOrder(p => ({ ...p, [sport]: newFiles }));
    try {
      await fetch('/api/admin/gallery/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mediaType: 'video', sport: sportKey, order: newFiles }) });
      setMsg({ text: '✓ Order saved.', ok: true });
    } catch { setMsg({ text: 'Order save failed.', ok: false }); }
  };

  return (
    <>
      <Flash msg={msg} />
      <SubTabBar tabs={VIDEO_SPORTS} active={sport} onChange={s => { setSport(s); setMsg(null); }} />
      <div style={{ padding: '10px 14px', borderRadius: S.radius, marginBottom: '18px', background: 'rgba(74,127,165,0.08)', border: '1px solid rgba(74,127,165,0.18)', color: S.blue, fontSize: '13px', lineHeight: 1.5 }}>
        Videos stored here are kept for future use and don&apos;t currently display on the public site. To show a video inside a sport&apos;s photo grid, upload it via the Photos tab instead.
      </div>
      <MediaGrid files={files} loading={loading} acceptExt=".mp4,.mov" uploadLabel={`Upload to ${sport}`} badge={sport}
        onUpload={handleUpload} onDelete={handleDelete} onReorder={handleReorder} />
    </>
  );
}

// ─── REVIEWS TAB ──────────────────────────────────────────────────────────────
interface Review { id: string; name: string; email: string; sport: string; rating: number; message: string; submittedAt: string; }

function ReviewsTab() {
  const [reviews,  setReviews]  = useState<Review[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [acting,   setActing]   = useState<string | null>(null);
  const [msg,      setMsg]      = useState<{ text: string; ok: boolean } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setReviews(await (await fetch('/api/admin/reviews')).json()); } catch { setMsg({ text: 'Failed to load reviews.', ok: false }); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(null), 3000); return () => clearTimeout(t); } }, [msg]);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActing(id);
    try {
      const d = await (await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, action }) })).json() as { success?: boolean; error?: string };
      if (d.success) { setReviews(p => p.filter(r => r.id !== id)); setMsg({ text: action === 'approve' ? '✓ Approved and published.' : '✓ Rejected and removed.', ok: true }); }
      else setMsg({ text: d.error ?? 'Action failed.', ok: false });
    } catch { setMsg({ text: 'Network error.', ok: false }); } finally { setActing(null); }
  };

  const fmt = (iso: string) => new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Flash msg={msg} />
      {loading && <p style={{ color: 'rgba(232,244,253,0.35)', fontSize: '13px', textAlign: 'center', padding: '32px 0' }}>Loading…</p>}
      {!loading && reviews.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', border: `1px dashed rgba(74,127,165,0.18)`, borderRadius: S.radius, color: 'rgba(232,244,253,0.25)', fontSize: '14px' }}>
          No pending reviews. New submissions will appear here.
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reviews.map((r) => (
          <div key={r.id} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: S.radius, padding: '18px 20px', opacity: acting === r.id ? 0.5 : 1, transition: 'opacity 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <div>
                <span style={{ color: S.plat, fontWeight: 700, fontSize: '14px' }}>{r.name}</span>
                <span style={{ color: 'rgba(232,244,253,0.3)', fontSize: '12px', marginLeft: '10px' }}>{r.email}</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: S.blue, background: 'rgba(74,127,165,0.12)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(74,127,165,0.2)' }}>{r.sport}</span>
            </div>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.rating ? S.gold : 'rgba(74,127,165,0.25)', fontSize: '14px' }}>★</span>)}
              <span style={{ color: 'rgba(232,244,253,0.3)', fontSize: '11px', marginLeft: '8px', alignSelf: 'center' }}>{fmt(r.submittedAt)}</span>
            </div>
            <p style={{ color: 'rgba(232,244,253,0.65)', fontSize: '13px', lineHeight: 1.55, marginBottom: '14px' }}>&ldquo;{r.message}&rdquo;</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleAction(r.id, 'approve')} disabled={!!acting}
                style={{ background: S.blue, color: '#fff', border: 'none', borderRadius: S.radius, padding: '7px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', cursor: acting ? 'not-allowed' : 'pointer' }}>
                ✓ Approve
              </button>
              <button onClick={() => handleAction(r.id, 'reject')} disabled={!!acting}
                style={{ background: 'transparent', color: 'rgba(232,244,253,0.45)', border: `1px solid rgba(232,244,253,0.15)`, borderRadius: S.radius, padding: '7px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', cursor: acting ? 'not-allowed' : 'pointer' }}>
                ✕ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── TESTIMONIALS TAB ─────────────────────────────────────────────────────────
interface Testimonial { id: string; name: string; initials: string; service: string; filter: string; quote: string; rating: number; photo?: string; }

const SPORTS_LIST = ['Tennis', 'Padel', 'Pickleball', 'Beach Tennis', 'Fitness', 'Other'] as const;
const EMPTY_FORM = { name: '', sport: 'Tennis' as string, rating: 5, quote: '' };

function StarInput({ rating, onChange }: { rating: number; onChange: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '2px' }} onMouseLeave={() => setHover(0)}>
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button" onMouseEnter={() => setHover(s)} onClick={() => onChange(s)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '0 2px', color: s <= (hover || rating) ? S.gold : 'rgba(74,127,165,0.25)', transition: 'color 0.1s ease' }}>
          ★
        </button>
      ))}
    </div>
  );
}

function TestimonialsTab() {
  const [list,     setList]     = useState<Testimonial[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [saving,   setSaving]   = useState(false);
  const [msg,      setMsg]      = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/admin/testimonials').then(r => r.json()).then(d => setList(d)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(null), 3000); return () => clearTimeout(t); } }, [msg]);

  const openAdd = () => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setEditId(t.id);
    setForm({ name: t.name, sport: SPORTS_LIST.find(s => t.service.toLowerCase().includes(s.toLowerCase())) ?? 'Other', rating: t.rating, quote: t.quote });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const cancelForm = () => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setMsg(null);
    try {
      const method = editId ? 'PUT' : 'POST';
      const body   = editId ? { id: editId, ...form } : form;
      const d = await (await fetch('/api/admin/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json() as { success?: boolean; testimonial?: Testimonial; error?: string };
      if (d.success && d.testimonial) {
        if (editId) setList(p => p.map(t => t.id === editId ? d.testimonial! : t));
        else setList(p => [...p, d.testimonial!]);
        cancelForm(); setMsg({ text: editId ? '✓ Updated.' : '✓ Testimonial added.', ok: true });
      } else setMsg({ text: d.error ?? 'Save failed.', ok: false });
    } catch { setMsg({ text: 'Save failed.', ok: false }); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      const d = await (await fetch('/api/admin/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })).json() as { success?: boolean };
      if (d.success) { setList(p => p.filter(t => t.id !== id)); setMsg({ text: '✓ Deleted.', ok: true }); }
    } catch { setMsg({ text: 'Delete failed.', ok: false }); }
  };

  return (
    <>
      <Flash msg={msg} />

      {/* Add / Edit form */}
      {showForm ? (
        <div style={{ background: S.card, border: `1px solid rgba(200,169,81,0.25)`, borderRadius: S.radius, padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: S.gold, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>{editId ? 'Edit Testimonial' : 'Add Testimonial'}</p>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ color: 'rgba(232,244,253,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required maxLength={100} placeholder="Jane Smith"
                  style={{ width: '100%', background: S.bg, border: `1px solid rgba(232,244,253,0.15)`, borderRadius: S.radius, padding: '8px 12px', color: S.plat, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ color: 'rgba(232,244,253,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Sport *</label>
                <select value={form.sport} onChange={e => setForm(p => ({ ...p, sport: e.target.value }))}
                  style={{ width: '100%', background: S.bg, border: '1px solid rgba(232,244,253,0.15)', borderRadius: S.radius, padding: '8px 12px', color: S.plat, fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}>
                  {SPORTS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ color: 'rgba(232,244,253,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Rating *</label>
              <StarInput rating={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} />
            </div>
            <div>
              <label style={{ color: 'rgba(232,244,253,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Review *</label>
              <textarea value={form.quote} onChange={e => setForm(p => ({ ...p, quote: e.target.value }))} required rows={4} maxLength={2000}
                style={{ width: '100%', background: S.bg, border: '1px solid rgba(232,244,253,0.15)', borderRadius: S.radius, padding: '8px 12px', color: S.plat, fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={saving}
                style={{ background: S.blue, color: '#fff', border: 'none', borderRadius: S.radius, padding: '9px 20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving…' : editId ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={cancelForm}
                style={{ background: 'transparent', color: 'rgba(232,244,253,0.45)', border: `1px solid rgba(232,244,253,0.15)`, borderRadius: S.radius, padding: '9px 20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={openAdd}
          style={{ background: S.blue, color: '#fff', border: 'none', borderRadius: S.radius, padding: '9px 18px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '24px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Testimonial
        </button>
      )}

      {/* Testimonials list */}
      {loading && <p style={{ color: 'rgba(232,244,253,0.35)', fontSize: '13px', textAlign: 'center', padding: '32px 0' }}>Loading…</p>}
      {!loading && list.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', border: `1px dashed rgba(74,127,165,0.18)`, borderRadius: S.radius, color: 'rgba(232,244,253,0.25)', fontSize: '13px' }}>
          No testimonials yet.
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {list.map((t) => (
          <div key={t.id} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: S.radius, padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <span style={{ color: S.plat, fontWeight: 700, fontSize: '14px' }}>{t.name}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: S.blue, background: 'rgba(74,127,165,0.12)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(74,127,165,0.2)' }}>{t.service}</span>
                <div style={{ display: 'flex', gap: '1px' }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= t.rating ? S.gold : 'rgba(74,127,165,0.2)', fontSize: '12px' }}>★</span>)}</div>
              </div>
              <p style={{ color: 'rgba(232,244,253,0.55)', fontSize: '12px', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
              <button onClick={() => openEdit(t)}
                style={{ background: 'rgba(74,127,165,0.15)', border: '1px solid rgba(74,127,165,0.25)', color: S.blue, borderRadius: S.radius, padding: '5px 12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(t.id, t.name)}
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', borderRadius: S.radius, padding: '5px 12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {list.length > 0 && (
        <p style={{ color: 'rgba(232,244,253,0.2)', fontSize: '11px', textAlign: 'center', marginTop: '16px' }}>
          {list.length} testimonial{list.length !== 1 ? 's' : ''} · Changes reflect immediately on the public site
        </p>
      )}
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const MAIN_TABS = ['Photos', 'Reviews', 'Testimonials'] as const;
type MainTab = (typeof MAIN_TABS)[number];

export default function AdminGallery() {
  const [mainTab, setMainTab] = useState<MainTab>('Photos');

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 28px 80px' }}>

      {/* Page header */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: S.gold, fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 8px' }}>Admin</p>
        <h1 style={{ color: S.plat, fontSize: '28px', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Gallery Manager</h1>
        <p style={{ color: 'rgba(232,244,253,0.4)', fontSize: '13px', margin: 0 }}>Manage media, reviews, and testimonials.</p>
      </div>

      {/* Main tab bar */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid rgba(74,127,165,0.18)`, marginBottom: '32px' }}>
        {MAIN_TABS.map((t) => (
          <button key={t} onClick={() => setMainTab(t)} style={{
            padding: '11px 22px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', background: 'transparent', border: 'none',
            borderBottom: mainTab === t ? `2px solid ${S.gold}` : '2px solid transparent',
            color: mainTab === t ? S.gold : S.blue,
            cursor: 'pointer', marginBottom: '-2px', whiteSpace: 'nowrap',
            transition: 'color 0.15s ease',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {mainTab === 'Photos'       && <PhotosTab />}
      {mainTab === 'Reviews'      && <ReviewsTab />}
      {mainTab === 'Testimonials' && <TestimonialsTab />}
    </div>
  );
}
