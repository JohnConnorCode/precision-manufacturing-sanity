/**
 * Transform Payload data to Sanity format
 * - Convert Lexical → Portable Text
 * - Transform string slugs → slug objects
 * - Handle image references
 * - Generate Sanity-compatible IDs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const migrationsDir = path.join(__dirname, '../migrations')
const outputDir = path.join(__dirname, '../migrations/transformed')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

/**
 * Convert Lexical format to Portable Text format
 */
function lexicalToPortableText(lexicalData: any): any[] {
  if (!lexicalData || !lexicalData.root) {
    return []
  }

  const blocks: any[] = []

  function processNode(node: any): any {
    if (node.type === 'paragraph') {
      return {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: node.children.map((child: any) => processTextNode(child)),
      }
    }

    if (node.type === 'heading') {
      const level = node.tag ? parseInt(node.tag.replace('h', '')) : 1
      return {
        _type: 'block',
        _key: generateKey(),
        style: `h${level}`,
        markDefs: [],
        children: node.children.map((child: any) => processTextNode(child)),
      }
    }

    if (node.type === 'list') {
      return node.children.map((listItem: any) => ({
        _type: 'block',
        _key: generateKey(),
        style: node.listType === 'number' ? 'number' : 'bullet',
        markDefs: [],
        children: listItem.children.map((child: any) => processTextNode(child)),
      }))
    }

    // Default: treat as paragraph
    return {
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      markDefs: [],
      children: node.children ? node.children.map((child: any) => processTextNode(child)) : [],
    }
  }

  function processTextNode(textNode: any): any {
    const marks: string[] = []
    if (textNode.format) {
      if (textNode.format & 1) marks.push('strong') // Bold
      if (textNode.format & 2) marks.push('em') // Italic
      if (textNode.format & 4) marks.push('underline')
      if (textNode.format & 8) marks.push('code')
    }

    return {
      _type: 'span',
      _key: generateKey(),
      text: textNode.text || '',
      marks,
    }
  }

  if (lexicalData.root.children) {
    for (const node of lexicalData.root.children) {
      const processed = processNode(node)
      if (Array.isArray(processed)) {
        blocks.push(...processed)
      } else {
        blocks.push(processed)
      }
    }
  }

  return blocks
}

/**
 * Generate a unique key for Portable Text blocks
 */
