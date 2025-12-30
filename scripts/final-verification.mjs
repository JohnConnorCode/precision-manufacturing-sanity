#!/usr/bin/env node
/**
 * Final production verification
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, '../test-screenshots/final');

const LIVE_URL = 'https://precision-manufacturing-sanity.vercel.app';

async function main() {
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('🎯 FINAL PRODUCTION VERIFICATION\n');
  console.log(`URL: ${LIVE_URL}\n`);

  // Test 1: Homepage with hover
  console.log('1. Homepage - hover on Services...');
  await page.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  const servicesBtn = page.locator('button:has-text("Services")').first();
  await servicesBtn.hover();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: join(screenshotDir, 'final-hover-state.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });
  console.log('   ✓ Captured hover state');

  // Test 2: Open dropdown
  console.log('\n2. Open dropdown menu...');
  await servicesBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(screenshotDir, 'final-dropdown-open.png'),
    clip: { x: 0, y: 0, width: 1920, height: 500 }
  });
  console.log('   ✓ Captured dropdown');

  // Test 3: Full homepage
  console.log('\n3. Full homepage viewport...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  await page.screenshot({
    path: join(screenshotDir, 'final-homepage.png'),
  });
  console.log('   ✓ Captured homepage');

  // Test 4: After scroll
  console.log('\n4. After scrolling past hero...');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: join(screenshotDir, 'final-after-scroll.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured scrolled state');

  // Test 5: Mobile
  console.log('\n5. Mobile view...');
  await context.close();

  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({
    path: join(screenshotDir, 'final-mobile.png'),
  });
  console.log('   ✓ Captured mobile');

  await browser.close();

  console.log('\n✅ Final verification complete!');
  console.log(`   Screenshots: ${screenshotDir}\n`);
}

main().catch(console.error);
