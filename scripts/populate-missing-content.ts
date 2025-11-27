/**
 * Migration Script: Populate Missing Sanity Content
 *
 * This script populates:
 * - Industry hero background images
 * - Service hero background images
 * - Service capabilities section headings
 *
 * Run with: npx tsx scripts/populate-missing-content.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

// Image asset references by name
const imageAssets = {
  // Industry images
  aerospace: 'image-3a269bb8b961f1dc1fc5321d1a14bb41ec295b89-1200x900-jpg',
  defense: 'image-8871d9e11349dfb20cb79dd9512ebcb0a0c8a2ff-1200x800-jpg',
  energy: 'image-1d279494238529a2ab7434cb251dc09cc496387e-1200x800-jpg',

  // Service images
  fiveAxis: 'image-514525a24860527cf951fd9f65acac15e7d8fb10-1024x1536-png',
  metrology: 'image-a1e0b8424e0f5bfe09ed65269b8745649b0578cf-800x533-jpg',
  adaptive: 'image-e59c2ca9901e61dce18c6c4d20b38cf807c3a31b-1536x1024-png',
  engineering: 'image-21a64aa81eb06febd7a23492b477b60edf92cdd3-1536x1024-png',
};

// Industry content updates
const industryUpdates = [
  {
    slug: 'aerospace',
    heroImage: imageAssets.aerospace,
    heroImageAlt: 'Aerospace manufacturing facility with precision machined components',
  },
  {
    slug: 'defense',
    heroImage: imageAssets.defense,
    heroImageAlt: 'Defense manufacturing precision components',
  },
  {
    slug: 'energy',
    heroImage: imageAssets.energy,
    heroImageAlt: 'Energy sector precision manufacturing',
  },
];

// Service content updates
const serviceUpdates = [
  {
    slug: '5-axis-machining',
    heroImage: imageAssets.fiveAxis,
    heroImageAlt: 'Advanced 5-axis CNC machining in operation',
    capabilitiesHeading: 'Our Precision Machining Capabilities',
  },
  {
    slug: 'metrology',
    heroImage: imageAssets.metrology,
    heroImageAlt: 'Precision metrology and CMM inspection equipment',
    capabilitiesHeading: 'Our Measurement & Inspection Capabilities',
  },
  {
    slug: 'adaptive-machining',
    heroImage: imageAssets.adaptive,
    heroImageAlt: 'Adaptive machining with smart sensors and real-time monitoring',
    capabilitiesHeading: 'Our Adaptive Manufacturing Capabilities',
  },
  {
    slug: 'engineering',
    heroImage: imageAssets.engineering,
    heroImageAlt: 'Engineering services and CAD design workstation',
    capabilitiesHeading: 'Our Engineering Service Capabilities',
  },
];

async function updateIndustries() {
  console.log('\n=== UPDATING INDUSTRIES ===\n');

  for (const update of industryUpdates) {
    try {
      // Find the industry by slug
      const industry = await client.fetch(
        `*[_type == "industry" && slug.current == $slug][0]{_id, title}`,
        { slug: update.slug }
      );

      if (!industry) {
        console.log(`⚠️ Industry not found: ${update.slug}`);
        continue;
      }

      console.log(`Updating ${industry.title}...`);

      // Update the hero background image
      await client
        .patch(industry._id)
        .set({
          'hero.backgroundImage': {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: update.heroImage
            },
            alt: update.heroImageAlt
          }
        })
        .commit();

      console.log(`✅ Updated ${industry.title} hero image`);
    } catch (error) {
      console.error(`❌ Error updating ${update.slug}:`, error);
    }
  }
}

async function updateServices() {
  console.log('\n=== UPDATING SERVICES ===\n');

  for (const update of serviceUpdates) {
    try {
      // Find the service by slug
      const service = await client.fetch(
        `*[_type == "service" && slug.current == $slug][0]{_id, title}`,
        { slug: update.slug }
      );

      if (!service) {
        console.log(`⚠️ Service not found: ${update.slug}`);
        continue;
      }

      console.log(`Updating ${service.title}...`);

      // Update the hero background image and capabilities heading
      await client
        .patch(service._id)
        .set({
          'hero.backgroundImage': {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: update.heroImage
            },
            alt: update.heroImageAlt
          },
          'capabilitiesSectionHeading': update.capabilitiesHeading
        })
        .commit();

      console.log(`✅ Updated ${service.title} hero image and capabilities heading`);
    } catch (error) {
      console.error(`❌ Error updating ${update.slug}:`, error);
    }
  }
}

async function main() {
  console.log('🚀 Starting content population migration...\n');

  await updateIndustries();
  await updateServices();

  console.log('\n✅ Migration complete!');
  console.log('\nRun the verification script to confirm all content is populated.');
}

main().catch(console.error);
