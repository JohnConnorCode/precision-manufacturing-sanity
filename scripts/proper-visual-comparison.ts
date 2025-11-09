import { chromium } from 'playwright';

async function comparePages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // Disable animations globally
  await context.addInitScript(() => {
    (window as any).matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {} });
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      [style*="opacity:0"] { opacity: 1 !important; }
      [style*="transform"] { transform: none !important; }
    `;
    document.head?.appendChild(style);
  });

  console.log('Taking screenshots with animations disabled...\n');

  // Reference site
  const refPage = await context.newPage();
  await refPage.goto('https://precision-manufacturing.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 });
  await refPage.waitForTimeout(2000);
  await refPage.screenshot({ path: 'screenshots/reference-no-anim.png', fullPage: true });
  console.log('✓ Reference screenshot saved');

  // Localhost
  const localPage = await context.newPage();
  await localPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
  await localPage.waitForTimeout(2000);
  await localPage.screenshot({ path: 'screenshots/localhost-no-anim.png', fullPage: true });
  console.log('✓ Localhost screenshot saved');

  await browser.close();
  console.log('\n✅ Screenshots saved to screenshots/ directory');
}

comparePages().catch(console.error);
