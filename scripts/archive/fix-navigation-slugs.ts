#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function fixNavigationSlugs() {
  console.log('🔧 Fixing Navigation Slugs\n');

  // Get current navigation
  const nav = await client.fetch(`*[_type == "navigation"][0]`);

  console.log('Current Services menu items:');
  nav.menuItems[0].children.forEach((item: any) => {
    console.log(`  - ${item.name}: ${item.href}`);
  });

  // Update the slugs to match actual service slugs
  const updatedMenuItems = [...nav.menuItems];

  // Services menu (index 0)
  updatedMenuItems[0] = {
    ...updatedMenuItems[0],
    children: updatedMenuItems[0].children.map((child: any) => {
      if (child.href === '/services/adaptive-machining') {
        return { ...child, href: '/services/adaptive-machining-technology' };
      }
      if (child.href === '/services/metrology') {
        return { ...child, href: '/services/precision-metrology' };
      }
      if (child.href === '/services/engineering') {
        return { ...child, href: '/services/comprehensive-engineering-services' };
      }
      return child;
    })
  };

  // Update navigation
  await client
    .patch('navigation')
    .set({ menuItems: updatedMenuItems })
    .commit();

  console.log('\n✅ Navigation slugs updated!');
  console.log('\nUpdated Services menu items:');
  updatedMenuItems[0].children.forEach((item: any) => {
    console.log(`  - ${item.name}: ${item.href}`);
  });
}

fixNavigationSlugs().catch(console.error);
