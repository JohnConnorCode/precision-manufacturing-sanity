const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

(async () => {
  console.log('=== SANITY DATA VALIDITY CHECK ===\n');

  try {
    // Check homepage document
    const homepage = await client.fetch('*[_type == "homepage"][0]');

    if (!homepage) {
      console.error('❌ Homepage document not found');
      return;
    }

    console.log('✅ Homepage document found\n');

    let hasErrors = false;

    // Check technicalSpecs structure
    console.log('📋 Checking technicalSpecs structure...');
    if (homepage.technicalSpecs) {
      if (Array.isArray(homepage.technicalSpecs)) {
        console.error('❌ technicalSpecs is still an array (should be object)');
        hasErrors = true;
      } else if (typeof homepage.technicalSpecs === 'object') {
        if (homepage.technicalSpecs.specs && Array.isArray(homepage.technicalSpecs.specs)) {
          console.log(`✅ technicalSpecs is object with ${homepage.technicalSpecs.specs.length} specs`);
          console.log(`   - enabled: ${homepage.technicalSpecs.enabled}`);
        } else {
          console.error('❌ technicalSpecs object missing specs array');
          hasErrors = true;
        }
      }
    } else {
      console.warn('⚠️  technicalSpecs field not found');
    }

    // Check all section enabled fields
    console.log('\n📋 Checking section visibility toggles...');
    const sections = [
      'heroEnhanced',
      'servicesSection',
      'industriesSection',
      'imageShowcase',
      'operationalExcellence',
      'resourcesSection',
      'cta'
    ];

    sections.forEach(section => {
      if (homepage[section]) {
        const enabled = homepage[section].enabled;
        const status = enabled !== false ? '🟢' : '🔴';
        console.log(`${status} ${section}: ${enabled !== false ? 'enabled' : 'disabled'}`);
      } else {
        console.log(`⚠️  ${section}: not found`);
      }
    });

    // Check for published content
    console.log('\n📋 Checking published content...');
    const services = await client.fetch('*[_type == "service"]{ title, published }');
    const industries = await client.fetch('*[_type == "industry"]{ title, published }');
    const resources = await client.fetch('*[_type == "resource"]{ title, published }');

    console.log(`\nServices: ${services.length} total`);
    const publishedServices = services.filter(s => s.published !== false);
    console.log(`  ✅ ${publishedServices.length} published`);
    if (services.length !== publishedServices.length) {
      console.log(`  🔴 ${services.length - publishedServices.length} hidden`);
    }

    console.log(`\nIndustries: ${industries.length} total`);
    const publishedIndustries = industries.filter(i => i.published !== false);
    console.log(`  ✅ ${publishedIndustries.length} published`);
    if (industries.length !== publishedIndustries.length) {
      console.log(`  🔴 ${industries.length - publishedIndustries.length} hidden`);
    }

    console.log(`\nResources: ${resources.length} total`);
    const publishedResources = resources.filter(r => r.published !== false);
    console.log(`  ✅ ${publishedResources.length} published`);
    if (resources.length !== publishedResources.length) {
      console.log(`  🔴 ${resources.length - publishedResources.length} hidden`);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
      console.log('❌ VALIDATION ERRORS FOUND - FIX REQUIRED');
    } else {
      console.log('✅ ALL VALIDITY CHECKS PASSED');
    }
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
