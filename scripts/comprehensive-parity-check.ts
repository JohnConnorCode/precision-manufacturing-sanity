import { chromium } from 'playwright';

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Resources', path: '/resources' },
];

async function comprehensiveParityCheck() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  console.log('\n=== COMPREHENSIVE PARITY CHECK ===\n');
  console.log('Comparing localhost with https://precision-manufacturing.vercel.app/\n');

  for (const page of pages) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📄 ${page.name.toUpperCase()}`);
    console.log('='.repeat(60));

    try {
      // Load both pages side by side
      const refPage = await context.newPage();
      const localPage = await context.newPage();

      console.log('Loading reference site...');
      await refPage.goto(`https://precision-manufacturing.vercel.app${page.path}`, {
        waitUntil: 'networkidle',
        timeout: 60000
      });
      await refPage.waitForTimeout(3000);

      console.log('Loading local site...');
      await localPage.goto(`http://localhost:3000${page.path}`, {
        waitUntil: 'networkidle',
        timeout: 60000
      });
      await localPage.waitForTimeout(3000);

      // Scroll both pages to load all content
      console.log('Scrolling to load all content...');
      for (let i = 0; i < 10; i++) {
        await refPage.mouse.wheel(0, 500);
        await localPage.mouse.wheel(0, 500);
        await refPage.waitForTimeout(200);
        await localPage.waitForTimeout(200);
      }

      await refPage.waitForTimeout(2000);
      await localPage.waitForTimeout(2000);

      // Scroll back to top
      await refPage.evaluate(() => window.scrollTo(0, 0));
      await localPage.evaluate(() => window.scrollTo(0, 0));
      await refPage.waitForTimeout(1000);
      await localPage.waitForTimeout(1000);

      // Analyze content
      const refData = await refPage.evaluate(() => {
        const h1s = Array.from(document.querySelectorAll('h1')).map(el => el.textContent?.trim());
        const h2s = Array.from(document.querySelectorAll('h2')).map(el => el.textContent?.trim());
        const sections = document.querySelectorAll('section').length;
        const images = document.querySelectorAll('img').length;
        const buttons = Array.from(document.querySelectorAll('button, a[class*="button"]')).map(el => el.textContent?.trim());

        return { h1s, h2s, sections, images, buttons };
      });

      const localData = await localPage.evaluate(() => {
        const h1s = Array.from(document.querySelectorAll('h1')).map(el => el.textContent?.trim());
        const h2s = Array.from(document.querySelectorAll('h2')).map(el => el.textContent?.trim());
        const sections = document.querySelectorAll('section').length;
        const images = document.querySelectorAll('img').length;
        const buttons = Array.from(document.querySelectorAll('button, a[class*="button"]')).map(el => el.textContent?.trim());

        return { h1s, h2s, sections, images, buttons };
      });

      // Compare
      console.log('\n📊 COMPARISON:');
      console.log(`Sections:  Ref=${refData.sections}  Local=${localData.sections}  ${refData.sections === localData.sections ? '✅' : '❌'}`);
      console.log(`Images:    Ref=${refData.images}   Local=${localData.images}   ${refData.images === localData.images ? '✅' : '❌'}`);
      console.log(`H1 Count:  Ref=${refData.h1s.length}   Local=${localData.h1s.length}   ${refData.h1s.length === localData.h1s.length ? '✅' : '❌'}`);
      console.log(`H2 Count:  Ref=${refData.h2s.length}   Local=${localData.h2s.length}   ${refData.h2s.length === localData.h2s.length ? '✅' : '❌'}`);

      console.log('\n📝 H1 Headings:');
      console.log('Reference:', refData.h1s);
      console.log('Local:    ', localData.h1s);

      console.log('\n📝 H2 Headings (first 5):');
      console.log('Reference:', refData.h2s.slice(0, 5));
      console.log('Local:    ', localData.h2s.slice(0, 5));

      // Take screenshots
      const refScreenshot = `screenshots/${page.name.toLowerCase()}-ref-parity.png`;
      const localScreenshot = `screenshots/${page.name.toLowerCase()}-local-parity.png`;

      console.log('\n📸 Taking screenshots...');
      await refPage.screenshot({ path: refScreenshot, fullPage: true });
      await localPage.screenshot({ path: localScreenshot, fullPage: true });
      console.log(`✅ Saved: ${refScreenshot}`);
      console.log(`✅ Saved: ${localScreenshot}`);

      await refPage.close();
      await localPage.close();

    } catch (error) {
      console.log(`❌ Error checking ${page.name}:`, (error as Error).message);
    }
  }

  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log('PARITY CHECK COMPLETE');
  console.log('='.repeat(60) + '\n');
  console.log('Review screenshots in screenshots/ directory');
}

comprehensiveParityCheck().catch(console.error);
