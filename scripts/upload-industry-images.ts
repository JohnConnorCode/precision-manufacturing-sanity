/**
 * Script to upload hero images for industries
 * Run with: npx tsx scripts/upload-industry-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// High-quality industry hero images from Unsplash
const industryImages: Record<string, { url: string; alt: string; attribution: string }> = {
  // Aerospace - jet engine/aircraft manufacturing
  'aerospace': {
    url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
    alt: 'Aerospace manufacturing - jet engine turbine precision components',
    attribution: 'Unsplash - Aerospace Industry'
  },
  // Defense - military aircraft/tactical manufacturing
  'defense': {
    url: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1920&q=80',
    alt: 'Defense manufacturing - precision military components',
    attribution: 'Unsplash - Defense Industry'
  },
  // Energy - power generation/industrial equipment
  'energy': {
    url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80',
    alt: 'Energy manufacturing - wind turbine power generation',
    attribution: 'Unsplash - Energy Industry'
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

async function updateIndustryWithImage(
  documentId: string,
  assetId: string,
  alt: string,
  attribution: string
): Promise<void> {
  await client
    .patch(documentId)
    .set({
      heroImage: {
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
  console.log('🏭 Industry Hero Image Upload Script');
  console.log('=====================================\n');

  // Get industries without hero images
  const industries = await client.fetch<Array<{ _id: string; title: string; slug: { current: string } }>>(
    `*[_type == "industry" && !defined(heroImage.asset)] { _id, title, slug }`
  );

  console.log(`Found ${industries.length} industries without hero images\n`);

  if (industries.length === 0) {
    console.log('All industries have hero images!');
    return;
  }

  const results: Array<{ title: string; success: boolean; error?: string }> = [];

  for (const industry of industries) {
    const slug = industry.slug?.current || '';
    console.log(`\n🏭 ${industry.title}`);
    console.log(`   Slug: ${slug}`);

    const imageData = industryImages[slug];
    if (!imageData) {
      console.log(`   ⚠️ No image mapping for this slug`);
      results.push({ title: industry.title, success: false, error: 'No image mapping' });
      continue;
    }

    try {
      const filename = `industry-${slug}-hero.jpg`;
      const assetId = await uploadImageToSanity(imageData.url, filename);
      await updateIndustryWithImage(industry._id, assetId, imageData.alt, imageData.attribution);

      console.log(`   ✅ Success! Asset ID: ${assetId}`);
      results.push({ title: industry.title, success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Failed: ${message}`);
      results.push({ title: industry.title, success: false, error: message });
    }
  }

  console.log('\n\n📊 Summary');
  console.log('==========');
  console.log(`Total processed: ${industries.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);

  if (results.some(r => r.success)) {
    console.log('\n✅ Successfully updated industries:');
    results.filter(r => r.success).forEach(r => console.log(`   - ${r.title}`));
  }

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed industries:');
    results.filter(r => !r.success).forEach(r => console.log(`   - ${r.title}: ${r.error}`));
  }
}

main().catch(console.error);
