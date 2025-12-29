/**
 * Script to upload professional headshots for team members
 * Using diverse professional portraits from Unsplash
 * Run with: npx tsx scripts/upload-team-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// Professional headshot images from Unsplash - business/corporate portraits
// Matched to team member names and roles
const teamImages: Record<string, { url: string; alt: string; attribution: string }> = {
  // John Smith - President & CEO - mature professional male
  'team-member-4': {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    alt: 'John Smith, President & CEO',
    attribution: 'Unsplash - Professional Portrait'
  },
  // Sarah Johnson - VP of Engineering - professional female engineer
  'team-member-3': {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    alt: 'Sarah Johnson, VP of Engineering',
    attribution: 'Unsplash - Professional Portrait'
  },
  // Michael Chen - Director of Metrology - Asian professional male
  'team-member-2': {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'Michael Chen, Director of Metrology',
    attribution: 'Unsplash - Professional Portrait'
  },
  // Emily Rodriguez - Operations Manager - Hispanic professional female
  'team-member-1': {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    alt: 'Emily Rodriguez, Operations Manager',
    attribution: 'Unsplash - Professional Portrait'
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

async function updateTeamMemberWithImage(
  documentId: string,
  assetId: string,
  alt: string,
  attribution: string
): Promise<void> {
  await client
    .patch(documentId)
    .set({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        },
        alt: alt,
        attribution: attribution
      }
    })
    .commit();
}

async function main() {
  console.log('👥 Team Member Image Upload Script');
  console.log('===================================\n');

  // Get team members without images
  const teamMembers = await client.fetch<Array<{ _id: string; name: string; title: string }>>(
    `*[_type == "teamMember" && !defined(image.asset)] { _id, name, title }`
  );

  console.log(`Found ${teamMembers.length} team members without images\n`);

  if (teamMembers.length === 0) {
    console.log('All team members have images!');
    return;
  }

  const results: Array<{ name: string; success: boolean; error?: string }> = [];

  for (const member of teamMembers) {
    console.log(`\n👤 ${member.name}`);
    console.log(`   Title: ${member.title}`);

    const imageData = teamImages[member._id];
    if (!imageData) {
      console.log(`   ⚠️ No image mapping for ID: ${member._id}`);
      results.push({ name: member.name, success: false, error: 'No image mapping' });
      continue;
    }

    try {
      const filename = `team-${member._id}.jpg`;
      const assetId = await uploadImageToSanity(imageData.url, filename);
      await updateTeamMemberWithImage(member._id, assetId, imageData.alt, imageData.attribution);

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
  console.log(`Total processed: ${teamMembers.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);

  if (results.some(r => r.success)) {
    console.log('\n✅ Successfully updated team members:');
    results.filter(r => r.success).forEach(r => console.log(`   - ${r.name}`));
  }

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed team members:');
    results.filter(r => !r.success).forEach(r => console.log(`   - ${r.name}: ${r.error}`));
  }
}

main().catch(console.error);
