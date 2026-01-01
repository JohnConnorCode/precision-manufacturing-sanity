/**
 * Centralized Image Utilities
 *
 * Single source of truth for image URL resolution across the codebase.
 * This prevents inconsistent image handling that leads to missing/broken images.
 */

import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

// Type for Sanity image sources
export interface SanityImageSource {
  _type?: 'image';
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  url?: string;
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/**
 * Resolve any image source to a URL string.
 *
 * Handles:
 * - Direct URL strings
 * - Sanity image objects with asset.url
 * - Sanity image objects with asset._ref
 * - null/undefined (returns null)
 *
 * @example
 * const url = getImageUrl(data.heroImage);
 * if (url) {
 *   <Image src={url} ... />
 * }
 */
export function getImageUrl(
  source: SanityImageSource | string | null | undefined
): string | null {
  // Handle null/undefined
  if (!source) return null;

  // Handle direct URL strings
  if (typeof source === 'string') {
    return source.startsWith('http') ? source : null;
  }

  // Handle Sanity image with direct URL (from query expansion)
  if (source.asset?.url) {
    return source.asset.url;
  }

  // Handle Sanity image with reference (needs builder)
  if (source.asset?._ref || source.asset?._id) {
    try {
      return builder.image(source).url();
    } catch {
      return null;
    }
  }

  // Handle legacy url field
  if (source.url) {
    return source.url;
  }

  return null;
}

/**
 * Get an optimized image URL with width/height/format handling.
 * Uses Sanity's image CDN for automatic format conversion (WebP, AVIF).
 *
 * @example
 * const url = getOptimizedImageUrl(data.image, 800, 600);
 */
export function getOptimizedImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!source?.asset) return null;

  try {
    let img = builder.image(source).width(width);
    if (height) {
      img = img.height(height);
    }
    return img.auto('format').quality(85).url();
  } catch {
    return null;
  }
}

/**
 * Get image URL with proper sizing for different contexts.
 */
export const imageSizes = {
  thumbnail: (source: SanityImageSource | null | undefined) =>
    getOptimizedImageUrl(source, 200, 200),

  card: (source: SanityImageSource | null | undefined) =>
    getOptimizedImageUrl(source, 600, 400),

  hero: (source: SanityImageSource | null | undefined) =>
    getOptimizedImageUrl(source, 1920, 1080),

  full: (source: SanityImageSource | null | undefined) =>
    getOptimizedImageUrl(source, 2400),
};

/**
 * Get alt text from an image source, with fallback.
 */
export function getImageAlt(
  source: SanityImageSource | null | undefined,
  fallback: string = ''
): string {
  if (!source) return fallback;
  return source.alt || fallback;
}

/**
 * Check if an image source has a valid image.
 * Useful for conditional rendering.
 */
export function hasImage(source: SanityImageSource | string | null | undefined): boolean {
  return getImageUrl(source) !== null;
}
