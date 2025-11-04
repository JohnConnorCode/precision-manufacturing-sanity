import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Create client with environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/**
 * Populate missing homepage sections
 */
async function populateHomepageSections() {
  console.log('🔍 Fetching homepage document...\n')

  // Get the homepage document ID
  const homepage = await client.fetch(`*[_type == "homepage"][0]{ _id }`)

  if (!homepage) {
    console.error('❌ Homepage document not found!')
    process.exit(1)
  }

  console.log(`Found homepage document: ${homepage._id}\n`)

  // Define the sections data
  const updates = {
    // Services Section Header
    servicesSection: {
      eyebrow: 'COMPREHENSIVE MANUFACTURING SOLUTIONS',
      heading: 'PRECISION SERVICES',
      description:
        'Four core service pillars delivering unmatched precision and reliability for aerospace and defense applications',
      subdescription:
        'Our advanced manufacturing capabilities combine cutting-edge technology with decades of expertise',
    },

    // Industries Section Header
    industriesSection: {
      eyebrow: 'SPECIALIZED SECTOR EXPERTISE',
      heading: 'INDUSTRY LEADERS',
      description:
        'Trusted by leading organizations in aerospace, defense, energy, and advanced manufacturing',
    },

    // Image Showcase Section
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
          src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=90',
          title: 'Aerospace Components',
          category: 'Turbine Blades & Structural Parts',
          href: '/services/5-axis-machining',
        },
        {
          src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=1200&q=90',
          title: 'Defense Systems',
          category: 'ITAR Certified Manufacturing',
          href: '/industries/defense',
        },
        {
          src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=90',
          title: 'Precision Metrology',
          category: 'Quality Assurance & Inspection',
          href: '/services/metrology',
        },
      ],
      stats: [
        {
          iconName: 'Award',
          value: 'AS9100D',
          label: 'Certified Quality',
          color: 'text-blue-600',
          enabled: true,
        },
        {
          iconName: 'Shield',
          value: 'ITAR',
          label: 'Registered Facility',
          color: 'text-green-600',
          enabled: true,
        },
        {
          iconName: 'Clock',
          value: '24/7',
          label: 'Production Capacity',
          color: 'text-orange-600',
          enabled: true,
        },
        {
          iconName: 'Target',
          value: '±0.0001"',
          label: 'Precision Tolerance',
          color: 'text-purple-600',
          enabled: true,
        },
      ],
      cta: {
        title: 'Get Started Today',
        description:
          "Let's discuss how we can deliver precision manufacturing solutions for your needs",
        buttons: [
          {
            text: 'Request Quote',
            href: '/contact',
            variant: 'primary',
            enabled: true,
          },
          {
            text: 'View Capabilities',
            href: '/services',
            variant: 'secondary',
            enabled: true,
          },
        ],
      },
    },

    // Resources Section
    resourcesSection: {
      header: {
        eyebrow: 'Technical Resources & Knowledge Base',
        heading: 'Master Precision Manufacturing',
        description:
          'Comprehensive guides, technical documentation, and industry insights to help you succeed',
      },
      featuredSeries: [
        {
          title: 'CMM Inspection Mastery',
          description:
            'Complete guide to coordinate measuring machine programming, operation, and best practices',
          articleCount: 4,
          readTime: '34 min',
          level: 'Intermediate',
          iconName: 'Ruler',
          href: '/resources/series/cmm-inspection',
        },
        {
          title: 'First Article Inspection Excellence',
          description:
            'Master FAI documentation, AS9102 compliance, and zero-defect submission strategies',
          articleCount: 3,
          readTime: '26 min',
          level: 'Advanced',
          iconName: 'FileCheck',
          href: '/resources/series/first-article',
        },
        {
          title: 'GD&T Fundamentals',
          description:
            'Essential geometric dimensioning and tolerancing principles for precision manufacturing',
          articleCount: 4,
          readTime: '35 min',
          level: 'Beginner',
          iconName: 'Shapes',
          href: '/resources/series/gdt-fundamentals',
        },
      ],
      benefits: [
        {
          iconName: 'BookOpen',
          title: 'In-Depth Technical Guides',
          description:
            'Step-by-step tutorials covering manufacturing processes, inspection techniques, and quality systems',
          enabled: true,
        },
        {
          iconName: 'Video',
          title: 'Video Demonstrations',
          description:
            'Watch our engineers demonstrate complex procedures and share real-world manufacturing insights',
          enabled: true,
        },
        {
          iconName: 'Download',
          title: 'Downloadable Resources',
          description:
            'Access templates, checklists, and reference materials to streamline your manufacturing operations',
          enabled: true,
        },
        {
          iconName: 'Users',
          title: 'Expert Community',
          description:
            'Connect with precision manufacturing professionals and learn from collective industry experience',
          enabled: true,
        },
      ],
      cta: {
        title: 'Explore All Resources',
        description:
          'Access our complete library of technical guides and manufacturing insights',
        buttons: [
          {
            text: 'Browse Resources',
            href: '/resources',
            variant: 'primary',
            enabled: true,
          },
          {
            text: 'Subscribe to Updates',
            href: '/resources/subscribe',
            variant: 'secondary',
            enabled: true,
          },
        ],
      },
    },
  }

  console.log('🔧 Updating homepage sections...\n')

  try {
    await client.patch(homepage._id).set(updates).commit()

    console.log('✅ Homepage sections updated successfully!\n')
    console.log('Updated sections:')
    console.log('  ✅ servicesSection (header)')
    console.log('  ✅ industriesSection (header)')
    console.log('  ✅ imageShowcase (header, 3 images, 4 stats, CTA)')
    console.log('  ✅ resourcesSection (header, 3 series, 4 benefits, CTA)')
    console.log('\n🎉 Homepage sections are now fully populated!')
  } catch (error) {
    console.error('❌ Failed to update homepage:', error)
    process.exit(1)
  }
}

// Run the script
populateHomepageSections().catch((error) => {
  console.error('❌ Error running script:', error)
  process.exit(1)
})
