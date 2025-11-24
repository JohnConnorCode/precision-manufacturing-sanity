const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function verifyDuplicates() {
  console.log('=== VERIFYING DUPLICATES ===\n');

  // Check services in detail
  const services = await client.fetch(`*[_type == 'service'] | order(_createdAt asc) {
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    published,
    'statsCount': count(statistics),
    'processSteps': count(process.steps),
    'capCount': count(capabilities),
    'capWithImages': count(capabilities[defined(imageUrl)])
  }`);

  console.log('ALL SERVICES (chronological):');
  services.forEach((s, i) => {
    const pub = s.published !== false ? 'YES' : 'NO';
    console.log(`\n${i+1}. ${s.title}`);
    console.log(`   ID: ${s._id}`);
    console.log(`   Created: ${s._createdAt}`);
    console.log(`   Slug: /services/${s.slug}`);
    console.log(`   Published: ${pub}`);
    console.log(`   Statistics: ${s.statsCount || 0}`);
    console.log(`   Process steps: ${s.processSteps || 0}`);
    console.log(`   Capabilities: ${s.capCount || 0} (with images: ${s.capWithImages || 0})`);
  });

  // Check industries in detail
  const industries = await client.fetch(`*[_type == 'industry'] | order(_createdAt asc) {
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    published,
    'expertiseCount': count(expertise),
    'certCount': count(certifications),
    'hasCta': defined(cta)
  }`);

  console.log('\n\n=== ALL INDUSTRIES (chronological):');
  industries.forEach((i, idx) => {
    const pub = i.published !== false ? 'YES' : 'NO';
    console.log(`\n${idx+1}. ${i.title}`);
    console.log(`   ID: ${i._id}`);
    console.log(`   Created: ${i._createdAt}`);
    console.log(`   Slug: /industries/${i.slug}`);
    console.log(`   Published: ${pub}`);
    console.log(`   Expertise sections: ${i.expertiseCount || 0}`);
    console.log(`   Certifications: ${i.certCount || 0}`);
    console.log(`   Has CTA: ${i.hasCta ? 'YES' : 'NO'}`);
  });
}

verifyDuplicates().catch(console.error);
