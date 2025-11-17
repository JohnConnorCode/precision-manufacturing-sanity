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
  console.log('=== FIXING CERTIFICATIONS FIELD LOCATION ===\n');

  try {
    // Fetch the homepage document
    const homepage = await client.fetch('*[_type == "homepage"][0]');

    if (!homepage) {
      console.error('❌ Homepage document not found');
      return;
    }

    console.log('✅ Found homepage document:', homepage._id);

    // Check if certifications exists at root level
    if (homepage.certifications && Array.isArray(homepage.certifications)) {
      console.log(`\n📋 Found certifications at ROOT level (${homepage.certifications.length} items)`);
      console.log('   This is INCORRECT - should be inside cta object');

      // Check current CTA structure
      if (!homepage.cta) {
        console.log('\n⚠️  CTA object does not exist, creating it...');
      }

      const certifications = homepage.certifications;

      console.log('\n🔄 Moving certifications to cta.certifications...\n');

      // Move certifications into cta object
      await client
        .patch(homepage._id)
        .set({
          'cta.certifications': certifications
        })
        .unset(['certifications'])  // Remove from root level
        .commit();

      console.log('✅ Successfully moved certifications to cta.certifications');
      console.log(`   - Moved ${certifications.length} certification badges`);
      console.log('   - Removed certifications from root level');
      console.log('\n✨ Migration complete!\n');

    } else if (homepage.cta?.certifications) {
      console.log('✅ Certifications already in correct location (cta.certifications)');
      console.log(`   - Found ${homepage.cta.certifications.length} certification badges`);
      console.log('\n✨ No migration needed!\n');
    } else {
      console.log('⚠️  No certifications field found at all');
      console.log('   This is okay - field is optional\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
