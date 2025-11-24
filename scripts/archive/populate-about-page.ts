import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function populateAboutPage() {
  console.log('📝 Populating About page with complete content...\n');

  // First, get the existing about document
  const existingAbout = await client.fetch(`*[_type == "about"][0]`);

  if (!existingAbout) {
    console.error('❌ No about document found in Sanity');
    return;
  }

  const aboutUpdate = {
    _id: existingAbout._id,
    _type: 'about',

    // Story section (was missing)
    story: {
      title: 'Our Story',
      paragraph1: 'Founded in 1995, Integrated Inspection Systems began in a 2,500 square-foot basement with a vision: to deliver precision manufacturing excellence. What started as a small operation has grown into a 15,000 square-foot state-of-the-art facility in Clackamas, Oregon.',
      paragraph2: 'Over nearly three decades, we\'ve evolved from basic inspection services to become a comprehensive precision manufacturing partner. Our journey has been marked by continuous innovation, strategic investments in cutting-edge technology, and an unwavering commitment to quality that has earned us AS9100D certification and ITAR registration.',
      paragraph3: 'Today, IIS serves aerospace, defense, and advanced technology industries with a full spectrum of capabilities including 5-axis CNC machining, advanced metrology, and proprietary software solutions. Our growth reflects our dedication to exceeding customer expectations and solving complex manufacturing challenges.',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'IIS facility and team'
    },

    // Company stats (was missing)
    companyStats: [
      {
        value: '30+',
        label: 'Years of Excellence',
        description: 'Established in 1995'
      },
      {
        value: '15,000',
        label: 'Square Feet',
        description: 'State-of-the-art facility'
      },
      {
        value: 'AS9100D',
        label: 'Certified',
        description: 'Quality management'
      },
      {
        value: '100%',
        label: 'On-Time Delivery',
        description: 'Customer satisfaction'
      }
    ],

    // Timeline milestones (was null)
    timeline: [
      {
        year: '1995',
        title: 'Foundation',
        description: 'IIS founded in Portland, Oregon with initial focus on inspection services',
        iconName: 'Rocket'
      },
      {
        year: '2000',
        title: 'Expansion',
        description: 'Moved to larger facility and added CNC machining capabilities',
        iconName: 'Building'
      },
      {
        year: '2005',
        title: 'ISO 9001',
        description: 'Achieved ISO 9001 certification for quality management',
        iconName: 'Award'
      },
      {
        year: '2010',
        title: 'MetBase Launch',
        description: 'Developed proprietary MetBase® software for metrology data management',
        iconName: 'Code'
      },
      {
        year: '2015',
        title: 'AS9100 Certification',
        description: 'Earned AS9100 certification for aerospace quality standards',
        iconName: 'Shield'
      },
      {
        year: '2020',
        title: 'Advanced Manufacturing',
        description: 'Invested in 5-axis CNC and adaptive machining technology',
        iconName: 'Cog'
      },
      {
        year: '2024',
        title: 'Industry Leadership',
        description: 'Recognized as leading precision manufacturing partner',
        iconName: 'Trophy'
      }
    ],

    // Core values (was null)
    values: [
      {
        title: 'Precision',
        description: 'Achieving tolerances of ±0.0001" with consistent accuracy',
        iconName: 'Target'
      },
      {
        title: 'Innovation',
        description: 'Continuously advancing our technology and processes',
        iconName: 'Lightbulb'
      },
      {
        title: 'Integrity',
        description: 'Building trust through transparency and reliability',
        iconName: 'Shield'
      },
      {
        title: 'Excellence',
        description: 'Exceeding expectations in every project we undertake',
        iconName: 'Star'
      }
    ],

    // Capabilities (was missing)
    capabilities: [
      {
        title: '5-Axis CNC Machining',
        description: 'Complex geometries with tight tolerances',
        iconName: 'Cpu'
      },
      {
        title: 'CMM Inspection',
        description: 'Precision measurement and verification',
        iconName: 'Microscope'
      },
      {
        title: 'Adaptive Machining',
        description: 'Real-time process optimization',
        iconName: 'Activity'
      },
      {
        title: 'Engineering Support',
        description: 'Design for manufacturability expertise',
        iconName: 'Wrench'
      }
    ],

    // Certifications (was empty)
    certifications: [
      {
        name: 'AS9100D',
        description: 'Aerospace Quality Management',
        issuer: 'SAE International',
        year: '2015',
        iconName: 'Award',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'ISO 9001:2015',
        description: 'Quality Management Systems',
        issuer: 'ISO',
        year: '2005',
        iconName: 'CheckCircle',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'ITAR Registered',
        description: 'International Traffic in Arms Regulations',
        issuer: 'U.S. Department of State',
        year: '2010',
        iconName: 'Shield',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'
      }
    ],

    // Keep existing fields
    hero: existingAbout.hero || {
      backgroundImageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=2400&q=90',
      imageAlt: 'IIS Precision Manufacturing Facility',
      badge: 'ABOUT US',
      badgeIconName: 'Building',
      title: 'Three Decades of',
      titleHighlight: 'Excellence',
      description: 'From humble beginnings to industry leadership in precision manufacturing',
      buttons: [
        {
          label: 'Our Capabilities',
          href: '/services',
          variant: 'primary'
        },
        {
          label: 'Contact Us',
          href: '/contact',
          variant: 'secondary'
        }
      ]
    },

    leadership: existingAbout.leadership || {
      title: 'Leadership Team',
      description: 'Experienced professionals driving innovation and excellence',
      subtitle: 'Meet the experts behind IIS\'s success'
    },

    cta: existingAbout.cta || {
      title: 'Ready to Partner with IIS?',
      description: 'Let\'s discuss how our precision manufacturing expertise can support your next project.',
      buttons: [
        {
          label: 'Get Started',
          href: '/contact',
          variant: 'primary'
        },
        {
          label: 'View Services',
          href: '/services',
          variant: 'secondary'
        }
      ]
    },

    seo: existingAbout.seo || {
      metaTitle: 'About IIS - 30 Years of Precision Manufacturing Excellence',
      metaDescription: 'Founded in 1995, IIS has grown from a basement startup to an industry-leading provider of precision manufacturing and metrology services. AS9100D certified, ITAR registered.',
      metaKeywords: 'IIS history, precision manufacturing company, aerospace manufacturing, AS9100D certified'
    }
  };

  try {
    const result = await client
      .patch(existingAbout._id)
      .set(aboutUpdate)
      .commit();

    console.log('✅ Successfully populated About page with:');
    console.log('   - Story section with 3 paragraphs');
    console.log('   - 4 company stats');
    console.log('   - 7 timeline milestones');
    console.log('   - 4 core values');
    console.log('   - 4 capabilities');
    console.log('   - 3 certifications');
    console.log('   - Hero section');
    console.log('   - Leadership section');
    console.log('   - CTA section');
    console.log('\n✨ About page is now fully populated!');

  } catch (error: any) {
    console.error('❌ Error updating About page:', error.message);
  }
}

populateAboutPage().catch(console.error);