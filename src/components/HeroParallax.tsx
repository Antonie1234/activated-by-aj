'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps the hero background layer and moves it at 35% of scroll speed,
 * creating a parallax effect. The content layer (z-10) scrolls normally.
 */
export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* Oversized so parallax doesn't expose gaps at the edges */
    <div
      ref={ref}
      className="absolute inset-0 w-full pointer-events-none"
      style={{ top: '-10%', height: '120%', willChange: 'transform' }}
    >
      {/* Grain texture */}
      <div className="grain-overlay" />

      {/* Blue glow orb */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '25%', left: '20%',
          width: 380, height: 380,
          background: 'var(--brand-blue)',
          opacity: 0.08,
        }}
      />
      {/* Gold glow orb */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '20%', right: '18%',
          width: 300, height: 300,
          background: 'var(--brand-gold)',
          opacity: 0.07,
        }}
      />
    </div>
  );
}
