import { initDb, Resource } from './models';
import { getAllResources } from '../lib/data';

export async function syncResourcesToDatabase() {
  console.log('🔄 Starting safe production resource synchronization...');
  await initDb();

  const flatResources = getAllResources();
  console.log(`📦 Loaded ${flatResources.length} resources from markdown & source data`);

  let createdCount = 0;
  let updatedCount = 0;

  for (const item of flatResources) {
    try {
      const existing = await Resource.findByPk(item.id);

      if (existing) {
        // Safe update: preserve existing votes & comments
        await existing.update({
          title: item.title,
          url: item.url,
          description: item.description,
          category: item.category,
          subcategory: item.subcategory,
          tags: item.tags || [],
          safetyRating: item.safetyRating || 'Safe',
          badge: item.badge || null,
          isOpenSource: Boolean(item.isOpenSource),
          isNoAds: Boolean(item.isNoAds),
          isNoReg: Boolean(item.isNoReg),
          // Keep existing isStarred unless item explicitly flagged
          isStarred: item.isStarred ? true : existing.isStarred,
        });
        updatedCount++;
      } else {
        // Insert new resource
        await Resource.create({
          id: item.id,
          title: item.title,
          url: item.url,
          description: item.description,
          category: item.category,
          subcategory: item.subcategory,
          tags: item.tags || [],
          safetyRating: item.safetyRating || 'Safe',
          badge: item.badge || null,
          score: 0,
          upvotesCount: 0,
          downvotesCount: 0,
          isStarred: Boolean(item.isStarred),
          isOpenSource: Boolean(item.isOpenSource),
          isNoAds: Boolean(item.isNoAds),
          isNoReg: Boolean(item.isNoReg),
          dateAdded: item.dateAdded || new Date().toISOString().slice(0, 10),
          addedBy: item.addedBy || 'community',
        });
        createdCount++;
      }
    } catch (err) {
      console.error(`⚠️ Failed to sync resource "${item.id}":`, err);
    }
  }

  console.log(`✅ Production database sync complete! Created: ${createdCount}, Updated: ${updatedCount}`);
}

// Execute directly if run via CLI
if (import.meta.url === `file://${process.argv[1]}`.replace(/\\/g, '/')) {
  syncResourcesToDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error during resource sync:', err);
      process.exit(1);
    });
}
