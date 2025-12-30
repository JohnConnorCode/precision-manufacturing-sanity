#!/usr/bin/env node
/**
 * Critical review - check for edge cases and issues
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, '../test-screenshots/critical');

const BASE_URL = 'http://localhost:3000';

async function main() {
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  console.log('🔍 CRITICAL REVIEW - Looking for issues...\n');

  // Test 1: Mobile view
  console.log('1. Mobile viewport (375px)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({
    path: join(screenshotDir, 'mobile-hero.png'),
  });
  console.log('   ✓ Captured mobile view');
  await mobileContext.close();

  // Test 2: Tablet view
  console.log('\n2. Tablet viewport (768px)...');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await tabletPage.waitForTimeout(3000);
  await tabletPage.screenshot({
    path: join(screenshotDir, 'tablet-hero.png'),
  });
  console.log('   ✓ Captured tablet view');
  await tabletContext.close();

  // Test 3: Dropdown menu while over hero
  console.log('\n3. Dropdown menu over hero...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Click Services dropdown
  await page.click('button:has-text("Services")');
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(screenshotDir, 'dropdown-over-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 600 }
  });
  console.log('   ✓ Captured dropdown over hero');

  // Test 4: Partial scroll (mid-transition)
  console.log('\n4. Mid-scroll transition...');
  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // Scroll to where hero is partially visible
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: join(screenshotDir, 'mid-scroll.png'),
    clip: { x: 0, y: 0, width: 1920, height: 400 }
  });
  console.log('   ✓ Captured mid-scroll state');

  // Test 5: Page without hero (contact)
  console.log('\n5. Page without hero...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: join(screenshotDir, 'no-hero-page.png'),
    clip: { x: 0, y: 0, width: 1920, height: 400 }
  });
  console.log('   ✓ Captured page without hero');

  // Test 6: Hover state on nav items over hero
  console.log('\n6. Hover states over hero...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Hover over Services button
  const servicesBtn = page.locator('button:has-text("Services")').first();
  await servicesBtn.hover();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: join(screenshotDir, 'hover-state-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });
  console.log('   ✓ Captured hover state');

  // Test 7: Industries page hero
  console.log('\n7. Industries page hero...');
  await page.goto(`${BASE_URL}/industries/aerospace`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: join(screenshotDir, 'industries-full.png'),
  });
  console.log('   ✓ Captured industries page');

  // Test 8: Services page hero
  console.log('\n8. Services page hero...');
  await page.goto(`${BASE_URL}/services/5-axis-machining`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: join(screenshotDir, 'services-full.png'),
  });
  console.log('   ✓ Captured services page');

  await browser.close();

  console.log('\n✅ Critical review complete!');
  console.log(`   Screenshots: ${screenshotDir}\n`);
}

main().catch(console.error);
