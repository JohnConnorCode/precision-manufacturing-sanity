import { chromium } from 'playwright';

const pages = [
  { name: 'Homepage', local: 'http://localhost:3000/', ref: 'https://precision-manufacturing.vercel.app/' },
  { name: 'Services', local: 'http://localhost:3000/services', ref: 'https://precision-manufacturing.vercel.app/services' },
  { name: 'Industries', local: 'http://localhost:3000/industries', ref: 'https://precision-manufacturing.vercel.app/industries' },
  { name: 'Resources', local: 'http://localhost:3000/resources', ref: 'https://precision-manufacturing.vercel.app/resources' },
  { name: 'About', local: 'http://localhost:3000/about', ref: 'https://precision-manufacturing.vercel.app/about' },
  { name: 'Contact', local: 'http://localhost:3000/contact', ref: 'https://precision-manufacturing.vercel.app/contact' },
];

async function auditAllPages() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  console.log('\n=== SYSTEMATIC PAGE AUDIT ===\n');

  for (const page of pages) {
    console.log(`\n📄 ${page.name.toUpperCase()}`);
    console.log('─'.repeat(50));

    // Check local
    const localPage = await context.newPage();
    try {
      await localPage.goto(page.local, { waitUntil: 'networkidle', timeout: 30000 });
      await localPage.waitForTimeout(2000);

      const localData = await localPage.evaluate(() => {
        const sections = document.querySelectorAll('section').length;
        const text = document.body.textContent?.length || 0;
        const images = document.querySelectorAll('img').length;
        const hasError = document.body.textContent?.includes('Error') || document.body.textContent?.includes('404');
        return { sections, text, images, hasError };
      });

      console.log(`Local:  ${localData.hasError ? '❌ ERROR' : '✅'} ${localData.sections} sections, ${localData.text} chars, ${localData.images} images`);
    } catch (e) {
      console.log(`Local:  ❌ Failed to load - ${(e as Error).message.substring(0, 50)}`);
    }
    await localPage.close();

    // Check reference
    const refPage = await context.newPage();
    try {
      await refPage.goto(page.ref, { waitUntil: 'networkidle', timeout: 30000 });
      await refPage.waitForTimeout(2000);

      const refData = await refPage.evaluate(() => {
        const sections = document.querySelectorAll('section').length;
        const text = document.body.textContent?.length || 0;
        const images = document.querySelectorAll('img').length;
        const hasError = document.body.textContent?.includes('Error') || document.body.textContent?.includes('404');
        return { sections, text, images, hasError };
      });

      console.log(`Ref:    ${refData.hasError ? '❌ ERROR' : '✅'} ${refData.sections} sections, ${refData.text} chars, ${refData.images} images`);
    } catch (e) {
      console.log(`Ref:    ❌ Failed to load - ${(e as Error).message.substring(0, 50)}`);
    }
    await refPage.close();
  }

  await browser.close();
  console.log('\n' + '='.repeat(50));
  console.log('AUDIT COMPLETE');
  console.log('='.repeat(50) + '\n');
}

auditAllPages().catch(console.error);
