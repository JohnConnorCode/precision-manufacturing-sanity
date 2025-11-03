import { chromium } from 'playwright';

const PROD_URL = 'https://precision-manufacturing-sanity-bugll4gkb.vercel.app';

async function verifyNoErrors() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleErrors: string[] = [];
  const jsErrors: Error[] = [];

  // Listen for console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Listen for page errors
  page.on('pageerror', (error) => {
    jsErrors.push(error);
  });

  console.log(`\n🧪 Testing ${PROD_URL}\n`);

  await page.goto(PROD_URL);
  await page.waitForLoadState('networkidle');
  await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for React hydration

  console.log('✅ Page loaded\n');

  if (jsErrors.length > 0) {
    console.log('❌ JavaScript Errors Found:');
    jsErrors.forEach((err, i) => {
      console.log(`\n${i + 1}. ${err.name}: ${err.message}`);
      console.log(`   Stack: ${err.stack?.split('\n')[0]}`);
    });
  } else {
    console.log('✅ No JavaScript errors');
  }

  console.log('\n');

  if (consoleErrors.length > 0) {
    // Filter out known warnings
    const criticalErrors = consoleErrors.filter(msg =>
      !msg.includes('empty string') &&
      !msg.includes('ReactDOM.preload')
    );

    if (criticalErrors.length > 0) {
      console.log('❌ Console Errors Found:');
      criticalErrors.forEach((err, i) => {
        console.log(`${i + 1}. ${err}`);
      });
    } else {
      console.log('✅ No critical console errors (only expected image warnings)');
    }
  } else {
    console.log('✅ No console errors');
  }

  console.log('\n');

  // Check if key content is visible
  const badges = await page.locator('text=ISO 9001').count();
  console.log(`📋 Certification badges found: ${badges > 0 ? '✅' : '❌'}`);

  const footer = await page.locator('footer').isVisible();
  console.log(`📋 Footer visible: ${footer ? '✅' : '❌'}`);

  if (footer) {
    const foundedText = await page.locator('footer >> text=Founded 1995').isVisible();
    console.log(`📋 Footer "Founded 1995" visible: ${foundedText ? '✅' : '❌'}`);
  }

  await browser.close();

  console.log('\n');

  if (jsErrors.length > 0) {
    console.log('❌ VERIFICATION FAILED - JavaScript errors detected');
    process.exit(1);
  } else {
    console.log('✅ VERIFICATION PASSED - No JavaScript errors');
    process.exit(0);
  }
}

verifyNoErrors().catch(console.error);
