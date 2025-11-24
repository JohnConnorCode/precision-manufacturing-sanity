#!/usr/bin/env npx tsx

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function checkParity() {
  const issues = [];
  console.log('===========================================');
  console.log('🔍 ACTUAL CONTENT PARITY CHECK');
  console.log('===========================================\n');

  // Check Homepage
  console.log('1. HOMEPAGE:');
  const homepage = await client.fetch('*[_type == "homepage"][0]');

  // Check critical hero content
  if (!homepage?.hero?.word1 || !homepage?.hero?.word2 || !homepage?.hero?.word3) {
    issues.push('❌ Homepage hero words missing');
    console.log('   ❌ Hero words: MISSING');
  } else {
    console.log('   ✅ Hero words: ' + homepage.hero.word1 + ' ' + homepage.hero.word2 + ' ' + homepage.hero.word3);
  }

  if (!homepage?.hero?.tagline) {
    issues.push('❌ Homepage tagline missing');
    console.log('   ❌ Tagline: MISSING');
  } else {
    console.log('   ✅ Tagline: Present');
  }

  if (!homepage?.hero?.badges || homepage.hero.badges.length === 0) {
    issues.push('❌ Homepage badges missing');
    console.log('   ❌ Badges: MISSING');
  } else {
    console.log('   ✅ Badges: ' + homepage.hero.badges.length + ' badges');
  }

  // Check for background image
  const hasHeroImage = homepage?.hero?.backgroundImage || homepage?.hero?.backgroundImageUrl;
  if (!hasHeroImage) {
    issues.push('❌ Homepage hero image missing');
    console.log('   ❌ Hero image: MISSING');
  } else {
    console.log('   ✅ Hero image: Present');
  }

  // Check Services
  console.log('\n2. SERVICES:');
  const services = await client.fetch('*[_type == "service" && published == true]');
  console.log('   Services count: ' + services.length);

  const servicesWithoutImages = services.filter((s: any) => !s.image && !s.imageUrl);
  if (servicesWithoutImages.length > 0) {
    issues.push(`❌ ${servicesWithoutImages.length} services missing images`);
    console.log('   ❌ Missing images: ' + servicesWithoutImages.map((s: any) => s.title).join(', '));
  } else {
    console.log('   ✅ All services have images');
  }

  // Check Industries
  console.log('\n3. INDUSTRIES:');
  const industries = await client.fetch('*[_type == "industry" && published == true]');
  console.log('   Industries count: ' + industries.length);

  const industriesWithoutImages = industries.filter((i: any) => !i.image && !i.imageUrl);
  if (industriesWithoutImages.length > 0) {
    issues.push(`❌ ${industriesWithoutImages.length} industries missing images`);
    console.log('   ❌ Missing images: ' + industriesWithoutImages.map((i: any) => i.title).join(', '));
  } else {
    console.log('   ✅ All industries have images');
  }

  // Check Resources
  console.log('\n4. RESOURCES:');
  const resources = await client.fetch('*[_type == "resource" && published == true]');
  console.log('   Resources count: ' + resources.length);

  if (resources.length < 70) {
    issues.push(`❌ Only ${resources.length} resources (should be 70+)`);
  } else {
    console.log('   ✅ Resources count OK');
  }

  // Check Team
  console.log('\n5. TEAM MEMBERS:');
  const team = await client.fetch('*[_type == "teamMember"]');
  console.log('   Team members count: ' + team.length);

  if (team.length === 0) {
    issues.push('❌ No team members');
  } else {
    console.log('   ✅ Team members: ' + team.map((t: any) => t.name).join(', '));
  }

  // Check Footer
  console.log('\n6. FOOTER:');
  const footer = await client.fetch('*[_type == "footer"][0]');

  if (!footer?.columns || footer.columns.length === 0) {
    issues.push('❌ Footer navigation missing');
    console.log('   ❌ Navigation columns: MISSING');
  } else {
    console.log('   ✅ Navigation columns: ' + footer.columns.length);
  }

  // Check About Page
  console.log('\n7. ABOUT PAGE:');
  const aboutPage = await client.fetch('*[_type == "aboutPage"][0]');

  if (!aboutPage) {
    issues.push('❌ About page document missing');
    console.log('   ❌ Document: MISSING');
  } else {
    console.log('   ✅ Document: Present');
    if (!aboutPage.hero?.title) {
      issues.push('❌ About page hero missing');
      console.log('   ❌ Hero content: MISSING');
    }
  }

  // Check Careers Page
  console.log('\n8. CAREERS PAGE:');
  const careersPage = await client.fetch('*[_type == "careersPage"][0]');

  if (!careersPage) {
    issues.push('❌ Careers page document missing');
    console.log('   ❌ Document: MISSING');
  } else {
    console.log('   ✅ Document: Present');
  }

  // Check Job Postings
  console.log('\n9. JOB POSTINGS:');
  const jobs = await client.fetch('*[_type == "jobPosting" && published == true]');
  console.log('   Job postings: ' + jobs.length);

  if (jobs.length === 0) {
    issues.push('❌ No job postings');
  }

  // Summary
  console.log('\n===========================================');
  console.log('SUMMARY:');
  console.log('===========================================');

  if (issues.length === 0) {
    console.log('✅ 100% PARITY ACHIEVED!');
  } else {
    console.log(`❌ ${issues.length} ISSUES FOUND:\n`);
    issues.forEach(issue => console.log('  ' + issue));
  }

  return issues.length === 0;
}

checkParity().catch(console.error);