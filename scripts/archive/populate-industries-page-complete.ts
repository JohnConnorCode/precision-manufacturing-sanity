#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateIndustriesPageComplete() {
  console.log('🚀 Populating Industries Page with COMPLETE reference data...\n');

  try {
    // Check if industriesPage document exists, create if not
    let pageDoc = await client.fetch(`*[_type == "industriesPage"][0]`);

    if (!pageDoc) {
      console.log('❌ Industries Page document not found. Creating new document...');
      pageDoc = await client.create({
        _type: 'industriesPage'
      });
      console.log(`✅ Created new Industries Page document: ${pageDoc._id}\n`);
    }

    const docId = pageDoc._id;
    console.log(`Found/created Industries Page: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        // Hero Section
        hero: {
          badge: 'CRITICAL INDUSTRY SOLUTIONS',
          heading: 'Industries We Serve',
          headingHighlight: 'We Serve',
          subheading: 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.',
          buttons: [
            { _key: 'btn-1', enabled: true, label: 'Explore Industries', href: '#industries', variant: 'primary' },
            { _key: 'btn-2', enabled: true, label: 'Industry Consultation', href: '/contact', variant: 'secondary' }
          ]
        },

        // Main Content
        content: {
          // Overview Statistics
          overviewStats: [
            { _key: 'stat1', enabled: true, value: '30+', label: 'Industry Experience', description: 'Years serving critical industries' },
            { _key: 'stat2', enabled: true, value: '200+', label: 'Active Programs', description: 'Ongoing manufacturing programs' },
            { _key: 'stat3', enabled: true, value: '99.8%', label: 'Quality Rating', description: 'On-time delivery performance' },
            { _key: 'stat4', enabled: true, value: '12+', label: 'Certifications', description: 'Industry-specific certifications' }
          ],

          // Industries Section Header
          industriesSection: {
            title: 'Core Industries',
            description: 'Specialized manufacturing solutions for the most demanding industries, backed by decades of experience and industry-leading certifications.'
          },

          // Industries
          industries: [
            {
              _key: 'aerospace',
              enabled: true,
              name: 'Aerospace',
              description: 'Critical flight components and systems requiring the highest precision and reliability standards.',
              icon: 'Plane',
              applications: [
                'Engine components',
                'Landing gear',
                'Structural parts',
                'Avionics housings'
              ],
              certifications: [
                'AS9100D',
                'NADCAP',
                'ITAR'
              ],
              stats: [
                { _key: 's1', label: 'Production', value: '85% of production' },
                { _key: 's2', label: 'Clients', value: '50+ active clients' },
                { _key: 's3', label: 'Experience', value: '30+ years experience' }
              ]
            },
            {
              _key: 'defense',
              enabled: true,
              name: 'Defense',
              description: 'Mission-critical components for defense systems with stringent security and quality requirements.',
              icon: 'Shield',
              applications: [
                'Weapon systems',
                'Radar components',
                'Vehicle parts',
                'Electronics'
              ],
              certifications: [
                'ITAR',
                'DFARS',
                'Security clearance'
              ],
              stats: [
                { _key: 's1', label: 'Production', value: '15% of production' },
                { _key: 's2', label: 'Clients', value: '25+ active clients' },
                { _key: 's3', label: 'Experience', value: '25+ years experience' }
              ]
            },
            {
              _key: 'energy',
              enabled: true,
              name: 'Energy',
              description: 'Precision components for power generation, oil & gas, and renewable energy systems.',
              icon: 'Zap',
              applications: [
                'Turbine parts',
                'Valve components',
                'Pump housings',
                'Generator parts'
              ],
              certifications: [
                'API',
                'ASME',
                'ISO 9001'
              ],
              stats: [
                { _key: 's1', label: 'Production', value: '25% of production' },
                { _key: 's2', label: 'Clients', value: '15+ active clients' },
                { _key: 's3', label: 'Experience', value: '20+ years experience' }
              ]
            }
          ],

          // Why Choose Us Section Header
          whyChooseSection: {
            title: 'Why Industry Leaders Choose Us',
            description: 'Proven capabilities and unwavering commitment to quality make us the preferred manufacturing partner for critical applications.'
          },

          // Why Choose Us
          whyChooseUs: [
            {
              _key: 'reason1',
              enabled: true,
              title: 'Regulatory Compliance',
              description: 'Full compliance with industry-specific regulations and quality standards',
              icon: 'Award',
              features: [
                'AS9100D aerospace quality system',
                'ITAR registration and compliance',
                'NADCAP accredited processes',
                'ISO 9001:2015 certification'
              ]
            },
            {
              _key: 'reason2',
              enabled: true,
              title: 'Security & Traceability',
              description: 'Comprehensive security protocols and complete material traceability',
              icon: 'Shield',
              features: [
                'Secure facility access controls',
                'Material traceability systems',
                'Document control procedures',
                'Supply chain verification'
              ]
            },
            {
              _key: 'reason3',
              enabled: true,
              title: 'Technical Expertise',
              description: 'Deep industry knowledge and advanced manufacturing capabilities',
              icon: 'Factory',
              features: [
                'Specialized material processing',
                'Complex geometry machining',
                'Precision measurement systems',
                'Advanced quality control'
              ]
            },
            {
              _key: 'reason4',
              enabled: true,
              title: 'Program Management',
              description: 'Dedicated support for long-term manufacturing programs',
              icon: 'Users',
              features: [
                'Dedicated program managers',
                'Capacity planning',
                'Inventory management',
                'Continuous improvement'
              ]
            }
          ],

          // Proven Results Section Header
          resultsSection: {
            title: 'Proven Results',
            description: 'Measurable performance metrics that demonstrate our commitment to excellence and continuous improvement.'
          },

          // Proven Results
          provenResults: [
            {
              _key: 'result1',
              enabled: true,
              value: '99.8%',
              metric: 'First-Pass Yield',
              description: 'Parts meeting specifications without rework'
            },
            {
              _key: 'result2',
              enabled: true,
              value: '99.5%',
              metric: 'On-Time Delivery',
              description: 'Deliveries meeting committed schedules'
            },
            {
              _key: 'result3',
              enabled: true,
              value: '15-30%',
              metric: 'Cost Reduction',
              description: 'Average cost savings through optimization'
            },
            {
              _key: 'result4',
              enabled: true,
              value: '40%',
              metric: 'Lead Time Reduction',
              description: 'Typical improvement in manufacturing cycle time'
            }
          ]
        },

        // CTA Section
        cta: {
          heading: 'Partner with Industry Experts',
          description: 'Join the industry leaders who trust us with their most critical manufacturing requirements. Let\'s discuss your specific needs.',
          primaryButton: {
            enabled: true,
            label: 'Schedule Consultation',
            href: '/contact'
          },
          secondaryButton: {
            enabled: true,
            label: 'View Our Services',
            href: '/services'
          }
        },

        // SEO
        seo: {
          metaTitle: 'Industries We Serve | Aerospace, Defense & Energy Manufacturing',
          metaDescription: 'Precision manufacturing for aerospace, defense, and energy sectors. 30+ years serving critical industries with AS9100D, ITAR, and NADCAP certifications.',
          keywords: [
            'aerospace manufacturing',
            'defense manufacturing',
            'energy sector precision parts',
            'AS9100D certified',
            'ITAR registered facility',
            'NADCAP accredited',
            'mission-critical components'
          ]
        }
      })
      .commit();

    console.log('✅ Industries Page populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "industriesPage"][0]{
      "hasHero": defined(hero),
      "hasStats": defined(content.overviewStats),
      "statsCount": count(content.overviewStats),
      "hasIndustries": defined(content.industries),
      "industriesCount": count(content.industries),
      "hasWhyChooseUs": defined(content.whyChooseUs),
      "whyChooseUsCount": count(content.whyChooseUs),
      "hasResults": defined(content.provenResults),
      "resultsCount": count(content.provenResults),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/industries');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateIndustriesPageComplete();
