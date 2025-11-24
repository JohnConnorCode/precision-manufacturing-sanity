import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
});

async function verifyHandoffReadiness() {
  console.log('🔍 VERIFYING SANITY CMS HANDOFF READINESS\n');

  const checks = {
    singletons: [
      { type: 'homepage', name: 'Homepage' },
      { type: 'servicesPage', name: 'Services Page' },
      { type: 'industriesPage', name: 'Industries Page' },
      { type: 'about', name: 'About Page' },
      { type: 'careers', name: 'Careers Page' },
      { type: 'footer', name: 'Footer' },
      { type: 'siteSettings', name: 'Site Settings' },
      { type: 'terms', name: 'Terms & Conditions' },
      { type: 'supplierRequirements', name: 'Supplier Requirements' },
    ],
    collections: [
      { type: 'service', name: 'Services', minCount: 3 },
      { type: 'industry', name: 'Industries', minCount: 3 },
      { type: 'resource', name: 'Resources', minCount: 10 },
      { type: 'teamMember', name: 'Team Members', minCount: 1 },
      { type: 'jobPosting', name: 'Job Postings', minCount: 0 }, // Optional
    ]
  };

  let allGood = true;

  // Check singletons
  console.log('📄 SINGLETON DOCUMENTS:\n');
  for (const singleton of checks.singletons) {
    try {
      const doc = await client.fetch(`*[_type == "${singleton.type}"][0]{_id, _type, _updatedAt}`);
      if (doc) {
        const updated = new Date(doc._updatedAt).toLocaleDateString();
        console.log(`✅ ${singleton.name.padEnd(25)} exists (updated ${updated})`);
      } else {
        console.log(`❌ ${singleton.name.padEnd(25)} MISSING`);
        allGood = false;
      }
    } catch (error) {
      console.log(`❌ ${singleton.name.padEnd(25)} ERROR: ${error}`);
      allGood = false;
    }
  }

  // Check collections
  console.log('\n📚 COLLECTIONS:\n');
  for (const collection of checks.collections) {
    try {
      const count = await client.fetch(`count(*[_type == "${collection.type}"])`);
      const status = count >= collection.minCount ? '✅' : '⚠️ ';
      const message = count >= collection.minCount ? '' : ` (expected at least ${collection.minCount})`;
      console.log(`${status} ${collection.name.padEnd(25)} ${count} documents${message}`);
      if (count < collection.minCount) {
        allGood = false;
      }
    } catch (error) {
      console.log(`❌ ${collection.name.padEnd(25)} ERROR: ${error}`);
      allGood = false;
    }
  }

  // Check for unpublished content
  console.log('\n🔍 PUBLISHED STATUS CHECK:\n');
  const unpublishedServices = await client.fetch(`count(*[_type == "service" && published != true])`);
  const unpublishedIndustries = await client.fetch(`count(*[_type == "industry" && published != true])`);
  const unpublishedResources = await client.fetch(`count(*[_type == "resource" && published != true])`);

  console.log(`   Services with published=false: ${unpublishedServices}`);
  console.log(`   Industries with published=false: ${unpublishedIndustries}`);
  console.log(`   Resources with published=false: ${unpublishedResources}`);

  // Check critical fields on key documents
  console.log('\n🎯 CRITICAL FIELD VALIDATION:\n');

  const homepage = await client.fetch(`*[_type == "homepage"][0]{
    hero{word1, word2, word3, tagline, badges},
    heroEnhanced{word1, word2, word3, tagline, badges, slides},
    "hasStats": defined(stats) && length(stats.items) > 0,
    "hasServices": defined(servicesSection)
  }`);

  // Check if either hero or heroEnhanced has the required fields
  const heroData = homepage?.heroEnhanced || homepage?.hero;
  if (heroData?.word1 && heroData?.word2 && heroData?.word3) {
    console.log('✅ Homepage hero configured');
  } else {
    console.log('❌ Homepage hero missing or incomplete');
    allGood = false;
  }

  if (homepage?.hasStats) {
    console.log('✅ Homepage stats configured');
  } else {
    console.log('⚠️  Homepage stats missing (optional but recommended)');
  }

  const footer = await client.fetch(`*[_type == "footer"][0]{
    "hasServicesLinks": defined(servicesLinks) && length(servicesLinks) > 0,
    "hasQuickLinks": defined(quickLinks) && length(quickLinks) > 0,
    "hasContact": defined(contact),
    "hasSocial": defined(social)
  }`);

  if (footer?.hasServicesLinks && footer?.hasQuickLinks && footer?.hasContact) {
    console.log('✅ Footer fully configured');
  } else {
    console.log('❌ Footer incomplete');
    allGood = false;
  }

  // Check for SEO fields on key pages
  console.log('\n🔍 SEO CONFIGURATION:\n');

  const pagesWithSEO = await client.fetch(`{
    "homepage": *[_type == "homepage"][0]{_id, "hasSEO": defined(seo.metaTitle)},
    "services": *[_type == "servicesPage"][0]{_id, "hasSEO": defined(seo.metaTitle)},
    "industries": *[_type == "industriesPage"][0]{_id, "hasSEO": defined(seo.metaTitle)}
  }`);

  if (pagesWithSEO.homepage?.hasSEO) {
    console.log('✅ Homepage has SEO metadata');
  } else {
    console.log('⚠️  Homepage missing SEO metadata');
  }

  if (pagesWithSEO.services?.hasSEO) {
    console.log('✅ Services page has SEO metadata');
  } else {
    console.log('⚠️  Services page missing SEO metadata');
  }

  if (pagesWithSEO.industries?.hasSEO) {
    console.log('✅ Industries page has SEO metadata');
  } else {
    console.log('⚠️  Industries page missing SEO metadata');
  }

  // Final verdict
  console.log('\n' + '='.repeat(60));
  if (allGood) {
    console.log('✅ SANITY CMS IS READY FOR HANDOFF');
    console.log('\nMarketing team can now:');
    console.log('  • Edit all page content via /studio');
    console.log('  • Create/edit services, industries, resources');
    console.log('  • Manage team members and job postings');
    console.log('  • Update footer and site settings');
    console.log('  • Hide/show content with published toggles');
  } else {
    console.log('⚠️  SANITY CMS NEEDS ATTENTION BEFORE HANDOFF');
    console.log('\nSome documents are missing or incomplete.');
    console.log('Run seed scripts or manually create content in Studio.');
  }
  console.log('='.repeat(60));
}

verifyHandoffReadiness().catch(console.error);
