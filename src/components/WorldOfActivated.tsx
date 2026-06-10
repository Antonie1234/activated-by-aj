'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

const TABS = ['Tennis', 'Padel', 'Pickleball', 'Beach Sports', 'Reflect Motion'] as const;
type Tab = (typeof TABS)[number];

type PhotoTile = {
  src:      string;
  colSpan:  number;
  rowSpan:  number;
  colStart: number;
  rowStart: number;
  overlay?: string;
};

type VideoItem = { src: string; sport: string; };

// ─── Photo grid layout templates (photos only) ────────────────────────────────

const TEMPLATES: Record<Tab, Array<Omit<PhotoTile, 'src'>>> = {
  Tennis: [
    { colSpan: 5, rowSpan: 2, colStart: 1,  rowStart: 1 },
    { colSpan: 4, rowSpan: 1, colStart: 6,  rowStart: 1 },
    { colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 1 },
    { colSpan: 4, rowSpan: 1, colStart: 6,  rowStart: 2 },
    { colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 2 },
  ],
  Padel: [
    { colSpan: 5, rowSpan: 2, colStart: 1,  rowStart: 1 },
    { colSpan: 4, rowSpan: 1, colStart: 6,  rowStart: 1 },
    { colSpan: 3, rowSpan: 1, colStart: 10, rowStart: 1 },
    { colSpan: 7, rowSpan: 1, colStart: 6,  rowStart: 2 },
  ],
  Pickleball: [],
  'Beach Sports': [
    { colSpan: 5, rowSpan: 2, colStart: 1, rowStart: 1 },
    { colSpan: 7, rowSpan: 2, colStart: 6, rowStart: 1 },
  ],
  'Reflect Motion': [],
};

