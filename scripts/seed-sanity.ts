import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local')
  process.exit(1)
}

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

/**
 * Seed script for Sanity CMS
 * Populates initial data matching commit 03cbbe9 structure
 * Run with: npx tsx scripts/seed-sanity.ts
 */

async function seedSanity() {
  console.log('🌱 Starting Sanity seed...\n')

  try {
    // 1. CREATE SERVICES
    console.log('📦 Creating services...')

    const services = [
      {
        _id: 'service-5-axis-machining',
        _type: 'service',
        title: '5-Axis CNC Machining',
        slug: { current: '5-axis-machining' },
        order: 1,
        shortDescription:
          'Advanced multi-axis CNC capabilities for complex aerospace and defense components',
        description:
          'Our 5-axis CNC machining services provide unparalleled precision for the most demanding applications in aerospace, defense, and medical device industries.',
        iconName: 'Cog',
        highlight: true,
        published: true,
        specs: [
          { _type: 'string', _key: 'spec1', text: '±0.0001" tolerance' },
          { _type: 'string', _key: 'spec2', text: 'Titanium & super alloys' },
          { _type: 'string', _key: 'spec3', text: 'Up to 60" parts' },
        ],
      },
      {
        _id: 'service-adaptive-machining',
        _type: 'service',
        title: 'Adaptive Machining',
        slug: { current: 'adaptive-machining' },
        order: 2,
        shortDescription:
          'Intelligent material removal strategies for optimal efficiency',
        description:
          'Adaptive machining adjusts cutting parameters in real-time to optimize tool life, reduce cycle times, and improve surface finish.',
        iconName: 'Cpu',
        highlight: false,
        published: true,
        specs: [
          { _type: 'string', _key: 'spec1', text: 'In-process verification' },
          {
            _type: 'string',
            _key: 'spec2',
            text: 'Automated compensation',
          },
          { _type: 'string', _key: 'spec3', text: 'Zero defect goal' },
        ],
      },
      {
        _id: 'service-metrology',
        _type: 'service',
        title: 'Metrology & Inspection',
        slug: { current: 'metrology' },
        order: 3,
        shortDescription: 'Comprehensive measurement and inspection services',
        description:
          'State-of-the-art metrology services including CMM inspection, GD&T analysis, and AS9102 first-article inspection reports.',
        iconName: 'Gauge',
        highlight: false,
        published: true,
        specs: [
          { _type: 'string', _key: 'spec1', text: '0.00005" accuracy' },
          { _type: 'string', _key: 'spec2', text: 'GD&T analysis' },
          { _type: 'string', _key: 'spec3', text: 'AS9102 certified' },
        ],
      },
      {
        _id: 'service-engineering',
        _type: 'service',
        title: 'Engineering Support',
        slug: { current: 'engineering' },
        order: 4,
        shortDescription: 'Design, analysis, and optimization expertise',
        description:
          'Our engineering team provides design for manufacturability, process planning, and cost optimization services.',
        iconName: 'Users',
        highlight: false,
        published: true,
        specs: [
          { _type: 'string', _key: 'spec1', text: 'DFM analysis' },
          { _type: 'string', _key: 'spec2', text: 'Process planning' },
          { _type: 'string', _key: 'spec3', text: 'Cost optimization' },
        ],
      },
    ]

    for (const service of services) {
      try {
        await client.createIfNotExists(service)
        console.log(`✓ Created service: ${service.title}`)
      } catch (error) {
        console.warn(`⚠️  Service ${service.title} might already exist:`, error)
      }
    }

    // 2. CREATE INDUSTRIES
    console.log('\n🏭 Creating industries...')

    const industries = [
      {
        _id: 'industry-defense',
        _type: 'industry',
        title: 'Defense & Government',
        slug: { current: 'defense' },
        order: 1,
        shortDescription:
          'ITAR registered with rapid prototyping and secure facility capabilities',
        description:
          'ITAR registered with rapid prototyping and secure facility capabilities',
        iconName: 'Shield',
        published: true,
        features: [
          { _type: 'string', _key: 'feat1', text: 'ITAR registered' },
          { _type: 'string', _key: 'feat2', text: 'Secure facility' },
          {
            _type: 'string',
            _key: 'feat3',
            text: 'Rapid prototyping',
          },
        ],
      },
      {
        _id: 'industry-energy',
        _type: 'industry',
        title: 'Energy & Power',
        slug: { current: 'energy' },
        order: 2,
        shortDescription:
          'Superalloy expertise with large part capability and field service support',
        description:
          'Superalloy expertise with large part capability and field service support',
        iconName: 'Zap',
        published: true,
        features: [
          { _type: 'string', _key: 'feat1', text: 'Superalloy expertise' },
          {
            _type: 'string',
            _key: 'feat2',
            text: 'Large part capability',
          },
          {
            _type: 'string',
            _key: 'feat3',
            text: 'Field service support',
          },
        ],
      },
      {
        _id: 'industry-aerospace',
        _type: 'industry',
        title: 'Aerospace & Aviation',
        slug: { current: 'aerospace' },
        order: 3,
        shortDescription:
          'AS9100D certified with NADCAP accreditation and zero defect delivery',
        description:
          'AS9100D certified with NADCAP accreditation and zero defect delivery',
        iconName: 'Plane',
        published: true,
        features: [
          { _type: 'string', _key: 'feat1', text: 'AS9100D certified' },
          { _type: 'string', _key: 'feat2', text: 'NADCAP accredited' },
          {
            _type: 'string',
            _key: 'feat3',
            text: 'Zero defect delivery',
          },
        ],
      },
    ]

    for (const industry of industries) {
      try {
        await client.createIfNotExists(industry)
        console.log(`✓ Created industry: ${industry.title}`)
      } catch (error) {
        console.warn(
          `⚠️  Industry ${industry.title} might already exist:`,
          error
        )
      }
    }

    // 3. CREATE HOMEPAGE SINGLETON
    console.log('\n🏠 Creating homepage document...')

    const homepage = {
      _id: 'homepage',
      _type: 'homepage',
      title: 'Homepage',
      heroEnhanced: {
        mainTitle: 'PRECISION MANUFACTURING',
        subtitle: 'SERVICES',
        tagline:
          'Innovative Precision Machining & Manufacturing Excellence Since 1995',
        slides: [
          {
            _key: 'slide1',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-iismet-hero-1',
                _type: 'reference',
              },
              alt: 'Advanced 5-axis CNC machining center',
            },
            focal: 'center',
          },
          {
            _key: 'slide2',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-iismet-hero-2',
                _type: 'reference',
              },
              alt: 'Precision metrology and inspection',
            },
            focal: 'center',
          },
          {
            _key: 'slide3',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-iismet-hero-3',
                _type: 'reference',
              },
              alt: 'Automated manufacturing systems',
            },
            focal: 'center',
          },
          {
            _key: 'slide4',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-iismet-hero-4',
                _type: 'reference',
              },
              alt: 'Industrial engineering and process development',
            },
            focal: 'center',
          },
          {
            _key: 'slide5',
            image: {
              _type: 'image',
              asset: {
                _ref: 'image-iismet-hero-5',
                _type: 'reference',
              },
              alt: 'Defense and aerospace components manufacturing',
            },
            focal: 'center',
          },
        ],
        badges: [
          { _key: 'badge1', text: 'Advanced CNC Machining' },
          { _key: 'badge2', text: 'Precision Metrology' },
          { _key: 'badge3', text: 'Engineering Excellence' },
          { _key: 'badge4', text: '3 Sigma Yield' },
        ],
        ctaPrimary: {
          text: 'Get Quote',
          href: '/contact?interest=quote',
        },
        ctaSecondary: {
          text: 'View Capabilities',
          href: '/services',
        },
      },
      servicesSection: {
        eyebrow: 'COMPREHENSIVE MANUFACTURING SOLUTIONS',
        heading: 'PRECISION SERVICES',
        description:
          'Four core service pillars deliver comprehensive manufacturing excellence across aerospace, defense, energy, and medical device industries.',
      },
      industriesSection: {
        eyebrow: 'SPECIALIZED SECTOR EXPERTISE',
        heading: 'INDUSTRY LEADERS',
        description:
          'Three decades of trusted precision manufacturing across critical sectors with specialized expertise and certifications.',
      },
      imageShowcase: {
        header: {
          eyebrow: 'Manufacturing Excellence',
          title: 'Precision',
          titleHighlight: 'Delivered',
          description:
            'From concept to completion, we deliver aerospace-grade components with uncompromising precision',
        },
        showcaseImages: [
          {
            _key: 'showcase1',
            src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=90',
            title: 'Aerospace Components',
            category: 'Turbine Blades',
            href: '/services/5-axis-machining',
          },
          {
            _key: 'showcase2',
            src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=1200&q=90',
            title: 'Defense Systems',
            category: 'ITAR Certified',
            href: '/services/adaptive-machining',
          },
          {
            _key: 'showcase3',
            src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=90',
            title: 'Precision Metrology',
            category: 'Quality Control',
            href: '/services/metrology',
          },
        ],
        stats: [
          {
            _key: 'stat1',
            iconName: 'Award',
            value: 'AS9100D',
            label: 'Certified Quality',
            color: 'text-blue-600',
          },
          {
            _key: 'stat2',
            iconName: 'Shield',
            value: 'ITAR',
            label: 'Registered',
            color: 'text-blue-600',
          },
          {
            _key: 'stat3',
            iconName: 'Clock',
            value: '24/7',
            label: 'Production',
            color: 'text-indigo-600',
          },
          {
            _key: 'stat4',
            iconName: 'Target',
            value: '±0.0001"',
            label: 'Tolerance',
            color: 'text-blue-600',
          },
        ],
      },
    }

    try {
      await client.createIfNotExists(homepage)
      console.log('✓ Created homepage document')
    } catch (error) {
      console.warn('⚠️  Homepage might already exist:', error)
    }

    // 4. CREATE SITE SETTINGS SINGLETON
    console.log('\n⚙️ Creating site settings...')

    const siteSettings = {
      _id: 'siteSettings',
      _type: 'siteSettings',
      announcement: {
        enabled: false,
        message: 'Welcome to IIS Precision Manufacturing',
        href: null,
        linkText: null,
        variant: 'info',
      },
      company: {
        name: 'IIS - Integrated Inspection Systems',
        legalName: 'IIS Precision Manufacturing',
        tagline: 'Precision Machining & CMM Inspection Services',
        description: 'Engineering, Metrology, Machining & Database Services since 1995. AS9100 & ISO 9001 certified precision machining and CMM inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered.',
        foundingYear: '1995',
      },
      contact: {
        phone: '(503) 231-9093',
        email: 'officemgr@iismet.com',
        address: '14310 SE Industrial Way\nClackamas, OR 97015\nUnited States',
        city: 'Clackamas',
        state: 'Oregon',
        zip: '97015',
        country: 'United States',
      },
      social: {
        linkedin: 'https://www.linkedin.com/company/integrated-inspection-systems',
        twitter: 'https://twitter.com/iismet',
        facebook: '#',
        twitterHandle: '@iisprecision',
      },
      seo: {
        defaultTitle: 'IIS - Precision Machining & CMM Inspection Services | AS9100 Certified',
        defaultDescription: 'AS9100 & ISO 9001 certified precision machining and CMM inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered.',
        defaultKeywords: 'CMM inspection, AS9100, ISO 9001, ITAR, precision machining, MetBase, aerospace, defense',
      },
    }

    try {
      await client.createIfNotExists(siteSettings)
      console.log('✓ Created site settings')
    } catch (error) {
      console.warn('⚠️  Site settings might already exist:', error)
    }

    // 5. CREATE NAVIGATION SINGLETON
    console.log('\n🧭 Creating navigation...')

    const navigation = {
      _id: 'navigation',
      _type: 'navigation',
      topBar: {
        phone: '503-231-9093',
        phoneLink: 'tel:+15032319093',
        email: 'officemgr@iismet.com',
        emailLink: 'mailto:officemgr@iismet.com',
        certifications: 'ISO 9001 • AS9100D • ITAR REGISTERED',
      },
      menuItems: [
        {
          _key: 'nav-services',
          name: 'Services',
          href: '/services',
          children: [
            { _key: 'nav-5axis', name: '5-Axis Machining', href: '/services/5-axis-machining', description: 'Complex geometries with precision' },
            { _key: 'nav-adaptive', name: 'Adaptive Machining', href: '/services/adaptive-machining', description: 'Real-time process adjustments' },
            { _key: 'nav-metrology', name: 'Metrology & Inspection', href: '/services/metrology', description: 'Complete dimensional verification' },
            { _key: 'nav-engineering', name: 'Engineering Support', href: '/services/engineering', description: 'Design for manufacturability' },
          ],
        },
        {
          _key: 'nav-industries',
          name: 'Industries',
          href: '/industries',
          children: [
            { _key: 'nav-aerospace', name: 'Aerospace', href: '/industries/aerospace', description: 'Critical aerospace components' },
            { _key: 'nav-energy', name: 'Energy & Turbines', href: '/industries/energy', description: 'Power generation solutions' },
            { _key: 'nav-defense', name: 'Defense', href: '/industries/defense', description: 'ITAR compliant manufacturing' },
          ],
        },
        {
          _key: 'nav-resources',
          name: 'Resources',
          href: '/resources',
          children: [
            { _key: 'nav-res-manuf', name: 'Manufacturing Processes', href: '/resources/manufacturing-processes', description: 'CNC machining guides and techniques' },
            { _key: 'nav-res-material', name: 'Material Science', href: '/resources/material-science', description: 'Aerospace alloys and properties' },
            { _key: 'nav-res-quality', name: 'Quality & Compliance', href: '/resources/quality-compliance', description: 'AS9100D and ITAR guidance' },
            { _key: 'nav-res-industry', name: 'Industry Applications', href: '/resources/industry-applications', description: 'Real-world case studies' },
            { _key: 'nav-res-calc', name: 'Calculators & Tools', href: '/resources/calculators-tools', description: 'Interactive calculators' },
          ],
        },
        { _key: 'nav-about', name: 'About', href: '/about' },
        {
          _key: 'nav-compliance',
          name: 'Compliance',
          href: '#',
          children: [
            { _key: 'nav-terms', name: 'Terms & Conditions', href: '/compliance/terms', description: 'Purchase order terms' },
            { _key: 'nav-supplier', name: 'Supplier Requirements', href: '/compliance/supplier-requirements', description: 'Supplier guidelines' },
          ],
        },
        { _key: 'nav-contact', name: 'Contact', href: '/contact' },
      ],
      cta: {
        text: 'REQUEST QUOTE',
        href: '/contact',
      },
      styles: {
        theme: 'auto',
        alignment: 'left',
        dropdownStyle: 'card',
        density: 'comfortable',
      },
    }

    try {
      await client.createIfNotExists(navigation)
      console.log('✓ Created navigation')
    } catch (error) {
      console.warn('⚠️  Navigation might already exist:', error)
    }

    // 6. CREATE FOOTER SINGLETON
    console.log('\n📍 Creating footer...')

    const footer = {
      _id: 'footer',
      _type: 'footer',
      company: {
        description: 'Precision manufacturing and metrology solutions for aerospace, defense, and advanced industries.',
        foundedYear: '1995',
        certifications: 'ISO 9001:2015 • AS9100D • ITAR Registered',
      },
      social: {
        linkedin: 'https://www.linkedin.com/company/integrated-inspection-systems',
        twitter: 'https://twitter.com/iismet',
        facebook: '#',
      },
      servicesLinks: [
        { _key: 'foot-serv-1', label: 'Machining', href: '/services' },
        { _key: 'foot-serv-2', label: 'Inspection', href: '/services' },
        { _key: 'foot-serv-3', label: 'Fixture Design', href: '/services' },
        { _key: 'foot-serv-4', label: 'Metrology', href: '/services' },
        { _key: 'foot-serv-5', label: 'Metbase®', href: '/services' },
      ],
      resourcesLinks: [
        { _key: 'foot-res-1', label: 'All Resources', href: '/resources' },
        { _key: 'foot-res-2', label: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
        { _key: 'foot-res-3', label: 'Quality & Compliance', href: '/resources/quality-compliance' },
        { _key: 'foot-res-4', label: 'Material Science', href: '/resources/material-science' },
      ],
      quickLinks: [
        { _key: 'foot-quick-1', label: 'About Us', href: '/about' },
        { _key: 'foot-quick-2', label: 'Careers', href: '/careers' },
        { _key: 'foot-quick-3', label: 'Industries', href: '/industries' },
        { _key: 'foot-quick-4', label: 'Terms & Conditions', href: '/compliance/terms' },
        { _key: 'foot-quick-5', label: 'Supplier Requirements', href: '/compliance/supplier-requirements' },
        { _key: 'foot-quick-6', label: 'Contact', href: '/contact' },
      ],
      contact: {
        email: 'officemgr@iismet.com',
        phone: '+1 (503) 231-9093',
        phoneLink: 'tel:+15032319093',
        address: '14310 SE Industrial Way\nClackamas, OR 97015\nUnited States',
      },
      copyright: '© {year} Integrated Inspection Systems, Inc. All rights reserved.',
    }

    try {
      await client.createIfNotExists(footer)
      console.log('✓ Created footer')
    } catch (error) {
      console.warn('⚠️  Footer might already exist:', error)
    }

    // 7. CREATE CAREERS PAGE SINGLETON
    console.log('\n💼 Creating careers page...')

    const careers = {
      _id: 'careers',
      _type: 'careers',
      hero: {
        badge: 'JOIN OUR TEAM',
        badgeIconName: 'Briefcase',
        title: 'Build Your Career',
        titleHighlight: 'With Us',
        description: 'Join a team of precision manufacturing experts dedicated to aerospace and defense excellence. We offer competitive benefits, cutting-edge technology, and opportunities for professional growth.',
        buttons: [
          { _key: 'career-btn-1', label: 'View Open Positions', href: '#opportunities', variant: 'primary' },
          { _key: 'career-btn-2', label: 'Learn About Our Culture', href: '#values', variant: 'secondary' },
        ],
      },
      whyWorkHere: {
        heading: 'Why Work at IIS?',
        paragraph1: 'Since 1995, IIS has been at the forefront of precision manufacturing innovation. We combine advanced technology with expert craftsmanship to deliver mission-critical components for aerospace, defense, and energy industries.',
        paragraph2: 'Our team members work with state-of-the-art equipment including 5-axis CNC machining centers and coordinate measuring machines (CMM). We invest in continuous training and development to keep our workforce at the cutting edge of manufacturing technology.',
        paragraph3: 'As an AS9100D certified and ITAR registered facility, we maintain the highest standards of quality and security. Join us and be part of a team that takes pride in delivering precision components that power aircraft, defend our nation, and generate clean energy.',
      },
      benefits: {
        heading: 'Benefits & Perks',
        description: 'We believe in taking care of our team members with competitive benefits and a supportive work environment.',
        items: [
          { _key: 'benefit-1', iconName: 'Heart', title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
          { _key: 'benefit-2', iconName: 'DollarSign', title: 'Competitive Pay', description: 'Industry-leading wages with annual performance reviews and merit increases.' },
          { _key: 'benefit-3', iconName: 'GraduationCap', title: 'Training & Development', description: 'Ongoing training programs and tuition reimbursement for continued education.' },
          { _key: 'benefit-4', iconName: 'Clock', title: 'Paid Time Off', description: 'Generous PTO policy including vacation, sick leave, and paid holidays.' },
          { _key: 'benefit-5', iconName: 'TrendingUp', title: '401(k) Plan', description: 'Retirement savings plan with company matching contributions.' },
          { _key: 'benefit-6', iconName: 'Shield', title: 'Safe Environment', description: 'State-of-the-art facility with comprehensive safety programs and equipment.' },
        ],
      },
      values: {
        heading: 'Our Core Values',
        description: 'The principles that guide our work and shape our culture.',
        items: [
          { _key: 'value-1', title: 'Precision Excellence', description: 'We pursue perfection in every component we manufacture, maintaining tolerances of ±0.0001" and zero-defect standards.' },
          { _key: 'value-2', title: 'Continuous Innovation', description: 'We invest in cutting-edge technology and embrace new manufacturing techniques to stay ahead of industry demands.' },
          { _key: 'value-3', title: 'Team Collaboration', description: 'We believe that the best solutions come from diverse perspectives working together toward common goals.' },
          { _key: 'value-4', title: 'Customer Partnership', description: 'We build long-term relationships by understanding our customers\' needs and exceeding their expectations.' },
        ],
      },
      opportunities: {
        heading: 'Current Openings',
        description: 'Explore career opportunities across our manufacturing facility.',
        positions: [
          {
            _key: 'pos-1',
            title: 'CNC Machinist',
            description: 'Operate and program 5-axis CNC machining centers to produce precision aerospace components. Must have experience with Mastercam or similar CAM software and ability to read complex engineering drawings.',
            type: 'Full-Time',
            location: 'Clackamas, OR',
            link: '/contact?interest=cnc-machinist',
          },
          {
            _key: 'pos-2',
            title: 'Quality Inspector',
            description: 'Perform dimensional inspection using CMM and optical comparators. Experience with GD&T and AS9102 first article inspection required. Proficiency with PC-DMIS preferred.',
            type: 'Full-Time',
            location: 'Clackamas, OR',
            link: '/contact?interest=quality-inspector',
          },
          {
            _key: 'pos-3',
            title: 'Manufacturing Engineer',
            description: 'Develop manufacturing processes for new products and optimize existing production workflows. BSME or equivalent experience required. Knowledge of lean manufacturing principles preferred.',
            type: 'Full-Time',
            location: 'Clackamas, OR',
            link: '/contact?interest=manufacturing-engineer',
          },
        ],
      },
      cta: {
        heading: 'Ready to Join Our Team?',
        description: 'We\'re always looking for talented individuals who are passionate about precision manufacturing. Even if you don\'t see a position that matches your skills, we encourage you to reach out.',
        buttons: [
          { _key: 'cta-btn-1', label: 'Submit Your Resume', href: '/contact?interest=careers', variant: 'primary' },
          { _key: 'cta-btn-2', label: 'Contact HR', href: '/contact', variant: 'secondary' },
        ],
      },
      seo: {
        metaTitle: 'Careers at IIS - Join Our Precision Manufacturing Team',
        metaDescription: 'Build your career with IIS Precision Manufacturing. Competitive benefits, cutting-edge technology, and opportunities for growth in aerospace and defense manufacturing. View open positions.',
      },
    }

    try {
      await client.createIfNotExists(careers)
      console.log('✓ Created careers page')
    } catch (error) {
      console.warn('⚠️  Careers page might already exist:', error)
    }

    console.log('\n✅ Seed complete!\n')
    console.log('✨ Sanity CMS is now populated with:')
    console.log('   • 4 Services (5-Axis, Adaptive, Metrology, Engineering)')
    console.log('   • 3 Industries (Defense, Energy, Aerospace)')
    console.log('   • Homepage sections with all content')
    console.log('   • Site Settings (company info, contact, social, SEO defaults)')
    console.log('   • Navigation (header menu with all links)')
    console.log('   • Footer (footer links and content)')
    console.log('   • Careers Page (hero, benefits, values, job listings)')
    console.log('\n📝 Visit Sanity Studio to edit and customize content')
    console.log('🔗 URL: http://localhost:3000/studio\n')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seedSanity()
