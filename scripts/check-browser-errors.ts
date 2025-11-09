import { chromium } from 'playwright';

async function checkBrowserErrors() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  // Capture console messages
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      console.log(`[${type.toUpperCase()}] ${msg.text()}`);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  console.log('\n📋 Loading http://localhost:3000/...\n');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });

  await page.waitForTimeout(10000);

  // Check what sections are visible
  const sections = await page.evaluate(() => {
    const sectionTexts = [
      'PRECISION SERVICES',
      'Precision By The Numbers',
      'INDUSTRY LEADERS',
      'Master Precision Manufacturing',
    ];

    return sectionTexts.map(text => {
      const elements = Array.from(document.querySelectorAll('*')).filter(el =>
        el.textContent?.includes(text)
      );
      return {
        text,
        found: elements.length > 0,
        count: elements.length,
        visible: elements.some(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
      };
    });
  });

  console.log('\n=== Section Detection ===');
  sections.forEach(s => {
    console.log(`${s.text}: ${s.found ? '✓' : '✗'} (${s.count} elements, visible: ${s.visible})`);
  });

  console.log('\n✅ Check complete. Browser will stay open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
}

checkBrowserErrors().catch(console.error);
