#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateDefenseComplete() {
  console.log('🚀 Populating Defense industry with COMPLETE reference data...\n');

  try {
    const defense = await client.fetch(`*[_type == "industry" && slug.current == "defense"][0]{_id}`);

    if (!defense) {
      console.log('❌ Defense industry not found. Creating new document...');
      const newDoc = await client.create({
        _type: 'industry',
        title: 'Defense Manufacturing',
        slug: { current: 'defense', _type: 'slug' },
        published: true,
        shortDescription: 'Precision components for defense systems and military applications',
        iconName: 'Shield'
      });
      console.log(`✅ Created new defense document: ${newDoc._id}\n`);
    }

    const docId = defense?._id || (await client.fetch(`*[_type == "industry" && slug.current == "defense"][0]{_id}`))._id;

    console.log(`Found/created defense document: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        title: 'Defense Manufacturing',

        // Hero section
        hero: {
          badge: 'DEFENSE MANUFACTURING EXCELLENCE',
          subtitle: 'Defense & Military Components',
          descriptionRich: [
            {
              _type: 'block',
              _key: 'hero-desc',
              children: [
                {
                  _type: 'span',
                  _key: 'hero-span',
                  text: 'Trusted partner for mission-critical defense components, delivering precision-machined parts for weapons systems, military vehicles, and defense platforms with full ITAR compliance and security clearances.'
                }
              ],
              style: 'normal'
            }
          ],
          buttons: [
            { _key: 'btn-1', enabled: true, href: '/contact', text: 'Request Defense Quote', variant: 'primary' },
            { _key: 'btn-2', enabled: true, href: '#capabilities', text: 'View Capabilities', variant: 'secondary' }
          ]
        },

        // Stats
        stats: [
          { _key: 'stat1', label: 'Defense Projects', value: '40%', description: 'Of production volume' },
          { _key: 'stat2', label: 'Active Programs', value: '75+', description: 'Military contracts' },
          { _key: 'stat3', label: 'Security Clearance', value: 'Top Secret', description: 'Facility clearance level' },
          { _key: 'stat4', label: 'ITAR Compliance', value: '100%', description: 'Full certification' }
        ],

        // Expertise
        expertise: [
          {
            _key: 'weapons',
            title: 'Weapons Systems',
            description: 'Critical components for firearms, artillery, and guided munitions requiring extreme precision',
            iconName: 'Target',
            imageUrl: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=800&q=80',
            components: [
              'Firearm components',
              'Artillery parts',
              'Missile components',
              'Guidance systems',
              'Firing mechanisms',
              'Barrel assemblies'
            ],
            materials: [
              'Steel 4340',
              'Stainless 17-4 PH',
              'Titanium Ti-6Al-4V',
              'Aluminum 7075-T6'
            ],
            requirements: [
              'Extreme accuracy',
              'Reliability under stress',
              'Material traceability',
              'Security compliance'
            ]
          },
          {
            _key: 'vehicles',
            title: 'Vehicle & Platform Components',
            description: 'Structural and mechanical parts for military vehicles, ships, and ground systems',
            iconName: 'Truck',
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
            components: [
              'Armored vehicle parts',
              'Track and suspension',
              'Drive train components',
              'Turret mechanisms',
              'Hydraulic systems',
              'Landing gear'
            ],
            materials: [
              'Armor plate steel',
              'High-strength alloys',
              'Hardened steel',
              'Ballistic materials'
            ],
            requirements: [
              'Ballistic protection',
              'High load capacity',
              'Extreme durability',
              'Environmental resistance'
            ]
          },
          {
            _key: 'surveillance',
            title: 'Surveillance & Intelligence',
            description: 'Precision components for sensors, optics, and electronic warfare systems',
            iconName: 'Radio',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
            components: [
              'Sensor housings',
              'Optical assemblies',
              'Antenna components',
              'Electronics enclosures',
              'Gimbal systems',
              'Radar components'
            ],
            materials: [
              'Aluminum 6061-T6',
              'Magnesium alloys',
              'Titanium',
              'Composite materials'
            ],
            requirements: [
              'EMI/RFI shielding',
              'Thermal stability',
              'Precision alignment',
              'Weight optimization'
            ]
          }
        ],

        // Certifications
        certifications: [
          {
            _key: 'itar',
            title: 'ITAR Registered',
            description: 'International Traffic in Arms Regulations\n\nFull compliance for manufacturing and handling defense articles',
            iconName: 'Shield'
          },
          {
            _key: 'as9100d',
            title: 'AS9100D Certified',
            description: 'Aerospace Quality Management System\n\nDefense-grade quality control and documentation',
            iconName: 'Award'
          },
          {
            _key: 'security',
            title: 'Security Clearance',
            description: 'Facility Security Clearance\n\nTop Secret clearance for classified programs',
            iconName: 'Lock'
          },
          {
            _key: 'cyber',
            title: 'Cybersecurity',
            description: 'NIST 800-171 Compliance\n\nCybersecurity Maturity Model Certification (CMMC)',
            iconName: 'Server'
          }
        ],

        // Process Benefits - Specialized Capabilities
        processBenefits: [
          {
            _key: 'benefit-1',
            title: 'ITAR Compliance & Security',
            description: 'Comprehensive security protocols and ITAR compliance throughout manufacturing',
            features: [
              { _key: 'feat-1', feature: 'Secure facility with access controls' },
              { _key: 'feat-2', feature: 'Personnel security clearances' },
              { _key: 'feat-3', feature: 'Export control compliance' },
              { _key: 'feat-4', feature: 'Classified program support' }
            ]
          },
          {
            _key: 'benefit-2',
            title: 'Precision Weapons Manufacturing',
            description: 'Specialized capabilities for firearms, artillery, and munitions components',
            features: [
              { _key: 'feat-1', feature: 'Gunsmithing and barrel work' },
              { _key: 'feat-2', feature: 'Rifling and bore finishing' },
              { _key: 'feat-3', feature: 'Hardening and surface treatments' },
              { _key: 'feat-4', feature: 'Ballistic testing support' }
            ]
          },
          {
            _key: 'benefit-3',
            title: 'Armored Vehicle Components',
            description: 'Heavy-duty machining for military vehicle and platform systems',
            features: [
              { _key: 'feat-1', feature: 'Large-scale CNC machining' },
              { _key: 'feat-2', feature: 'Armor plate fabrication' },
              { _key: 'feat-3', feature: 'Welding and assembly' },
              { _key: 'feat-4', feature: 'Load and stress testing' }
            ]
          },
          {
            _key: 'benefit-4',
            title: 'Full Traceability & Documentation',
            description: 'Complete chain of custody and documentation for defense contracts',
            features: [
              { _key: 'feat-1', feature: 'Material certification' },
              { _key: 'feat-2', feature: 'Process documentation' },
              { _key: 'feat-3', feature: 'First article inspection' },
              { _key: 'feat-4', feature: 'AS9102 reporting' }
            ]
          }
        ]
      })
      .commit();

    console.log('✅ Defense industry populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "industry" && slug.current == "defense"][0]{
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
    console.log('\n🌐 View at: http://localhost:3002/industries/defense');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateDefenseComplete();
