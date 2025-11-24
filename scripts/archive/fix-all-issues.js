const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function fixAllIssues() {
  console.log('🔧 FIXING ALL ISSUES...\n');

  // 1. Unpublish legacy services
  console.log('1. Unpublishing legacy services...');
  const legacyServices = ['38627f97-5bcd-4c27-a570-dfbd0b6df7e3', '90cd7631-50b6-4966-b583-609f3180dab5'];
  for (const id of legacyServices) {
    await client.patch(id).set({ published: false }).commit();
    console.log(`   ✅ Unpublished service: ${id}`);
  }

  // 2. Delete empty duplicate industries (these are drafts with no data)
  console.log('\n2. Deleting empty duplicate industries...');
  const emptyIndustries = ['drafts.industry-2', 'drafts.industry-3'];
  for (const id of emptyIndustries) {
    await client.delete(id);
    console.log(`   ✅ Deleted industry: ${id}`);
  }

  // 3. Add CTA sections to all 3 industry pages
  console.log('\n3. Adding CTA sections to industry pages...');
  const industries = [
    { id: 'industry-1', slug: 'aerospace' },
    { id: '907034f3-2fbc-4ff5-b007-8092f4b4b1b6', slug: 'defense' },
    { id: 'dd2cb0ac-1b6c-4e73-bcb7-f0ba4477cac6', slug: 'energy' }
  ];

  for (const ind of industries) {
    await client.patch(ind.id).set({
      cta: {
        title: 'Partner with Industry Experts',
        description: `Ready to discuss your ${ind.slug} manufacturing requirements? Our team of experts is here to help you succeed.`,
        buttons: [
          { _key: 'cta-1', enabled: true, label: 'Request Quote', href: '/contact', variant: 'primary' },
          { _key: 'cta-2', enabled: true, label: 'View All Services', href: '/services', variant: 'secondary' }
        ]
      }
    }).commit();
    console.log(`   ✅ Added CTA to ${ind.slug} industry`);
  }

  // 4. Fix navigation service links
  console.log('\n4. Fixing navigation service links...');
  const navigation = await client.fetch(`*[_type == "navigation"][0]`);

  // Find and fix the service links
  const updatedMenuItems = navigation.menuItems.map(item => {
    if (item.name === 'Services' && item.children) {
      return {
        ...item,
        children: item.children.map(child => {
          if (child.name === 'Adaptive Machining') {
            return { ...child, href: '/services/adaptive-machining' };
          }
          if (child.name === 'Engineering Support') {
            return { ...child, href: '/services/engineering-services', name: 'Engineering Services' };
          }
          return child;
        })
      };
    }
    return item;
  });

  await client.patch('navigation').set({ menuItems: updatedMenuItems }).commit();
  console.log('   ✅ Fixed navigation service links');

  console.log('\n✅ ALL FIXES COMPLETE!\n');

  // Verification
  console.log('VERIFICATION:');
  const publishedServices = await client.fetch(`*[_type == "service" && published == true]{title, 'slug': slug.current} | order(title asc)`);
  console.log(`   Published services (${publishedServices.length}):`);
  publishedServices.forEach(s => console.log(`      - ${s.title} (/services/${s.slug})`));

  const publishedIndustries = await client.fetch(`*[_type == "industry" && published == true]{title, 'slug': slug.current, 'hasCta': defined(cta)} | order(title asc)`);
  console.log(`\n   Published industries (${publishedIndustries.length}):`);
  publishedIndustries.forEach(i => console.log(`      - ${i.title} (/industries/${i.slug}) - CTA: ${i.hasCta ? 'YES' : 'NO'}`));
}

fixAllIssues().catch(console.error);
