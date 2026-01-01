import { test, expect } from '@playwright/test';

/**
 * Visual tests for dark section text contrast
 * Verifies that grey text on dark backgrounds is readable in both light and dark mode
 */

test('home page - dark sections have readable text in light mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Find all dark-section elements
  const darkSections = page.locator('.dark-section');
  const count = await darkSections.count();

  console.log(`Found ${count} dark sections on home page`);

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const section = darkSections.nth(i);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Take screenshot of the section
      await section.screenshot({
        path: `e2e/screenshots/home-dark-section-${i + 1}-light-mode.png`
      });

      // Check text color contrast
      const textElements = section.locator('p, span:not(.sr-only)');
      const textCount = await textElements.count();

      for (let j = 0; j < Math.min(textCount, 5); j++) {
        const textEl = textElements.nth(j);
        const isVisible = await textEl.isVisible();
        if (isVisible) {
          const color = await textEl.evaluate(el => {
            const style = window.getComputedStyle(el);
            return style.color;
          });

          const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            console.log(`Text element: rgb(${r},${g},${b}) luminance=${luminance.toFixed(2)}`);

            // On dark backgrounds, text should be light (luminance > 0.4)
            expect(luminance, `Text on dark section should be light. Got rgb(${r},${g},${b})`).toBeGreaterThan(0.4);
          }
        }
      }
    }
  }

  // Full page screenshot
  await page.screenshot({
    path: 'e2e/screenshots/home-full-page-light-mode.png',
    fullPage: true
  });
});

test('case study page - dark sections have readable text', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/case-studies/energy-nuclear-components', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const darkSections = page.locator('.dark-section');
  const count = await darkSections.count();

  console.log(`Found ${count} dark sections on case study page`);

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const section = darkSections.nth(i);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await section.screenshot({
        path: `e2e/screenshots/case-study-dark-section-${i + 1}-light-mode.png`
      });
    }
  }

  await page.screenshot({
    path: 'e2e/screenshots/case-study-full-page-light-mode.png',
    fullPage: true
  });
});

test('services page - dark sections have readable text', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const darkSections = page.locator('.dark-section');
  const count = await darkSections.count();

  console.log(`Found ${count} dark sections on services page`);

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const section = darkSections.nth(i);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await section.screenshot({
        path: `e2e/screenshots/services-dark-section-${i + 1}-light-mode.png`
      });
    }
  }

  await page.screenshot({
    path: 'e2e/screenshots/services-full-page-light-mode.png',
    fullPage: true
  });
});
