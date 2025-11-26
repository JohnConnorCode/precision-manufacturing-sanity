import { definePlugin } from 'sanity';

/**
 * Get the base URL for preview, supporting both local and production environments.
 * Uses the same logic as sanity.config.ts for consistency.
 */
function getBaseUrl(): string {
  // Explicit site URL (set in Vercel for production)
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Local development fallback
  return 'http://localhost:3000'
}

export const previewPane = definePlugin({
  name: 'preview-pane',
  document: {
    productionUrl: async (prev, { document }) => {
      const baseUrl = getBaseUrl();
      const slug = (document as any).slug?.current;
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET_TOKEN;

      // If no secret configured, fall back to default behavior
      if (!secret) return prev;

      // Helper to build preview URL via our /api/preview route which enables draft mode
      const buildPreview = (params: Record<string, string>) => {
        const q = new URLSearchParams({ secret, ...params }).toString();
        return `${baseUrl}/api/preview?${q}`;
      };

      // Generate preview URL based on document type
      switch ((document as any)._type) {
        case 'page':
          if (slug) return buildPreview({ collection: 'page', slug })
          return prev
        case 'service':
          if (!slug) return prev;
          return buildPreview({ collection: 'services', slug });
        case 'industry':
          if (!slug) return prev;
          return buildPreview({ collection: 'industries', slug });
        case 'resource':
          if (!slug) return prev;
          const category = (document as any).category || 'manufacturing-processes';
          return buildPreview({ collection: 'resources', slug, category });
        case 'homepage':
          return buildPreview({ global: 'homepage' });
        case 'about':
          return buildPreview({ global: 'about' });
        case 'contact':
          return buildPreview({ global: 'contact' });
        case 'careers':
          return buildPreview({ global: 'careers' });
        case 'terms':
          return buildPreview({ global: 'terms' });
        case 'supplierRequirements':
          return buildPreview({ global: 'supplier-requirements' });
        default:
          return prev;
      }
    },
  },
});
