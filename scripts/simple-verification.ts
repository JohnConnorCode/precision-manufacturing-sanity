import { chromium } from 'playwright';

async function verifyHomepage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('\n🔍 Loading homepage...\n');

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(5000);

  // Slow scroll
  console.log('📜 Scrolling slowly...');
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(200);
  }

  await page.waitForTimeout(5000);

  // Scroll back to top
  await page.evaluate('window.scrollTo(0, 0)');
  await page.waitForTimeout(2000);

  // Take screenshot
  console.log('📸 Taking screenshot...');
  await page.screenshot({ path: 'screenshots/homepage-final.png', fullPage: true });

  console.log('✅ Screenshot saved!');
  console.log('\nKeeping browser open for 30 seconds for inspection...');

  await page.waitForTimeout(30000);
  await browser.close();
}

verifyHomepage().catch(console.error);
