'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

type AnimationType = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  disabled?: boolean;
}

/**
 * ANIMATED ITEM COMPONENT
 *
 * DRY replacement for whileInView patterns.
 * Works correctly on page refresh (unlike whileInView).
 *
 * Usage:
 * <AnimatedItem delay={0.1}>
 *   <Card>Content</Card>
 * </AnimatedItem>
 *
 * With custom animation:
 * <AnimatedItem animation="scaleIn" delay={0.2}>
 *   <div>Content</div>
 * </AnimatedItem>
 */
export default function AnimatedItem({
  children,
  className,
  delay = 0,
  animation = 'fadeUp',
  disabled = false,
}: AnimatedItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, shouldAnimate } = useAnimateInView<HTMLDivElement>();

  // Get animation states based on type
  const animState = ANIM_STATES[animation] || ANIM_STATES.fadeUp;

  // Skip animations if disabled or reduced motion
  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={animState.initial}
      animate={shouldAnimate ? animState.animate : animState.initial}
      transition={{ ...ANIM_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}

// Named export for explicit imports
export { AnimatedItem };
