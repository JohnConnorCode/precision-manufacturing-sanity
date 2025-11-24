/**
 * Script to populate Energy & Power industry page with production content
 * Run with: node scripts/update-energy-content.js
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

const energyContent = {
  title: 'Energy Manufacturing',
  slug: { _type: 'slug', current: 'energy' },
  published: true,
  order: 3,
  iconName: 'Zap',
  shortDescription: 'Precision components for power generation, oil & gas, and renewable energy systems supporting critical infrastructure with proven reliability.',

  // Hero Section
  hero: {
    badge: 'ENERGY SECTOR SOLUTIONS',
    subtitle: 'Energy Manufacturing',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=2400&q=90',
    descriptionRich: [
      {
        _type: 'block',
        _key: 'hero-desc',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Precision components for power generation, oil & gas, and renewable energy systems. Supporting critical infrastructure with proven reliability and industry compliance.',
          },
        ],
      },
    ],
    buttons: [
      { _key: 'btn-1', text: 'Request Energy Quote', href: '/contact', variant: 'primary', enabled: true },
      { _key: 'btn-2', text: 'View Capabilities', href: '#capabilities', variant: 'secondary', enabled: true },
    ],
  },

  // Statistics
  statistics: [
    { _key: 'stat-1', value: '25%', label: 'Energy Volume', description: 'of production capacity' },
    { _key: 'stat-2', value: '500MW+', label: 'Power Supported', description: 'generation equipment' },
    { _key: 'stat-3', value: '1200°F', label: 'Max Temperature', description: 'operating capability' },
    { _key: 'stat-4', value: '15,000 PSI', label: 'Pressure Rating', description: 'high-pressure systems' },
  ],

  // Overview
  overview: {
    description: 'Manufacturing precision components for critical energy infrastructure including power generation, oil & gas extraction, and renewable energy systems.',
    marketSize: 'Global energy manufacturing market exceeds $2 trillion annually',
    keyDrivers: [
      { _key: 'drv-1', driver: 'Energy transition and grid modernization' },
      { _key: 'drv-2', driver: 'Renewable energy expansion' },
      { _key: 'drv-3', driver: 'Oil & gas infrastructure upgrades' },
      { _key: 'drv-4', driver: 'Power generation efficiency improvements' },
    ],
    challenges: [
      { _key: 'chl-1', challenge: 'Extreme operating environments' },
      { _key: 'chl-2', challenge: 'High-temperature and pressure requirements' },
      { _key: 'chl-3', challenge: 'Corrosion resistance demands' },
      { _key: 'chl-4', challenge: 'Extended service life expectations' },
    ],
  },

  // Components (Energy Divisions)
  components: [
    {
      _key: 'comp-1',
      category: 'Power Generation',
      description: 'Critical components for gas turbines, steam turbines, and power plant systems',
      imageUrl: 'https://images.unsplash.com/photo-1509390006747-f339cd40e1c9?w=1200&q=90',
      parts: [
        { _key: 'part-1', part: 'Gas turbine components' },
        { _key: 'part-2', part: 'Steam turbine parts' },
        { _key: 'part-3', part: 'Generator components' },
        { _key: 'part-4', part: 'Heat exchanger tubes' },
        { _key: 'part-5', part: 'Valve bodies and stems' },
        { _key: 'part-6', part: 'Pump impellers' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Inconel 718' },
        { _key: 'mat-2', material: 'Stainless Steel 316L' },
        { _key: 'mat-3', material: 'Hastelloy C-276' },
        { _key: 'mat-4', material: 'Titanium Grade 2' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'High temperature operation' },
        { _key: 'req-2', requirement: 'Corrosion resistance' },
        { _key: 'req-3', requirement: 'Thermal cycling' },
        { _key: 'req-4', requirement: 'Precision machining' },
      ],
    },
    {
      _key: 'comp-2',
      category: 'Oil & Gas',
      description: 'Downstream and upstream components for drilling, extraction, and processing',
      imageUrl: 'https://images.unsplash.com/photo-1545431781-3e1b506e9a37?w=1200&q=90',
      parts: [
        { _key: 'part-1', part: 'Downhole tools' },
        { _key: 'part-2', part: 'Valve components' },
        { _key: 'part-3', part: 'Pump parts' },
        { _key: 'part-4', part: 'Wellhead equipment' },
        { _key: 'part-5', part: 'Pipeline fittings' },
        { _key: 'part-6', part: 'Drilling equipment' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Duplex Stainless Steel' },
        { _key: 'mat-2', material: 'Inconel 625' },
        { _key: 'mat-3', material: 'Monel 400' },
        { _key: 'mat-4', material: '17-4 PH Stainless' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'Corrosive environments' },
        { _key: 'req-2', requirement: 'High pressure systems' },
        { _key: 'req-3', requirement: 'Wear resistance' },
        { _key: 'req-4', requirement: 'Material traceability' },
      ],
    },
    {
      _key: 'comp-3',
      category: 'Renewable Energy',
      description: 'Components for wind, solar, and hydroelectric power generation systems',
      imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=90',
      parts: [
        { _key: 'part-1', part: 'Wind turbine components' },
        { _key: 'part-2', part: 'Solar tracking systems' },
        { _key: 'part-3', part: 'Hydroelectric parts' },
        { _key: 'part-4', part: 'Battery housing' },
        { _key: 'part-5', part: 'Power electronics' },
        { _key: 'part-6', part: 'Control systems' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Aluminum 6061' },
        { _key: 'mat-2', material: 'Stainless Steel 304' },
        { _key: 'mat-3', material: 'Carbon Steel' },
        { _key: 'mat-4', material: 'Copper Alloys' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'Weather resistance' },
        { _key: 'req-2', requirement: 'Long service life' },
        { _key: 'req-3', requirement: 'Cost optimization' },
        { _key: 'req-4', requirement: 'Environmental compliance' },
      ],
    },
  ],

  // Regulatory & Standards
  regulatory: {
    certifications: [
      {
        _key: 'cert-1',
        name: 'API Specifications',
        description: 'American Petroleum Institute standards',
        scope: 'API 6A, API 16A, API Q1 compliance for oil & gas equipment',
      },
      {
        _key: 'cert-2',
        name: 'ASME Compliance',
        description: 'American Society of Mechanical Engineers',
        scope: 'ASME Section VIII, B31.3 for pressure vessels and piping',
      },
      {
        _key: 'cert-3',
        name: 'ISO 14001',
        description: 'Environmental Management System',
        scope: 'Environmental compliance and sustainability practices',
      },
    ],
    standards: [
      { _key: 'std-1', name: 'ASME Y14.5', description: 'GD&T standards compliance' },
      { _key: 'std-2', name: 'OSHA', description: 'Workplace safety compliance' },
      { _key: 'std-3', name: 'EPA', description: 'Environmental regulations' },
    ],
  },

  // Capabilities
  capabilities: [
    {
      _key: 'cap-1',
      title: 'High-Temperature Materials',
      description: 'Superalloy and high-temperature resistant material machining',
      technicalDetails: [
        { _key: 'det-1', detail: 'Inconel and Hastelloy expertise' },
        { _key: 'det-2', detail: 'Heat treatment services' },
        { _key: 'det-3', detail: 'Thermal barrier coatings' },
        { _key: 'det-4', detail: 'High-temperature testing' },
      ],
    },
    {
      _key: 'cap-2',
      title: 'Pressure Vessel Components',
      description: 'ASME code compliance manufacturing',
      technicalDetails: [
        { _key: 'det-1', detail: 'Pressure testing capabilities' },
        { _key: 'det-2', detail: 'Weld procedure qualification' },
        { _key: 'det-3', detail: 'Non-destructive testing' },
        { _key: 'det-4', detail: 'Material certification' },
      ],
    },
    {
      _key: 'cap-3',
      title: 'Large Component Machining',
      description: 'Large capacity CNC machines for heavy components',
      technicalDetails: [
        { _key: 'det-1', detail: 'Precision boring and turning' },
        { _key: 'det-2', detail: 'Heavy component handling' },
        { _key: 'det-3', detail: 'Assembly services' },
        { _key: 'det-4', detail: 'Full testing capabilities' },
      ],
    },
  ],

  // Process Benefits (Specialized Capabilities)
  processBenefits: [
    {
      _key: 'benefit-1',
      title: 'Material Traceability',
      description: 'Complete documentation and certification tracking',
      features: [
        { _key: 'feat-1', feature: 'Mill test certificates' },
        { _key: 'feat-2', feature: 'Chemical composition verification' },
        { _key: 'feat-3', feature: 'Heat number tracking' },
        { _key: 'feat-4', feature: 'Material property testing' },
      ],
    },
    {
      _key: 'benefit-2',
      title: 'Extreme Environment Expertise',
      description: 'Components designed for harsh operating conditions',
      features: [
        { _key: 'feat-1', feature: 'High-temperature capability' },
        { _key: 'feat-2', feature: 'Corrosion resistance' },
        { _key: 'feat-3', feature: 'Pressure containment' },
        { _key: 'feat-4', feature: 'Thermal cycling tolerance' },
      ],
    },
    {
      _key: 'benefit-3',
      title: 'Industry Standards',
      description: 'Comprehensive compliance with energy sector requirements',
      features: [
        { _key: 'feat-1', feature: 'API specifications' },
        { _key: 'feat-2', feature: 'ASME code compliance' },
        { _key: 'feat-3', feature: 'Environmental standards' },
        { _key: 'feat-4', feature: 'Quality management systems' },
      ],
    },
  ],

  // Quality Standards
  qualityStandards: [
    { _key: 'std-1', title: 'Material Certifications' },
    { _key: 'std-2', title: 'Pressure Testing' },
    { _key: 'std-3', title: 'NDT Inspection' },
    { _key: 'std-4', title: 'Dimensional Verification' },
    { _key: 'std-5', title: 'Weld Qualification' },
    { _key: 'std-6', title: 'Heat Treatment Records' },
  ],

  // SEO
  seo: {
    metaTitle: 'Energy Manufacturing | Power Generation & Oil Gas Components',
    metaDescription: 'Precision energy components for power generation, oil & gas, and renewable energy. API certified, ASME compliant. High-temperature and high-pressure capabilities.',
    keywords: [
      { _key: 'kw-1', keyword: 'energy manufacturing' },
      { _key: 'kw-2', keyword: 'power generation' },
      { _key: 'kw-3', keyword: 'oil and gas components' },
      { _key: 'kw-4', keyword: 'renewable energy' },
    ],
  },
};

async function updateEnergyContent() {
  try {
    console.log('⚡ Starting energy content update...\n');

    // Find or create energy document
    const query = `*[_type == "industry" && slug.current == "energy"][0]._id`;
    let docId = await client.fetch(query);

    if (!docId) {
      console.log('📄 Creating new energy industry document...');
      const result = await client.create({
        _type: 'industry',
        ...energyContent,
      });
      docId = result._id;
      console.log(`✅ Created: ${docId}\n`);
    } else {
      console.log(`📄 Found document: ${docId}\n`);
      console.log('✏️  Updating content...');
      await client.patch(docId).set(energyContent).commit();
      console.log('✅ Successfully updated energy content!\n');
    }

    console.log('📊 Populated fields:');
    console.log('  - Statistics (4 metrics)');
    console.log('  - Hero section with imagery');
    console.log('  - Components (3 divisions: Power, Oil & Gas, Renewable)');
    console.log('  - API & ASME compliance');
    console.log('  - Specialized capabilities (3 categories)');
    console.log('  - Quality Standards (6 standards)');
    console.log('  - Material traceability');
    console.log('\n🎉 Energy page ready!');
    console.log('\n👀 View at: http://localhost:3000/industries/energy');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateEnergyContent();
