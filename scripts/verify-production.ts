import { chromium } from 'playwright';

const PROD_URL = 'https://precision-manufacturing-sanity-7qkns0azj.vercel.app';

async function verifyProduction() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const errors: string[] = [];
  const warnings: string[] = [];
  const successes: string[] = [];

  // Capture console errors
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`CONSOLE ERROR: ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      warnings.push(`CONSOLE WARNING: ${msg.text()}`);
    }
  });

  console.log(`\n🔍 VERIFYING PRODUCTION: ${PROD_URL}\n`);
  console.log('='.repeat(80));

  try {
    // Load homepage
    console.log('\n📄 Loading homepage...');
    await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    console.log('✅ Homepage loaded');

    // Check for all sections
    console.log('\n📊 Checking homepage sections...');

    const sections = [
      { name: 'Hero', selector: 'section:has(h1)' },
      { name: 'Services', selector: 'section:has-text("SERVICES")' },
      { name: 'TechnicalSpecs', selector: 'section:has-text("±0.0001")' },
      { name: 'Industries', selector: 'section:has-text("Industries")' },
      { name: 'ImageShowcase', selector: 'section:has-text("Precision")' },
      { name: 'Resources', selector: 'section:has-text("Master")' },
      { name: 'CTA', selector: 'section:has-text("Ready")' }
    ];

    for (const section of sections) {
      const count = await page.locator(section.selector).count();
      if (count > 0) {
        console.log(`  ✅ ${section.name}: Found`);
        successes.push(`${section.name} section exists`);
      } else {
        console.log(`  ❌ ${section.name}: NOT FOUND`);
        errors.push(`${section.name} section missing`);
      }
    }

    // Check TechnicalSpecs dark theme
    console.log('\n🎨 Checking TechnicalSpecs dark theme...');
    const techSpecsSection = page.locator('section').filter({ hasText: '±0.0001' }).first();
    const bgColor = await techSpecsSection.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    console.log(`  Background color: ${bgColor}`);
    if (bgColor.includes('15, 23, 42') || bgColor.includes('2, 6, 23')) {
      console.log('  ✅ Dark theme detected (slate-900/950)');
      successes.push('TechnicalSpecs has dark theme');
    } else {
      console.log('  ⚠️  Not using dark theme');
      warnings.push('TechnicalSpecs may not have dark theme');
    }

    // Check Resources dark theme
    console.log('\n🎨 Checking Resources dark theme...');
    const resourcesSection = page.locator('section').filter({ hasText: 'Master' }).first();
    const resBgColor = await resourcesSection.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    console.log(`  Background color: ${resBgColor}`);
    if (resBgColor.includes('15, 23, 42') || resBgColor.includes('2, 6, 23')) {
      console.log('  ✅ Dark theme detected');
      successes.push('Resources has dark theme');
    } else {
      console.log('  ⚠️  Not using dark theme');
      warnings.push('Resources may not have dark theme');
    }

    // Check ImageShowcase Stats Grid
    console.log('\n📊 Checking ImageShowcase Stats Grid...');
    await page.evaluate(() => {
      const section = Array.from(document.querySelectorAll('section'))
        .find(s => s.textContent?.includes('Precision') && s.textContent?.includes('AS9100D'));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(2000);

    const statsFound = await page.locator('text=AS9100D').count() > 0 &&
                       await page.locator('text=ITAR').count() > 0;
    if (statsFound) {
      console.log('  ✅ Stats Grid found (AS9100D, ITAR badges)');
      successes.push('ImageShowcase Stats Grid exists');
    } else {
      console.log('  ❌ Stats Grid NOT FOUND');
      errors.push('ImageShowcase Stats Grid missing');
    }

    // Check Resources Benefits Grid
    console.log('\n📚 Checking Resources Benefits Grid...');
    const benefitsFound = await page.locator('text=Structured Learning').count() > 0;
    if (benefitsFound) {
      console.log('  ✅ Benefits Grid found');
      successes.push('Resources Benefits Grid exists');
    } else {
      console.log('  ❌ Benefits Grid NOT FOUND');
      errors.push('Resources Benefits Grid missing');
    }

    // Check Sanity Studio accessibility
    console.log('\n🎛️  Checking Sanity Studio...');
    const studioResponse = await page.goto(`${PROD_URL}/studio`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    if (studioResponse?.status() === 200) {
      const hasStudio = await page.locator('text=Sanity Studio').count() > 0 ||
                        await page.locator('[data-ui="Pane"]').count() > 0;
      if (hasStudio) {
        console.log('  ✅ Sanity Studio accessible');
        successes.push('Sanity Studio accessible at /studio');
      } else {
        console.log('  ⚠️  Studio loaded but UI not detected');
        warnings.push('Sanity Studio may not be fully loaded');
      }
    } else {
      console.log(`  ❌ Studio returned ${studioResponse?.status()}`);
      errors.push('Sanity Studio not accessible');
    }

  } catch (error: any) {
    errors.push(`FATAL ERROR: ${error.message}`);
  }

  await browser.close();

  // Final Report
  console.log('\n' + '='.repeat(80));
  console.log('📊 VERIFICATION RESULTS');
  console.log('='.repeat(80));

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
    process.exit(1);
  } else {
    console.log(`\n✅ VERIFICATION PASSED`);
    console.log(`   - All sections present`);
    console.log(`   - No JavaScript errors`);
    console.log(`   - Sanity Studio accessible`);
    process.exit(0);
  }
}

verifyProduction().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
