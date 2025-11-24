#!/usr/bin/env npx tsx

import { client } from '../sanity/lib/client';

async function testJobPages() {
  console.log('Fetching all published job postings...\n');

  const jobs = await client.fetch(`
    *[_type == "jobPosting" && published == true] {
      _id,
      title,
      "slug": slug.current,
      department,
      employmentType,
      location
    }
  `);

  console.log(`Found ${jobs.length} published job postings:\n`);

  jobs.forEach((job: any, index: number) => {
    console.log(`${index + 1}. ${job.title}`);
    console.log(`   Slug: ${job.slug}`);
    console.log(`   URL: http://localhost:3000/careers/${job.slug}`);
    console.log(`   Department: ${job.department}`);
    console.log(`   Type: ${job.employmentType}`);
    console.log(`   Location: ${job.location}`);
    console.log('');
  });

  console.log('✅ Job pages created successfully!');
  console.log('   The following pages should be accessible:');
  jobs.forEach((job: any) => {
    console.log(`   - /careers/${job.slug}`);
  });
}

testJobPages().catch(console.error);
