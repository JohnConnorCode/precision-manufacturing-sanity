import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk80ZgAYy7yIfoJlvqcNLBUOGfMpYuB730iY9Mfx9bSlQ7nwzMNACjtXDzpAiS4xb0HSXayclaV3Y9hNHi9UXWPW3Raw70vCxd1mAtTOlEzTT7yUxMl1CK6AP6paFep4SYMEXp2uJPgmNBWnMgqdVBbItwu7tWIXCzwSvVJiOBWsk9paD806',
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
