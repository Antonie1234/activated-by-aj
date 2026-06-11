'use client';

import { useState } from 'react';

/**
 * Image with a navy skeleton that fades to the real image on load.
 * If the image fails to load (dead hotlink, missing file), it shows a solid
 * navy placeholder with a subtle centred Activated "A" icon instead of the
 * browser's broken-image glyph.
 */
export default function FadeInImage({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: '#162233',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        role="img"
        aria-label={alt}
      >
        <svg width="64" height="64" viewBox="18 8 24 24" style={{ opacity: 0.18 }} aria-hidden="true">
          <polygon points="18,32 26,32 30,20 34,32 42,32 30,8" fill="#4A7FA5" />
          <polygon points="24,26 36,26 34,20 26,20" fill="#162233" />
        </svg>
      </div>
    );
  }

  return (
    // Skeleton background shows through until the image paints
    <span style={{ display: 'block', width: '100%', height: '100%', background: '#162233' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />
    </span>
  );
}
