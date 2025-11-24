#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateAerospace() {
  console.log('🚀 Populating Aerospace industry with complete data...\n');

  try {
    // Get the aerospace document ID
    const aerospace = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]{_id}`);
    const docId = aerospace._id;

    console.log(`Found aerospace document: ${docId}\n`);

    // Populate with complete data matching reference site
    await client
      .patch(docId)
      .set({
        // Stats section
        stats: [
          { _key: 'stat1', label: 'Aerospace Volume', value: '85%', description: 'of total production' },
          { _key: 'stat2', label: 'Active Programs', value: '150+', description: 'ongoing aerospace projects' },
          { _key: 'stat3', label: 'Precision Tolerance', value: '±0.0001"', description: 'guaranteed accuracy' },
          { _key: 'stat4', label: 'AS9100D Compliance', value: '100%', description: 'full certification' }
        ],

        // Market Overview
        marketOverview: {
          title: 'Market Overview',
          description: 'Delivering precision aerospace components that meet the most stringent quality and reliability requirements for commercial and defense aircraft systems.',
          marketSize: {
            title: 'Market Size',
            description: 'Global aerospace manufacturing market exceeds $500 billion annually'
          },
          marketDrivers: {
            title: 'Key Market Drivers',
            drivers: [
              'Growing commercial air travel demand',
              'Military aircraft modernization programs',
              'Increasing use of advanced composite materials',
              'Rising demand for fuel-efficient aircraft'
            ]
          }
        },

        // Expertise sections
        expertise: [
          {
            _key: 'engine',
            title: 'Engine Components',
            description: 'Critical turbine and engine parts requiring extreme precision and material expertise.',
            iconName: 'Cog',
            components: [
              'Turbine blades and vanes',
              'Combustor liners and casings',
              'Compressor components',
              'Exhaust nozzles and diffusers'
            ],
            materials: [
              'Inconel 718, 625',
              'Titanium 6Al-4V, Grade 5',
              'Hastelloy X',
              'Waspaloy'
            ]
          },
          {
            _key: 'structural',
            title: 'Structural Components',
            description: 'Airframe and structural elements demanding tight tolerances and full material traceability.',
            iconName: 'Box',
            components: [
              'Wing brackets and fittings',
              'Landing gear components',
              'Fuselage frames and bulkheads',
              'Control surface attachments'
            ],
            materials: [
              'Aluminum 7075-T6, 2024-T3',
              'Titanium alloys',
              'Stainless steel 15-5 PH, 17-4 PH',
              'Aerospace-grade alloys'
            ]
          },
          {
            _key: 'avionics',
            title: 'Avionics & Electronics',
            description: 'Precision housings and components for aerospace electronics and communication systems.',
            iconName: 'Cpu',
            components: [
              'Radar and antenna housings',
              'Connector bodies and shells',
              'Instrument bezels and panels',
              'Shielding components'
            ],
            materials: [
              'Aluminum alloys',
              'Magnesium AZ31B',
              'Copper alloys',
              'Specialty plastics'
            ]
          }
        ],

        // Certifications
        certifications: [
          {
            _key: 'as9100d',
            title: 'AS9100D',
            description: 'Aerospace Quality Management System certification ensuring the highest manufacturing standards',
            iconName: 'Award'
          },
          {
            _key: 'nadcap',
            title: 'NADCAP',
            description: 'Industry-managed approach to conformity assessment of aerospace special processes',
            iconName: 'Shield'
          },
          {
            _key: 'itar',
            title: 'ITAR Registration',
            description: 'Registered for defense-related manufacturing and technical data management',
            iconName: 'Lock'
          },
          {
            _key: 'quality',
            title: 'Quality Documentation',
            description: 'Complete FAI, SPC, CMM inspection reports, and full material traceability',
            iconName: 'FileText'
          }
        ]
      })
      .commit();

    console.log('✅ Aerospace industry populated successfully!\n');
    
    // Verify
    const updated = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]{
      "hasStats": defined(stats),
      "statsCount": count(stats),
      "hasMarketOverview": defined(marketOverview),
      "hasExpertise": defined(expertise),
      "expertiseCount": count(expertise),
      "hasCertifications": defined(certifications),
      "certificationsCount": count(certifications)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3000/industries/aerospace');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateAerospace();
