#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function publishAll() {
  console.log('🚀 Publishing all services and industries...\n');

  try {
    // Fetch all documents
    const services = await client.fetch(`*[_type == "service"]{_id, title, published}`);
    const industries = await client.fetch(`*[_type == "industry"]{_id, title, published}`);

    console.log(`Found ${services.length} services and ${industries.length} industries\n`);

    // Publish services
    console.log('📝 Publishing services...');
    for (const service of services) {
      if (service.published !== true) {
        await client.patch(service._id).set({ published: true }).commit();
        console.log(`  ✅ Published: ${service.title}`);
      } else {
        console.log(`  ⏭️  Already published: ${service.title}`);
      }
    }

    // Publish industries
    console.log('\n📝 Publishing industries...');
    for (const industry of industries) {
      if (industry.published !== true) {
        await client.patch(industry._id).set({ published: true }).commit();
        console.log(`  ✅ Published: ${industry.title}`);
      } else {
        console.log(`  ⏭️  Already published: ${industry.title}`);
      }
    }

    console.log('\n✨ All content published successfully!');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

publishAll();
