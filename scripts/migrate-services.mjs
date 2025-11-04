import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const services = [
  {
    _type: 'service',
    title: '5-Axis Machining',
    slug: { current: '5-axis-machining' },
    serviceCategory: 'cnc-machining',
    contentStatus: 'published',
    hero: {
      title: '5-Axis Machining',
      subtitle: 'Precision Manufacturing Excellence',
      badge: 'ADVANCED MACHINING SERVICES',
      certifications: ['AS9100', 'ISO 9001', 'ITAR'],
    },
    overview: {
      description: 'Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Uncompromising quality and precision for mission-critical applications.',
      highlights: [
        'Complex simultaneous 5-axis contouring',
        '±0.0001" positioning accuracy',
        'Automated tool changing and optimization',
        'Real-time monitoring and quality control',
      ],
    },
  },
  {
    _type: 'service',
    title: 'Adaptive Machining',
    slug: { current: 'adaptive-machining' },
    serviceCategory: 'cnc-machining',
    contentStatus: 'published',
    hero: {
      title: 'Adaptive Machining',
      subtitle: 'Intelligent Manufacturing Technology',
      badge: 'ADVANCED MACHINING',
      certifications: ['AS9100', 'ISO 9001', 'ITAR'],
    },
    overview: {
      description: 'Adaptive machining technology that optimizes cutting conditions in real-time, reducing tool wear and improving surface finish while maintaining precision tolerances.',
      highlights: [
        'Real-time tool load monitoring',
        '40-60% improvement in tool life',
        'Automated feed rate optimization',
        'Consistent surface finish quality',
      ],
    },
  },
  {
    _type: 'service',
    title: 'Metrology Services',
    slug: { current: 'metrology' },
    serviceCategory: 'metrology',
    contentStatus: 'published',
    hero: {
      title: 'Metrology Services',
      subtitle: 'Precision Measurement Excellence',
      badge: 'PRECISION INSPECTION',
      certifications: ['AS9100', 'ISO 9001'],
    },
    overview: {
      description: 'Comprehensive metrology services including CMM inspection, GD&T analysis, first article inspection, and statistical process control for aerospace and defense components.',
      highlights: [
        'Zeiss CMM measurement systems',
        'GD&T expert analysis',
        'First article inspection capability',
        'Statistical process control',
      ],
    },
  },
  {
    _type: 'service',
    title: 'Engineering Services',
    slug: { current: 'engineering' },
    serviceCategory: 'engineering',
    contentStatus: 'published',
    hero: {
      title: 'Engineering Services',
      subtitle: 'Design & Process Optimization',
      badge: 'ENGINEERING EXPERTISE',
      certifications: ['AS9100', 'ISO 9001'],
    },
    overview: {
      description: 'Comprehensive engineering services including first article inspection, process planning, CAD/CAM programming, design optimization, and manufacturing feasibility analysis.',
      highlights: [
        'First article inspection expertise',
        'CAD/CAM programming',
        'Process planning and optimization',
        'Design for manufacturability review',
      ],
    },
  },
];

async function migrateServices() {
  console.log('Starting service migration...');
  console.log(`Migrating ${services.length} services to Sanity`);

  for (const service of services) {
    try {
      const result = await client.create(service);
      console.log(`✅ Created: ${service.title} (${result._id})`);
    } catch (error) {
      if (error.statusCode === 409) {
        // Document exists, try to update it
        const query = `*[_type == "service" && slug.current == "${service.slug.current}"][0]._id`;
        const existingId = await client.fetch(query);
        if (existingId) {
          try {
            const updated = await client.patch(existingId).set(service).commit();
            console.log(`✅ Updated: ${service.title} (${updated._id})`);
          } catch (updateError) {
            console.error(`❌ Failed to update ${service.title}:`, updateError.message);
          }
        }
      } else {
        console.error(`❌ Failed to create ${service.title}:`, error.message);
      }
    }
  }

  console.log('Migration complete!');
}

migrateServices().catch(console.error);
