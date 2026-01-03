'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
}

/**
 * ANIMATED SECTION COMPONENT
 *
 * Fades in and moves up when scrolled into view.
 * Works correctly on page refresh (unlike whileInView).
 *
 * Usage:
 * <AnimatedSection>
 *   <YourContent />
 * </AnimatedSection>
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  disabled = false,
}: AnimatedSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, shouldAnimate } = useAnimateInView<HTMLDivElement>();

  // Skip animations if disabled or reduced motion
  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={ANIM_STATES.fadeUp.initial}
      animate={shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
      transition={{ ...ANIM_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}
