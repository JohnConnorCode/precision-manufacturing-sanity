/**
 * Script to upload images for case studies missing featured images
 * Run with: npx tsx scripts/upload-case-study-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// High-quality case study images from Unsplash
const caseStudyImages: Record<string, { url: string; alt: string; attribution: string }> = {
  // GE90 Turbine Blade Assembly - Aerospace/jet engine
  'aerospace-engine-components': {
    url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80',
    alt: 'Jet engine turbine showing precision manufacturing',
    attribution: 'Unsplash - Aerospace Engineering'
  },
  // F-35 Fighter Component Program - Defense/military
  'defense-fighter-components': {
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80',
    alt: 'Military fighter jet showing advanced manufacturing',
    attribution: 'Unsplash - Defense Aviation'
  },
  // Nuclear Reactor Control System - Energy/nuclear
  'energy-nuclear-components': {
    url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1600&q=80',
    alt: 'Nuclear power facility control systems',
    attribution: 'Unsplash - Energy Infrastructure'
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

async function updateCaseStudyWithImage(
  documentId: string,
  assetId: string,
  alt: string,
  attribution: string
): Promise<void> {
  await client
    .patch(documentId)
    .set({
      featuredImage: {
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
  console.log('📸 Case Study Image Upload Script');
  console.log('==================================\n');

  // Get case studies without featured images
  const caseStudies = await client.fetch<Array<{ _id: string; title: string; slug: { current: string } }>>(
    `*[_type == "caseStudy" && !defined(featuredImage.asset)] { _id, title, slug }`
  );

  console.log(`Found ${caseStudies.length} case studies without images\n`);

  if (caseStudies.length === 0) {
    console.log('All case studies have images!');
    return;
  }

  const results: Array<{ title: string; success: boolean; error?: string }> = [];

  for (const caseStudy of caseStudies) {
    const slug = caseStudy.slug?.current || '';
    console.log(`\n📄 ${caseStudy.title}`);
    console.log(`   Slug: ${slug}`);

    const imageData = caseStudyImages[slug];
    if (!imageData) {
      console.log(`   ⚠️ No image mapping for this slug`);
      results.push({ title: caseStudy.title, success: false, error: 'No image mapping' });
      continue;
    }

    try {
      const filename = `case-study-${slug}.jpg`;
      const assetId = await uploadImageToSanity(imageData.url, filename);
      await updateCaseStudyWithImage(caseStudy._id, assetId, imageData.alt, imageData.attribution);

      console.log(`   ✅ Success! Asset ID: ${assetId}`);
      results.push({ title: caseStudy.title, success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Failed: ${message}`);
      results.push({ title: caseStudy.title, success: false, error: message });
    }
  }

  console.log('\n\n📊 Summary');
  console.log('==========');
  console.log(`Total processed: ${caseStudies.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);

  if (results.some(r => r.success)) {
    console.log('\n✅ Successfully updated case studies:');
    results.filter(r => r.success).forEach(r => console.log(`   - ${r.title}`));
  }

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed case studies:');
    results.filter(r => !r.success).forEach(r => console.log(`   - ${r.title}: ${r.error}`));
  }
}

main().catch(console.error);
