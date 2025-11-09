/**
 * Seed the Industries Page singleton with correct content
 * This populates all sections to match the reference site
 */

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

const writeClient = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function seedIndustriesPage() {
  console.log('🌱 Seeding Industries Page...\n')

  // Delete existing Industries Page document
  console.log('🗑️  Deleting existing industriesPage document...')
  await writeClient.delete({ query: '*[_type == "industriesPage"]' })
  console.log('✓ Deleted existing document\n')

  // Create new Industries Page with all correct content
  console.log('📝 Creating new industriesPage document...')

  const industriesPage = {
    _type: 'industriesPage',
    _id: 'industriesPage',

    // Hero Section
    hero: {
      badge: '🏭 CRITICAL INDUSTRY SOLUTIONS',
      heading: 'Industries We Serve',
      headingHighlight: 'We Serve',
      subheading: 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.'
      // backgroundImage: Upload in Sanity Studio
    },

    // Main Content
    content: {
      overviewTitle: 'Industries Overview',

      // Overview Stats
      overviewStats: [
        { value: '30+', label: 'Years of Experience' },
        { value: '200+', label: 'Active Programs' },
        { value: '99.8%', label: 'Quality Rating' },
        { value: '12+', label: 'Certifications' }
      ],

      // Industries with images, certifications, and expertise
      industries: [
        {
          name: 'Aerospace',
          description: 'Critical aerospace components manufactured to the highest standards. From commercial aviation to space exploration, we deliver precision parts that meet stringent AS9100D and NADCAP requirements.',
          // image: Upload in Sanity Studio
          certifications: [
            'AS9100D Certified',
            'NADCAP Accredited',
            'ITAR Registered'
          ],
          expertise: [
            'Engine Components',
            'Landing Gear',
            'Structural Parts',
            'Avionics Housings'
          ],
          icon: 'Plane'
        },
        {
          name: 'Defense',
          description: 'Mission-critical defense manufacturing with full ITAR compliance and security clearance. Trusted partner for weapon systems, radar components, and military vehicle parts.',
          // image: Upload in Sanity Studio
          certifications: [
            'ITAR Registered',
            'DFARS Compliant',
            'Security Clearance'
          ],
          expertise: [
            'Weapon Systems',
            'Radar Components',
            'Vehicle Parts',
            'Electronics'
          ],
          icon: 'Shield'
        },
        {
          name: 'Energy',
          description: 'High-performance energy sector components for power generation and distribution. Specializing in turbine parts, valve components, and critical infrastructure with API and ASME certifications.',
          // image: Upload in Sanity Studio
          certifications: [
            'API Certified',
            'ASME Compliant',
            'ISO 9001'
          ],
          expertise: [
            'Turbine Parts',
            'Valve Components',
            'Pump Housings',
            'Generator Parts'
          ],
          icon: 'Zap'
        }
      ],

      // Why Choose Us
      whyChooseUs: [
        {
          iconName: 'Shield',
          title: 'Regulatory Compliance',
          description: 'Full compliance with federal regulations and quality standards. AS9100D, ITAR registered, NADCAP accredited. Comprehensive audit trails and documentation systems.'
        },
        {
          iconName: 'Target',
          title: 'Security & Traceability',
          description: 'Comprehensive facility security and complete material traceability. Secure supply chain management with full chain of custody documentation for critical components.'
        },
        {
          iconName: 'Wrench',
          title: 'Technical Expertise',
          description: 'Deep industry knowledge and advanced manufacturing capabilities. Specialized engineering team with decades of experience in mission-critical applications.'
        },
        {
          iconName: 'TrendingUp',
          title: 'Program Management',
          description: 'Trusted support for long-term manufacturing programs. Dedicated program managers ensuring seamless coordination and on-time delivery.'
        }
      ],

      // Proven Results
      provenResults: [
        {
          value: '99.8%',
          label: 'First-Pass Yield',
          description: 'Consistently delivering exceptional quality without rework or scrap'
        },
        {
          value: '99.5%',
          label: 'On-Time Delivery',
          description: 'Industry-leading delivery performance across all programs'
        },
        {
          value: '10-30%',
          label: 'Cost Reduction',
          description: 'Value-driven solutions and process improvements for cost savings'
        },
        {
          value: '40%',
          label: 'Lead Time Reduction',
          description: 'Faster turnarounds through streamlined processes and optimization'
        }
      ]
    },

    // CTA Section
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

    // SEO
    seo: {
      metaTitle: 'Industries We Serve | Aerospace, Defense & Energy Manufacturing | IIS',
      metaDescription: 'Precision manufacturing for aerospace, defense, and energy industries. AS9100D certified, ITAR registered. Mission-critical components with full traceability, first article inspection, and comprehensive quality documentation.',
      keywords: [
        'aerospace manufacturing',
        'defense manufacturing',
        'energy sector machining',
        'AS9100D certified',
        'ITAR registered',
        'military components',
        'aircraft parts',
        'turbine components',
        'mission-critical manufacturing'
      ]
    }
  }

  try {
    const result = await writeClient.create(industriesPage)
    console.log('✅ Industries Page created successfully!')
    console.log(`   Document ID: ${result._id}\n`)

    console.log('📸 Note: Upload images in Sanity Studio for:')
    console.log('   - Hero background image')
    console.log('   - Aerospace industry image')
    console.log('   - Defense industry image')
    console.log('   - Energy industry image')
    console.log('   - OG social share image')
    console.log('\n   Go to http://localhost:3333 to upload images in Sanity Studio.')
  } catch (error) {
    console.error('❌ Error creating Industries Page:', error)
    throw error
  }
}

seedIndustriesPage().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
