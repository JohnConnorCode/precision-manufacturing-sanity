import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // Create screenshots directory
  const screenshotsDir = join(process.cwd(), 'screenshots');
  try {
    mkdirSync(screenshotsDir, { recursive: true });
  } catch (e) { /* directory exists */ }

  const sections = [
    { name: 'hero', selector: 'section:has-text("PRECISION MANUFACTURING SERVICES")' },
    { name: 'services', selector: 'section:has-text("What We Offer")' },
    { name: 'technicalspecs', selector: 'section:has-text("Precision By The Numbers")' },
    { name: 'industries', selector: 'section:has-text("INDUSTRY LEADERS")' },
    { name: 'imageshowcase', selector: 'section:has-text("Precision")' },
    { name: 'resources', selector: 'section:has-text("Master Precision Manufacturing")' },
    { name: 'stats', selector: 'section:has-text("Operational Excellence")' },
    { name: 'cta', selector: 'section:has-text("Start Your Precision Manufacturing Project")' },
  ];

  console.log('Taking screenshots of reference site...');
  const referencePage = await context.newPage();
  await referencePage.goto('https://precision-manufacturing.vercel.app/', { waitUntil: 'networkidle' });
  await referencePage.waitForTimeout(2000); // Wait for animations

  for (const section of sections) {
    try {
      await referencePage.locator(section.selector).first().screenshot({
        path: join(screenshotsDir, `reference-${section.name}.png`)
      });
      console.log(`✓ Reference ${section.name}`);
    } catch (e) {
      console.log(`✗ Could not find reference ${section.name}`);
    }
  }

  console.log('\nTaking screenshots of localhost...');
  const localhostPage = await context.newPage();
  await localhostPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await localhostPage.waitForTimeout(2000); // Wait for animations

  for (const section of sections) {
    try {
      await localhostPage.locator(section.selector).first().screenshot({
        path: join(screenshotsDir, `localhost-${section.name}.png`)
      });
      console.log(`✓ Localhost ${section.name}`);
    } catch (e) {
      console.log(`✗ Could not find localhost ${section.name}`);
    }
  }

  // Take full page screenshots
  await referencePage.screenshot({ path: join(screenshotsDir, 'reference-fullpage.png'), fullPage: true });
  await localhostPage.screenshot({ path: join(screenshotsDir, 'localhost-fullpage.png'), fullPage: true });

  console.log(`\n✅ Screenshots saved to ${screenshotsDir}/`);
  console.log('Please review the screenshots to verify visual parity.');

  await browser.close();
}

takeScreenshots().catch(console.error);
