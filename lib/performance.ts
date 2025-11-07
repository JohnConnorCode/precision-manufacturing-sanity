/**
 * Performance Optimization Utilities
 *
 * This module provides utilities for optimizing application performance:
 * - Throttle and debounce functions for event handlers
 * - Memoized text conversion utilities
 */

/**
 * Throttles a function to execute at most once per specified wait period.
 * Uses requestAnimationFrame for smooth scroll performance.
 *
 * @param fn - The function to throttle
 * @param wait - Minimum time between function executions (milliseconds)
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number = 100
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastTime = 0;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastTime;

    if (timeSinceLastCall >= wait) {
      lastTime = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = null;
        fn(...args);
      }, wait - timeSinceLastCall);
    }
  };
}

/**
 * Throttles a function using requestAnimationFrame for optimal scroll performance.
 * Ensures the function runs at most once per animation frame.
 *
 * @param fn - The function to throttle
 * @returns Throttled function
 */
export function throttleRAF<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function throttled(...args: Parameters<T>) {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
        rafId = null;
      });
    }
  };
}

/**
 * Debounces a function to execute only after it stops being called for the specified delay.
 *
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Converts Portable Text blocks to plain text string.
 * Used for meta descriptions, excerpts, and search indexing.
 *
 * @param blocks - Portable Text blocks array
 * @returns Plain text string
 */
export function portableTextToPlainText(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text || '').join('');
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * Cache for memoized text conversions
 */
const textConversionCache = new Map<string, string>();

/**
 * Memoized version of portableTextToPlainText.
 * Caches results for identical inputs to avoid redundant processing.
 *
 * @param blocks - Portable Text blocks array
 * @returns Plain text string
 */
export function portableTextToPlainTextMemoized(blocks: any): string {
  // Create cache key from blocks
  const cacheKey = JSON.stringify(blocks);

  if (textConversionCache.has(cacheKey)) {
    return textConversionCache.get(cacheKey)!;
  }

  const result = portableTextToPlainText(blocks);

  // Limit cache size to prevent memory issues
  if (textConversionCache.size > 100) {
    const firstKey = textConversionCache.keys().next().value;
    if (firstKey) {
      textConversionCache.delete(firstKey);
    }
  }

  textConversionCache.set(cacheKey, result);
  return result;
}

/**
 * Clears the text conversion cache.
 * Useful for testing or when you know the data has changed.
 */
export function clearTextConversionCache(): void {
  textConversionCache.clear();
}
