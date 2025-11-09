import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function debug() {
  console.log('\n=== Testing Updated Query ===\n');

  const query = `*[_type == "homepage"][0] {
    resourcesSection {
      header {
        badge,
        title,
        description
      },
      backgroundColor,
      titleColor,
      badgeColor,
      featuredSeries[] {
        _key,
        title,
        slug,
        description,
        articleCount,
        readTime,
        difficulty,
        level,
        icon,
        gradient
      },
      benefits[] {
        _key,
        enabled,
        iconName,
        title,
        description
      },
      cta {
        title,
        description,
        buttons[] {
          _key,
          enabled,
          text,
          href,
          variant
        }
      }
    }
  }`;

  const data = await client.fetch(query);

  console.log('--- Query Result ---');
  console.log('resourcesSection exists:', !!data?.resourcesSection);

  if (data?.resourcesSection) {
    console.log('\nresourcesSection keys:', Object.keys(data.resourcesSection));

    console.log('\n--- Header ---');
    console.log('header:', JSON.stringify(data.resourcesSection.header, null, 2));

    console.log('\n--- Featured Series ---');
    console.log('featuredSeries length:', data.resourcesSection.featuredSeries?.length || 0);
    console.log('featuredSeries:', JSON.stringify(data.resourcesSection.featuredSeries, null, 2));

    console.log('\n--- Validation Check ---');
    console.log('!data:', !data.resourcesSection);
    console.log('!data.header:', !data.resourcesSection.header);
    console.log('!data.featuredSeries:', !data.resourcesSection.featuredSeries);
    console.log('Component will render:', !!data.resourcesSection && !!data.resourcesSection.header && !!data.resourcesSection.featuredSeries);
  } else {
    console.log('\nNO resourcesSection data found!');
  }
}

debug().catch(console.error);
