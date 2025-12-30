#!/usr/bin/env node
/**
 * Verify transparent header on live production site
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, '../test-screenshots/production');

const LIVE_URL = 'https://precision-manufacturing-sanity.vercel.app';

async function main() {
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Testing transparent header on PRODUCTION...\n');
  console.log(`URL: ${LIVE_URL}\n`);

  // Test homepage
  console.log('1. Testing homepage...');
  await page.goto(LIVE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Screenshot at top (over hero)
  await page.screenshot({
    path: join(screenshotDir, 'prod-header-over-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured header over hero');

  // Scroll down past hero
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(800);

  // Screenshot after scroll
  await page.screenshot({
    path: join(screenshotDir, 'prod-header-after-scroll.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured header after scroll');

  // Full viewport
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(screenshotDir, 'prod-homepage-full.png'),
    fullPage: false
  });
  console.log('   ✓ Captured full homepage viewport');

  // Test services page
  console.log('\n2. Testing services page...');
  await page.goto(`${LIVE_URL}/services/5-axis-machining`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: join(screenshotDir, 'prod-services-header.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured services page header');

  // Test industries page
  console.log('\n3. Testing industries page...');
  await page.goto(`${LIVE_URL}/industries/aerospace`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: join(screenshotDir, 'prod-industries-header.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured industries page header');

  await browser.close();

  console.log('\n✅ Production verification complete!');
  console.log(`   Screenshots: ${screenshotDir}\n`);
}

main().catch(console.error);
