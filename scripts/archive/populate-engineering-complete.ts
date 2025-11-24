#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateEngineeringComplete() {
  console.log('🚀 Populating Engineering Services with COMPLETE reference data...\n');

  try {
    const service = await client.fetch(`*[_type == "service" && slug.current == "engineering-services"][0]{_id}`);

    if (!service) {
      console.log('❌ Engineering Services not found. Creating new document...');
      const newDoc = await client.create({
        _type: 'service',
        title: 'Engineering Services',
        slug: { current: 'engineering-services', _type: 'slug' },
        published: true,
        shortDescription: 'Complete engineering solutions from concept through production',
        iconName: 'Drafting Compass'
      });
      console.log(`✅ Created new service: ${newDoc._id}\n`);
    }

    const docId = service?._id || (await client.fetch(`*[_type == "service" && slug.current == "engineering-services"][0]{_id}`))._id;

    console.log(`Found/created Engineering Services: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        title: 'Engineering Services',
        shortDescription: 'Complete engineering solutions from concept through production',

        // Hero Section
        hero: {
          badge: 'COMPREHENSIVE DESIGN SERVICES',
          title: 'Engineering Services',
          subtitle: 'From Concept to Production',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Complete engineering solutions from initial concept through final production, including design optimization, rapid prototyping, and manufacturing process development.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', text: 'Start Project', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'btn-2', text: 'View Capabilities', href: '#capabilities', variant: 'secondary', enabled: true }
          ]
        },

        // Statistics
        statistics: [
          { _key: 'stat1', value: '500+', label: 'Design Projects', description: 'Completed annually' },
          { _key: 'stat2', value: '12+', label: 'CAD Software', description: 'Platforms supported' },
          { _key: 'stat3', value: '48hrs', label: 'Prototype Time', description: 'Rapid turnaround' },
          { _key: 'stat4', value: '100%', label: 'DFM Analysis', description: 'Manufacturing optimized' }
        ],

        // Overview
        overview: {
          title: 'Engineering Capabilities',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'overview-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'overview-span',
                  text: 'From initial concept to production-ready designs, our engineering team delivers comprehensive solutions optimized for manufacturing excellence.'
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
            title: 'Design for Manufacturing (DFM)',
            description: 'Optimize part designs for efficient manufacturing while maintaining performance requirements.',
            iconName: 'Settings',
            imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=800&q=80',
            featuresLabel: 'Services',
            features: [
              { _key: 'f1', feature: 'Cost optimization' },
              { _key: 'f2', feature: 'Tolerance analysis' },
              { _key: 'f3', feature: 'Material selection' },
              { _key: 'f4', feature: 'Process optimization' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Reduced manufacturing costs' },
              { _key: 'c2', capability: 'Improved producibility' },
              { _key: 'c3', capability: 'Shorter lead times' },
              { _key: 'c4', capability: 'Enhanced quality' }
            ]
          },
          {
            _key: 'cap2',
            title: 'Rapid Prototyping',
            description: 'Fast-track product development with advanced prototyping technologies and processes.',
            iconName: 'Zap',
            imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            featuresLabel: 'Services',
            features: [
              { _key: 'f1', feature: '3D printing' },
              { _key: 'f2', feature: 'CNC prototypes' },
              { _key: 'f3', feature: 'Functional testing' },
              { _key: 'f4', feature: 'Design validation' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Accelerated development' },
              { _key: 'c2', capability: 'Design verification' },
              { _key: 'c3', capability: 'Risk mitigation' },
              { _key: 'c4', capability: 'Faster time-to-market' }
            ]
          },
          {
            _key: 'cap3',
            title: 'CAD/CAM Programming',
            description: 'Expert programming services for complex machining operations and toolpath optimization.',
            iconName: 'Code',
            imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
            featuresLabel: 'Services',
            features: [
              { _key: 'f1', feature: 'Multi-axis programming' },
              { _key: 'f2', feature: 'Toolpath optimization' },
              { _key: 'f3', feature: 'Simulation & verification' },
              { _key: 'f4', feature: 'Post-processing' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Optimized cycle times' },
              { _key: 'c2', capability: 'Improved surface finish' },
              { _key: 'c3', capability: 'Reduced tool wear' },
              { _key: 'c4', capability: 'Minimized setup time' }
            ]
          },
          {
            _key: 'cap4',
            title: 'Process Development',
            description: 'Comprehensive manufacturing process development and optimization for new products.',
            iconName: 'GitBranch',
            imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
            featuresLabel: 'Services',
            features: [
              { _key: 'f1', feature: 'Process planning' },
              { _key: 'f2', feature: 'Tooling design' },
              { _key: 'f3', feature: 'Fixture development' },
              { _key: 'f4', feature: 'Quality planning' }
            ],
            capabilitiesLabel: 'Benefits',
            capabilitiesList: [
              { _key: 'c1', capability: 'Robust processes' },
              { _key: 'c2', capability: 'Quality assurance' },
              { _key: 'c3', capability: 'Cost effectiveness' },
              { _key: 'c4', capability: 'Scalable production' }
            ]
          }
        ],

        // Tools & Technologies
        tools: {
          title: 'Design & Manufacturing Tools',
          description: 'State-of-the-art software and technologies supporting every phase of product development.',
          categories: [
            {
              _key: 'cat1',
              name: 'CAD Software Expertise',
              tools: [
                'SolidWorks Premium',
                'Siemens NX',
                'Autodesk Inventor',
                'CATIA V5/V6',
                'Fusion 360',
                'KeyShot Rendering'
              ]
            },
            {
              _key: 'cat2',
              name: 'CAM Programming',
              tools: [
                'Mastercam',
                'NX CAM',
                'PowerMill',
                'EdgeCAM',
                'HSMWorks',
                'FeatureCAM'
              ]
            },
            {
              _key: 'cat3',
              name: 'Simulation & Analysis',
              tools: [
                'SolidWorks Simulation',
                'ANSYS Workbench',
                'Autodesk CFD',
                'VERICUT',
                'CGTech Simulation',
                'Machining Advisor'
              ]
            },
            {
              _key: 'cat4',
              name: 'Prototyping Technologies',
              tools: [
                'FDM 3D Printing',
                'SLA Stereolithography',
                'SLS Laser Sintering',
                'CNC Prototyping',
                'Sheet Metal Prototypes',
                'Rapid Tooling'
              ]
            }
          ]
        },

        // Project Types
        projectTypes: [
          {
            _key: 'proj1',
            name: 'New Product Development',
            description: 'Complete design and development from concept to production',
            timeline: '4-12 weeks',
            deliverables: [
              'Concept design',
              '3D models',
              'Drawings',
              'Prototypes',
              'Manufacturing plan'
            ]
          },
          {
            _key: 'proj2',
            name: 'Design Optimization',
            description: 'Improve existing designs for better performance or manufacturability',
            timeline: '2-6 weeks',
            deliverables: [
              'DFM analysis',
              'Revised designs',
              'Cost analysis',
              'Process improvements'
            ]
          },
          {
            _key: 'proj3',
            name: 'Reverse Engineering',
            description: 'Recreate CAD models from existing parts or legacy components',
            timeline: '1-4 weeks',
            deliverables: [
              '3D scanning',
              'CAD models',
              'Technical drawings',
              'Material analysis'
            ]
          },
          {
            _key: 'proj4',
            name: 'Tooling & Fixture Design',
            description: 'Custom tooling solutions for manufacturing processes',
            timeline: '2-8 weeks',
            deliverables: [
              'Tooling design',
              'Fixture models',
              'Assembly drawings',
              'Manufacturing specs'
            ]
          }
        ],

        // Process Steps
        process: {
          title: 'Our Engineering Process',
          description: 'Structured approach ensuring successful project outcomes from initial consultation to final delivery.',
          steps: [
            {
              _key: 'step1',
              stepNumber: '01',
              title: 'Consultation',
              description: 'Requirements analysis and project planning',
              elements: []
            },
            {
              _key: 'step2',
              stepNumber: '02',
              title: 'Concept Design',
              description: 'Initial design concepts and feasibility study',
              elements: []
            },
            {
              _key: 'step3',
              stepNumber: '03',
              title: 'Development',
              description: 'Detailed design and engineering analysis',
              elements: []
            },
            {
              _key: 'step4',
              stepNumber: '04',
              title: 'Prototyping',
              description: 'Rapid prototypes and design validation',
              elements: []
            },
            {
              _key: 'step5',
              stepNumber: '05',
              title: 'Optimization',
              description: 'DFM analysis and design refinement',
              elements: []
            },
            {
              _key: 'step6',
              stepNumber: '06',
              title: 'Production',
              description: 'Manufacturing support and documentation',
              elements: []
            }
          ]
        },

        // CTA Section
        cta: {
          title: 'Ready to Start Your Project?',
          description: 'Partner with our engineering team to transform your concepts into production-ready designs optimized for manufacturing success.',
          imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=1600&q=80',
          buttons: [
            { _key: 'cta-btn-1', text: 'Start Project', href: '/contact', variant: 'primary', enabled: true },
            { _key: 'cta-btn-2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true }
          ]
        }
      })
      .commit();

    console.log('✅ Engineering Services populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "service" && slug.current == "engineering-services"][0]{
      "hasHero": defined(hero),
      "hasStatistics": defined(statistics),
      "statisticsCount": count(statistics),
      "hasCapabilities": defined(capabilities),
      "capabilitiesCount": count(capabilities),
      "hasTools": defined(tools),
      "toolCategoriesCount": count(tools.categories),
      "hasProjectTypes": defined(projectTypes),
      "projectTypesCount": count(projectTypes),
      "hasProcess": defined(process),
      "processStepsCount": count(process.steps),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/services/engineering-services');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateEngineeringComplete();
