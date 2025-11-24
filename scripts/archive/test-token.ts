import { createClient } from 'next-sanity'

// Test READ token
const readToken = 'sk80ZgAYy7yIfoJlvqcNLBUOGfMpYuB730iY9Mfx9bSlQ7nwzMNACjtXDzpAiS4xb0HSXayclaV3Y9hNHi9UXWPW3Raw70vCxd1mAtTOlEzTT7yUxMl1CK6AP6paFep4SYMEXp2uJPgmNBWnMgqdVBbItwu7tWIXCzwSvVJiOBWsk9paD806'

const readClient = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: readToken,
  perspective: 'published', // Try with perspective
})

console.log('Testing READ token...')

try {
  const result = await readClient.fetch(`*[_type == "service"][0...2]{_id, title, published}`)
  console.log('✅ READ token works!')
  console.log('Result:', JSON.stringify(result, null, 2))
} catch (error: any) {
  console.error('❌ READ token failed:', error.message)
}
