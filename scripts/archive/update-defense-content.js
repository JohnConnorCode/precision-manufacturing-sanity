/**
 * Script to populate Defense & Government industry page with production content
 * Run with: node scripts/update-defense-content.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const defenseContent = {
  title: 'Defense Manufacturing',
  slug: { _type: 'slug', current: 'defense' },
  published: true,
  order: 2,
  iconName: 'Shield',
  shortDescription: 'ITAR registered defense contractor delivering mission-critical components for national security applications with full compliance protocols.',

  // Hero Section
  hero: {
    badge: 'DEFENSE SYSTEMS',
    subtitle: 'Defense Manufacturing Excellence',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1541124356219-a0ca43e5b636?w=2400&q=90',
    descriptionRich: [
      {
        _type: 'block',
        _key: 'hero-desc',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Trusted defense contractor delivering mission-critical components for national security applications. ITAR registered facility with full security clearance and compliance protocols.',
          },
        ],
      },
    ],
    buttons: [
      { _key: 'btn-1', text: 'Request Defense Quote', href: '/contact', variant: 'primary', enabled: true },
      { _key: 'btn-2', text: 'View Capabilities', href: '#capabilities', variant: 'secondary', enabled: true },
    ],
  },

  // Statistics
  statistics: [
    { _key: 'stat-1', value: '200+', label: 'Defense Contracts', description: 'Active defense programs' },
    { _key: 'stat-2', value: 'Secret', label: 'Security Clearance', description: 'DoD cleared facility' },
    { _key: 'stat-3', value: '100%', label: 'ITAR Compliance', description: 'Fully registered' },
    { _key: 'stat-4', value: '99.8%', label: 'Quality Rating', description: 'Defense supplier score' },
  ],

  // Overview
  overview: {
    description: 'Delivering mission-critical defense components with comprehensive security compliance, quality assurance, and full traceability for national security applications.',
    marketSize: 'U.S. defense manufacturing market exceeds $350 billion annually',
    keyDrivers: [
      { _key: 'drv-1', driver: 'Military modernization programs' },
      { _key: 'drv-2', driver: 'National security priorities' },
      { _key: 'drv-3', driver: 'Technology upgrades and replacements' },
      { _key: 'drv-4', driver: 'Global threat environment evolution' },
    ],
    challenges: [
      { _key: 'chl-1', challenge: 'Stringent security and compliance requirements' },
      { _key: 'chl-2', challenge: 'Complex material specifications and traceability' },
      { _key: 'chl-3', challenge: 'Rigorous quality and testing standards' },
      { _key: 'chl-4', challenge: 'Supply chain security and vetting' },
    ],
  },

  // Components
  components: [
    {
      _key: 'comp-1',
      category: 'Weapons Systems',
      description: 'Advanced weapons platforms requiring extreme precision and reliability',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=90',
      parts: [
        { _key: 'part-1', part: 'Missile guidance components' },
        { _key: 'part-2', part: 'Fire control systems' },
        { _key: 'part-3', part: 'Targeting assemblies' },
        { _key: 'part-4', part: 'Launcher mechanisms' },
        { _key: 'part-5', part: 'Precision optics mounts' },
        { _key: 'part-6', part: 'Electronic warfare components' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Titanium Ti-6Al-4V' },
        { _key: 'mat-2', material: 'Aluminum 7075-T651' },
        { _key: 'mat-3', material: 'Steel 4340' },
        { _key: 'mat-4', material: 'Inconel 718' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'Shock resistance' },
        { _key: 'req-2', requirement: 'Temperature cycling' },
        { _key: 'req-3', requirement: 'EMI shielding' },
        { _key: 'req-4', requirement: 'Corrosion protection' },
      ],
    },
    {
      _key: 'comp-2',
      category: 'Vehicle & Platform Components',
      description: 'Military vehicle and naval system components demanding extreme durability',
      imageUrl: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1200&q=90',
      parts: [
        { _key: 'part-1', part: 'Armored vehicle components' },
        { _key: 'part-2', part: 'Tank transmission parts' },
        { _key: 'part-3', part: 'Naval system housings' },
        { _key: 'part-4', part: 'Radar mount assemblies' },
        { _key: 'part-5', part: 'Antenna positioning systems' },
        { _key: 'part-6', part: 'Communications equipment' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Steel AISI 4140' },
        { _key: 'mat-2', material: 'Aluminum 5083-H131' },
        { _key: 'mat-3', material: 'Bronze C95400' },
        { _key: 'mat-4', material: 'Stainless 17-4 PH' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'Ballistic resistance' },
        { _key: 'req-2', requirement: 'Environmental sealing' },
        { _key: 'req-3', requirement: 'Vibration tolerance' },
        { _key: 'req-4', requirement: 'Long service life' },
      ],
    },
    {
      _key: 'comp-3',
      category: 'Surveillance & Intelligence',
      description: 'Precision optical and sensor systems for intelligence gathering',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=90',
      parts: [
        { _key: 'part-1', part: 'Optical instrument housings' },
        { _key: 'part-2', part: 'Sensor mounts and gimbals' },
        { _key: 'part-3', part: 'Camera stabilization systems' },
        { _key: 'part-4', part: 'Antenna feed assemblies' },
        { _key: 'part-5', part: 'Signal processing enclosures' },
        { _key: 'part-6', part: 'Night vision components' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Aluminum 6061-T6' },
        { _key: 'mat-2', material: 'Magnesium AZ31B' },
        { _key: 'mat-3', material: 'Invar 36' },
        { _key: 'mat-4', material: 'Kovar 29-17' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'Dimensional stability' },
        { _key: 'req-2', requirement: 'Thermal management' },
        { _key: 'req-3', requirement: 'Electromagnetic compatibility' },
        { _key: 'req-4', requirement: 'Optical precision' },
      ],
    },
  ],

  // Regulatory & Compliance
  regulatory: {
    certifications: [
      {
        _key: 'cert-1',
        name: 'ITAR Registration',
        description: 'International Traffic in Arms Regulations',
        scope: 'Defense articles manufacturing, State Department registration, export compliance',
      },
      {
        _key: 'cert-2',
        name: 'NISPOM Compliance',
        description: 'National Industrial Security Program Operating Manual',
        scope: 'Classified information handling, facility clearance, personnel security',
      },
      {
        _key: 'cert-3',
        name: 'CMMC Readiness',
        description: 'Cybersecurity Maturity Model Certification',
        scope: 'Network security, access control, data protection, incident response',
      },
    ],
    standards: [
      { _key: 'std-1', name: 'AS9100D', description: 'Aerospace quality management system' },
      { _key: 'std-2', name: 'ISO 9001:2015', description: 'Quality management certified' },
      { _key: 'std-3', name: 'DCMA QA', description: 'Defense Contract Management Agency oversight' },
    ],
  },

  // Capabilities
  capabilities: [
    {
      _key: 'cap-1',
      title: 'Prime Contractor',
      description: 'Direct DoD and military branch contracts',
      technicalDetails: [
        { _key: 'det-1', detail: 'System assemblies' },
        { _key: 'det-2', detail: 'Technical data packages' },
        { _key: 'det-3', detail: 'Program management' },
      ],
    },
    {
      _key: 'cap-2',
      title: 'Subcontractor Support',
      description: 'Supporting major defense contractors',
      technicalDetails: [
        { _key: 'det-1', detail: 'Precision parts manufacturing' },
        { _key: 'det-2', detail: 'Assembly and testing' },
        { _key: 'det-3', detail: 'Supply chain management' },
      ],
    },
    {
      _key: 'cap-3',
      title: 'R&D Prototyping',
      description: 'Prototype development and technology demonstration',
      technicalDetails: [
        { _key: 'det-1', detail: 'Concept validation' },
        { _key: 'det-2', detail: 'Rapid prototyping' },
        { _key: 'det-3', detail: 'Technology transfer' },
      ],
    },
  ],

  // Process Benefits
  processBenefits: [
    {
      _key: 'benefit-1',
      title: 'Security & Compliance',
      description: 'Comprehensive facility and personnel security protocols',
      features: [
        { _key: 'feat-1', feature: 'Secret-level clearances' },
        { _key: 'feat-2', feature: 'Cybersecurity controls' },
        { _key: 'feat-3', feature: 'Visitor management' },
        { _key: 'feat-4', feature: 'Information security' },
      ],
    },
    {
      _key: 'benefit-2',
      title: 'Mission-Critical Quality',
      description: 'Zero-defect manufacturing processes',
      features: [
        { _key: 'feat-1', feature: 'Extensive testing protocols' },
        { _key: 'feat-2', feature: 'Complete traceability' },
        { _key: 'feat-3', feature: 'Statistical process control' },
        { _key: 'feat-4', feature: 'First article inspection' },
      ],
    },
    {
      _key: 'benefit-3',
      title: 'Specialized Capabilities',
      description: 'Advanced manufacturing for complex defense requirements',
      features: [
        { _key: 'feat-1', feature: 'Exotic material expertise' },
        { _key: 'feat-2', feature: 'Complex geometry machining' },
        { _key: 'feat-3', feature: 'Environmental testing' },
        { _key: 'feat-4', feature: 'Rapid response capabilities' },
      ],
    },
  ],

  // Quality Standards
  qualityStandards: [
    { _key: 'std-1', title: 'MIL-STD Compliance' },
    { _key: 'std-2', title: 'First Article Inspection' },
    { _key: 'std-3', title: 'Statistical Process Control' },
    { _key: 'std-4', title: 'Material Traceability' },
    { _key: 'std-5', title: 'NDT Inspection' },
    { _key: 'std-6', title: 'Certificate of Conformance' },
  ],

  // SEO
  seo: {
    metaTitle: 'Defense Manufacturing Services | ITAR Registered Contractor',
    metaDescription: 'ITAR registered defense contractor with Secret clearance. Mission-critical components for weapons systems, military vehicles, and surveillance equipment.',
    keywords: [
      { _key: 'kw-1', keyword: 'defense manufacturing' },
      { _key: 'kw-2', keyword: 'ITAR registered' },
      { _key: 'kw-3', keyword: 'military contractor' },
      { _key: 'kw-4', keyword: 'weapons systems' },
    ],
  },
};

async function updateDefenseContent() {
  try {
    console.log('🛡️  Starting defense content update...\n');

    // Find or create defense document
    const query = `*[_type == "industry" && slug.current == "defense"][0]._id`;
    let docId = await client.fetch(query);

    if (!docId) {
      console.log('📄 Creating new defense industry document...');
      const result = await client.create({
        _type: 'industry',
        ...defenseContent,
      });
      docId = result._id;
      console.log(`✅ Created: ${docId}\n`);
    } else {
      console.log(`📄 Found document: ${docId}\n`);
      console.log('✏️  Updating content...');
      await client.patch(docId).set(defenseContent).commit();
      console.log('✅ Successfully updated defense content!\n');
    }

    console.log('📊 Populated fields:');
    console.log('  - Statistics (4 metrics)');
    console.log('  - Hero section with imagery');
    console.log('  - Components (3 categories: Weapons, Vehicle, Surveillance)');
    console.log('  - Security & Compliance certifications');
    console.log('  - Process Benefits (3 categories)');
    console.log('  - Quality Standards (6 standards)');
    console.log('  - Contract Capabilities');
    console.log('\n🎉 Defense page ready!');
    console.log('\n👀 View at: http://localhost:3000/industries/defense');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateDefenseContent();
