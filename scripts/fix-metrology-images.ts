/**
 * Fix remaining metrology images that failed
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

async function main() {
  console.log('Fixing Metrology images...\n');

  // Get metrology service
  const metrology = await client.fetch<{ _id: string; capabilities: Array<{ _key: string; title: string }> }>(
    `*[_type == "service" && slug.current == "metrology"][0] { _id, capabilities }`
  );

  if (!metrology) {
    console.log('Metrology service not found');
    return;
  }

  // Fix hero image
  console.log('1. Fixing hero image...');
  const heroUrl = 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=1920&q=80';
  const heroResponse = await fetch(heroUrl);
  if (heroResponse.ok) {
    const buffer = Buffer.from(await heroResponse.arrayBuffer());
    console.log(`   Uploading (${(buffer.length / 1024).toFixed(1)} KB)...`);
    const heroAsset = await client.assets.upload('image', buffer, {
      filename: 'metrology-hero.jpg',
      contentType: 'image/jpeg'
    });
    await client.patch(metrology._id).set({
      heroImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: heroAsset._id },
        alt: 'CMM inspection and metrology services'
      }
    }).commit();
    console.log('   ✅ Hero image fixed');
  } else {
    console.log('   ❌ Failed to fetch hero image');
  }

  // Fix capability 4 image
  console.log('2. Fixing capability 4 image...');
  if (metrology.capabilities && metrology.capabilities[3]) {
    const capUrl = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80';
    const capResponse = await fetch(capUrl);
    if (capResponse.ok) {
      const buffer = Buffer.from(await capResponse.arrayBuffer());
      console.log(`   Uploading (${(buffer.length / 1024).toFixed(1)} KB)...`);
      const capAsset = await client.assets.upload('image', buffer, {
        filename: 'metrology-cap-4.jpg',
        contentType: 'image/jpeg'
      });
      await client.patch(metrology._id).set({
        [`capabilities[_key=="${metrology.capabilities[3]._key}"].image`]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: capAsset._id },
          alt: 'Surface measurement and inspection'
        }
      }).commit();
      console.log('   ✅ Capability 4 image fixed');
    }
  }

  console.log('\n✅ Metrology images fixed!');
}

main().catch(console.error);
