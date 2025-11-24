#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function fixHomepageIndustries() {
  console.log('🔧 Fixing Homepage Industry References\n');

  // Get the 3 published industries
  const industries = await client.fetch(`
    *[_type == "industry" && !(_id in path("drafts.**"))] | order(title asc) {
      _id,
      title
    }
  `);

  console.log(`Found ${industries.length} published industries:`);
  industries.forEach((ind: any) => console.log(`  - ${ind.title} (${ind._id})`));

  // Update homepage industries section
  await client
    .patch('drafts.homepage')
    .set({
      'industriesSection.industries': industries.map((ind: any, idx: number) => ({
        _type: 'reference',
        _ref: ind._id,
        _key: `industry-${idx}`
      }))
    })
    .commit();

  console.log('\n✅ Homepage industry references updated!');
  console.log('\nPublishing homepage...');

  // Publish homepage
  const homepage = await client.fetch(`*[_id == "drafts.homepage"][0]`);
  await client.createOrReplace({ ...homepage, _id: 'homepage', _type: 'homepage' });

  console.log('✅ Homepage published!');
}

fixHomepageIndustries().catch(console.error);
