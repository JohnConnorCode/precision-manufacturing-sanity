#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateMetrologyComplete() {
  console.log('🚀 Populating Precision Metrology service with COMPLETE reference data...\n');

  try {
    const service = await client.fetch(`*[_type == "service" && slug.current == "precision-metrology"][0]{_id}`);

    if (!service) {
      console.log('❌ Precision Metrology service not found. Creating new document...');
      const newDoc = await client.create({
        _type: 'service',
        title: 'Precision Metrology',
        slug: { current: 'precision-metrology', _type: 'slug' },
        published: true,
        shortDescription: 'Advanced measurement and inspection services ensuring dimensional accuracy and quality compliance',
        iconName: 'Ruler'
      });
      console.log(`✅ Created new service: ${newDoc._id}\n`);
    }

    const docId = service?._id || (await client.fetch(`*[_type == "service" && slug.current == "precision-metrology"][0]{_id}`))._id;

    console.log(`Found/created Precision Metrology service: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        title: 'Precision Metrology',
        shortDescription: 'Advanced measurement and inspection services ensuring dimensional accuracy and quality compliance',

        // Hero Section
        hero: {
          badge: 'PRECISION MEASUREMENT SERVICES',
          title: 'Precision Metrology',
          subtitle: 'Quality Assurance Excellence',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Advanced measurement and inspection services ensuring dimensional accuracy and quality compliance for aerospace and defense manufacturing.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', text: 'Get Quote', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'btn-2', text: 'View Services', href: '/services', variant: 'secondary', enabled: true }
          ]
        },

        // Statistics
        statistics: [
          { _key: 'stat1', value: '±0.00005"', label: 'Measurement Accuracy', description: 'CMM precision' },
          { _key: 'stat2', value: '0.001"', label: 'Scanning Resolution', description: 'Laser scanning' },
          { _key: 'stat3', value: '68°F ±1°F', label: 'Temperature Control', description: 'Climate controlled' },
          { _key: 'stat4', value: 'ISO 17025', label: 'Certification Level', description: 'Accredited lab' }
        ],

        // Overview
        overview: {
          title: 'Metrology Services',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'overview-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'overview-span',
                  text: 'Comprehensive measurement and inspection capabilities supporting all phases of manufacturing from first article to final inspection.'
                }
              ],
              style: 'normal'
            }
          ]
        },

        // Capabilities
        capabilities: [
          {
            _key: 'cap1',
            title: 'Coordinate Measuring Machine (CMM)',
            description: 'High-precision dimensional inspection using state-of-the-art CMM systems for complex geometries.',
            iconName: 'Box',
            imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: '3D coordinate measurement' },
              { _key: 'f2', feature: 'GD&T inspection' },
              { _key: 'f3', feature: 'Statistical analysis' },
              { _key: 'f4', feature: 'Automated reporting' }
            ],
            capabilitiesLabel: 'Equipment Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'Zeiss CONTURA G2 RDS CMM' },
              { _key: 'c2', capability: 'Working volume: 700x1000x600mm' },
              { _key: 'c3', capability: 'Accuracy: ±(0.9+L/350)μm' },
              { _key: 'c4', capability: 'VAST XXT scanning probe' }
            ]
          },
          {
            _key: 'cap2',
            title: 'Laser Scanning & Reverse Engineering',
            description: 'Advanced 3D laser scanning for rapid inspection, reverse engineering, and digital documentation.',
            iconName: 'Scan',
            imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'Point cloud generation' },
              { _key: 'f2', feature: 'CAD comparison' },
              { _key: 'f3', feature: 'Surface analysis' },
              { _key: 'f4', feature: 'Digital archiving' }
            ],
            capabilitiesLabel: 'Equipment Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'ATOS Triple Scan system' },
              { _key: 'c2', capability: '5 megapixel resolution' },
              { _key: 'c3', capability: '0.01mm accuracy' },
              { _key: 'c4', capability: 'Blue light technology' }
            ]
          },
          {
            _key: 'cap3',
            title: 'Optical Measurement Systems',
            description: 'Non-contact optical measurement for delicate parts and surface characteristics analysis.',
            iconName: 'Eye',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'Surface roughness' },
              { _key: 'f2', feature: 'Profile measurement' },
              { _key: 'f3', feature: 'Edge detection' },
              { _key: 'f4', feature: 'Multi-sensor integration' }
            ],
            capabilitiesLabel: 'Equipment Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'Keyence IM Series' },
              { _key: 'c2', capability: 'Sub-micron accuracy' },
              { _key: 'c3', capability: 'Multi-wavelength scanning' },
              { _key: 'c4', capability: 'Real-time analysis' }
            ]
          },
          {
            _key: 'cap4',
            title: 'Gauge & Tool Calibration',
            description: 'Comprehensive calibration services for measuring instruments and production tooling.',
            iconName: 'Gauge',
            imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'NIST traceable' },
              { _key: 'f2', feature: 'Calibration certificates' },
              { _key: 'f3', feature: 'Tool verification' },
              { _key: 'f4', feature: 'Gage R&R studies' }
            ],
            capabilitiesLabel: 'Equipment Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'NIST traceable standards' },
              { _key: 'c2', capability: 'Environmental controls' },
              { _key: 'c3', capability: 'Automated calibration' },
              { _key: 'c4', capability: 'Digital certificates' }
            ]
          }
        ],

        // Inspection Services (using existing structure)
        inspectionTypes: [
          {
            _key: 'insp1',
            name: 'First Article Inspection (FAI)',
            description: 'Complete dimensional verification per AS9102 requirements',
            deliverables: [
              'AS9102 Forms 1-3',
              'Dimensional report',
              'Material certificates',
              'Process documentation'
            ]
          },
          {
            _key: 'insp2',
            name: 'In-Process Inspection',
            description: 'Real-time quality monitoring during manufacturing',
            deliverables: [
              'Statistical control charts',
              'Trend analysis',
              'Process capability studies',
              'Corrective actions'
            ]
          },
          {
            _key: 'insp3',
            name: 'Final Inspection',
            description: 'Comprehensive verification before shipment',
            deliverables: [
              'Certificate of conformance',
              'Inspection report',
              'Dimensional data',
              'Test results'
            ]
          },
          {
            _key: 'insp4',
            name: 'Incoming Inspection',
            description: 'Vendor part verification and material validation',
            deliverables: [
              'Supplier scorecards',
              'Non-conformance reports',
              'Material verification',
              'Dimensional check'
            ]
          }
        ],

        // Quality Standards (using qualityStandards field)
        qualityStandards: {
          title: 'Quality Standards & Certifications',
          description: 'Our metrology lab maintains the highest standards of accuracy and traceability, with certifications that meet aerospace and defense requirements.',
          standards: [
            'AS9100D Quality Management',
            'ISO 9001:2015 Certified',
            'ISO 17025 Measurement Lab',
            'NADCAP Accredited Processes',
            'ITAR Registered Facility',
            'Statistical Process Control'
          ]
        },

        // Process Steps
        process: {
          title: 'Metrology Process',
          description: 'Our systematic approach ensures accurate measurements and comprehensive documentation for every inspection.',
          steps: [
            {
              _key: 'step1',
              stepNumber: '01',
              title: 'Planning',
              description: 'Review drawings and specifications',
              elements: []
            },
            {
              _key: 'step2',
              stepNumber: '02',
              title: 'Setup',
              description: 'Equipment calibration and preparation',
              elements: []
            },
            {
              _key: 'step3',
              stepNumber: '03',
              title: 'Measurement',
              description: 'Precision data collection',
              elements: []
            },
            {
              _key: 'step4',
              stepNumber: '04',
              title: 'Analysis',
              description: 'Statistical evaluation and comparison',
              elements: []
            },
            {
              _key: 'step5',
              stepNumber: '05',
              title: 'Reporting',
              description: 'Documentation and certification',
              elements: []
            }
          ]
        },

        // CTA Section
        cta: {
          title: 'Precision You Can Trust',
          description: 'Partner with our certified metrology lab for accurate measurements and comprehensive quality documentation.',
          imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=1600&q=80',
          buttons: [
            { _key: 'cta-btn-1', text: 'Get Quote', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'cta-btn-2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true }
          ]
        }
      })
      .commit();

    console.log('✅ Precision Metrology service populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "service" && slug.current == "precision-metrology"][0]{
      "hasHero": defined(hero),
      "hasStatistics": defined(statistics),
      "statisticsCount": count(statistics),
      "hasCapabilities": defined(capabilities),
      "capabilitiesCount": count(capabilities),
      "hasInspectionTypes": defined(inspectionTypes),
      "inspectionTypesCount": count(inspectionTypes),
      "hasQualityStandards": defined(qualityStandards),
      "hasProcess": defined(process),
      "processStepsCount": count(process.steps),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/services/precision-metrology');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateMetrologyComplete();
