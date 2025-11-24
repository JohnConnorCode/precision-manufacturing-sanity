#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function fixDuplicates() {
  console.log('🔍 Checking for duplicate about/careers documents\n');

  // Check about documents
  const aboutDocs = await client.fetch(`*[_type == "about"] | order(_createdAt asc) {
    _id,
    _createdAt,
    "hasStory": defined(story.paragraphs),
    "hasTimeline": defined(timeline),
    "hasLeadership": defined(leadership)
  }`);

  console.log(`Found ${aboutDocs.length} about documents:`);
  aboutDocs.forEach((doc: any, idx: number) => {
    console.log(`  ${idx + 1}. ${doc._id} (${doc._createdAt})`);
    console.log(`     Story: ${doc.hasStory ? '✅' : '❌'}, Timeline: ${doc.hasTimeline ? '✅' : '❌'}, Leadership: ${doc.hasLeadership ? '✅' : '❌'}`);
  });

  // Keep the one WITH content (should be the older "about" document)
  if (aboutDocs.length > 1) {
    const docsToDelete = aboutDocs.filter((doc: any) => !doc.hasStory && !doc.hasTimeline);
    for (const doc of docsToDelete) {
      console.log(`\n❌ Deleting empty about document: ${doc._id}`);
      await client.delete(doc._id);
    }
  }

  // Check careers documents
  const careersDocs = await client.fetch(`*[_type == "careers"] | order(_createdAt asc) {
    _id,
    _createdAt,
    "benefitsCount": count(benefits.items),
    "hasJobs": defined(jobs)
  }`);

  console.log(`\n\nFound ${careersDocs.length} careers documents:`);
  careersDocs.forEach((doc: any, idx: number) => {
    console.log(`  ${idx + 1}. ${doc._id} (${doc._createdAt})`);
    console.log(`     Benefits: ${doc.benefitsCount || 0}, Jobs: ${doc.hasJobs ? '✅' : '❌'}`);
  });

  // Keep the one with MORE benefits (should be the older "careers" document with 4 benefits)
  if (careersDocs.length > 1) {
    const docsToDelete = careersDocs.filter((doc: any) => doc.benefitsCount < 4);
    for (const doc of docsToDelete) {
      console.log(`\n❌ Deleting careers document with fewer benefits: ${doc._id}`);
      await client.delete(doc._id);
    }
  }

  console.log('\n✅ Duplicates cleaned up!');
  console.log('\nVerifying final state...\n');

  // Verify
  const finalAbout = await client.fetch(`*[_type == "about"][0] {
    _id,
    "hasStory": defined(story.paragraphs) && count(story.paragraphs) > 0,
    "hasTimeline": defined(timeline.milestones) && count(timeline.milestones) > 0
  }`);

  const finalCareers = await client.fetch(`*[_type == "careers"][0] {
    _id,
    "benefitsCount": count(benefits.items),
    "valuesCount": count(values.items)
  }`);

  console.log('Final About Document:');
  console.log(`  ID: ${finalAbout._id}`);
  console.log(`  Has Story: ${finalAbout.hasStory ? '✅' : '❌'}`);
  console.log(`  Has Timeline: ${finalAbout.hasTimeline ? '✅' : '❌'}`);

  console.log('\nFinal Careers Document:');
  console.log(`  ID: ${finalCareers._id}`);
  console.log(`  Benefits: ${finalCareers.benefitsCount || 0}`);
  console.log(`  Values: ${finalCareers.valuesCount || 0}`);
}

fixDuplicates().catch(console.error);
