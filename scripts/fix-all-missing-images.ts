/**
 * Comprehensive script to fix ALL missing images across the site
 * Run with: npx tsx scripts/fix-all-missing-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// High-quality manufacturing/industrial images from Unsplash
const imageLibrary = {
  // MetBase - software/database visualization
  metbase: {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
    alt: 'MetBase software data visualization dashboard',
  },
  // About page story - manufacturing facility
  aboutStory: {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
    alt: 'Precision manufacturing facility interior',
  },
  // 5-Axis CNC Machining
  '5-axis': {
    hero: {
      url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80',
      alt: '5-axis CNC machining center in operation',
    },
    capabilities: [
      { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', alt: 'Complex aerospace component machining' },
      { url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', alt: 'Precision prototype development' },
      { url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80', alt: 'Production machining operations' },
      { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', alt: 'Defense component manufacturing' },
    ]
  },
  // Metrology & Inspection
  metrology: {
    hero: {
      url: 'https://images.unsplash.com/photo-1581092160607-ee67df9b0b73?w=1920&q=80',
      alt: 'CMM coordinate measuring machine inspection',
    },
    capabilities: [
      { url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80', alt: 'CMM inspection process' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Measurement data analysis' },
      { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80', alt: 'Quality documentation' },
      { url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80', alt: 'Surface roughness measurement' },
    ]
  },
  // Adaptive Machining
  adaptive: {
    hero: {
      url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1920&q=80',
      alt: 'Adaptive machining with real-time monitoring',
    },
    capabilities: [
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', alt: 'In-process verification system' },
      { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', alt: 'Real-time adjustment technology' },
      { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80', alt: 'Closed-loop machining control' },
      { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', alt: 'Precision component verification' },
    ]
  },
  // Engineering Support
  engineering: {
    hero: {
      url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1920&q=80',
      alt: 'Engineering support and design consultation',
    },
    capabilities: [
      { url: 'https://images.unsplash.com/photo-1581092787765-e3feb951d987?w=800&q=80', alt: 'CAD/CAM design services' },
      { url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', alt: 'DFM analysis consultation' },
      { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', alt: 'Process optimization planning' },
      { url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80', alt: 'Technical documentation' },
    ]
  },
};

// Image upload cache to avoid duplicates
const uploadedImages: Record<string, string> = {};

async function uploadImageToSanity(imageUrl: string, filename: string): Promise<string> {
  // Check cache first
  if (uploadedImages[imageUrl]) {
    console.log(`  Using cached: ${filename}`);
    return uploadedImages[imageUrl];
  }

  console.log(`  Downloading: ${imageUrl.substring(0, 50)}...`);

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

  uploadedImages[imageUrl] = asset._id;
  return asset._id;
}

async function fixMetBasePage() {
  console.log('\n📊 Fixing MetBase page hero image...');

  const metbase = await client.fetch(`*[_type == "metbase"][0] { _id, "hasHero": defined(hero.backgroundImage.asset) }`);

  if (!metbase) {
    console.log('  ⚠️ No MetBase document found');
    return;
  }

  if (metbase.hasHero) {
    console.log('  ✅ Already has hero image');
    return;
  }

  try {
    const assetId = await uploadImageToSanity(imageLibrary.metbase.url, 'metbase-hero.jpg');
    await client.patch(metbase._id).set({
      'hero.backgroundImage': {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: imageLibrary.metbase.alt
      }
    }).commit();
    console.log('  ✅ MetBase hero image fixed');
  } catch (error) {
    console.log(`  ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function fixAboutStoryImage() {
  console.log('\n📖 Fixing About page story image...');

  const about = await client.fetch(`*[_type == "about"][0] { _id, "hasStory": defined(story.image.asset) }`);

  if (!about) {
    console.log('  ⚠️ No About document found');
    return;
  }

  if (about.hasStory) {
    console.log('  ✅ Already has story image');
    return;
  }

  try {
    const assetId = await uploadImageToSanity(imageLibrary.aboutStory.url, 'about-story.jpg');
    await client.patch(about._id).set({
      'story.image': {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt: imageLibrary.aboutStory.alt
      }
    }).commit();
    console.log('  ✅ About story image fixed');
  } catch (error) {
    console.log(`  ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function fixServiceImages() {
  console.log('\n🔧 Fixing Service page images...');

  const services = await client.fetch(`*[_type == "service"] {
    _id,
    title,
    slug,
    "hasHero": defined(heroImage.asset),
    "capCount": count(capabilities),
    capabilities[]{ _key, title, "hasImage": defined(image.asset) }
  }`);

  const slugToKey: Record<string, keyof typeof imageLibrary> = {
    '5-axis-machining': '5-axis',
    'metrology': 'metrology',
    'adaptive-machining': 'adaptive',
    'engineering': 'engineering',
  };

  for (const service of services) {
    const slug = service.slug?.current;
    const imageKey = slugToKey[slug];

    if (!imageKey || !imageLibrary[imageKey]) {
      console.log(`  ⚠️ No image mapping for: ${service.title}`);
      continue;
    }

    const images = imageLibrary[imageKey] as { hero: { url: string; alt: string }; capabilities: { url: string; alt: string }[] };
    console.log(`\n  📌 ${service.title}`);

    // Fix hero image
    if (!service.hasHero) {
      try {
        const assetId = await uploadImageToSanity(images.hero.url, `service-${slug}-hero.jpg`);
        await client.patch(service._id).set({
          heroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
            alt: images.hero.alt
          }
        }).commit();
        console.log('     ✅ Hero image added');
      } catch (error) {
        console.log(`     ❌ Hero failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      console.log('     ✅ Hero image exists');
    }

    // Fix capability images
    if (service.capabilities && service.capabilities.length > 0) {
      for (let i = 0; i < service.capabilities.length; i++) {
        const cap = service.capabilities[i];
        if (cap.hasImage) {
          console.log(`     ✅ Capability ${i + 1} has image`);
          continue;
        }

        if (i >= images.capabilities.length) {
          console.log(`     ⚠️ No image for capability ${i + 1}`);
          continue;
        }

        try {
          const capImage = images.capabilities[i];
          const assetId = await uploadImageToSanity(capImage.url, `service-${slug}-cap-${i + 1}.jpg`);
          await client.patch(service._id).set({
            [`capabilities[_key=="${cap._key}"].image`]: {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId },
              alt: capImage.alt
            }
          }).commit();
          console.log(`     ✅ Capability ${i + 1} image added`);
        } catch (error) {
          console.log(`     ❌ Capability ${i + 1} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }
  }
}

async function main() {
  console.log('🖼️  Comprehensive Image Fix Script');
  console.log('====================================');
  console.log('This will fix ALL missing images across the site.\n');

  await fixMetBasePage();
  await fixAboutStoryImage();
  await fixServiceImages();

  console.log('\n\n✅ All image fixes complete!');
  console.log('Run: npm run build && npm run start');
  console.log('To verify changes on the live site.');
}

main().catch(console.error);
