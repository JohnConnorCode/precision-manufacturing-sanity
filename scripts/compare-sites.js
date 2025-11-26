const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const pages = [
    '/industries/aerospace',
    '/industries/defense',
    '/industries/energy'
  ];

  const outputDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const pagePath of pages) {
    const pageName = pagePath.replace(/\//g, '-').slice(1);

    // Capture reference site
    console.log(`Capturing reference: ${pagePath}`);
    const refPage = await context.newPage();
    await refPage.goto(`https://precision-manufacturing.vercel.app${pagePath}`, { waitUntil: 'networkidle' });
    await refPage.waitForTimeout(2000); // Wait for animations
    await refPage.screenshot({
      path: path.join(outputDir, `ref-${pageName}-full.png`),
      fullPage: true
    });

    // Capture expertise section specifically
    const refExpertise = await refPage.$('section:has(h2:text-matches("Expertise", "i"))');
    if (refExpertise) {
      await refExpertise.screenshot({
        path: path.join(outputDir, `ref-${pageName}-expertise.png`)
      });
    }
    await refPage.close();

    // Capture local site
    console.log(`Capturing local: ${pagePath}`);
    const localPage = await context.newPage();
    try {
      await localPage.goto(`http://localhost:3000${pagePath}`, { waitUntil: 'networkidle' });
      await localPage.waitForTimeout(2000);
      await localPage.screenshot({
        path: path.join(outputDir, `local-${pageName}-full.png`),
        fullPage: true
      });

      // Capture expertise section specifically
      const localExpertise = await localPage.$('section:has(h2:text-matches("Expertise", "i"))');
      if (localExpertise) {
        await localExpertise.screenshot({
          path: path.join(outputDir, `local-${pageName}-expertise.png`)
        });
      }
    } catch (e) {
      console.log(`Error capturing local ${pagePath}: ${e.message}`);
    }
    await localPage.close();
  }

  await browser.close();
  console.log(`\nScreenshots saved to: ${outputDir}`);
  console.log('Compare the images manually or use an image diff tool.');
}

captureScreenshots().catch(console.error);
