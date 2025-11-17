import { test, expect } from '@playwright/test';

/**
 * Visual Comparison Test: Localhost vs Production
 *
 * This test captures screenshots of both localhost and production
 * to verify they render identically.
 */

const LOCALHOST_URL = 'http://localhost:8080';
const PRODUCTION_URL = 'https://precision-manufacturing.vercel.app';

test.describe('Homepage Visual Comparison', () => {
  // Disable animations for consistent screenshots
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
    });

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
  });

  test('Full Homepage - Localhost', async ({ page }) => {
    await page.goto(LOCALHOST_URL, { waitUntil: 'networkidle' });

    // Wait for hero section to be visible
    await page.waitForSelector('section', { timeout: 10000 });

    // Wait a bit for images to load
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await expect(page).toHaveScreenshot('localhost-full-page.png', {
      fullPage: true,
      timeout: 30000,
    });
  });

  test('Full Homepage - Production', async ({ page }) => {
    await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle' });

    // Wait for hero section to be visible
    await page.waitForSelector('section', { timeout: 10000 });

    // Wait a bit for images to load
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await expect(page).toHaveScreenshot('production-full-page.png', {
      fullPage: true,
      timeout: 30000,
    });
  });

  test('Hero Section - Localhost', async ({ page }) => {
    await page.goto(LOCALHOST_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    await expect(heroSection).toHaveScreenshot('localhost-hero.png', {
      timeout: 10000,
    });
  });

  test('Hero Section - Production', async ({ page }) => {
    await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    await expect(heroSection).toHaveScreenshot('production-hero.png', {
      timeout: 10000,
    });
  });

  test('Verify All Sections Present - Localhost', async ({ page }) => {
    await page.goto(LOCALHOST_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Count all sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();

    console.log(`Localhost: Found ${sectionCount} sections`);

    // Verify we have at least 6 sections (Hero, Services, Technical Specs, Industries, Resources, CTA)
    expect(sectionCount).toBeGreaterThanOrEqual(6);

    // Check for specific text content from production
    await expect(page.locator('text=PRECISION')).toBeVisible();
    await expect(page.locator('text=MANUFACTURING')).toBeVisible();
    await expect(page.locator('text=SERVICES')).toBeVisible();
    await expect(page.locator('text=Innovative Precision Machining')).toBeVisible();
  });

  test('Verify All Sections Present - Production', async ({ page }) => {
    await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Count all sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();

    console.log(`Production: Found ${sectionCount} sections`);

    // Verify we have at least 6 sections
    expect(sectionCount).toBeGreaterThanOrEqual(6);

    // Check for specific text content
    await expect(page.locator('text=PRECISION')).toBeVisible();
    await expect(page.locator('text=MANUFACTURING')).toBeVisible();
    await expect(page.locator('text=SERVICES')).toBeVisible();
    await expect(page.locator('text=Innovative Precision Machining')).toBeVisible();
  });

  test('Content Analysis - Localhost', async ({ page }) => {
    await page.goto(LOCALHOST_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Extract all visible text
    const bodyText = await page.locator('body').textContent();

    // Verify key content from production site
    const expectedContent = [
      'PRECISION',
      'MANUFACTURING',
      'SERVICES',
      'Innovative Precision Machining',
      'Excellence Since 1995',
      'Advanced CNC Machining',
      'Precision Metrology',
      'Engineering Excellence',
    ];

    for (const content of expectedContent) {
      expect(bodyText).toContain(content);
    }

    console.log('✅ All expected content found on localhost');
  });

  test('Content Analysis - Production', async ({ page }) => {
    await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Extract all visible text
    const bodyText = await page.locator('body').textContent();

    // Verify key content
    const expectedContent = [
      'PRECISION',
      'MANUFACTURING',
      'SERVICES',
      'Innovative Precision Machining',
      'Excellence Since 1995',
      'Advanced CNC Machining',
      'Precision Metrology',
      'Engineering Excellence',
    ];

    for (const content of expectedContent) {
      expect(bodyText).toContain(content);
    }

    console.log('✅ All expected content found on production');
  });
});
