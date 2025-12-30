#!/usr/bin/env node
import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const pages = ['/', '/about', '/resources', '/services/5-axis-machining', '/industries/aerospace'];

  for (const path of pages) {
    await page.goto(`http://localhost:3000${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
      const heroSection = document.querySelector('[data-hero-section]');
      const header = document.querySelector('header');

      return {
        hasHeroSection: !!heroSection,
        heroBottom: heroSection ? heroSection.getBoundingClientRect().bottom : null,
        headerClasses: header ? header.className : null,
        isTransparent: header ? header.className.includes('bg-slate-950/20') : false,
        isSolid: header ? header.className.includes('bg-white') : false,
      };
    });

    console.log(`\n${path}:`);
    console.log(`  Hero section found: ${result.hasHeroSection}`);
    console.log(`  Hero bottom: ${result.heroBottom}px`);
    console.log(`  Header transparent: ${result.isTransparent}`);
    console.log(`  Header solid: ${result.isSolid}`);
  }

  await browser.close();
}

main().catch(console.error);
