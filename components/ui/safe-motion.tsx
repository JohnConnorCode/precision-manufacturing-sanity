'use client';

/**
 * SAFE MOTION HOOK
 *
 * Use this hook to prevent Framer Motion hydration issues in Next.js.
 *
 * THE PROBLEM:
 * - Framer Motion renders initial states during SSR (opacity: 0, y: 20, etc.)
 * - If any client state differs from SSR (scroll position, theme, etc.),
 *   hydration can fail and elements stay stuck at their initial state
 *
 * THE SOLUTION:
 * - Use the useMounted() hook to control when animations start
 * - Initial render matches SSR exactly
 * - After mount, trigger animations
 *
 * USAGE:
 * ```tsx
 * import { useMounted } from '@/components/ui/safe-motion';
 *
 * function MyComponent() {
 *   const mounted = useMounted();
 *
 *   return (
 *     <motion.div
 *       initial={{ opacity: 0, y: 20 }}
 *       animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
 *       transition={{ duration: 0.5, delay: mounted ? 0.2 : 0 }}
 *     >
 *       {children}
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * WHEN TO USE:
 * - Header/Navigation (has scroll state, theme state)
 * - Any component with useState that differs from SSR
 * - Hero sections with client-side state
 *
 * SAFE WITHOUT THIS HOOK:
 * - Components using only whileInView (triggers after hydration)
 * - Hover/tap animations (whileHover, whileTap)
 * - Static components with no client state
 */

import { useState, useEffect } from 'react';

/**
 * Hook to safely detect client-side mount.
 * Use this to prevent Framer Motion hydration mismatches.
 *
 * @returns boolean - true after component has mounted on client
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default useMounted;
