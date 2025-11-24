#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function fix() {
  console.log('Deleting newer empty about document...');
  await client.delete('052873bc-ff26-4f5f-9ec6-cc270d5db48b');
  console.log('✅ Deleted');

  const about = await client.fetch(`*[_type == "about"][0] {
    _id,
    "hasStory": count(story.paragraphs) > 0,
    "storyCount": count(story.paragraphs)
  }`);

  console.log('\nFinal about document:');
  console.log(`  ID: ${about._id}`);
  console.log(`  Has story: ${about.hasStory ? '✅' : '❌'}`);
  console.log(`  Story paragraphs: ${about.storyCount || 0}`);
}

fix().catch(console.error);
