import { chromium } from 'playwright';

async function verifyHomepage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('\n🔍 Loading and verifying homepage...\n');

  // Navigate to page
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 });

  // Wait for initial load
  await page.waitForTimeout(5000);

  // Scroll to bottom SLOWLY to trigger all animations
  console.log('📜 Scrolling to trigger animations...');
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100; // Slower scroll
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          // Wait at bottom for animations to complete
          setTimeout(() => resolve(), 3000);
        }
      }, 150); // Slower interval
    });
  });

  // Check visibility of all sections
  const sections = await page.evaluate(() => {
    const checkSection = (selector: string, name: string) => {
      const elements = document.querySelectorAll(selector);
      let visible = false;
      let opacity = '0';

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (styles.opacity !== '0' && rect.height > 0) {
          visible = true;
          opacity = styles.opacity;
        }
      });

      return { name, found: elements.length > 0, count: elements.length, visible, opacity };
    };

    return [
      checkSection('section', 'Total sections'),
      checkSection('h2:has-text("PRECISION SERVICES")', 'Services'),
      checkSection('h2:has-text("Precision By The Numbers")', 'Stats'),
      checkSection('h2:has-text("INDUSTRY LEADERS")', 'Industries'),
      checkSection('h2:has-text("Master Precision Manufacturing")', 'Resources'),
    ];
  });

  console.log('\n=== Section Visibility Check ===');
  sections.forEach(s => {
    const status = s.visible ? '✅' : '❌';
    console.log(`${status} ${s.name}: found=${s.count}, visible=${s.visible}, opacity=${s.opacity}`);
  });

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  // Take screenshot
  console.log('\n📸 Taking full page screenshot...');
  await page.screenshot({ path: 'screenshots/homepage-verification.png', fullPage: true });

  console.log('\n✅ Verification complete!');
  console.log('Screenshot saved to: screenshots/homepage-verification.png');
  console.log('\nBrowser will stay open for 60 seconds for manual inspection...');

  await page.waitForTimeout(60000);
  await browser.close();
}

verifyHomepage().catch(console.error);
