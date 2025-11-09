import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function fixServicesHeader() {
  try {
    const result = await writeClient
      .patch('homepage')
      .set({
        'servicesSection.header.eyebrow': 'SPECIALIZED CAPABILITIES',
        'servicesSection.header.heading': 'PRECISION SERVICES'
      })
      .commit();

    console.log('✅ Services section header updated to "PRECISION SERVICES"');
  } catch (error) {
    console.error('❌ Error updating Services header:', error);
    throw error;
  }
}

fixServicesHeader().catch(console.error);
