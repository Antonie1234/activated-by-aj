'use client';

import { useState } from 'react';

interface Props {
  height?: number;
  maxWidth?: string;
  className?: string;
}

/**
 * Displays the locally-saved Reflect Motion logo.
 * Falls back to a styled "REFLECT MOTION" text treatment if the file is unavailable.
 */
export default function ReflectMotionLogo({ height = 56, maxWidth = '70%', className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontWeight: 900,
            fontSize: Math.round(height * 0.32),
            letterSpacing: '0.18em',
            textShadow: '0 0 18px rgba(74,127,165,0.7)',
            lineHeight: 1,
          }}
        >
          REFLECT
        </span>
        <span
          style={{
            color: 'var(--brand-gold)',
            fontWeight: 700,
            fontSize: Math.round(height * 0.22),
            letterSpacing: '0.28em',
            lineHeight: 1,
          }}
        >
          MOTION
        </span>
      </div>
    );
  }

  return (
    <img
      src="/reflect-motion-logo.png"
      alt="Reflect Motion"
      className={className}
      onError={() => setFailed(true)}
      style={{ height, width: 'auto', maxWidth, objectFit: 'contain' }}
    />
  );
}
