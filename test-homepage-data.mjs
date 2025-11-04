/**
 * Test script to check what data is actually in Sanity for the homepage
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
})

async function testHomepageData() {
  try {
    console.log('🔍 Fetching homepage data from Sanity...\n')

    const query = `*[_type == "homepage"][0] {
      hero,
      heroEnhanced {
        mainTitle,
        subtitle,
        tagline,
        badges,
        ctaPrimary,
        ctaSecondary,
        slides[] {
          imageUrl,
          imageAlt,
          image {
            asset->{
              _id,
              url
            },
            alt
          }
        }
      }
    }`

    const data = await client.fetch(query)

    console.log('📦 Homepage Data Retrieved:')
    console.log('─'.repeat(80))
    console.log(JSON.stringify(data, null, 2))
    console.log('─'.repeat(80))

    // Analyze the data
    console.log('\n🔎 Data Analysis:')
    console.log('─'.repeat(80))

    if (!data) {
      console.log('❌ NO HOMEPAGE DATA FOUND in Sanity!')
      return
    }

    console.log('\n📌 OLD HERO DATA (hero):')
    if (data.hero) {
      console.log('  ✓ hero exists')
      console.log('    - headline:', data.hero.headline ? '✓' : '❌ MISSING')
      console.log('    - subheadline:', data.hero.subheadline ? '✓' : '❌ MISSING')
      console.log('    - badges:', data.hero.badges?.length > 0 ? `✓ (${data.hero.badges.length} items)` : '❌ MISSING')
    } else {
      console.log('  ❌ hero object is missing')
    }

    console.log('\n📌 NEW HERO DATA (heroEnhanced):')
    if (data.heroEnhanced) {
      console.log('  ✓ heroEnhanced exists')
      console.log('    - mainTitle:', data.heroEnhanced.mainTitle ? '✓' : '❌ MISSING')
      console.log('    - subtitle:', data.heroEnhanced.subtitle ? '✓' : '❌ MISSING')
      console.log('    - tagline:', data.heroEnhanced.tagline ? '✓' : '❌ MISSING')
      console.log('    - badges:', data.heroEnhanced.badges?.length > 0 ? `✓ (${data.heroEnhanced.badges.length} items)` : '❌ MISSING')
      console.log('    - ctaPrimary:', data.heroEnhanced.ctaPrimary ? '✓' : '❌ MISSING')
      console.log('    - ctaSecondary:', data.heroEnhanced.ctaSecondary ? '✓' : '❌ MISSING')
      console.log('    - slides:', data.heroEnhanced.slides?.length > 0 ? `✓ (${data.heroEnhanced.slides.length} items)` : '❌ MISSING')

      if (data.heroEnhanced.slides?.length > 0) {
        console.log('\n  📸 Slide Details:')
        data.heroEnhanced.slides.forEach((slide, i) => {
          console.log(`    Slide ${i + 1}:`)
          console.log(`      - imageUrl:`, slide.imageUrl ? '✓' : '❌')
          console.log(`      - imageAlt:`, slide.imageAlt ? '✓' : '❌')
          console.log(`      - image.asset.url:`, slide.image?.asset?.url ? '✓' : '❌')
          console.log(`      - image.alt:`, slide.image?.alt ? '✓' : '❌')
        })
      }
    } else {
      console.log('  ❌ heroEnhanced object is missing')
    }

    console.log('\n🚨 CRITICAL ISSUES:')
    const issues = []

    if (!data.heroEnhanced) {
      issues.push('- heroEnhanced object does not exist in Sanity')
    } else {
      if (!data.heroEnhanced.tagline) {
        issues.push('- heroEnhanced.tagline is missing (REQUIRED for Hero to render)')
      }
      if (!data.heroEnhanced.slides || data.heroEnhanced.slides.length === 0) {
        issues.push('- heroEnhanced.slides is empty (REQUIRED for Hero to render)')
      }
    }

    if (issues.length > 0) {
      issues.forEach(issue => console.log(issue))
      console.log('\n⚠️  The Hero component will NOT RENDER because:')
      console.log('   Hero.tsx line 30: if (!data || !data.tagline || !data.slides || data.slides.length === 0) return null;')
    } else {
      console.log('✅ All required data is present!')
    }

    console.log('─'.repeat(80))

  } catch (error) {
    console.error('❌ Error fetching data:', error)
  }
}

testHomepageData()
