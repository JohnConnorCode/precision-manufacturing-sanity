import { chromium } from 'playwright';

async function takeProperScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  async function scrollAndCapture(url: string, filename: string) {
    const page = await context.newPage();
    console.log(`\n📸 Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });

    // Wait for page to be fully loaded
    await page.waitForTimeout(5000);

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

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000);

    // Take full page screenshot
    console.log(`  ✅ Taking screenshot...`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`  ✅ Saved to ${filename}`);

    await page.close();
  }

  await scrollAndCapture('https://precision-manufacturing.vercel.app/', 'screenshots/home-ref-full.png');
  await scrollAndCapture('http://localhost:3000/', 'screenshots/home-local-full.png');

  await browser.close();
  console.log('\n✅ Homepage screenshots complete');
}

takeProperScreenshots().catch(console.error);
