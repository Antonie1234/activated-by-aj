'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    document.documentElement.classList.add('js-animations');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.animateDelay || '0');
            setTimeout(() => el.classList.add('is-visible'), delay);
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => revealObserver.observe(el));

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.countTarget || '0');
            const suffix = el.dataset.countSuffix || '';
            if (!isNaN(target) && target > 0) {
              const duration = 1200;
              const startTime = performance.now();
              const animate = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(animate);
                else el.textContent = String(target) + suffix;
              };
              requestAnimationFrame(animate);
            }
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count-target]').forEach((el) => countObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return null;
}
