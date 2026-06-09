'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

const TABS = ['Tennis', 'Padel', 'Beach Sports', 'Reflect Motion'] as const;
type Tab = (typeof TABS)[number];

type MediaTile = {
  src:      string;
  type:     'photo' | 'video';
  colSpan:  number;
  rowSpan:  number;
  colStart: number;
  rowStart: number;
  overlay?: string;
};

// ─── Layout templates (positions + overlays; no src) ─────────────────────────
// Drag-to-reorder in the admin changes WHICH file sits in each slot;
// the grid geometry and any overlays are always determined by position index.

const TEMPLATES: Record<Tab, Array<Omit<MediaTile, 'src' | 'type'>>> = {
  Tennis: [
    { colSpan: 5,  rowSpan: 2, colStart: 1,  rowStart: 1 },
    { colSpan: 4,  rowSpan: 1, colStart: 6,  rowStart: 1 },
    { colSpan: 3,  rowSpan: 1, colStart: 10, rowStart: 1 },
    { colSpan: 4,  rowSpan: 1, colStart: 6,  rowStart: 2 },
    { colSpan: 3,  rowSpan: 1, colStart: 10, rowStart: 2 },
    { colSpan: 12, rowSpan: 1, colStart: 1,  rowStart: 3 }, // video row
  ],
  Padel: [
    { colSpan: 5,  rowSpan: 2, colStart: 1,  rowStart: 1 },
    { colSpan: 4,  rowSpan: 1, colStart: 6,  rowStart: 1 },
    { colSpan: 3,  rowSpan: 1, colStart: 10, rowStart: 1 },
    { colSpan: 7,  rowSpan: 1, colStart: 6,  rowStart: 2 },
    { colSpan: 12, rowSpan: 1, colStart: 1,  rowStart: 3 }, // video row
  ],
  'Beach Sports': [
    { colSpan: 5,  rowSpan: 2, colStart: 1,  rowStart: 1 },
    { colSpan: 7,  rowSpan: 2, colStart: 6,  rowStart: 1 },
    { colSpan: 6,  rowSpan: 1, colStart: 1,  rowStart: 3 }, // video
    { colSpan: 6,  rowSpan: 1, colStart: 7,  rowStart: 3 }, // video
  ],
  'Reflect Motion': [
    { colSpan: 5,  rowSpan: 2, colStart: 1,  rowStart: 1, overlay: 'AI Analysis' },
    { colSpan: 4,  rowSpan: 1, colStart: 6,  rowStart: 1, overlay: 'Movement Tracking' },
    { colSpan: 3,  rowSpan: 1, colStart: 10, rowStart: 1 }, // video tile fits here
    { colSpan: 7,  rowSpan: 1, colStart: 6,  rowStart: 2, overlay: 'Real-Time Feedback' },
  ],
};

// ─── Default file order per tab ───────────────────────────────────────────────

