/**
 * Returns the canonical base URL for the site.
 * Priority: NEXT_PUBLIC_SITE_URL env var > VERCEL_PROJECT_PRODUCTION_URL > fallback
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'https://precision-manufacturing-sanity.vercel.app';
}
