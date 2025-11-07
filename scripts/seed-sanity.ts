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

    console.log('\n✅ Seed complete!\n')
    console.log('✨ Sanity CMS is now populated with:')
    console.log('   • 4 Services (5-Axis, Adaptive, Metrology, Engineering)')
    console.log('   • 3 Industries (Defense, Energy, Aerospace)')
    console.log('   • Homepage sections with all content')
    console.log('\n📝 Visit Sanity Studio to edit and customize content')
    console.log('🔗 URL: http://localhost:3000/studio\n')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seedSanity()
