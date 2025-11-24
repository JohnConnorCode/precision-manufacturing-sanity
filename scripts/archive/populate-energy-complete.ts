#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateEnergyComplete() {
  console.log('🚀 Populating Energy industry with COMPLETE reference data...\n');

  try {
    const energy = await client.fetch(`*[_type == "industry" && slug.current == "energy"][0]{_id}`);

    if (!energy) {
      console.log('❌ Energy industry not found. Creating new document...');
      const newDoc = await client.create({
        _type: 'industry',
        title: 'Energy Manufacturing',
        slug: { current: 'energy', _type: 'slug' },
        published: true,
        shortDescription: 'Precision components for power generation, oil & gas, and renewable energy systems',
        iconName: 'Zap'
      });
      console.log(`✅ Created new energy document: ${newDoc._id}\n`);
    }

    const docId = energy?._id || (await client.fetch(`*[_type == "industry" && slug.current == "energy"][0]{_id}`))._id;

    console.log(`Found/created energy document: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        title: 'Energy Manufacturing',

        // Hero section
        hero: {
          badge: 'ENERGY SECTOR SOLUTIONS',
          subtitle: 'Energy Manufacturing',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Precision components for power generation, oil & gas, and renewable energy systems. Supporting critical infrastructure with proven reliability and industry compliance.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', enabled: true, href: '/contact', text: 'Request Energy Quote', variant: 'primary' },
            { _key: 'btn-2', enabled: true, href: '#capabilities', text: 'View Capabilities', variant: 'secondary' }
          ]
        },

        // Stats
        stats: [
          { _key: 'stat1', label: 'Energy Projects', value: '25%', description: 'Of production volume' },
          { _key: 'stat2', label: 'Power Generation', value: '500MW+', description: 'Equipment supported' },
          { _key: 'stat3', label: 'Operating Temperature', value: '1200°F', description: 'Maximum capability' },
          { _key: 'stat4', label: 'Pressure Rating', value: '15,000 PSI', description: 'High-pressure systems' }
        ],

        // Expertise
        expertise: [
          {
            _key: 'power-gen',
            title: 'Power Generation',
            description: 'Critical components for gas turbines, steam turbines, and power plant systems',
            iconName: 'Zap',
            imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
            components: [
              'Gas turbine components',
              'Steam turbine parts',
              'Generator components',
              'Heat exchanger tubes',
              'Valve bodies and stems',
              'Pump impellers'
            ],
            materials: [
              'Inconel 718',
              'Stainless Steel 316L',
              'Hastelloy C-276',
              'Titanium Grade 2'
            ],
            requirements: [
              'High temperature operation',
              'Corrosion resistance',
              'Thermal cycling',
              'Precision machining'
            ]
          },
          {
            _key: 'oil-gas',
            title: 'Oil & Gas',
            description: 'Downstream and upstream components for drilling, extraction, and processing',
            iconName: 'Droplet',
            imageUrl: 'https://images.unsplash.com/photo-1545259742-64522b1813d2?w=800&q=80',
            components: [
              'Downhole tools',
              'Valve components',
              'Pump parts',
              'Wellhead equipment',
              'Pipeline fittings',
              'Drilling equipment'
            ],
            materials: [
              'Duplex Stainless',
              'Inconel 625',
              'Monel 400',
              '17-4 PH Stainless'
            ],
            requirements: [
              'Corrosive environments',
              'High pressure systems',
              'Wear resistance',
              'Material traceability'
            ]
          },
          {
            _key: 'renewable',
            title: 'Renewable Energy',
            description: 'Components for wind, solar, and hydroelectric power generation systems',
            iconName: 'Wind',
            imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
            components: [
              'Wind turbine components',
              'Solar tracking systems',
              'Hydroelectric parts',
              'Battery housing',
              'Power electronics',
              'Control systems'
            ],
            materials: [
              'Aluminum 6061',
              'Stainless Steel 304',
              'Carbon Steel',
              'Copper Alloys'
            ],
            requirements: [
              'Weather resistance',
              'Long service life',
              'Cost optimization',
              'Environmental compliance'
            ]
          }
        ],

        // Certifications
        certifications: [
          {
            _key: 'api',
            title: 'API Standards',
            description: 'American Petroleum Institute specifications for oil and gas equipment\n\nAPI 6A\nAPI 16A\nAPI Q1',
            iconName: 'Award'
          },
          {
            _key: 'asme',
            title: 'ASME Compliance',
            description: 'American Society of Mechanical Engineers codes and standards\n\nASME Section VIII\nASME B31.3\nASME Y14.5',
            iconName: 'Shield'
          },
          {
            _key: 'environmental',
            title: 'Environmental Standards',
            description: 'Environmental and safety compliance for energy sector operations\n\nISO 14001\nOSHA Compliance\nEPA Regulations',
            iconName: 'Leaf'
          }
        ],

        // Process Benefits - Specialized Capabilities
        processBenefits: [
          {
            _key: 'benefit-1',
            title: 'High-Temperature Materials',
            description: 'Expertise in machining superalloys and high-temperature resistant materials',
            features: [
              { _key: 'feat-1', feature: 'Inconel and Hastelloy machining' },
              { _key: 'feat-2', feature: 'Heat treatment capabilities' },
              { _key: 'feat-3', feature: 'Thermal barrier coatings' },
              { _key: 'feat-4', feature: 'High-temperature testing' }
            ]
          },
          {
            _key: 'benefit-2',
            title: 'Pressure Vessel Components',
            description: 'Precision manufacturing of components for high-pressure applications',
            features: [
              { _key: 'feat-1', feature: 'ASME code compliance' },
              { _key: 'feat-2', feature: 'Pressure testing capabilities' },
              { _key: 'feat-3', feature: 'Weld procedure qualification' },
              { _key: 'feat-4', feature: 'Non-destructive testing' }
            ]
          },
          {
            _key: 'benefit-3',
            title: 'Large Component Machining',
            description: 'Capabilities for oversized energy sector components',
            features: [
              { _key: 'feat-1', feature: 'Large capacity CNC machines' },
              { _key: 'feat-2', feature: 'Precision boring and turning' },
              { _key: 'feat-3', feature: 'Heavy component handling' },
              { _key: 'feat-4', feature: 'Assembly and testing' }
            ]
          },
          {
            _key: 'benefit-4',
            title: 'Material Traceability',
            description: 'Complete documentation and traceability for critical applications',
            features: [
              { _key: 'feat-1', feature: 'Mill test certificates' },
              { _key: 'feat-2', feature: 'Chemical composition verification' },
              { _key: 'feat-3', feature: 'Heat number tracking' },
              { _key: 'feat-4', feature: 'Material property testing' }
            ]
          }
        ]
      })
      .commit();

    console.log('✅ Energy industry populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "industry" && slug.current == "energy"][0]{
      "hasHero": defined(hero),
      "hasStats": defined(stats),
      "statsCount": count(stats),
      "hasExpertise": defined(expertise),
      "expertiseCount": count(expertise),
      "hasCertifications": defined(certifications),
      "certificationsCount": count(certifications),
      "hasProcessBenefits": defined(processBenefits),
      "processBenefitsCount": count(processBenefits)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/industries/energy');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateEnergyComplete();
