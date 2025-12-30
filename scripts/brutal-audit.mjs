#!/usr/bin/env node
/**
 * Brutal audit - find EVERY issue
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, '../test-screenshots/brutal');

const BASE_URL = 'http://localhost:3000';

async function main() {
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  console.log('🔥 BRUTAL AUDIT - Finding every flaw...\n');

  // Test 1: Initial page load - check for flash/FOUC
  console.log('1. Initial load timing (checking for flash)...');
  const context1 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page1 = await context1.newPage();

  // Screenshot immediately on load
  await page1.goto(BASE_URL, { waitUntil: 'commit' });
  await page1.screenshot({
    path: join(screenshotDir, '01-initial-load-immediate.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });

  await page1.waitForTimeout(100);
  await page1.screenshot({
    path: join(screenshotDir, '02-load-100ms.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });

  await page1.waitForTimeout(400);
  await page1.screenshot({
    path: join(screenshotDir, '03-load-500ms.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });
  console.log('   ✓ Captured load sequence');
  await context1.close();

  // Test 2: Dark mode
  console.log('\n2. Dark mode behavior...');
  const context2 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });
  const page2 = await context2.newPage();
  await page2.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page2.waitForTimeout(3000);
  await page2.screenshot({
    path: join(screenshotDir, '04-dark-mode-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 400 }
  });

  // Scroll past hero in dark mode
  await page2.evaluate(() => window.scrollTo(0, 1500));
  await page2.waitForTimeout(500);
  await page2.screenshot({
    path: join(screenshotDir, '05-dark-mode-scrolled.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });
  console.log('   ✓ Captured dark mode');
  await context2.close();

  // Test 3: Theme toggle visibility
  console.log('\n3. Theme toggle visibility over hero...');
  const context3 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page3 = await context3.newPage();
  await page3.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page3.waitForTimeout(3000);

  // Zoom into theme toggle area
  await page3.screenshot({
    path: join(screenshotDir, '06-theme-toggle-area.png'),
    clip: { x: 1000, y: 0, width: 300, height: 100 }
  });
  console.log('   ✓ Captured theme toggle');
  await context3.close();

  // Test 4: CTA button hover state in hero mode
  console.log('\n4. CTA button hover in hero mode...');
  const context4 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page4 = await context4.newPage();
  await page4.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page4.waitForTimeout(3000);

  const ctaBtn = page4.locator('button:has-text("REQUEST QUOTE")').first();
  await ctaBtn.hover();
  await page4.waitForTimeout(300);
  await page4.screenshot({
    path: join(screenshotDir, '07-cta-hover-hero.png'),
    clip: { x: 1000, y: 0, width: 400, height: 100 }
  });
  console.log('   ✓ Captured CTA hover');
  await context4.close();

  // Test 5: Logo text visibility/animation
  console.log('\n5. Logo text visibility...');
  const context5 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page5 = await context5.newPage();
  await page5.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page5.waitForTimeout(4000); // Wait for animation
  await page5.screenshot({
    path: join(screenshotDir, '08-logo-detail.png'),
    clip: { x: 150, y: 0, width: 400, height: 100 }
  });
  console.log('   ✓ Captured logo');
  await context5.close();

  // Test 6: Very small mobile (320px - iPhone SE)
  console.log('\n6. Very small mobile (320px)...');
  const context6 = await browser.newContext({
    viewport: { width: 320, height: 568 },
    deviceScaleFactor: 2,
  });
  const page6 = await context6.newPage();
  await page6.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page6.waitForTimeout(3000);
  await page6.screenshot({
    path: join(screenshotDir, '09-tiny-mobile.png'),
  });
  console.log('   ✓ Captured tiny mobile');
  await context6.close();

  // Test 7: Fast scroll (check for jank)
  console.log('\n7. Rapid scroll transition...');
  const context7 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page7 = await context7.newPage();
  await page7.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page7.waitForTimeout(3000);

  // Rapid scroll and capture mid-transition
  await page7.evaluate(() => window.scrollTo(0, 600));
  await page7.waitForTimeout(50);
  await page7.screenshot({
    path: join(screenshotDir, '10-mid-transition.png'),
    clip: { x: 0, y: 0, width: 1920, height: 200 }
  });
  console.log('   ✓ Captured mid-transition');
  await context7.close();

  // Test 8: Resources page (different hero?)
  console.log('\n8. Resources page...');
  const context8 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page8 = await context8.newPage();
  await page8.goto(`${BASE_URL}/resources`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page8.waitForTimeout(3000);
  await page8.screenshot({
    path: join(screenshotDir, '11-resources-page.png'),
  });
  console.log('   ✓ Captured resources page');
  await context8.close();

  // Test 9: About page
  console.log('\n9. About page...');
  const context9 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page9 = await context9.newPage();
  await page9.goto(`${BASE_URL}/about`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page9.waitForTimeout(3000);
  await page9.screenshot({
    path: join(screenshotDir, '12-about-page.png'),
  });
  console.log('   ✓ Captured about page');
  await context9.close();

  await browser.close();

  console.log('\n🔥 Brutal audit complete!');
  console.log(`   Screenshots: ${screenshotDir}\n`);
}

main().catch(console.error);
