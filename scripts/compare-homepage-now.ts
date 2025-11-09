import { chromium } from 'playwright';

async function compareHomepage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  async function scrollAndCapture(url: string, filename: string) {
    const page = await context.newPage();
    console.log(`\n📸 Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });

    // Wait for page to be fully loaded and hydrated
    await page.waitForTimeout(10000);

    // Slowly scroll through entire page to trigger all animations and lazy loading
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 150;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    // Wait for Resources section to be visible (it's near the bottom)
    try {
      await page.waitForSelector('text=Master Precision Manufacturing', { timeout: 10000 });
      console.log(`  ✓ Resources section loaded`);
    } catch (e) {
      console.log(`  ⚠ Resources section not found`);
    }

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(3000);

    // Take full page screenshot
    console.log(`  ✅ Taking screenshot...`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`  ✅ Saved to ${filename}`);

    await page.close();
  }

  await scrollAndCapture('https://precision-manufacturing.vercel.app/', 'screenshots/home-ref-current.png');
  await scrollAndCapture('http://localhost:3000/', 'screenshots/home-local-current.png');

  await browser.close();
  console.log('\n✅ Homepage comparison complete');
  console.log('\nPlease review:');
  console.log('  - screenshots/home-ref-current.png (reference)');
  console.log('  - screenshots/home-local-current.png (local)');
}

compareHomepage().catch(console.error);
