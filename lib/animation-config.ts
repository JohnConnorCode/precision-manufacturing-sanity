/**
 * UNIFIED ANIMATION CONFIGURATION
 *
 * Single source of truth for all homepage animations.
 * Ensures consistent, precise, sequential animations across all sections.
 *
 * Design Principles:
 * 1. Headers animate sequentially (eyebrow → word1 → word2 → description)
 * 2. Content starts AFTER header completes
 * 3. Cards/grids use consistent stagger timing
 * 4. All timing values derived from these constants
 */

import { useState, useEffect, useRef, RefObject } from 'react';

// ============================================================================
// CORE TIMING CONSTANTS
// ============================================================================

/**
 * Standard animation durations (in seconds)
 * Balanced durations for premium feel without sluggishness
 */
export const DURATIONS = {
  fast: 0.2,
  normal: 0.4,        // Aligned with lib/animations.ts
  slow: 0.5,
  slower: 0.6,
} as const;

/**
 * Standard easing function for all animations
 * Smooth, natural easeOut curve for better perceived performance
 */
export const EASING = "easeOut" as const;

/**
 * Stagger delays for different contexts (in seconds)
 * Perceptible delays create premium, sequential reveal effect
 */
export const STAGGER = {
  header: 0,          // No delay between header elements - show immediately
  cards: 0.08,        // Perceptible delay between cards (80ms)
  badges: 0.1,        // Visible delay between badges (100ms)
  list: 0.06,         // Subtle delay between list items (60ms)
  metrics: 0.08,      // Perceptible delay between metrics (80ms)
} as const;

// ============================================================================
// SECTION HEADER SEQUENTIAL TIMING
// ============================================================================

/**
 * Sequential animation timing for section headers
 * All elements animate together with no delay for immediate visibility
 */
export const HEADER_SEQUENCE = {
  eyebrow: {
    delay: 0,
    duration: DURATIONS.normal,
    completesAt: 0.3,
  },
  word1: {
    delay: 0,
    duration: DURATIONS.normal,
    completesAt: 0.3,
  },
  word2: {
    delay: 0,
    duration: DURATIONS.normal,
    completesAt: 0.3,
  },
  description: {
    delay: 0,
    duration: DURATIONS.normal,
    completesAt: 0.3,
  },
} as const;

/**
 * When the entire header section completes animating
 * Content starts immediately (no waiting)
 */
export const HEADER_COMPLETION_TIME = 0;

// ============================================================================
// HERO SECTION SPECIFIC TIMING
// ============================================================================

/**
 * Hero section has more dramatic sequential timing
 * Optimized for better perceived performance
 */
export const HERO_SEQUENCE = {
  word1: {
    delay: 0.1,
    duration: 0.5,
    completesAt: 0.6,
  },
  word2: {
    delay: 0.25,
    duration: 0.5,
    completesAt: 0.75,
  },
  word3: {
    delay: 0.4,
    duration: 0.5,
    completesAt: 0.9,
  },
  tagline: {
    delay: 0.6,
    duration: 0.5,
    completesAt: 1.1,
  },
  badges: {
    startDelay: 0.8, // When first badge starts (reduced from 1.0)
    stagger: STAGGER.badges,
    duration: 0.4,
  },
  cta: {
    delay: 1.0,
    duration: 0.5,
    completesAt: 1.5,
  },
  scrollIndicator: {
    delay: 1.4,
    duration: 0.5,
    completesAt: 1.9,
  },
} as const;

// ============================================================================
// CONTENT ANIMATION HELPERS
// ============================================================================

/**
 * Calculate staggered delay for grid items
 * Starts AFTER header completes, then staggers each item
 *
 * @param index - Item index in grid (0-based)
 * @param staggerDelay - Delay between items (default: STAGGER.cards)
 * @param baseDelay - Additional base delay (default: 0 for immediate start after header)
 * @returns Total delay in seconds
 */
export function getCardDelay(
  index: number,
  staggerDelay: number = STAGGER.cards,
  baseDelay: number = 0
): number {
  return baseDelay + (index * staggerDelay);
}

/**
 * Get initial animation state for fade-in-up
 * Uses smaller y offset to reduce jarring effect on failed animations
 */
export function getInitialState(prefersReducedMotion: boolean = false) {
  return {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 16,
  };
}

/**
 * Get animate state for fade-in-up
 */
export function getAnimateState(
  delay: number,
  duration: number = DURATIONS.normal,
  prefersReducedMotion: boolean = false
) {
  return {
    opacity: 1,
    y: 0,
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: prefersReducedMotion ? 0 : duration,
      ease: EASING as any,
    },
  };
}

/**
 * Get safe initial state that works with hydration
 * Returns visible state during SSR, animated state after mount
 */
export function getSafeInitialState(
  mounted: boolean,
  prefersReducedMotion: boolean = false
) {
  // During SSR or before mount, return visible state
  if (!mounted) {
    return { opacity: 1, y: 0 };
  }
  // After mount, return animated initial state
  return {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 16,
  };
}

/**
 * Get initial state for scale animations (like stats)
 */
export function getScaleInitialState(prefersReducedMotion: boolean = false) {
  return {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.8,
  };
}

/**
 * Get animate state for scale animations
 */
