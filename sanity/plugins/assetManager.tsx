import { definePlugin } from 'sanity';
import { ImageIcon } from '@sanity/icons';

/**
 * Advanced Asset Management Plugin
 * Provides better organization, tagging, and metadata for assets
 */

export const assetManager = definePlugin({
  name: 'asset-manager',
  schema: {
    types: [
      {
        name: 'assetMetadata',
        type: 'document',
        title: 'Asset Metadata',
        fields: [
          {
            name: 'asset',
            type: 'reference',
            to: [{ type: 'sanity.imageAsset' }, { type: 'sanity.fileAsset' }],
            title: 'Asset',
          },
          {
            name: 'tags',
            type: 'array',
            title: 'Tags',
            of: [{ type: 'string' }],
            options: {
              layout: 'tags',
            },
          },
          {
            name: 'category',
            type: 'string',
            title: 'Category',
            options: {
              list: [
                { title: 'Product Images', value: 'products' },
                { title: 'Team Photos', value: 'team' },
                { title: 'Equipment', value: 'equipment' },
                { title: 'Facilities', value: 'facilities' },
                { title: 'Marketing', value: 'marketing' },
                { title: 'Technical Diagrams', value: 'diagrams' },
                { title: 'Logos & Branding', value: 'branding' },
                { title: 'Other', value: 'other' },
              ],
            },
          },
          {
            name: 'usage',
            type: 'array',
            title: 'Used In',
            description: 'Where this asset is currently being used',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'documentType',
                    type: 'string',
                    title: 'Document Type',
                  },
                  {
                    name: 'documentId',
                    type: 'string',
                    title: 'Document ID',
                  },
                  {
                    name: 'field',
                    type: 'string',
                    title: 'Field Name',
                  },
                ],
              },
            ],
            readOnly: true,
          },
          {
            name: 'altTextSuggestions',
            type: 'array',
            title: 'Alt Text Suggestions',
            description: 'AI-generated alt text suggestions for accessibility',
            of: [{ type: 'string' }],
          },
          {
            name: 'seoOptimized',
            type: 'boolean',
            title: 'SEO Optimized',
            description: 'Has proper alt text and file name for SEO',
          },
        ],
      },
    ],
  },
});

// Helper functions for asset management
export const assetHelpers = {
  // Get all assets by category
  async getAssetsByCategory(client: any, category: string) {
    return await client.fetch(
      `*[_type == "assetMetadata" && category == $category]`,
      { category }
    );
  },

  // Get unused assets
  async getUnusedAssets(client: any) {
    return await client.fetch(
      `*[_type == "assetMetadata" && !defined(usage) || count(usage) == 0]`
    );
  },

  // Get assets by tag
  async getAssetsByTag(client: any, tag: string) {
    return await client.fetch(
      `*[_type == "assetMetadata" && $tag in tags]`,
      { tag }
    );
  },

  // Track asset usage
  async trackAssetUsage(
    client: any,
    assetId: string,
    documentType: string,
    documentId: string,
    field: string
  ) {
    // Find or create asset metadata
    const metadata = await client.fetch(
      `*[_type == "assetMetadata" && asset._ref == $assetId][0]`,
      { assetId }
    );

    const usageEntry = {
      documentType,
      documentId,
      field,
      _key: `${documentType}-${documentId}-${field}`,
    };

    if (metadata) {
      // Add usage to existing metadata
      await client
        .patch(metadata._id)
        .setIfMissing({ usage: [] })
        .append('usage', [usageEntry])
        .commit();
    } else {
      // Create new metadata
      await client.create({
        _type: 'assetMetadata',
        asset: { _type: 'reference', _ref: assetId },
        usage: [usageEntry],
      });
    }
  },
};

// Asset organization recommendations
export const assetRecommendations = {
  // Recommended image sizes
  imageSizes: {
    hero: { width: 1920, height: 1080, description: 'Hero/Banner images' },
    card: { width: 800, height: 600, description: 'Card thumbnails' },
    thumbnail: { width: 400, height: 300, description: 'Small thumbnails' },
    og: { width: 1200, height: 630, description: 'Social media sharing' },
  },

  // File naming conventions
  namingConventions: {
    pattern: /^[a-z0-9-]+$/,
    example: 'aerospace-component-machining-2024.jpg',
    rules: [
      'Use lowercase letters only',
      'Use hyphens instead of spaces',
      'Include descriptive keywords',
      'Add year if relevant',
      'Avoid special characters',
    ],
  },

  // Alt text best practices
  altTextGuidelines: [
    'Describe the image content concisely (125 characters max)',
    'Include relevant keywords naturally',
    'Mention important text visible in the image',
    'Describe actions or purpose, not just objects',
    'Avoid "image of" or "picture of" phrases',
  ],
};
