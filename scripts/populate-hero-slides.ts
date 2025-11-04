import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function populateHeroSlides() {
  console.log('🚀 Populating Hero slides in Sanity...\n');

  // Hero slides data matching commit 03cbbe9
  const heroSlides = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=95',
      alt: 'Advanced 5-axis CNC machining center'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=2400&q=95',
      alt: 'Precision metrology and inspection'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=95',
      alt: 'Automated manufacturing systems'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=95',
      alt: 'Industrial engineering and process development'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=2400&q=95',
      alt: 'Defense and aerospace components manufacturing'
    }
  ];

  try {
    // Get homepage document
    const homepage = await client.fetch(`*[_type == "homepage"][0]`);

    if (!homepage) {
      console.error('❌ No homepage document found!');
      return;
    }

    console.log('✅ Found homepage document:', homepage._id);

    // Prepare slides array for Sanity
    const slidesArray = heroSlides.map(slide => ({
      _type: 'heroSlide',
      imageUrl: slide.imageUrl,
      imageAlt: slide.alt
    }));

    // Update homepage with Hero slides
    await client
      .patch(homepage._id)
      .set({
        'heroEnhanced.slides': slidesArray
      })
      .commit();

    console.log('\n✅ Hero slides populated successfully!');
    console.log(`   Added ${heroSlides.length} slides to heroEnhanced.slides`);
    console.log('\n🎉 Done! Refresh your frontend to see the Hero section.');

  } catch (error) {
    console.error('❌ Error populating Hero slides:', error);
    throw error;
  }
}

populateHeroSlides();