// Maps Tab label → gallery-order.json photos key
const TAB_KEY: Record<Tab, string> = {
  Tennis:          'tennis',
  Padel:           'padel',
  Pickleball:      'pickleball',
  'Beach Sports':  'beach',
  'Reflect Motion':'reflect',
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_PHOTOS: Record<string, string[]> = {
  tennis:     ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg'],
  padel:      ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg'],
  pickleball: [],
  beach:      ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg'],
  reflect:    [],
};

const DEFAULT_VIDEOS: VideoItem[] = [
  { src: '/gallery/video-1.mp4', sport: 'General' },
  { src: '/gallery/video-2.mov', sport: 'General' },
  { src: '/gallery/video-3.mov', sport: 'General' },
  { src: '/gallery/video-4.mov', sport: 'General' },
  { src: '/gallery/video-5.mov', sport: 'General' },
  { src: '/gallery/video-6.mov', sport: 'General' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPhotoTiles(tab: Tab, files: string[]): PhotoTile[] {
  const template = TEMPLATES[tab];
  return template.slice(0, files.length).map((t, i) => ({ ...t, src: files[i] }));
}

const VIDEO_SPORT_LABEL: Record<string, string> = {
  tennis: 'Tennis', padel: 'Padel', pickleball: 'Pickleball',
  beach: 'Beach Sports', general: 'General',
};

function buildVideoList(videosObj: Record<string, string[]>): VideoItem[] {
  const result: VideoItem[] = [];
  for (const [key, srcs] of Object.entries(videosObj)) {
    const sport = VIDEO_SPORT_LABEL[key] ?? key;
    for (const src of srcs) result.push({ src, sport });
  }
  return result;
}

// Default grids (rendered on SSR / before gallery-order.json is fetched)
const DEFAULT_GRIDS = (Object.keys(TEMPLATES) as Tab[]).reduce(
  (acc, t) => { acc[t] = buildPhotoTiles(t, DEFAULT_PHOTOS[TAB_KEY[t]] ?? []); return acc; },
  {} as Record<Tab, PhotoTile[]>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorldOfActivated() {
  const [grids,        setGrids]        = useState<Record<Tab, PhotoTile[]>>(DEFAULT_GRIDS);
  const [videos,       setVideos]       = useState<VideoItem[]>(DEFAULT_VIDEOS);
  const [tab,          setTab]          = useState<Tab>('Tennis');
  const [gridVisible,  setGridVisible]  = useState(true);
  const [lightbox,     setLightbox]     = useState<number | null>(null);
  const [videoLightbox,setVideoLightbox]= useState<string | null>(null);

  // ── Load gallery-order.json (new nested structure) ─────────────────────────
  useEffect(() => {
    fetch('/gallery/gallery-order.json', { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((order: { photos?: Record<string, string[]>; videos?: Record<string, string[]> }) => {
        // Photos
        if (order.photos) {
          setGrids(
            (Object.keys(TEMPLATES) as Tab[]).reduce((acc, t) => {
              const key   = TAB_KEY[t];
              const files = order.photos![key] ?? DEFAULT_PHOTOS[key] ?? [];
              acc[t] = buildPhotoTiles(t, files);
              return acc;
            }, {} as Record<Tab, PhotoTile[]>)
          );
        }
        // Videos for Highlights section
        if (order.videos) {
          const vList = buildVideoList(order.videos);
          setVideos(vList.length > 0 ? vList : DEFAULT_VIDEOS);
        }
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  const tiles  = grids[tab];
  const maxRow = tiles.length > 0 ? Math.max(...tiles.map((t) => t.rowStart + t.rowSpan - 1)) : 2;

  // ── Tab crossfade ──────────────────────────────────────────────────────────
  const switchTab = (next: Tab) => {
    if (next === tab) return;
    setGridVisible(false);
    setTimeout(() => { setTab(next); setLightbox(null); setGridVisible(true); }, 200);
  };

  // ── Photo lightbox keyboard nav ────────────────────────────────────────────
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

  // ── Video lightbox ESC ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!videoLightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [videoLightbox]);

  const activeTile = lightbox !== null ? tiles[lightbox] : null;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section style={{ background: '#0D1B2A', padding: '72px 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <p style={{ color: '#4A7FA5', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>
            THE WORLD OF ACTIVATED
          </p>
          <h2 style={{ color: '#E8F4FD', fontSize: '32px', fontWeight: 500, letterSpacing: '-0.01em' }}>
            Sport. Energy. Movement.
          </h2>
        </div>

        {/* ── SPORT TABS ──────────────────────────────────────────────────── */}
        <div className="flex overflow-x-auto" style={{ borderBottom: '1px solid rgba(74,127,165,0.2)', marginBottom: '12px', scrollbarWidth: 'none' }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => switchTab(t)} style={{
              padding: '10px 18px', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'transparent', border: 'none',
              borderBottom: tab === t ? '2px solid #C8A951' : '2px solid transparent',
              color: tab === t ? '#C8A951' : '#4A7FA5',
              cursor: 'pointer', marginBottom: '-1px',
              transition: 'color 0.15s ease', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* ── PHOTO GRID or EMPTY STATE ────────────────────────────────────── */}
        {tiles.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', padding: '48px 24px', borderRadius: '8px', border: '1px solid rgba(74,127,165,0.15)' }}>
            <p style={{ color: '#4A7FA5', fontStyle: 'italic', textAlign: 'center', fontSize: '15px', lineHeight: 1.6 }}>
              Coming soon — check back for {tab} content.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: `repeat(${maxRow}, 190px)`,
              gap: '6px', minWidth: '560px',
              opacity: gridVisible ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}>
              {tiles.map((tile, i) => (
                <div key={`${tab}-${i}`} className="group" onClick={() => setLightbox(i)} style={{
                  gridColumn: `${tile.colStart} / span ${tile.colSpan}`,
                  gridRow:    `${tile.rowStart} / span ${tile.rowSpan}`,
                  position: 'relative', overflow: 'hidden', borderRadius: '4px', cursor: 'pointer',
                }}>
                  <Image
                    src={tile.src}
                    alt={tile.overlay ?? `${tab} — photo ${i + 1}`}
                    fill
                    sizes={`(max-width: 768px) 100vw, ${Math.round((tile.colSpan / 12) * 1152)}px`}
                    style={{ objectFit: 'cover', transition: 'transform 150ms ease' }}
                    className="group-hover:scale-[1.02]"
                  />
                  {tile.overlay && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.50)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, pointerEvents: 'none' }}>
                      <span style={{ color: '#C8A951', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, textAlign: 'center', padding: '0 10px' }}>
                        {tile.overlay}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HIGHLIGHTS ──────────────────────────────────────────────────── */}
        {videos.length > 0 && (
          <div style={{ marginTop: '56px' }}>
            <p style={{ color: '#4A7FA5', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>
              HIGHLIGHTS
            </p>
            <h3 style={{ color: '#E8F4FD', fontSize: '24px', fontWeight: 500, marginBottom: '20px', letterSpacing: '-0.01em' }}>
              Watch. Feel. Experience.
            </h3>

            {/* Horizontal scroll row */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
              {videos.map((v, i) => (
                <div
                  key={`${v.src}-${i}`}
                  className="group"
                  onClick={() => setVideoLightbox(v.src)}
                  style={{
                    flexShrink: 0, width: '320px', height: '200px',
                    background: '#0a0f1a', borderRadius: '6px',
                    position: 'relative', cursor: 'pointer', overflow: 'hidden',
                    border: '1px solid rgba(232,244,253,0.08)',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  {/* Sport badge */}
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px', zIndex: 2,
                    background: 'rgba(200,169,81,0.88)', borderRadius: '3px',
                    padding: '3px 8px', fontSize: '10px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '1px', color: '#0a0a0a',
                  }}>
                    {v.sport}
                  </div>

                  {/* Play button */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      className="group-hover:scale-110"
                      style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.92)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── PHOTO LIGHTBOX ──────────────────────────────────────────────────── */}
      {lightbox !== null && activeTile !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo lightbox"
          style={{ position: 'fixed', inset: 0, background: 'rgba(13,27,42,0.95)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLightbox(null)}
        >
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} aria-label="Close"
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)', color: '#E8F4FD', width: '40px', height: '40px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}
          >×</button>

          {tiles.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox((n) => n !== null ? (n - 1 + tiles.length) % tiles.length : 0); }} aria-label="Previous"
              style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)', color: '#E8F4FD', width: '44px', height: '44px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}
            >←</button>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeTile.src} alt={activeTile.overlay ?? `${tab} ${lightbox + 1}`}
              style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px', display: 'block' }}
            />
          </div>

          {tiles.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox((n) => n !== null ? (n + 1) % tiles.length : 0); }} aria-label="Next"
              style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)', color: '#E8F4FD', width: '44px', height: '44px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}
            >→</button>
          )}

          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', color: '#E8F4FD', fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap', zIndex: 3 }}>
            {tab}&nbsp;&nbsp;&nbsp;{lightbox + 1} / {tiles.length}
          </div>
        </div>
      )}

      {/* ── VIDEO LIGHTBOX (Highlights) ──────────────────────────────────────── */}
      {videoLightbox && (
        <div role="dialog" aria-modal="true" aria-label="Video lightbox"
          style={{ position: 'fixed', inset: 0, background: 'rgba(13,27,42,0.95)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setVideoLightbox(null)}
        >
          <button onClick={(e) => { e.stopPropagation(); setVideoLightbox(null); }} aria-label="Close"
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(232,244,253,0.08)', border: '1px solid rgba(232,244,253,0.18)', color: '#E8F4FD', width: '40px', height: '40px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}
          >×</button>
          <div onClick={(e) => e.stopPropagation()}>
            <video key={videoLightbox} autoPlay controls playsInline
              style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '4px', display: 'block', background: '#000' }}
            >
              <source src={videoLightbox} />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
