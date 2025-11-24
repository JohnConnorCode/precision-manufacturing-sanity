#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function fixEmptyImages() {
  console.log('🔧 Fixing Empty Image Fields in Sanity\n');

  // 1. Fix Image Showcase - add actual URLs
  console.log('1️⃣  Fixing image showcase images...');
  await client
    .patch('homepage')
    .set({
      'imageShowcase.images': [
        {
          _key: 'aerospace',
          src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=90',
          title: 'Aerospace Components',
          category: 'Turbine Blades',
          href: '/services/5-axis-machining'
        },
        {
          _key: 'defense',
          src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=1200&q=90',
          title: 'Defense Systems',
          category: 'ITAR Certified',
          href: '/services/adaptive-machining-technology'
        },
        {
          _key: 'metrology',
          src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=90',
          title: 'Precision Metrology',
          category: 'Quality Control',
          href: '/services/precision-metrology'
        }
      ]
    })
    .commit();

  console.log('   ✅ Image showcase fixed\n');

  // 2. Fix Hero Slides - remove empty slide or add image
  console.log('2️⃣  Fixing hero slides...');

  // Option: Remove the slides array entirely so fallback images are used
  await client
    .patch('homepage')
    .unset(['hero.slides'])
    .commit();

  console.log('   ✅ Hero slides unset (will use fallback images)\n');

  console.log('✨ ALL EMPTY IMAGES FIXED!\n');
  console.log('The site should now render without empty src warnings.');
}

fixEmptyImages().catch(console.error);
