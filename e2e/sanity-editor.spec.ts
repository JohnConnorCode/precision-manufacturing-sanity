import { test, expect } from '@playwright/test';

test.describe('Sanity Studio Editor Settings', () => {
  test('Editor loads for a service document', async ({ page }) => {
    // TODO: Implement login to Sanity Studio
    // For now, we'll assume we're already logged in or bypass login for testing purposes.

    await page.goto('/studio/desk/service;5-axis-machining'); // Example service document

    // Wait for the studio to load and the document editor to be visible
    await page.waitForSelector('[data-testid="document-pane-views-menu-button"]', { timeout: 30000 });

    // Verify that the document title input is visible
    await expect(page.locator('input[data-testid="string-input"]').first()).toBeVisible();
    await expect(page.locator('input[data-testid="string-input"]').first()).toHaveAttribute('placeholder', 'Title');

    // Verify that the short description textarea is visible
    await expect(page.locator('textarea[data-testid="text-input"]').first()).toBeVisible();
    await expect(page.locator('textarea[data-testid="text-input"]').first()).toHaveAttribute('placeholder', 'Short Description');

    // Add more assertions here to verify other editor settings
  });
});
