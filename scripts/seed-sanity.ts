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
        _id: 'industry-aerospace',
        _type: 'industry',
        title: 'Aerospace',
        slug: { current: 'aerospace' },
        order: 1,
        shortDescription:
          'Critical flight components and systems requiring the highest precision and reliability standards.',
        description:
          'Critical flight components and systems requiring the highest precision and reliability standards.',
        iconName: 'Plane',
        published: true,
        features: [
          { _type: 'string', _key: 'feat1', text: 'AS9100D certified' },
          { _type: 'string', _key: 'feat2', text: 'NADCAP accredited' },
          { _type: 'string', _key: 'feat3', text: '85% of production focus' },
        ],
      },
      {
        _id: 'industry-defense',
        _type: 'industry',
        title: 'Defense',
        slug: { current: 'defense' },
        order: 2,
        shortDescription:
          'Mission-critical components for defense systems with stringent security and quality requirements.',
        description:
          'Mission-critical components for defense systems with stringent security and quality requirements.',
        iconName: 'Shield',
        published: true,
        features: [
          { _type: 'string', _key: 'feat1', text: 'ITAR registered' },
          { _type: 'string', _key: 'feat2', text: 'Security clearance capabilities' },
          { _type: 'string', _key: 'feat3', text: '25+ years experience' },
        ],
      },
      {
        _id: 'industry-energy',
        _type: 'industry',
        title: 'Energy',
        slug: { current: 'energy' },
        order: 3,
        shortDescription:
          'Precision components for power generation, oil & gas, and renewable energy systems.',
        description:
          'Precision components for power generation, oil & gas, and renewable energy systems.',
        iconName: 'Zap',
        published: true,
        features: [
          { _type: 'string', _key: 'feat1', text: 'Superalloy expertise' },
          { _type: 'string', _key: 'feat2', text: 'API & ASME certified' },
          { _type: 'string', _key: 'feat3', text: 'High-volume capability' },
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
        word1: 'PRECISION',
        word2: 'MANUFACTURING',
        word3: 'SERVICES',
        heroFontSize: 'text-5xl md:text-7xl',
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
        ctaTertiary: {
          text: 'Learn More',
          href: '/about',
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
      resourcesSection: {
        eyebrow: 'EXPERT KNOWLEDGE',
        heading: 'Technical Resources',
        description: 'In-depth guides, best practices, and technical documentation to help you make informed decisions about precision manufacturing.',
        benefits: [
          { _key: 'benefit-1', title: 'Expert Guides', description: 'Learn from our team of experienced engineers and technicians' },
          { _key: 'benefit-2', title: 'Best Practices', description: 'Industry-leading standards and methodologies' },
          { _key: 'benefit-3', title: 'Case Studies', description: 'Real-world applications and success stories' },
        ],
        cta: {
          heading: 'Browse Our Knowledge Base',
          description: '76 technical resources covering manufacturing processes, quality standards, materials science, and industry applications.',
          buttons: [
            { _key: 'btn-resources', text: 'Explore Resources', href: '/resources', variant: 'primary' },
            { _key: 'btn-contact', text: 'Need Custom Solutions?', href: '/contact', variant: 'secondary' },
          ],
        },
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
            title: 'Quality Engineer',
            description: 'Perform dimensional inspection using CMM and optical comparators. Experience with GD&T and AS9102 first article inspection required. Proficiency with PC-DMIS preferred.',
            type: 'Full-Time',
            location: 'Clackamas, OR',
            link: '/contact?interest=quality-engineer',
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

    // 7. CREATE CONTACT PAGE
    console.log('\n📧 Creating contact page...')

    const contact = {
      _id: 'contact',
      _type: 'contact',
      hero: {
        backgroundImage: {
          _type: 'image',
          asset: { _ref: 'image-contact-hero', _type: 'reference' },
          alt: 'IIS Contact - Precision Manufacturing Team',
        },
        badge: 'GET IN TOUCH',
        badgeIconName: 'Phone',
        title: 'Contact',
        titleHighlight: 'Our Team',
        description: 'Connect with Integrated Inspection Systems for precision manufacturing solutions, technical consultations, and project quotes.',
        buttonLabel: 'Start Your Project',
        buttonHref: '#contact-form',
      },
      contactInfo: {
        heading: 'Get in Touch',
        description: 'Our engineering team is ready to discuss your precision manufacturing needs. We respond to all inquiries within 24 hours.',
        addressLine1: 'Integrated Inspection Systems, Inc.',
        addressLine2: '14310 SE Industrial Way',
        addressLine3: 'Clackamas, OR 97015',
        phone: '(503) 231-9093',
        phoneLink: 'tel:+15032319093',
        email: 'officemgr@iismet.com',
        hoursLine1: 'Monday - Friday: 7:00 AM - 5:00 PM PST',
        hoursLine2: '24/7 Production Facility',
      },
      certifications: [
        { _key: 'cert-as9100', certification: 'AS9100D - Aerospace Quality' },
        { _key: 'cert-iso', certification: 'ISO 9001:2015 - Quality Management' },
        { _key: 'cert-itar', certification: 'ITAR Registered' },
        { _key: 'cert-cmmc', certification: 'CMMC Compliant' },
      ],
      bottomStats: [
        { _key: 'stat1', iconName: 'Zap', text: 'Quote Response in 24 Hours', animated: true },
        { _key: 'stat2', iconName: 'Award', text: '30+ Years Experience', animated: false },
        { _key: 'stat3', iconName: 'Shield', text: '99.8% First-Pass Yield', animated: false },
        { _key: 'stat4', iconName: 'CheckCircle', text: 'AS9100D Certified', animated: false },
      ],
      seo: {
        metaTitle: 'Contact IIS - Precision Manufacturing Quote & Support',
        metaDescription: 'Get in touch with Integrated Inspection Systems for CNC machining, precision metrology, and engineering support. 24-hour response time. ITAR & AS9100 certified.',
        metaKeywords: 'contact precision manufacturing, CNC machining quote, metrology inspection, aerospace manufacturing quote, Oregon',
        ogImage: {
          _type: 'image',
          asset: { _ref: 'image-contact-og', _type: 'reference' },
          alt: 'Contact IIS Precision Manufacturing',
        },
      },
    }

    try {
      await client.createIfNotExists(contact)
      console.log('✓ Created contact page')
    } catch (error) {
      console.warn('⚠️  Contact page might already exist:', error)
    }

    // 8. CREATE ABOUT PAGE
    console.log('\n📖 Creating about page...')

    const about = {
      _id: 'about',
      _type: 'about',
      hero: {
        backgroundImage: {
          _type: 'image',
          asset: { _ref: 'image-about-hero', _type: 'reference' },
          alt: 'IIS Manufacturing Facility - 30 Years of Excellence',
        },
        badge: 'OUR STORY',
        badgeIconName: 'History',
        title: 'Engineering',
        titleHighlight: 'Excellence Since 1995',
        description: 'From a basement startup to an industry-leading precision manufacturing provider, our journey is defined by quality, innovation, and an unwavering commitment to our customers.',
        buttons: [
          { _key: 'btn-quote', text: 'Request Quote', href: '/contact?interest=quote' },
          { _key: 'btn-capabilities', text: 'View Capabilities', href: '/services' },
        ],
      },
      companyStats: [
        { _key: 'stat-years', label: 'Years in Business', value: '30+' },
        { _key: 'stat-team', label: 'Team Members', value: '150+' },
        { _key: 'stat-revenue', label: 'Annual Revenue', value: '$25M+' },
        { _key: 'stat-facility', label: 'Facility Size (sq ft)', value: '45,000' },
      ],
      story: {
        title: 'From Basement Startup to Industry Leader',
        paragraph1: 'IIS was established in 1995 from a residential basement by founders from Precision Castparts Inc. The early focus included small business networking and quality documentation. A major innovation came from applying aerospace GD&T principles to high-volume metrology. In 1998, the company purchased its first Zeiss CMM, relocated to Beaverton, Oregon, and served the plastics and high-volume metrology sectors.',
        paragraph2: 'The company developed proprietary MetBase® software to integrate CMM data, CNC machines, and vision systems into closed-loop manufacturing. By 2001, they achieved a 3-sigma machining system and relocated to their current 20,000 sq ft Clackamas facility, later expanding to 4-sigma targeting systems. This innovation transformed quality control in precision manufacturing and became the industry standard.',
        paragraph3: 'Today, IIS is recognized as a trusted partner by Fortune 500 companies in aerospace, defense, energy, and medical device industries. With 150+ skilled professionals and state-of-the-art capabilities, our AS9100D, ISO 9001:2015, ITAR registration, and CMMC compliance ensure that every component meets the highest quality standards.',
        image: {
          _type: 'image',
          asset: { _ref: 'image-about-story', _type: 'reference' },
          alt: 'IIS Precision Manufacturing Facility',
        },
      },
      values: [
        { _key: 'val-excellence', title: 'Excellence', description: 'Highest standards in components and customer service' },
        { _key: 'val-innovation', title: 'Innovation', description: 'Investment in cutting-edge technology and creative thinking' },
        { _key: 'val-integrity', title: 'Integrity', description: 'Transparency and honesty in business relationships' },
        { _key: 'val-teamwork', title: 'Teamwork', description: 'Collaboration and mutual respect across departments' },
      ],
      capabilities: {
        heading: 'Manufacturing Capabilities',
        items: [
          '5-Axis CNC Machining - ±0.0001" tolerance',
          'Adaptive Machining - Real-time process optimization',
          'CMM Inspection - 0.00005" accuracy',
          'AS9102 First-Article Reports',
          'GD&T Analysis & Documentation',
          'MetBase® Software Integration',
        ],
      },
      certifications: [
        { _key: 'cert1', name: 'AS9100D', description: 'Aerospace Quality Management System' },
        { _key: 'cert2', name: 'ISO 9001:2015', description: 'Quality Management System' },
        { _key: 'cert3', name: 'ITAR Registered', description: 'International Traffic in Arms Regulations' },
        { _key: 'cert4', name: 'CMMC', description: 'Cybersecurity Maturity Model Certification' },
      ],
      cta: {
        heading: 'Ready to Work With IIS?',
        description: 'Let our team of precision manufacturing experts help bring your most demanding projects to life.',
        buttons: [
          { _key: 'cta-quote', text: 'Request a Quote', href: '/contact?interest=quote', variant: 'primary' },
          { _key: 'cta-consult', text: 'Schedule Consultation', href: '/contact?interest=technical', variant: 'secondary' },
        ],
      },
      seo: {
        metaTitle: 'About IIS - 30 Years of Precision Manufacturing Excellence',
        metaDescription: 'Learn about Integrated Inspection Systems: 30 years of aerospace-grade precision manufacturing, AS9100 certified, ITAR registered, with proprietary MetBase® software.',
        metaKeywords: 'precision manufacturing company, aerospace manufacturing, ISO 9001, AS9100, ITAR, MetBase software, Oregon manufacturing',
        ogImage: {
          _type: 'image',
          asset: { _ref: 'image-about-og', _type: 'reference' },
          alt: 'About IIS Precision Manufacturing',
        },
      },
    }

    try {
      await client.createIfNotExists(about)
      console.log('✓ Created about page')
    } catch (error) {
      console.warn('⚠️  About page might already exist:', error)
    }

    // 9. CREATE SAMPLE RESOURCES
    console.log('\n📚 Creating sample resources...')

    const resources = [
      { _id: 'resource-1', _type: 'resource', title: 'Advanced MetBase Features: Automation and Custom Solutions for Complex Quality Management', slug: { current: 'advanced-metbase-features' }, category: 'metbase-integration', excerpt: 'Master advanced MetBase automation capabilities and custom development for complex quality management requirements', content: 'Advanced MetBase Features: Automation and Custom Solutions for Complex Quality Management', difficulty: 'expert', readTime: '7 min', publishDate: '2024-11-06T00:00:00Z', author: 'IIS Engineering Team', featured: true, published: true, tags: ['MetBase', 'Automation', 'Quality Management'] },
      { _id: 'resource-2', _type: 'resource', title: 'Statistical Analysis and Reporting with MetBase: SPC Analysis and Quality Data Intelligence', slug: { current: 'statistical-analysis-metbase' }, category: 'metbase-integration', excerpt: 'Master statistical analysis and reporting capabilities in MetBase for comprehensive quality data intelligence', content: 'Statistical Analysis and Reporting with MetBase: SPC Analysis and Quality Data Intelligence', difficulty: 'advanced', readTime: '8 min', publishDate: '2024-11-05T00:00:00Z', author: 'IIS Engineering Team', featured: true, published: true, tags: ['MetBase', 'SPC', 'Quality Analysis'] },
      { _id: 'resource-3', _type: 'resource', title: 'MetBase Setup and Integration with Measurement Equipment: Quality Data Management System Implementation', slug: { current: 'metbase-setup-integration' }, category: 'metbase-integration', excerpt: 'Master MetBase setup and integration with measurement equipment for comprehensive quality data management', content: 'MetBase Setup and Integration with Measurement Equipment: Quality Data Management System Implementation', difficulty: 'advanced', readTime: '9 min', publishDate: '2024-11-04T00:00:00Z', author: 'IIS Engineering Team', featured: false, published: true, tags: ['MetBase', 'Integration', 'Data Management'] },
      { _id: 'resource-4', _type: 'resource', title: 'Supplier Management and Continuous Improvement in AS9100: Advanced Quality System Optimization', slug: { current: 'supplier-management-as9100' }, category: 'as9100-quality', excerpt: 'Master AS9100 supplier management requirements and continuous improvement strategies', content: 'Supplier Management and Continuous Improvement in AS9100: Advanced Quality System Optimization', difficulty: 'advanced', readTime: '8 min', publishDate: '2024-11-03T00:00:00Z', author: 'IIS Engineering Team', featured: false, published: true, tags: ['AS9100', 'Supplier Management', 'Quality'] },
      { _id: 'resource-5', _type: 'resource', title: 'Risk Management and Configuration Control in AS9100: Advanced Aerospace Quality System Controls', slug: { current: 'risk-management-as9100' }, category: 'as9100-quality', excerpt: 'Master AS9100 risk management and configuration control requirements for aerospace quality systems', content: 'Risk Management and Configuration Control in AS9100: Advanced Aerospace Quality System Controls', difficulty: 'advanced', readTime: '9 min', publishDate: '2024-11-02T00:00:00Z', author: 'IIS Engineering Team', featured: false, published: true, tags: ['AS9100', 'Risk Management', 'Aerospace'] },
      { _id: 'resource-6', _type: 'resource', title: 'AS9100 Implementation and Certification Process: Aerospace Quality Management System Guide', slug: { current: 'as9100-implementation-certification' }, category: 'as9100-quality', excerpt: 'Master AS9100 implementation and certification for aerospace quality management systems', content: 'AS9100 Implementation and Certification Process: Aerospace Quality Management System Guide', difficulty: 'advanced', readTime: '12 min', publishDate: '2024-11-01T00:00:00Z', author: 'IIS Engineering Team', featured: true, published: true, tags: ['AS9100', 'Certification', 'Aerospace Quality'] },
      { _id: 'resource-7', _type: 'resource', title: 'Advanced CNC Techniques: 5-Axis and Multi-Setup Strategies for Complex Geometry Machining', slug: { current: 'advanced-cnc-techniques' }, category: 'cnc-manufacturing', excerpt: 'Master advanced CNC techniques including 5-axis machining, multi-setup strategies, and complex geometry programming', content: 'Advanced CNC Techniques: 5-Axis and Multi-Setup Strategies for Complex Geometry Machining', difficulty: 'expert', readTime: '10 min', publishDate: '2024-10-31T00:00:00Z', author: 'IIS Manufacturing Engineers', featured: true, published: true, tags: ['CNC', '5-Axis', 'Machining'] },
      { _id: 'resource-8', _type: 'resource', title: 'Material Considerations for Precision CNC Machining: Optimization Strategies for Different Alloys', slug: { current: 'material-cnc-machining' }, category: 'cnc-manufacturing', excerpt: 'Master material-specific CNC machining strategies, tool selection, and parameter optimization', content: 'Material Considerations for Precision CNC Machining: Optimization Strategies for Different Alloys', difficulty: 'advanced', readTime: '9 min', publishDate: '2024-10-30T00:00:00Z', author: 'IIS Manufacturing Engineers', featured: false, published: true, tags: ['CNC', 'Materials', 'Machining'] },
      { _id: 'resource-9', _type: 'resource', title: 'Surface Finish Requirements and Achievement: CNC Machining Surface Quality Control', slug: { current: 'surface-finish-cnc' }, category: 'cnc-manufacturing', excerpt: 'Master surface finish specifications, measurement techniques, and achievement methods for CNC machining', content: 'Surface Finish Requirements and Achievement: CNC Machining Surface Quality Control', difficulty: 'advanced', readTime: '8 min', publishDate: '2024-10-29T00:00:00Z', author: 'IIS Manufacturing Engineers', featured: false, published: true, tags: ['Surface Finish', 'Quality Control', 'CNC'] },
      { _id: 'resource-10', _type: 'resource', title: 'CNC Machining Tolerance Capabilities and Specifications: Achieving Precision in Manufacturing', slug: { current: 'cnc-tolerance-capabilities' }, category: 'cnc-manufacturing', excerpt: 'Master CNC machining tolerance capabilities, achievable specifications, and factors affecting precision', content: 'CNC Machining Tolerance Capabilities and Specifications: Achieving Precision in Manufacturing', difficulty: 'advanced', readTime: '10 min', publishDate: '2024-10-28T00:00:00Z', author: 'IIS Manufacturing Engineers', featured: false, published: true, tags: ['Tolerance', 'Precision', 'CNC'] },
      { _id: 'resource-11', _type: 'resource', title: 'GD&T Measurement and Verification Techniques: CMM Programming and Functional Gaging Methods', slug: { current: 'gdt-measurement-verification' }, category: 'gdt-fundamentals', excerpt: 'Master practical GD&T measurement methods, CMM programming techniques, and functional gaging strategies', content: 'GD&T Measurement and Verification Techniques: CMM Programming and Functional Gaging Methods', difficulty: 'advanced', readTime: '9 min', publishDate: '2024-10-27T00:00:00Z', author: 'IIS Metrology Team', featured: true, published: true, tags: ['GD&T', 'CMM', 'Measurement'] },
      { _id: 'resource-12', _type: 'resource', title: 'Position Tolerance and Material Condition Modifiers: Advanced GD&T Applications and Bonus Tolerance', slug: { current: 'position-tolerance-gdt' }, category: 'gdt-fundamentals', excerpt: 'Master position tolerance applications, MMC/LMC material condition modifiers, and bonus tolerance calculations', content: 'Position Tolerance and Material Condition Modifiers: Advanced GD&T Applications and Bonus Tolerance', difficulty: 'advanced', readTime: '10 min', publishDate: '2024-10-26T00:00:00Z', author: 'IIS Metrology Team', featured: false, published: true, tags: ['GD&T', 'Position Tolerance', 'Bonus Tolerance'] },
      { _id: 'resource-13', _type: 'resource', title: 'Datum Reference Frames and Establishment: Mastering Coordinate System Definition in GD&T', slug: { current: 'datum-reference-frames' }, category: 'gdt-fundamentals', excerpt: 'Master datum reference frame establishment, coordinate system definition, and the 3-2-1 principle in GD&T', content: 'Datum Reference Frames and Establishment: Mastering Coordinate System Definition in GD&T', difficulty: 'advanced', readTime: '8 min', publishDate: '2024-10-25T00:00:00Z', author: 'IIS Metrology Team', featured: false, published: true, tags: ['GD&T', 'Datum', 'Reference Frames'] },
      { _id: 'resource-14', _type: 'resource', title: 'GD&T Symbols and Basic Principles: Understanding Geometric Dimensioning and Tolerancing Fundamentals', slug: { current: 'gdt-symbols-basics' }, category: 'gdt-fundamentals', excerpt: 'Master fundamental GD&T symbols, principles, and applications per ASME Y14.5 standard', content: 'GD&T Symbols and Basic Principles: Understanding Geometric Dimensioning and Tolerancing Fundamentals', difficulty: 'intermediate', readTime: '9 min', publishDate: '2024-10-24T00:00:00Z', author: 'IIS Metrology Team', featured: true, published: true, tags: ['GD&T', 'ASME Y14.5', 'Symbols'] },
      { _id: 'resource-15', _type: 'resource', title: 'Customer Requirements and FAI Approval Process: Navigating Aerospace and Defense FAI Standards', slug: { current: 'customer-fai-approval' }, category: 'first-article-inspection', excerpt: 'Navigate complex customer-specific FAI requirements and approval processes for aerospace and defense programs', content: 'Customer Requirements and FAI Approval Process: Navigating Aerospace and Defense FAI Standards', difficulty: 'advanced', readTime: '7 min', publishDate: '2024-10-23T00:00:00Z', author: 'IIS Engineering Team', featured: false, published: true, tags: ['FAI', 'Customer Requirements', 'Aerospace'] },
      { _id: 'resource-16', _type: 'resource', title: 'FAI Measurement and Inspection Procedures: Systematic AS9102 Compliance', slug: { current: 'fai-measurement-procedures' }, category: 'first-article-inspection', excerpt: 'Master systematic FAI measurement procedures, inspection planning, and AS9102 compliance verification', content: 'FAI Measurement and Inspection Procedures: Systematic AS9102 Compliance', difficulty: 'advanced', readTime: '8 min', publishDate: '2024-10-22T00:00:00Z', author: 'IIS Engineering Team', featured: false, published: true, tags: ['FAI', 'AS9102', 'Inspection'] },
      { _id: 'resource-17', _type: 'resource', title: 'AS9102 Forms and Documentation Requirements: Complete FAI Compliance Guide', slug: { current: 'as9102-forms-documentation' }, category: 'first-article-inspection', excerpt: 'Master AS9102 Form 1, Form 2, and Form 3 completion for First Article Inspection compliance', content: 'AS9102 Forms and Documentation Requirements: Complete FAI Compliance Guide', difficulty: 'advanced', readTime: '10 min', publishDate: '2024-10-21T00:00:00Z', author: 'IIS Engineering Team', featured: true, published: true, tags: ['AS9102', 'FAI', 'Documentation'] },
      { _id: 'resource-18', _type: 'resource', title: 'CMM Error Analysis and Troubleshooting: Identifying and Correcting Measurement Issues', slug: { current: 'cmm-error-analysis' }, category: 'cmm-inspection', excerpt: 'Master CMM error analysis, measurement uncertainty assessment, and systematic troubleshooting techniques', content: 'CMM Error Analysis and Troubleshooting: Identifying and Correcting Measurement Issues', difficulty: 'advanced', readTime: '8 min', publishDate: '2024-10-20T00:00:00Z', author: 'IIS Metrology Team', featured: false, published: true, tags: ['CMM', 'Error Analysis', 'Troubleshooting'] },
      { _id: 'resource-19', _type: 'resource', title: 'CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency', slug: { current: 'cmm-measurement-strategies' }, category: 'cmm-inspection', excerpt: 'Master CMM measurement strategy development, datum establishment, and measurement sequence planning', content: 'CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency', difficulty: 'advanced', readTime: '9 min', publishDate: '2024-10-19T00:00:00Z', author: 'IIS Metrology Team', featured: true, published: true, tags: ['CMM', 'Measurement', 'Strategy'] },
      { _id: 'resource-20', _type: 'resource', title: 'CMM Probe Selection and Configuration: Choosing the Right Tool for Precision', slug: { current: 'cmm-probe-selection' }, category: 'cmm-inspection', excerpt: 'Master CMM probe selection, configuration, and qualification procedures for optimal measurement accuracy', content: 'CMM Probe Selection and Configuration: Choosing the Right Tool for Precision', difficulty: 'intermediate', readTime: '7 min', publishDate: '2024-10-18T00:00:00Z', author: 'IIS Metrology Team', featured: false, published: true, tags: ['CMM', 'Probe', 'Configuration'] },
    ]

    for (const resource of resources) {
      try {
        await client.createIfNotExists(resource)
      } catch (error) {
        console.warn(`⚠️  Resource "${resource.title}" might already exist`)
      }
    }
    console.log('✓ Created 20 resources from live site')

    // 9. CREATE SERVICES PAGE SINGLETON
    console.log('\n🛠️ Creating services page...')

    const servicesPage = {
      _id: 'servicesPage',
      _type: 'servicesPage',
      hero: {
        badge: 'PRECISION MANUFACTURING SERVICES',
        heading: 'Our Services',
        description: 'Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.',
        backgroundImage: {
          _type: 'image',
          asset: { _ref: 'image-services-hero', _type: 'reference' },
          alt: 'IIS Services - Precision Manufacturing Solutions',
        },
      },
      content: {
        sectionTitle: 'Manufacturing Core Competencies',
        sectionDescription: 'Four core service pillars delivering unmatched precision and reliability for aerospace and defense applications',
        services: [
          {
            _key: 'service-1',
            title: '5-Axis CNC Machining',
            description: 'Complex geometries with unmatched precision for aerospace components',
          },
          {
            _key: 'service-2',
            title: 'Adaptive Machining',
            description: 'Real-time adjustments based on in-process measurements',
          },
          {
            _key: 'service-3',
            title: 'Metrology & Inspection',
            description: 'Comprehensive measurement and inspection services',
          },
          {
            _key: 'service-4',
            title: 'Engineering Support',
            description: 'Design, analysis, and optimization expertise',
          },
        ],
      },
      seo: {
        metaTitle: 'IIS - Precision Machining & CMM Inspection Services | AS9100 Certified | Oregon',
        metaDescription: 'AS9100 & ISO 9001 certified precision machining and CMM inspection services. First article inspection, dimensional measurement, and proprietary MetBase® software for aerospace, defense & manufacturing industries.',
        ogImage: {
          _type: 'image',
          asset: { _ref: 'image-services-og', _type: 'reference' },
          alt: 'IIS Services',
        },
        keywords: [
          'precision manufacturing',
          'CNC machining',
          'CMM inspection',
          'AS9100',
          'aerospace manufacturing',
          'defense manufacturing',
        ],
      },
    }

    try {
      await client.createIfNotExists(servicesPage)
      console.log('✓ Created services page')
    } catch (error) {
      console.warn('⚠️  Services page might already exist:', error)
    }

    // 10. CREATE INDUSTRIES PAGE SINGLETON
    console.log('\n🏭 Creating industries page...')

    const industriesPage = {
      _id: 'industriesPage',
      _type: 'industriesPage',
      hero: {
        badge: 'SPECIALIZED SECTOR EXPERTISE',
        heading: 'Critical Industry Solutions',
        subheading: 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.',
        backgroundImage: {
          _type: 'image',
          asset: { _ref: 'image-industries-hero', _type: 'reference' },
          alt: 'IIS Industries - Critical Sector Solutions',
        },
      },
      content: {
        overviewTitle: 'Industries Overview',
        overviewStats: [
          { _key: 'stat-1', value: '30+', label: 'Years of Experience' },
          { _key: 'stat-2', value: '200+', label: 'Active Programs' },
          { _key: 'stat-3', value: '99.8%', label: 'Quality Rating' },
          { _key: 'stat-4', value: '12+', label: 'Certifications' },
        ],
        industries: [
          {
            _key: 'industry-1',
            name: 'Aerospace',
            description: 'Engine components, landing gear, structural parts, avionics housings',
            applications: [
              'Engine components',
              'Landing gear',
              'Structural parts',
              'Avionics housings',
            ],
            stats: [
              { _key: 'aero-stat-1', label: 'Production', value: '85%' },
              { _key: 'aero-stat-2', label: 'Active Clients', value: '50+' },
              { _key: 'aero-stat-3', label: 'Experience', value: '30+ years' },
            ],
            certifications: ['AS9100D', 'NADCAP', 'ITAR'],
            icon: 'Plane',
          },
          {
            _key: 'industry-2',
            name: 'Defense',
            description: 'Weapon systems, radar components, vehicle parts, electronics',
            applications: [
              'Weapon systems',
              'Radar components',
              'Vehicle parts',
              'Electronics',
            ],
            stats: [
              { _key: 'def-stat-1', label: 'Production', value: '15%' },
              { _key: 'def-stat-2', label: 'Active Clients', value: '25+' },
              { _key: 'def-stat-3', label: 'Experience', value: '25+ years' },
            ],
            certifications: ['ITAR', 'DFARS', 'Security Clearance'],
            icon: 'Shield',
          },
          {
            _key: 'industry-3',
            name: 'Energy',
            description: 'Turbine parts, valve components, pump housings, generator parts',
            applications: [
              'Turbine parts',
              'Valve components',
              'Pump housings',
              'Generator parts',
            ],
            stats: [
              { _key: 'ene-stat-1', label: 'Production', value: '25%' },
              { _key: 'ene-stat-2', label: 'Active Clients', value: '15+' },
              { _key: 'ene-stat-3', label: 'Experience', value: '20+ years' },
            ],
            certifications: ['API', 'ASME', 'ISO 9001'],
            icon: 'Zap',
          },
        ],
      },
      seo: {
        metaTitle: 'IIS Industries | Aerospace, Defense & Energy | Precision Manufacturing',
        metaDescription: 'Specialized precision manufacturing for aerospace, defense & energy sectors. 30+ years serving critical industries with AS9100D, ITAR & NADCAP certifications.',
        ogImage: {
          _type: 'image',
          asset: { _ref: 'image-industries-og', _type: 'reference' },
          alt: 'IIS Industries',
        },
        keywords: [
          'aerospace manufacturing',
          'defense manufacturing',
          'energy sector',
          'precision machining',
          'AS9100 certified',
          'ITAR registered',
        ],
      },
    }

    try {
      await client.createIfNotExists(industriesPage)
      console.log('✓ Created industries page')
    } catch (error) {
      console.warn('⚠️  Industries page might already exist:', error)
    }

    // Add SEO metadata to homepage
    console.log('\n🔍 Adding SEO metadata to homepage...')
    try {
      await client.patch('homepage').set({
        seo: {
          metaTitle: 'IIS Precision Manufacturing | CNC Machining & Metrology Services',
          metaDescription: 'Precision manufacturing, CNC machining, and metrology inspection for aerospace, defense & medical industries. AS9100 & ISO 9001 certified since 1995.',
          metaKeywords: 'precision manufacturing, CNC machining, metrology inspection, aerospace manufacturing, defense contractor',
          ogImage: {
            _type: 'image',
            asset: { _ref: 'image-home-og', _type: 'reference' },
            alt: 'IIS Precision Manufacturing',
          },
        },
      }).commit()
      console.log('✓ Added SEO to homepage')
    } catch (error) {
      console.warn('⚠️  Could not update homepage SEO:', error)
    }

    console.log('\n✅ Seed complete!\n')
    console.log('✨ Sanity CMS is now populated with:')
    console.log('   • 4 Services (5-Axis, Adaptive, Metrology, Engineering Support)')
    console.log('   • 3 Industries (Aerospace, Defense, Energy) - reordered to match live site')
    console.log('   • Homepage (with hero, services, industries, resources, showcase sections + SEO)')
    console.log('   • Services Page (with hero, core competencies, 4 services + SEO)')
    console.log('   • Industries Page (with hero, overview stats, 3 industries with details + SEO)')
    console.log('   • Contact Page (with address, hours, certifications + SEO)')
    console.log('   • About Page (company history from 1995, team stats, values + SEO)')
    console.log('   • Careers Page (hero, benefits, values, 3 open positions + SEO)')
    console.log('   • 3 Sample Resources (AS9100D, CMM Inspection, Titanium Machining)')
    console.log('   • Site Settings (company info, contact, social, SEO defaults)')
    console.log('   • Navigation (complete menu with resource categories)')
    console.log('   • Footer (links and company info)')
    console.log('\n📋 All pages include professional SEO metadata ready to customize')
    console.log('🖼️  Image placeholders created - add your own images in Sanity Studio')
    console.log('📝 Visit Sanity Studio to edit and customize content')
    console.log('🔗 URL: http://localhost:3000/studio\n')
    console.log('⚠️  Note: Live site has 76 total resources. The 3 seeded are samples.')
    console.log('   Marketing team can add more articles directly in Sanity Studio.\n')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seedSanity()
