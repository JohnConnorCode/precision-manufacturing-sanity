'use client';

/**
 * SAFE MOTION COMPONENTS
 *
 * These components wrap Framer Motion to prevent hydration issues in Next.js.
 *
 * THE PROBLEM:
 * - Framer Motion renders initial states during SSR (opacity: 0, y: 20, etc.)
 * - If any client state differs from SSR (scroll position, theme, etc.),
 *   hydration can fail and elements stay stuck at their initial state
 *
 * THE SOLUTION:
 * - Always use `mounted` state to control animations
 * - Initial render matches SSR exactly
 * - After mount, trigger animations
 *
 * USAGE:
 * Instead of:
 *   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 *
 * Use:
 *   <SafeMotion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 *
 * Or for manual control:
 *   const mounted = useMounted();
 *   <motion.div animate={{ opacity: mounted ? 1 : 0 }}>
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { useState, useEffect, forwardRef } from 'react';

// Hook to safely detect client-side mount
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// Type for safe motion props
type SafeMotionProps<T extends keyof JSX.IntrinsicElements> = HTMLMotionProps<T> & {
  children?: React.ReactNode;
};

// Factory to create safe motion components
function createSafeMotionComponent<T extends keyof JSX.IntrinsicElements>(
  Component: typeof motion.div
) {
  const SafeComponent = forwardRef<HTMLElement, SafeMotionProps<T>>(
    ({ initial, animate, transition, ...props }, ref) => {
      const mounted = useMounted();

      // If no initial state, just render normally
      if (!initial) {
        return <Component ref={ref} animate={animate} transition={transition} {...props} />;
      }

      // Convert animate to mounted-aware version
      const safeAnimate = mounted ? animate : initial;
      const safeTransition = mounted ? transition : { duration: 0 };

      return (
        <Component
          ref={ref}
          initial={initial}
          animate={safeAnimate}
          transition={safeTransition}
          {...props}
        />
      );
    }
  );
  SafeComponent.displayName = `SafeMotion.${Component}`;
  return SafeComponent;
}

// Safe motion components - use these instead of motion.div, motion.span, etc.
export const SafeMotion = {
  div: createSafeMotionComponent<'div'>(motion.div as typeof motion.div),
  span: createSafeMotionComponent<'span'>(motion.span as typeof motion.div),
  section: createSafeMotionComponent<'section'>(motion.section as typeof motion.div),
  article: createSafeMotionComponent<'article'>(motion.article as typeof motion.div),
  aside: createSafeMotionComponent<'aside'>(motion.aside as typeof motion.div),
  nav: createSafeMotionComponent<'nav'>(motion.nav as typeof motion.div),
  header: createSafeMotionComponent<'header'>(motion.header as typeof motion.div),
  footer: createSafeMotionComponent<'footer'>(motion.footer as typeof motion.div),
  main: createSafeMotionComponent<'main'>(motion.main as typeof motion.div),
  ul: createSafeMotionComponent<'ul'>(motion.ul as typeof motion.div),
  li: createSafeMotionComponent<'li'>(motion.li as typeof motion.div),
  p: createSafeMotionComponent<'p'>(motion.p as typeof motion.div),
  h1: createSafeMotionComponent<'h1'>(motion.h1 as typeof motion.div),
  h2: createSafeMotionComponent<'h2'>(motion.h2 as typeof motion.div),
  h3: createSafeMotionComponent<'h3'>(motion.h3 as typeof motion.div),
  button: createSafeMotionComponent<'button'>(motion.button as typeof motion.div),
  a: createSafeMotionComponent<'a'>(motion.a as typeof motion.div),
  img: createSafeMotionComponent<'img'>(motion.img as typeof motion.div),
};

export default SafeMotion;
