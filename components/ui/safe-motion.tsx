'use client';

/**
 * SAFE MOTION - DRY Animation System
 *
 * THE ONLY animation component you should use in this project.
 * Fixes the whileInView refresh bug reliably.
 *
 * Usage:
 *   <SafeMotion y={20} delay={0.1}>Content</SafeMotion>
 *   <SafeMotion x={-20} scale={0.9} delay={0.2}>Content</SafeMotion>
 *   <SafeMotion fade delay={index * 0.1}>Staggered item</SafeMotion>
 */

import { useState, useEffect, useRef, ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// CORE HOOKS
// ============================================================================

/**
 * Detect client-side mount to prevent hydration mismatches
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Detect when element enters viewport using native IntersectionObserver
 * More reliable than Framer Motion's whileInView after page refresh
 */
export function useInView(options?: { threshold?: number; rootMargin?: string; once?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '-50px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, options?.threshold, options?.rootMargin]);

  return { ref, isInView };
}

// ============================================================================
// SAFE MOTION COMPONENT
// ============================================================================

type AnimationPreset = 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'scaleUp';

interface SafeMotionProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'ref'> {
  children: ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Y offset for slide animations */
  y?: number;
  /** X offset for slide animations */
  x?: number;
  /** Scale start value (0-1) */
  scale?: number;
  /** Use a preset animation */
  preset?: AnimationPreset;
  /** Disable animation entirely */
  disabled?: boolean;
}

/**
 * SafeMotion - The only animation component you need.
 *
 * Works reliably on:
 * - Initial page load
 * - Page refresh (the bug this fixes!)
 * - Scroll into view
 *
 * @example
 * // Simple fade up
 * <SafeMotion y={20}>Content</SafeMotion>
 *
 * // Staggered items
 * {items.map((item, i) => (
 *   <SafeMotion key={item.id} y={20} delay={i * 0.1}>
 *     {item.content}
 *   </SafeMotion>
 * ))}
 *
 * // Slide from left
 * <SafeMotion x={-30}>Content</SafeMotion>
 *
 * // Scale in
 * <SafeMotion scale={0.8}>Content</SafeMotion>
 */
export const SafeMotion = forwardRef<HTMLDivElement, SafeMotionProps>(
  function SafeMotion(
    {
      children,
      className,
      delay = 0,
      duration = 0.5,
      y,
      x,
      scale,
      preset,
      disabled = false,
      ...motionProps
    },
    forwardedRef
  ) {
    const mounted = useMounted();
    const { ref: inViewRef, isInView } = useInView();

    // Merge refs
    const setRefs = (node: HTMLDivElement | null) => {
      (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    // If disabled, render children without animation
    if (disabled) {
      return <div className={className}>{children}</div>;
    }

    // Resolve preset to values
    let animY = y;
    let animX = x;
    let animScale = scale;

    if (preset) {
      switch (preset) {
        case 'fade':
          break;
        case 'fadeUp':
          animY = animY ?? 20;
          break;
        case 'fadeDown':
          animY = animY ?? -20;
          break;
        case 'fadeLeft':
          animX = animX ?? 20;
          break;
        case 'fadeRight':
          animX = animX ?? -20;
          break;
        case 'scale':
          animScale = animScale ?? 0.9;
          break;
        case 'scaleUp':
          animScale = animScale ?? 0.8;
          animY = animY ?? 20;
          break;
      }
    }

    // Default to fadeUp if no animation specified
    if (animY === undefined && animX === undefined && animScale === undefined) {
      animY = 16;
    }

    // Build animate state
    const animateState: Record<string, number> = {
      opacity: mounted && isInView ? 1 : mounted ? 0 : 1,
    };

    if (animY !== undefined) {
      animateState.y = mounted && isInView ? 0 : mounted ? animY : 0;
    }
    if (animX !== undefined) {
      animateState.x = mounted && isInView ? 0 : mounted ? animX : 0;
    }
    if (animScale !== undefined) {
      animateState.scale = mounted && isInView ? 1 : mounted ? animScale : 1;
    }

    return (
      <motion.div
        ref={setRefs}
        className={cn(className)}
        initial={false}
        animate={animateState}
        transition={{
          duration,
          delay: isInView ? delay : 0,
          ease: 'easeOut',
        }}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

// ============================================================================
// CONVENIENCE VARIANTS
// ============================================================================

/** Fade up animation - most common pattern */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 20,
  ...props
}: Omit<SafeMotionProps, 'preset'>) {
  return (
    <SafeMotion className={className} delay={delay} y={y} {...props}>
      {children}
    </SafeMotion>
  );
}

/** Fade in from left */
export function FadeLeft({
  children,
  className,
  delay = 0,
  x = -20,
  ...props
}: Omit<SafeMotionProps, 'preset'>) {
  return (
    <SafeMotion className={className} delay={delay} x={x} {...props}>
      {children}
    </SafeMotion>
  );
}

/** Fade in from right */
export function FadeRight({
  children,
  className,
  delay = 0,
  x = 20,
  ...props
}: Omit<SafeMotionProps, 'preset'>) {
  return (
    <SafeMotion className={className} delay={delay} x={x} {...props}>
      {children}
    </SafeMotion>
  );
}

/** Scale in animation */
export function ScaleIn({
  children,
  className,
  delay = 0,
  scale = 0.9,
  ...props
}: Omit<SafeMotionProps, 'preset'>) {
  return (
    <SafeMotion className={className} delay={delay} scale={scale} {...props}>
      {children}
    </SafeMotion>
  );
}

// ============================================================================
// INLINE MOTION (for spans in headings)
// ============================================================================

interface SafeMotionSpanProps extends Omit<HTMLMotionProps<'span'>, 'initial' | 'animate' | 'ref'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

/**
 * SafeMotionSpan - For inline text animations (e.g., words in headings)
 * Same safe pattern as SafeMotion but uses motion.span for inline display
 */
export function SafeMotionSpan({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 16,
  ...motionProps
}: SafeMotionSpanProps) {
  const mounted = useMounted();
  const { ref, isInView } = useInView();

  const animateState = {
    opacity: mounted && isInView ? 1 : mounted ? 0 : 1,
    y: mounted && isInView ? 0 : mounted ? y : 0,
  };

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn('inline-block', className)}
      initial={false}
      animate={animateState}
      transition={{
        duration,
        delay: isInView ? delay : 0,
        ease: 'easeOut',
      }}
      {...motionProps}
    >
      {children}
    </motion.span>
  );
}

/**
 * SafeMotionP - For paragraph animations
 * Same safe pattern as SafeMotion but uses motion.p
 */
export function SafeMotionP({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 16,
  ...motionProps
}: SafeMotionSpanProps) {
  const mounted = useMounted();
  const { ref, isInView } = useInView();

  const animateState = {
    opacity: mounted && isInView ? 1 : mounted ? 0 : 1,
    y: mounted && isInView ? 0 : mounted ? y : 0,
  };

  return (
    <motion.p
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={cn(className)}
      initial={false}
      animate={animateState}
      transition={{
        duration,
        delay: isInView ? delay : 0,
        ease: 'easeOut',
      }}
      {...motionProps}
    >
      {children}
    </motion.p>
  );
}

// ============================================================================
// STAGGER HELPER
// ============================================================================

/**
 * Calculate stagger delay for grid/list items
 * @param index Item index (0-based)
 * @param staggerMs Delay between items in ms (default: 80ms)
 * @param baseDelayMs Base delay before first item in ms (default: 0)
 */
export function stagger(index: number, staggerMs = 80, baseDelayMs = 0): number {
  return (baseDelayMs + index * staggerMs) / 1000;
}

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility)
// ============================================================================

export const SafeAnimate = SafeMotion;
export default SafeMotion;
