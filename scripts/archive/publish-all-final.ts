#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function publishAll() {
  console.log('🚀 Publishing all services and industries...\n');

  try {
    // Fetch all documents
    const services = await client.fetch(`*[_type == "service"]{_id, title, published}`);
    const industries = await client.fetch(`*[_type == "industry"]{_id, title, published}`);

    console.log(`Found ${services.length} services and ${industries.length} industries\n`);

    let updateCount = 0;

    // Publish services
    console.log('📝 Services:');
    for (const service of services) {
      if (service.published !== true) {
        await client.patch(service._id).set({ published: true }).commit();
        console.log(`  ✅ Published: ${service.title}`);
        updateCount++;
      } else {
        console.log(`  ⏭️  Already published: ${service.title}`);
      }
    }

    // Publish industries
    console.log('\n📝 Industries:');
    for (const industry of industries) {
      if (industry.published !== true) {
        await client.patch(industry._id).set({ published: true }).commit();
        console.log(`  ✅ Published: ${industry.title}`);
        updateCount++;
      } else {
        console.log(`  ⏭️  Already published: ${industry.title}`);
      }
    }

    console.log(`\n✨ SUCCESS! ${updateCount > 0 ? `Published ${updateCount} documents` : 'All content already published'}!`);
    console.log('\n🔍 Verifying...');
    
    const publishedServices = await client.fetch(`*[_type == "service" && published == true]{title}`);
    const publishedIndustries = await client.fetch(`*[_type == "industry" && published == true]{title}`);
    
    console.log(`\n✅ ${publishedServices.length} services now published`);
    console.log(`✅ ${publishedIndustries.length} industries now published`);
    console.log('\n🌐 Content will appear on:');
    console.log('   - http://localhost:3000/services');
    console.log('   - http://localhost:3000/industries');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.statusCode, error.response.statusMessage);
    }
    process.exit(1);
  }
}

publishAll();
