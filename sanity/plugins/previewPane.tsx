import { definePlugin } from 'sanity';
import { EyeOpenIcon } from '@sanity/icons';

export const previewPane = definePlugin({
  name: 'preview-pane',
  document: {
    productionUrl: async (prev, { document }) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const slug = (document as any).slug?.current;

      if (!slug) return prev;

      // Generate preview URL based on document type
      switch ((document as any)._type) {
        case 'service':
          return `${baseUrl}/services/${slug}`;
        case 'industry':
          return `${baseUrl}/industries/${slug}`;
        case 'resource':
          const category = (document as any).category;
          return `${baseUrl}/resources/${category}/${slug}`;
        case 'homepage':
          return baseUrl;
        case 'about':
          return `${baseUrl}/about`;
        case 'contact':
          return `${baseUrl}/contact`;
        case 'careers':
          return `${baseUrl}/careers`;
        case 'terms':
          return `${baseUrl}/compliance/terms`;
        case 'supplierRequirements':
          return `${baseUrl}/compliance/supplier-requirements`;
        default:
          return prev;
      }
    },
  },
});
