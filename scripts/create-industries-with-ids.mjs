import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function createIndustriesWithIds() {
  try {
    // Read the JSON file
    const industriesJson = readFileSync(join(__dirname, 'industries-to-create.json'), 'utf-8');
    const industries = JSON.parse(industriesJson);

    console.log(`Creating ${industries.length} industries with explicit IDs...`);

    for (const industry of industries) {
      // Generate a deterministic ID based on the slug
      const slug = industry.slug.current;
      const docId = `industry-${slug}`;

      const docWithId = {
        _id: docId,
        ...industry,
      };

      try {
        // First, check if document exists
        const existing = await client.fetch(`*[_id == "${docId}"]`);

        if (existing && existing.length > 0) {
          // Update existing document
          const updated = await client.patch(docId).set(industry).commit();
          console.log(`✅ Updated: ${industry.title} (${docId})`);
        } else {
          // Create new document
          const created = await client.create(docWithId);
          console.log(`✅ Created: ${industry.title} (${created._id})`);
        }
      } catch (error) {
        console.error(`❌ Failed to process ${industry.title}:`, error.message);
      }
    }

    console.log('\n✨ Industry creation/update complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

createIndustriesWithIds();
