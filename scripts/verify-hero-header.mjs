#!/usr/bin/env node
/**
 * Verify transparent header over hero sections
 * Takes screenshots at different scroll positions
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = join(__dirname, '../test-screenshots');

async function main() {
  // Ensure screenshot directory exists
  await mkdir(screenshotDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('Testing transparent header implementation...\n');

  // Test homepage
  console.log('1. Testing homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Screenshot at top (over hero - should be transparent)
  await page.screenshot({
    path: join(screenshotDir, 'header-over-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured header over hero (should be transparent with white text)');

  // Scroll down past hero
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);

  // Screenshot after scroll (should be solid)
  await page.screenshot({
    path: join(screenshotDir, 'header-after-scroll.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured header after scroll (should be solid white)');

  // Test services page
  console.log('\n2. Testing services page...');
  await page.goto('http://localhost:3000/services/5-axis-machining', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Screenshot at top
  await page.screenshot({
    path: join(screenshotDir, 'services-header-over-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured services page header over hero');

  // Test industries page
  console.log('\n3. Testing industries page...');
  await page.goto('http://localhost:3000/industries/aerospace', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Screenshot at top
  await page.screenshot({
    path: join(screenshotDir, 'industries-header-over-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured industries page header over hero');

  // Test a page without hero (contact)
  console.log('\n4. Testing page without hero (contact)...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Screenshot - should be solid header
  await page.screenshot({
    path: join(screenshotDir, 'contact-header-no-hero.png'),
    clip: { x: 0, y: 0, width: 1920, height: 300 }
  });
  console.log('   ✓ Captured contact page header (should be solid, no hero)');

  // Full page screenshots for reference
  console.log('\n5. Capturing full page references...');

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: join(screenshotDir, 'homepage-full.png'),
    fullPage: false
  });
  console.log('   ✓ Homepage viewport screenshot');

  await browser.close();

  console.log('\n✅ All screenshots captured successfully!');
  console.log(`   Screenshots saved to: ${screenshotDir}\n`);
}

main().catch(console.error);
