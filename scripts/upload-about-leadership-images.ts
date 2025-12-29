/**
 * Script to upload Sanity images for About page leadership team
 * Run with: npx tsx scripts/upload-about-leadership-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// Professional headshot images - same ones used for teamMembers
const leadershipImages: Record<string, { url: string; alt: string }> = {
  'John Anderson': {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    alt: 'John Anderson, Chief Executive Officer'
  },
  'Sarah Mitchell': {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    alt: 'Sarah Mitchell, Chief Operating Officer'
  },
  'David Chen': {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'David Chen, Chief Technology Officer'
  },
  'Maria Rodriguez': {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    alt: 'Maria Rodriguez, Director of Quality & Compliance'
  }
};

async function uploadImageToSanity(imageUrl: string, filename: string): Promise<string> {
  console.log(`  Downloading: ${imageUrl.substring(0, 60)}...`);

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(`  Uploading to Sanity (${(buffer.length / 1024).toFixed(1)} KB)...`);

  const asset = await client.assets.upload('image', buffer, {
    filename: filename,
    contentType: 'image/jpeg'
  });

  return asset._id;
}

async function main() {
  console.log('👔 About Page Leadership Image Upload Script');
  console.log('=============================================\n');

  // Get the about document
  const about = await client.fetch<{ _id: string; leadership: { team: Array<{ name: string; title: string; photo?: { asset?: { _ref: string } } }> } }>(
    `*[_type == "about"][0] { _id, leadership { team[] { name, title, photo } } }`
  );

  if (!about) {
    console.log('No about document found!');
    return;
  }

  const team = about.leadership?.team || [];
  console.log(`Found ${team.length} leadership team members\n`);

  const results: Array<{ name: string; success: boolean; error?: string }> = [];

  for (let i = 0; i < team.length; i++) {
    const member = team[i];
    console.log(`\n👤 ${member.name}`);
    console.log(`   Title: ${member.title}`);

    // Skip if already has Sanity image
    if (member.photo?.asset?._ref) {
      console.log(`   ✅ Already has Sanity image`);
      results.push({ name: member.name, success: true });
      continue;
    }

    const imageData = leadershipImages[member.name];
    if (!imageData) {
      console.log(`   ⚠️ No image mapping for: ${member.name}`);
      results.push({ name: member.name, success: false, error: 'No image mapping' });
      continue;
    }

    try {
      const filename = `leadership-${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const assetId = await uploadImageToSanity(imageData.url, filename);

      // Update the specific team member's photo in the about document
      await client
        .patch(about._id)
        .set({
          [`leadership.team[${i}].photo`]: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            },
            alt: imageData.alt
          }
        })
        .commit();

      console.log(`   ✅ Success! Asset ID: ${assetId}`);
      results.push({ name: member.name, success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Failed: ${message}`);
      results.push({ name: member.name, success: false, error: message });
    }
  }

  console.log('\n\n📊 Summary');
  console.log('==========');
  console.log(`Total processed: ${team.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);

  if (results.some(r => r.success)) {
    console.log('\n✅ Successfully updated leadership:');
    results.filter(r => r.success).forEach(r => console.log(`   - ${r.name}`));
  }

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed leadership:');
    results.filter(r => !r.success).forEach(r => console.log(`   - ${r.name}: ${r.error}`));
  }
}

main().catch(console.error);
