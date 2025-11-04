import { test, expect } from '@playwright/test'

// Pages to validate visually. Keep list focused and high-signal.
const PAGES: { path: string; name: string }[] = [
  // Core list pages
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/industries', name: 'industries' },
  { path: '/resources', name: 'resources' },

  // Service details
  { path: '/services/5-axis-machining', name: 'service-5-axis' },
  { path: '/services/adaptive-machining', name: 'service-adaptive' },
  { path: '/services/metrology', name: 'service-metrology' },
  { path: '/services/engineering', name: 'service-engineering' },

  // Industry details
  { path: '/industries/aerospace', name: 'industry-aerospace' },
  { path: '/industries/defense', name: 'industry-defense' },
  { path: '/industries/energy', name: 'industry-energy' },

  // Company pages
  { path: '/about', name: 'about' },
  { path: '/careers', name: 'careers' },
  { path: '/contact', name: 'contact' },
]

test.describe('Visual regression', () => {
  test.beforeEach(async ({ page }) => {
    // Stabilize animations/transitions for consistent screenshots
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; caret-color: transparent !important; }' })
  })

  for (const p of PAGES) {
    test(`page: ${p.name}`, async ({ page }) => {
      await page.goto(p.path, { waitUntil: 'networkidle' })
      // Allow fonts/images to settle a moment
      await page.waitForTimeout(500)

      // Mask known dynamic regions (e.g., background slider if present)
      const masks = [] as any[]
      const bgSlider = page.locator('.bg-background-slider')
      if (await bgSlider.count()) masks.push(bgSlider)

      await expect(page).toHaveScreenshot(`${p.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
        timeout: 30000,
        mask: masks,
      })
    })
  }
})
