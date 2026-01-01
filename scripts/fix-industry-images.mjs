import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skLaehQfFfLrgpLDIG9GowDoll5IVSOlYnDeClWSvf1YnxOv8qagKaumbsfwQPVfAIPyfVLXhdQ2n2bCy5Hcy6iV8UEJUsDACSBjgCj2IhB0OwxbOCf54guHePORR7pjJzUHtKh2D2fIcJWFxQSLinepk09UvQ3xlkR5V3mCHyTTuUMLLB7k'
});

// Image mappings by capability title keywords
const imageAssignments = {
  // Aerospace
  'Complex Aerospace Manufacturing': 'image-39d70f1ff7642af227f0648c98c454f74415636c-1536x1024-png', // aerospace components on CNC
  'Advanced Material Machining': 'image-2a122961ef2b11ad6e28d0007058e3687eb48d4e-1600x1067-jpg', // titanium
  'Sub-Assembly Integration': 'image-21a64aa81eb06febd7a23492b477b60edf92cdd3-1536x1024-png', // engineering/prototyping
  'Supply Chain Management': 'image-14d96e22960af1ea448bde1581a98a77dfaab7f1-1600x898-jpg', // traceability

  // Defense
  'ITAR Compliance': 'image-54867496067ffc47d58628711264a4b484656520-1600x1068-jpg', // as9100
  'Security Clearance': 'image-aaf823aef6a73946ee8edab6bf74867c5d4012a7-1600x1067-jpg', // supplier quality
  'Traceability Systems': 'image-14d96e22960af1ea448bde1581a98a77dfaab7f1-1600x898-jpg', // traceability
  'Quality Assurance': 'image-fa80076f1bf135bd340e7baf8b7f535d31f6ec53-1600x1067-jpg', // cmm-probe

  // Energy
  'High-Temperature Materials': 'image-3505e57b6e68a2a77f35c53f25f28114c5ecf147-1600x2400-jpg', // heat-treatment
  'Large Part Machining': 'image-e9216047695766365f92f24d895e9fd544130e30-1600x1067-jpg', // quality-5-axis-machining
  'API/ASME Compliance': 'image-9d4dc51467e89a7114d735be30f2657361332cb6-1600x1060-jpg', // iso-certification
  'Durability Testing': 'image-fb62f8a38505e5e9b46da086e9e68459b0be9e47-1600x1067-jpg', // spc-data
};

async function fixIndustryImages() {
  // Get all industries with their capabilities
  const industries = await client.fetch(`*[_type == 'industry'] {
    _id,
    title,
    capabilities[] {
      _key,
      title
    }
  }`);

  for (const industry of industries) {
    console.log(`\nUpdating ${industry.title}...`);

    if (!industry.capabilities || industry.capabilities.length === 0) {
      console.log('  No capabilities found');
      continue;
    }

    // Build patch for each capability
    for (let i = 0; i < industry.capabilities.length; i++) {
      const cap = industry.capabilities[i];
      const imageRef = imageAssignments[cap.title];

      if (!imageRef) {
        console.log(`  ${cap.title}: No image mapping found`);
        continue;
      }

      // Patch each capability's image
      await client
        .patch(industry._id)
        .set({
          [`capabilities[_key=="${cap._key}"].image`]: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef
            },
            alt: cap.title
          }
        })
        .commit();

      console.log(`  ✓ ${cap.title}: Image assigned`);
    }
  }

  console.log('\n=== ALL INDUSTRY IMAGES UPDATED ===');
}

fixIndustryImages().catch(console.error);
