import { getHomepage } from '../sanity/lib/queries';

async function debugData() {
  const data = await getHomepage();

  console.log('Homepage Data Structure:');
  console.log('========================\n');

  console.log('heroEnhanced exists:', !!data?.heroEnhanced);
  console.log('servicesSection exists:', !!data?.servicesSection);
  console.log('technicalSpecs exists:', !!data?.technicalSpecs);
  console.log('industriesSection exists:', !!data?.industriesSection);
  console.log('imageShowcase exists:', !!data?.imageShowcase);
  console.log('resourcesSection exists:', !!data?.resourcesSection);
  console.log('stats exists:', !!data?.stats);
  console.log('cta exists:', !!data?.cta);

  console.log('\nResourcesSection structure:');
  console.log('---------------------------');
  console.log(JSON.stringify(data?.resourcesSection, null, 2));
}

debugData().catch(console.error);
