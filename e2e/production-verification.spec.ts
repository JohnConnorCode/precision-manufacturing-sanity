import { test, expect } from '@playwright/test';

const PROD_URL = 'https://precision-manufacturing-sanity-bugll4gkb.vercel.app';

test.describe('Production Site Verification', () => {
  // Capture console errors
  let consoleErrors: string[] = [];
  let jsErrors: Error[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    jsErrors = [];

    // Listen for console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Listen for page errors
    page.on('pageerror', (error) => {
      jsErrors.push(error);
    });
  });

  test('Homepage - No JavaScript Errors', async ({ page }) => {
    await page.goto(PROD_URL);

    // Wait for page to be fully loaded and hydrated
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for React hydration

    // Check for certification badges
    await expect(page.locator('text=ISO 9001')).toBeVisible();
    await expect(page.locator('text=AS9100D')).toBeVisible();
    await expect(page.locator('text=ITAR')).toBeVisible();

    // Check for footer (where the company.description error was)
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('text=Founded 1995')).toBeVisible();
    await expect(footer.locator('text=ISO 9001:2015')).toBeVisible();

    // Verify no JavaScript errors
    expect(jsErrors, `JavaScript errors found: ${jsErrors.map(e => e.message).join(', ')}`).toHaveLength(0);

    // Verify no critical console errors (filter out known warnings)
    const criticalErrors = consoleErrors.filter(msg =>
      !msg.includes('empty string') && // Known Next.js image warnings
      !msg.includes('ReactDOM.preload') // Known React preload warnings
    );
    expect(criticalErrors, `Console errors found: ${criticalErrors.join(', ')}`).toHaveLength(0);
  });

  test('Services Page - No Errors', async ({ page }) => {
    await page.goto(`${PROD_URL}/services/5-axis-machining`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify content loaded
    await expect(page.locator('text=5-Axis')).toBeVisible();
    await expect(page.locator('text=aerospace')).toBeVisible();

    // Check footer still works
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify no JavaScript errors
    expect(jsErrors, `JavaScript errors found: ${jsErrors.map(e => e.message).join(', ')}`).toHaveLength(0);
  });

  test('About Page - Team Members Visible, No Errors', async ({ page }) => {
    await page.goto(`${PROD_URL}/about`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify team members
    await expect(page.locator('text=John Smith')).toBeVisible();
    await expect(page.locator('text=Sarah Johnson')).toBeVisible();

    // Verify no JavaScript errors
    expect(jsErrors, `JavaScript errors found: ${jsErrors.map(e => e.message).join(', ')}`).toHaveLength(0);
  });

  test('Industries Page - No Errors', async ({ page }) => {
    await page.goto(`${PROD_URL}/industries/aerospace`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify content
    await expect(page.locator('text=aerospace')).toBeVisible();

    // Check footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify no JavaScript errors
    expect(jsErrors, `JavaScript errors found: ${jsErrors.map(e => e.message).join(', ')}`).toHaveLength(0);
  });

  test('Resources Page - No Errors', async ({ page }) => {
    await page.goto(`${PROD_URL}/resources`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify content
    await expect(page.locator('text=Resources').first()).toBeVisible();

    // Verify no JavaScript errors
    expect(jsErrors, `JavaScript errors found: ${jsErrors.map(e => e.message).join(', ')}`).toHaveLength(0);
  });

  test('Contact Page - No Errors', async ({ page }) => {
    await page.goto(`${PROD_URL}/contact`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify form exists
    await expect(page.locator('input[type="email"]')).toBeVisible();

    // Verify no JavaScript errors
    expect(jsErrors, `JavaScript errors found: ${jsErrors.map(e => e.message).join(', ')}`).toHaveLength(0);
  });

  test('Footer Rendering on All Pages - No company.description Error', async ({ page }) => {
    const pages = [
      '/',
      '/about',
      '/services',
      '/industries',
      '/resources',
      '/contact',
      '/careers'
    ];

    for (const path of pages) {
      await page.goto(`${PROD_URL}${path}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Verify footer renders
      const footer = page.locator('footer');
      await expect(footer, `Footer not visible on ${path}`).toBeVisible();

      // Check for the specific error we fixed
      const hasCompanyError = jsErrors.some(e =>
        e.message.includes('company') && e.message.includes('description')
      );
      expect(hasCompanyError, `company.description error found on ${path}`).toBe(false);

      // Reset error arrays for next page
      consoleErrors = [];
      jsErrors = [];

      // Re-attach listeners
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (error) => {
        jsErrors.push(error);
      });
    }
  });
});
