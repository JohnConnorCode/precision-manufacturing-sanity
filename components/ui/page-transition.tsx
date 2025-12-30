'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/motion';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // easeOut as cubic bezier
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1], // easeIn as cubic bezier
    },
  },
};

const reducedMotionVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

/**
 * Page transition wrapper for smooth fade transitions between pages
 * Uses Framer Motion AnimatePresence for exit animations
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={prefersReducedMotion ? reducedMotionVariants : pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
