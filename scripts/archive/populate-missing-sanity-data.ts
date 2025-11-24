import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function populateMissingData() {
  console.log('🌱 POPULATING MISSING SANITY DATA FOR HANDOFF\n');

  try {
    // 1. Populate Homepage Hero
    console.log('📝 Populating Homepage hero...');
    await client
      .patch('homepage')
      .set({
        hero: {
          word1: 'PRECISION',
          word2: 'MANUFACTURING',
          word3: 'SERVICES',
          tagline: 'Innovative Precision Machining & Manufacturing Excellence Since 1995',
          badges: [
            { text: 'Advanced CNC Machining' },
            { text: 'Precision Metrology' },
            { text: 'Engineering Excellence' },
            { text: '3 Sigma Yield' }
          ],
          slides: [
            {
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: 'image-default-hero-1'
                }
              },
              alt: 'Precision CNC machining of aerospace components',
              focal: { x: 0.5, y: 0.5 }
            }
          ]
        }
      })
      .commit();
    console.log('✅ Homepage hero populated\n');

    // 2. Populate Footer Columns and Links
    console.log('📝 Populating Footer navigation...');
    await client
      .patch('footer')
      .set({
        columns: [
          {
            title: 'Services',
            links: [
              { label: '5-Axis Machining', href: '/services/5-axis-machining' },
              { label: 'Adaptive Machining', href: '/services/adaptive-machining' },
              { label: 'Metrology', href: '/services/metrology' },
              { label: 'Engineering', href: '/services/engineering' }
            ]
          },
          {
            title: 'Industries',
            links: [
              { label: 'Aerospace', href: '/industries/aerospace' },
              { label: 'Defense', href: '/industries/defense' },
              { label: 'Energy', href: '/industries/energy' }
            ]
          },
          {
            title: 'Company',
            links: [
              { label: 'About Us', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { label: 'Case Studies', href: '/resources' },
              { label: 'Technical Docs', href: '/resources' },
              { label: 'Compliance', href: '/compliance/terms' }
            ]
          }
        ],
        links: [
          { label: 'Terms & Conditions', href: '/compliance/terms' },
          { label: 'Privacy Policy', href: '/compliance/privacy' },
          { label: 'Supplier Requirements', href: '/compliance/supplier-requirements' }
        ]
      })
      .commit();
    console.log('✅ Footer navigation populated\n');

    // 3. Create Services Page
    console.log('📝 Creating Services Page...');
    const servicesPage = await client.fetch(`*[_type == "servicesPage"][0]{_id}`);
    if (!servicesPage) {
      await client.create({
        _id: 'servicesPage',
        _type: 'servicesPage',
        hero: {
          backgroundImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-services-hero'
            },
            alt: 'Advanced manufacturing services and capabilities'
          },
          badge: '🏭 COMPREHENSIVE SOLUTIONS',
          heading: 'Manufacturing Services',
          headingHighlight: 'Services',
          subheading: 'From prototyping to production, we deliver precision manufacturing solutions with unmatched quality and reliability.',
          buttons: [
            { label: 'Explore Services', href: '#services', variant: 'primary' },
            { label: 'Request Quote', href: '/contact', variant: 'secondary' }
          ]
        },
        content: {
          capabilities: [
            { label: 'Tolerance', value: '±0.0001"', description: 'Precision machining tolerance' },
            { label: 'Materials', value: '50+', description: 'Certified material types' },
            { label: 'Machines', value: '25+', description: 'State-of-the-art equipment' }
          ],
          qualityAssurance: [
            { title: 'AS9100D Certified' },
            { title: 'ISO 9001:2015' },
            { title: 'ITAR Registered' },
            { title: 'First Article Inspection' }
          ]
        },
        cta: {
          heading: 'Ready to Start Your Project?',
          description: 'Contact our engineering team to discuss your precision manufacturing needs.',
          buttons: [
            { label: 'Get Quote', href: '/contact', variant: 'default', enabled: true },
            { label: 'Technical Specs', href: '/compliance/supplier-requirements', variant: 'outline', enabled: true }
          ]
        },
        seo: {
          metaTitle: 'Precision Manufacturing Services | CNC Machining & Metrology | IIS',
          metaDescription: 'AS9100D certified precision machining, 5-axis CNC, adaptive manufacturing, and CMM inspection services. Tolerances to ±0.0001" for aerospace and defense.',
          keywords: ['precision machining', 'CNC services', '5-axis machining', 'metrology', 'AS9100D']
        }
      });
      console.log('✅ Services Page created\n');
    } else {
      console.log('ℹ️  Services Page already exists\n');
    }

    // 4. Create About Page
    console.log('📝 Creating About Page...');
    const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]{_id}`);
    if (!aboutPage) {
      await client.create({
        _id: 'aboutPage',
        _type: 'aboutPage',
        hero: {
          backgroundImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-about-hero'
            },
            alt: 'IIS manufacturing facility'
          },
          badge: '🏢 OUR STORY',
          heading: 'About',
          headingHighlight: 'IIS',
          subheading: 'Pioneering precision manufacturing and metrology solutions since 1995.',
          ctaButtons: [
            { label: 'Our History', href: '#history', variant: 'primary' },
            { label: 'Meet Our Team', href: '#team', variant: 'secondary' }
          ]
        },
        story: {
          title: 'Our Story',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Founded in 1995, Integrated Inspection Systems started as a vision to revolutionize precision manufacturing through data-driven processes and proprietary software integration.'
                }
              ]
            }
          ]
        },
        seo: {
          metaTitle: 'About IIS | Precision Manufacturing Since 1995',
          metaDescription: 'Learn about IIS - AS9100D certified precision manufacturing company serving aerospace, defense, and advanced industries since 1995.',
        }
      });
      console.log('✅ About Page created\n');
    } else {
      console.log('ℹ️  About Page already exists\n');
    }

    // 5. Create Careers Page
    console.log('📝 Creating Careers Page...');
    const careersPage = await client.fetch(`*[_type == "careersPage"][0]{_id}`);
    if (!careersPage) {
      await client.create({
        _id: 'careersPage',
        _type: 'careersPage',
        hero: {
          backgroundImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-careers-hero'
            },
            alt: 'IIS team members at work'
          },
          badge: '💼 JOIN OUR TEAM',
          heading: 'Careers at',
          headingHighlight: 'IIS',
          subheading: 'Build your career with an industry-leading precision manufacturing company.',
          ctaButtons: [
            { label: 'View Open Positions', href: '#positions', variant: 'primary' },
            { label: 'Learn More', href: '#culture', variant: 'secondary' }
          ]
        },
        culture: {
          title: 'Our Culture',
          description: 'We foster innovation, precision, and continuous improvement in everything we do.',
          values: [
            {
              iconName: 'Target',
              title: 'Precision First',
              description: 'We pursue excellence in every component we manufacture.'
            },
            {
              iconName: 'Users',
              title: 'Team Excellence',
              description: 'Our people are our greatest asset.'
            },
            {
              iconName: 'TrendingUp',
              title: 'Continuous Growth',
              description: 'We invest in training and development.'
            }
          ]
        },
        benefits: {
          title: 'Benefits & Perks',
          items: [
            {
              iconName: 'Heart',
              title: 'Health & Wellness',
              description: 'Comprehensive health, dental, and vision insurance'
            },
            {
              iconName: 'DollarSign',
              title: 'Competitive Compensation',
              description: 'Industry-leading salaries and performance bonuses'
            },
            {
              iconName: 'Clock',
              title: 'Work-Life Balance',
              description: 'Generous PTO and flexible scheduling'
            }
          ]
        },
        seo: {
          metaTitle: 'Careers at IIS | Join Our Precision Manufacturing Team',
          metaDescription: 'Explore career opportunities at IIS. Join a growing team of precision manufacturing professionals in aerospace and defense industries.',
        }
      });
      console.log('✅ Careers Page created\n');
    } else {
      console.log('ℹ️  Careers Page already exists\n');
    }

    // 6. Create Supplier Requirements
    console.log('📝 Creating Supplier Requirements...');
    const supplierReqs = await client.fetch(`*[_type == "supplierRequirements"][0]{_id}`);
    if (!supplierReqs) {
      await client.create({
        _id: 'supplierRequirements',
        _type: 'supplierRequirements',
        hero: {
          backgroundImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-supplier-hero'
            },
            alt: 'Quality control and supplier requirements'
          },
          badges: [
            { iconName: 'Shield', text: 'AS9100D Certified' },
            { iconName: 'Award', text: 'ISO 9001:2015' },
            { iconName: 'Lock', text: 'ITAR Registered' }
          ],
          title: 'SUPPLIER QUALITY',
          titleHighlight: 'REQUIREMENTS',
          description: 'Comprehensive requirements ensuring excellence in aerospace and precision manufacturing supply chain',
          versionStatus: 'Version 3.0 Active',
          effectiveDate: 'Effective: January 2024',
          reviewPeriod: 'Review: Annual'
        },
        sections: [
          {
            _key: 'purpose',
            id: 'purpose',
            number: '1',
            title: 'PURPOSE',
            iconName: 'Target',
            content: 'The purpose of this document is to establish a uniform process for supplier quality requirements.',
            color: 'blue'
          },
          {
            _key: 'scope',
            id: 'scope',
            number: '2',
            title: 'SCOPE',
            iconName: 'Globe',
            content: 'This Standard Operating Procedure applies to the process of supplier quality requirements.',
            color: 'indigo'
          }
        ],
        requirements: [
          {
            _key: 'req1',
            number: '3.1',
            title: 'Supplier Responsibility',
            iconName: 'AlertCircle',
            content: 'The supplier is fully responsible for adhering to the requirements stated in this document.',
          },
          {
            _key: 'req2',
            number: '3.2',
            title: 'Quality System Requirements',
            iconName: 'Shield',
            content: 'The supplier is authorized to implement a Quality System that complies with AS9100 and ISO 9001 standards.',
          }
        ],
        footerNote: {
          iconName: 'Shield',
          heading: 'Compliance Commitment',
          content: 'By accepting purchase orders from Integrated Inspection Systems, Inc., suppliers acknowledge and agree to comply with all requirements stated in this document.'
        },
        seo: {
          metaTitle: 'Supplier Quality Requirements | IIS Manufacturing Standards',
          metaDescription: 'Comprehensive supplier quality requirements for IIS partners. AS9100D and ISO 9001 compliance standards for aerospace and defense manufacturing.',
        }
      });
      console.log('✅ Supplier Requirements created\n');
    } else {
      console.log('ℹ️  Supplier Requirements already exists\n');
    }

    // Final verification
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL MISSING DATA POPULATED SUCCESSFULLY');
    console.log('='.repeat(60));
    console.log('\n📋 Next Steps:');
    console.log('1. Open Sanity Studio at http://localhost:3000/studio');
    console.log('2. Verify all documents are visible and editable');
    console.log('3. Customize content as needed');
    console.log('4. Run verification script: npx tsx scripts/verify-sanity-handoff.ts');

  } catch (error) {
    console.error('\n❌ ERROR:', error);
    process.exit(1);
  }
}

populateMissingData();
