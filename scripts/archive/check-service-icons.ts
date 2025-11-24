import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkServiceIcons() {
  const services = await client.fetch(`*[_type == 'service']{
    _id,
    title,
    icon,
    iconName,
    fullDescription
  }`);

  console.log('🔍 Checking service icon fields:\n');

  services.forEach((s: any) => {
    console.log(`${s.title}:`);
    console.log(`  icon field: ${s.icon || '❌ MISSING'}`);
    console.log(`  iconName field: ${s.iconName || '❌ MISSING'}`);
    console.log(`  fullDescription: ${s.fullDescription ? '✅ Present' : '❌ MISSING'}`);
    console.log();
  });

  // Check which field the frontend is expecting
  console.log('Note: The check script is looking for "icon" but frontend may use "iconName"');
}

checkServiceIcons().catch(console.error);