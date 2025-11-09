import { chromium } from 'playwright';

async function compareIndustries() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  async function scrollAndCapture(url: string, filename: string) {
    const page = await context.newPage();
    console.log(`Taking screenshot of ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Scroll to trigger all animations
    await page.evaluate(async () => {
      const distance = 100;
      const delay = 100;
      while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
        window.scrollBy(0, distance);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: filename, fullPage: true });
    console.log(`✓ Screenshot saved to ${filename}`);
  }

  await scrollAndCapture('https://precision-manufacturing.vercel.app/industries', 'screenshots/industries-ref.png');
  await scrollAndCapture('http://localhost:3000/industries', 'screenshots/industries-local.png');
  await browser.close();

  console.log('\n✅ Industries page comparison screenshots saved');
}

compareIndustries().catch(console.error);
