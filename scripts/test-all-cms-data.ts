import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testAllCMSData() {
  console.log('🧪 Testing ALL CMS Data Across Entire Site\n');

  try {
    // Test About page
    console.log('1. About Page:');
    const about = await client.fetch(`*[_type == "about"][0]{
      hero,
      story,
      timeline,
      values,
      companyStats
    }`);
    console.log(`   Hero: ${about?.hero ? '✅ HAS DATA' : '❌ EMPTY (using hardcoded fallback)'}`);
    console.log(`   Story: ${about?.story ? '✅ HAS DATA' : '❌ EMPTY (using hardcoded fallback)'}`);
    console.log(`   Timeline: ${about?.timeline?.milestones?.length || 0} milestones`);
    console.log(`   Values: ${about?.values?.items?.length || 0} values`);
    console.log(`   Stats: ${about?.companyStats?.length || 0} stats`);

    // Test Services
    console.log('\n2. Services:');
    const services = await client.fetch(`*[_type == "service"] | order(order asc)`);
    console.log(`   Total services: ${services?.length || 0}`);
    services?.forEach((s: any) => {
      console.log(`   - ${s.title}: ${s.description ? '✅' : '❌'} description, ${s.hero?.backgroundImage ? '✅' : '❌'} image`);
    });

    // Test Industries
    console.log('\n3. Industries:');
    const industries = await client.fetch(`*[_type == "industry"] | order(order asc)`);
    console.log(`   Total industries: ${industries?.length || 0}`);
    industries?.forEach((i: any) => {
      console.log(`   - ${i.title}: ${i.description ? '✅' : '❌'} description, ${i.hero?.backgroundImage ? '✅' : '❌'} image`);
    });

    // Test Resources
    console.log('\n4. Resources:');
    const resources = await client.fetch(`*[_type == "resource"]`);
    console.log(`   Total resources: ${resources?.length || 0}`);

    // Test Contact
    console.log('\n5. Contact Page:');
    const contact = await client.fetch(`*[_type == "contact"][0]{hero, contactInfo, locations}`);
    console.log(`   Hero: ${contact?.hero ? '✅ HAS DATA' : '❌ EMPTY (using hardcoded fallback)'}`);
    console.log(`   Contact Info: ${contact?.contactInfo ? '✅ HAS DATA' : '❌ EMPTY'}`);
    console.log(`   Locations: ${contact?.locations?.length || 0} locations`);

    // Test Careers
    console.log('\n6. Careers Page:');
    const careers = await client.fetch(`*[_type == "careers"][0]{hero, benefits, positions}`);
    console.log(`   Hero: ${careers?.hero ? '✅ HAS DATA' : '❌ EMPTY (using hardcoded fallback)'}`);
    console.log(`   Benefits: ${careers?.benefits?.length || 0} benefits`);
    console.log(`   Positions: ${careers?.positions?.length || 0} open positions`);

    // Test Homepage (what agent just worked on)
    console.log('\n7. Homepage (Agent\'s Work):');
    const homepage = await client.fetch(`*[_type == "homepage"][0]{
      "ctaPrimary": heroEnhanced.ctaPrimary,
      servicesSection,
      industriesSection,
      stats
    }`);
    console.log(`   Hero CTAs: ${homepage?.ctaPrimary ? '✅ HAS DATA' : '⚠️ EMPTY (using fallback)'}`);
    console.log(`   Services Section: ${homepage?.servicesSection ? '✅ HAS DATA' : '⚠️ EMPTY (using fallback)'}`);
    console.log(`   Industries Section: ${homepage?.industriesSection ? '✅ HAS DATA' : '⚠️ EMPTY (using fallback)'}`);
    console.log(`   Stats: ${homepage?.stats ? '✅ HAS DATA' : '⚠️ EMPTY (using fallback)'}`);

    // Summary
    console.log('\n📊 SUMMARY:');
    const hasAboutData = about?.hero && about?.story;
    const hasServicesData = services?.length > 0 && services[0]?.description;
    const hasIndustriesData = industries?.length > 0 && industries[0]?.description;
    const hasContactData = contact?.hero;
    const hasCareersData = careers?.hero;
    const hasHomepageData = homepage?.ctaPrimary;

    console.log(`\n✅ FULLY POPULATED (data in CMS):`);
    if (hasServicesData) console.log('   - Services pages');
    if (hasIndustriesData) console.log('   - Industries pages');
    if (resources?.length > 0) console.log('   - Resources pages');

    console.log(`\n⚠️ USING FALLBACKS (empty CMS, showing hardcoded):`);
    if (!hasAboutData) console.log('   - About page');
    if (!hasContactData) console.log('   - Contact page');
    if (!hasCareersData) console.log('   - Careers page');
    if (!hasHomepageData) console.log('   - Homepage new fields');

    console.log(`\n🎯 VERDICT:`);
    if (hasAboutData && hasServicesData && hasIndustriesData && hasContactData && hasCareersData && hasHomepageData) {
      console.log('   ✅ ENTIRE SITE IS FULLY CMS-POWERED');
    } else {
      console.log('   ⚠️ SITE IS CMS-READY BUT NOT ALL DATA IS POPULATED YET');
      console.log('   📝 Pages work but show hardcoded fallbacks until you add data in Studio');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAllCMSData();
