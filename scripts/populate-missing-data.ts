import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function populateAllMissingData() {
  console.log('📝 Populating ALL Missing Data from Original Static Site\n');

  try {
    // 1. POPULATE HOMEPAGE HERO CTAs
    console.log('1. Populating Homepage Hero CTAs...');
    await client
      .patch('homepage')
      .set({
        'heroEnhanced.ctaPrimary': {
          text: 'Get Quote',
          href: '/contact?interest=quote'
        },
        'heroEnhanced.ctaSecondary': {
          text: 'View Capabilities',
          href: '/services'
        }
      })
      .commit();
    console.log('   ✅ Hero CTAs populated');

    // 2. POPULATE SERVICE IMAGES
    console.log('\n2. Populating Service Images...');

    const serviceImages = [
      {
        slug: '5-axis-machining',
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=95',
        alt: '5-axis CNC machining center - complex geometries with precision'
      },
      {
        slug: 'adaptive-machining',
        imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=95',
        alt: 'Adaptive machining - real-time adjustments for zero defects'
      },
      {
        slug: 'metrology',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=2400&q=95',
        alt: 'CMM metrology and inspection - dimensional verification'
      },
      {
        slug: 'engineering',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=2400&q=95',
        alt: 'Engineering support - design optimization and manufacturing consultation'
      }
    ];

    for (const service of serviceImages) {
      const serviceDoc = await client.fetch(`*[_type == "service" && slug.current == $slug][0]._id`, {
        slug: service.slug
      });

      if (serviceDoc) {
        await client
          .patch(serviceDoc)
          .set({
            'hero.backgroundImage': {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-placeholder' // Will be URL
              },
              alt: service.alt,
              url: service.imageUrl
            }
          })
          .commit();
        console.log(`   ✅ ${service.slug} image added`);
      }
    }

    // 3. POPULATE INDUSTRY IMAGES
    console.log('\n3. Populating Industry Images...');

    const industryImages = [
      {
        slug: 'aerospace',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=2400&q=95',
        alt: 'Aerospace manufacturing - precision components for aircraft and space'
      },
      {
        slug: 'defense',
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=95',
        alt: 'Defense manufacturing - mission-critical components'
      },
      {
        slug: 'energy',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=2400&q=95',
        alt: 'Energy sector - industrial gas turbine components'
      }
    ];

    for (const industry of industryImages) {
      const industryDoc = await client.fetch(`*[_type == "industry" && slug.current == $slug][0]._id`, {
        slug: industry.slug
      });

      if (industryDoc) {
        await client
          .patch(industryDoc)
          .set({
            'hero.backgroundImage': {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-placeholder'
              },
              alt: industry.alt,
              url: industry.imageUrl
            }
          })
          .commit();
        console.log(`   ✅ ${industry.slug} image added`);
      }
    }

    // 4. VERIFY POPULATED DATA
    console.log('\n4. Verifying Data Population...');

    const homepage = await client.fetch(`*[_type == "homepage"][0]{
      "ctaPrimary": heroEnhanced.ctaPrimary,
      "ctaSecondary": heroEnhanced.ctaSecondary
    }`);

    console.log(`   Hero CTA Primary: ${homepage?.ctaPrimary?.text || '❌ MISSING'}`);
    console.log(`   Hero CTA Secondary: ${homepage?.ctaSecondary?.text || '❌ MISSING'}`);

    const services = await client.fetch(`*[_type == "service"] | order(order asc){
      title,
      "hasImage": defined(hero.backgroundImage)
    }`);

    console.log(`\n   Services with images: ${services.filter((s: any) => s.hasImage).length}/${services.length}`);
    services.forEach((s: any) => {
      console.log(`   - ${s.title}: ${s.hasImage ? '✅' : '❌'}`);
    });

    const industries = await client.fetch(`*[_type == "industry"] | order(order asc){
      title,
      "hasImage": defined(hero.backgroundImage)
    }`);

    console.log(`\n   Industries with images: ${industries.filter((i: any) => i.hasImage).length}/${industries.length}`);
    industries.forEach((i: any) => {
      console.log(`   - ${i.title}: ${i.hasImage ? '✅' : '❌'}`);
    });

    console.log('\n✅ DATA POPULATION COMPLETE!');
    console.log('\n📊 Next Steps:');
    console.log('   1. Check Studio to verify all fields are populated');
    console.log('   2. Upload actual service/industry images to replace Unsplash URLs');
    console.log('   3. Test frontend to ensure all content displays correctly');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

populateAllMissingData();
