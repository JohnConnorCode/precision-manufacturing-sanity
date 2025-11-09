import { chromium } from 'playwright';

async function inspectDOM() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('\n🔍 Loading page and inspecting Resources section DOM...\n');

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Check if Resources component exists in DOM
  const resourcesSection = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const resourcesSection = sections.find(s =>
      s.textContent?.includes('Master Precision Manufacturing') ||
      s.textContent?.includes('Technical Resources')
    );

    if (resourcesSection) {
      const styles = window.getComputedStyle(resourcesSection);
      return {
        exists: true,
        tagName: resourcesSection.tagName,
        className: resourcesSection.className,
        opacity: styles.opacity,
        display: styles.display,
        visibility: styles.visibility,
        height: styles.height,
        position: styles.position,
        textContent: resourcesSection.textContent?.substring(0, 200),
        innerHTML: resourcesSection.innerHTML.substring(0, 500)
      };
    }

    return { exists: false };
  });

  console.log('=== Resources Section DOM Inspection ===');
  console.log(JSON.stringify(resourcesSection, null, 2));

  // Check if the component rendered at all
  const hasResourcesText = await page.evaluate(() => {
    return {
      masterPrecision: document.body.textContent?.includes('Master Precision Manufacturing'),
      cmmInspection: document.body.textContent?.includes('CMM Inspection'),
      technicalResources: document.body.textContent?.includes('Technical Resources')
    };
  });

  console.log('\n=== Text Content Check ===');
  console.log(JSON.stringify(hasResourcesText, null, 2));

  await browser.close();
}

inspectDOM().catch(console.error);
