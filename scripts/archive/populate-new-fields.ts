import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

async function populateHomepageFields() {
  console.log('Populating homepage fields...');

  try {
    // Populate CTA section fields
    await client
      .patch('drafts.homepage')
      .set({
        'cta.badge': '30 Years of Aerospace Excellence',
        'cta.certifications': [
          { icon: 'Clock', text: '24/7 Production' },
          { icon: 'Shield', text: 'ITAR Registered' },
          { icon: 'Award', text: 'AS9100D' }
        ],
        'cta.trustMessage': 'Trusted by leading aerospace & defense contractors worldwide'
      })
      .commit();

    console.log('✓ CTA section fields populated');

    // Populate Resources section field
    await client
      .patch('drafts.homepage')
      .set({
        'resourcesSection.additionalSeriesText': '6 Complete Series • 21+ Technical Articles'
      })
      .commit();

    console.log('✓ Resources section field populated');

    console.log('\n✓ All homepage fields populated successfully!');
  } catch (error) {
    console.error('Error populating homepage:', error);
    throw error;
  }
}

async function populateSiteSettings() {
  console.log('\nPopulating site settings...');

  try {
    // Check if site settings document exists
    const existing = await client.fetch('*[_type == "siteSettings"][0]{ _id }');

    if (!existing) {
      console.log('Site settings document does not exist yet. Creating...');
      await client.create({
        _type: 'siteSettings',
        _id: 'siteSettings',
        company: {
          name: 'IIS - Integrated Inspection Systems',
          legalName: 'IIS Precision Manufacturing',
          alternateName: 'IIS',
          websiteUrl: 'https://iismet.com',
          tagline: 'Precision Machining & CMM Inspection Services',
          description: 'Engineering, Metrology, Machining & Database Services since 1995. AS9100 & ISO 9001 certified precision machining and CMM inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered.',
          foundingYear: '1995'
        },
        contact: {
          phone: '+1-503-231-9093',
          email: 'officemgr@iismet.com',
          address: '14310 SE Industrial Way',
          city: 'Clackamas',
          state: 'Oregon',
          zip: '97015',
          country: 'United States'
        },
        social: {
          linkedin: 'https://www.linkedin.com/company/integrated-inspection-systems',
          twitter: 'https://twitter.com/iismet',
          twitterHandle: '@iisprecision'
        }
      });
      console.log('✓ Site settings created');
    } else {
      console.log('Site settings exists, updating fields...');
      await client
        .patch(existing._id)
        .set({
          'company.alternateName': 'IIS',
          'company.websiteUrl': 'https://iismet.com'
        })
        .commit();
      console.log('✓ Site settings updated');
    }

    console.log('\n✓ Site settings populated successfully!');
  } catch (error) {
    console.error('Error populating site settings:', error);
    throw error;
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('POPULATING NEW SANITY FIELDS');
  console.log('='.repeat(50));

  try {
    await populateHomepageFields();
    await populateSiteSettings();

    console.log('\n' + '='.repeat(50));
    console.log('✓ ALL FIELDS POPULATED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log('\nYou can now view the changes in Sanity Studio at:');
    console.log('http://localhost:3000/studio');
  } catch (error) {
    console.error('\n✗ Error during population:', error);
    process.exit(1);
  }
}

main();
