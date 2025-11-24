#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateAerospaceComplete() {
  console.log('🚀 Populating Aerospace with COMPLETE reference data...\n');

  try {
    const aerospace = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]{_id}`);
    const docId = aerospace._id;

    console.log(`Found aerospace document: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        // Hero section - EXACT match to reference
        hero: {
          badge: 'AEROSPACE MANUFACTURING EXCELLENCE',
          subtitle: 'Aerospace Components',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Trusted partner for critical aerospace components, delivering precision-machined parts for commercial and military aircraft with full AS9100D compliance and ITAR registration.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', enabled: true, href: '/contact', text: 'Request Aerospace Quote', variant: 'primary' },
            { _key: 'btn-2', enabled: true, href: '#capabilities', text: 'View Capabilities', variant: 'secondary' }
          ]
        },

        // Stats - Key Metrics
        stats: [
          { _key: 'stat1', label: 'Aerospace Volume', value: '85%', description: 'Of total production' },
          { _key: 'stat2', label: 'Active Programs', value: '150+', description: 'Ongoing aerospace projects' },
          { _key: 'stat3', label: 'Precision Tolerance', value: '±0.0001"', description: 'Guaranteed accuracy' },
          { _key: 'stat4', label: 'AS9100D Compliance', value: '100%', description: 'Full certification' }
        ],

        // Expertise - Component Expertise
        expertise: [
          {
            _key: 'engine',
            title: 'Engine Components',
            description: 'Critical turbine and engine parts requiring extreme precision and material expertise',
            iconName: 'Cog',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            components: [
              'Turbine blades and vanes',
              'Combustor liners',
              'Compressor components',
              'Engine mounts and brackets',
              'Fuel system components',
              'Heat exchanger parts'
            ],
            materials: [
              'Inconel 718/625',
              'Titanium Ti-6Al-4V',
              'Hastelloy X',
              'Waspaloy'
            ],
            requirements: [
              'High temperature resistance',
              'Fatigue resistance',
              'Precise airfoil geometry',
              'Surface finish requirements'
            ]
          },
          {
            _key: 'structural',
            title: 'Structural Components',
            description: 'Airframe and structural parts demanding exceptional strength and weight optimization',
            iconName: 'Box',
            imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
            components: [
              'Wing brackets and fittings',
              'Landing gear components',
              'Fuselage frames',
              'Control surface hinges',
              'Structural joints',
              'Fastener components'
            ],
            materials: [
              'Aluminum 7075-T6',
              'Titanium Ti-6Al-4V',
              'Steel 15-5 PH',
              '17-4 PH Stainless'
            ],
            requirements: [
              'High strength-to-weight ratio',
              'Corrosion resistance',
              'Fatigue life',
              'Dimensional stability'
            ]
          },
          {
            _key: 'avionics',
            title: 'Avionics & Electronics',
            description: 'Precision housings and components for aerospace electronics and control systems',
            iconName: 'Cpu',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
            components: [
              'Radar components',
              'Electronics housings',
              'Antenna assemblies',
              'Connector bodies',
              'Heat sinks',
              'Waveguide components'
            ],
            materials: [
              'Aluminum 6061-T6',
              'Magnesium AZ31',
              'Copper alloys',
              'Kovar alloy'
            ],
            requirements: [
              'EMI shielding',
              'Thermal management',
              'Dimensional accuracy',
              'Surface conductivity'
            ]
          }
        ],

        // Certifications
        certifications: [
          {
            _key: 'as9100d',
            title: 'AS9100D',
            description: 'Aerospace Quality Management System\n\nDesign, development, and manufacturing of precision aerospace components',
            iconName: 'Award'
          },
          {
            _key: 'nadcap',
            title: 'NADCAP',
            description: 'National Aerospace and Defense Contractors Accreditation Program\n\nSpecial processes including heat treating and chemical processing',
            iconName: 'Shield'
          },
          {
            _key: 'itar',
            title: 'ITAR',
            description: 'International Traffic in Arms Regulations\n\nManufacturing and handling of defense-related articles and services',
            iconName: 'Lock'
          },
          {
            _key: 'quality',
            title: 'Quality Standards & Documentation',
            description: 'First Article Inspection (AS9102)\nStatistical Process Control (SPC)\nCoordinate Measuring Machine (CMM)\nMaterial Test Certificates\nCertificate of Conformance\nTraceability Documentation',
            iconName: 'FileText'
          }
        ],

        // Process Benefits - Manufacturing Advantages
        processBenefits: [
          {
            _key: 'benefit-1',
            title: 'Advanced Manufacturing',
            description: '5-axis CNC machining for complex geometries and tight tolerances',
            features: [
              { _key: 'feat-1', feature: 'Single-setup machining reduces tolerances stack-up' },
              { _key: 'feat-2', feature: 'Complex contours and undercuts in one operation' },
              { _key: 'feat-3', feature: 'Superior surface finish capabilities' },
              { _key: 'feat-4', feature: 'Reduced setup time and improved accuracy' }
            ]
          },
          {
            _key: 'benefit-2',
            title: 'Material Expertise',
            description: 'Specialized knowledge in aerospace-grade materials and their properties',
            features: [
              { _key: 'feat-1', feature: 'Optimized cutting parameters for exotic materials' },
              { _key: 'feat-2', feature: 'Heat treatment and stress relief processes' },
              { _key: 'feat-3', feature: 'Material traceability and certification' },
              { _key: 'feat-4', feature: 'Corrosion-resistant surface treatments' }
            ]
          },
          {
            _key: 'benefit-3',
            title: 'Quality Assurance',
            description: 'Comprehensive quality control throughout the manufacturing process',
            features: [
              { _key: 'feat-1', feature: 'In-process inspection and monitoring' },
              { _key: 'feat-2', feature: 'Statistical process control implementation' },
              { _key: 'feat-3', feature: 'First article inspection per AS9102' },
              { _key: 'feat-4', feature: 'Complete documentation and traceability' }
            ]
          }
        ]
      })
      .commit();

    console.log('✅ Aerospace populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]{
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
    console.log('\n🌐 View at: http://localhost:3002/industries/aerospace');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateAerospaceComplete();
