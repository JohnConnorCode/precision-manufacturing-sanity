import { getHomepage } from '@/sanity/lib/queries';

async function debug() {
  console.log('\n=== Debugging Homepage Query Result ===\n');

  const data = await getHomepage();

  console.log('Full homepage data keys:', Object.keys(data || {}));
  console.log('\nresourcesSection exists:', !!data?.resourcesSection);
  console.log('resourcesSection keys:', Object.keys(data?.resourcesSection || {}));

  console.log('\n--- Header ---');
  console.log('header exists:', !!data?.resourcesSection?.header);
  console.log('header value:', JSON.stringify(data?.resourcesSection?.header, null, 2));

  console.log('\n--- Featured Series ---');
  console.log('featuredSeries exists:', !!data?.resourcesSection?.featuredSeries);
  console.log('featuredSeries is array:', Array.isArray(data?.resourcesSection?.featuredSeries));
  console.log('featuredSeries length:', data?.resourcesSection?.featuredSeries?.length);
  console.log('featuredSeries value:', JSON.stringify(data?.resourcesSection?.featuredSeries, null, 2));

  console.log('\n--- Validation Check (from Resources.tsx line 14) ---');
  const hasData = !!data?.resourcesSection;
  const hasHeader = !!data?.resourcesSection?.header;
  const hasFeaturedSeries = !!data?.resourcesSection?.featuredSeries;

  console.log(`if (!data || !data.header || !data.featuredSeries) {`);
  console.log(`  !data: ${!data?.resourcesSection}`);
  console.log(`  !data.header: ${!data?.resourcesSection?.header}`);
  console.log(`  !data.featuredSeries: ${!data?.resourcesSection?.featuredSeries}`);
  console.log(`  WILL RETURN NULL: ${!data?.resourcesSection || !data?.resourcesSection?.header || !data?.resourcesSection?.featuredSeries}`);
  console.log(`}`);
}

debug().catch(console.error);
