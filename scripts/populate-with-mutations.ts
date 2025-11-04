import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function populateWithMutations() {
  console.log('📝 Populating Missing Data Using Mutations\n');

  try {
    // 1. Get existing homepage document
    console.log('1. Fetching existing homepage...');
    const homepage = await client.fetch(`*[_type == "homepage"][0]`);

    if (!homepage) {
      console.error('❌ Homepage document not found!');
      process.exit(1);
    }

    console.log(`   ✅ Found homepage (ID: ${homepage._id})`);

    // 2. Update homepage with Hero CTAs
    console.log('\n2. Updating Homepage Hero CTAs...');

    const updatedHomepage = {
      ...homepage,
      heroEnhanced: {
        ...homepage.heroEnhanced,
        ctaPrimary: {
          text: 'Get Quote',
          href: '/contact?interest=quote'
        },
        ctaSecondary: {
          text: 'View Capabilities',
          href: '/services'
        }
      }
    };

    await client.createOrReplace(updatedHomepage);
    console.log('   ✅ Homepage Hero CTAs updated');

    // 3. Update Services with images
    console.log('\n3. Updating Service Images...');

    const services = await client.fetch(`*[_type == "service"] | order(order asc)`);

    const serviceUpdates = [
      { slug: '5-axis-machining', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=95', alt: '5-axis CNC machining center' },
      { slug: 'adaptive-machining', url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=95', alt: 'Adaptive machining systems' },
      { slug: 'metrology', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=2400&q=95', alt: 'CMM metrology inspection' },
      { slug: 'engineering', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=2400&q=95', alt: 'Engineering support services' }
    ];

    for (const service of services) {
      const update = serviceUpdates.find(u => service.slug?.current === u.slug);
      if (update) {
        const updated = {
          ...service,
          hero: {
            ...service.hero,
            backgroundImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: `image-${update.slug}` // Placeholder
              },
              alt: update.alt,
              // Store URL as custom field since we can't upload directly
              url: update.url
            }
          }
        };

        await client.createOrReplace(updated);
        console.log(`   ✅ ${service.title} image updated`);
      }
    }

    // 4. Update Industries with images
    console.log('\n4. Updating Industry Images...');

    const industries = await client.fetch(`*[_type == "industry"] | order(order asc)`);

    const industryUpdates = [
      { slug: 'aerospace', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=2400&q=95', alt: 'Aerospace manufacturing' },
      { slug: 'defense', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=95', alt: 'Defense manufacturing' },
      { slug: 'energy', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=2400&q=95', alt: 'Energy sector turbines' }
    ];

    for (const industry of industries) {
      const update = industryUpdates.find(u => industry.slug?.current === u.slug);
      if (update) {
        const updated = {
          ...industry,
          hero: {
            ...industry.hero,
            backgroundImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: `image-${update.slug}`
              },
              alt: update.alt,
              url: update.url
            }
          }
        };

        await client.createOrReplace(updated);
        console.log(`   ✅ ${industry.title} image updated`);
      }
    }

    // 5. Verify
    console.log('\n5. Verifying Updates...');
    const verifyHomepage = await client.fetch(`*[_type == "homepage"][0]{
      "ctaPrimary": heroEnhanced.ctaPrimary
    }`);

    console.log(`   Hero CTA: ${verifyHomepage?.ctaPrimary?.text || '❌ FAILED'}`);

    console.log('\n✅ DATA POPULATION COMPLETE!');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.statusCode === 403) {
      console.log('\n💡 Token lacks permissions. You need to:');
      console.log('   1. Go to manage.sanity.io');
      console.log('   2. API Settings → New Token');
      console.log('   3. Select "Editor" role');
      console.log('   4. Update SANITY_API_WRITE_TOKEN in .env.local');
    }
    process.exit(1);
  }
}

populateWithMutations();
