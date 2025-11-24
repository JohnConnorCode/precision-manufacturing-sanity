#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populate5AxisComplete() {
  console.log('🚀 Populating 5-Axis Machining service with COMPLETE reference data...\n');

  try {
    const service = await client.fetch(`*[_type == "service" && slug.current == "5-axis-machining"][0]{_id}`);

    if (!service) {
      console.log('❌ 5-Axis Machining service not found. Creating new document...');
      const newDoc = await client.create({
        _type: 'service',
        title: '5-Axis Machining',
        slug: { current: '5-axis-machining', _type: 'slug' },
        published: true,
        shortDescription: 'Advanced 5-axis simultaneous machining for complex aerospace and defense components',
        iconName: 'Cog'
      });
      console.log(`✅ Created new service: ${newDoc._id}\n`);
    }

    const docId = service?._id || (await client.fetch(`*[_type == "service" && slug.current == "5-axis-machining"][0]{_id}`))._id;

    console.log(`Found/created 5-Axis Machining service: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        title: '5-Axis Machining',
        shortDescription: 'Advanced 5-axis simultaneous machining for complex aerospace and defense components',

        // Hero Section
        hero: {
          badge: 'ADVANCED MACHINING SERVICES',
          title: '5-Axis Machining',
          subtitle: 'Precision Manufacturing Excellence',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Uncompromising quality and precision for mission-critical applications.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', text: 'Get Quote', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'btn-2', text: 'View Capabilities', href: '#capabilities', variant: 'secondary', enabled: true }
          ]
        },

        // Statistics
        statistics: [
          { _key: 'stat1', value: '5-Axis', label: 'Simultaneous Axes', description: 'Full simultaneous' },
          { _key: 'stat2', value: '±0.0001"', label: 'Machining Accuracy', description: 'Precision tolerance' },
          { _key: 'stat3', value: '48" x 26" x 20"', label: 'Work Envelope', description: 'Maximum capacity' },
          { _key: 'stat4', value: '12,000 RPM', label: 'Spindle Speed', description: 'High-speed capability' }
        ],

        // Overview
        overview: {
          title: '5-Axis Machining Services',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'overview-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'overview-span',
                  text: 'Comprehensive 5-axis machining capabilities for complex components requiring precision and reliability in aerospace and defense applications.'
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
            title: 'Complex Aerospace Components',
            description: 'Advanced 5-axis machining for turbine blades, impellers, and complex geometries requiring continuous contouring.',
            iconName: 'Cog',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'Turbine blade manufacturing' },
              { _key: 'f2', feature: 'Impeller machining' },
              { _key: 'f3', feature: 'Complex curve generation' },
              { _key: 'f4', feature: 'Simultaneous 5-axis contouring' }
            ],
            capabilitiesLabel: 'Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'Hermle C42U 5-axis machining center' },
              { _key: 'c2', capability: 'Heidenhain iTNC 530 control' },
              { _key: 'c3', capability: '±0.0001" positioning accuracy' },
              { _key: 'c4', capability: 'Automatic tool changer (60 tools)' }
            ]
          },
          {
            _key: 'cap2',
            title: 'Precision Defense Parts',
            description: 'High-precision machining of defense components with complex angles and tight tolerances for critical applications.',
            iconName: 'Shield',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'Defense component machining' },
              { _key: 'f2', feature: 'Complex angle programming' },
              { _key: 'f3', feature: 'Tight tolerance manufacturing' },
              { _key: 'f4', feature: 'ITAR compliance' }
            ],
            capabilitiesLabel: 'Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'ITAR registered facility' },
              { _key: 'c2', capability: 'Security clearance available' },
              { _key: 'c3', capability: 'Traceability documentation' },
              { _key: 'c4', capability: 'Quality assurance protocols' }
            ]
          },
          {
            _key: 'cap3',
            title: 'Prototype Development',
            description: 'Rapid prototyping and low-volume production using advanced 5-axis capabilities for complex part geometries.',
            iconName: 'Zap',
            imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee67a3c8f4b3?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'Rapid prototyping' },
              { _key: 'f2', feature: 'Complex geometry machining' },
              { _key: 'f3', feature: 'Material optimization' },
              { _key: 'f4', feature: 'Design validation' }
            ],
            capabilitiesLabel: 'Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'CAD/CAM integration' },
              { _key: 'c2', capability: 'Multiple material capability' },
              { _key: 'c3', capability: 'Surface finish optimization' },
              { _key: 'c4', capability: 'Dimensional verification' }
            ]
          },
          {
            _key: 'cap4',
            title: 'Production Machining',
            description: 'High-volume production capabilities with consistent quality and repeatability for complex manufactured parts.',
            iconName: 'Factory',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            featuresLabel: 'Key Features',
            features: [
              { _key: 'f1', feature: 'High-volume production' },
              { _key: 'f2', feature: 'Process optimization' },
              { _key: 'f3', feature: 'Quality consistency' },
              { _key: 'f4', feature: 'Automated workflows' }
            ],
            capabilitiesLabel: 'Capabilities',
            capabilitiesList: [
              { _key: 'c1', capability: 'Statistical process control' },
              { _key: 'c2', capability: 'Automated inspection' },
              { _key: 'c3', capability: 'Production scheduling' },
              { _key: 'c4', capability: 'Continuous improvement' }
            ]
          }
        ],

        // Materials Section
        materials: {
          title: 'Material Capabilities',
          description: 'Expert machining across a wide range of materials from standard aluminum to exotic superalloys.',
          materialTypes: [
            {
              _key: 'mat1',
              name: 'Aluminum Alloys',
              types: ['6061-T6', '7075-T6', '2024-T3', 'Mic-6 tooling plate'],
              applications: 'Aerospace structures, defense components, tooling'
            },
            {
              _key: 'mat2',
              name: 'Titanium Alloys',
              types: ['Ti-6Al-4V', 'Ti-6Al-2Sn-4Zr-2Mo', 'Commercial pure titanium'],
              applications: 'Aerospace engines, medical implants, defense'
            },
            {
              _key: 'mat3',
              name: 'Stainless Steel',
              types: ['316L', '17-4 PH', '15-5 PH', '304/304L'],
              applications: 'Food processing, medical, marine applications'
            },
            {
              _key: 'mat4',
              name: 'Superalloys',
              types: ['Inconel 718', 'Inconel 625', 'Hastelloy X', 'Waspaloy'],
              applications: 'High-temperature aerospace, power generation'
            }
          ]
        },

        // Process Steps
        process: {
          title: 'Manufacturing Process',
          description: 'Our comprehensive approach ensures optimal results from initial programming through final inspection.',
          steps: [
            {
              _key: 'step1',
              stepNumber: '01',
              title: 'Programming & Setup',
              description: 'Advanced CAD/CAM programming with collision detection and optimization for complex 5-axis toolpaths.',
              elements: [
                'Mastercam programming',
                'Tool path optimization',
                'Collision avoidance',
                'Simulation verification'
              ]
            },
            {
              _key: 'step2',
              stepNumber: '02',
              title: 'Fixturing & Workholding',
              description: 'Custom fixture design and precision workholding solutions for complex part geometries.',
              elements: [
                'Custom fixture design',
                'Modular workholding',
                'Part accessibility optimization',
                'Vibration dampening'
              ]
            },
            {
              _key: 'step3',
              stepNumber: '03',
              title: 'Quality Assurance',
              description: 'In-process monitoring and final inspection ensuring dimensional accuracy and surface finish requirements.',
              elements: [
                'CMM inspection',
                'Surface finish measurement',
                'GD&T verification',
                'Statistical analysis'
              ]
            },
            {
              _key: 'step4',
              stepNumber: '04',
              title: 'Finishing Operations',
              description: 'Secondary operations including deburring, surface treatments, and assembly preparation.',
              elements: [
                'Precision deburring',
                'Surface treatments',
                'Assembly preparation',
                'Packaging coordination'
              ]
            }
          ]
        },

        // CTA Section
        cta: {
          title: 'Ready for Complex Machining?',
          description: 'Partner with IIS for advanced 5-axis machining solutions that meet the most demanding aerospace and defense requirements.',
          buttons: [
            { _key: 'cta-btn-1', text: 'Get Quote', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'cta-btn-2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true }
          ]
        }
      })
      .commit();

    console.log('✅ 5-Axis Machining service populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "service" && slug.current == "5-axis-machining"][0]{
      "hasHero": defined(hero),
      "hasStatistics": defined(statistics),
      "statisticsCount": count(statistics),
      "hasCapabilities": defined(capabilities),
      "capabilitiesCount": count(capabilities),
      "hasMaterials": defined(materials),
      "hasProcess": defined(process),
      "processStepsCount": count(process.steps),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/services/5-axis-machining');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populate5AxisComplete();
