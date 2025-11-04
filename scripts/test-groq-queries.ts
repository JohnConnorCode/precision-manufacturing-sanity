import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testQueries() {
  console.log('🧪 Testing GROQ Queries for New Schema Fields\n');

  try {
    // Test 1: Query Hero CTA buttons
    console.log('1. Testing Hero CTA Buttons...');
    const heroCTA = await client.fetch(`*[_type == "homepage"][0]{
      "ctaPrimary": heroEnhanced.ctaPrimary,
      "ctaSecondary": heroEnhanced.ctaSecondary
    }`);
    console.log(`   ${heroCTA?.ctaPrimary ? '✅' : '⚠️'} ctaPrimary:`, heroCTA?.ctaPrimary || 'Not set (using fallback)');
    console.log(`   ${heroCTA?.ctaSecondary ? '✅' : '⚠️'} ctaSecondary:`, heroCTA?.ctaSecondary || 'Not set (using fallback)');

    // Test 2: Query Services Section
    console.log('\n2. Testing Services Section Headers...');
    const services = await client.fetch(`*[_type == "homepage"][0].servicesSection`);
    console.log(`   ${services?.eyebrow ? '✅' : '⚠️'} eyebrow:`, services?.eyebrow || 'Not set');
    console.log(`   ${services?.heading ? '✅' : '⚠️'} heading:`, services?.heading || 'Not set');
    console.log(`   ${services?.description ? '✅' : '⚠️'} description:`, services?.description?.substring(0, 50) || 'Not set');

    // Test 3: Query Industries Section
    console.log('\n3. Testing Industries Section Headers...');
    const industries = await client.fetch(`*[_type == "homepage"][0].industriesSection`);
    console.log(`   ${industries?.eyebrow ? '✅' : '⚠️'} eyebrow:`, industries?.eyebrow || 'Not set');
    console.log(`   ${industries?.heading ? '✅' : '⚠️'} heading:`, industries?.heading || 'Not set');
    console.log(`   ${industries?.description ? '✅' : '⚠️'} description:`, industries?.description?.substring(0, 50) || 'Not set');

    // Test 4: Query Stats Section (new format)
    console.log('\n4. Testing Stats Section (New Format)...');
    const stats = await client.fetch(`*[_type == "homepage"][0].stats`);
    console.log(`   ${stats?.title ? '✅' : '⚠️'} title:`, stats?.title || 'Not set');
    console.log(`   ${stats?.subtitle ? '✅' : '⚠️'} subtitle:`, stats?.subtitle || 'Not set');
    console.log(`   ${stats?.items ? '✅' : '⚠️'} items array:`, stats?.items ? `${stats.items.length} items` : 'Not set');

    // Test 5: Query Resources Benefits
    console.log('\n5. Testing Resources Benefits Grid...');
    const benefits = await client.fetch(`*[_type == "homepage"][0].resourcesSection.benefits`);
    console.log(`   ${benefits ? '✅' : '⚠️'} benefits:`, benefits ? `${benefits.length} benefit cards` : 'Not set');

    // Test 6: Query CTA Buttons
    console.log('\n6. Testing CTA Section Buttons...');
    const ctaButtons = await client.fetch(`*[_type == "homepage"][0].cta.buttons`);
    console.log(`   ${ctaButtons ? '✅' : '⚠️'} buttons:`, ctaButtons ? `${ctaButtons.length} buttons` : 'Not set');

    // Test 7: Full homepage query
    console.log('\n7. Testing Full Homepage Query...');
    const homepage = await client.fetch(`*[_type == "homepage"][0]`);
    console.log(`   ✅ Homepage document exists`);
    console.log(`   ✅ Document ID: ${homepage._id}`);
    console.log(`   ✅ Last updated: ${homepage._updatedAt}`);

    console.log('\n📊 Summary:');
    const allFieldsSet =
      heroCTA?.ctaPrimary &&
      heroCTA?.ctaSecondary &&
      services?.eyebrow &&
      industries?.eyebrow &&
      stats?.title;

    if (allFieldsSet) {
      console.log('✅ All new fields are queryable and have data!');
    } else {
      console.log('⚠️ Fields are queryable but not all have data yet (will use fallbacks)');
      console.log('   This is OK - fallback values are in place in components');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testQueries();
