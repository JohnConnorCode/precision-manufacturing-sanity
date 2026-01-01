import { test, expect } from '@playwright/test';

test('Hero animations play on initial load', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const heroSection = page.locator('[data-hero-section]');
  await expect(heroSection).toBeVisible();

  const heroWords = heroSection.locator('.mb-4 span');
  const wordCount = await heroWords.count();

  // Wait for animations to complete
  await page.waitForTimeout(2000);

  // Verify all words are visible
  for (let i = 0; i < wordCount; i++) {
    const word = heroWords.nth(i);
    const opacity = await word.evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
  }

  // Verify tagline is visible
  const tagline = heroSection.locator('h1').first();
  const taglineOpacity = await tagline.evaluate(el => window.getComputedStyle(el).opacity);
  expect(parseFloat(taglineOpacity)).toBeGreaterThan(0.9);
});

test('Hero animations play on page refresh', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  // Refresh the page
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  const heroSection = page.locator('[data-hero-section]');
  const heroWords = heroSection.locator('.mb-4 span');
  const wordCount = await heroWords.count();

  for (let i = 0; i < wordCount; i++) {
    const word = heroWords.nth(i);
    const opacity = await word.evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity), `Word ${i + 1} should be visible after refresh`).toBeGreaterThan(0.9);
  }
});

test('Service page hero animates on load', async ({ page }) => {
  await page.goto('/services/5-axis-machining');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  const heroSection = page.locator('[data-hero-section]');
  await expect(heroSection).toBeVisible();

  const title = heroSection.locator('h1').first();
  const titleOpacity = await title.evaluate(el => window.getComputedStyle(el).opacity);
  expect(parseFloat(titleOpacity)).toBeGreaterThan(0.9);
});

test('Nav transparency works correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const header = page.locator('header').first();

  // Get initial header state at top
  const initialBg = await header.evaluate(el => window.getComputedStyle(el).backgroundColor);

  // Scroll down past hero
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);

  const scrolledBg = await header.evaluate(el => window.getComputedStyle(el).backgroundColor);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const backToTopBg = await header.evaluate(el => window.getComputedStyle(el).backgroundColor);

  console.log('Header backgrounds:', { initial: initialBg, scrolled: scrolledBg, backToTop: backToTopBg });

  // Background should change when scrolled vs at top
  expect(scrolledBg).not.toBe(initialBg);
});

test('Hero gradient text is visible', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  const heroSection = page.locator('[data-hero-section]');
  const heroWords = heroSection.locator('.mb-4 span');

  // Word 3 should have gradient (transparent text with background-clip)
  const word3 = heroWords.nth(2);
  if (await word3.count() > 0) {
    const styles = await word3.evaluate((el) => {
      const cs = window.getComputedStyle(el) as CSSStyleDeclaration & { webkitBackgroundClip?: string };
      return {
        color: cs.color,
        background: cs.background,
        backgroundImage: cs.backgroundImage,
        webkitBackgroundClip: cs.webkitBackgroundClip || '',
        backgroundClip: cs.backgroundClip,
      };
    });
    console.log('Word 3 gradient styles:', styles);

    // Should have a gradient background
    expect(styles.backgroundImage).toContain('gradient');
  }
});
