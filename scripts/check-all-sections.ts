import { chromium } from 'playwright';

async function checkSections() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('\n=== Checking All Homepage Sections ===\n');

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  const sections = await page.evaluate(() => {
    const allSections = Array.from(document.querySelectorAll('section'));
    return allSections.map((section, index) => {
      const text = section.textContent?.substring(0, 100).replace(/\s+/g, ' ').trim();
      const styles = window.getComputedStyle(section);
      return {
        index,
        visible: styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0',
        height: section.offsetHeight,
        text
      };
    });
  });

  console.log('Total sections found:', sections.length);
  console.log('\nSection details:');
  sections.forEach(s => {
    console.log(`[${s.index}] ${s.visible ? '✅' : '❌'} Height: ${s.height}px - ${s.text}`);
  });

  await browser.close();
}

checkSections().catch(console.error);
