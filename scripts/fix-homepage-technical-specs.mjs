import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
});

async function fixTechnicalSpecs() {
  console.log('🔧 Fixing Homepage Technical Specs...\n');

  // The correct 8 technical specs from the original static site
  const correctSpecs = [
    {
      iconName: "Gauge",
      value: "±0.0001\"",
      label: "PRECISION",
      description: "Ultra-tight tolerances",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      iconName: "Cpu",
      value: "5-AXIS",
      label: "CNC CAPABILITY",
      description: "Simultaneous machining",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      iconName: "Shield",
      value: "AS9100D",
      label: "CERTIFIED",
      description: "Aerospace quality",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      iconName: "Activity",
      value: "99.73%",
      label: "FIRST PASS YIELD",
      description: "Quality rate",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      iconName: "Clock",
      value: "24/7",
      label: "PRODUCTION",
      description: "Continuous operation",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      iconName: "Target",
      value: "99.8%",
      label: "ON-TIME",
      description: "Delivery performance",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      iconName: "Zap",
      value: "30",
      label: "YEARS",
      description: "Manufacturing excellence",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      iconName: "Award",
      value: "ITAR",
      label: "REGISTERED",
      description: "Defense compliant",
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  try {
    // Update the homepage document
    const result = await client
      .patch('homepage')
      .set({ technicalSpecs: correctSpecs })
      .commit();

    console.log('✅ Successfully updated Technical Specs!');
    console.log(`   - Updated ${correctSpecs.length} specs`);
    correctSpecs.forEach((spec, i) => {
      console.log(`   [${i}] ${spec.iconName} - ${spec.value} ${spec.label}`);
    });

  } catch (error) {
    console.error('❌ Error updating Technical Specs:', error.message);
    throw error;
  }
}

fixTechnicalSpecs().catch(console.error);
