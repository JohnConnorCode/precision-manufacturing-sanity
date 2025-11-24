#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function populateCareersComplete() {
  console.log('🚀 Populating Careers page with COMPLETE reference data...\n');

  try {
    // Check if careers document exists, create if not
    let careersDoc = await client.fetch(`*[_type == "careers"][0]`);

    if (!careersDoc) {
      console.log('❌ Careers document not found. Creating new document...');
      careersDoc = await client.create({
        _type: 'careers'
      });
      console.log(`✅ Created new Careers document: ${careersDoc._id}\n`);
    }

    const docId = careersDoc._id;
    console.log(`Found/created Careers page: ${docId}\n`);

    await client
      .patch(docId)
      .set({
        // Hero Section
        hero: {
          badge: 'CAREERS',
          title: 'Join Our Team',
          description: 'Build your career with a leader in precision manufacturing. We\'re looking for talented individuals who share our commitment to excellence, innovation, and quality.',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1d2d1e7?w=1600&q=80',
          buttons: [
            { _key: 'btn-1', label: 'Explore Opportunities', href: '#opportunities', variant: 'primary', enabled: true },
            { _key: 'btn-2', label: 'Contact HR', href: '/contact', variant: 'secondary', enabled: true }
          ]
        },

        // Why Work Here Section
        whyWorkHere: {
          heading: 'Why Work at IIS?',
          paragraph1: 'Since 1995, Integrated Inspection Systems has been a trusted leader in precision manufacturing for aerospace, defense, and advanced industries. We\'re proud of our 30-year legacy of quality, innovation, and team excellence.',
          paragraph2: 'Our team of 150+ skilled professionals works in a state-of-the-art facility using cutting-edge technology including 5-axis CNC machining, adaptive manufacturing, and advanced metrology. We maintain AS9100D, ISO 9001:2015, ITAR registration, and CMMC compliance—standards that reflect our commitment to excellence.',
          paragraph3: 'We\'re looking for engineers, technicians, machinists, and quality professionals who want to make a real impact in precision manufacturing.',
          imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80'
        },

        // Benefits Section
        benefits: {
          title: 'Benefits & Opportunities',
          description: 'We invest in our team because our people are our greatest asset',
          items: [
            {
              _key: 'benefit1',
              enabled: true,
              title: 'Collaborative Culture',
              description: 'Work with talented engineers and technicians who share your passion for precision manufacturing excellence',
              iconName: 'Users'
            },
            {
              _key: 'benefit2',
              enabled: true,
              title: 'Professional Development',
              description: 'Access to continuous training, certifications, and opportunities to advance your career in precision manufacturing',
              iconName: 'GraduationCap'
            },
            {
              _key: 'benefit3',
              enabled: true,
              title: 'Comprehensive Benefits',
              description: 'Competitive health insurance, 401(k) matching, paid time off, and a commitment to work-life balance',
              iconName: 'Heart'
            },
            {
              _key: 'benefit4',
              enabled: true,
              title: 'Industry Leadership',
              description: 'Be part of a company at the forefront of aerospace and defense precision manufacturing technology',
              iconName: 'Award'
            }
          ]
        },

        // Core Values Section
        values: {
          title: 'Our Core Values',
          description: 'These principles guide how we work, innovate, and collaborate',
          items: [
            {
              _key: 'value1',
              enabled: true,
              title: 'Excellence',
              description: 'We demand the highest standards in everything we do—from components to customer service',
              iconName: 'Star'
            },
            {
              _key: 'value2',
              enabled: true,
              title: 'Innovation',
              description: 'We invest in cutting-edge technology and encourage our team to think creatively',
              iconName: 'Lightbulb'
            },
            {
              _key: 'value3',
              enabled: true,
              title: 'Integrity',
              description: 'We operate with transparency and honesty in all our business relationships',
              iconName: 'Shield'
            },
            {
              _key: 'value4',
              enabled: true,
              title: 'Teamwork',
              description: 'Success comes from collaboration and mutual respect across all departments',
              iconName: 'Users'
            }
          ]
        },

        // Job Opportunities Section
        opportunities: {
          title: 'Current Opportunities',
          description: 'We\'re growing and actively hiring talented professionals. Don\'t see your ideal position? Let us know—we\'re always interested in exceptional talent.',
          jobs: [
            {
              _key: 'job1',
              enabled: true,
              title: 'Manufacturing Engineer',
              department: 'Engineering',
              type: 'Full-time',
              description: 'Work on advanced manufacturing processes, 5-axis CNC programming, and process optimization for aerospace components',
              qualifications: [
                { _key: 'q1', qualification: 'BS in Manufacturing Engineering or related field' },
                { _key: 'q2', qualification: '3+ years experience in aerospace manufacturing' },
                { _key: 'q3', qualification: 'Proficiency in CAD/CAM software (Mastercam, NX)' },
                { _key: 'q4', qualification: 'AS9100 quality system experience' },
                { _key: 'q5', qualification: 'Strong problem-solving and analytical skills' }
              ],
              link: '/contact'
            },
            {
              _key: 'job2',
              enabled: true,
              title: 'Quality Engineer',
              department: 'Quality Assurance',
              type: 'Full-time',
              description: 'Ensure quality excellence through CMM inspection, GD&T analysis, and first article inspection on aerospace projects',
              qualifications: [
                { _key: 'q1', qualification: 'BS in Quality Engineering or Mechanical Engineering' },
                { _key: 'q2', qualification: '2+ years CMM programming and inspection experience' },
                { _key: 'q3', qualification: 'Advanced GD&T knowledge (ASME Y14.5)' },
                { _key: 'q4', qualification: 'AS9102 First Article Inspection experience' },
                { _key: 'q5', qualification: 'Statistical process control (SPC) knowledge' }
              ],
              link: '/contact'
            },
            {
              _key: 'job3',
              enabled: true,
              title: 'CNC Machinist',
              department: 'Manufacturing',
              type: 'Full-time',
              description: 'Operate and optimize 5-axis CNC machines producing precision aerospace components. Requires AS9100 experience.',
              qualifications: [
                { _key: 'q1', qualification: '5+ years CNC machining experience' },
                { _key: 'q2', qualification: '5-axis machining center experience required' },
                { _key: 'q3', qualification: 'Aerospace quality standards knowledge' },
                { _key: 'q4', qualification: 'Blueprint reading and GD&T interpretation' },
                { _key: 'q5', qualification: 'Own precision measurement tools' }
              ],
              link: '/contact'
            }
          ]
        },

        // CTA Section
        cta: {
          title: 'Ready to Join IIS?',
          description: 'Whether you see an open position or want to let us know about your interest, we\'d love to hear from you.',
          buttons: [
            { _key: 'cta-btn-1', enabled: true, label: 'Contact HR', href: '/contact', variant: 'primary' },
            { _key: 'cta-btn-2', enabled: true, label: 'Learn About IIS', href: '/about', variant: 'secondary' }
          ]
        },

        // SEO
        seo: {
          metaTitle: 'Careers at IIS - Join Our Precision Manufacturing Team',
          metaDescription: 'Build your career with a leader in precision manufacturing. We\'re hiring engineers, machinists, and quality professionals for aerospace and defense manufacturing.'
        }
      })
      .commit();

    console.log('✅ Careers page populated with complete reference data!\n');

    const updated = await client.fetch(`*[_type == "careers"][0]{
      "hasHero": defined(hero),
      "hasWhyWorkHere": defined(whyWorkHere),
      "hasBenefits": defined(benefits),
      "benefitsCount": count(benefits.items),
      "hasValues": defined(values),
      "valuesCount": count(values.items),
      "hasOpportunities": defined(opportunities),
      "jobsCount": count(opportunities.jobs),
      "hasCta": defined(cta)
    }`);

    console.log('Verification:');
    console.log(JSON.stringify(updated, null, 2));
    console.log('\n🌐 View at: http://localhost:3002/careers');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

populateCareersComplete();
