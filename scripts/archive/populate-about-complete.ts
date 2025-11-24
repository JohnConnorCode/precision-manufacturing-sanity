#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateAboutComplete() {
  console.log('🚀 Populating About page with COMPLETE reference data...\n');

  try {
    // Check if about document exists, create if not
    let aboutDoc = await client.fetch(`*[_type == "about"][0]`);

    if (!aboutDoc) {
      console.log('❌ About document not found. Creating new document...');
      aboutDoc = await client.create({
        _type: 'about'
      });
      console.log(`✅ Created new About document: ${aboutDoc._id}\n`);
    }

    const docId = aboutDoc._id;
    console.log(`Found/created About page: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        // Hero Section
        hero: {
          badge: 'PRECISION MANUFACTURING SINCE 1995',
          title: 'About Our Company',
          description: 'From basement startup to industry leader. Three decades of precision manufacturing excellence serving aerospace, defense, and advanced industries with ISO 9001, AS9100, and ITAR certification.',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=1600&q=80',
          buttons: [
            { _key: 'btn-1', label: 'Our Capabilities', href: '/services', variant: 'primary', enabled: true },
            { _key: 'btn-2', label: 'Meet Our Team', href: '#leadership', variant: 'secondary', enabled: true }
          ]
        },

        // Company Statistics
        companyStats: [
          { _key: 'stat1', enabled: true, value: '30+', label: 'Years', description: 'Industry experience' },
          { _key: 'stat2', enabled: true, value: '150+', label: 'Team Members', description: 'Expert professionals' },
          { _key: 'stat3', enabled: true, value: '$25M+', label: 'Annual Revenue', description: 'Consistent growth' },
          { _key: 'stat4', enabled: true, value: '45,000', label: 'Sq Ft Facility', description: 'State-of-the-art' }
        ],

        // Company Story
        story: {
          title: 'Our Journey',
          paragraph1: 'Founded in 1995 in a modest 2,500 square-foot basement facility in Portland, Oregon, Integrated Inspection Systems began with a simple vision: to provide uncompromising precision measurement and manufacturing services to the aerospace and defense industries. What started as a two-person operation with a single coordinate measuring machine (CMM) has evolved into a comprehensive precision manufacturing powerhouse.',
          paragraph2: 'The turning point came in 1998 when we developed our proprietary MetBase® software system, revolutionizing how metrology data is collected, analyzed, and managed. This innovation established us as technology leaders in the precision manufacturing sector and opened doors to major aerospace and defense contracts. By 2001, we had transitioned from a measurement-focused service provider to a full-spectrum manufacturing partner, adding advanced CNC machining capabilities and securing our first AS9100 certification.',
          paragraph3: 'Today, IIS operates from a state-of-the-art 45,000 square-foot facility in Clackamas, Oregon, employing over 150 skilled professionals and serving some of the world\'s most demanding industries. Our commitment to continuous improvement, cutting-edge technology investment, and unwavering quality standards has made us the preferred manufacturing partner for aerospace OEMs, defense contractors, and advanced technology companies nationwide. We don\'t just manufacture parts—we solve complex engineering challenges and deliver precision solutions that our customers can rely on.',
          imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80'
        },

        // Timeline
        timeline: {
          title: 'Our History',
          description: 'Three decades of innovation, growth, and precision manufacturing excellence',
          milestones: [
            {
              _key: 'milestone1',
              enabled: true,
              year: '1995',
              title: 'Founded',
              description: 'IIS established in Portland, Oregon with a single CMM in a 2,500 sq ft basement facility. Initial focus on precision measurement services for local manufacturers.'
            },
            {
              _key: 'milestone2',
              enabled: true,
              year: '1998',
              title: 'First Major Innovation',
              description: 'Developed and launched MetBase®, our proprietary metrology data management software. First major aerospace contract secured with Boeing.'
            },
            {
              _key: 'milestone3',
              enabled: true,
              year: '1999-2001',
              title: 'MetBase Development',
              description: 'Continued refinement of MetBase software with advanced statistical process control capabilities. Expanded metrology lab with additional CMM equipment and climate control systems.'
            },
            {
              _key: 'milestone4',
              enabled: true,
              year: '2001',
              title: 'Aerospace Transition',
              description: 'Achieved AS9100 certification and ITAR registration. Pivoted business model from pure metrology services to comprehensive manufacturing partner. Acquired first CNC machining centers.'
            },
            {
              _key: 'milestone5',
              enabled: true,
              year: '2001-2008',
              title: '4-Sigma System Development',
              description: 'Developed proprietary 4-Sigma quality management system integrating MetBase with manufacturing operations. Moved to 15,000 sq ft facility. Expanded into defense sector contracts.'
            },
            {
              _key: 'milestone6',
              enabled: true,
              year: 'Present',
              title: 'Industry Leader',
              description: 'Operating from 45,000 sq ft state-of-the-art facility with 150+ employees. Advanced 5-axis machining, adaptive manufacturing technology, and comprehensive quality systems serving aerospace, defense, and advanced technology industries.'
            }
          ]
        },

        // Core Values
        values: {
          title: 'Our Values',
          description: 'The principles that guide every decision, every project, and every relationship at IIS',
          items: [
            {
              _key: 'value1',
              enabled: true,
              title: 'Quality Excellence',
              description: 'We maintain the highest standards of precision and accuracy in everything we manufacture. Quality isn\'t just a goal—it\'s our foundation.',
              iconName: 'Award',
              bullets: [
                { _key: 'b1', text: 'AS9100D and ISO 9001:2015 certified' },
                { _key: 'b2', text: 'Zero-defect manufacturing philosophy' },
                { _key: 'b3', text: 'Continuous improvement culture' },
                { _key: 'b4', text: 'Advanced statistical process control' }
              ]
            },
            {
              _key: 'value2',
              enabled: true,
              title: 'Innovation Leadership',
              description: 'From developing MetBase® software to implementing adaptive machining technology, we continuously push the boundaries of what\'s possible in precision manufacturing.',
              iconName: 'Lightbulb',
              bullets: [
                { _key: 'b1', text: 'Proprietary software development' },
                { _key: 'b2', text: 'Advanced manufacturing technologies' },
                { _key: 'b3', text: 'Industry-leading processes' },
                { _key: 'b4', text: 'R&D investment commitment' }
              ]
            },
            {
              _key: 'value3',
              enabled: true,
              title: 'Reliability & Trust',
              description: 'Our customers trust us with their most critical components. We honor that trust through consistent on-time delivery, transparent communication, and unwavering integrity.',
              iconName: 'Shield',
              bullets: [
                { _key: 'b1', text: '99.5% on-time delivery rate' },
                { _key: 'b2', text: 'ITAR registered facility' },
                { _key: 'b3', text: 'Complete traceability systems' },
                { _key: 'b4', text: 'Long-term customer partnerships' }
              ]
            },
            {
              _key: 'value4',
              enabled: true,
              title: 'Team Excellence',
              description: 'Our people are our greatest asset. We invest in training, development, and creating an environment where skilled professionals can do their best work.',
              iconName: 'Users',
              bullets: [
                { _key: 'b1', text: 'Continuous training programs' },
                { _key: 'b2', text: 'Advanced certifications' },
                { _key: 'b3', text: 'Safety-first culture' },
                { _key: 'b4', text: 'Employee ownership mindset' }
              ]
            }
          ]
        },

        // Leadership Team
        leadership: {
          title: 'Leadership Team',
          description: 'Meet the experienced professionals driving IIS\'s continued growth and innovation',
          team: [
            {
              _key: 'leader1',
              enabled: true,
              name: 'John Anderson',
              title: 'Chief Executive Officer',
              experience: '30+ years in precision manufacturing',
              background: 'Founded IIS in 1995 after spending a decade in aerospace manufacturing quality assurance. Led the company from a two-person startup to an industry-leading precision manufacturing organization. Holds degrees in Mechanical Engineering and Business Administration. Active member of the Aerospace Industries Association and frequent speaker on advanced manufacturing topics.',
              focus: 'Strategic Vision & Business Development'
            },
            {
              _key: 'leader2',
              enabled: true,
              name: 'Sarah Mitchell',
              title: 'Chief Operating Officer',
              experience: '25+ years in manufacturing operations',
              background: 'Joined IIS in 2001 and has been instrumental in scaling operations and implementing lean manufacturing principles. Previously held operations leadership positions at Boeing and Lockheed Martin. Six Sigma Black Belt and certified in AS9100 quality management systems. Led the development of IIS\'s proprietary 4-Sigma quality system.',
              focus: 'Operations Excellence & Process Optimization'
            },
            {
              _key: 'leader3',
              enabled: true,
              name: 'David Chen',
              title: 'Chief Technology Officer',
              experience: '20+ years in manufacturing technology',
              background: 'Primary architect of the MetBase® software platform and leader of IIS\'s technology innovation initiatives. Holds a PhD in Computer Science and MS in Manufacturing Engineering. Previously developed manufacturing execution systems for major aerospace suppliers. Drives IIS\'s Industry 4.0 and adaptive manufacturing strategies.',
              focus: 'Technology Innovation & Digital Transformation'
            },
            {
              _key: 'leader4',
              enabled: true,
              name: 'Maria Rodriguez',
              title: 'Director of Quality & Compliance',
              experience: '18+ years in aerospace quality management',
              background: 'Responsible for maintaining IIS\'s AS9100D certification, ISO 9001 compliance, and ITAR registration. Previously served as Quality Manager at Spirit AeroSystems. ASQ Certified Quality Engineer and Certified Manager of Quality/Organizational Excellence. Leads all customer quality initiatives and regulatory compliance programs.',
              focus: 'Quality Assurance & Regulatory Compliance'
            }
          ]
        },

        // Core Capabilities
        capabilities: [
          {
            _key: 'cap1',
            enabled: true,
            title: 'Advanced Manufacturing',
            description: 'State-of-the-art machining capabilities for complex aerospace and defense components',
            items: [
              { _key: 'i1', item: '5-axis CNC machining centers' },
              { _key: 'i2', item: 'Adaptive machining technology' },
              { _key: 'i3', item: 'Swiss-style turning' },
              { _key: 'i4', item: 'High-speed milling' },
              { _key: 'i5', item: 'EDM capabilities' }
            ]
          },
          {
            _key: 'cap2',
            enabled: true,
            title: 'Engineering Services',
            description: 'Comprehensive design and engineering support from concept to production',
            items: [
              { _key: 'i1', item: 'Design for manufacturing (DFM)' },
              { _key: 'i2', item: 'CAD/CAM programming' },
              { _key: 'i3', item: 'Rapid prototyping' },
              { _key: 'i4', item: 'Process development' },
              { _key: 'i5', item: 'Fixture design' }
            ]
          },
          {
            _key: 'cap3',
            enabled: true,
            title: 'Quality & Metrology',
            description: 'Advanced inspection and measurement capabilities ensuring dimensional accuracy',
            items: [
              { _key: 'i1', item: 'CMM inspection (Zeiss)' },
              { _key: 'i2', item: 'Laser scanning systems' },
              { _key: 'i3', item: 'Optical measurement' },
              { _key: 'i4', item: 'First article inspection (FAI)' },
              { _key: 'i5', item: 'Statistical process control' }
            ]
          },
          {
            _key: 'cap4',
            enabled: true,
            title: 'Industry Expertise',
            description: 'Specialized knowledge serving mission-critical applications',
            items: [
              { _key: 'i1', item: 'Aerospace components' },
              { _key: 'i2', item: 'Defense systems' },
              { _key: 'i3', item: 'Medical devices' },
              { _key: 'i4', item: 'Energy sector parts' },
              { _key: 'i5', item: 'Advanced technology' }
            ]
          }
        ],

        // Certifications
        certifications: [
          { _key: 'cert1', enabled: true, certification: 'AS9100D - Aerospace Quality Management System' },
          { _key: 'cert2', enabled: true, certification: 'ISO 9001:2015 - Quality Management System' },
          { _key: 'cert3', enabled: true, certification: 'ITAR Registered - International Traffic in Arms Regulations' },
          { _key: 'cert4', enabled: true, certification: 'CMMC Level 2 - Cybersecurity Maturity Model Certification' },
          { _key: 'cert5', enabled: true, certification: 'OSHA VPP Star Site - Voluntary Protection Program' },
          { _key: 'cert6', enabled: true, certification: 'Statistical Process Control (SPC) Certified Processes' }
        ],

        // CTA Section
        cta: {
          title: 'Partner with Us',
          description: 'Experience the difference that three decades of precision manufacturing excellence can make for your next project. From prototype to production, from simple parts to complex assemblies, IIS delivers the quality, precision, and reliability you demand.',
          buttons: [
            { _key: 'cta-btn-1', enabled: true, label: 'Get Started', href: '/contact', variant: 'primary' },
            { _key: 'cta-btn-2', enabled: true, label: 'View Capabilities', href: '/services', variant: 'secondary' }
          ]
        },

        // SEO
        seo: {
          metaTitle: 'About IIS - 30+ Years of Precision Manufacturing Excellence',
          metaDescription: 'Founded in 1995, IIS has grown from a basement startup to an industry-leading precision manufacturing partner serving aerospace, defense, and advanced technology industries.'
        }
      })
      .commit();

    console.log('✅ About page populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "about"][0]{
      "hasHero": defined(hero),
      "hasStats": defined(companyStats),
      "statsCount": count(companyStats),
      "hasStory": defined(story),
      "hasTimeline": defined(timeline),
      "timelineMilestonesCount": count(timeline.milestones),
      "hasValues": defined(values),
      "valuesCount": count(values.items),
      "hasLeadership": defined(leadership),
      "leadershipCount": count(leadership.team),
      "hasCapabilities": defined(capabilities),
      "capabilitiesCount": count(capabilities),
      "hasCertifications": defined(certifications),
      "certificationsCount": count(certifications),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/about');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateAboutComplete();
