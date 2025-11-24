/**
 * Script to update Aerospace industry page with production content
 * Run with: node scripts/update-aerospace-content.js
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

const aerospaceUpdates = {
  // Statistics section
  statistics: [
    {
      _key: 'stat-1',
      value: '85%',
      label: 'Aerospace Volume',
      description: 'of total production',
    },
    {
      _key: 'stat-2',
      value: '150+',
      label: 'Active Programs',
      description: 'ongoing aerospace projects',
    },
    {
      _key: 'stat-3',
      value: '±0.0001"',
      label: 'Precision Tolerance',
      description: 'guaranteed accuracy',
    },
    {
      _key: 'stat-4',
      value: '100%',
      label: 'AS9100D Compliance',
      description: 'full certification',
    },
  ],

  // Hero section updates
  hero: {
    badge: 'AEROSPACE MANUFACTURING EXCELLENCE',
    subtitle: 'Aerospace Components',
    descriptionRich: [
      {
        _type: 'block',
        _key: 'hero-desc',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'hero-span',
            text: 'Trusted partner for critical aerospace components, delivering precision-machined parts for commercial and military aircraft with full AS9100D compliance and ITAR registration.',
          },
        ],
      },
    ],
    buttons: [
      {
        _key: 'btn-1',
        text: 'Request Aerospace Quote',
        href: '/contact',
        variant: 'primary',
        enabled: true,
      },
      {
        _key: 'btn-2',
        text: 'View Capabilities',
        href: '#capabilities',
        variant: 'secondary',
        enabled: true,
      },
    ],
  },

  // Update components - add missing Avionics category
  components: [
    {
      _key: 'comp-1',
      category: 'Engine Components',
      description:
        'Critical turbine and engine parts requiring extreme precision and material expertise',
      parts: [
        { _key: 'part-1', part: 'Turbine blades and vanes' },
        { _key: 'part-2', part: 'Combustor liners' },
        { _key: 'part-3', part: 'Compressor components' },
        { _key: 'part-4', part: 'Engine mounts and brackets' },
        { _key: 'part-5', part: 'Fuel system components' },
        { _key: 'part-6', part: 'Heat exchanger parts' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Inconel 718/625' },
        { _key: 'mat-2', material: 'Titanium Ti-6Al-4V' },
        { _key: 'mat-3', material: 'Hastelloy X' },
        { _key: 'mat-4', material: 'Waspaloy' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'High temperature resistance' },
        { _key: 'req-2', requirement: 'Fatigue resistance' },
        { _key: 'req-3', requirement: 'Precise airfoil geometry' },
        { _key: 'req-4', requirement: 'Surface finish requirements' },
      ],
    },
    {
      _key: 'comp-2',
      category: 'Structural Components',
      description:
        'Airframe and structural parts demanding exceptional strength and weight optimization',
      parts: [
        { _key: 'part-1', part: 'Wing brackets and fittings' },
        { _key: 'part-2', part: 'Landing gear components' },
        { _key: 'part-3', part: 'Fuselage frames' },
        { _key: 'part-4', part: 'Control surface hinges' },
        { _key: 'part-5', part: 'Structural joints' },
        { _key: 'part-6', part: 'Fastener components' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Aluminum 7075-T6' },
        { _key: 'mat-2', material: 'Titanium Ti-6Al-4V' },
        { _key: 'mat-3', material: 'Steel 15-5 PH' },
        { _key: 'mat-4', material: '17-4 PH Stainless' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'High strength-to-weight ratio' },
        { _key: 'req-2', requirement: 'Corrosion resistance' },
        { _key: 'req-3', requirement: 'Fatigue life' },
        { _key: 'req-4', requirement: 'Dimensional stability' },
      ],
    },
    {
      _key: 'comp-3',
      category: 'Avionics & Electronics',
      description:
        'Precision housings and components for aerospace electronics and control systems',
      parts: [
        { _key: 'part-1', part: 'Radar components' },
        { _key: 'part-2', part: 'Electronics housings' },
        { _key: 'part-3', part: 'Antenna assemblies' },
        { _key: 'part-4', part: 'Connector bodies' },
        { _key: 'part-5', part: 'Heat sinks' },
        { _key: 'part-6', part: 'Waveguide components' },
      ],
      materials: [
        { _key: 'mat-1', material: 'Aluminum 6061-T6' },
        { _key: 'mat-2', material: 'Magnesium AZ31' },
        { _key: 'mat-3', material: 'Copper alloys' },
        { _key: 'mat-4', material: 'Kovar alloy' },
      ],
      requirements: [
        { _key: 'req-1', requirement: 'EMI shielding' },
        { _key: 'req-2', requirement: 'Thermal management' },
        { _key: 'req-3', requirement: 'Dimensional accuracy' },
        { _key: 'req-4', requirement: 'Surface conductivity' },
      ],
    },
  ],

  // Process Benefits (Aerospace Manufacturing Advantages)
  processBenefits: [
    {
      _key: 'benefit-1',
      title: 'Advanced Manufacturing',
      description:
        '5-axis CNC machining for complex geometries and tight tolerances',
      features: [
        {
          _key: 'feat-1',
          feature: 'Simultaneous 5-axis contouring',
        },
        { _key: 'feat-2', feature: '±0.0001" tolerance capability' },
        { _key: 'feat-3', feature: 'Automated tool changing' },
        { _key: 'feat-4', feature: 'Complex contours and undercuts' },
        { _key: 'feat-5', feature: 'Superior surface finish capabilities' },
      ],
    },
    {
      _key: 'benefit-2',
      title: 'Material Expertise',
      description: 'Specialized knowledge in aerospace-grade materials',
      features: [
        {
          _key: 'feat-1',
          feature: 'High-temperature material capability',
        },
        { _key: 'feat-2', feature: 'Stress relief processing' },
        { _key: 'feat-3', feature: 'Surface finish optimization' },
        { _key: 'feat-4', feature: 'Material traceability' },
        { _key: 'feat-5', feature: 'Corrosion-resistant treatments' },
      ],
    },
    {
      _key: 'benefit-3',
      title: 'Quality Assurance',
      description: 'Comprehensive quality control throughout manufacturing',
      features: [
        { _key: 'feat-1', feature: 'In-process inspection' },
        { _key: 'feat-2', feature: 'Statistical process control' },
        { _key: 'feat-3', feature: 'First article inspection per AS9102' },
        { _key: 'feat-4', feature: 'Complete documentation' },
        { _key: 'feat-5', feature: 'Full traceability' },
      ],
    },
  ],

  // Quality Standards
  qualityStandards: [
    {
      _key: 'std-1',
      title: 'First Article Inspection (AS9102)',
      description: 'Complete FAI per aerospace standards',
    },
    {
      _key: 'std-2',
      title: 'Statistical Process Control (SPC)',
      description: 'Real-time process monitoring',
    },
    {
      _key: 'std-3',
      title: 'CMM Inspection',
      description: 'Coordinate measuring machine verification',
    },
    {
      _key: 'std-4',
      title: 'Material Certificates',
      description: 'Full material test certificates',
    },
    {
      _key: 'std-5',
      title: 'Certificate of Conformance',
      description: 'Complete compliance documentation',
    },
    {
      _key: 'std-6',
      title: 'Traceability Documentation',
      description: 'Full lot and batch traceability',
    },
  ],

  // Updated regulatory with proper scope descriptions
  regulatory: {
    certifications: [
      {
        _key: 'cert-1',
        name: 'AS9100D',
        description: 'Aerospace Quality Management System',
        scope:
          'Design, development, and manufacturing of precision aerospace components',
      },
      {
        _key: 'cert-2',
        name: 'NADCAP',
        description: 'National Aerospace and Defense Contractors Accreditation Program',
        scope:
          'Special processes including heat treating and chemical processing',
      },
      {
        _key: 'cert-3',
        name: 'ITAR',
        description: 'International Traffic in Arms Regulations',
        scope: 'Manufacturing and handling of defense-related articles and services',
      },
    ],
    standards: [
      {
        _key: 'std-1',
        name: 'FAA Part 21',
        description: 'Federal Aviation Administration certification requirements',
      },
      {
        _key: 'std-2',
        name: 'AS/EN 9100',
        description: 'Quality management system for aerospace',
      },
      {
        _key: 'std-3',
        name: 'ISO 9001',
        description: 'General quality management system',
      },
    ],
  },

  // Updated capabilities with better titles
  capabilities: [
    {
      _key: 'cap-1',
      title: 'Complex Aerospace Manufacturing',
      description:
        'Complex aerospace component manufacturing with ±0.0001" tolerances',
      technicalDetails: [
        { _key: 'det-1', detail: '5-axis simultaneous machining' },
        { _key: 'det-2', detail: 'Tight tolerance control' },
        { _key: 'det-3', detail: 'Complex geometry expertise' },
      ],
    },
    {
      _key: 'cap-2',
      title: 'Advanced Material Machining',
      description: 'Advanced titanium and superalloy machining for engines',
      technicalDetails: [
        { _key: 'det-1', detail: 'Inconel and titanium expertise' },
        { _key: 'det-2', detail: 'High-temperature materials' },
        { _key: 'det-3', detail: 'Optimized tooling strategies' },
      ],
    },
    {
      _key: 'cap-3',
      title: 'Sub-Assembly Integration',
      description: 'Sub-assembly fabrication and integration',
      technicalDetails: [
        { _key: 'det-1', detail: 'Multi-component assemblies' },
        { _key: 'det-2', detail: 'Precision fitting and alignment' },
        { _key: 'det-3', detail: 'Quality verification' },
      ],
    },
  ],
};

async function updateAerospaceContent() {
  try {
    console.log('🚀 Starting aerospace content update...\n');

    // Find the aerospace document
    const query = `*[_type == "industry" && slug.current == "aerospace"][0]._id`;
    const docId = await client.fetch(query);

    if (!docId) {
      console.error('❌ Aerospace industry document not found!');
      return;
    }

    console.log(`📄 Found document: ${docId}\n`);

    // Perform the update
    console.log('✏️  Updating content...');
    const result = await client
      .patch(docId)
      .set(aerospaceUpdates)
      .commit();

    console.log('✅ Successfully updated aerospace content!\n');
    console.log('📊 Updated fields:');
    console.log('  - Statistics (4 metrics)');
    console.log('  - Hero section (badge, subtitle, description, buttons)');
    console.log('  - Components (added Avionics & Electronics category)');
    console.log('  - Process Benefits (3 categories)');
    console.log('  - Quality Standards (6 standards)');
    console.log('  - Regulatory (enhanced descriptions)');
    console.log('  - Capabilities (improved titles and details)');
    console.log('\n🎉 Aerospace page now matches production!');
    console.log('\n👀 View at: http://localhost:3000/industries/aerospace');
  } catch (error) {
    console.error('❌ Error updating aerospace content:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

updateAerospaceContent();