const DEFAULT_ORDER: Record<Tab, string[]> = {
  Tennis:          ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg', '/gallery/video-3.mov'],
  Padel:           ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg',  '/gallery/video-2.mov'],
  'Beach Sports':  ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg',  '/gallery/video-4.mov',  '/gallery/video-5.mov'],
  'Reflect Motion':['/gallery/tennis-3.jpg', '/gallery/tennis-6.jpg', '/gallery/video-1.mp4',  '/gallery/tennis-4.jpg'],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isVideo(src: string): boolean {
  return /\.(mp4|mov|webm|ogg)$/i.test(src);
}

function buildTiles(tab: Tab, files: string[]): MediaTile[] {
  const template = TEMPLATES[tab];
  return template.slice(0, files.length).map((t, i) => ({
    ...t,
    src:  files[i],
    type: isVideo(files[i]) ? 'video' : 'photo',
  }));
}

// Default grids (rendered immediately; updated by gallery-order.json after mount)
const DEFAULT_GRIDS = (Object.keys(DEFAULT_ORDER) as Tab[]).reduce(
  (acc, t) => { acc[t] = buildTiles(t, DEFAULT_ORDER[t]); return acc; },
  {} as Record<Tab, MediaTile[]>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorldOfActivated() {
  const [grids,       setGrids]       = useState<Record<Tab, MediaTile[]>>(DEFAULT_GRIDS);
  const [tab,         setTab]         = useState<Tab>('Tennis');
  const [gridVisible, setGridVisible] = useState(true);
  const [lightbox,    setLightbox]    = useState<number | null>(null);

  // ── Read gallery-order.json (written by admin tool) ────────────────────────
  useEffect(() => {
    fetch('/gallery/gallery-order.json', { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((order: Record<string, string[]>) => {
        setGrids(
          (Object.keys(TEMPLATES) as Tab[]).reduce((acc, t) => {
            acc[t] = buildTiles(t, (order[t] ?? DEFAULT_ORDER[t]));
            return acc;
          }, {} as Record<Tab, MediaTile[]>)
        );
      })
      .catch(() => { /* gallery-order.json absent — keep defaults */ });
  }, []);

  const tiles   = grids[tab];
  const maxRow  = tiles.length > 0 ? Math.max(...tiles.map((t) => t.rowStart + t.rowSpan - 1)) : 2;

  // ── Tab switch: 200 ms crossfade ───────────────────────────────────────────
  const switchTab = (next: Tab) => {
    if (next === tab) return;
    setGridVisible(false);
    setTimeout(() => {
      setTab(next);
      setLightbox(null);
      setGridVisible(true);
    }, 200);
  };

  // ── Lightbox keyboard navigation ───────────────────────────────────────────
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     { setLightbox(null); return; }
      if (e.key === 'ArrowRight') setLightbox((n) => n !== null ? (n + 1) % tiles.length : 0);
      if (e.key === 'ArrowLeft')  setLightbox((n) => n !== null ? (n - 1 + tiles.length) % tiles.length : 0);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, tiles.length]);

  const activeTile = lightbox !== null ? tiles[lightbox] : null;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section style={{ background: '#0D1B2A', padding: '72px 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <p style={{
            color: '#C8A951',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '14px',
          }}>
            THE WORLD OF ACTIVATED
          </p>
          <h2 style={{
            color: '#E8F4FD',
            fontSize: '32px',
            fontWeight: 500,
            marginBottom: '20px',
            letterSpacing: '-0.01em',
          }}>
            Sport. Energy. Movement.
          </h2>
          {/* Steel blue — per spec */}
          <div style={{ width: '36px', height: '2px', background: '#4A7FA5', margin: '0 auto' }} />
        </div>

        {/* ── SPORT TABS ──────────────────────────────────────────────────── */}
        <div
          className="flex overflow-x-auto"
          style={{
            borderBottom: '1px solid rgba(74,127,165,0.2)',
            marginBottom: '12px',
            scrollbarWidth: 'none',
          }}
        >
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{
                padding: '10px 18px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: tab === t ? '#C8A951' : '#4A7FA5',
                border: 'none',
                borderBottom: tab === t ? '2px solid #C8A951' : '2px solid transparent',
                cursor: 'pointer',
                marginBottom: '-1px',
                transition: 'color 0.15s ease, border-color 0.15s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── MEDIA GRID (bento) ──────────────────────────────────────────── */}
        <div style={{ overflowX: 'auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: `repeat(${maxRow}, 190px)`,
              gap: '6px',
              minWidth: '560px',
              opacity: gridVisible ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            {tiles.map((tile, i) => (
              <div
                key={`${tab}-${i}`}
                className="group"
                onClick={() => setLightbox(i)}
                style={{
                  gridColumn:   `${tile.colStart} / span ${tile.colSpan}`,
                  gridRow:      `${tile.rowStart} / span ${tile.rowSpan}`,
                  position:     'relative',
                  overflow:     'hidden',
                  borderRadius: '4px',
                  cursor:       'pointer',
                  background:   tile.type === 'video' ? 'linear-gradient(135deg, #0a0f1a 0%, #0d1b2a 100%)' : undefined,
                }}
              >
                {tile.type === 'photo' ? (
                  /* ── Photo tile ── */
                  <Image
                    src={tile.src}
                    alt={tile.overlay ?? `${tab} — photo ${i + 1}`}
                    fill
                    sizes={`(max-width: 768px) 100vw, ${Math.round((tile.colSpan / 12) * 1152)}px`}
                    style={{ objectFit: 'cover', transition: 'transform 150ms ease' }}
                    className="group-hover:scale-[1.02]"
                  />
                ) : (
                  /* ── Video tile: dark bg + circular play button ── */
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className="group-hover:scale-110"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.92)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
                        transition: 'transform 150ms ease, box-shadow 150ms ease',
                        flexShrink: 0,
                      }}
                    >
                      {/* Gold triangle */}
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="#C8A951" aria-hidden="true">
                        <polygon points="2,1 15,9 2,17" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Overlay label (Reflect Motion + any overlay-tagged tile) */}
                {tile.overlay && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(13,27,42,0.50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{
                        color: '#C8A951',
                        fontSize: '12px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        textAlign: 'center',
                        padding: '0 10px',
                        lineHeight: 1.4,
                      }}
                    >
                      {tile.overlay}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      {lightbox !== null && activeTile !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Media lightbox"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13,27,42,0.95)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightbox(null)}
        >
          {/* ✕ Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)',
              color: '#E8F4FD', width: '40px', height: '40px', borderRadius: '50%',
              fontSize: '22px', lineHeight: '1', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3,
            }}
          >×</button>

          {/* ← Prev */}
          {tiles.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => n !== null ? (n - 1 + tiles.length) % tiles.length : 0);
              }}
              aria-label="Previous"
              style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)',
                color: '#E8F4FD', width: '44px', height: '44px', borderRadius: '50%',
                fontSize: '22px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3,
              }}
            >←</button>
          )}

          {/* Media */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {activeTile.type === 'video' ? (
              /* Video — key forces remount (and re-autoplay) on navigation */
              <video
                key={activeTile.src}
                autoPlay
                controls
                playsInline
                style={{
                  maxWidth: '90vw', maxHeight: '80vh',
                  borderRadius: '4px', display: 'block', background: '#000',
                }}
              >
                <source src={activeTile.src} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeTile.src}
                alt={activeTile.overlay ?? `${tab} ${lightbox + 1}`}
                style={{
                  maxWidth: '90vw', maxHeight: '80vh',
                  objectFit: 'contain', borderRadius: '4px', display: 'block',
                }}
              />
            )}
          </div>

          {/* → Next */}
          {tiles.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => n !== null ? (n + 1) % tiles.length : 0);
              }}
              aria-label="Next"
              style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)',
                color: '#E8F4FD', width: '44px', height: '44px', borderRadius: '50%',
                fontSize: '22px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3,
              }}
            >→</button>
          )}

          {/* Label */}
          <div
            style={{
              position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
              color: '#E8F4FD', fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.05em', whiteSpace: 'nowrap', zIndex: 3,
            }}
          >
            {tab}&nbsp;&nbsp;&nbsp;{lightbox + 1} / {tiles.length}
          </div>
        </div>
      )}
    </section>
  );
}
