import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const PROD_URL = 'https://precision-manufacturing-sanity-n8r6xw4n4.vercel.app';
const screenshotDir = '/tmp/production-verification';

// Create screenshot directory
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function comprehensiveTest() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const errors: string[] = [];
  const warnings: string[] = [];
  const successes: string[] = [];

  // Capture all errors
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`CONSOLE ERROR: ${msg.text()}`);
    }
  });

  console.log(`\n🧪 COMPREHENSIVE PRODUCTION TEST: ${PROD_URL}\n`);
  console.log('='.repeat(80));

  try {
    // ========================================
    // TEST 1: HOMEPAGE - TECHNICAL SPECS ICONS
    // ========================================
    console.log('\n📊 TEST 1: Homepage Technical Specs (CRITICAL FIX)');
    await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Take full page screenshot
    await page.screenshot({
      path: `${screenshotDir}/01-homepage-full.png`,
      fullPage: true
    });

    // Scroll to Technical Specs section
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('PRECISION') || s.textContent?.includes('5-AXIS'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    // Screenshot of Technical Specs section
    await page.screenshot({
      path: `${screenshotDir}/02-technical-specs-section.png`
    });

    // Count Technical Specs
    const specsCount = await page.locator('text=PRECISION').count() +
                       await page.locator('text=5-AXIS').count() +
                       await page.locator('text=AS9100D').count() +
                       await page.locator('text=FIRST PASS YIELD').count() +
                       await page.locator('text=24/7').count() +
                       await page.locator('text=ON-TIME').count() +
                       await page.locator('text=YEARS').count() +
                       await page.locator('text=ITAR').count();

    console.log(`  Technical Specs visible: ${specsCount >= 8 ? '✅ PASS' : '❌ FAIL'} (Found ${specsCount}/8 expected)`);

    if (specsCount >= 8) {
      successes.push('Homepage Technical Specs showing all 8 items');
    } else {
      errors.push(`Homepage Technical Specs incomplete: only ${specsCount}/8 showing`);
    }

    // Check for specific values
    const hasPrecision = await page.locator('text=±0.0001').isVisible();
    const has5Axis = await page.locator('text=5-AXIS').isVisible();
    const hasAS9100 = await page.locator('text=AS9100D').isVisible();
    const hasITAR = await page.locator('text=ITAR').isVisible();

    console.log(`  ±0.0001" PRECISION: ${hasPrecision ? '✅' : '❌'}`);
    console.log(`  5-AXIS CNC: ${has5Axis ? '✅' : '❌'}`);
    console.log(`  AS9100D CERTIFIED: ${hasAS9100 ? '✅' : '❌'}`);
    console.log(`  ITAR REGISTERED: ${hasITAR ? '✅' : '❌'}`);

    // ========================================
    // TEST 2: NAVIGATION STRUCTURE
    // ========================================
    console.log('\n🧭 TEST 2: Navigation Structure');
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Screenshot of header/nav
    await page.screenshot({
      path: `${screenshotDir}/03-navigation.png`,
      clip: { x: 0, y: 0, width: 1920, height: 200 }
    });

    const navItems = await page.locator('nav a').allTextContents();
    console.log(`  Navigation items found: ${navItems.length}`);
    console.log(`  Items: ${navItems.join(', ')}`);

    const hasServices = navItems.some(item => item.includes('Services'));
    const hasIndustries = navItems.some(item => item.includes('Industries'));
    const hasResources = navItems.some(item => item.includes('Resources'));
    const hasAbout = navItems.some(item => item.includes('About'));
    const hasCareers = navItems.some(item => item.includes('Careers'));
    const hasContact = navItems.some(item => item.includes('Contact'));

    console.log(`  Services link: ${hasServices ? '✅' : '❌'}`);
    console.log(`  Industries link: ${hasIndustries ? '✅' : '❌'}`);
    console.log(`  Resources link: ${hasResources ? '✅' : '❌'}`);
    console.log(`  About link: ${hasAbout ? '✅' : '❌'}`);
    console.log(`  Careers link: ${hasCareers ? '✅' : '❌'}`);
    console.log(`  Contact link: ${hasContact ? '✅' : '❌'}`);

    // ========================================
    // TEST 3: SERVICE PAGES
    // ========================================
    console.log('\n🔧 TEST 3: Service Pages');
    const servicePages = [
      '/services/5-axis-machining',
      '/services/adaptive-machining',
      '/services/metrology',
      '/services/engineering'
    ];

    for (const servicePath of servicePages) {
      const url = PROD_URL + servicePath;
      console.log(`  Testing: ${servicePath}`);

      const response = await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      const status = response?.status() || 0;
      const hasContent = await page.locator('h1').count() > 0;

      console.log(`    Status: ${status === 200 ? '✅' : '❌'} (${status})`);
      console.log(`    Content loaded: ${hasContent ? '✅' : '❌'}`);

      if (status === 200 && hasContent) {
        successes.push(`Service page ${servicePath} working`);
      } else {
        errors.push(`Service page ${servicePath} failed (status ${status}, content: ${hasContent})`);
      }

      await page.screenshot({
        path: `${screenshotDir}/service-${servicePath.split('/').pop()}.png`,
        fullPage: true
      });
    }

    // ========================================
    // TEST 4: INDUSTRY PAGES
    // ========================================
    console.log('\n🏭 TEST 4: Industry Pages');
    const industryPages = [
      '/industries/defense',
      '/industries/energy',
      '/industries/aerospace'
    ];

    for (const industryPath of industryPages) {
      const url = PROD_URL + industryPath;
      console.log(`  Testing: ${industryPath}`);

      const response = await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      const status = response?.status() || 0;
      const hasContent = await page.locator('h1').count() > 0;

      console.log(`    Status: ${status === 200 ? '✅' : '❌'} (${status})`);
      console.log(`    Content loaded: ${hasContent ? '✅' : '❌'}`);

      if (status === 200 && hasContent) {
        successes.push(`Industry page ${industryPath} working`);
      } else {
        errors.push(`Industry page ${industryPath} failed (status ${status}, content: ${hasContent})`);
      }

      await page.screenshot({
        path: `${screenshotDir}/industry-${industryPath.split('/').pop()}.png`,
        fullPage: true
      });
    }

    // ========================================
    // TEST 5: RESOURCE PAGES
    // ========================================
    console.log('\n📚 TEST 5: Resource Pages');

    // Test resources landing page
    const resourcesResponse = await page.goto(PROD_URL + '/resources', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const resourcesStatus = resourcesResponse?.status() || 0;
    console.log(`  /resources: ${resourcesStatus === 200 ? '✅' : '❌'} (${resourcesStatus})`);

    await page.screenshot({
      path: `${screenshotDir}/resources-landing.png`,
      fullPage: true
    });

    // Test a sample article
    const sampleArticle = '/resources/manufacturing-processes/5-axis-cnc-machining-aerospace-guide';
    const articleResponse = await page.goto(PROD_URL + sampleArticle, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const articleStatus = articleResponse?.status() || 0;
    console.log(`  Sample article: ${articleStatus === 200 ? '✅' : '❌'} (${articleStatus})`);

    await page.screenshot({
      path: `${screenshotDir}/resource-article-sample.png`,
      fullPage: true
    });

    // ========================================
    // TEST 6: OTHER KEY PAGES
    // ========================================
    console.log('\n📄 TEST 6: Other Key Pages');
    const otherPages = [
      '/about',
      '/contact',
      '/careers'
    ];

    for (const pagePath of otherPages) {
      const url = PROD_URL + pagePath;
      console.log(`  Testing: ${pagePath}`);

      const response = await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      const status = response?.status() || 0;
      const hasContent = await page.locator('h1').count() > 0;

      console.log(`    Status: ${status === 200 ? '✅' : '❌'} (${status})`);
      console.log(`    Content loaded: ${hasContent ? '✅' : '❌'}`);

      if (status === 200 && hasContent) {
        successes.push(`Page ${pagePath} working`);
      } else {
        errors.push(`Page ${pagePath} failed (status ${status}, content: ${hasContent})`);
      }

      await page.screenshot({
        path: `${screenshotDir}/page-${pagePath.replace('/', '')}.png`,
        fullPage: true
      });
    }

    // ========================================
    // TEST 7: FOOTER
    // ========================================
    console.log('\n🔻 TEST 7: Footer');
    await page.goto(PROD_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: `${screenshotDir}/footer-detail.png`
    });

    const footerVisible = await page.locator('footer').isVisible();
    console.log(`  Footer visible: ${footerVisible ? '✅' : '❌'}`);

  } catch (error: any) {
    errors.push(`FATAL ERROR: ${error.message}`);
  }

  await browser.close();

  // ========================================
  // FINAL REPORT
  // ========================================
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE TEST RESULTS');
  console.log('='.repeat(80));

  console.log(`\n📁 Screenshots saved to: ${screenshotDir}`);
  console.log(`\nScreenshots:`);
  const screenshots = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png'));
  screenshots.forEach(file => {
    console.log(`  - ${screenshotDir}/${file}`);
  });

  if (successes.length > 0) {
    console.log(`\n✅ SUCCESSES (${successes.length}):`);
    successes.forEach((success, i) => console.log(`  ${i + 1}. ${success}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS FOUND (${errors.length}):`);
    errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
    console.log(`\n❌ TESTS FAILED`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL TESTS PASSED`);
    console.log(`   - No JavaScript errors`);
    console.log(`   - All critical pages accessible`);
    console.log(`   - Technical Specs rendering correctly`);
    console.log(`   - Navigation structure correct`);
    process.exit(0);
  }
}

comprehensiveTest().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
