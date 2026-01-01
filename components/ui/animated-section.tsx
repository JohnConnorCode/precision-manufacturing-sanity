'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SafeMotion } from '@/components/ui/safe-motion';
import { usePrefersReducedMotion } from '@/lib/motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
}

/**
 * Reusable animated section component that fades in and moves up on scroll
 * DRY principle: Replaces repetitive motion.div scroll animations throughout the app
 * Uses SafeMotion which handles page refresh correctly via IntersectionObserver
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  disabled = false,
}: AnimatedSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const LEGACY_PARITY = process.env.NEXT_PUBLIC_PARITY_MODE === 'legacy';

  // If animations are disabled or reduced motion is preferred, return a regular div
  if (disabled || LEGACY_PARITY || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <SafeMotion y={24} delay={delay} className={cn(className)}>
      {children}
    </SafeMotion>
  );
}
