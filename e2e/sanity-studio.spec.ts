import { test, expect } from '@playwright/test';

test.describe('Sanity Studio', () => {
  test('should load the Sanity Studio', async ({ page }) => {
    await page.goto('/studio');

    // Wait for the Sanity Studio to load. This might involve waiting for a specific element.
    // For now, let's look for a common element like the Sanity logo or a specific text.
    await expect(page.locator('data-test-id=sanity-logo')).toBeVisible();
    // Alternatively, you could look for a specific piece of text that appears once the studio is loaded
    // await expect(page.getByText('Sanity Studio')).toBeVisible();
  });
});
