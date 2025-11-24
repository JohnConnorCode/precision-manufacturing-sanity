// generate-services-import.mjs
// Scans `content/services` MDX files and creates a Sanity import NDJSON file for service documents.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper to create a slug from a string
function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function processMdx(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = data.slug || slugify(path.basename(filePath, '.mdx'));
  const title = data.title || path.basename(filePath, '.mdx');
  const doc = {
    _type: 'service',
    _id: `service-${slug}`,
    title,
    slug: { _type: 'slug', current: slug },
    // Simple body field – you may need to adapt to your schema
    body: [{ _type: 'block', children: [{ _type: 'span', text: content.trim() }] }],
    // Include any other front‑matter fields directly
    ...data,
  };
  return doc;
}

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, callback);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      callback(full);
    }
  });
}

async function main() {
  const servicesDir = path.resolve('content', 'services');
  const docs = [];
  if (!fs.existsSync(servicesDir)) {
    console.error('❌ services directory not found:', servicesDir);
    process.exit(1);
  }
  walk(servicesDir, (file) => {
    const doc = processMdx(file);
    docs.push(doc);
  });
  const outPath = path.resolve('sanity-import-services.ndjson');
  const ndjson = docs.map((d) => JSON.stringify(d)).join('\n');
  fs.writeFileSync(outPath, ndjson, 'utf8');
  console.log(`✅ Generated ${docs.length} service documents → ${outPath}`);
}

main().catch((err) => {
  console.error('❌ Error generating import payload:', err);
  process.exit(1);
});
