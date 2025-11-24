#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function fixServicePages() {
  console.log('🔧 FIXING SERVICE PAGE RENDERING...\n');

  // Get all published services
  const services = await client.fetch(`*[_type == 'service' && published == true] {
    _id,
    title,
    'slug': slug.current,
    capabilities,
    process
  }`);

  for (const service of services) {
    console.log(`Fixing ${service.title}...`);

    // Rename capabilities → services
    // Rename process.steps → processes
    await client.patch(service._id).set({
      services: service.capabilities || [],
      processes: service.process?.steps || []
    }).commit();

    console.log(`   ✅ Fixed ${service.title}`);
  }

  console.log('\n✅ ALL SERVICE PAGES FIXED!\n');

  // Verify
  const updated = await client.fetch(`*[_type == 'service' && published == true] | order(title asc) {
    title,
    'slug': slug.current,
    'hasStatistics': defined(statistics),
    'hasServices': defined(services),
    'servicesCount': count(services),
    'hasMaterials': defined(materials),
    'hasProcesses': defined(processes),
    'processesCount': count(processes),
    'hasQualityStandards': defined(qualityStandards)
  }`);

  console.log('VERIFICATION:');
  updated.forEach((s: any) => {
    console.log(`\n${s.title} (/services/${s.slug}):`);
    console.log(`   Statistics: ${s.hasStatistics ? 'YES' : 'NO'}`);
    console.log(`   Services: ${s.hasServices ? 'YES' : 'NO'} (${s.servicesCount || 0})`);
    console.log(`   Materials: ${s.hasMaterials ? 'YES' : 'NO'}`);
    console.log(`   Processes: ${s.hasProcesses ? 'YES' : 'NO'} (${s.processesCount || 0})`);
    console.log(`   Quality Standards: ${s.hasQualityStandards ? 'YES' : 'NO'}`);
  });
}

fixServicePages().catch(console.error);
