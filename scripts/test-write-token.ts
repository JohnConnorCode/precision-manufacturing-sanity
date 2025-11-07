import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE',
  useCdn: false
})

async function testToken() {
  try {
    console.log('Testing write token...\n')

    // Try to fetch a document first (read test)
    const result = await client.fetch('*[_type == "resource"][0]')
    console.log('✓ Read works - found:', result?._id)

    // Try to create a test document
    const testId = 'test-write-' + Date.now()
    console.log('\nAttempting to create test document:', testId)

    const testDoc = {
      _id: testId,
      _type: 'resource',
      title: 'Token Test',
      slug: { current: 'token-test' },
      category: 'test',
      excerpt: 'Test',
      content: 'Test content',
      difficulty: 'Beginner',
      readTime: '1 min',
      publishDate: new Date().toISOString(),
      author: 'Test',
      featured: false,
      published: false,
      tags: []
    }

    const created = await client.create(testDoc)
    console.log('✓ Create works! Document ID:', created._id)

    // Delete it
    await client.delete(testId)
    console.log('✓ Delete works too!')

    console.log('\n✅ Token has full write access!')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.statusCode) console.error('Status Code:', error.statusCode)
    console.error('Details:', error)
  }
}

testToken()
