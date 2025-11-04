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

async function createServicesWithIds() {
  try {
    // Read the JSON file
    const servicesJson = readFileSync(join(__dirname, 'services-to-create.json'), 'utf-8');
    const services = JSON.parse(servicesJson);

    console.log(`Creating ${services.length} services with explicit IDs...`);

    for (const service of services) {
      // Generate a deterministic ID based on the slug
      const slug = service.slug.current;
      const docId = `service-${slug}`;

      const docWithId = {
        _id: docId,
        ...service,
      };

      try {
        // First, check if document exists
        const existing = await client.fetch(`*[_id == "${docId}"]`);

        if (existing && existing.length > 0) {
          // Update existing document
          const updated = await client.patch(docId).set(service).commit();
          console.log(`✅ Updated: ${service.title} (${docId})`);
        } else {
          // Create new document
          const created = await client.create(docWithId);
          console.log(`✅ Created: ${service.title} (${created._id})`);
        }
      } catch (error) {
        console.error(`❌ Failed to process ${service.title}:`, error.message);
      }
    }

    console.log('\n✨ Service creation/update complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

createServicesWithIds();
