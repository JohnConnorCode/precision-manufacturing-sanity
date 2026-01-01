import { definePlugin } from 'sanity';

/**
 * Advanced Asset Management Plugin
 * Provides better organization, tagging, and metadata for assets
 */

export const assetManager = definePlugin({
  name: 'asset-manager',
  // Schema removed due to incompatibility with Sanity v3 internal types
  // The helper functions below can still be used for asset management
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
