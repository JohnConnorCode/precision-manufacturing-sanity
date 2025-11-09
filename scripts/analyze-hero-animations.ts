import { chromium } from 'playwright';

async function analyzeHeroAnimations() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Analyzing hero animations in detail...');
  await page.goto('https://precision-manufacturing.vercel.app/', { waitUntil: 'networkidle' });
  
  // Record animation timeline
  const animationData = await page.evaluate(() => {
    const results: any = {
      animationSequence: [],
      cssKeyframes: [],
      transitionStyles: {}
    };
    
    // Get all stylesheets and extract keyframe animations
    const styleSheets = Array.from(document.styleSheets);
    styleSheets.forEach((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule: any) => {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            results.cssKeyframes.push({
              name: rule.name,
              keyframes: Array.from(rule.cssRules).map((kf: any) => ({
                keyText: kf.keyText,
                style: kf.style.cssText
              }))
            });
          }
        });
      } catch (e) {
        // CORS or other access issues
      }
    });
    
    // Find all elements with animations in the hero
    const hero = document.querySelector('section');
    if (hero) {
      const animatedElements = hero.querySelectorAll('[style*="animation"], [class*="animate"]');
      results.animatedElements = Array.from(animatedElements).map((el: any) => ({
        tag: el.tagName,
        className: el.className,
        style: el.style.cssText,
        computedAnimation: window.getComputedStyle(el).animation,
        computedTransition: window.getComputedStyle(el).transition
      }));
    }
    
    // Check for Framer Motion data attributes
    const framerElements = document.querySelectorAll('[data-framer-appear-id], [style*="transform"]');
    results.framerMotionElements = Array.from(framerElements).slice(0, 10).map((el: any) => ({
      tag: el.tagName,
      dataAttributes: Object.keys(el.dataset),
      transform: window.getComputedStyle(el).transform,
      opacity: window.getComputedStyle(el).opacity,
      transition: window.getComputedStyle(el).transition
    }));
    
    return results;
  });
  
  console.log('\n=== ANIMATION DETAILS ===\n');
  console.log(JSON.stringify(animationData, null, 2));
  
  // Take a video of the page load animation
  console.log('\nRecording page load animation...');
  await page.reload({ waitUntil: 'networkidle' });
  
  // Observe animations frame by frame
  const frames: any[] = [];
  for (let i = 0; i < 30; i++) {
    const frameData = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const words = h1?.querySelectorAll('span');
      return {
        time: Date.now(),
        h1Opacity: h1 ? window.getComputedStyle(h1).opacity : null,
        h1Transform: h1 ? window.getComputedStyle(h1).transform : null,
        words: words ? Array.from(words).map(w => ({
          text: (w as HTMLElement).innerText,
          opacity: window.getComputedStyle(w).opacity,
          transform: window.getComputedStyle(w).transform
        })) : []
      };
    });
    frames.push(frameData);
    await page.waitForTimeout(100); // 100ms between frames
  }
  
  console.log('\n=== ANIMATION TIMELINE (First 3 seconds) ===\n');
  console.log(JSON.stringify(frames, null, 2));
  
  await browser.close();
}

analyzeHeroAnimations().catch(console.error);
