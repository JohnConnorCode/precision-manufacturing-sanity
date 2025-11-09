import { chromium } from 'playwright';

async function takeScrollScreenshot() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for initial load
  await page.waitForTimeout(3000);

  // Scroll down slowly to trigger animations
  await page.evaluate(async () => {
    const distance = 100;
    const delay = 100;
    while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
      window.scrollBy(0, distance);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  });

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/localhost-scrolled.png', fullPage: true });
  console.log('✓ Screenshot saved after scrolling');

  await browser.close();
}

takeScrollScreenshot().catch(console.error);
