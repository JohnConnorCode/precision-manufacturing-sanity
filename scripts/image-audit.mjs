import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

async function auditImages() {
  // Query all image references across the database
  const query = `{
    "services": *[_type=="service"]{
      "slug":slug.current,
      "cardImage":image.asset->originalFilename,
      "heroImage":heroImage.asset->originalFilename
    },
    "industries": *[_type=="industry"]{
      "slug":slug.current,
      "cardImage":image.asset->originalFilename,
      "heroImage":hero.backgroundImage.asset->originalFilename,
      "capabilities":capabilities[]{
        "title":title,
        "image":image.asset->originalFilename
      }
    },
    "homepage": *[_type=="homepage"][0]{
      "heroImage":hero.backgroundImage.asset->originalFilename,
      "servicesSection":servicesSection.services[]{
        "title":title,
        "image":image.asset->originalFilename
      },
      "industriesSection":industriesSection.industries[]{
        "title":title,
        "image":image.asset->originalFilename
      },
      "caseStudySection":caseStudySection.caseStudies[]{
        "title":title,
        "image":image.asset->originalFilename
      }
    },
    "caseStudies": *[_type=="caseStudy"]{
      "slug":slug.current,
      "cardImage":image.asset->originalFilename,
      "heroImage":heroImage.asset->originalFilename
    }
  }`;

  const data = await client.fetch(query);

  // Track image usage
  const imageUsage = {};
  const recordUsage = (filename, location) => {
    if (!filename) return;
    if (!imageUsage[filename]) imageUsage[filename] = [];
    imageUsage[filename].push(location);
  };

  // Services
  console.log('=== SERVICES ===');
  for (const s of data.services) {
    console.log(`${s.slug}: card=${s.cardImage || 'MISSING'}, hero=${s.heroImage || 'MISSING'}`);
    recordUsage(s.cardImage, `service-card:${s.slug}`);
    recordUsage(s.heroImage, `service-hero:${s.slug}`);
  }

  // Industries
  console.log('\n=== INDUSTRIES ===');
  for (const i of data.industries) {
    console.log(`${i.slug}: card=${i.cardImage || 'MISSING'}, hero=${i.heroImage || 'MISSING'}`);
    recordUsage(i.cardImage, `industry-card:${i.slug}`);
    recordUsage(i.heroImage, `industry-hero:${i.slug}`);
    if (i.capabilities) {
      for (const cap of i.capabilities) {
        console.log(`  - ${cap.title}: ${cap.image || 'MISSING'}`);
        recordUsage(cap.image, `industry-cap:${i.slug}:${cap.title}`);
      }
    }
  }

  // Homepage
  console.log('\n=== HOMEPAGE ===');
  console.log(`Hero: ${data.homepage?.heroImage || 'MISSING'}`);
  recordUsage(data.homepage?.heroImage, 'homepage-hero');

  if (data.homepage?.servicesSection) {
    console.log('Services section:');
    for (const s of data.homepage.servicesSection) {
      console.log(`  - ${s.title}: ${s.image || 'MISSING'}`);
      recordUsage(s.image, `homepage-service:${s.title}`);
    }
  }

  if (data.homepage?.industriesSection) {
    console.log('Industries section:');
    for (const i of data.homepage.industriesSection) {
      console.log(`  - ${i.title}: ${i.image || 'MISSING'}`);
      recordUsage(i.image, `homepage-industry:${i.title}`);
    }
  }

  if (data.homepage?.caseStudySection) {
    console.log('Case Studies section:');
    for (const cs of data.homepage.caseStudySection) {
      console.log(`  - ${cs.title}: ${cs.image || 'MISSING'}`);
      recordUsage(cs.image, `homepage-casestudy:${cs.title}`);
    }
  }

  // Case Studies
  console.log('\n=== CASE STUDIES ===');
  for (const cs of data.caseStudies) {
    console.log(`${cs.slug}: card=${cs.cardImage || 'MISSING'}, hero=${cs.heroImage || 'MISSING'}`);
    recordUsage(cs.cardImage, `casestudy-card:${cs.slug}`);
    recordUsage(cs.heroImage, `casestudy-hero:${cs.slug}`);
  }

  // Find duplicates
  console.log('\n=== REUSED IMAGES (used 2+ times) ===');
  const reused = Object.entries(imageUsage).filter(([_, locations]) => locations.length > 1);
  if (reused.length === 0) {
    console.log('No reused images found.');
  } else {
    for (const [img, locations] of reused) {
      console.log(`\n${img} (${locations.length} uses):`);
      for (const loc of locations) {
        console.log(`  - ${loc}`);
      }
    }
  }
}

auditImages().catch(console.error);
