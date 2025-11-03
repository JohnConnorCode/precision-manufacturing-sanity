/**
 * Media Library Configuration
 * Optimizes image handling and provides better organization
 */

export const imageConfig = {
  // Supported image types
  accept: {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'],
  },

  // Default image settings
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
    storeOriginalFilename: true,
  },

  // Image optimization presets
  presets: {
    thumbnail: { width: 200, height: 200, fit: 'crop' },
    card: { width: 400, height: 300, fit: 'crop' },
    hero: { width: 1920, height: 1080, fit: 'crop' },
    og: { width: 1200, height: 630, fit: 'crop' },
  },

  // Image quality levels
  quality: {
    low: 50,
    medium: 75,
    high: 90,
    maximum: 100,
  },
};

// Helper function to generate srcset
export function generateSrcSet(imageUrl: string, widths: number[]) {
  return widths
    .map((width) => `${imageUrl}?w=${width} ${width}w`)
    .join(', ');
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
) {
  const params = new URLSearchParams();

  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('fm', options.format);

  const queryString = params.toString();
  return queryString ? `${imageUrl}?${queryString}` : imageUrl;
}

// Image validation rules
export const imageValidation = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  minWidth: 400,
  minHeight: 300,
  recommendedWidth: 1920,
  recommendedHeight: 1080,
  aspectRatios: {
    square: 1,
    landscape: 16 / 9,
    portrait: 9 / 16,
    og: 1200 / 630,
  },
};
