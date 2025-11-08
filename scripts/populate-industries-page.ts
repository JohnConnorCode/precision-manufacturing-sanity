import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function populateIndustriesPage() {
  const industriesPageData = {
    _id: 'industriesPage',
    _type: 'industriesPage',
    hero: {
      badge: 'SPECIALIZED SECTOR EXPERTISE',
      heading: 'Critical Industry Solutions',
      subheading: 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.'
    },
    content: {
      overviewTitle: 'Industries Overview',
      overviewStats: [
        { value: '30+', label: 'Years of Experience' },
        { value: '200+', label: 'Active Programs' },
        { value: '99.8%', label: 'Quality Rating' },
        { value: '12+', label: 'Certifications' }
      ],
      whyChooseUs: [
        {
          _key: 'why-1',
          title: 'Certified Excellence',
          description: 'AS9100D, NADCAP, and ITAR certified manufacturing ensures compliance with the strictest aerospace and defense standards.',
          iconName: 'Shield'
        },
        {
          _key: 'why-2',
          title: 'Mission-Critical Precision',
          description: 'Advanced CMM inspection and process controls deliver tolerances to ±0.0001" for zero-defect performance.',
          iconName: 'Target'
        },
        {
          _key: 'why-3',
          title: 'Rapid Response',
          description: 'Dedicated program management and expedited capabilities meet urgent delivery requirements without compromising quality.',
          iconName: 'Zap'
        },
        {
          _key: 'why-4',
          title: 'Full Traceability',
          description: 'Comprehensive material certification and process documentation provide complete supply chain transparency.',
          iconName: 'FileCheck'
        }
      ],
      provenResults: [
        {
          _key: 'result-1',
          value: '99.8%',
          label: 'On-Time Delivery',
          description: 'Consistent delivery performance across all programs'
        },
        {
          _key: 'result-2',
          value: '0.02%',
          label: 'Defect Rate',
          description: 'Industry-leading quality metrics'
        },
        {
          _key: 'result-3',
          value: '200+',
          label: 'Active Programs',
          description: 'Concurrent aerospace and defense contracts'
        },
        {
          _key: 'result-4',
          value: '24hr',
          label: 'Quote Response',
          description: 'Fast-track program evaluation and pricing'
        }
      ]
    },
    cta: {
      heading: 'Partner with Industry Experts',
      description: "Join the industry leaders who trust us with their most critical manufacturing requirements. Let's discuss your specific needs.",
      primaryButton: {
        label: 'Schedule Consultation',
        href: '/contact'
      },
      secondaryButton: {
        label: 'View Our Services',
        href: '/services'
      }
    },
    seo: {
      metaTitle: 'IIS Industries | Aerospace, Defense & Energy | Precision Manufacturing',
      metaDescription: 'Specialized precision manufacturing for aerospace, defense & energy sectors. 30+ years serving critical industries with AS9100D, ITAR & NADCAP certifications.',
      keywords: [
        'aerospace manufacturing',
        'defense manufacturing',
        'energy sector',
        'precision machining',
        'AS9100 certified',
        'ITAR registered'
      ]
    }
  };

  try {
    const result = await writeClient.createOrReplace(industriesPageData);
    console.log('✅ Industries Page created/updated successfully');
    console.log('Document ID:', result._id);
  } catch (error) {
    console.error('❌ Error creating Industries Page:', error);
    throw error;
  }
}

populateIndustriesPage().catch(console.error);
