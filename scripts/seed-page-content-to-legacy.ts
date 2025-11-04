import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function seedPageContent() {
  if (!client.config().projectId || !client.config().token) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }

  console.log('Seeding pageContent to match legacy copy...')

  // Locate pageContent doc
  const existing = await client.fetch(`*[_type == "pageContent"][0]{ _id }`)
  const pageContentId = existing?._id || 'pageContent'

  const tx = client.transaction()
  if (!existing) {
    tx.createIfNotExists({ _id: pageContentId, _type: 'pageContent', pageName: 'site-pages' })
  }
  const patch = client.patch(pageContentId)
    .set({
      // Services Page
      servicesPage: {
        hero: {
          badge: 'PRECISION MANUFACTURING SERVICES',
          title: 'Our Services',
          description:
            'Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=90',
          buttons: [
            { label: 'Request Quote', href: '/contact', variant: 'primary' },
            { label: 'View Core Competencies', href: '#capabilities', variant: 'secondary' },
          ],
        },
        qualityIntro:
          'Our comprehensive quality management system ensures every component meets or exceeds specifications with full traceability and documentation.',
        // qualityImage will remain unset until an asset is uploaded in Studio
        qualityImageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=90',
        cta: {
          heading: 'Ready to Start Your Project?',
          description:
            'Partner with us for precision manufacturing solutions that meet the highest industry standards.',
          primaryButton: { label: 'Get Quote', href: '/contact?interest=quote' },
          secondaryButton: { label: 'Contact Us', href: '/contact' },
        },
      },

      // Industries Page
      industriesPage: {
        hero: {
          title: 'Industries We Serve',
          description:
            'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=90',
          buttons: [
            { label: 'Explore Industries', href: '#industries', variant: 'primary' },
            { label: 'Industry Consultation', href: '/contact', variant: 'secondary' },
          ],
        },
        header: {
          title: 'Core Industries',
          description:
            'Specialized manufacturing solutions for the most demanding industries, backed by decades of experience and industry-leading certifications.',
        },
        cta: {
          heading: 'Partner with Industry Experts',
          description:
            "Join the industry leaders who trust us with their most critical manufacturing requirements. Let's discuss your specific needs.",
          primaryButton: { label: 'Schedule Consultation', href: '/contact' },
          secondaryButton: { label: 'View Our Services', href: '/services' },
        },
      },

      // Resources Page
      resourcesPage: {
        hero: {
          badge: 'TECHNICAL KNOWLEDGE CENTER',
          title: 'Master Precision Manufacturing',
          description:
            'Expert guides, technical specifications, and tools to help you make informed decisions about precision manufacturing for aerospace, defense, medical, and energy applications.',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=90',
        },
        header: {
          eyebrow: 'Browse Knowledge Base',
          title: 'Technical Resources',
          description: 'In-depth guides and technical documentation for precision manufacturing excellence',
        },
      },
    })

  tx.patch(patch)
  await tx.commit()
  console.log('✅ pageContent seeded.')
}

seedPageContent().catch((e) => {
  console.error('Seeding failed:', e?.message || e)
  process.exit(1)
})
