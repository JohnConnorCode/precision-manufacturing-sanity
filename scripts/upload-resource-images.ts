/**
 * Script to upload stock images to Sanity for resources missing featured images
 * Run with: npx tsx scripts/upload-resource-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// Curated stock images from Unsplash for manufacturing resources
// All are free for commercial use under Unsplash license
const stockImages: Record<string, { url: string; alt: string; attribution: string }> = {
  // Quality & Compliance category
  'quality-compliance': {
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80',
    alt: 'Quality control inspector reviewing components',
    attribution: 'Unsplash - Manufacturing Quality Control'
  },
  // Manufacturing Processes category
  'manufacturing-processes': {
    url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80',
    alt: 'CNC machining precision manufacturing',
    attribution: 'Unsplash - CNC Manufacturing'
  },
  // Material Science category
  'material-science': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    alt: 'Metal materials and alloy samples',
    attribution: 'Unsplash - Material Science'
  },
  // Industry Applications category
  'industry-applications': {
    url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1600&q=80',
    alt: 'Aerospace manufacturing components',
    attribution: 'Unsplash - Aerospace Industry'
  }
};

// Additional specific images for common topics
const topicImages: Record<string, { url: string; alt: string; attribution: string }> = {
  'cmm': {
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80',
    alt: 'CMM coordinate measuring machine inspection',
    attribution: 'Unsplash - CMM Inspection'
  },
  'fmea': {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    alt: 'Risk analysis and data charts',
    attribution: 'Unsplash - Risk Management'
  },
  'supplier': {
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80',
    alt: 'Supply chain and quality management',
    attribution: 'Unsplash - Supply Chain'
  },
  'as9100': {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    alt: 'Quality documentation and certification',
    attribution: 'Unsplash - Quality Certification'
  },
  'titanium': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    alt: 'Titanium and specialty metals',
    attribution: 'Unsplash - Specialty Metals'
  },
  'aerospace': {
    url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80',
    alt: 'Aerospace manufacturing and components',
    attribution: 'Unsplash - Aerospace Components'
  },
  'surface': {
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    alt: 'Surface finishing and measurement',
    attribution: 'Unsplash - Surface Treatment'
  },
  'temperature': {
    url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80',
    alt: 'High temperature manufacturing',
    attribution: 'Unsplash - High Temperature'
  }
};

function getImageForResource(title: string, category: string): { url: string; alt: string; attribution: string } {
  const lowerTitle = title.toLowerCase();

  // Check for specific topic matches
  for (const [topic, image] of Object.entries(topicImages)) {
    if (lowerTitle.includes(topic)) {
      return image;
    }
  }

  // Fall back to category-based image
  return stockImages[category] || stockImages['manufacturing-processes'];
}

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

async function updateResourceWithImage(
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
  console.log('🖼️  Resource Image Upload Script');
  console.log('================================\n');

  // Get resources without featured images
  const resources = await client.fetch<Array<{ _id: string; title: string; category: string }>>(
    `*[_type == "resource" && !defined(featuredImage.asset)] { _id, title, category }`
  );

  console.log(`Found ${resources.length} resources without images\n`);

  if (resources.length === 0) {
    console.log('All resources have images!');
    return;
  }

  // Process all remaining resources
  const batch = resources;
  console.log(`Processing batch of ${batch.length} resources...\n`);

  const results: Array<{ title: string; success: boolean; error?: string }> = [];

  for (const resource of batch) {
    console.log(`\n📄 ${resource.title}`);
    console.log(`   Category: ${resource.category}`);

    try {
      const imageData = getImageForResource(resource.title, resource.category);
      const filename = `${resource._id.substring(0, 8)}-featured.jpg`;

      const assetId = await uploadImageToSanity(imageData.url, filename);
      await updateResourceWithImage(resource._id, assetId, imageData.alt, imageData.attribution);

      console.log(`   ✅ Success! Asset ID: ${assetId}`);
      results.push({ title: resource.title, success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Failed: ${message}`);
      results.push({ title: resource.title, success: false, error: message });
    }
  }

  console.log('\n\n📊 Summary');
  console.log('==========');
  console.log(`Total processed: ${batch.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);

  if (results.some(r => r.success)) {
    console.log('\n✅ Successfully updated resources:');
    results.filter(r => r.success).forEach(r => console.log(`   - ${r.title}`));
  }

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed resources:');
    results.filter(r => !r.success).forEach(r => console.log(`   - ${r.title}: ${r.error}`));
  }

  console.log('\n🔗 View results in Sanity Studio:');
  console.log('   http://localhost:3000/studio/structure/resources');
}

main().catch(console.error);
