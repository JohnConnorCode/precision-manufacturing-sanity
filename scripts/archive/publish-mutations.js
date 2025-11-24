import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function publishAllContent() {
  console.log('🚀 Publishing all services and industries...\n')

  try {
    // Get all services
    const services = await client.fetch(`*[_type == "service"]{_id, title, published}`)
    console.log(`Found ${services.length} services`)

    // Get all industries
    const industries = await client.fetch(`*[_type == "industry"]{_id, title, published}`)
    console.log(`Found ${industries.length} industries\n`)

    const mutations = []

    // Prepare mutations for services
    console.log('Preparing service updates...')
    for (const service of services) {
      if (service.published !== true) {
        mutations.push({
          patch: {
            id: service._id,
            set: { published: true }
          }
        })
        console.log(`  📝 Will publish: ${service.title}`)
      } else {
        console.log(`  ⏭️  Already published: ${service.title}`)
      }
    }

    // Prepare mutations for industries
    console.log('\nPreparing industry updates...')
    for (const industry of industries) {
      if (industry.published !== true) {
        mutations.push({
          patch: {
            id: industry._id,
            set: { published: true }
          }
        })
        console.log(`  📝 Will publish: ${industry.title}`)
      } else {
        console.log(`  ⏭️  Already published: ${industry.title}`)
      }
    }

    // Execute all mutations
    if (mutations.length > 0) {
      console.log(`\n🔄 Executing ${mutations.length} updates...`)
      const transaction = client.transaction()
      mutations.forEach(mut => transaction.patch(mut.patch.id, mut.patch))
      await transaction.commit()
      console.log('✨ All content published successfully!')
    } else {
      console.log('\n✅ All content is already published!')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

publishAllContent()
