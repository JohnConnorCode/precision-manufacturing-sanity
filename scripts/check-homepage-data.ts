import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function checkHomepage() {
  const data = await client.fetch(`*[_type == "homepage"][0]{
    _id,
    hero,
    servicesSection,
    technicalSpecs,
    industriesSection,
    imageShowcase,
    operationalExcellence,
    resourcesSection,
    stats,
    cta
  }`);

  console.log('Homepage document exists:', data ? 'YES' : 'NO');
  if (data) {
    console.log('\n=== Sections Present ===');
    console.log('hero:', data.hero ? 'YES' : 'NO');
    console.log('servicesSection:', data.servicesSection ? 'YES' : 'NO');
    console.log('technicalSpecs:', data.technicalSpecs ? 'YES' : 'NO');
    console.log('industriesSection:', data.industriesSection ? 'YES' : 'NO');
    console.log('imageShowcase:', data.imageShowcase ? 'YES' : 'NO');
    console.log('operationalExcellence:', data.operationalExcellence ? 'YES' : 'NO');
    console.log('resourcesSection:', data.resourcesSection ? 'YES' : 'NO');
    console.log('stats:', data.stats ? 'YES' : 'NO');
    console.log('cta:', data.cta ? 'YES' : 'NO');
  }
}

checkHomepage().catch(console.error);
