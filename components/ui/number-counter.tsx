'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/motion';

interface NumberCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function NumberCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: NumberCounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    // For reduced motion users, show value immediately
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentCount = easeOutExpo * value;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration, prefersReducedMotion]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
