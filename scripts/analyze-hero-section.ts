import { chromium } from 'playwright';
import * as fs from 'fs';

async function analyzeHeroSection() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to reference site...');
  await page.goto('https://precision-manufacturing.vercel.app/', { waitUntil: 'networkidle' });
  
  // Wait for hero section to be visible
  await page.waitForSelector('section', { timeout: 10000 });
  await page.waitForTimeout(2000); // Wait for animations to settle
  
  const analysis = await page.evaluate(() => {
    const results: any = {
      timestamp: new Date().toISOString(),
      hero: {},
      animations: {},
      typography: {},
      colors: {},
      spacing: {},
      layout: {}
    };
    
    // Find hero section (likely the first section or one with specific characteristics)
    const heroSection = document.querySelector('section') || document.querySelector('main > div');
    if (!heroSection) {
      return { error: 'Hero section not found' };
    }
    
    const heroStyles = window.getComputedStyle(heroSection);
    
    // Hero section container styles
    results.hero.containerStyles = {
      padding: heroStyles.padding,
      paddingTop: heroStyles.paddingTop,
      paddingBottom: heroStyles.paddingBottom,
      backgroundColor: heroStyles.backgroundColor,
      minHeight: heroStyles.minHeight,
      display: heroStyles.display,
      alignItems: heroStyles.alignItems,
      justifyContent: heroStyles.justifyContent
    };
    
    // Find heading (h1)
    const h1 = heroSection.querySelector('h1');
    if (h1) {
      const h1Styles = window.getComputedStyle(h1);
      results.typography.h1 = {
        fontFamily: h1Styles.fontFamily,
        fontSize: h1Styles.fontSize,
        fontWeight: h1Styles.fontWeight,
        lineHeight: h1Styles.lineHeight,
        letterSpacing: h1Styles.letterSpacing,
        color: h1Styles.color,
        marginBottom: h1Styles.marginBottom,
        textAlign: h1Styles.textAlign,
        innerText: h1.innerText,
        innerHTML: h1.innerHTML
      };
      
      // Check for animated words/spans
      const words = h1.querySelectorAll('span, [class*="word"]');
      if (words.length > 0) {
        results.animations.wordCount = words.length;
        results.animations.words = Array.from(words).map((word, idx) => {
          const wordStyles = window.getComputedStyle(word as Element);
          return {
            index: idx,
            text: (word as HTMLElement).innerText,
            opacity: wordStyles.opacity,
            transform: wordStyles.transform,
            transition: wordStyles.transition,
            animation: wordStyles.animation,
            animationDelay: wordStyles.animationDelay,
            animationDuration: wordStyles.animationDuration,
            animationTimingFunction: wordStyles.animationTimingFunction
          };
        });
      }
    }
    
    // Find description/subtitle
    const description = heroSection.querySelector('p');
    if (description) {
      const descStyles = window.getComputedStyle(description);
      results.typography.description = {
        fontFamily: descStyles.fontFamily,
        fontSize: descStyles.fontSize,
        fontWeight: descStyles.fontWeight,
        lineHeight: descStyles.lineHeight,
        letterSpacing: descStyles.letterSpacing,
        color: descStyles.color,
        marginBottom: descStyles.marginBottom,
        marginTop: descStyles.marginTop,
        maxWidth: descStyles.maxWidth,
        textAlign: descStyles.textAlign,
        innerText: description.innerText
      };
    }
    
    // Find badges/tags
    const badges = heroSection.querySelectorAll('[class*="badge"], [class*="tag"], span[class*="inline"]');
    if (badges.length > 0) {
      results.badges = Array.from(badges).slice(0, 5).map((badge, idx) => {
        const badgeStyles = window.getComputedStyle(badge as Element);
        return {
          index: idx,
          text: (badge as HTMLElement).innerText,
          backgroundColor: badgeStyles.backgroundColor,
          color: badgeStyles.color,
          padding: badgeStyles.padding,
          borderRadius: badgeStyles.borderRadius,
          fontSize: badgeStyles.fontSize,
          fontWeight: badgeStyles.fontWeight,
          border: badgeStyles.border,
          boxShadow: badgeStyles.boxShadow,
          display: badgeStyles.display,
          animation: badgeStyles.animation,
          transition: badgeStyles.transition
        };
      });
    }
    
    // Find buttons/CTAs
    const buttons = heroSection.querySelectorAll('a, button');
    if (buttons.length > 0) {
      results.buttons = Array.from(buttons).slice(0, 3).map((btn, idx) => {
        const btnStyles = window.getComputedStyle(btn as Element);
        return {
          index: idx,
          text: (btn as HTMLElement).innerText,
          backgroundColor: btnStyles.backgroundColor,
          color: btnStyles.color,
          padding: btnStyles.padding,
          borderRadius: btnStyles.borderRadius,
          fontSize: btnStyles.fontSize,
          fontWeight: btnStyles.fontWeight,
          border: btnStyles.border,
          boxShadow: btnStyles.boxShadow,
          transition: btnStyles.transition,
          href: (btn as HTMLAnchorElement).href
        };
      });
    }
    
    // Get all color values used
    results.colors.palette = {
      background: heroStyles.backgroundColor,
      foreground: heroStyles.color
    };
    
    // Layout measurements
    results.layout = {
      sectionWidth: heroSection.offsetWidth,
      sectionHeight: heroSection.offsetHeight,
      sectionDisplay: heroStyles.display,
      sectionFlexDirection: heroStyles.flexDirection,
      sectionGap: heroStyles.gap
    };
    
    return results;
  });
  
  // Save analysis to file
  const outputPath = '/Users/johnconnor/Documents/GitHub/iismet/precision-manufacturing-sanity/scripts/hero-analysis.json';
  fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2));
  
  console.log('\n=== HERO SECTION ANALYSIS ===\n');
  console.log(JSON.stringify(analysis, null, 2));
  
  // Take screenshots
  console.log('\nCapturing screenshots...');
  await page.screenshot({
    path: '/Users/johnconnor/Documents/GitHub/iismet/precision-manufacturing-sanity/scripts/reference-hero-full.png',
    fullPage: false
  });
  
  // Screenshot just the hero section
  const heroElement = await page.locator('section').first();
  if (heroElement) {
    await heroElement.screenshot({
      path: '/Users/johnconnor/Documents/GitHub/iismet/precision-manufacturing-sanity/scripts/reference-hero-section.png'
    });
  }
  
  console.log('Screenshots saved');
  
  await browser.close();
  
  return analysis;
}

analyzeHeroSection().catch(console.error);
