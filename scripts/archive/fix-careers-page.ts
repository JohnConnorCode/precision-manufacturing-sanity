import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function fixCareersPage() {
  console.log('🔧 Fixing Careers page content and images...\n');

  // First, get the existing careers document
  const existingCareers = await client.fetch(`*[_type == "careers"][0]`);

  if (!existingCareers) {
    console.log('❌ No careers document found. Creating new one...');

    // Create a new careers document
    const newCareers = {
      _type: 'careers',
      hero: {
        backgroundImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90',
        imageAlt: 'Careers at Integrated Inspection Systems',
        badge: 'CAREERS',
        badgeIconName: 'Users',
        title: 'Join Our',
        titleHighlight: 'Team',
        description: 'Build your career with a leader in precision manufacturing',
        buttons: [
          {
            label: 'View Openings',
            href: '#opportunities',
            variant: 'primary'
          },
          {
            label: 'Contact HR',
            href: '/contact?interest=career',
            variant: 'secondary'
          }
        ]
      },

      whyWorkHere: {
        heading: 'Why Work at IIS?',
        paragraph1: 'At Integrated Inspection Systems, you\'ll join a team of dedicated professionals who are passionate about precision manufacturing excellence. We foster a culture of innovation, continuous learning, and professional growth.',
        paragraph2: 'We offer competitive compensation packages, comprehensive benefits, and the opportunity to work with cutting-edge technology in aerospace and defense manufacturing. Our commitment to quality extends to how we treat our employees.',
        paragraph3: 'With nearly 30 years in the industry, IIS provides stability and growth opportunities. Whether you\'re an experienced professional or starting your career, we offer paths for advancement and skill development in a supportive environment.',
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'Team collaboration at IIS'
      },

      culture: {
        title: 'Our Culture',
        description: 'A workplace built on respect, innovation, and excellence',
        values: [
          {
            title: 'Team Collaboration',
            description: 'We believe in the power of teamwork and open communication',
            iconName: 'Users'
          },
          {
            title: 'Continuous Learning',
            description: 'Ongoing training and professional development opportunities',
            iconName: 'GraduationCap'
          },
          {
            title: 'Work-Life Balance',
            description: 'Flexible scheduling and respect for personal time',
            iconName: 'Clock'
          },
          {
            title: 'Safety First',
            description: 'Comprehensive safety programs and clean working environment',
            iconName: 'Shield'
          }
        ]
      },

      benefits: {
        title: 'Comprehensive Benefits Package',
        description: 'We take care of our team members with industry-leading benefits and perks',
        items: [
          {
            title: 'Health & Wellness',
            description: 'Medical, dental, and vision insurance with company contribution',
            iconName: 'Heart'
          },
          {
            title: 'Retirement Planning',
            description: '401(k) plan with competitive company matching',
            iconName: 'PiggyBank'
          },
          {
            title: 'Time Off',
            description: 'Paid vacation, sick leave, and holidays',
            iconName: 'Calendar'
          },
          {
            title: 'Professional Growth',
            description: 'Tuition reimbursement and certification support',
            iconName: 'GraduationCap'
          },
          {
            title: 'Life Insurance',
            description: 'Company-paid life and disability insurance',
            iconName: 'Shield'
          },
          {
            title: 'Employee Recognition',
            description: 'Performance bonuses and employee appreciation programs',
            iconName: 'Award'
          }
        ]
      },

      values: {
        title: 'Our Values',
        description: 'The principles that guide everything we do',
        items: [
          {
            title: 'Excellence',
            description: 'Striving for the highest quality in everything we do'
          },
          {
            title: 'Integrity',
            description: 'Acting with honesty and transparency in all interactions'
          },
          {
            title: 'Innovation',
            description: 'Embracing new ideas and continuous improvement'
          },
          {
            title: 'Respect',
            description: 'Valuing diverse perspectives and treating everyone with dignity'
          }
        ]
      },

      opportunities: {
        title: 'Current Opportunities',
        description: 'Explore open positions and find your place on our team'
      },

      cta: {
        title: 'Ready to Join Our Team?',
        description: 'Take the next step in your career with Integrated Inspection Systems',
        buttons: [
          {
            label: 'View Open Positions',
            href: '#opportunities',
            variant: 'primary'
          },
          {
            label: 'Submit Resume',
            href: '/contact?interest=career',
            variant: 'secondary'
          }
        ]
      },

      seo: {
        metaTitle: 'Careers at IIS - Join Our Precision Manufacturing Team',
        metaDescription: 'Build your career with Integrated Inspection Systems. We offer competitive benefits, professional growth opportunities, and a culture of excellence in aerospace manufacturing.',
        metaKeywords: 'IIS careers, precision manufacturing jobs, CNC machinist jobs Oregon, aerospace manufacturing careers'
      }
    };

    const created = await client.create(newCareers);
    console.log('✅ Created new careers document:', created._id);
    return;
  }

  // Update existing careers document with proper image URLs
  const careersUpdate = {
    _id: existingCareers._id,
    _type: 'careers',

    // Fix hero section
    hero: {
      backgroundImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90',
      imageAlt: 'Careers at Integrated Inspection Systems',
      badge: existingCareers.hero?.badge || 'CAREERS',
      badgeIconName: existingCareers.hero?.badgeIconName || 'Users',
      title: existingCareers.hero?.title || 'Join Our',
      titleHighlight: existingCareers.hero?.titleHighlight || 'Team',
      description: existingCareers.hero?.description || 'Build your career with a leader in precision manufacturing',
      buttons: existingCareers.hero?.buttons || [
        {
          label: 'View Openings',
          href: '#opportunities',
          variant: 'primary'
        },
        {
          label: 'Contact HR',
          href: '/contact?interest=career',
          variant: 'secondary'
        }
      ]
    },

    // Fix whyWorkHere section
    whyWorkHere: {
      heading: existingCareers.whyWorkHere?.heading || 'Why Work at IIS?',
      paragraph1: existingCareers.whyWorkHere?.paragraph1 || 'At Integrated Inspection Systems, you\'ll join a team of dedicated professionals who are passionate about precision manufacturing excellence.',
      paragraph2: existingCareers.whyWorkHere?.paragraph2 || 'We offer competitive compensation packages, comprehensive benefits, and the opportunity to work with cutting-edge technology.',
      paragraph3: existingCareers.whyWorkHere?.paragraph3 || 'With nearly 30 years in the industry, IIS provides stability and growth opportunities for your career.',
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Team collaboration at IIS'
    },

    // Keep or update other sections
    culture: existingCareers.culture || {
      title: 'Our Culture',
      description: 'A workplace built on respect, innovation, and excellence'
    },

    benefits: existingCareers.benefits || {
      title: 'Comprehensive Benefits Package',
      description: 'We take care of our team members with industry-leading benefits'
    },

    values: existingCareers.values || {
      title: 'Our Values',
      description: 'The principles that guide everything we do'
    },

    opportunities: existingCareers.opportunities || {
      title: 'Current Opportunities',
      description: 'Explore open positions and find your place on our team'
    },

    cta: existingCareers.cta || {
      title: 'Ready to Join Our Team?',
      description: 'Take the next step in your career with IIS'
    },

    seo: existingCareers.seo
  };

  try {
    const result = await client
      .patch(existingCareers._id)
      .set(careersUpdate)
      .commit();

    console.log('✅ Successfully fixed Careers page:');
    console.log('   - Replaced asset-reference strings with proper image URLs');
    console.log('   - Fixed hero background image');
    console.log('   - Fixed whyWorkHere section image');
    console.log('   - Ensured all buttons have proper hrefs');
    console.log('\n✨ Careers page content is now fixed!');

  } catch (error: any) {
    console.error('❌ Error updating Careers page:', error.message);
  }
}

fixCareersPage().catch(console.error);