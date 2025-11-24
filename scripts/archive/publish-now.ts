import { createClient } from 'next-sanity'

async function main() {
  // Use READ token first to query
  const readToken = 'sk80ZgAYy7yIfoJlvqcNLBUOGfMpYuB730iY9Mfx9bSlQ7nwzMNACjtXDzpAiS4xb0HSXayclaV3Y9hNHi9UXWPW3Raw70vCxd1mAtTOlEzTT7yUxMl1CK6AP6paFep4SYMEXp2uJPgmNBWnMgqdVBbItwu7tWIXCzwSvVJiOBWsk9paD806'
  
  const writeToken = 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'

  const readClient = createClient({
    projectId: 'vgacjlhu',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: readToken,
    perspective: 'raw', // Try raw to see all documents
  })

  const writeClient = createClient({
    projectId: 'vgacjlhu',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: writeToken,
  })

  console.log('🚀 Publishing all services and industries...\n')

  try {
    // Query with read token
    console.log('Fetching services...')
    const services = await readClient.fetch(`*[_type == "service"]{_id, title, published}`)
    console.log(`Found ${services.length} services`)

    console.log('Fetching industries...')
    const industries = await readClient.fetch(`*[_type == "industry"]{_id, title, published}`)
    console.log(`Found ${industries.length} industries\n`)

    // Build mutations with write token
    const transaction = writeClient.transaction()
    let updateCount = 0

    // Services
    for (const doc of services) {
      if (doc.published !== true) {
        transaction.patch(doc._id, { set: { published: true } })
        console.log(`  📝 Publishing service: ${doc.title}`)
        updateCount++
      } else {
        console.log(`  ✅ Already published: ${doc.title}`)
      }
    }

    // Industries
    for (const doc of industries) {
      if (doc.published !== true) {
        transaction.patch(doc._id, { set: { published: true } })
        console.log(`  📝 Publishing industry: ${doc.title}`)
        updateCount++
      } else {
        console.log(`  ✅ Already published: ${doc.title}`)
      }
    }

    if (updateCount > 0) {
      console.log(`\n🔄 Committing ${updateCount} updates...`)
      await transaction.commit()
      console.log('✨ SUCCESS! All content published!\n')
    } else {
      console.log('\n✅ All content already published!\n')
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Status:', error.response.statusCode)
      console.error('Body:', error.response.body)
    }
    process.exit(1)
  }
}

main()
