const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

(async () => {
  console.log('=== MIGRATING TECHNICAL SPECS FROM ARRAY TO OBJECT ===\n');

  try {
    // Fetch the homepage document
    const homepage = await client.fetch('*[_type == "homepage"][0]');

    if (!homepage) {
      console.error('❌ Homepage document not found');
      return;
    }

    console.log('✅ Found homepage document:', homepage._id);

    // Check current technicalSpecs structure
    const currentSpecs = homepage.technicalSpecs;

    if (!currentSpecs) {
      console.log('⚠️  No technicalSpecs found on homepage');
      return;
    }

    console.log('\n📋 Current technicalSpecs structure:', Array.isArray(currentSpecs) ? 'ARRAY' : 'OBJECT');

    if (Array.isArray(currentSpecs)) {
      console.log(`\n🔄 Converting array with ${currentSpecs.length} specs to object structure...\n`);

      // Create new object structure
      const newStructure = {
        enabled: true,
        specs: currentSpecs
      };

      // Update the homepage document
      await client
        .patch(homepage._id)
        .set({ technicalSpecs: newStructure })
        .commit();

      console.log('✅ Successfully migrated technicalSpecs to object structure!');
      console.log('\n📊 New structure:');
      console.log('   - enabled: true');
      console.log(`   - specs: [${currentSpecs.length} items]`);
      console.log('\n✨ Migration complete!\n');

    } else if (typeof currentSpecs === 'object' && currentSpecs.specs) {
      console.log('✅ technicalSpecs is already in object format with specs array');
      console.log('   - enabled:', currentSpecs.enabled);
      console.log(`   - specs: [${currentSpecs.specs?.length || 0} items]`);
      console.log('\n✨ No migration needed!\n');
    } else {
      console.log('⚠️  Unexpected technicalSpecs structure:', typeof currentSpecs);
      console.log(JSON.stringify(currentSpecs, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
