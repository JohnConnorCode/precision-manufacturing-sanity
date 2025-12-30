"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/motion';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  distance = 30,
  className = ''
}: FloatingElementProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  // For users who prefer reduced motion, render a static element
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
        x: [0, distance / 3, -distance / 3, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}