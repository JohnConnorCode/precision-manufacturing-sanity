import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'home', url: '/' },
  { name: 'case-study', url: '/case-studies/energy-nuclear-components' },
  { name: 'services', url: '/services' },
  { name: 'industries', url: '/industries' },
];

const outputDir = 'e2e/screenshots';

async function run() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    colorScheme: 'light',
    viewport: { width: 1280, height: 720 }
  });

  let allPassed = true;

  for (const pageInfo of pages) {
    console.log(`\n📸 Testing ${pageInfo.name}...`);
    const page = await context.newPage();

    try {
      await page.goto(`http://localhost:3000${pageInfo.url}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3000);

      // Find dark sections
      const darkSections = await page.locator('.dark-section').all();
      console.log(`   Found ${darkSections.length} dark sections`);

      for (let i = 0; i < darkSections.length; i++) {
        const section = darkSections[i];
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Screenshot the section
        await section.screenshot({
          path: path.join(outputDir, `${pageInfo.name}-dark-section-${i + 1}.png`)
        });

        // Check text colors
        const textElements = await section.locator('p, span:not(.sr-only), h1, h2, h3, h4, h5, h6').all();

        for (let j = 0; j < Math.min(textElements.length, 10); j++) {
          const el = textElements[j];
          const isVisible = await el.isVisible();

          if (isVisible) {
            const text = await el.textContent();
            const color = await el.evaluate(el => window.getComputedStyle(el).color);
            const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

            if (match && text?.trim()) {
              const r = parseInt(match[1]);
              const g = parseInt(match[2]);
              const b = parseInt(match[3]);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

              const status = luminance > 0.4 ? '✅' : '❌';
              if (luminance <= 0.4) {
                allPassed = false;
                console.log(`   ${status} Text too dark: "${text.trim().slice(0, 50)}..." rgb(${r},${g},${b}) L=${luminance.toFixed(2)}`);
              }
            }
          }
        }
      }

      // Full page screenshot
      await page.screenshot({
        path: path.join(outputDir, `${pageInfo.name}-full-page.png`),
        fullPage: true
      });

      console.log(`   ✅ Screenshots saved for ${pageInfo.name}`);

    } catch (error) {
      console.error(`   ❌ Error on ${pageInfo.name}:`, error.message);
      allPassed = false;
    }

    await page.close();
  }

  await browser.close();

  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('✅ All dark sections have readable text!');
  } else {
    console.log('❌ Some text has low contrast on dark sections');
  }
  console.log('='.repeat(50));
  console.log(`\n📁 Screenshots saved to: ${outputDir}/`);

  process.exit(allPassed ? 0 : 1);
}

run().catch(console.error);
