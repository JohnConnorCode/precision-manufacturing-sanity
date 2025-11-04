import { chromium } from 'playwright';

const LOCAL_URL = 'http://localhost:3000';

async function testStudio() {
  console.log('\n🧪 Testing Sanity Studio Editability\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Step 1: Load Studio
    console.log('1. Loading Studio...');
    await page.goto(`${LOCAL_URL}/studio/structure/homepage`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(8000); // Wait for Studio to fully load

    // Step 2: Take screenshot
    await page.screenshot({ path: '/tmp/studio-homepage.png', fullPage: true });
    console.log('   Screenshot saved to /tmp/studio-homepage.png');

    // Step 3: Count input fields
    const inputs = await page.locator('input[type="text"], textarea').count();
    console.log(`\n2. Found ${inputs} editable fields`);

    // Step 4: List field names
    const fieldNames = await page.locator('input[name], textarea[name]').evaluateAll(
      (elements: Element[]) => elements.map(el => el.getAttribute('name')).filter(Boolean)
    );

    console.log(`\n3. Field names found (${fieldNames.length} total):`);
    fieldNames.forEach((name, i) => {
      if (i < 30) console.log(`   - ${name}`);
    });
    if (fieldNames.length > 30) console.log(`   ... and ${fieldNames.length - 30} more`);

    // Step 5: Check for our new fields
    const required = [
      'heroEnhanced.mainTitle',
      'heroEnhanced.ctaPrimary.text',
      'servicesSection.eyebrow',
      'industriesSection.eyebrow',
      'stats.title',
    ];

    console.log('\n4. Checking for new schema fields:');
    let foundCount = 0;
    for (const field of required) {
      const found = fieldNames.includes(field);
      console.log(`   ${found ? '✅' : '❌'} ${field}`);
      if (found) foundCount++;
    }

    console.log(`\n📊 Result: ${foundCount}/${required.length} new fields found`);

    await page.waitForTimeout(3000);
    await browser.close();

    process.exit(foundCount === required.length ? 0 : 1);
  } catch (error: any) {
    console.error('Error:', error.message);
    await browser.close();
    process.exit(1);
  }
}

testStudio();
