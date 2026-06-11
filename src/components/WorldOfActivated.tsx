'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

const TABS = ['Tennis', 'Padel', 'Pickleball', 'Beach Sports', 'Reflect Motion'] as const;
type Tab = (typeof TABS)[number];

// Maps Tab label → gallery-order.json photos key
const TAB_KEY: Record<Tab, string> = {
  Tennis:          'tennis',
  Padel:           'padel',
  Pickleball:      'pickleball',
  'Beach Sports':  'beach',
  'Reflect Motion':'reflect',
};

// Fallbacks used only when gallery-order.json is missing or unreadable
const DEFAULT_PHOTOS: Record<string, string[]> = {
  tennis:     ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg'],
  padel:      ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg'],
  pickleball: [],
  beach:      ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg'],
  reflect:    [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isVideo(src: string): boolean {
  return /\.(mp4|mov|webm|ogg)$/i.test(src);
}

/**
 * gallery-order.json entries should be "/gallery/<file>" but tolerate bare
 * filenames ("tennis-1.jpg") and missing leading slashes so a hand-edited
 * file can never produce broken image paths.
 */
function normalizeSrc(entry: string): string {
  if (entry.startsWith('/gallery/')) return entry;
  if (entry.startsWith('gallery/'))  return `/${entry}`;
  if (entry.startsWith('/'))         return entry; // other absolute path — leave as-is
  return `/gallery/${entry}`;
}

/**
 * Dynamic bento layout — adapts to any item count:
 *   item 1      → hero: col-span 5, row-span 2 (tall left)
 *   items 2 & 3 → col-span 4 / col-span 3 on row 1
 *   items 4 & 5 → col-span 4 / col-span 3 on row 2
 *   items 6+    → col-span 4, single row, three per row
 */
type Slot = { colStart: number; colSpan: number; rowStart: number; rowSpan: number };

function layoutFor(count: number): Slot[] {
  const base: Slot[] = [
    { colStart: 1,  colSpan: 5, rowStart: 1, rowSpan: 2 },
    { colStart: 6,  colSpan: 4, rowStart: 1, rowSpan: 1 },
    { colStart: 10, colSpan: 3, rowStart: 1, rowSpan: 1 },
    { colStart: 6,  colSpan: 4, rowStart: 2, rowSpan: 1 },
    { colStart: 10, colSpan: 3, rowStart: 2, rowSpan: 1 },
  ];
  const slots = base.slice(0, Math.min(count, 5));
  for (let i = 5; i < count; i++) {
    const extra = i - 5;
    slots.push({
      colStart: 1 + (extra % 3) * 4,
      colSpan:  4,
      rowStart: 3 + Math.floor(extra / 3),
      rowSpan:  1,
    });
  }
  return slots;
}

// Track viewport for the single-column mobile layout
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorldOfActivated() {
  const [photos,      setPhotos]      = useState<Record<string, string[]>>(DEFAULT_PHOTOS);
  const [tab,         setTab]         = useState<Tab>('Tennis');
  const [gridVisible, setGridVisible] = useState(true);
  const [lightbox,    setLightbox]    = useState<number | null>(null);
  const isMobile = useIsMobile();

  // ── Load gallery-order.json (written by the admin tool) ────────────────────
  useEffect(() => {
    fetch('/gallery/gallery-order.json', { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((order: { photos?: Record<string, string[]> }) => {
        if (order.photos) {
          // Normalize every entry so bare filenames still resolve to /gallery/
          const normalized = Object.fromEntries(
            Object.entries(order.photos).map(([k, list]) => [k, (list ?? []).map(normalizeSrc)])
          );
          setPhotos({ ...DEFAULT_PHOTOS, ...normalized });
        }
      })
      .catch(() => { /* gallery-order.json absent — keep defaults */ });
  }, []);

  const files  = photos[TAB_KEY[tab]] ?? [];
  const slots  = layoutFor(files.length);
  const maxRow = slots.length > 0 ? Math.max(...slots.map((s) => s.rowStart + s.rowSpan - 1)) : 1;

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
      if (e.key === 'ArrowRight') setLightbox((n) => n !== null ? (n + 1) % files.length : 0);
      if (e.key === 'ArrowLeft')  setLightbox((n) => n !== null ? (n - 1 + files.length) % files.length : 0);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, files.length]);

  const activeSrc = lightbox !== null ? files[lightbox] : null;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section style={{ background: '#0D1B2A', padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="text-center mb-12" data-animate="fade-up">
          <p style={{
            color: '#4A7FA5',
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
            letterSpacing: '-0.01em',
          }}>
            Sport. Energy. Movement.
          </h2>
        </div>

        {/* Scroll-reveal wrapper — stable across tab/state changes */}
        <div data-animate="fade-up" data-animate-delay="120">

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
                border: 'none',
                borderBottom: tab === t ? '2px solid #C8A951' : '2px solid transparent',
                color: tab === t ? '#C8A951' : '#4A7FA5',
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

        {/* ── BENTO GRID or EMPTY STATE ───────────────────────────────────── */}
        {files.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            padding: '48px 24px',
            borderRadius: '8px',
            border: '1px solid rgba(74,127,165,0.15)',
          }}>
            <p style={{
              color: '#4A7FA5',
              fontStyle: 'italic',
              textAlign: 'center',
              fontSize: '15px',
              lineHeight: 1.6,
            }}>
              Coming soon — check back for {tab} content.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
              gridTemplateRows: isMobile ? `repeat(${files.length}, 200px)` : `repeat(${maxRow}, 190px)`,
              gap: '6px',
              opacity: gridVisible ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            {files.map((src, i) => {
              const slot  = slots[i];
              const video = isVideo(src);
              return (
                <div
                  key={`${tab}-${i}`}
                  className="group"
                  onClick={() => setLightbox(i)}
                  style={{
                    gridColumn: isMobile ? 'auto' : `${slot.colStart} / span ${slot.colSpan}`,
                    gridRow:    isMobile ? 'auto' : `${slot.rowStart} / span ${slot.rowSpan}`,
                    position:     'relative',
                    overflow:     'hidden',
                    borderRadius: '4px',
                    cursor:       'pointer',
                    border:       i === 0 ? '0.5px solid #C8A951' : undefined,
                    background:   video ? '#0a0f1a' : undefined,
                  }}
                >
                  {video ? (
                    <>
                      {/* Video tile — first frame as thumbnail */}
                      <video
                        muted
                        playsInline
                        preload="metadata"
                        src={src}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {/* Dark overlay + play button */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(13,27,42,0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                      }}>
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
                            transition: 'transform 150ms ease',
                            flexShrink: 0,
                          }}
                        >
                          <svg width="16" height="18" viewBox="0 0 16 18" fill="#C8A951" aria-hidden="true">
                            <polygon points="2,1 15,9 2,17" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Photo tile */}
                      <Image
                        src={src}
                        alt={`${tab} — photo ${i + 1}`}
                        fill
                        sizes={isMobile ? '100vw' : `${Math.round(((slot?.colSpan ?? 4) / 12) * 1152)}px`}
                        style={{ objectFit: 'cover', transition: 'transform 150ms ease' }}
                        className="group-hover:scale-[1.02]"
                      />
                      {/* Hover gradient + sport label */}
                      <div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to bottom, transparent 50%, rgba(13,27,42,0.4) 100%)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '12px 14px',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }}
                      >
                        <span style={{
                          color: '#E8F4FD',
                          fontSize: '11px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}>
                          {tab}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        </div> {/* end scroll-reveal wrapper */}

      </div>

      {/* ── LIGHTBOX (photos + videos) ──────────────────────────────────────── */}
      {lightbox !== null && activeSrc !== null && (
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
          {files.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => n !== null ? (n - 1 + files.length) % files.length : 0);
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
            {isVideo(activeSrc) ? (
              /* key forces remount (and re-autoplay) on navigation */
              <video
                key={activeSrc}
                autoPlay
                controls
                playsInline
                style={{
                  maxWidth: '90vw', maxHeight: '80vh',
                  borderRadius: '4px', display: 'block', background: '#000',
                }}
              >
                <source src={activeSrc} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeSrc}
                alt={`${tab} ${lightbox + 1}`}
                style={{
                  maxWidth: '90vw', maxHeight: '80vh',
                  objectFit: 'contain', borderRadius: '4px', display: 'block',
                }}
              />
            )}
          </div>

          {/* → Next */}
          {files.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => n !== null ? (n + 1) % files.length : 0);
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
            {tab}&nbsp;&nbsp;&nbsp;{lightbox + 1} / {files.length}
          </div>
        </div>
      )}
    </section>
  );
}
