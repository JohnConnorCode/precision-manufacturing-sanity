import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { getHomepage } from '@/sanity/lib/queries';

async function test() {
  const data = await getHomepage();

  console.log('=== Homepage Query Test ===\n');
  console.log('Homepage data exists:', !!data);
  console.log('resourcesSection exists:', !!data?.resourcesSection);
  console.log('resourcesSection.header exists:', !!data?.resourcesSection?.header);
  console.log('resourcesSection.featuredSeries exists:', !!data?.resourcesSection?.featuredSeries);
  console.log('resourcesSection.benefits exists:', !!data?.resourcesSection?.benefits);
  console.log('resourcesSection.cta exists:', !!data?.resourcesSection?.cta);

  console.log('\n=== resourcesSection.header ===');
  console.log(JSON.stringify(data?.resourcesSection?.header, null, 2));

  console.log('\n=== resourcesSection.featuredSeries (count) ===');
  console.log(data?.resourcesSection?.featuredSeries?.length || 0);

  console.log('\n=== What getHomepage returns ===');
  console.log(JSON.stringify(data?.resourcesSection, null, 2));
}

test().catch(console.error);
