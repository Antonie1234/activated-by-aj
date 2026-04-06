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
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      >
        <source src="/hero-bg-aj.mov" type="video/quicktime" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.58)' }} />

      {/* Grain texture */}
      <div className="grain-overlay" />

      {/* Animated gold geometric shapes */}
      {/* Large diamond — top left */}
      <div
        className="absolute animate-float-slow"
        style={{
          top: '18%', left: '7%',
          width: 80, height: 80,
          border: '1.5px solid rgba(240,180,41,0.18)',
          transform: 'rotate(45deg)',
          animationDelay: '0s',
        }}
      />
      {/* Small diamond — top right */}
      <div
        className="absolute animate-float-medium"
        style={{
          top: '22%', right: '10%',
          width: 44, height: 44,
          border: '1px solid rgba(240,180,41,0.14)',
          transform: 'rotate(45deg)',
          animationDelay: '1.5s',
        }}
      />
      {/* Horizontal line — middle left */}
      <div
        className="absolute animate-drift"
        style={{
          top: '52%', left: '4%',
          width: 60, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(240,180,41,0.2), transparent)',
          animationDelay: '3s',
        }}
      />
      {/* Tiny dot cluster — bottom right */}
      <div
        className="absolute animate-float-fast"
        style={{ bottom: '28%', right: '8%', animationDelay: '0.8s' }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 4, height: 4,
              borderRadius: '50%',
              background: 'rgba(240,180,41,0.25)',
              marginBottom: 6,
            }}
          />
        ))}
      </div>
      {/* Medium diamond — bottom left */}
      <div
        className="absolute animate-float-slow"
        style={{
          bottom: '22%', left: '14%',
          width: 32, height: 32,
          border: '1px solid rgba(240,180,41,0.12)',
          transform: 'rotate(45deg)',
          animationDelay: '4s',
        }}
      />

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
