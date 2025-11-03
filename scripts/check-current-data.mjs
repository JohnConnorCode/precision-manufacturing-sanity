import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk80ZgAYy7yIfoJlvqcNLBUOGfMpYuB730iY9Mfx9bSlQ7nwzMNACjtXDzpAiS4xb0HSXayclaV3Y9hNHi9UXWPW3Raw70vCxd1mAtTOlEzTT7yUxMl1CK6AP6paFep4SYMEXp2uJPgmNBWnMgqdVBbItwu7tWIXCzwSvVJiOBWsk9paD806',
  useCdn: false
});

async function checkData() {
  console.log('🔍 Checking current Sanity data...\n');

  // Check homepage technicalSpecs
  const homepage = await client.fetch('*[_id == "homepage"][0] { technicalSpecs }');
  console.log('📊 Homepage Technical Specs:');
  if (homepage && homepage.technicalSpecs) {
    console.log(`   Found: ${homepage.technicalSpecs.length} specs`);
    homepage.technicalSpecs.forEach((spec, i) => {
      console.log(`   [${i}] "${spec.value}" - Icon: ${spec.iconName || 'MISSING'}`);
    });
  } else {
    console.log('   ❌ NOT FOUND or EMPTY');
  }

  // Check navigation
  const navigation = await client.fetch('*[_id == "navigation"][0] { menuItems }');
  console.log('\n🧭 Navigation Menu Items:');
  if (navigation && navigation.menuItems) {
    console.log(`   Found: ${navigation.menuItems.length} items`);
    navigation.menuItems.forEach((item, i) => {
      const hasDropdown = item.children && item.children.length > 0;
      console.log(`   [${i}] "${item.name}" (${item.href}) - Dropdown: ${hasDropdown ? `YES (${item.children.length} items)` : 'NO'}`);
    });
  } else {
    console.log('   ❌ NOT FOUND or EMPTY');
  }

  // Check resources
  const resources = await client.fetch('*[_type == "resource"] | order(publishDate desc) { title, category, publishDate }');
  console.log('\n📚 Resource Articles:');
  console.log(`   Found: ${resources.length} articles`);
  if (resources.length > 0) {
    const byCategory = resources.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {});
    Object.entries(byCategory).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} articles`);
    });
  } else {
    console.log('   ❌ NO ARTICLES FOUND');
  }

  // Check services
  const services = await client.fetch('*[_type == "service"] | order(order asc) { title, slug }');
  console.log('\n🔧 Services:');
  console.log(`   Found: ${services.length} services`);
  services.forEach(s => console.log(`   - ${s.title} (/${s.slug.current})`));

  // Check industries
  const industries = await client.fetch('*[_type == "industry"] | order(order asc) { title, slug }');
  console.log('\n🏭 Industries:');
  console.log(`   Found: ${industries.length} industries`);
  industries.forEach(i => console.log(`   - ${i.title} (/${i.slug.current})`));

  console.log('\n✅ Data check complete');
}

checkData().catch(console.error);
