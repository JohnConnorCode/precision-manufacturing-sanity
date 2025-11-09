import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function populateOperationalExcellence() {
  try {
    const result = await writeClient
      .patch('homepage')
      .set({
        'operationalExcellence': {
          heading: 'OPERATIONAL EXCELLENCE',
          description: 'Proven systems and expert teams delivering consistent, superior results',
          benefits: [
            {
              _key: 'benefit-1',
              iconName: 'Gauge',
              title: 'Quality Control',
              description: 'Comprehensive inspection protocols and real-time process monitoring ensure every component meets exact specifications.'
            },
            {
              _key: 'benefit-2',
              iconName: 'Workflow',
              title: 'Process Optimization',
              description: 'Lean manufacturing principles and continuous improvement initiatives maximize efficiency without compromising quality.'
            },
            {
              _key: 'benefit-3',
              iconName: 'Users',
              title: 'Expert Team',
              description: 'Highly trained machinists, engineers, and quality professionals with decades of precision manufacturing experience.'
            }
          ]
        }
      })
      .commit();

    console.log('✅ Operational Excellence section populated successfully');
  } catch (error) {
    console.error('❌ Error populating Operational Excellence:', error);
    throw error;
  }
}

populateOperationalExcellence().catch(console.error);
