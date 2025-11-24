import { createClient } from 'next-sanity'

const WRITE_TOKEN = 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: WRITE_TOKEN,
})

async function publishAll() {
  console.log('🚀 Publishing ALL services and industries...\n')

  try {
    // Fetch all services and industries
    const [services, industries] = await Promise.all([
      client.fetch(`*[_type == "service"]{_id, title, published}`),
      client.fetch(`*[_type == "industry"]{_id, title, published}`)
    ])

    console.log(`Found ${services.length} services and ${industries.length} industries\n`)

    // Build transaction
    const transaction = client.transaction()
    let updateCount = 0

    // Add services to transaction
    for (const doc of services) {
      if (doc.published !== true) {
        transaction.patch(doc._id, { set: { published: true } })
        console.log(`  📝 Publishing service: ${doc.title}`)
        updateCount++
      }
    }

    // Add industries to transaction
    for (const doc of industries) {
      if (doc.published !== true) {
        transaction.patch(doc._id, { set: { published: true } })
        console.log(`  📝 Publishing industry: ${doc.title}`)
        updateCount++
      }
    }

    if (updateCount > 0) {
      console.log(`\n🔄 Committing ${updateCount} updates...`)
      await transaction.commit()
      console.log('✨ SUCCESS! All content is now published!\n')
    } else {
      console.log('✅ All content was already published!\n')
    }

    // Verify
    const [servicesAfter, industriesAfter] = await Promise.all([
      client.fetch(`*[_type == "service" && published == true] | order(order asc){title}`),
      client.fetch(`*[_type == "industry" && published == true]{title}`)
    ])

    console.log(`✅ Published services (${servicesAfter.length}):`)
    servicesAfter.forEach((s: any) => console.log(`   - ${s.title}`))
    
    console.log(`\n✅ Published industries (${industriesAfter.length}):`)
    industriesAfter.forEach((i: any) => console.log(`   - ${i.title}`))

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response.statusCode, error.response.body)
    }
    process.exit(1)
  }
}

publishAll()
