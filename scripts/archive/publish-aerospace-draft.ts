#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function publishDraft() {
  console.log('🚀 Publishing aerospace draft...\n');

  try {
    // Get the draft
    const draft = await client.fetch(`*[_id == "drafts.industry-1"][0]`);
    
    if (!draft) {
      console.log('❌ Draft not found');
      return;
    }

    console.log(`Found draft: ${draft.title}\n`);

    // Create published version by copying draft data
    const publishedId = draft._id.replace('drafts.', '');
    const { _id, _rev, ...draftData } = draft;

    await client.createOrReplace({
      ...draftData,
      _id: publishedId,
      _type: draft._type
    });

    console.log(`✅ Published as: ${publishedId}`);
    
    // Delete draft
    await client.delete(draft._id);
    console.log(`✅ Deleted draft`);
    
    console.log('\n🌐 View at: http://localhost:3000/industries/aerospace');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

publishDraft();
