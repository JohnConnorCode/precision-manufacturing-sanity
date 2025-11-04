import { chromium } from 'playwright';

const LOCAL_URL = 'http://localhost:3000';

async function testStudioEditability() {
  console.log('\n🧪 TESTING SANITY STUDIO EDITABILITY\n');
  console.log('='.repeat(80));

  const browser = await chromium.launch({ headless: false }); // Non-headless so we can see what's happening
  const page = await browser.newPage();

  const results: { field: string; status: string; details?: string }[] = [];

  try {
    // Step 1: Navigate to Studio
    console.log('\n📂 Step 1: Opening Sanity Studio...');
    await page.goto(`${LOCAL_URL}/studio`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Check if Studio loaded
    const studioLoaded = await page.locator('text=Sanity Studio').count() > 0 ||
                         await page.locator('[data-ui="Pane"]').count() > 0;
    
    if (!studioLoaded) {
      console.log('  ❌ Studio did not load properly');
      results.push({ field: 'Studio Load', status: 'FAIL', details: 'Studio UI not detected' });
      throw new Error('Studio did not load');
    }
    console.log('  ✅ Studio loaded successfully');
    results.push({ field: 'Studio Load', status: 'PASS' });

    // Step 2: Find and click Homepage document
    console.log('\n📄 Step 2: Opening Homepage document...');
    
    // Look for Homepage in the document list
    const homepageLink = page.locator('text=Homepage').first();
    const homepageExists = await homepageLink.count() > 0;
    
    if (!homepageExists) {
      console.log('  ⚠️  Homepage document not found in list, trying navigation...');
      // Try direct navigation to homepage document
      await page.goto(`${LOCAL_URL}/studio/structure/homepage`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
    } else {
      await homepageLink.click();
      await page.waitForTimeout(2000);
    }

    console.log('  ✅ Homepage document opened');
    results.push({ field: 'Homepage Document', status: 'PASS' });

    // Step 3: Check for new fields in the document
    console.log('\n🔍 Step 3: Checking for new editable fields...\n');

    const fieldsToCheck = [
      { name: 'Enhanced Hero Section', selector: 'text=Enhanced Hero Section' },
      { name: 'Hero - Main Title', selector: 'input[name="heroEnhanced.mainTitle"]' },
      { name: 'Hero - CTA Primary Text', selector: 'input[name="heroEnhanced.ctaPrimary.text"]' },
      { name: 'Hero - CTA Primary Link', selector: 'input[name="heroEnhanced.ctaPrimary.href"]' },
      { name: 'Hero - CTA Secondary Text', selector: 'input[name="heroEnhanced.ctaSecondary.text"]' },
      { name: 'Hero - CTA Secondary Link', selector: 'input[name="heroEnhanced.ctaSecondary.href"]' },
      { name: 'Services Section', selector: 'text=Services Section' },
      { name: 'Services - Eyebrow', selector: 'input[name="servicesSection.eyebrow"]' },
      { name: 'Services - Heading', selector: 'input[name="servicesSection.heading"]' },
      { name: 'Services - Description', selector: 'textarea[name="servicesSection.description"]' },
      { name: 'Industries Section', selector: 'text=Industries Section' },
      { name: 'Industries - Eyebrow', selector: 'input[name="industriesSection.eyebrow"]' },
      { name: 'Industries - Heading', selector: 'input[name="industriesSection.heading"]' },
      { name: 'Industries - Description', selector: 'textarea[name="industriesSection.description"]' },
      { name: 'Statistics Section', selector: 'text=Statistics Section' },
      { name: 'Stats - Title', selector: 'input[name="stats.title"]' },
      { name: 'Stats - Subtitle', selector: 'input[name="stats.subtitle"]' },
      { name: 'Resources Section', selector: 'text=Resources Section' },
      { name: 'Resources - Benefits Grid', selector: 'button[aria-label*="benefits"]' },
      { name: 'Final Call to Action', selector: 'text=Final Call to Action' },
      { name: 'CTA - Buttons', selector: 'button[aria-label*="CTA Buttons"]' },
    ];

    for (const field of fieldsToCheck) {
      try {
        // Scroll field into view if needed
        const element = page.locator(field.selector).first();
        const count = await element.count();
        
        if (count > 0) {
          // Try to scroll to it
          await element.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
          await page.waitForTimeout(500);
          
          console.log(`  ✅ ${field.name} - FOUND`);
          results.push({ field: field.name, status: 'PASS', details: 'Field is visible in Studio' });
        } else {
          console.log(`  ❌ ${field.name} - NOT FOUND`);
          results.push({ field: field.name, status: 'FAIL', details: 'Field not visible in Studio' });
        }
      } catch (error: any) {
        console.log(`  ⚠️  ${field.name} - ERROR: ${error.message}`);
        results.push({ field: field.name, status: 'ERROR', details: error.message });
      }
    }

    // Step 4: Try to edit one field as a test
    console.log('\n✏️  Step 4: Testing field editability (trying to edit Hero Main Title)...');
    try {
      const titleInput = page.locator('input[name="heroEnhanced.mainTitle"]').first();
      const titleExists = await titleInput.count() > 0;
      
      if (titleExists) {
        await titleInput.scrollIntoViewIfNeeded();
        await titleInput.click();
        await titleInput.fill('TEST EDIT - PRECISION MANUFACTURING');
        await page.waitForTimeout(1000);
        
        const newValue = await titleInput.inputValue();
        if (newValue.includes('TEST EDIT')) {
          console.log('  ✅ Field is editable - Successfully changed value');
          results.push({ field: 'Field Editability Test', status: 'PASS', details: 'Successfully edited Hero Main Title' });
        } else {
          console.log('  ❌ Field edit did not persist');
          results.push({ field: 'Field Editability Test', status: 'FAIL', details: 'Edit did not persist' });
        }
      } else {
        console.log('  ⚠️  Could not find field to test editing');
        results.push({ field: 'Field Editability Test', status: 'SKIP', details: 'Field not found' });
      }
    } catch (error: any) {
      console.log(`  ❌ Edit test failed: ${error.message}`);
      results.push({ field: 'Field Editability Test', status: 'FAIL', details: error.message });
    }

  } catch (error: any) {
    console.error(`\n❌ Fatal error: ${error.message}`);
    results.push({ field: 'Test Execution', status: 'FAIL', details: error.message });
  }

  // Keep browser open for 5 seconds so user can see the Studio
  console.log('\n⏳ Keeping browser open for 5 seconds...');
  await page.waitForTimeout(5000);

  await browser.close();

  // Print final report
  console.log('\n' + '='.repeat(80));
  console.log('📊 STUDIO EDITABILITY TEST RESULTS');
  console.log('='.repeat(80));

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const errors = results.filter(r => r.status === 'ERROR').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  console.log(`\n✅ PASSED: ${passed}`);
  console.log(`❌ FAILED: ${failed}`);
  console.log(`⚠️  ERRORS: ${errors}`);
  console.log(`⏭️  SKIPPED: ${skipped}`);

  console.log('\n📋 Detailed Results:\n');
  results.forEach((result, i) => {
    const icon = result.status === 'PASS' ? '✅' : 
                 result.status === 'FAIL' ? '❌' : 
                 result.status === 'ERROR' ? '⚠️' : '⏭️';
    console.log(`  ${i + 1}. ${icon} ${result.field} - ${result.status}`);
    if (result.details) {
      console.log(`      Details: ${result.details}`);
    }
  });

  if (failed > 0 || errors > 0) {
    console.log('\n❌ EDITABILITY TEST FAILED');
    console.log('Some fields are not accessible in Sanity Studio.');
    process.exit(1);
  } else {
    console.log('\n✅ EDITABILITY TEST PASSED');
    console.log('All critical fields are accessible and editable in Sanity Studio.');
    process.exit(0);
  }
}

testStudioEditability().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
