/**
 * Full Site Test
 *
 * Tests EVERY page on the site for:
 * - 200 status (page loads)
 * - Has images from cdn.sanity.io
 * - No "Not Found" errors
 *
 * Run: node scripts/full-site-test.mjs
 */

import https from 'https';

const SITE = 'https://precision-manufacturing-sanity.vercel.app';

// Collect all URLs to test
async function getAllUrls() {
  const urls = [
    // Static pages
    '/',
    '/services',
    '/industries',
    '/resources',
    '/about',
    '/contact',
    '/careers',
  ];

  // Get dynamic pages from Sanity
  const sanityQuery = async (query) => {
    return new Promise((resolve) => {
      const url = `https://vgacjlhu.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}`;
      https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data).result || []);
          } catch {
            resolve([]);
          }
        });
      }).on('error', () => resolve([]));
    });
  };

  // Services
  const services = await sanityQuery('*[_type=="service"]{"slug":slug.current}');
  services.forEach(s => urls.push(`/services/${s.slug}`));

  // Industries
  const industries = await sanityQuery('*[_type=="industry"]{"slug":slug.current}');
  industries.forEach(i => urls.push(`/industries/${i.slug}`));

  // Case Studies
  const caseStudies = await sanityQuery('*[_type=="caseStudy"]{"slug":slug.current}');
  caseStudies.forEach(cs => urls.push(`/case-studies/${cs.slug}`));

  // Resources (categories)
  urls.push('/resources/manufacturing-processes');
  urls.push('/resources/quality-compliance');
  urls.push('/resources/material-science');
  urls.push('/resources/industry-applications');
  urls.push('/resources/calculators-tools');

  // Resource articles (sample - first 20)
  const resources = await sanityQuery('*[_type=="resource"][0...20]{"slug":slug.current,"cat":category}');
  resources.forEach(r => {
    if (r.slug && r.cat) {
      urls.push(`/resources/${r.cat}/${r.slug}`);
    }
  });

  // Careers
  const jobs = await sanityQuery('*[_type=="jobPosting"]{"slug":slug.current}');
  jobs.forEach(j => urls.push(`/careers/${j.slug}`));

  return urls;
}

// Test a single page
function testPage(path) {
  return new Promise((resolve) => {
    const url = SITE + path;
    const startTime = Date.now();

    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const duration = Date.now() - startTime;
        const status = res.statusCode;
        const hasNotFound = html.includes('Not Found') || html.includes('404') || html.includes('not found');
        const imageMatches = html.match(/cdn\.sanity\.io/g) || [];
        const imageCount = imageMatches.length;

        // Check for common issues
        const issues = [];
        if (status !== 200) issues.push(`Status ${status}`);
        if (hasNotFound && status === 200) issues.push('Shows "Not Found" content');
        if (imageCount === 0) issues.push('No images');

        resolve({
          path,
          status,
          imageCount,
          duration,
          issues,
          ok: issues.length === 0
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        imageCount: 0,
        duration: 0,
        issues: [err.message],
        ok: false
      });
    });
  });
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('FULL SITE TEST');
  console.log('='.repeat(70));
  console.log('\nCollecting URLs...');

  const urls = await getAllUrls();
  console.log(`Found ${urls.length} URLs to test\n`);

  console.log('Testing all pages...\n');

  const results = [];
  const failed = [];

  // Test in batches of 5 to avoid overwhelming the server
  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(testPage));

    for (const result of batchResults) {
      results.push(result);

      if (result.ok) {
        console.log(`✓ ${result.path}`);
      } else {
        console.log(`✗ ${result.path}`);
        console.log(`    Issues: ${result.issues.join(', ')}`);
        failed.push(result);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));

  const passed = results.filter(r => r.ok).length;
  console.log(`\nTotal pages: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n--- FAILED PAGES ---\n');
    for (const f of failed) {
      console.log(`${f.path}`);
      console.log(`  Status: ${f.status}`);
      console.log(`  Images: ${f.imageCount}`);
      console.log(`  Issues: ${f.issues.join(', ')}`);
      console.log();
    }
    process.exit(1);
  } else {
    console.log('\n✓ ALL PAGES PASSED\n');
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
