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
  console.log('=== POPULATING NAVIGATION TOP BAR ===\n');

  try {
    // Fetch the navigation document
    const navigation = await client.fetch('*[_type == "navigation"][0]');

    if (!navigation) {
      console.error('❌ Navigation document not found');
      console.log('   Please create a navigation document in Sanity Studio first');
      return;
    }

    console.log('✅ Found navigation document:', navigation._id);

    // Check if topBar exists and has data
    if (navigation.topBar && navigation.topBar.phone && navigation.topBar.email) {
      console.log('\n✅ topBar data already exists:');
      console.log(`   📞 Phone: ${navigation.topBar.phone}`);
      console.log(`   📧 Email: ${navigation.topBar.email}`);
      console.log(`   ✨ Certifications: ${navigation.topBar.certifications || 'Not set'}`);
      console.log('\n✅ No action needed - topBar is already populated!\n');
      return;
    }

    console.log('\n⚠️  topBar data is missing or incomplete');
    console.log('   Populating with current values from Header component...\n');

    // Populate topBar with the current hardcoded values
    const topBarData = {
      showPhone: true,
      phone: '503-231-9093',
      phoneLink: 'tel:+15032319093',
      showEmail: true,
      email: 'officemgr@iismet.com',
      emailLink: 'mailto:officemgr@iismet.com',
      showCertifications: true,
      certifications: 'ISO 9001 • AS9100D • ITAR REGISTERED'
    };

    await client
      .patch(navigation._id)
      .set({ topBar: topBarData })
      .commit();

    console.log('✅ Successfully populated navigation.topBar');
    console.log(`   📞 Phone: ${topBarData.phone}`);
    console.log(`   📧 Email: ${topBarData.email}`);
    console.log(`   ✨ Certifications: ${topBarData.certifications}`);
    console.log('\n✅ Now editable in Sanity Studio > Navigation > Top Bar\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
