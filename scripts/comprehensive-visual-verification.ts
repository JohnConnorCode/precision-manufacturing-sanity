import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const PROD_URL = 'https://precision-manufacturing-sanity-7qkns0azj.vercel.app';
const SCREENSHOT_DIR = '/tmp/production-visual-verification';

async function comprehensiveVisualVerification() {
  // Create screenshot directory
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const errors: string[] = [];
  const warnings: string[] = [];
  const successes: string[] = [];

  // Capture all console messages
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`CONSOLE ERROR: ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      warnings.push(`CONSOLE WARNING: ${msg.text()}`);
    }
  });

  console.log(`\n🔍 COMPREHENSIVE VISUAL VERIFICATION: ${PROD_URL}\n`);
  console.log('='.repeat(80));

  try {
    // ========================================================================
    // HOMEPAGE VERIFICATION
    // ========================================================================
    console.log('\n📄 Loading homepage...');
    await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Full page screenshot
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '01-homepage-full.png'),
      fullPage: true
    });
    console.log('✅ Full page screenshot saved');
    successes.push('Homepage loaded successfully');

    // ========================================================================
    // SECTION 1: HERO
    // ========================================================================
    console.log('\n📊 Verifying Hero Section...');
    const heroSection = page.locator('section').first();
    await heroSection.screenshot({ path: path.join(SCREENSHOT_DIR, '02-hero.png') });

    const heroExists = await heroSection.count() > 0;
    if (heroExists) {
      console.log('  ✅ Hero section found');
      successes.push('Hero section exists');
    } else {
      console.log('  ❌ Hero section missing');
      errors.push('Hero section not found');
    }

    // ========================================================================
    // SECTION 2: SERVICES
    // ========================================================================
    console.log('\n📊 Verifying Services Section...');
    const servicesSection = page.locator('section').filter({ hasText: 'SERVICES' }).first();
    await servicesSection.screenshot({ path: path.join(SCREENSHOT_DIR, '03-services.png') });

    const servicesExists = await servicesSection.count() > 0;
    if (servicesExists) {
      console.log('  ✅ Services section found');
      successes.push('Services section exists');

      // Check for service cards
      const serviceCards = await page.locator('text=5-Axis Machining').count();
      if (serviceCards > 0) {
        console.log('  ✅ Service cards rendering');
        successes.push('Service cards present');
      }
    } else {
      console.log('  ❌ Services section missing');
      errors.push('Services section not found');
    }

    // ========================================================================
    // SECTION 3: TECHNICAL SPECS (CRITICAL - DARK THEME)
    // ========================================================================
    console.log('\n🎨 Verifying TechnicalSpecs Section & Dark Theme...');

    // Scroll to TechnicalSpecs
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('±0.0001'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    const techSpecsSection = page.locator('section').filter({ hasText: 'Precision By The' }).first();
    await techSpecsSection.screenshot({ path: path.join(SCREENSHOT_DIR, '04-technical-specs.png') });

    const techSpecsExists = await techSpecsSection.count() > 0;
    if (techSpecsExists) {
      console.log('  ✅ TechnicalSpecs section found');
      successes.push('TechnicalSpecs section exists');

      // Check background color
      const bgColor = await techSpecsSection.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          backgroundImage: styles.backgroundImage
        };
      });

      console.log(`  Background color: ${bgColor.backgroundColor}`);
      console.log(`  Background image: ${bgColor.backgroundImage}`);

      // Check if it's dark (slate-900/950)
      const isDark =
        bgColor.backgroundColor.includes('15, 23, 42') ||  // slate-900
        bgColor.backgroundColor.includes('2, 6, 23') ||     // slate-950
        bgColor.backgroundImage.includes('gradient');

      if (isDark) {
        console.log('  ✅ Dark theme applied');
        successes.push('TechnicalSpecs has dark theme');
      } else {
        console.log('  ❌ Dark theme NOT applied (showing light background)');
        errors.push('TechnicalSpecs dark theme missing');
      }

      // Check for metric cards
      const metricCards = await page.locator('text=±0.0001"').count();
      console.log(`  Found ${metricCards} metric cards`);
      if (metricCards >= 1) {
        successes.push('TechnicalSpecs metric cards present');
      }
    } else {
      console.log('  ❌ TechnicalSpecs section missing');
      errors.push('TechnicalSpecs section not found');
    }

    // ========================================================================
    // SECTION 4: INDUSTRIES
    // ========================================================================
    console.log('\n📊 Verifying Industries Section...');

    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('Industries') || s.textContent?.includes('Aerospace'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    const industriesSection = page.locator('section').filter({ hasText: 'Industries' }).first();
    const industriesSectionAlt = page.locator('section').filter({ hasText: 'Aerospace' }).first();

    const industriesExists = await industriesSection.count() > 0 || await industriesSectionAlt.count() > 0;
    if (industriesExists) {
      await (await industriesSection.count() > 0 ? industriesSection : industriesSectionAlt)
        .screenshot({ path: path.join(SCREENSHOT_DIR, '05-industries.png') });
      console.log('  ✅ Industries section found');
      successes.push('Industries section exists');
    } else {
      console.log('  ❌ Industries section NOT FOUND');
      errors.push('Industries section missing');
    }

    // ========================================================================
    // SECTION 5: IMAGE SHOWCASE
    // ========================================================================
    console.log('\n📊 Verifying ImageShowcase Section...');

    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('Precision') && s.textContent?.includes('AS9100D'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    const showcaseSection = page.locator('section').filter({ hasText: 'Precision' }).first();
    await showcaseSection.screenshot({ path: path.join(SCREENSHOT_DIR, '06-image-showcase.png') });

    const showcaseExists = await showcaseSection.count() > 0;
    if (showcaseExists) {
      console.log('  ✅ ImageShowcase section found');
      successes.push('ImageShowcase section exists');

      // Check for Stats Grid
      const statsGridExists = await page.locator('text=AS9100D').count() > 0 &&
                              await page.locator('text=ITAR').count() > 0;
      if (statsGridExists) {
        console.log('  ✅ Stats Grid present (AS9100D, ITAR badges)');
        successes.push('ImageShowcase Stats Grid exists');
      } else {
        console.log('  ❌ Stats Grid missing');
        errors.push('ImageShowcase Stats Grid missing');
      }
    } else {
      console.log('  ❌ ImageShowcase section missing');
      errors.push('ImageShowcase section not found');
    }

    // ========================================================================
    // SECTION 6: RESOURCES (CRITICAL - DARK THEME)
    // ========================================================================
    console.log('\n🎨 Verifying Resources Section & Dark Theme...');

    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('Master') || s.textContent?.includes('Resources'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    const resourcesSection = page.locator('section').filter({ hasText: 'Master' }).first();
    await resourcesSection.screenshot({ path: path.join(SCREENSHOT_DIR, '07-resources.png') });

    const resourcesExists = await resourcesSection.count() > 0;
    if (resourcesExists) {
      console.log('  ✅ Resources section found');
      successes.push('Resources section exists');

      // Check background color
      const bgColor = await resourcesSection.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          backgroundImage: styles.backgroundImage
        };
      });

      console.log(`  Background color: ${bgColor.backgroundColor}`);
      console.log(`  Background image: ${bgColor.backgroundImage}`);

      const isDark =
        bgColor.backgroundColor.includes('15, 23, 42') ||
        bgColor.backgroundColor.includes('2, 6, 23') ||
        bgColor.backgroundImage.includes('gradient');

      if (isDark) {
        console.log('  ✅ Dark theme applied');
        successes.push('Resources has dark theme');
      } else {
        console.log('  ❌ Dark theme NOT applied');
        errors.push('Resources dark theme missing');
      }

      // Check for Benefits Grid
      const benefitsGridExists = await page.locator('text=Structured Learning').count() > 0;
      if (benefitsGridExists) {
        console.log('  ✅ Benefits Grid present');
        successes.push('Resources Benefits Grid exists');
      } else {
        console.log('  ❌ Benefits Grid missing');
        errors.push('Resources Benefits Grid missing');
      }
    } else {
      console.log('  ❌ Resources section missing');
      errors.push('Resources section not found');
    }

    // ========================================================================
    // SECTION 7: STATS
    // ========================================================================
    console.log('\n📊 Verifying Stats Section...');
    const statsSection = page.locator('section').filter({ hasText: '30' }).first();

    const statsExists = await statsSection.count() > 0;
    if (statsExists) {
      await statsSection.screenshot({ path: path.join(SCREENSHOT_DIR, '08-stats.png') });
      console.log('  ✅ Stats section found');
      successes.push('Stats section exists');
    } else {
      console.log('  ⚠️  Stats section not clearly identified');
      warnings.push('Stats section may be missing');
    }

    // ========================================================================
    // SECTION 8: CTA
    // ========================================================================
    console.log('\n📊 Verifying CTA Section...');

    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('Ready') || s.textContent?.includes('Get Started'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    const ctaSection = page.locator('section').filter({ hasText: 'Ready' }).first();
    const ctaSectionAlt = page.locator('section').filter({ hasText: 'Get Started' }).first();

    const ctaExists = await ctaSection.count() > 0 || await ctaSectionAlt.count() > 0;
    if (ctaExists) {
      await (await ctaSection.count() > 0 ? ctaSection : ctaSectionAlt)
        .screenshot({ path: path.join(SCREENSHOT_DIR, '09-cta.png') });
      console.log('  ✅ CTA section found');
      successes.push('CTA section exists');
    } else {
      console.log('  ❌ CTA section NOT FOUND');
      errors.push('CTA section missing');
    }

    // ========================================================================
    // SANITY STUDIO VERIFICATION
    // ========================================================================
    console.log('\n🎛️  Verifying Sanity Studio...');
    const studioResponse = await page.goto(`${PROD_URL}/studio`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(5000);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-sanity-studio.png') });

    if (studioResponse?.status() === 200) {
      const hasStudio = await page.locator('text=Sanity Studio').count() > 0 ||
                        await page.locator('[data-ui="Pane"]').count() > 0 ||
                        await page.locator('text=Content').count() > 0;
      if (hasStudio) {
        console.log('  ✅ Sanity Studio loaded successfully');
        successes.push('Sanity Studio accessible and rendering');
      } else {
        console.log('  ⚠️  Studio loaded but UI not fully detected');
        warnings.push('Sanity Studio may have rendering issues');
      }
    } else {
      console.log(`  ❌ Studio returned ${studioResponse?.status()}`);
      errors.push('Sanity Studio not accessible');
    }

  } catch (error: any) {
    errors.push(`FATAL ERROR: ${error.message}`);
  }

  await browser.close();

  // ========================================================================
  // FINAL REPORT
  // ========================================================================
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE VISUAL VERIFICATION RESULTS');
  console.log('='.repeat(80));
  console.log(`\n📁 Screenshots saved to: ${SCREENSHOT_DIR}`);

  if (successes.length > 0) {
    console.log(`\n✅ SUCCESSES (${successes.length}):`);
    successes.forEach((success, i) => console.log(`  ${i + 1}. ${success}`));
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):`);
    errors.forEach((err, i) => console.log(`  ${i + 1}. ${err}`));
    console.log(`\n❌ VERIFICATION FAILED`);
    console.log(`\nScreenshots available at: ${SCREENSHOT_DIR}`);
    console.log('Review screenshots to diagnose issues.');
    process.exit(1);
  } else {
    console.log(`\n✅ VERIFICATION PASSED`);
    console.log(`   - All sections present and rendering`);
    console.log(`   - Dark themes applied correctly`);
    console.log(`   - No JavaScript errors`);
    console.log(`   - Sanity Studio accessible`);
    console.log(`\nScreenshots available at: ${SCREENSHOT_DIR}`);
    process.exit(0);
  }
}

comprehensiveVisualVerification().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
