#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateAdaptiveComplete() {
  console.log('🚀 Populating Adaptive Machining service with COMPLETE reference data...\n');

  try {
    const service = await client.fetch(`*[_type == "service" && slug.current == "adaptive-machining"][0]{_id}`);

    if (!service) {
      console.log('❌ Adaptive Machining service not found. Creating new document...');
      const newDoc = await client.create({
        _type: 'service',
        title: 'Adaptive Machining',
        slug: { current: 'adaptive-machining', _type: 'slug' },
        published: true,
        shortDescription: 'AI-driven manufacturing that continuously adapts and optimizes processes in real-time',
        iconName: 'Brain'
      });
      console.log(`✅ Created new service: ${newDoc._id}\n`);
    }

    const docId = service?._id || (await client.fetch(`*[_type == "service" && slug.current == "adaptive-machining"][0]{_id}`))._id;

    console.log(`Found/created Adaptive Machining service: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        title: 'Adaptive Machining',
        shortDescription: 'AI-driven manufacturing that continuously adapts and optimizes processes in real-time',

        // Hero Section
        hero: {
          badge: 'ADAPTIVE MACHINING',
          title: 'Adaptive Machining',
          subtitle: 'AI-Driven Manufacturing Excellence',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Next-generation manufacturing technology that continuously adapts and optimizes machining processes in real-time for superior quality and efficiency.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', text: 'Start Project', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'btn-2', text: 'View Services', href: '/services', variant: 'secondary', enabled: true }
          ]
        },

        // Statistics
        statistics: [
          { _key: 'stat1', value: '35%', label: 'Cycle Time Reduction', description: 'Average improvement' },
          { _key: 'stat2', value: '60%', label: 'Tool Life Extension', description: 'Optimized parameters' },
          { _key: 'stat3', value: '99.8%', label: 'Quality Improvement', description: 'First-pass yield' },
          { _key: 'stat4', value: '24/7', label: 'Real-time Monitoring', description: 'Continuous oversight' }
        ],

        // Overview
        overview: {
          title: 'Smart Manufacturing Technology',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'overview-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'overview-span',
                  text: 'Our adaptive machining systems combine advanced sensors, AI algorithms, and real-time control to optimize every aspect of the manufacturing process.'
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
            title: 'Real-Time Process Monitoring',
            description: 'Advanced sensor networks continuously monitor cutting forces, vibration, temperature, and tool condition.',
            iconName: 'Activity',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
            featuresLabel: 'Features',
            features: [
              { _key: 'f1', feature: 'Force sensors' },
              { _key: 'f2', feature: 'Vibration monitoring' },
              { _key: 'f3', feature: 'Temperature tracking' },
              { _key: 'f4', feature: 'Tool wear detection' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Early problem detection' },
              { _key: 'c2', capability: 'Reduced scrap' },
              { _key: 'c3', capability: 'Improved surface finish' },
              { _key: 'c4', capability: 'Predictive maintenance' }
            ]
          },
          {
            _key: 'cap2',
            title: 'Intelligent Control Systems',
            description: 'AI-powered algorithms automatically adjust cutting parameters for optimal performance and quality.',
            iconName: 'Brain',
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
            featuresLabel: 'Features',
            features: [
              { _key: 'f1', feature: 'Machine learning' },
              { _key: 'f2', feature: 'Adaptive algorithms' },
              { _key: 'f3', feature: 'Parameter optimization' },
              { _key: 'f4', feature: 'Predictive analytics' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Optimal performance' },
              { _key: 'c2', capability: 'Reduced operator intervention' },
              { _key: 'c3', capability: 'Consistent quality' },
              { _key: 'c4', capability: 'Process optimization' }
            ]
          },
          {
            _key: 'cap3',
            title: 'Dynamic Tool Path Adjustment',
            description: 'Real-time toolpath modification based on material conditions and cutting feedback.',
            iconName: 'Route',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            featuresLabel: 'Features',
            features: [
              { _key: 'f1', feature: 'Path optimization' },
              { _key: 'f2', feature: 'Feed rate adjustment' },
              { _key: 'f3', feature: 'Stepover modification' },
              { _key: 'f4', feature: 'Depth control' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Improved efficiency' },
              { _key: 'c2', capability: 'Better surface finish' },
              { _key: 'c3', capability: 'Extended tool life' },
              { _key: 'c4', capability: 'Reduced cycle time' }
            ]
          },
          {
            _key: 'cap4',
            title: 'Quality Assurance Integration',
            description: 'Continuous quality monitoring with automatic corrections and process validation.',
            iconName: 'CheckCircle',
            imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=800&q=80',
            featuresLabel: 'Features',
            features: [
              { _key: 'f1', feature: 'In-process inspection' },
              { _key: 'f2', feature: 'Statistical control' },
              { _key: 'f3', feature: 'Automatic correction' },
              { _key: 'f4', feature: 'Quality prediction' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Zero-defect manufacturing' },
              { _key: 'c2', capability: 'Reduced inspection time' },
              { _key: 'c3', capability: 'Lower cost of quality' },
              { _key: 'c4', capability: 'Process certification' }
            ]
          }
        ],

        // Applications (using existing "applications" field)
        applications: {
          title: 'Industry Applications',
          description: 'Adaptive machining technology delivers superior results across demanding industrial applications requiring exceptional precision and reliability.',
          applicationTypes: [
            {
              _key: 'app1',
              name: 'Aerospace Engine Components',
              description: 'Critical turbine parts requiring exceptional precision and surface quality',
              imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
              challenges: [
                'Complex geometries',
                'Difficult materials',
                'Tight tolerances',
                'Surface requirements'
              ]
            },
            {
              _key: 'app2',
              name: 'Defense System Parts',
              description: 'High-reliability components for mission-critical defense applications',
              imageUrl: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=800&q=80',
              challenges: [
                'Material hardness',
                'Precision requirements',
                'Traceability',
                'Quality standards'
              ]
            },
            {
              _key: 'app3',
              name: 'Energy Sector Components',
              description: 'Power generation and oil & gas industry precision components',
              imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
              challenges: [
                'Large part size',
                'Complex features',
                'Material properties',
                'Durability requirements'
              ]
            }
          ]
        },

        // Process Steps
        process: {
          title: 'Adaptive Process Flow',
          description: 'Our adaptive machining process continuously learns and optimizes throughout the manufacturing cycle.',
          steps: [
            {
              _key: 'step1',
              stepNumber: '01',
              title: 'Setup & Calibration',
              description: 'System calibration and baseline parameter establishment',
              elements: []
            },
            {
              _key: 'step2',
              stepNumber: '02',
              title: 'Real-Time Monitoring',
              description: 'Continuous data collection and process monitoring',
              elements: []
            },
            {
              _key: 'step3',
              stepNumber: '03',
              title: 'Adaptive Control',
              description: 'AI-driven parameter adjustments and optimization',
              elements: []
            },
            {
              _key: 'step4',
              stepNumber: '04',
              title: 'Quality Validation',
              description: 'Automated inspection and process validation',
              elements: []
            }
          ]
        },

        // Benefits (using existing field structure)
        benefits: [
          {
            _key: 'benefit1',
            title: 'Reduced Cycle Times',
            description: 'AI-optimized cutting parameters reduce machining time by up to 35%',
            iconName: 'Zap'
          },
          {
            _key: 'benefit2',
            title: 'Improved Quality',
            description: 'Real-time monitoring and correction achieve 99.8% first-pass yields',
            iconName: 'Award'
          },
          {
            _key: 'benefit3',
            title: 'Extended Tool Life',
            description: 'Adaptive control extends cutting tool life by an average of 60%',
            iconName: 'Wrench'
          },
          {
            _key: 'benefit4',
            title: 'Lower Operating Costs',
            description: 'Reduced waste, rework, and maintenance costs improve profitability',
            iconName: 'TrendingDown'
          }
        ],

        // CTA Section
        cta: {
          title: 'Experience Adaptive Manufacturing',
          description: 'Discover how our intelligent manufacturing systems can transform your production capabilities and quality outcomes.',
          imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80',
          buttons: [
            { _key: 'cta-btn-1', text: 'Start Project', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'cta-btn-2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true }
          ]
        }
      })
      .commit();

    console.log('✅ Adaptive Machining service populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "service" && slug.current == "adaptive-machining"][0]{
      "hasHero": defined(hero),
      "hasStatistics": defined(statistics),
      "statisticsCount": count(statistics),
      "hasCapabilities": defined(capabilities),
      "capabilitiesCount": count(capabilities),
      "hasApplications": defined(applications),
      "applicationsCount": count(applications.applicationTypes),
      "hasProcess": defined(process),
      "processStepsCount": count(process.steps),
      "hasBenefits": defined(benefits),
      "benefitsCount": count(benefits),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/services/adaptive-machining');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateAdaptiveComplete();
