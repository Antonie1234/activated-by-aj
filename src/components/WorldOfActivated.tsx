'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

// ─── Data ────────────────────────────────────────────────────────────────────

const VIDEOS = [
  '/gallery/video-1.mp4',
  '/gallery/video-2.mov',
  '/gallery/video-3.mov',
  '/gallery/video-4.mov',
  '/gallery/video-5.mov',
  '/gallery/video-6.mov',
] as const;

const TABS = ['Tennis', 'Padel', 'Beach Sports', 'Reflect Motion'] as const;
type Tab = (typeof TABS)[number];

type Tile = {
  src: string;
  colSpan: number;
  rowSpan: number;
  colStart: number;
  rowStart: number;
  overlay?: string;
};

const GRIDS: Record<Tab, Tile[]> = {
  Tennis: [
    { src: '/gallery/tennis-4.jpg', colSpan: 5, rowSpan: 2, colStart: 1, rowStart: 1 },
    { src: '/gallery/tennis-1.jpg', colSpan: 4, rowSpan: 1, colStart: 6, rowStart: 1 },
    { src: '/gallery/tennis-3.jpg', colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 1 },
    { src: '/gallery/tennis-2.jpg', colSpan: 4, rowSpan: 1, colStart: 6, rowStart: 2 },
    { src: '/gallery/tennis-5.jpg', colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 2 },
  ],
  Padel: [
    { src: '/gallery/padel-3.jpg',  colSpan: 5, rowSpan: 2, colStart: 1,  rowStart: 1 },
    { src: '/gallery/padel-1.jpg',  colSpan: 4, rowSpan: 1, colStart: 6,  rowStart: 1 },
    { src: '/gallery/padel-2.jpg',  colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 1 },
    { src: '/gallery/padel-4.jpg',  colSpan: 7, rowSpan: 1, colStart: 6,  rowStart: 2 },
  ],
  'Beach Sports': [
    { src: '/gallery/beach-2.jpg', colSpan: 5, rowSpan: 2, colStart: 1, rowStart: 1 },
    { src: '/gallery/beach-1.jpg', colSpan: 7, rowSpan: 2, colStart: 6, rowStart: 1 },
  ],
  'Reflect Motion': [
    { src: '/gallery/tennis-3.jpg', colSpan: 5, rowSpan: 2, colStart: 1,  rowStart: 1, overlay: 'AI Analysis' },
    { src: '/gallery/tennis-6.jpg', colSpan: 4, rowSpan: 1, colStart: 6,  rowStart: 1, overlay: 'Movement Tracking' },
    { src: '/gallery/tennis-4.jpg', colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 1, overlay: 'Real-Time Feedback' },
    { src: '/gallery/tennis-2.jpg', colSpan: 7, rowSpan: 1, colStart: 6,  rowStart: 2, overlay: 'Performance Intelligence' },
  ],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function WorldOfActivated() {
  const [tab, setTab]               = useState<Tab>('Tennis');
  const [gridVisible, setGridVisible] = useState(true);
  const [videoIdx, setVideoIdx]     = useState(0);
  const [lightbox, setLightbox]     = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Video: imperative src control so React doesn't interfere with playback ──
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = VIDEOS[videoIdx];
    v.load();
    v.play().catch(() => {/* autoplay may be blocked; silently ignore */});
  }, [videoIdx]);

  const handleVideoEnd = useCallback(() => {
    setVideoIdx((i) => (i + 1) % VIDEOS.length);
  }, []);

  // ── Tab switch: 200 ms fade out → swap → fade in ──────────────────────────
  const switchTab = (next: Tab) => {
    if (next === tab) return;
    setGridVisible(false);
    setTimeout(() => {
      setTab(next);
      setLightbox(null);
      setGridVisible(true);
    }, 200);
  };

  // ── Lightbox keyboard navigation ──────────────────────────────────────────
  const tiles = GRIDS[tab];

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
          <div style={{ width: '36px', height: '2px', background: '#C8A951', margin: '0 auto' }} />
        </div>

        {/* ── VIDEO REEL ──────────────────────────────────────────────────── */}
        <div
          className="relative mb-10"
          style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '16 / 9' }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Progress dots */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
          }}>
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setVideoIdx(i)}
                aria-label={`Play clip ${i + 1}`}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i === videoIdx ? '#C8A951' : 'rgba(74,127,165,0.4)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'background 0.25s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
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

        {/* ── PHOTO GRID (bento) ──────────────────────────────────────────── */}
        <div style={{ overflowX: 'auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: 'repeat(2, 190px)',
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
                  gridColumn: `${tile.colStart} / span ${tile.colSpan}`,
                  gridRow: `${tile.rowStart} / span ${tile.rowSpan}`,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 0,
                }}
              >
                <Image
                  src={tile.src}
                  alt={tile.overlay ?? `${tab} — photo ${i + 1}`}
                  fill
                  sizes={`(max-width: 768px) 100vw, ${Math.round((tile.colSpan / 12) * 1152)}px`}
                  style={{ objectFit: 'cover', transition: 'transform 150ms ease', zIndex: 0 }}
                  className="group-hover:scale-[1.02] group-hover:z-[1]"
                />

                {/* Reflect Motion dark overlay + label */}
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
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
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
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(232,244,253,0.08)',
              border: '1px solid rgba(232,244,253,0.18)',
              color: '#E8F4FD',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              fontSize: '22px',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              transition: 'background 0.15s ease',
            }}
          >
            ×
          </button>

          {/* ← Prev */}
          {tiles.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => n !== null ? (n - 1 + tiles.length) % tiles.length : 0);
              }}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(232,244,253,0.08)',
                border: '1px solid rgba(232,244,253,0.18)',
                color: '#E8F4FD',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                fontSize: '22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                transition: 'background 0.15s ease',
              }}
            >
              ←
            </button>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tiles[lightbox].src}
              alt={tiles[lightbox].overlay ?? `${tab} photo ${lightbox + 1}`}
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </div>

          {/* → Next */}
          {tiles.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => n !== null ? (n + 1) % tiles.length : 0);
              }}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(232,244,253,0.08)',
                border: '1px solid rgba(232,244,253,0.18)',
                color: '#E8F4FD',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                fontSize: '22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                transition: 'background 0.15s ease',
              }}
            >
              →
            </button>
          )}

          {/* Label: "Tennis   3 / 5" */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#E8F4FD',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              zIndex: 3,
            }}
          >
            {tab}&nbsp;&nbsp;&nbsp;{lightbox + 1} / {tiles.length}
          </div>
        </div>
      )}
    </section>
  );
}
