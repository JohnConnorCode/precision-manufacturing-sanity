import { chromium } from 'playwright';

async function checkErrors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const errors: string[] = [];
  const warnings: string[] = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      errors.push(text);
      console.log(`❌ ERROR: ${text}`);
    } else if (msg.type() === 'warning') {
      warnings.push(text);
      console.log(`⚠️  WARNING: ${text}`);
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
    console.log(`❌ PAGE ERROR: ${error.message}`);
  });

  console.log('\n🔍 Loading homepage and checking for console errors...\n');

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });

  // Wait a bit for hydration
  await page.waitForTimeout(5000);

  // Scroll to trigger Resources section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(3000);

  console.log(`\n=== Summary ===`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ No console errors or warnings!');
  }

  console.log('\nKeeping browser open for 20 seconds...');
  await page.waitForTimeout(20000);

  await browser.close();
}

checkErrors().catch(console.error);