export function getScaleAnimateState(
  delay: number,
  duration: number = DURATIONS.slow,
  prefersReducedMotion: boolean = false
) {
  return {
    opacity: 1,
    scale: 1,
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: prefersReducedMotion ? 0 : duration,
      ease: EASING as any,
    },
  };
}

/**
 * Create viewport configuration for scroll-triggered animations
 * Default margin of -100px triggers animations before element enters viewport
 */
export function getViewportConfig(once: boolean = true, margin: string = "-100px") {
  return {
    once,
    margin,
  };
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Standard fade-in-up animation variant
 */
export function createFadeInUpVariant(
  delay: number = 0,
  duration: number = DURATIONS.normal,
  prefersReducedMotion: boolean = false
) {
  return {
    initial: getInitialState(prefersReducedMotion),
    animate: getAnimateState(delay, duration, prefersReducedMotion),
  };
}

/**
 * Stagger container variant for lists/grids
 */
export function createStaggerContainerVariant(
  staggerDelay: number = STAGGER.cards,
  baseDelay: number = 0
) {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  };
}

/**
 * Stagger item variant (used with stagger container)
 */
export const staggerItemVariant = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING as any,
    },
  },
};

// ============================================================================
// SECTION-SPECIFIC CONFIGS
// ============================================================================

/**
 * Pre-configured delays for common section layouts
 */
export const SECTION_CONFIGS = {
  // 4-column grid (Services, TechnicalSpecs 4-col)
  fourColumnGrid: {
    headerCompletion: HEADER_COMPLETION_TIME,
    stagger: STAGGER.cards,
    // Cards start immediately after header completes (no additional delay)
    getDelay: (index: number) => getCardDelay(index, STAGGER.cards, 0),
  },

  // 3-column grid (Industries)
  threeColumnGrid: {
    headerCompletion: HEADER_COMPLETION_TIME,
    stagger: STAGGER.cards,
    getDelay: (index: number) => getCardDelay(index, STAGGER.cards, 0),
  },

  // 2-column grid (Stats)
  twoColumnGrid: {
    headerCompletion: HEADER_COMPLETION_TIME,
    stagger: STAGGER.cards,
    getDelay: (index: number) => getCardDelay(index, STAGGER.cards, 0),
  },

  // 8-item metrics grid (TechnicalSpecs)
  metricsGrid: {
    headerCompletion: HEADER_COMPLETION_TIME,
    stagger: STAGGER.metrics,
    getDelay: (index: number) => getCardDelay(index, STAGGER.metrics, 0),
  },

  // List items (OperationalExcellence benefits)
  listItems: {
    headerCompletion: HEADER_COMPLETION_TIME,
    stagger: STAGGER.list,
    getDelay: (index: number) => getCardDelay(index, STAGGER.list, 0),
  },
} as const;

// ============================================================================
// RELIABLE SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

/**
 * Hook for reliable scroll-triggered animations that work on page refresh.
 *
 * The Problem:
 * - `whileInView` with `once: true` only fires when elements ENTER the viewport
 * - On page refresh, elements already in view never "enter" so animation never triggers
 * - Elements stay stuck at opacity: 0
 *
 * The Solution:
 * - Use `animate` prop with IntersectionObserver to track isInView state
 * - Use `initial={false}` to prevent setting opacity:0 during SSR
 * - Track mounted state to animate only after hydration
 *
 * How it works:
 * - SSR: mounted=false → content visible (opacity: 1, y: 0)
 * - After hydration, not in view: mounted=true, isInView=false → hidden (opacity: 0)
 * - After hydration, in view: mounted=true, isInView=true → visible with animation
 *
 * @param delay - Animation delay in seconds (for staggered effects)
 * @param duration - Animation duration in seconds
 * @param yOffset - Y translation distance in pixels
 */
export function useAnimateOnScroll(
  delay: number = 0,
  duration: number = DURATIONS.normal,
  yOffset: number = 16
): {
  ref: RefObject<HTMLDivElement | null>;
  initial: false;
  animate: {
    opacity: number;
    y: number;
  };
  transition: {
    duration: number;
    delay: number;
    ease: "easeOut";
  };
} {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Track mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // IntersectionObserver for reliable in-view detection
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // once: true behavior
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    initial: false, // KEY: Don't set opacity:0 during SSR
    animate: {
      // SSR/pre-mount: visible | mounted but not in view: hidden | in view: visible
      opacity: mounted && isInView ? 1 : mounted ? 0 : 1,
      y: mounted && isInView ? 0 : mounted ? yOffset : 0,
    },
    transition: {
      duration,
      delay: isInView ? delay : 0, // Only apply delay when animating in
      ease: EASING,
    },
  };
}

/**
 * Variant of useAnimateOnScroll for scale animations (like stats counters)
 */
export function useScaleOnScroll(
  delay: number = 0,
  duration: number = DURATIONS.slow
): {
  ref: RefObject<HTMLDivElement | null>;
  initial: false;
  animate: {
    opacity: number;
    scale: number;
  };
  transition: {
    duration: number;
    delay: number;
    ease: "easeOut";
  };
} {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    initial: false,
    animate: {
      opacity: mounted && isInView ? 1 : mounted ? 0 : 1,
      scale: mounted && isInView ? 1 : mounted ? 0.8 : 1,
    },
    transition: {
      duration,
      delay: isInView ? delay : 0,
      ease: EASING,
    },
  };
}
