import { chromium } from 'playwright';

async function comparePages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // Reference site
  console.log('Taking reference screenshot...');
  const refPage = await context.newPage();
  await refPage.goto('https://precision-manufacturing.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 });
  await refPage.waitForTimeout(5000);
  await refPage.screenshot({ path: 'screenshots/reference-full.png', fullPage: true });
  console.log('✓ Reference screenshot saved');

  // Localhost
  console.log('Taking localhost screenshot...');
  const localPage = await context.newPage();

  // Capture console errors
  const consoleErrors: string[] = [];
  localPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await localPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
  await localPage.waitForTimeout(5000);
  await localPage.screenshot({ path: 'screenshots/localhost-full.png', fullPage: true });
  console.log('✓ Localhost screenshot saved');

  if (consoleErrors.length > 0) {
    console.log('\n⚠️  Console errors detected:');
    consoleErrors.forEach(err => console.log('  -', err));
  }

  await browser.close();
  console.log('\n✅ Screenshots saved to screenshots/ directory');
}

comparePages().catch(console.error);
