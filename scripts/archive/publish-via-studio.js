// This script uses the Sanity Studio's built-in API to publish content
const https = require('https')

const projectId = 'vgacjlhu'
const dataset = 'production'

console.log('🚀 Publishing all services and industries via Sanity Studio API...\n')
console.log('⚠️  This requires you to be logged in to Sanity Studio\n')
console.log('Please go to: http://localhost:3000/studio')
console.log('And run this GROQ query in the Vision tool:\n')
console.log('--- Copy this query ---')
console.log(`
// Step 1: Check current status
*[_type in ["service", "industry"]]{
  _id,
  _type,
  title,
  published
}

// Step 2: If any are not published, run these mutations:
// (Replace with actual document IDs from step 1)
`)

console.log('\nOr use this mutation to publish all at once:')
console.log(`
// Publish all services
*[_type == "service" && published != true] {
  "patch": {
    "id": ^._id,
    "set": {"published": true}
  }
}.patch

// Publish all industries  
*[_type == "industry" && published != true] {
  "patch": {
    "id": ^._id,
    "set": {"published": true}
  }
}.patch
`)

console.log('\n📝 Or better yet, use the Sanity CLI:')
console.log('npx sanity@latest exec scripts/publish-mutations.js --with-user-token\n')
