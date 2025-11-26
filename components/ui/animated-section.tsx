'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/design-system';

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animateOnce?: boolean;
  amount?: number;
  disabled?: boolean;
  /** Viewport margin - negative value triggers animation earlier */
  margin?: string;
}

/**
 * Reusable animated section component that fades in and moves up on scroll
 * DRY principle: Replaces repetitive motion.div scroll animations throughout the app
 * Uses centralized animation config from design-system.ts
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  animateOnce = true,
  amount = 0.2,
  disabled = false,
  margin = "-100px",
  ...motionProps
}: AnimatedSectionProps) {
  const LEGACY_PARITY = process.env.NEXT_PUBLIC_PARITY_MODE === 'legacy'
  // If animations are disabled, return a regular div
  if (disabled || LEGACY_PARITY) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: animations.entry.duration,
          ease: "easeOut",
          delay,
        },
      }}
      viewport={{ once: animateOnce, amount, margin }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
