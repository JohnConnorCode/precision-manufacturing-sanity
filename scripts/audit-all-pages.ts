import { chromium } from 'playwright';

async function auditPages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  const pages = [
    { name: 'home', path: '' },
    { name: 'about', path: 'about' },
    { name: 'services', path: 'services' },
    { name: 'contact', path: 'contact' },
    { name: 'resources', path: 'resources' },
  ];

  for (const page of pages) {
    console.log(`\n📸 Comparing ${page.name}...`);

    // Reference
    const refPage = await context.newPage();
    await refPage.goto(`https://precision-manufacturing.vercel.app/${page.path}`, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await refPage.waitForTimeout(2000);
    await refPage.screenshot({
      path: `screenshots/${page.name}-ref.png`,
      fullPage: true
    });
    await refPage.close();
    console.log(`  ✓ Reference saved`);

    // Local
    const localPage = await context.newPage();
    await localPage.goto(`http://localhost:3000/${page.path}`, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await localPage.waitForTimeout(2000);
    await localPage.screenshot({
      path: `screenshots/${page.name}-local.png`,
      fullPage: true
    });
    await localPage.close();
    console.log(`  ✓ Local saved`);
  }

  await browser.close();
  console.log('\n✅ All page screenshots saved to screenshots/');
}

auditPages().catch(console.error);
