import { chromium } from 'playwright';
import * as fs from 'fs';

const PROD_URL = 'https://precision-manufacturing-sanity-cyczlx7be.vercel.app';
const screenshotDir = '/tmp/homepage-debug';

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function debugHomepage() {
  console.log('🔍 DEBUGGING HOMEPAGE RENDERING\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Collect console messages
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Collect errors
  const errors: string[] = [];
  page.on('pageerror', err => {
    errors.push(`ERROR: ${err.message}`);
  });

  await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Take screenshot of viewport (what user sees initially)
  await page.screenshot({
    path: `${screenshotDir}/01-viewport-initial.png`
  });

  // Get page dimensions
  const dimensions = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
    bodyHeight: document.body.scrollHeight
  }));

  console.log('📏 Page Dimensions:');
  console.log(`   Scroll Height: ${dimensions.scrollHeight}px`);
  console.log(`   Client Height: ${dimensions.clientHeight}px`);
  console.log(`   Body Height: ${dimensions.bodyHeight}px\n`);

  // Check all sections
  const sections = await page.evaluate(() => {
    const sectionElements = Array.from(document.querySelectorAll('section'));
    return sectionElements.map((section, index) => {
      const rect = section.getBoundingClientRect();
      const styles = window.getComputedStyle(section);
      return {
        index,
        tag: section.tagName,
        class: section.className,
        top: rect.top,
        height: rect.height,
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        position: styles.position,
        textContent: section.textContent?.substring(0, 100) || ''
      };
    });
  });

  console.log('📦 Sections Found:', sections.length);
  sections.forEach((section) => {
    console.log(`\n   [${section.index}] ${section.tag}`);
    console.log(`      Classes: ${section.class}`);
    console.log(`      Position: top=${section.top}px, height=${section.height}px`);
    console.log(`      Display: ${section.display}, Visibility: ${section.visibility}, Opacity: ${section.opacity}`);
    console.log(`      Text preview: ${section.textContent.substring(0, 60)}...`);
  });

  // Scroll to each major section and take screenshot
  const scrollPositions = [
    { name: 'hero', y: 0 },
    { name: 'services', y: 800 },
    { name: 'technical-specs', y: 1600 },
    { name: 'industries', y: 2400 },
    { name: 'bottom', y: dimensions.scrollHeight - 1000 }
  ];

  for (const pos of scrollPositions) {
    await page.evaluate((y) => window.scrollTo(0, y), pos.y);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${screenshotDir}/02-scroll-${pos.name}.png`
    });
  }

  console.log('\n💬 Console Messages:', consoleMessages.length);
  consoleMessages.forEach(msg => console.log(`   ${msg}`));

  console.log('\n❌ Errors:', errors.length);
  errors.forEach(err => console.log(`   ${err}`));

  console.log(`\n📁 Screenshots saved to: ${screenshotDir}`);

  await browser.close();
}

debugHomepage().catch(console.error);
