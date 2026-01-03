'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState, RefObject } from 'react';

/**
 * UNIFIED ANIMATION HOOK
 *
 * Solves the SSR + refresh animation problem cleanly:
 * 1. SSR renders initial state (opacity: 0)
 * 2. On mount, checks if element is in viewport
 * 3. If in viewport, triggers animation immediately
 * 4. If not in viewport, waits for scroll
 * 5. Animation only plays once
 *
 * Usage:
 * const { ref, shouldAnimate } = useAnimateInView();
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0, y: 20 }}
 *   animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
 * />
 */
export function useAnimateInView<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  amount?: number;
  margin?: string;
}): {
  ref: RefObject<T | null>;
  shouldAnimate: boolean;
  isInView: boolean;
} {
  const { once = true, amount = 0.2, margin = "-100px" } = options || {};

  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once, amount, margin: margin as any });
  const [isMounted, setIsMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Track mount state for SSR safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // When in view, mark as animated
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    shouldAnimate: isMounted && hasAnimated,
    isInView,
  };
}

/**
 * Standard animation states
 * Use with the hook above
 */
export const ANIM_STATES = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
} as const;

/**
 * Standard transition
 */
export const ANIM_TRANSITION = {
  duration: 0.5,
  ease: "easeOut" as const,
};
