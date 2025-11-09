import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function testResourcesData() {
  const data = await client.fetch(`*[_type == "homepage"][0]{
    resourcesSection {
      header,
      featuredSeries,
      benefits,
      cta
    }
  }`);

  console.log('=== Full Resources Section Data ===');
  console.log(JSON.stringify(data.resourcesSection, null, 2));

  console.log('\n=== Validation ===');
  console.log('Has resourcesSection:', !!data?.resourcesSection);
  console.log('Has header:', !!data?.resourcesSection?.header);
  console.log('Has featuredSeries:', !!data?.resourcesSection?.featuredSeries);
  console.log('featuredSeries is array:', Array.isArray(data?.resourcesSection?.featuredSeries));
  console.log('featuredSeries length:', data?.resourcesSection?.featuredSeries?.length);
}

testResourcesData().catch(console.error);
