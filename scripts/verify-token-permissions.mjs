import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function verifyTokenPermissions() {
  try {
    console.log('🔍 Verifying token permissions...\n');
    
    // Try a read operation
    const readTest = await client.fetch('*[_type == "service"][0]');
    console.log('✅ READ permission: Working');
    
    // Try to get current user info (if available)
    try {
      const meTest = await client.request({
        url: '/users/me',
        method: 'GET'
      });
      console.log('✅ User info accessible:', meTest?.name || 'Anonymous');
    } catch (e) {
      console.log('⚠️  Cannot fetch user info (may require specific permissions)');
    }
    
    // Try creating a test document
    try {
      const testCreate = await client.create({
        _id: 'test-doc-' + Date.now(),
        _type: 'service',
        title: 'Test Document'
      });
      console.log('✅ CREATE permission: Working');
      // Clean up test doc
      await client.delete(testCreate._id);
      console.log('✅ DELETE permission: Working\n');
    } catch (error) {
      console.log('❌ CREATE permission: Missing or insufficient');
      console.log('   Error:', error.message);
      console.log('\n⚠️  TOKEN FIX REQUIRED:\n');
      console.log('1. Go to: https://manage.sanity.io');
      console.log('2. Select your Sanity project');
      console.log('3. Go to Settings → API & Webhooks → Tokens');
      console.log('4. Find your token (starts with "skqGXNV9...")');
      console.log('5. Click the three-dot menu → Edit');
      console.log('6. Enable these scopes:');
      console.log('   ✓ Create');
      console.log('   ✓ Read');
      console.log('   ✓ Update');
      console.log('   ✓ Delete');
      console.log('7. Copy the token and update .env.local');
      console.log('8. Restart this script\n');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verifyTokenPermissions();
