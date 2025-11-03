import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk80ZgAYy7yIfoJlvqcNLBUOGfMpYuB730iY9Mfx9bSlQ7nwzMNACjtXDzpAiS4xb0HSXayclaV3Y9hNHi9UXWPW3Raw70vCxd1mAtTOlEzTT7yUxMl1CK6AP6paFep4SYMEXp2uJPgmNBWnMgqdVBbItwu7tWIXCzwSvVJiOBWsk9paD806',
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
