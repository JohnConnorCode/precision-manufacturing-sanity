import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk80ZgAYy7yIfoJlvqcNLBUOGfMpYuB730iY9Mfx9bSlQ7nwzMNACjtXDzpAiS4xb0HSXayclaV3Y9hNHi9UXWPW3Raw70vCxd1mAtTOlEzTT7yUxMl1CK6AP6paFep4SYMEXp2uJPgmNBWnMgqdVBbItwu7tWIXCzwSvVJiOBWsk9paD806',
  useCdn: false
});

async function testQueries() {
  console.log('Testing Sanity queries...\n');

  // Test services
  const services = await client.fetch('*[_type == "service"] | order(order asc) { title, slug }');
  console.log(`Services: ${services.length} found`);
  services.forEach(s => console.log(`   - ${s.title}`));

  // Test industries
  const industries = await client.fetch('*[_type == "industry"] | order(order asc) { title, slug }');
  console.log(`\nIndustries: ${industries.length} found`);
  industries.forEach(i => console.log(`   - ${i.title}`));

  // Test team members
  const team = await client.fetch('*[_type == "teamMember"] | order(order asc) { name, title }');
  console.log(`\nTeam Members: ${team.length} found`);
  team.forEach(t => console.log(`   - ${t.name} - ${t.title}`));

  // Test homepage
  const homepage = await client.fetch('*[_id == "homepage"][0] { heroEnhanced }');
  console.log(`\nHomepage: ${homepage ? 'Found' : 'Not found'}`);
  if (homepage && homepage.heroEnhanced) {
    console.log(`   Main Title: ${homepage.heroEnhanced.mainTitle}`);
    console.log(`   Badges: ${homepage.heroEnhanced.badges ? homepage.heroEnhanced.badges.length : 0}`);
  }
}

testQueries().catch(console.error);
