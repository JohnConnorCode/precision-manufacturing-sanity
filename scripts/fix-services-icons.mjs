import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
});

async function fixServicesIcons() {
  console.log('🔧 Fixing Services Icons...\n');

  // Get all services
  const services = await client.fetch('*[_type == "service"] | order(order asc) { _id, title, slug }');

  // Map each service to its correct icon
  const iconMapping = {
    '5-Axis Machining': 'Cog',
    'Adaptive Machining': 'Cpu',
    'Metrology Services': 'Gauge',
    'Engineering Services': 'Users'
  };

  for (const service of services) {
    const icon = iconMapping[service.title];

    if (icon) {
      console.log(`Updating ${service.title} → ${icon}`);

      await client
        .patch(service._id)
        .set({ iconName: icon })
        .commit();

      console.log(`  ✅ Updated\n`);
    } else {
      console.log(`  ⚠️  No icon mapping found for: ${service.title}\n`);
    }
  }

  console.log('\n✅ All services updated!');

  // Verify
  const updated = await client.fetch('*[_type == "service"] | order(order asc) { title, iconName }');
  console.log('\n📋 Verification:');
  updated.forEach(s => {
    console.log(`  ${s.title}: ${s.iconName || 'STILL MISSING'}`);
  });
}

fixServicesIcons().catch(console.error);
