import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  token: process.env.SANITY_API_WRITE_TOKEN || '',
  useCdn: false,
  apiVersion: '2025-01-01'
})

async function publishResources() {
  try {
    console.log('Publishing all unpublished resources...\n')

    // Find all unpublished resources
    const query = `*[_type == "resource" && published != true] {
      _id,
      title
    }`

    const unpublished = await client.fetch(query)
    console.log(`Found ${unpublished.length} unpublished resources\n`)

    let published = 0
    for (const resource of unpublished) {
      try {
        await client.patch(resource._id).set({ published: true }).commit()
        published++
        process.stdout.write('✓')
      } catch (error: any) {
        process.stdout.write('✗')
        console.error(`\nError publishing ${resource._id}:`, error.message)
      }
    }

    console.log(`\n\n✅ Published ${published} resources`)
  } catch (error: any) {
    console.error('❌ Error:', error.message)
  }
}

publishResources()
