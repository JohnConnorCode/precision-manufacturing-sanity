import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
})

async function fixAllImages() {
  console.log('=== FIXING ALL IMAGE ISSUES ===\n')

  // 1. First, fix the Energy page Oil & Gas expertise image (animal image)
  console.log('1. Fixing Energy page Oil & Gas expertise image...')

  const energyDoc = await client.fetch(`*[_type == "industry" && slug.current == "energy"][0]{
    _id,
    title,
    expertise
  }`)

  if (energyDoc) {
    console.log('   Found Energy industry document:', energyDoc._id)

    // Find a proper industrial image for Oil & Gas
    const industrialImages = await client.fetch(`*[_type == "sanity.imageAsset" && (
      originalFilename match "*turbine*" ||
      originalFilename match "*power*" ||
      originalFilename match "*energy*" ||
      originalFilename match "*industrial*"
    )][0...5]{
      _id,
      originalFilename,
      url
    }`)

    console.log('   Available industrial images:', industrialImages.map((i: any) => i.originalFilename))

    // Use the turbine rotor image for Oil & Gas
    const turbineImage = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename match "*turbine-rotor*"][0]{_id}`)

    if (turbineImage && energyDoc.expertise) {
      // Find the Oil & Gas expertise item
      const oilGasIndex = energyDoc.expertise.findIndex((e: any) =>
        e.title?.toLowerCase().includes('oil') || e.title?.toLowerCase().includes('gas')
      )

      if (oilGasIndex >= 0) {
        const key = energyDoc.expertise[oilGasIndex]._key
        console.log(`   Updating expertise[${oilGasIndex}] (${energyDoc.expertise[oilGasIndex].title}) with turbine image`)

        await client.patch(energyDoc._id)
          .set({
            [`expertise[_key=="${key}"].image.asset._ref`]: turbineImage._id
          })
          .commit()

        console.log('   ✓ Fixed Oil & Gas expertise image')
      }
    }
  }

  // 2. Get all services and industries with their hero images
  console.log('\n2. Getting all services and industries hero images...')

  const services = await client.fetch(`*[_type == "service" && published == true]{
    _id,
    title,
    "slug": slug.current,
    "heroImageRef": hero.backgroundImage.asset._ref
  }`)

  const industries = await client.fetch(`*[_type == "industry" && published == true]{
    _id,
    title,
    "slug": slug.current,
    "heroImageRef": hero.backgroundImage.asset._ref
  }`)

  console.log(`   Found ${services.length} services and ${industries.length} industries`)

  // 3. Get homepage data
  console.log('\n3. Getting homepage data...')

  const homepage = await client.fetch(`*[_type == "homepage"][0]{
    _id,
    servicesSection,
    industriesSection
  }`)

  if (!homepage) {
    console.log('   ERROR: No homepage document found!')
    return
  }

  // 4. Update service cards to match their page hero images
  console.log('\n4. Updating service cards to match page heroes...')

  if (homepage.servicesSection?.services) {
    for (const card of homepage.servicesSection.services) {
      const matchingService = services.find((s: any) =>
        card.href?.includes(s.slug) || card.title === s.title
      )

      if (matchingService && matchingService.heroImageRef) {
        const key = card._key
        console.log(`   Syncing: ${card.title} -> ${matchingService.slug}`)

        await client.patch(homepage._id)
          .set({
            [`servicesSection.services[_key=="${key}"].image.asset._ref`]: matchingService.heroImageRef
          })
          .commit()
      }
    }
    console.log('   ✓ Service cards updated')
  }

  // 5. Update industry cards to match their page hero images
  console.log('\n5. Updating industry cards to match page heroes...')

  if (homepage.industriesSection?.industries) {
    for (const card of homepage.industriesSection.industries) {
      const matchingIndustry = industries.find((i: any) =>
        card.href?.includes(i.slug) || card.title === i.title
      )

      if (matchingIndustry && matchingIndustry.heroImageRef) {
        const key = card._key
        console.log(`   Syncing: ${card.title} -> ${matchingIndustry.slug}`)

        await client.patch(homepage._id)
          .set({
            [`industriesSection.industries[_key=="${key}"].image.asset._ref`]: matchingIndustry.heroImageRef
          })
          .commit()
      }
    }
    console.log('   ✓ Industry cards updated')
  }

  // 6. Delete the animal image asset
  console.log('\n6. Deleting animal image asset...')

  const animalAsset = await client.fetch(`*[_type == "sanity.imageAsset" && _id == "image-ef753fadc5cc6c94a4234401854e5ad7d4384d61-1600x1280-jpg"][0]`)

  if (animalAsset) {
    try {
      await client.delete(animalAsset._id)
      console.log('   ✓ Deleted animal image asset')
    } catch (e: any) {
      console.log('   Note: Could not delete asset (may still be referenced):', e.message)
    }
  } else {
    console.log('   Animal asset not found or already deleted')
  }

  console.log('\n=== ALL FIXES COMPLETE ===')

  // 7. Verify the fixes
  console.log('\n7. Verifying fixes...')

  const verifyEnergy = await client.fetch(`*[_type == "industry" && slug.current == "energy"][0]{
    expertise[]{
      title,
      "imageRef": image.asset._ref
    }
  }`)

  console.log('\n   Energy expertise images:')
  verifyEnergy?.expertise?.forEach((e: any, i: number) => {
    console.log(`   [${i}] ${e.title}: ${e.imageRef}`)
  })

  const verifyHomepage = await client.fetch(`*[_type == "homepage"][0]{
    "serviceCards": servicesSection.services[]{ title, "imageRef": image.asset._ref },
    "industryCards": industriesSection.industries[]{ title, "imageRef": image.asset._ref }
  }`)

  console.log('\n   Homepage service cards:')
  verifyHomepage?.serviceCards?.forEach((c: any) => {
    console.log(`   - ${c.title}: ${c.imageRef?.slice(0, 30)}...`)
  })

  console.log('\n   Homepage industry cards:')
  verifyHomepage?.industryCards?.forEach((c: any) => {
    console.log(`   - ${c.title}: ${c.imageRef?.slice(0, 30)}...`)
  })
}

fixAllImages().catch(console.error)
