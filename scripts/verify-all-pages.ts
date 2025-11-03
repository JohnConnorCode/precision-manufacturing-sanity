import { chromium } from 'playwright';

const PROD_URL = 'https://precision-manufacturing-sanity-bugll4gkb.vercel.app';

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/services/5-axis-machining', name: '5-Axis Service' },
  { path: '/industries', name: 'Industries' },
  { path: '/industries/aerospace', name: 'Aerospace' },
  { path: '/resources', name: 'Resources' },
  { path: '/contact', name: 'Contact' },
  { path: '/careers', name: 'Careers' },
];

async function verifyAllPages() {
  const browser = await chromium.launch();
  const results: any[] = [];

  for (const pageInfo of pages) {
    const page = await browser.newPage();
    const jsErrors: Error[] = [];
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      jsErrors.push(error);
    });

    try {
      await page.goto(`${PROD_URL}${pageInfo.path}`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      await new Promise(resolve => setTimeout(resolve, 2000));

      const criticalErrors = consoleErrors.filter(msg =>
        !msg.includes('empty string') &&
        !msg.includes('ReactDOM.preload')
      );

      results.push({
        name: pageInfo.name,
        path: pageInfo.path,
        jsErrors: jsErrors.length,
        consoleErrors: criticalErrors.length,
        status: jsErrors.length === 0 && criticalErrors.length === 0 ? '✅' : '❌',
        errors: jsErrors.map(e => e.message),
      });
    } catch (error: any) {
      results.push({
        name: pageInfo.name,
        path: pageInfo.path,
        status: '❌',
        errors: [error.message],
      });
    }

    await page.close();
  }

  await browser.close();

  console.log('\n📊 Production Verification Results\n');
  console.log(`URL: ${PROD_URL}\n`);

  let allPassed = true;
  for (const result of results) {
    console.log(`${result.status} ${result.name} (${result.path})`);
    if (result.jsErrors && result.jsErrors > 0) {
      console.log(`   ❌ ${result.jsErrors} JavaScript errors`);
      result.errors?.forEach((err: string) => console.log(`      - ${err}`));
      allPassed = false;
    }
    if (result.consoleErrors && result.consoleErrors > 0) {
      console.log(`   ❌ ${result.consoleErrors} console errors`);
      allPassed = false;
    }
  }

  console.log('\n');

  if (allPassed) {
    console.log('✅ ALL PAGES VERIFIED - No JavaScript errors detected\n');
    process.exit(0);
  } else {
    console.log('❌ VERIFICATION FAILED - JavaScript errors detected\n');
    process.exit(1);
  }
}

verifyAllPages().catch(console.error);
