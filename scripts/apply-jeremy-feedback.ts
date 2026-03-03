/**
 * Apply Jeremy's Feedback - Sanity CMS Patch Script
 *
 * Applies terminology and content changes based on Jeremy's review:
 * - "manufacturing" -> "machining" terminology swap
 * - Remove "mission critical" references
 * - Remove "AI driven" references
 * - Remove "laser scanning" references from Metrology
 * - Remove DFM/design references from Engineering
 * - Disable resources section, specific badges, stats
 * - Update hero words, tolerance specs, part sizes
 * - Create new Medical & Automotive industry placeholders
 *
 * Usage:
 *   npx tsx scripts/apply-jeremy-feedback.ts           # Apply changes
 *   npx tsx scripts/apply-jeremy-feedback.ts --dry-run  # Preview changes only
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

const DRY_RUN = process.argv.includes('--dry-run');
let totalChanges = 0;

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function logChange(docTitle: string, field: string, oldVal: any, newVal: any) {
  totalChanges++;
  const old = typeof oldVal === 'string' ? oldVal.substring(0, 80) : JSON.stringify(oldVal)?.substring(0, 80);
  const nw = typeof newVal === 'string' ? newVal.substring(0, 80) : JSON.stringify(newVal)?.substring(0, 80);
  console.log(`  [CHANGE] ${field}: "${old}" -> "${nw}"`);
}

function logSection(title: string) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`  ${title}`);
  console.log('='.repeat(70));
}

/** Replace "manufacturing" -> "machining" with case variants, skip "manufacturability" */
function replaceManufacturing(text: string): string {
  if (!text || typeof text !== 'string') return text;
  let result = text;
  // Case-sensitive replacements -- order matters: longer/uppercase first
  result = result.replace(/MANUFACTURING/g, 'MACHINING');
  result = result.replace(/(?<![\w])Manufacturing(?![\w]*bility)/g, 'Machining');
  result = result.replace(/(?<![\w])manufacturing(?![\w]*bility)/g, 'machining');
  return result;
}

/** Remove a phrase (case insensitive) and clean up leftover punctuation/spaces */
function removePhrase(text: string, phrase: string): string {
  if (!text || typeof text !== 'string') return text;
  // Build a regex that handles optional hyphens between words and surrounding commas/spaces
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Replace with optional hyphen between words
  const flexPattern = escaped.replace(/\s+/g, '[\\s-]*');
  // Match phrase with optional surrounding commas, "and", connectors
  let result = text.replace(new RegExp(`(?:,\\s*)?(?:and\\s+)?${flexPattern}(?:\\s+and)?(?:\\s*,)?`, 'gi'), ' ');
  // Also try standalone removal
  result = result.replace(new RegExp(flexPattern, 'gi'), '');
  // Clean up orphaned parentheses like "( )" or "(  )"
  result = result.replace(/\(\s*\)/g, '');
  // Clean up orphaned connectors: "and  and" -> "and"
  result = result.replace(/\band\s+and\b/gi, 'and');
  // Clean up double/triple spaces
  result = result.replace(/\s{2,}/g, ' ');
  // Clean up orphaned commas: ", ," or ",," -> ","
  result = result.replace(/,\s*,/g, ',');
  // Clean up leading/trailing commas
  result = result.replace(/^\s*,\s*/, '');
  result = result.replace(/\s*,\s*$/, '');
  // Clean up orphaned "and" at start/end
  result = result.replace(/^\s*and\s+/i, '');
  result = result.replace(/\s+and\s*$/i, '');
  // Clean up double periods
  result = result.replace(/\.\s*\./g, '.');
  // Clean up space before period/comma
  result = result.replace(/\s+([.,;:])/g, '$1');
  return result.trim();
}

/** Apply a string transformation to a field and log if changed */
function transformField(obj: any, path: string, fn: (v: string) => string): boolean {
  const parts = path.split('.');
  let target = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!target || typeof target !== 'object') return false;
    target = target[parts[i]];
  }
  const key = parts[parts.length - 1];
  if (!target || typeof target[key] !== 'string') return false;
  const oldVal = target[key];
  const newVal = fn(oldVal);
  if (oldVal !== newVal) {
    target[key] = newVal;
    logChange('', path, oldVal, newVal);
    return true;
  }
  return false;
}

/** Apply text transform to all string fields in an object (recursively) */
function deepTransformStrings(obj: any, fn: (v: string) => string, path = ''): boolean {
  if (!obj || typeof obj !== 'object') return false;
  let changed = false;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i];
      if (typeof item === 'string') {
        const newVal = fn(item);
        if (newVal !== item) {
          obj[i] = newVal;
          logChange('', `${path}[${i}]`, item, newVal);
          changed = true;
        }
      } else if (typeof item === 'object' && item !== null) {
        if (deepTransformStrings(item, fn, `${path}[${i}]`)) changed = true;
      }
    }
  } else {
    for (const key of Object.keys(obj)) {
      // Skip internal Sanity fields
      if (key.startsWith('_') && key !== '_type') continue;
      const val = obj[key];
      if (typeof val === 'string') {
        const newVal = fn(val);
        if (newVal !== val) {
          obj[key] = newVal;
          logChange('', `${path}.${key}`, val, newVal);
          changed = true;
        }
      } else if (typeof val === 'object' && val !== null) {
        if (deepTransformStrings(val, fn, `${path}.${key}`)) changed = true;
      }
    }
  }
  return changed;
}

