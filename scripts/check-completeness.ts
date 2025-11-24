import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr',
  useCdn: false
})

async function checkCompleteness() {
  console.log('🔍 CHECKING SANITY DATA COMPLETENESS\n')

  // Check homepage
  const homepage = await client.fetch(`*[_type == "homepage"][0] {
    hero,
    cta,
    servicesSection,
    resourcesSection,
    imageShowcase
  }`)

  console.log('📄 HOMEPAGE DATA:')
  console.log('  Hero:', homepage?.hero ? '✅ Exists' : '❌ Missing')
  console.log('  CTA:', homepage?.cta ? '✅ Exists' : '❌ Missing')
  console.log('  Services Section:', homepage?.servicesSection ? '✅ Exists' : '❌ Missing')
  console.log('  Resources Section:', homepage?.resourcesSection ? '✅ Exists' : '❌ Missing')
  console.log('  Image Showcase:', homepage?.imageShowcase ? '✅ Exists' : '❌ Missing')

  // Check services with null fields
  const services = await client.fetch(`*[_type == "service"] {
    _id,
    title,
    shortDescription,
    image,
    "hasImage": defined(image.asset._ref),
    iconName,
    highlight
  }`)

  console.log('\n🔧 SERVICES DATA:')
  console.log(`  Total services: ${services.length}`)
  const servicesWithoutImages = services.filter((s: any) => !s.hasImage)
  console.log(`  Services without images: ${servicesWithoutImages.length}`)
  servicesWithoutImages.forEach((s: any) => {
    console.log(`    - ${s.title} (no image)`)
  })

  // Check for null/undefined fields in services
  const servicesWithNullFields = services.filter((s: any) =>
    !s.shortDescription || !s.iconName
  )
  console.log(`  Services with missing fields: ${servicesWithNullFields.length}`)
  servicesWithNullFields.forEach((s: any) => {
    console.log(`    - ${s.title}:`, {
      description: s.shortDescription ? '✅' : '❌',
      icon: s.iconName ? '✅' : '❌'
    })
  })

  // Check site settings
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0] {
    company,
    contact,
    footer
  }`)

  console.log('\n⚙️  SITE SETTINGS:')
  console.log('  Company info:', siteSettings?.company ? '✅ Exists' : '❌ Missing')
  console.log('  Contact info:', siteSettings?.contact ? '✅ Exists' : '❌ Missing')
  console.log('  Footer:', siteSettings?.footer ? '✅ Exists' : '❌ Missing')

  if (siteSettings?.company) {
    console.log('\n  Company details:')
    console.log('    - Name:', siteSettings.company.name || '❌ NULL')
    console.log('    - Website URL:', siteSettings.company.websiteUrl || '❌ NULL')
    console.log('    - Email:', siteSettings.company.email || '❌ NULL')
  }

  // Check resources
  const resources = await client.fetch(`*[_type == "resource"] {
    title,
    category,
    publishDate,
    author,
    difficulty,
    readTime
  }`)

  console.log('\n📚 RESOURCES DATA:')
  console.log(`  Total resources: ${resources.length}`)
  const resourcesWithNullFields = resources.filter((r: any) =>
    !r.category || !r.publishDate || !r.author || !r.difficulty || !r.readTime
  )
  console.log(`  Resources with missing fields: ${resourcesWithNullFields.length}`)
  resourcesWithNullFields.forEach((r: any) => {
    console.log(`    - ${r.title}:`, {
      category: r.category ? '✅' : '❌',
      publishDate: r.publishDate ? '✅' : '❌',
      author: r.author ? '✅' : '❌',
      difficulty: r.difficulty ? '✅' : '❌',
      readTime: r.readTime ? '✅' : '❌'
    })
  })

  // Check careers/job postings
  const jobs = await client.fetch(`*[_type == "jobPosting"] {
    title,
    department,
    description,
    requirements,
    benefits
  }`)

  console.log('\n💼 CAREERS/JOBS DATA:')
  console.log(`  Total job postings: ${jobs.length}`)
  const jobsWithNullFields = jobs.filter((j: any) =>
    !j.department || !j.description
  )
  console.log(`  Jobs with missing fields: ${jobsWithNullFields.length}`)
  jobsWithNullFields.forEach((j: any) => {
    console.log(`    - ${j.title}:`, {
      department: j.department ? '✅' : '❌',
      description: j.description ? '✅' : '❌'
    })
  })
}

checkCompleteness().catch(console.error)
