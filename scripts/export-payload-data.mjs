/**
 * Export all data from Payload CMS to JSON files
 * Run from the ORIGINAL Payload repo: cd ../precision-manufacturing && node ../precision-manufacturing-sanity/scripts/export-payload-data.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output directory in the Sanity repo
const outputDir = path.join(__dirname, '../migrations');

async function exportPayloadData() {
  console.log('🚀 Starting Payload CMS data export...\n');

  try {
    // Dynamically import Payload config and setup
    const { getPayloadHMR } = await import('@payloadcms/next/utilities');
    const configPromise = await import('../payload.config.js').then(m => m.default);

    const payload = await getPayloadHMR({ config: configPromise });
    console.log('✅ Connected to Payload CMS\n');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Export collections
    const collections = ['services', 'industries', 'resources', 'team-members', 'media'];

    for (const collectionSlug of collections) {
      try {
        console.log(`📦 Exporting ${collectionSlug}...`);

        const result = await payload.find({
          collection: collectionSlug,
          limit: 1000,
          depth: 2, // Get related data
        });

        const outputPath = path.join(outputDir, `${collectionSlug}.json`);
        fs.writeFileSync(
          outputPath,
          JSON.stringify(result.docs, null, 2),
          'utf-8'
        );

        console.log(`   ✓ Exported ${result.docs.length} ${collectionSlug} → ${outputPath}\n`);
      } catch (error) {
        console.error(`   ✗ Error exporting ${collectionSlug}:`, error.message);
      }
    }

    // Export globals
    const globals = [
      'site-settings',
      'navigation',
      'homepage',
      'footer',
      'about',
      'contact',
      'careers',
      'terms',
      'supplier-requirements',
      'ui-text',
      'page-content',
    ];

    for (const globalSlug of globals) {
      try {
        console.log(`🌍 Exporting global: ${globalSlug}...`);

        const result = await payload.findGlobal({
          slug: globalSlug,
          depth: 2,
        });

        const outputPath = path.join(outputDir, `global-${globalSlug}.json`);
        fs.writeFileSync(
          outputPath,
          JSON.stringify(result, null, 2),
          'utf-8'
        );

        console.log(`   ✓ Exported ${globalSlug} → ${outputPath}\n`);
      } catch (error) {
        console.error(`   ✗ Error exporting ${globalSlug}:`, error.message);
      }
    }

    console.log('\n✅ Export complete!');
    console.log(`📁 All files saved to: ${outputDir}`);

  } catch (error) {
    console.error('\n❌ Export failed:', error);
    process.exit(1);
  }
}

exportPayloadData();
