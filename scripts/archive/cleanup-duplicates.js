import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function cleanupDuplicates() {
  console.log('🧹 Cleaning up duplicate aerospace documents...\n');

  // Keep: drafts.industry-1 (has all the updated content)
  // Delete: drafts.industry-aerospace (duplicate), industry-1 (old published)
  
  const toDelete = ['drafts.industry-aerospace', 'industry-1'];
  
  for (const id of toDelete) {
    try {
      await client.delete(id);
      console.log(`✅ Deleted: ${id}`);
    } catch (error) {
      console.log(`⚠️  Could not delete ${id}: ${error.message}`);
    }
  }
  
  // Publish the correct document
  try {
    const draftId = 'drafts.industry-1';
    const publishedId = 'industry-1';
    
    const doc = await client.getDocument(draftId);
    if (doc) {
      delete doc._id;
      await client.createOrReplace({ ...doc, _id: publishedId });
      console.log(`\n✅ Published drafts.industry-1 → industry-1`);
    }
  } catch (error) {
    console.log(`⚠️  Publishing error: ${error.message}`);
  }
  
  console.log('\n🎉 Cleanup complete!');
}

cleanupDuplicates();
