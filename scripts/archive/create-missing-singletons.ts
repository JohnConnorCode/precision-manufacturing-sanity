import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function createMissingSingletons() {
  console.log('📝 Creating missing singleton documents...\n');

  // Create Homepage
  const homepage = {
    _id: 'homepage',
    _type: 'homepage',
    hero: {
      word1: 'PRECISION',
      word2: 'MANUFACTURING',
      word3: 'EXCELLENCE',
      tagline: 'Industry-leading precision machining and metrology services for aerospace, defense, and energy sectors',
      badges: ['AS9100D CERTIFIED', 'ITAR REGISTERED', 'ISO 9001:2015']
    },
    stats: {
      enabled: true,
      items: [
        { value: '30+', label: 'Years Experience', icon: 'Calendar' },
        { value: '±0.0001"', label: 'Precision Tolerance', icon: 'Target' },
        { value: '150+', label: 'Materials Certified', icon: 'Shield' },
        { value: '24/7', label: 'Production Capability', icon: 'Clock' }
      ]
    },
    servicesSection: {
      title: 'Core Manufacturing Capabilities',
      subtitle: 'Advanced solutions for complex precision components',
      description: 'From 5-axis CNC machining to CMM inspection, we deliver unmatched precision and quality for mission-critical applications.'
    },
    industriesSection: {
      heading: 'Industries We Serve',
      subheading: 'Trusted by leading aerospace, defense, and energy companies',
      description: 'Delivering mission-critical components with zero-defect quality standards'
    },
    resourcesSection: {
      title: 'Technical Resources',
      description: 'Access comprehensive guides, specifications, and industry insights',
      benefits: [
        {
          enabled: true,
          icon: 'FileText',
          title: 'Technical Documentation',
          description: 'Complete specifications and process guides'
        },
        {
          enabled: true,
          icon: 'Award',
          title: 'Quality Standards',
          description: 'AS9100D and ISO compliance resources'
        },
        {
          enabled: true,
          icon: 'TrendingUp',
          title: 'Industry Insights',
          description: 'Latest manufacturing trends and innovations'
        }
      ],
      cta: {
        heading: 'Ready to Learn More?',
        buttons: [
          { enabled: true, text: 'View All Resources', href: '/resources', variant: 'primary' },
          { enabled: true, text: 'Contact Engineering', href: '/contact', variant: 'secondary' }
        ]
      }
    },
    cta: {
      title: 'Start Your Precision Manufacturing Project',
      description: 'Partner with industry leaders in aerospace and defense manufacturing',
      buttons: [
        { enabled: true, text: 'Request Quote', href: '/contact?type=quote', variant: 'primary' },
        { enabled: true, text: 'Engineering Support', href: '/contact?type=engineering', variant: 'secondary' }
      ]
    },
    seo: {
      metaTitle: 'IIS Precision Manufacturing | AS9100D CNC Machining & CMM Inspection',
      metaDescription: 'Industry-leading precision manufacturing services. 5-axis CNC machining, CMM inspection, and engineering solutions for aerospace, defense, and energy sectors. AS9100D certified, ITAR registered.',
      keywords: ['precision manufacturing', 'CNC machining', 'CMM inspection', 'aerospace manufacturing', 'AS9100D']
    }
  };

  // Create Footer
  const footer = {
    _id: 'footer',
    _type: 'footer',
    servicesLinks: [
      { text: '5-Axis CNC Machining', href: '/services/5-axis-machining' },
      { text: 'Precision Metrology', href: '/services/precision-metrology' },
      { text: 'Adaptive Machining', href: '/services/adaptive-machining-technology' },
      { text: 'Engineering Services', href: '/services/comprehensive-engineering-services' }
    ],
    quickLinks: [
      { text: 'About Us', href: '/about' },
      { text: 'Industries', href: '/industries' },
      { text: 'Resources', href: '/resources' },
      { text: 'Contact', href: '/contact' },
      { text: 'Careers', href: '/careers' }
    ],
    contact: {
      title: 'Integrated Inspection Systems',
      address: '14310 SE Industrial Way\nClackamas, OR 97015',
      phone: '503-231-9093',
      email: 'officemgr@iismet.com',
      hours: 'Monday - Friday: 7:00 AM - 5:00 PM PST'
    },
    social: {
      linkedin: 'https://linkedin.com/company/integrated-inspection-systems'
    },
    certifications: [
      'AS9100D Certified',
      'ISO 9001:2015',
      'ITAR Registered',
      'CMMC Compliant'
    ],
    legal: [
      { text: 'Terms & Conditions', href: '/terms' },
      { text: 'Supplier Requirements', href: '/supplier-requirements' },
      { text: 'Quality Policy', href: '/quality-policy' }
    ]
  };

  try {
    // Create Homepage
    await client.createOrReplace(homepage);
    console.log('✅ Created Homepage document');

    // Create Footer
    await client.createOrReplace(footer);
    console.log('✅ Created Footer document');

    console.log('\n✨ All singleton documents created successfully!');

  } catch (error: any) {
    console.error('❌ Error creating documents:', error.message);
  }
}

createMissingSingletons().catch(console.error);