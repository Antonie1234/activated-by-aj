'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { prefix: '',     value: 10,  suffix: '+', label: 'Years Coaching' },
  { prefix: '',     value: 4,   suffix: '',  label: 'Sports Qualified' },
  { prefix: 'ITF ', value: 800, suffix: '',  label: 'Former World Ranking' },
  { prefix: '',     value: 4,   suffix: '',  label: 'Countries Coached' },
];

function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function StatItem({ prefix, value, suffix, label, active }: {
  prefix: string; value: number; suffix: string; label: string; active: boolean;
}) {
  const count = useCountUp(value, 1400, active);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span
        className="text-5xl sm:text-6xl font-black leading-none mb-2 tabular-nums"
        style={{ color: '#ffffff', letterSpacing: '-0.03em' }}
      >
        {prefix}{count}{suffix}
      </span>
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: '#E8F4FD', opacity: 0.75 }}
      >
        {label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: '#0D1B2A' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
