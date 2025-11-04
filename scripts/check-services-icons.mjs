import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false
});

async function checkServicesIcons() {
  console.log('🔧 Checking Services Icons in Sanity...\n');

  const services = await client.fetch('*[_type == "service"] | order(order asc) { title, iconName, slug }');

  console.log(`Found ${services.length} services:\n`);
  services.forEach((service, i) => {
    console.log(`  [${i}] ${service.title}`);
    console.log(`      Icon: ${service.iconName || 'MISSING! ❌'}`);
    console.log(`      Slug: ${service.slug?.current || 'N/A'}`);
    console.log('');
  });

  // Check what icons should be
  const expectedIcons = {
    '5-Axis Machining': 'Cog',
    'Adaptive Machining': 'Cpu',
    'Metrology Services': 'Gauge',
    'Engineering Services': 'Users'
  };

  console.log('\n📋 Expected Icons:');
  Object.entries(expectedIcons).forEach(([title, icon]) => {
    console.log(`  ${title}: ${icon}`);
  });
}

checkServicesIcons().catch(console.error);