/** Replace text within Portable Text blocks */
function transformPortableText(blocks: any[], fn: (v: string) => string, path = ''): boolean {
  if (!Array.isArray(blocks)) return false;
  let changed = false;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block?._type === 'block' && Array.isArray(block.children)) {
      for (let j = 0; j < block.children.length; j++) {
        const child = block.children[j];
        if (typeof child?.text === 'string') {
          const oldText = child.text;
          const newText = fn(oldText);
          if (oldText !== newText) {
            child.text = newText;
            logChange('', `${path}[${i}].children[${j}].text`, oldText, newText);
            changed = true;
          }
        }
      }
    }
  }
  return changed;
}

/** Commit a patch (or skip in dry-run mode) */
async function commitPatch(docId: string, updates: Record<string, any>, label: string) {
  if (Object.keys(updates).length === 0) return;
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would patch ${label} (${docId})`);
    return;
  }
  await client.patch(docId).set(updates).commit();
  console.log(`  [APPLIED] Patched ${label} (${docId})`);
}

// ---------------------------------------------------------------------------
// 1. HOMEPAGE
// ---------------------------------------------------------------------------

async function patchHomepage() {
  logSection('1. HOMEPAGE');
  const doc = await client.fetch(`*[_type == "homepage"][0]`);
  if (!doc) {
    console.log('  Homepage document not found!');
    return;
  }
  console.log(`  Found homepage: ${doc._id}`);

  const updates: Record<string, any> = {};

  // --- Hero title words ---
  if (doc.hero?.word1 !== 'PRECISION' || doc.hero?.word2 !== 'MACHINING AND' || doc.hero?.word3 !== 'INSPECTION SERVICES') {
    logChange('homepage', 'hero.word1', doc.hero?.word1, 'PRECISION');
    logChange('homepage', 'hero.word2', doc.hero?.word2, 'MACHINING AND');
    logChange('homepage', 'hero.word3', doc.hero?.word3, 'INSPECTION SERVICES');
    updates['hero.word1'] = 'PRECISION';
    updates['hero.word2'] = 'MACHINING AND';
    updates['hero.word3'] = 'INSPECTION SERVICES';
  }

  // --- Disable "flight-ready, defense grade" badge ---
  if (Array.isArray(doc.hero?.badges)) {
    let badgesChanged = false;
    for (const badge of doc.hero.badges) {
      const text = (badge.text || '').toLowerCase();
      if (text.includes('flight-ready') || text.includes('defense grade') || text.includes('flight ready') || text.includes('defense-grade')) {
        if (badge.enabled !== false) {
          logChange('homepage', `hero.badges[${badge._key}].enabled`, badge.enabled, false);
          badge.enabled = false;
          badgesChanged = true;
        }
      }
    }
    if (badgesChanged) {
      updates['hero.badges'] = doc.hero.badges;
    }
  }

  // --- Technical specs: tolerance and part size ---
  if (Array.isArray(doc.technicalSpecs?.specs)) {
    let specsChanged = false;
    for (const spec of doc.technicalSpecs.specs) {
      const label = (spec.label || '').toLowerCase();
      if (label.includes('tolerance')) {
        if (spec.value !== '±0.001"') {
          logChange('homepage', `technicalSpecs.specs[tolerance].value`, spec.value, '±0.001"');
          spec.value = '±0.001"';
          specsChanged = true;
        }
      }
      if (label.includes('part size') || label.includes('size')) {
        if (spec.value !== 'Up to 60"') {
          logChange('homepage', `technicalSpecs.specs[size].value`, spec.value, 'Up to 60"');
          spec.value = 'Up to 60"';
          specsChanged = true;
        }
      }
    }
    if (specsChanged) {
      updates['technicalSpecs.specs'] = doc.technicalSpecs.specs;
    }
  }

  // --- Disable resources section ---
  if (doc.resourcesSection?.enabled !== false) {
    logChange('homepage', 'resourcesSection.enabled', doc.resourcesSection?.enabled, false);
    updates['resourcesSection.enabled'] = false;
  }

  // --- Global text replacements: manufacturing -> machining ---
  const homepageTextFields = [
    'hero.tagline',
    'stats.title', 'stats.subtitle',
    'servicesSection.eyebrow', 'servicesSection.description', 'servicesSection.subdescription',
    'industriesSection.eyebrow', 'industriesSection.heading', 'industriesSection.description',
    'technicalSpecs.title', 'technicalSpecs.subtitle',
    'imageShowcase.header.eyebrow', 'imageShowcase.header.title', 'imageShowcase.header.description',
    'operationalExcellence.heading', 'operationalExcellence.description',
    'cta.title', 'cta.subtitle', 'cta.trustMessage',
  ];

  for (const field of homepageTextFields) {
    if (transformField(doc, field, replaceManufacturing)) {
      const parts = field.split('.');
      // Set the top-level nested object
      const topKey = parts.slice(0, 2).join('.');
      updates[topKey] = getNestedValue(doc, topKey);
    }
  }

  // Array text fields
  const arrayTextPaths = [
    { arr: 'stats.items', fields: ['label', 'description'] },
    { arr: 'technicalSpecs.specs', fields: ['label', 'description'] },
    { arr: 'operationalExcellence.benefits', fields: ['title', 'description'] },
  ];

  for (const { arr, fields } of arrayTextPaths) {
    const items = getNestedValue(doc, arr);
    if (Array.isArray(items)) {
      let arrChanged = false;
      for (const item of items) {
        for (const f of fields) {
          if (typeof item[f] === 'string') {
            const oldVal = item[f];
            const newVal = replaceManufacturing(oldVal);
            if (oldVal !== newVal) {
              item[f] = newVal;
              logChange('homepage', `${arr}[].${f}`, oldVal, newVal);
              arrChanged = true;
            }
          }
        }
      }
      if (arrChanged) {
        updates[arr] = items;
      }
    }
  }

  await commitPatch(doc._id, updates, 'homepage');
}

function getNestedValue(obj: any, path: string): any {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

function setNestedValue(obj: any, path: string, value: any): void {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// ---------------------------------------------------------------------------
// 2. NAVIGATION
// ---------------------------------------------------------------------------

async function patchNavigation() {
  logSection('2. NAVIGATION');
  const doc = await client.fetch(`*[_type == "navigation"][0]`);
  if (!doc) {
    console.log('  Navigation document not found!');
    return;
  }
  console.log(`  Found navigation: ${doc._id}`);

  if (!Array.isArray(doc.menuItems)) {
    console.log('  No menuItems found');
    return;
  }

  let changed = false;

  function hideResourcesItems(items: any[]): boolean {
    let modified = false;
    for (const item of items) {
      const name = (item.name || '').toLowerCase();
      if (name.includes('resources') || name.includes('resource')) {
        if (item.showInHeader !== false) {
          logChange('navigation', `menuItems[${item._key}].showInHeader`, item.showInHeader, false);
          item.showInHeader = false;
          modified = true;
        }
      }
      // Check children recursively
      if (Array.isArray(item.children)) {
        if (hideResourcesItems(item.children)) modified = true;
      }
    }
    return modified;
  }

  changed = hideResourcesItems(doc.menuItems);

  if (changed) {
    await commitPatch(doc._id, { menuItems: doc.menuItems }, 'navigation');
  } else {
    console.log('  No changes needed for navigation');
  }
}

// ---------------------------------------------------------------------------
// 3. ALL SERVICES (with specific service patches)
// ---------------------------------------------------------------------------

async function patchServices() {
  logSection('3. ALL SERVICES');
  const services = await client.fetch(`*[_type == "service"]{ ... }`);
  if (!services || services.length === 0) {
    console.log('  No services found!');
    return;
  }
  console.log(`  Found ${services.length} services`);

  for (const svc of services) {
    const slug = svc.slug?.current || '';
    console.log(`\n  --- Service: ${svc.title} (${slug}) ---`);

    // Deep replace manufacturing -> machining across ALL string fields
    deepTransformStrings(svc, replaceManufacturing, `service[${slug}]`);

    // Also handle Portable Text arrays
    const ptFields = [
      'description', 'hero.descriptionRich', 'overview.descriptionRich',
      'servicesDescriptionRich',
    ];
    for (const ptField of ptFields) {
      const ptVal = getNestedValue(svc, ptField);
      if (Array.isArray(ptVal)) {
        transformPortableText(ptVal, replaceManufacturing, `service[${slug}].${ptField}`);
      }
    }
    // Portable text in services[] array items
    if (Array.isArray(svc.services)) {
      for (const s of svc.services) {
        if (Array.isArray(s?.descriptionRich)) {
          transformPortableText(s.descriptionRich, replaceManufacturing, `service[${slug}].services[].descriptionRich`);
        }
      }
    }
    // Portable text in process[] array items
    if (Array.isArray(svc.process)) {
      for (const p of svc.process) {
        if (Array.isArray(p?.descriptionRich)) {
          transformPortableText(p.descriptionRich, replaceManufacturing, `service[${slug}].process[].descriptionRich`);
        }
      }
    }
    if (Array.isArray(svc.processes)) {
      for (const p of svc.processes) {
        if (Array.isArray(p?.descriptionRich)) {
          transformPortableText(p.descriptionRich, replaceManufacturing, `service[${slug}].processes[].descriptionRich`);
        }
      }
    }

    // ---- 5-Axis specific: remove "mission critical" / "mission-critical" ----
    if (slug.includes('5-axis')) {
      console.log('  Applying 5-Axis specific changes: removing "mission critical"');
      const removeMC = (t: string) => removePhrase(removePhrase(t, 'mission critical'), 'mission-critical');
      deepTransformStrings(svc, removeMC, `5-axis`);
      // Also in PT
      for (const ptField of ptFields) {
        const ptVal = getNestedValue(svc, ptField);
        if (Array.isArray(ptVal)) transformPortableText(ptVal, removeMC, `5-axis.${ptField}`);
      }
      if (Array.isArray(svc.services)) {
        for (const s of svc.services) {
          if (Array.isArray(s?.descriptionRich)) transformPortableText(s.descriptionRich, removeMC, `5-axis.services[].descriptionRich`);
        }
      }
      if (Array.isArray(svc.process)) {
        for (const p of svc.process) {
          if (Array.isArray(p?.descriptionRich)) transformPortableText(p.descriptionRich, removeMC, `5-axis.process[].descriptionRich`);
        }
      }
    }

    // ---- Adaptive Machining specific ----
    if (slug.includes('adaptive')) {
      console.log('  Applying Adaptive Machining specific changes');

      // Remove "AI driven", "AI-driven", "AI-Driven"
      const removeAI = (t: string) => {
        let r = t;
        r = removePhrase(r, 'AI driven');
        r = removePhrase(r, 'AI-driven');
        r = removePhrase(r, 'AI-Driven');
        return r;
      };
      deepTransformStrings(svc, removeAI, `adaptive`);
      for (const ptField of ptFields) {
        const ptVal = getNestedValue(svc, ptField);
        if (Array.isArray(ptVal)) transformPortableText(ptVal, removeAI, `adaptive.${ptField}`);
      }
      if (Array.isArray(svc.services)) {
        for (const s of svc.services) {
          if (Array.isArray(s?.descriptionRich)) transformPortableText(s.descriptionRich, removeAI, `adaptive.services[].descriptionRich`);
        }
      }
      if (Array.isArray(svc.process)) {
        for (const p of svc.process) {
          if (Array.isArray(p?.descriptionRich)) transformPortableText(p.descriptionRich, removeAI, `adaptive.process[].descriptionRich`);
        }
      }

      // Remove "Adaptive Process Flow" from process[] array
      if (Array.isArray(svc.process)) {
        const before = svc.process.length;
        svc.process = svc.process.filter((p: any) => {
          const title = (p.title || '').toLowerCase();
          if (title.includes('adaptive process flow')) {
            logChange('adaptive', `process[].title`, p.title, '[REMOVED]');
            return false;
          }
          return true;
        });
        if (svc.process.length < before) {
          console.log(`  Removed ${before - svc.process.length} process item(s) matching "Adaptive Process Flow"`);
        }
      }

      // Add Medical, Automotive, Plastics to applications[]
      if (!Array.isArray(svc.applications)) svc.applications = [];
      const existingAppTitles = svc.applications.map((a: any) => (a.title || '').toLowerCase());
      const newApps = [
        { title: 'Medical', description: 'Precision components for medical devices and surgical instruments requiring tight tolerances.', _key: `med_${Date.now()}` },
        { title: 'Automotive', description: 'High-performance automotive components demanding consistent quality and rapid turnaround.', _key: `auto_${Date.now() + 1}` },
        { title: 'Plastics', description: 'Precision mold components and tooling for plastics manufacturing applications.', _key: `plast_${Date.now() + 2}` },
      ];
      for (const app of newApps) {
        if (!existingAppTitles.includes(app.title.toLowerCase())) {
          svc.applications.push(app);
          logChange('adaptive', `applications[]`, '[NEW]', app.title);
        }
      }
    }

    // ---- Metrology & Inspection specific ----
    if (slug.includes('metrology') || slug.includes('inspection')) {
      console.log('  Applying Metrology & Inspection specific changes');

      // Remove ALL "Laser Scanning" / "laser scanning" references
      const removeLaserScanning = (t: string) => removePhrase(t, 'laser scanning');

      // Remove entire services[] items about laser scanning
      if (Array.isArray(svc.services)) {
        const before = svc.services.length;
        svc.services = svc.services.filter((s: any) => {
          const title = (s.title || '').toLowerCase();
          if (title.includes('laser scanning')) {
            logChange('metrology', `services[].title`, s.title, '[REMOVED ENTIRE ITEM]');
            return false;
          }
          return true;
        });
        if (svc.services.length < before) {
          console.log(`  Removed ${before - svc.services.length} services item(s) about Laser Scanning`);
        }
      }

      // Remove entire capabilities[] items about laser scanning
      if (Array.isArray(svc.capabilities)) {
        const before = svc.capabilities.length;
        svc.capabilities = svc.capabilities.filter((c: any) => {
          const label = (c.label || c.title || '').toLowerCase();
          const value = (c.value || '').toLowerCase();
          const desc = (c.description || '').toLowerCase();
          if (label.includes('laser scanning') || value.includes('laser scanning') || desc.includes('laser scanning')) {
            logChange('metrology', `capabilities[]`, c.label || c.title || c.value, '[REMOVED ENTIRE ITEM]');
            return false;
          }
          return true;
        });
        if (svc.capabilities.length < before) {
          console.log(`  Removed ${before - svc.capabilities.length} capabilities item(s) about Laser Scanning`);
        }
      }

      // Now do text-level removal of laser scanning in remaining fields
      deepTransformStrings(svc, removeLaserScanning, `metrology`);
      for (const ptField of ptFields) {
        const ptVal = getNestedValue(svc, ptField);
        if (Array.isArray(ptVal)) transformPortableText(ptVal, removeLaserScanning, `metrology.${ptField}`);
      }
      if (Array.isArray(svc.services)) {
        for (const s of svc.services) {
          if (Array.isArray(s?.descriptionRich)) transformPortableText(s.descriptionRich, removeLaserScanning, `metrology.services[].descriptionRich`);
        }
      }

      // Update Zeiss accuracy
      if (Array.isArray(svc.capabilities)) {
        for (const cap of svc.capabilities) {
          const label = (cap.label || cap.title || '').toLowerCase();
          if (label.includes('zeiss')) {
            if (cap.value && !cap.value.includes('.00005')) {
              logChange('metrology', `capabilities[zeiss].value`, cap.value, '±0.00005"');
              cap.value = '±0.00005"';
            }
          }
        }
      }
      // Also check technicalSpecs for Zeiss
      if (Array.isArray(svc.technicalSpecs)) {
        for (const spec of svc.technicalSpecs) {
          const name = (spec.spec || '').toLowerCase();
          if (name.includes('zeiss')) {
            if (spec.value && !spec.value.includes('.00005')) {
              logChange('metrology', `technicalSpecs[zeiss].value`, spec.value, '±0.00005"');
              spec.value = '±0.00005"';
            }
          }
        }
      }

      // First Article Inspection: remove "material certificates", add "custom dimensional reports"
      if (Array.isArray(svc.services)) {
        for (const s of svc.services) {
          const title = (s.title || '').toLowerCase();
          if (title.includes('first article')) {
            // Remove material certificates from features
            if (Array.isArray(s.features)) {
              s.features = s.features.filter((f: any) => {
                const text = (f.feature || f.text || f || '').toString().toLowerCase();
                if (text.includes('material certificate')) {
                  logChange('metrology', `services[First Article].features`, text, '[REMOVED]');
                  return false;
                }
                return true;
              });
              // Add custom dimensional reports
              const hasCustomDim = s.features.some((f: any) =>
                ((f.feature || f.text || f || '').toString().toLowerCase()).includes('custom dimensional')
              );
              if (!hasCustomDim) {
                s.features.push({ feature: 'Custom dimensional reports', _key: `cdr_${Date.now()}` });
                logChange('metrology', `services[First Article].features`, '[NEW]', 'Custom dimensional reports');
              }
            }
            // Also check capabilities
            if (Array.isArray(s.capabilities)) {
              s.capabilities = s.capabilities.filter((c: any) => {
                const text = (c.capability || c || '').toString().toLowerCase();
                if (text.includes('material certificate')) {
                  logChange('metrology', `services[First Article].capabilities`, text, '[REMOVED]');
                  return false;
                }
                return true;
              });
              const hasCustomDim = s.capabilities.some((c: any) =>
                ((c.capability || c || '').toString().toLowerCase()).includes('custom dimensional')
              );
              if (!hasCustomDim) {
                s.capabilities.push({ capability: 'Custom dimensional reports', _key: `cdr2_${Date.now()}` });
                logChange('metrology', `services[First Article].capabilities`, '[NEW]', 'Custom dimensional reports');
              }
            }
          }
        }
      }

      // Final Inspection: remove "test results" from features/descriptions
      if (Array.isArray(svc.services)) {
        for (const s of svc.services) {
          const title = (s.title || '').toLowerCase();
          if (title.includes('final inspection')) {
            if (Array.isArray(s.features)) {
              const before = s.features.length;
              s.features = s.features.filter((f: any) => {
                const text = (f.feature || f.text || f || '').toString().toLowerCase();
                if (text.includes('test result')) {
                  logChange('metrology', `services[Final Inspection].features`, text, '[REMOVED]');
                  return false;
                }
                return true;
              });
            }
            // Remove from description text too
            if (typeof s.description === 'string') {
              const oldDesc = s.description;
              s.description = removePhrase(s.description, 'test results');
              if (oldDesc !== s.description) {
                logChange('metrology', `services[Final Inspection].description`, oldDesc, s.description);
              }
            }
          }
        }
      }

      // Remove "Incoming Inspection" entirely
      if (Array.isArray(svc.services)) {
        const before = svc.services.length;
        svc.services = svc.services.filter((s: any) => {
          const title = (s.title || '').toLowerCase();
          if (title.includes('incoming inspection')) {
            logChange('metrology', `services[Incoming Inspection]`, s.title, '[REMOVED ENTIRE ITEM]');
            return false;
          }
          return true;
        });
        if (svc.services.length < before) {
          console.log(`  Removed Incoming Inspection service item`);
        }
      }

      // Process "Setup" step: add "programming" to description or features
      if (Array.isArray(svc.process)) {
        for (const p of svc.process) {
          const title = (p.title || '').toLowerCase();
          if (title.includes('setup')) {
            if (typeof p.description === 'string' && !p.description.toLowerCase().includes('programming')) {
              const oldDesc = p.description;
              p.description = p.description + ' Includes programming and configuration.';
              logChange('metrology', `process[Setup].description`, oldDesc, p.description);
            }
            if (Array.isArray(p.features)) {
              const hasProgramming = p.features.some((f: any) =>
                ((f.feature || f || '').toString().toLowerCase()).includes('programming')
              );
              if (!hasProgramming) {
                p.features.push({ feature: 'Programming', _key: `prog_${Date.now()}` });
                logChange('metrology', `process[Setup].features`, '[NEW]', 'Programming');
              }
            }
          }
        }
      }

      // Add "medical" and "automotive" to applications scope
      if (Array.isArray(svc.applications)) {
        const existingTitles = svc.applications.map((a: any) => (a.title || '').toLowerCase());
        const appsToAdd = [
          { title: 'Medical', description: 'Precision measurement for medical device components.', _key: `met_med_${Date.now()}` },
          { title: 'Automotive', description: 'Inspection services for automotive precision parts.', _key: `met_auto_${Date.now() + 1}` },
        ];
        for (const app of appsToAdd) {
          if (!existingTitles.includes(app.title.toLowerCase())) {
            svc.applications.push(app);
            logChange('metrology', `applications[]`, '[NEW]', app.title);
          }
        }
      }
    }

    // ---- Engineering Support specific ----
    if (slug.includes('engineering')) {
      console.log('  Applying Engineering Support specific changes');

      // Remove DFM references -- order matters: remove compound phrases first
      const removeDFM = (t: string) => {
        let r = t;
        // Remove compound phrases first (longer patterns before shorter)
        r = r.replace(/design\s+for\s+manufacturability\s*\(DFM\)/gi, '');
        r = r.replace(/\(DFM\)/gi, '');
        r = removePhrase(r, 'DFM analysis');
        r = removePhrase(r, 'DFM Analysis');
        r = removePhrase(r, 'Design for Manufacturability');
        r = removePhrase(r, 'design for manufacturability');
        r = removePhrase(r, 'DFM/DFA');
        // Remove standalone DFM last (only as whole word)
        r = r.replace(/\bDFM\b/g, '');
        // Clean up
        r = r.replace(/\(\s*\)/g, '');
        r = r.replace(/\s{2,}/g, ' ');
        r = r.replace(/,\s*,/g, ',');
        r = r.replace(/^\s*,\s*/, '');
        r = r.replace(/\s*,\s*$/, '');
        r = r.replace(/\s+([.,;:])/g, '$1');
        return r.trim();
      };
      deepTransformStrings(svc, removeDFM, `engineering`);
      for (const ptField of ptFields) {
        const ptVal = getNestedValue(svc, ptField);
        if (Array.isArray(ptVal)) transformPortableText(ptVal, removeDFM, `engineering.${ptField}`);
      }
      if (Array.isArray(svc.services)) {
        for (const s of svc.services) {
          if (Array.isArray(s?.descriptionRich)) transformPortableText(s.descriptionRich, removeDFM, `engineering.services[].descriptionRich`);
        }
      }

      // Remove capabilities[] items with values "500+", "48 hour"/"48-hour"
      if (Array.isArray(svc.capabilities)) {
        const before = svc.capabilities.length;
        svc.capabilities = svc.capabilities.filter((c: any) => {
          const val = (c.value || '').toLowerCase();
          if (val.includes('500+') || val.includes('48 hour') || val.includes('48-hour')) {
            logChange('engineering', `capabilities[].value`, c.value, '[REMOVED ENTIRE ITEM]');
            return false;
          }
          return true;
        });
        if (svc.capabilities.length < before) {
          console.log(`  Removed ${before - svc.capabilities.length} capabilities with 500+ or 48-hour values`);
        }
      }

      // Rename "Design and Manufacturing" sections
      const renameDesignMfg = (t: string) => {
        if (!t || typeof t !== 'string') return t;
        return t.replace(/Design\s+and\s+Machining/gi, 'Engineering and Machining')
                .replace(/Design\s+and\s+Manufacturing/gi, 'Engineering and Machining')
                .replace(/Design\s+&\s+Machining/gi, 'Engineering & Machining')
                .replace(/Design\s+&\s+Manufacturing/gi, 'Engineering & Machining');
      };
      deepTransformStrings(svc, renameDesignMfg, `engineering.rename`);

      // Add "Key Creator" as a tool reference in capabilities or process
      let hasKeyCreator = false;
      if (Array.isArray(svc.capabilities)) {
        hasKeyCreator = svc.capabilities.some((c: any) =>
          ((c.label || c.value || c.description || '').toLowerCase()).includes('key creator')
        );
      }
      if (Array.isArray(svc.equipment)) {
        hasKeyCreator = hasKeyCreator || svc.equipment.some((e: any) =>
          ((e.name || e.details || '').toLowerCase()).includes('key creator')
        );
      }
      if (!hasKeyCreator) {
        if (Array.isArray(svc.equipment)) {
          svc.equipment.push({ name: 'Key Creator', details: 'CAD/CAM software for engineering support', _key: `kc_${Date.now()}` });
          logChange('engineering', `equipment[]`, '[NEW]', 'Key Creator');
        } else if (Array.isArray(svc.capabilities)) {
          svc.capabilities.push({ label: 'Key Creator', value: 'CAD/CAM', description: 'Engineering support software', _key: `kc_${Date.now()}` });
          logChange('engineering', `capabilities[]`, '[NEW]', 'Key Creator');
        }
      }

      // Remove "prototyping" from process[] items
      if (Array.isArray(svc.process)) {
        for (const p of svc.process) {
          if (typeof p.title === 'string' && p.title.toLowerCase().includes('prototyping')) {
            logChange('engineering', `process[].title`, p.title, '[REMOVED ENTIRE ITEM]');
          }
        }
        svc.process = svc.process.filter((p: any) => {
          const title = (p.title || '').toLowerCase();
          return !title.includes('prototyping');
        });
        // Also remove prototyping from features within process items
        for (const p of svc.process) {
          if (Array.isArray(p.features)) {
            p.features = p.features.filter((f: any) => {
              const text = (f.feature || f || '').toString().toLowerCase();
              if (text.includes('prototyping') || text.includes('prototype')) {
                logChange('engineering', `process[].features`, text, '[REMOVED]');
                return false;
              }
              return true;
            });
          }
          if (typeof p.description === 'string') {
            const old = p.description;
            p.description = removePhrase(p.description, 'prototyping');
            p.description = removePhrase(p.description, 'prototype');
            if (old !== p.description) logChange('engineering', `process[].description`, old, p.description);
          }
        }
      }

      // Remove "New product development" items from services/process
      if (Array.isArray(svc.services)) {
        svc.services = svc.services.filter((s: any) => {
          const title = (s.title || '').toLowerCase();
          if (title.includes('new product development')) {
            logChange('engineering', `services[].title`, s.title, '[REMOVED ENTIRE ITEM]');
            return false;
          }
          return true;
        });
      }
      if (Array.isArray(svc.process)) {
        svc.process = svc.process.filter((p: any) => {
          const title = (p.title || '').toLowerCase();
          if (title.includes('new product development')) {
            logChange('engineering', `process[].title`, p.title, '[REMOVED ENTIRE ITEM]');
            return false;
          }
          return true;
        });
      }

      // Remove "lead times" and "timelines" references
      const removeLeadTimes = (t: string) => {
        let r = t;
        r = removePhrase(r, 'lead times');
        r = removePhrase(r, 'lead time');
        r = removePhrase(r, 'timelines');
        r = removePhrase(r, 'timeline');
        return r;
      };
      deepTransformStrings(svc, removeLeadTimes, `engineering.leadtimes`);

      // Replace "design" -> "engineering" in contexts where IIS claims design capability
      // Be careful: only replace standalone "design" (not "customer design" etc.)
      // We do this selectively on specific fields rather than blindly
      const designFields = [
        'capabilitiesSectionHeading', 'capabilitiesSectionDescription',
        'servicesHeading', 'servicesDescription',
        'processHeading', 'processDescription',
      ];
      for (const f of designFields) {
        if (typeof svc[f] === 'string') {
          const old = svc[f];
          // Replace "Design Services" -> "Engineering Services", "Design Support" -> "Engineering Support"
          let newVal = old.replace(/\bDesign\s+Services\b/g, 'Engineering Services');
          newVal = newVal.replace(/\bDesign\s+Support\b/g, 'Engineering Support');
          newVal = newVal.replace(/\bdesign\s+services\b/g, 'engineering services');
          newVal = newVal.replace(/\bdesign\s+support\b/g, 'engineering support');
          newVal = newVal.replace(/\bOur\s+Design\b/g, 'Our Engineering');
          newVal = newVal.replace(/\bour\s+design\b/g, 'our engineering');
          if (old !== newVal) {
            svc[f] = newVal;
            logChange('engineering', f, old, newVal);
          }
        }
      }
    }

    // ---- Commit all changes for this service ----
    // We've been modifying the doc in-memory, now write it back
    // Build the update payload from the full modified document (excluding internal Sanity fields)
    const updateFields: Record<string, any> = {};
    const fieldsToUpdate = [
      'title', 'shortDescription', 'fullDescription', 'description',
      'hero', 'overview',
      'capabilities', 'services',
      'capabilitiesSectionHeading', 'capabilitiesSectionDescription',
      'servicesHeading', 'servicesDescription', 'servicesDescriptionRich',
      'applicationsHeading', 'applicationsDescription', 'applications',
      'materialsHeading', 'materialsDescription', 'materials',
      'qualityStandardsHeading', 'qualityStandardsDescription', 'qualityStandards',
      'processHeading', 'processDescription', 'process', 'processes',
      'equipment', 'technicalSpecs',
      'cta',
    ];
    for (const f of fieldsToUpdate) {
      if (svc[f] !== undefined) {
        updateFields[f] = svc[f];
      }
    }

    await commitPatch(svc._id, updateFields, `service: ${svc.title}`);
  }
}

// ---------------------------------------------------------------------------
// 4. INDUSTRIES PAGE
// ---------------------------------------------------------------------------

async function patchIndustriesPage() {
  logSection('4. INDUSTRIES PAGE');
  const doc = await client.fetch(`*[_type == "industriesPage"][0]`);
  if (!doc) {
    console.log('  Industries page not found!');
    return;
  }
  console.log(`  Found industries page: ${doc._id}`);

  // Remove "mission critical" / "mission-critical" from ALL text fields
  const removeMC = (t: string) => removePhrase(removePhrase(t, 'mission critical'), 'mission-critical');
  deepTransformStrings(doc, removeMC, 'industriesPage');

  // Replace manufacturing -> machining
  deepTransformStrings(doc, replaceManufacturing, 'industriesPage');

  // Find overviewStats item about "200+ programs" and disable it
  if (Array.isArray(doc.content?.overviewStats)) {
    for (const stat of doc.content.overviewStats) {
      const val = (stat.value || '').toLowerCase();
      const label = (stat.label || '').toLowerCase();
      if (val.includes('200') || label.includes('program')) {
        if (stat.enabled !== false) {
          logChange('industriesPage', `content.overviewStats[${stat._key}].enabled`, stat.enabled, false);
          stat.enabled = false;
        }
      }
    }
  }

  // Find whyChooseUs item "Program Management" and disable it
  if (Array.isArray(doc.content?.whyChooseUs)) {
    for (const item of doc.content.whyChooseUs) {
      const title = (item.title || '').toLowerCase();
      if (title.includes('program')) {
        if (item.enabled !== false) {
          logChange('industriesPage', `content.whyChooseUs[${item._key}].enabled`, item.enabled, false);
          item.enabled = false;
        }
      }
    }
  }

  // Build the update payload
  const updates: Record<string, any> = {};
  if (doc.hero) updates.hero = doc.hero;
  if (doc.content) updates.content = doc.content;
  if (doc.cta) updates.cta = doc.cta;
  if (doc.seo) updates.seo = doc.seo;

  await commitPatch(doc._id, updates, 'industries page');
}

// ---------------------------------------------------------------------------
// 5. ALL INDUSTRY DOCUMENTS
// ---------------------------------------------------------------------------

async function patchIndustries() {
  logSection('5. ALL INDUSTRY DOCUMENTS');
  const industries = await client.fetch(`*[_type == "industry"]{ ... }`);
  if (!industries || industries.length === 0) {
    console.log('  No industry documents found!');
    return;
  }
  console.log(`  Found ${industries.length} industry documents`);

  for (const ind of industries) {
    const slug = ind.slug?.current || '';
    console.log(`\n  --- Industry: ${ind.title} (${slug}) ---`);

    // Remove "mission critical" / "mission-critical"
    const removeMC = (t: string) => removePhrase(removePhrase(t, 'mission critical'), 'mission-critical');
    deepTransformStrings(ind, removeMC, `industry[${slug}]`);

    // Replace manufacturing -> machining
    deepTransformStrings(ind, replaceManufacturing, `industry[${slug}]`);

    // Handle Portable Text
    const ptFields = ['description', 'hero.descriptionRich', 'overview.descriptionRich'];
    for (const ptField of ptFields) {
      const ptVal = getNestedValue(ind, ptField);
      if (Array.isArray(ptVal)) {
        transformPortableText(ptVal, (t) => replaceManufacturing(removeMC(t)), `industry[${slug}].${ptField}`);
      }
    }

    // Build update payload
    const updateFields: Record<string, any> = {};
    const fieldsToUpdate = [
      'title', 'shortDescription', 'description',
      'hero', 'overview', 'statistics', 'stats',
      'expertiseSectionHeading', 'expertiseSectionDescription', 'expertise',
      'certificationsSectionHeading', 'certificationsSectionDescription', 'certifications',
      'marketOverview', 'capabilities', 'regulatory',
      'applications', 'components', 'qualityStandards',
      'processBenefitsSectionHeading', 'processBenefitsSectionDescription', 'processBenefits',
      'cta', 'features',
    ];
    for (const f of fieldsToUpdate) {
      if (ind[f] !== undefined) {
        updateFields[f] = ind[f];
      }
    }

    await commitPatch(ind._id, updateFields, `industry: ${ind.title}`);
  }
}

// ---------------------------------------------------------------------------
// 6. ABOUT PAGE
// ---------------------------------------------------------------------------

async function patchAboutPage() {
  logSection('6. ABOUT PAGE');
  const doc = await client.fetch(`*[_type == "about"][0]`);
  if (!doc) {
    console.log('  About page not found!');
    return;
  }
  console.log(`  Found about page: ${doc._id}`);

  // Disable ALL companyStats items
  if (Array.isArray(doc.companyStats)) {
    for (const stat of doc.companyStats) {
      if (stat.enabled !== false) {
        logChange('about', `companyStats[${stat._key}].enabled`, stat.enabled, false);
        stat.enabled = false;
      }
    }
  }

  // Replace manufacturing -> machining in values.items[].description
  if (doc.values?.items && Array.isArray(doc.values.items)) {
    for (const item of doc.values.items) {
      if (typeof item.description === 'string') {
        const old = item.description;
        item.description = replaceManufacturing(old);
        if (old !== item.description) {
          logChange('about', `values.items[].description`, old, item.description);
        }
      }
    }
  }

  // Replace manufacturing -> machining in all other text fields
  deepTransformStrings(doc, replaceManufacturing, 'about');

  // Build update
  const updates: Record<string, any> = {};
  const fieldsToUpdate = [
    'hero', 'companyStats', 'story', 'timeline', 'values',
    'capabilities', 'certifications', 'leadership', 'cta',
  ];
  for (const f of fieldsToUpdate) {
    if (doc[f] !== undefined) {
      updates[f] = doc[f];
    }
  }

  await commitPatch(doc._id, updates, 'about page');
}

// ---------------------------------------------------------------------------
// 7. CREATE NEW INDUSTRY PLACEHOLDERS
// ---------------------------------------------------------------------------

async function createIndustryPlaceholders() {
  logSection('7. CREATE NEW INDUSTRY PLACEHOLDERS');

  const newIndustries = [
    {
      _type: 'industry' as const,
      title: 'Medical',
      slug: { current: 'medical', _type: 'slug' },
      shortDescription: 'Precision machining and inspection services for medical device components requiring tight tolerances and full traceability.',
      published: false,
      order: 10,
      iconName: 'Heart',
      cardCtaText: 'Learn More',
    },
    {
      _type: 'industry' as const,
      title: 'Automotive',
      slug: { current: 'automotive', _type: 'slug' },
      shortDescription: 'High-precision machining and inspection for automotive components demanding consistent quality and rapid turnaround.',
      published: false,
      order: 11,
      iconName: 'Car',
      cardCtaText: 'Learn More',
    },
  ];

  for (const industry of newIndustries) {
    // Check if it already exists
    const existing = await client.fetch(
      `*[_type == "industry" && slug.current == $slug][0]{ _id, title }`,
      { slug: industry.slug.current }
    );

    if (existing) {
      console.log(`  Industry "${industry.title}" already exists (${existing._id}), skipping creation.`);
      continue;
    }

    logChange('new', `industry`, '[CREATE]', industry.title);

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would create industry: ${industry.title}`);
    } else {
      const created = await client.create(industry);
      console.log(`  [CREATED] Industry: ${industry.title} (${created._id})`);
    }
  }
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log(`  APPLY JEREMY'S FEEDBACK - Sanity CMS Patch Script`);
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no changes will be applied)' : 'LIVE (changes will be applied)'}`);
  console.log('='.repeat(70));

  try {
    await patchHomepage();
    await patchNavigation();
    await patchServices();
    await patchIndustriesPage();
    await patchIndustries();
    await patchAboutPage();
    await createIndustryPlaceholders();

    console.log('\n' + '='.repeat(70));
    console.log(`  SUMMARY`);
    console.log('='.repeat(70));
    console.log(`  Total changes detected: ${totalChanges}`);
    console.log(`  Mode: ${DRY_RUN ? 'DRY RUN - No changes were applied' : 'LIVE - All changes applied'}`);
    console.log('='.repeat(70) + '\n');
  } catch (error) {
    console.error('\nFATAL ERROR:', error);
    process.exit(1);
  }
}

main();