function generateKey(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Generate Sanity-compatible document ID
 */
function generateSanityId(type: string, index: number): string {
  return `${type}-${index + 1}`
}

/**
 * Transform service document
 */
function transformService(service: any, index: number): any {
  return {
    _type: 'service',
    _id: generateSanityId('service', index),
    title: service.title,
    slug: {
      _type: 'slug',
      current: service.slug,
    },
    shortDescription: service.shortDescription,
    description: service.description ? lexicalToPortableText(service.description) : [],
    order: service.order || index,
    highlight: service.highlight || false,
    image: service.image || null, // Will handle images separately
    hero: service.hero ? {
      badge: service.hero.badge,
      subtitle: service.hero.subtitle,
      backgroundImageSource: service.hero.backgroundImageSource,
    } : null,
    overview: service.overview ? {
      description: service.overview.description,
    } : null,
    capabilities: service.capabilities || [],
    services: service.services || [],
    technicalSpecs: service.technicalSpecs || [],
    process: service.process || [],
    equipment: service.equipment || [],
    materials: service.materials || [],
    processes: service.processes || [],
    seo: service.seo || null,
  }
}

/**
 * Transform industry document
 */
function transformIndustry(industry: any, index: number): any {
  return {
    _type: 'industry',
    _id: generateSanityId('industry', index),
    title: industry.title,
    slug: {
      _type: 'slug',
      current: industry.slug,
    },
    shortDescription: industry.shortDescription,
    description: industry.description ? lexicalToPortableText(industry.description) : [],
    order: industry.order || index,
    image: industry.image || null,
    features: industry.features || [],
    hero: industry.hero || null,
    overview: industry.overview || null,
    capabilities: industry.capabilities || [],
    regulatory: industry.regulatory || [],
    applications: industry.applications || [],
    components: industry.components || [],
    qualityStandards: industry.qualityStandards || [],
    processBenefits: industry.processBenefits || [],
    seo: industry.seo || null,
  }
}

/**
 * Transform resource document
 */
function transformResource(resource: any, index: number): any {
  return {
    _type: 'resource',
    _id: generateSanityId('resource', index),
    title: resource.title,
    slug: {
      _type: 'slug',
      current: resource.slug,
    },
    excerpt: resource.excerpt,
    content: resource.content ? lexicalToPortableText(resource.content) : [],
    category: resource.category,
    difficulty: resource.difficulty,
    readTime: resource.readTime,
    publishDate: resource.publishDate,
    author: resource.author,
    featured: resource.featured || false,
    tags: resource.tags || [],
    seo: resource.seo || null,
  }
}

/**
 * Transform team member document
 */
function transformTeamMember(member: any, index: number): any {
  return {
    _type: 'teamMember',
    _id: generateSanityId('team-member', index),
    name: member.name,
    title: member.title,
    bio: member.bio,
    photo: member.photo || null, // Will handle images separately
    order: member.order || index,
    linkedin: member.linkedin,
    email: member.email,
  }
}

/**
 * Transform global document
 */
function transformGlobal(global: any, type: string): any {
  const transformed: any = {
    _type: type,
    _id: type,
    ...global,
  }

  // Convert any Lexical fields to Portable Text
  Object.keys(transformed).forEach((key) => {
    if (transformed[key] && typeof transformed[key] === 'object') {
      if (transformed[key].root && transformed[key].root.children) {
        transformed[key] = lexicalToPortableText(transformed[key])
      }
    }
  })

  return transformed
}

/**
 * Main transformation function
 */
async function transformData() {
  console.log('🔄 Starting data transformation...\n')

  try {
    // Transform services
    const servicesData = JSON.parse(
      fs.readFileSync(path.join(migrationsDir, 'services.json'), 'utf-8')
    )
    const transformedServices = servicesData.map(transformService)
    fs.writeFileSync(
      path.join(outputDir, 'services.json'),
      JSON.stringify(transformedServices, null, 2)
    )
    console.log(`✓ Transformed ${transformedServices.length} services`)

    // Transform industries
    const industriesData = JSON.parse(
      fs.readFileSync(path.join(migrationsDir, 'industries.json'), 'utf-8')
    )
    const transformedIndustries = industriesData.map(transformIndustry)
    fs.writeFileSync(
      path.join(outputDir, 'industries.json'),
      JSON.stringify(transformedIndustries, null, 2)
    )
    console.log(`✓ Transformed ${transformedIndustries.length} industries`)

    // Transform resources
    const resourcesData = JSON.parse(
      fs.readFileSync(path.join(migrationsDir, 'resources.json'), 'utf-8')
    )
    const transformedResources = resourcesData.map(transformResource)
    fs.writeFileSync(
      path.join(outputDir, 'resources.json'),
      JSON.stringify(transformedResources, null, 2)
    )
    console.log(`✓ Transformed ${transformedResources.length} resources`)

    // Transform team members
    const teamData = JSON.parse(
      fs.readFileSync(path.join(migrationsDir, 'team-members.json'), 'utf-8')
    )
    const transformedTeam = teamData.map(transformTeamMember)
    fs.writeFileSync(
      path.join(outputDir, 'team-members.json'),
      JSON.stringify(transformedTeam, null, 2)
    )
    console.log(`✓ Transformed ${transformedTeam.length} team members`)

    // Transform globals
    const globalFiles = [
      'site-settings',
      'navigation',
      'homepage',
      'footer',
      'about',
      'contact',
      'careers',
      'terms',
      'supplier-requirements',
      'ui-text',
      'page-content',
    ]

    for (const globalName of globalFiles) {
      const globalData = JSON.parse(
        fs.readFileSync(path.join(migrationsDir, `global-${globalName}.json`), 'utf-8')
      )
      const transformed = transformGlobal(globalData, globalName.replace(/-/g, ''))
      fs.writeFileSync(
        path.join(outputDir, `global-${globalName}.json`),
        JSON.stringify(transformed, null, 2)
      )
      console.log(`✓ Transformed global: ${globalName}`)
    }

    console.log('\n✅ Transformation complete!')
    console.log(`📁 Transformed files saved to: ${outputDir}`)

  } catch (error) {
    console.error('\n❌ Transformation failed:', error)
    process.exit(1)
  }
}

transformData()
