#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function checkData() {
  console.log('🔍 Checking Aerospace industry data...\n');

  const aerospace = await client.fetch(`*[_type == "industry" && slug.current == "aerospace"][0]{
    _id,
    title,
    slug,
    published,
    shortDescription,
    "hasHero": defined(hero),
    "hasStats": defined(stats),
    "hasMarketOverview": defined(marketOverview),
    "hasExpertise": defined(expertise),
    "hasCertifications": defined(certifications),
    "hasApplications": defined(applications),
    "hasCapabilities": defined(capabilities),
    "expertiseCount": count(expertise),
    "certificationsCount": count(certifications),
    expertise[]{title},
    certifications[]{title, description}
  }`);

  console.log('Aerospace Document Structure:');
  console.log(JSON.stringify(aerospace, null, 2));
}

checkData();
