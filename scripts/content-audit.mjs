/**
 * Content Audit Script
 *
 * Run this before any deployment to catch missing images/content.
 * Usage: node scripts/content-audit.mjs
 */

import https from 'https';

const SANITY_API = 'https://vgacjlhu.api.sanity.io/v2024-01-01/data/query/production';

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(null); }
      });
    }).on('error', reject);
  });
}

async function audit() {
  console.log('='.repeat(60));
  console.log('SANITY CONTENT AUDIT');
  console.log('='.repeat(60));

  let critical = 0;
  let warnings = 0;

  // Services
  console.log('\n## SERVICES (Critical)\n');
  const services = await fetchJSON(SANITY_API + '?query=' + encodeURIComponent(
    '*[_type=="service"]{title,"card":defined(image.asset),"hero":defined(heroImage.asset),"quality":defined(qualityStandardsImage.asset)}'
  ));
  for (const s of services?.result || []) {
    const missing = [];
    if (!s.card) missing.push('card');
    if (!s.hero) missing.push('hero');
    if (!s.quality) missing.push('quality');
    if (missing.length) { critical++; console.log('✗ ' + s.title + ' - MISSING: ' + missing.join(', ')); }
    else console.log('✓ ' + s.title);
  }

  // Industries
  console.log('\n## INDUSTRIES (Critical)\n');
  const industries = await fetchJSON(SANITY_API + '?query=' + encodeURIComponent(
    '*[_type=="industry"]{title,"hero":defined(heroImage.asset),"card":defined(image.asset),"caps":expertise[]{title,"img":defined(image.asset)}}'
  ));
  for (const i of industries?.result || []) {
    const missing = [];
    if (!i.hero) missing.push('hero');
    if (!i.card) missing.push('card');
    const missingCaps = (i.caps || []).filter(c => !c.img).length;
    if (missingCaps) missing.push(missingCaps + ' capabilities');
    if (missing.length) { critical++; console.log('✗ ' + i.title + ' - MISSING: ' + missing.join(', ')); }
    else console.log('✓ ' + i.title);
  }

  // Case Studies
  console.log('\n## CASE STUDIES (Critical)\n');
  const caseStudies = await fetchJSON(SANITY_API + '?query=' + encodeURIComponent(
    '*[_type=="caseStudy"]{title,"img":defined(image.asset)}'
  ));
  for (const cs of caseStudies?.result || []) {
    if (!cs.img) { critical++; console.log('✗ ' + cs.title); }
    else console.log('✓ ' + cs.title);
  }

  // Key Pages
  console.log('\n## KEY PAGES (Critical)\n');
  const pages = await fetchJSON(SANITY_API + '?query=' + encodeURIComponent(
    '*[_type in ["homepage","about","contact","careers"]]{_type,"hero":defined(hero.backgroundImage.asset)}'
  ));
  for (const p of pages?.result || []) {
    if (!p.hero) { critical++; console.log('✗ ' + p._type + ' - MISSING: hero image'); }
    else console.log('✓ ' + p._type);
  }

  // Resources (warning level)
  console.log('\n## RESOURCES (Warning - many may be intentionally text-only)\n');
  const resources = await fetchJSON(SANITY_API + '?query=' + encodeURIComponent(
    '*[_type=="resource"]{title,"img":defined(image.asset)}'
  ));
  const withImg = (resources?.result || []).filter(r => r.img).length;
  const noImg = (resources?.result || []).filter(r => !r.img).length;
  console.log('With images: ' + withImg);
  console.log('Without images: ' + noImg);
  if (noImg > 0) warnings += noImg;

  // Summary
  console.log('\n' + '='.repeat(60));
  if (critical === 0) {
    console.log('✓ CRITICAL CONTENT: All complete');
  } else {
    console.log('✗ CRITICAL ISSUES: ' + critical);
  }
  if (warnings > 0) {
    console.log('⚠ WARNINGS: ' + warnings + ' resources without images');
  }
  console.log('='.repeat(60));

  process.exit(critical > 0 ? 1 : 0);
}

audit().catch(err => { console.error(err); process.exit(1); });
