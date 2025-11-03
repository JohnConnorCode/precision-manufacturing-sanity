import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const PROD_URL = 'https://precision-manufacturing-sanity-5hdt8nxer.vercel.app';
const screenshotDir = '/tmp/site-screenshots';

// Create screenshot directory
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function visualTest() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const errors: string[] = [];
  const warnings: string[] = [];

  // Capture all errors
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`CONSOLE ERROR: ${msg.text()}`);
    }
  });

  console.log(`\n🧪 Visual Testing: ${PROD_URL}\n`);

  try {
    // Test Homepage
    console.log('📸 Testing Homepage...');
    await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: `${screenshotDir}/01-homepage.png`,
      fullPage: true
    });

    // Check for critical content
    const hasBadges = await page.locator('text=ISO 9001').isVisible();
    const hasITAR = await page.locator('text=ITAR').isVisible();
    const hasFooter = await page.locator('footer').isVisible();

    console.log(`  Badges visible: ${hasBadges ? '✅' : '❌'}`);
    console.log(`  ITAR visible: ${hasITAR ? '✅' : '❌'}`);
    console.log(`  Footer visible: ${hasFooter ? '✅' : '❌'}`);

    if (!hasBadges || !hasITAR || !hasFooter) {
      errors.push('Homepage missing critical content');
    }

    // Test About Page
    console.log('\n📸 Testing About Page...');
    await page.goto(`${PROD_URL}/about`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `${screenshotDir}/02-about.png`,
      fullPage: true
    });

    const hasTeam = await page.locator('text=John Smith').isVisible();
    console.log(`  Team members visible: ${hasTeam ? '✅' : '❌'}`);

    if (!hasTeam) {
      warnings.push('About page may be missing team members');
    }

    // Test Services Page
    console.log('\n📸 Testing Services Page...');
    await page.goto(`${PROD_URL}/services`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `${screenshotDir}/03-services.png`,
      fullPage: true
    });

    // Test 5-Axis Service
    console.log('\n📸 Testing 5-Axis Service Detail...');
    await page.goto(`${PROD_URL}/services/5-axis-machining`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `${screenshotDir}/04-5axis-service.png`,
      fullPage: true
    });

    const hasServiceContent = await page.locator('text=5-Axis').isVisible();
    console.log(`  Service content visible: ${hasServiceContent ? '✅' : '❌'}`);

    // Test Footer specifically by scrolling
    console.log('\n📸 Testing Footer Detail...');
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${screenshotDir}/05-footer-detail.png`
    });

    const footerFounded = await page.locator('footer >> text=Founded 1995').isVisible();
    const footerCertifications = await page.locator('footer >> text=ISO 9001:2015').isVisible();

    console.log(`  Footer "Founded 1995": ${footerFounded ? '✅' : '❌'}`);
    console.log(`  Footer certifications: ${footerCertifications ? '✅' : '❌'}`);

    if (!footerFounded || !footerCertifications) {
      errors.push('Footer not rendering correctly');
    }

    // Test Contact Page
    console.log('\n📸 Testing Contact Page...');
    await page.goto(`${PROD_URL}/contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `${screenshotDir}/06-contact.png`,
      fullPage: true
    });

    const hasContactForm = await page.locator('input[type="email"]').isVisible();
    console.log(`  Contact form visible: ${hasContactForm ? '✅' : '❌'}`);

  } catch (error: any) {
    errors.push(`TEST ERROR: ${error.message}`);
  }

  await browser.close();

  // Print results
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 VISUAL TEST RESULTS');
  console.log('='.repeat(60));

  console.log(`\n📁 Screenshots saved to: ${screenshotDir}`);
  console.log(`\nScreenshots:`);
  const screenshots = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png'));
  screenshots.forEach(file => {
    console.log(`  - ${screenshotDir}/${file}`);
  });

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS FOUND (${errors.length}):`);
    errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
  }

  if (errors.length === 0) {
    console.log(`\n✅ ALL VISUAL TESTS PASSED`);
    console.log(`   - No JavaScript errors`);
    console.log(`   - All critical content visible`);
    console.log(`   - Footer rendering correctly`);
    process.exit(0);
  } else {
    console.log(`\n❌ VISUAL TESTS FAILED`);
    process.exit(1);
  }
}

visualTest().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
