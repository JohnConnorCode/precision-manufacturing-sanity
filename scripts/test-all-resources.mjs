/**
 * Test ALL resource pages
 */

import https from 'https';

const SITE = 'https://precision-manufacturing-sanity.vercel.app';

function testPage(path) {
  return new Promise((resolve) => {
    const url = SITE + path;
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const status = res.statusCode;
        const hasNotFound = html.includes('Not Found') || html.includes('not found');
        const imageCount = (html.match(/cdn\.sanity\.io/g) || []).length;
        const ok = status === 200 && !hasNotFound && imageCount > 0;
        resolve({ path, status, imageCount, hasNotFound, ok });
      });
    }).on('error', (err) => {
      resolve({ path, status: 'ERROR', imageCount: 0, hasNotFound: false, ok: false, error: err.message });
    });
  });
}

async function main() {
  // Get all resources from Sanity
  const sanityUrl = 'https://vgacjlhu.api.sanity.io/v2024-01-01/data/query/production?query=' +
    encodeURIComponent('*[_type=="resource"]{"slug":slug.current,"cat":category}');

  const resources = await new Promise((resolve) => {
    https.get(sanityUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data).result || []));
    });
  });

  const urls = resources
    .filter(r => r.slug && r.cat)
    .map(r => `/resources/${r.cat}/${r.slug}`);

  console.log(`Testing ${urls.length} resource pages...\n`);

  const failed = [];
  let passed = 0;

  // Test in batches of 10
  for (let i = 0; i < urls.length; i += 10) {
    const batch = urls.slice(i, i + 10);
    const results = await Promise.all(batch.map(testPage));

    for (const r of results) {
      if (r.ok) {
        passed++;
        process.stdout.write('.');
      } else {
        process.stdout.write('X');
        failed.push(r);
      }
    }
  }

  console.log('\n');

  if (failed.length > 0) {
    console.log('FAILED PAGES:');
    for (const f of failed) {
      console.log(`  ${f.path}`);
      console.log(`    Status: ${f.status}, Images: ${f.imageCount}, NotFound: ${f.hasNotFound}`);
    }
  }

  console.log(`\nPassed: ${passed}/${urls.length}`);
  console.log(`Failed: ${failed.length}`);

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(console.error);
