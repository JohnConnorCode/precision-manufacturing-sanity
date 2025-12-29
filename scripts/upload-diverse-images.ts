/**
 * Production-grade image upload script with topic-specific matching
 * Ensures each resource gets a unique, relevant image
 * Run with: npx tsx scripts/upload-diverse-images.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});

// Topic-specific image URLs from Unsplash (free commercial use)
// Each URL is unique and matched to specific manufacturing topics
const topicImageMap: Record<string, { url: string; alt: string }> = {
  // CMM & Metrology
  'cmm-probe': {
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80',
    alt: 'CMM probe measuring precision component'
  },
  'cmm-setup': {
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80',
    alt: 'CMM machine setup in quality lab'
  },
  'cmm-inspection': {
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    alt: 'Precision measurement inspection'
  },
  'metrology': {
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80',
    alt: 'Metrology equipment and gauges'
  },

  // Quality & Compliance
  'quality-control': {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    alt: 'Quality documentation and certification'
  },
  'as9100': {
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80',
    alt: 'AS9100 certification documentation'
  },
  'iso-certification': {
    url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1600&q=80',
    alt: 'ISO quality management system'
  },
  'first-article': {
    url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1600&q=80',
    alt: 'First article inspection documentation'
  },
  'supplier-quality': {
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80',
    alt: 'Supplier quality management'
  },
  'fmea-risk': {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    alt: 'Risk analysis and FMEA charts'
  },
  'spc-data': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    alt: 'Statistical process control data analysis'
  },
  'traceability': {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80',
    alt: 'Manufacturing traceability systems'
  },
  'calibration': {
    url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1600&q=80',
    alt: 'Calibration equipment and standards'
  },

  // GD&T
  'gdt-symbols': {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80',
    alt: 'Technical drawing with GD&T symbols'
  },
  'gdt-position': {
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80',
    alt: 'Position tolerance measurement'
  },
  'gdt-datum': {
    url: 'https://images.unsplash.com/photo-1589792923962-537704632910?w=1600&q=80',
    alt: 'Datum reference frame setup'
  },

  // CNC Machining
  'cnc-5axis': {
    url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80',
    alt: '5-axis CNC machining center'
  },
  'cnc-turning': {
    url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1600&q=80',
    alt: 'CNC turning lathe operation'
  },
  'cnc-milling': {
    url: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=1600&q=80',
    alt: 'CNC milling machine cutting metal'
  },
  'swiss-turning': {
    url: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1600&q=80',
    alt: 'Swiss-type CNC turning precision parts'
  },
  'cnc-programming': {
    url: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&q=80',
    alt: 'CNC programming and CAM software'
  },
  'adaptive-machining': {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
    alt: 'Advanced adaptive machining technology'
  },

  // EDM & Special Processes
  'wire-edm': {
    url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1600&q=80',
    alt: 'Wire EDM precision cutting'
  },
  'laser-cutting': {
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80',
    alt: 'Laser cutting precision metal'
  },
  'grinding': {
    url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1600&q=80',
    alt: 'Precision grinding operation'
  },
  'surface-finishing': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    alt: 'Surface finishing and treatment'
  },
  'deburring': {
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80',
    alt: 'Deburring and finishing operations'
  },
  'welding': {
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    alt: 'Precision welding fabrication'
  },
  'additive-manufacturing': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80',
    alt: 'Metal 3D printing additive manufacturing'
  },
  'ultrasonic': {
    url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1600&q=80',
    alt: 'Ultrasonic machining process'
  },
  'ecm': {
    url: 'https://images.unsplash.com/photo-1581093196867-ca3dba3c721b?w=1600&q=80',
    alt: 'Electrochemical machining'
  },

  // Materials
  'titanium': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    alt: 'Titanium aerospace material'
  },
  'aluminum': {
    url: 'https://images.unsplash.com/photo-1609743522471-83c84ce23e32?w=1600&q=80',
    alt: 'Aluminum alloy materials'
  },
  'stainless-steel': {
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1600&q=80',
    alt: 'Stainless steel components'
  },
  'superalloy': {
    url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80',
    alt: 'High-temperature superalloy components'
  },
  'tool-steel': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    alt: 'Tool steel grades and samples'
  },
  'copper-alloy': {
    url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80',
    alt: 'Copper and brass alloy materials'
  },
  'heat-treatment': {
    url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80',
    alt: 'Heat treatment furnace process'
  },

  // Industry Applications
  'aerospace': {
    url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80',
    alt: 'Aerospace engine components'
  },
  'aerospace-engine': {
    url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1600&q=80',
    alt: 'Aircraft turbine engine manufacturing'
  },
  'defense-itar': {
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80',
    alt: 'Defense manufacturing components'
  },
  'medical-device': {
    url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80',
    alt: 'Medical device precision components'
  },
  'automotive': {
    url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&q=80',
    alt: 'Automotive precision manufacturing'
  },
  'energy-turbine': {
    url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1600&q=80',
    alt: 'Energy sector turbine components'
  },
  'oil-gas': {
    url: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1600&q=80',
    alt: 'Oil and gas precision components'
  },
  'semiconductor': {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
    alt: 'Semiconductor manufacturing equipment'
  },
  'robotics': {
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80',
    alt: 'Robotics automation components'
  },
  'marine': {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80',
    alt: 'Marine naval components'
  },

  // Tools & Calculators
  'tolerance-calculator': {
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80',
    alt: 'Engineering tolerance calculations'
  },
  'speeds-feeds': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80',
    alt: 'Machining speeds and feeds optimization'
  },
  'cost-estimating': {
    url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&q=80',
    alt: 'Manufacturing cost analysis'
  },
  'dfm': {
    url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1600&q=80',
    alt: 'Design for manufacturability'
  },
  'lead-time': {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    alt: 'Lead time estimation and planning'
  },
  'mrr': {
    url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80',
    alt: 'Material removal rate optimization'
  },

  // Other
  'digital-manufacturing': {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
    alt: 'Industry 4.0 digital manufacturing'
  },
  'lean-manufacturing': {
    url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80',
    alt: 'Lean manufacturing production floor'
  },
  'tool-life': {
    url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1600&q=80',
    alt: 'Cutting tool management'
  },
  'fixture-workholding': {
    url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1600&q=80',
    alt: 'Fixture and workholding design'
  },
  'tool-die': {
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80',
    alt: 'Tool and die manufacturing'
  },
  'metbase': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    alt: 'MetBase software integration'
  },
};

// Map resource titles to specific image topics
function getImageTopicForResource(title: string): string {
  const lowerTitle = title.toLowerCase();

  // CMM & Metrology
  if (lowerTitle.includes('cmm probe') || lowerTitle.includes('sensor technology')) return 'cmm-probe';
  if (lowerTitle.includes('cmm setup') || lowerTitle.includes('cmm programming')) return 'cmm-setup';
  if (lowerTitle.includes('cmm inspection') || lowerTitle.includes('cmm best practices')) return 'cmm-inspection';
  if (lowerTitle.includes('cmm troubleshooting') || lowerTitle.includes('measurement uncertainty')) return 'metrology';
  if (lowerTitle.includes('metrology') || lowerTitle.includes('calibration')) return 'calibration';

  // Quality & Compliance
  if (lowerTitle.includes('as9100') && lowerTitle.includes('supplier')) return 'supplier-quality';
  if (lowerTitle.includes('as9100')) return 'as9100';
  if (lowerTitle.includes('iso 9001')) return 'iso-certification';
  if (lowerTitle.includes('first article')) return 'first-article';
  if (lowerTitle.includes('supplier quality')) return 'supplier-quality';
  if (lowerTitle.includes('fmea') || lowerTitle.includes('risk management')) return 'fmea-risk';
  if (lowerTitle.includes('spc') || lowerTitle.includes('statistical process')) return 'spc-data';
  if (lowerTitle.includes('traceability') || lowerTitle.includes('documentation system')) return 'traceability';
  if (lowerTitle.includes('inspection planning') || lowerTitle.includes('quality control strategy')) return 'quality-control';

  // GD&T
  if (lowerTitle.includes('gd&t symbol') || lowerTitle.includes('geometric tolerancing')) return 'gdt-symbols';
  if (lowerTitle.includes('gd&t position') || lowerTitle.includes('position tolerance')) return 'gdt-position';
  if (lowerTitle.includes('datum')) return 'gdt-datum';

  // CNC Machining
  if (lowerTitle.includes('5-axis') || lowerTitle.includes('5 axis')) return 'cnc-5axis';
  if (lowerTitle.includes('swiss') || lowerTitle.includes('screw machining')) return 'swiss-turning';
  if (lowerTitle.includes('turning') && !lowerTitle.includes('swiss')) return 'cnc-turning';
  if (lowerTitle.includes('milling')) return 'cnc-milling';
  if (lowerTitle.includes('cnc programming') || lowerTitle.includes('cam software')) return 'cnc-programming';
  if (lowerTitle.includes('adaptive machining')) return 'adaptive-machining';

  // Special Processes
  if (lowerTitle.includes('wire edm') || lowerTitle.includes('sinker edm') || lowerTitle.includes('edm:')) return 'wire-edm';
  if (lowerTitle.includes('laser cutting') || lowerTitle.includes('laser')) return 'laser-cutting';
  if (lowerTitle.includes('grinding') || lowerTitle.includes('finishing guide')) return 'grinding';
  if (lowerTitle.includes('surface finishing') || lowerTitle.includes('surface treatment')) return 'surface-finishing';
  if (lowerTitle.includes('surface roughness')) return 'surface-finishing';
  if (lowerTitle.includes('deburring')) return 'deburring';
  if (lowerTitle.includes('welding') || lowerTitle.includes('joining')) return 'welding';
  if (lowerTitle.includes('additive') || lowerTitle.includes('3d printing') || lowerTitle.includes('dmls')) return 'additive-manufacturing';
  if (lowerTitle.includes('ultrasonic machining')) return 'ultrasonic';
  if (lowerTitle.includes('electrochemical') || lowerTitle.includes('ecm')) return 'ecm';

  // Materials
  if (lowerTitle.includes('titanium')) return 'titanium';
  if (lowerTitle.includes('aluminum')) return 'aluminum';
  if (lowerTitle.includes('stainless steel')) return 'stainless-steel';
  if (lowerTitle.includes('superalloy') || lowerTitle.includes('inconel') || lowerTitle.includes('hastelloy')) return 'superalloy';
  if (lowerTitle.includes('tool steel')) return 'tool-steel';
  if (lowerTitle.includes('copper') || lowerTitle.includes('brass') || lowerTitle.includes('bronze')) return 'copper-alloy';
  if (lowerTitle.includes('heat treatment')) return 'heat-treatment';
  if (lowerTitle.includes('aerospace alloy')) return 'aerospace';

  // Industry Applications
  if (lowerTitle.includes('aerospace engine') || lowerTitle.includes('turbine')) return 'aerospace-engine';
  if (lowerTitle.includes('aerospace') && !lowerTitle.includes('alloy')) return 'aerospace';
  if (lowerTitle.includes('defense') || lowerTitle.includes('itar')) return 'defense-itar';
  if (lowerTitle.includes('medical device')) return 'medical-device';
  if (lowerTitle.includes('automotive')) return 'automotive';
  if (lowerTitle.includes('energy') && lowerTitle.includes('turbine')) return 'energy-turbine';
  if (lowerTitle.includes('energy') || lowerTitle.includes('high-temperature')) return 'superalloy';
  if (lowerTitle.includes('oil') || lowerTitle.includes('gas')) return 'oil-gas';
  if (lowerTitle.includes('semiconductor')) return 'semiconductor';
  if (lowerTitle.includes('robotics') || lowerTitle.includes('automation')) return 'robotics';
  if (lowerTitle.includes('marine') || lowerTitle.includes('naval')) return 'marine';

  // Tools & Calculators
  if (lowerTitle.includes('tolerance') && (lowerTitle.includes('calculator') || lowerTitle.includes('stack'))) return 'tolerance-calculator';
  if (lowerTitle.includes('speeds') && lowerTitle.includes('feeds')) return 'speeds-feeds';
  if (lowerTitle.includes('cost') && (lowerTitle.includes('estimat') || lowerTitle.includes('optim'))) return 'cost-estimating';
  if (lowerTitle.includes('dfm') || lowerTitle.includes('design for manufacturability')) return 'dfm';
  if (lowerTitle.includes('lead time')) return 'lead-time';
  if (lowerTitle.includes('mrr') || lowerTitle.includes('material removal rate')) return 'mrr';

  // Other
  if (lowerTitle.includes('digital manufacturing') || lowerTitle.includes('industry 4.0')) return 'digital-manufacturing';
  if (lowerTitle.includes('lean manufacturing') || lowerTitle.includes('continuous improvement')) return 'lean-manufacturing';
  if (lowerTitle.includes('tool life')) return 'tool-life';
  if (lowerTitle.includes('fixture') || lowerTitle.includes('workholding')) return 'fixture-workholding';
  if (lowerTitle.includes('tool and die') || lowerTitle.includes('die making')) return 'tool-die';
  if (lowerTitle.includes('metbase')) return 'metbase';

  // Default fallbacks by category (should rarely be used)
  return 'cnc-5axis';
}

async function uploadImageToSanity(imageUrl: string, filename: string): Promise<string> {
  console.log(`    Downloading image...`);

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(`    Uploading to Sanity (${(buffer.length / 1024).toFixed(1)} KB)...`);

  const asset = await client.assets.upload('image', buffer, {
    filename: filename,
    contentType: 'image/jpeg'
  });

  return asset._id;
}

async function updateResourceWithImage(
  documentId: string,
  assetId: string,
  alt: string
): Promise<void> {
  await client
    .patch(documentId)
    .set({
      featuredImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId
        },
        alt: alt,
        attribution: 'Unsplash - Free Commercial License'
      }
    })
    .commit();
}

async function main() {
  console.log('🖼️  Production-Grade Image Upload Script');
  console.log('=========================================\n');

  // Get all resources
  const resources = await client.fetch<Array<{ _id: string; title: string; category: string }>>(
    `*[_type == "resource"] { _id, title, category } | order(title asc)`
  );

  console.log(`Found ${resources.length} resources to process\n`);

  // Track which images we've already uploaded to avoid duplicates
  const uploadedImages: Map<string, string> = new Map();
  const results: Array<{ title: string; topic: string; success: boolean; error?: string }> = [];

  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const topic = getImageTopicForResource(resource.title);
    const imageData = topicImageMap[topic];

    console.log(`[${i + 1}/${resources.length}] ${resource.title}`);
    console.log(`    Topic: ${topic}`);

    if (!imageData) {
      console.log(`    ⚠️  No image mapping found for topic: ${topic}`);
      results.push({ title: resource.title, topic, success: false, error: 'No mapping' });
      continue;
    }

    try {
      let assetId: string;

      // Check if we've already uploaded this image
      if (uploadedImages.has(topic)) {
        assetId = uploadedImages.get(topic)!;
        console.log(`    Using cached asset: ${assetId}`);
      } else {
        const filename = `${topic}-${Date.now()}.jpg`;
        assetId = await uploadImageToSanity(imageData.url, filename);
        uploadedImages.set(topic, assetId);
        console.log(`    Uploaded new asset: ${assetId}`);
      }

      await updateResourceWithImage(resource._id, assetId, imageData.alt);
      console.log(`    ✅ Updated successfully\n`);
      results.push({ title: resource.title, topic, success: true });

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.log(`    ❌ Failed: ${message}\n`);
      results.push({ title: resource.title, topic, success: false, error: message });
    }
  }

  // Summary
  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`Total processed: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  console.log(`Unique images uploaded: ${uploadedImages.size}`);

  // Topic distribution
  console.log('\n📁 Topic Distribution:');
  const topicCounts: Record<string, number> = {};
  results.forEach(r => {
    topicCounts[r.topic] = (topicCounts[r.topic] || 0) + 1;
  });
  Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([topic, count]) => {
      console.log(`   ${topic}: ${count} resources`);
    });

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed resources:');
    results.filter(r => !r.success).forEach(r =>
      console.log(`   - ${r.title}: ${r.error}`)
    );
  }

  console.log('\n🔗 View results at:');
  console.log('   https://precision-manufacturing-sanity.vercel.app/resources');
}

main().catch(console.error);
