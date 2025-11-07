import { client } from '../sanity/lib/client'

async function checkAllResources() {
  try {
    console.log('Checking ALL resources (no published filter)...\n')

    // Fetch ALL resources regardless of published status
    const query = `*[_type == "resource"] | order(publishDate desc) {
      _id,
      title,
      category,
      published,
      _rev
    }`

    const results = await client.fetch(query)
    console.log(`Found ${results.length} total resources:\n`)

    results.forEach((r: any, i: number) => {
      console.log(`${i+1}. ${r._id}`)
      console.log(`   Title: ${r.title}`)
      console.log(`   Published: ${r.published}`)
      console.log('')
    })
  } catch (error) {
    console.error('Query failed:', error)
  }
}

checkAllResources()
