import { chromium } from 'playwright';

async function takeScreenshot() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('Taking localhost screenshot...');
  const localPage = await context.newPage();
  await localPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
  await localPage.waitForTimeout(5000); // Wait for animations and hydration
  await localPage.screenshot({ path: 'screenshots/localhost-simple.png', fullPage: true });
  console.log('✓ Localhost screenshot saved');

  await browser.close();
  console.log('\n✅ Screenshot saved to screenshots/localhost-simple.png');
}

takeScreenshot().catch(console.error);
