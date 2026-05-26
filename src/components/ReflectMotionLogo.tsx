'use client';

import { useState } from 'react';

interface Props {
  height?: number;
  maxWidth?: string;
  className?: string;
}

/**
 * Loads the Reflect Motion logo from their live URL.
 * Falls back to a branded "RM" text badge if the image fails to load.
 */
export default function ReflectMotionLogo({ height = 56, maxWidth = '55%', className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          height,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--brand-gold)',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontWeight: 700,
          fontSize: Math.round(height * 0.45),
          letterSpacing: '0.15em',
          opacity: 0.85,
        }}
      >
        RM
      </div>
    );
  }

  return (
    <img
      src="https://reflectmotion.com/logo.png"
      alt="Reflect Motion"
      className={className}
      onError={() => setFailed(true)}
      style={{ height, width: 'auto', maxWidth, objectFit: 'contain' }}
    />
  );
}
