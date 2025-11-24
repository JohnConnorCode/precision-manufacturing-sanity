const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function fixRemainingIssues() {
  console.log('🔧 FIXING REMAINING ISSUES TO ACHIEVE GOD-LIKE STATUS...\n');

  // 1. Fix homepage
  console.log('1. Fixing homepage...');
  await client.patch('homepage').set({
    'hero.title': 'Precision Manufacturing Excellence',
    'hero.buttons': [
      { _key: 'hero-btn-1', enabled: true, text: 'Our Services', href: '/services', variant: 'primary' },
      { _key: 'hero-btn-2', enabled: true, text: 'Get Quote', href: '/contact', variant: 'secondary' }
    ],
    'servicesSection.title': 'Our Services',
    'industriesSection.title': 'Industries We Serve'
  }).commit();
  console.log('   ✅ Homepage fixed');

  // 2. Add SEO to Precision Metrology
  console.log('\n2. Adding SEO to Precision Metrology...');
  const metrologyId = await client.fetch(`*[_type == "service" && slug.current == "precision-metrology"][0]._id`);
  await client.patch(metrologyId).set({
    seo: {
      metaTitle: 'Precision Metrology Services | CMM Inspection | IIS Manufacturing',
      metaDescription: 'Advanced precision metrology and CMM inspection services. ISO 17025 accredited lab with Zeiss equipment. First article inspection, GD&T analysis, and complete dimensional verification for aerospace and defense.',
      metaKeywords: 'precision metrology, CMM inspection, coordinate measuring machine, first article inspection, GD&T analysis, dimensional verification, ISO 17025, aerospace inspection, defense quality'
    }
  }).commit();
  console.log('   ✅ Precision Metrology SEO added');

  // 3. Add SEO to Engineering Services
  console.log('\n3. Adding SEO to Engineering Services...');
  const engineeringId = await client.fetch(`*[_type == "service" && slug.current == "engineering-services"][0]._id`);
  await client.patch(engineeringId).set({
    seo: {
      metaTitle: 'Engineering Services | Design for Manufacturing | CAD/CAM Programming',
      metaDescription: 'Complete engineering services from concept to production. DFM optimization, rapid prototyping, CAD/CAM programming, and process development. Supporting SolidWorks, NX, Mastercam, and more.',
      metaKeywords: 'engineering services, design for manufacturing, DFM, CAD CAM programming, rapid prototyping, process development, SolidWorks, Mastercam, manufacturing engineering'
    }
  }).commit();
  console.log('   ✅ Engineering Services SEO added');

  // 4. Add capabilities to Aerospace
  console.log('\n4. Adding 4th capability to Aerospace...');
  const aerospaceId = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]._id`);
  const aerospaceData = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]{capabilities}`);
  await client.patch(aerospaceId).set({
    capabilities: [
      ...(aerospaceData.capabilities || []),
      {
        _key: 'cap4',
        title: 'Supply Chain Management',
        description: 'Comprehensive supply chain oversight ensuring quality and traceability throughout the manufacturing process.',
        iconName: 'Network'
      }
    ]
  }).commit();
  console.log('   ✅ Aerospace capabilities updated (now 4)');

  // 5. Add capabilities to Defense
  console.log('\n5. Adding capabilities to Defense...');
  const defenseId = await client.fetch(`*[_type == "industry" && slug.current == "defense"][0]._id`);
  await client.patch(defenseId).set({
    capabilities: [
      {
        _key: 'cap1',
        title: 'ITAR Compliance',
        description: 'Full ITAR registration and compliance protocols for defense manufacturing.',
        iconName: 'Shield'
      },
      {
        _key: 'cap2',
        title: 'Security Clearance',
        description: 'Secure facility with controlled access and security clearance capabilities.',
        iconName: 'Lock'
      },
      {
        _key: 'cap3',
        title: 'Traceability Systems',
        description: 'Complete material and process traceability for defense applications.',
        iconName: 'FileText'
      },
      {
        _key: 'cap4',
        title: 'Quality Assurance',
        description: 'Rigorous QA processes meeting all defense industry standards.',
        iconName: 'CheckCircle'
      }
    ]
  }).commit();
  console.log('   ✅ Defense capabilities updated (now 4)');

  // 6. Add capabilities to Energy
  console.log('\n6. Adding capabilities to Energy...');
  const energyId = await client.fetch(`*[_type == "industry" && slug.current == "energy"][0]._id`);
  await client.patch(energyId).set({
    capabilities: [
      {
        _key: 'cap1',
        title: 'High-Temperature Materials',
        description: 'Expertise in machining high-temperature alloys for turbine applications.',
        iconName: 'Flame'
      },
      {
        _key: 'cap2',
        title: 'Large Part Machining',
        description: 'Capabilities for oversized components common in energy applications.',
        iconName: 'Maximize'
      },
      {
        _key: 'cap3',
        title: 'API/ASME Compliance',
        description: 'Full compliance with API and ASME standards for energy sector.',
        iconName: 'FileCheck'
      },
      {
        _key: 'cap4',
        title: 'Durability Testing',
        description: 'Comprehensive testing for long-term reliability in demanding environments.',
        iconName: 'Activity'
      }
    ]
  }).commit();
  console.log('   ✅ Energy capabilities updated (now 4)');

  console.log('\n✅ ALL REMAINING ISSUES FIXED!\n');
}

fixRemainingIssues().catch(console.error);
