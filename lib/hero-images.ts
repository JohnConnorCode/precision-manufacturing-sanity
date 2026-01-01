import { getImageAlt, getImageUrl, getOptimizedImageUrl, type SanityImageSource } from '@/lib/image-utils';

export type HeroImageLike = SanityImageSource | string | null | undefined;

export function getHeroImageUrl(
  source: HeroImageLike,
  width = 1920,
  height = 1080
): string {
  if (!source) return '';
  if (typeof source === 'string') {
    const trimmed = source.trim();
    return trimmed.startsWith('http') ? trimmed : '';
  }

  return (
    getOptimizedImageUrl(source, width, height) ||
    getImageUrl(source) ||
    ''
  );
}

export function getHeroImageAlt(image?: HeroImageLike, fallback = ''): string {
  if (!image) return fallback;
  if (typeof image === 'string') return fallback;
  return getImageAlt(image, fallback);
}
