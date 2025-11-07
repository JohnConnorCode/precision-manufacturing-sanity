import { client } from '../sanity/lib/client'

async function testQuery() {
  try {
    console.log('Testing GROQ query to fetch all resources...\n')

    const query = `*[_type == "resource" && published == true] | order(publishDate desc) {
      _id,
      title,
      slug,
      category,
      featured,
      publishDate
    }`

    const results = await client.fetch(query)
    console.log(`Found ${results.length} resources:\n`)

    results.forEach((r: any, i: number) => {
      console.log(`${i+1}. ${r._id}`)
      console.log(`   Title: ${r.title}`)
      console.log(`   Category: ${r.category}`)
      console.log(`   Featured: ${r.featured}`)
      console.log(`   Date: ${r.publishDate}`)
      console.log('')
    })
  } catch (error) {
    console.error('Query failed:', error)
  }
}

testQuery()
