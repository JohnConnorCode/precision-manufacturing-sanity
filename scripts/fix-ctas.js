const TOKEN = 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr';
const PROJECT_ID = 'vgacjlhu';
const DATASET = 'production';

async function updateDoc(id, ctaData) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const mutations = [{ patch: { id, set: { cta: ctaData } } }];
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations })
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error?.description || 'Unknown error');
  return result;
}

// Service CTAs with their document IDs
const serviceCTAs = {
  '35a2dd2b-ea03-4c3d-94ac-783c58abf56e': { // 5-axis-machining
    name: '5-axis-machining',
    cta: {
      _type: 'object',
      headline: 'Ready for Complex Machining?',
      description: 'Partner with IIS for advanced 5-axis machining solutions that meet the most demanding aerospace and defense requirements.',
      buttonText: 'Get Technical Quote',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Services',
      secondaryButtonUrl: '/services'
    }
  },
  '38627f97-5bcd-4c27-a570-dfbd0b6df7e3': { // metrology
    name: 'metrology',
    cta: {
      _type: 'object',
      headline: 'Precision You Can Trust',
      description: 'Partner with our certified metrology lab for accurate measurements and comprehensive quality documentation.',
      buttonText: 'Request Inspection',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Services',
      secondaryButtonUrl: '/services'
    }
  },
  '6bf1b3c8-9166-4119-89e2-dd6efcd5fd33': { // adaptive-machining
    name: 'adaptive-machining',
    cta: {
      _type: 'object',
      headline: 'Experience Adaptive Manufacturing',
      description: 'Discover how our intelligent manufacturing systems can transform your production capabilities and quality outcomes.',
      buttonText: 'Schedule Demo',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Services',
      secondaryButtonUrl: '/services'
    }
  },
  '90cd7631-50b6-4966-b583-609f3180dab5': { // engineering
    name: 'engineering',
    cta: {
      _type: 'object',
      headline: 'Ready to Start Your Project?',
      description: 'Partner with our engineering team to transform your concepts into production-ready designs optimized for manufacturing success.',
      buttonText: 'Start Engineering Project',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Services',
      secondaryButtonUrl: '/services'
    }
  }
};

// Industry CTAs with their document IDs
const industryCTAs = {
  'industry-1': { // aerospace
    name: 'aerospace',
    cta: {
      _type: 'object',
      headline: 'Partner with Aerospace Experts',
      description: 'Trust your critical aerospace components to a proven manufacturing partner with decades of experience and industry-leading certifications.',
      buttonText: 'Request Aerospace Quote',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Industries',
      secondaryButtonUrl: '/industries'
    }
  },
  '907034f3-2fbc-4ff5-b007-8092f4b4b1b6': { // defense
    name: 'defense',
    cta: {
      _type: 'object',
      headline: 'Secure Defense Manufacturing Partner',
      description: 'Trust your most critical defense components to a proven partner with comprehensive security protocols and manufacturing excellence.',
      buttonText: 'Request Security Briefing',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Industries',
      secondaryButtonUrl: '/industries'
    }
  },
  'dd2cb0ac-1b6c-4e73-bcb7-f0ba4477cac6': { // energy
    name: 'energy',
    cta: {
      _type: 'object',
      headline: 'Power Your Energy Projects',
      description: 'Partner with us for reliable, high-quality components that keep energy systems running efficiently and safely.',
      buttonText: 'Request Energy Quote',
      buttonUrl: '/contact',
      secondaryButtonText: 'View All Industries',
      secondaryButtonUrl: '/industries'
    }
  }
};

async function main() {
  console.log('Updating Service CTAs...\n');
  for (const [id, data] of Object.entries(serviceCTAs)) {
    try {
      await updateDoc(id, data.cta);
      console.log(`✅ ${data.name}: "${data.cta.headline}"`);
    } catch (e) {
      console.error(`❌ ${data.name}:`, e.message);
    }
  }

  console.log('\nUpdating Industry CTAs...\n');
  for (const [id, data] of Object.entries(industryCTAs)) {
    try {
      await updateDoc(id, data.cta);
      console.log(`✅ ${data.name}: "${data.cta.headline}"`);
    } catch (e) {
      console.error(`❌ ${data.name}:`, e.message);
    }
  }

  console.log('\n✅ All CTAs updated!');
}

main();
