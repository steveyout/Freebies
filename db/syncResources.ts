import { initDb, Resource } from './models';
import { getAllResources } from '../lib/data';

export async function syncResourcesToDatabase() {
  console.log('🔄 Starting safe production resource synchronization...');
  await initDb();

  const flatResources = getAllResources();
  console.log(`📦 Loaded ${flatResources.length} resources from markdown & source data`);

  const existingResources = await Resource.findAll({
    attributes: [
      'id',
      'url',
      'isStarred',
      'safetyRating',
      'badge',
      'isOpenSource',
      'isNoAds',
      'isNoReg',
    ],
  });

  const existingById = new Map<string, Resource>();
  const existingByUrl = new Map<string, Resource>();
  for (const res of existingResources) {
    existingById.set(res.id, res);
    if (res.url) {
      existingByUrl.set(res.url.toLowerCase(), res);
    }
  }

  let createdCount = 0;
  let updatedCount = 0;
  const toCreate: any[] = [];
  const today = new Date().toISOString().slice(0, 10);

  for (const item of flatResources) {
    try {
      const existing =
        existingById.get(item.id) ||
        (item.url ? existingByUrl.get(item.url.toLowerCase()) : undefined);

      if (existing) {
        // Safe merge: only update if not already synced recently, preserving votes, comments, stars, and DB-only resources
        // Skip heavy per-row updates for thousands of unchanged items unless starred/badge changed
        const nextStarred = item.isStarred ? true : existing.isStarred;
        if (nextStarred !== existing.isStarred) {
          await existing.update({ isStarred: nextStarred });
          updatedCount++;
        }
      } else {
        toCreate.push({
          id: item.id,
          title: item.title.slice(0, 255),
          url: item.url.slice(0, 512),
          description: item.description || item.title,
          category: item.category.slice(0, 64),
          subcategory: item.subcategory.slice(0, 128),
          tags: item.tags || [],
          safetyRating: (item.safetyRating || 'Safe').slice(0, 64),
          badge: item.badge ? item.badge.slice(0, 128) : null,
          score: 0,
          upvotesCount: 0,
          downvotesCount: 0,
          isStarred: Boolean(item.isStarred),
          isOpenSource: Boolean(item.isOpenSource),
          isNoAds: Boolean(item.isNoAds),
          isNoReg: Boolean(item.isNoReg),
          dateAdded: item.dateAdded || today,
          addedBy: (item.addedBy || 'fmhy-community').slice(0, 64),
        });
      }
    } catch (err) {
      console.error(`⚠️ Failed to prepare resource "${item.id}":`, err);
    }
  }

  // Batch insert new resources in chunks of 500
  const CHUNK_SIZE = 500;
  for (let i = 0; i < toCreate.length; i += CHUNK_SIZE) {
    const chunk = toCreate.slice(i, i + CHUNK_SIZE);
    try {
      await Resource.bulkCreate(chunk, { ignoreDuplicates: true });
      createdCount += chunk.length;
    } catch (err) {
      console.error(`⚠️ Failed to bulkCreate chunk at index ${i}:`, err);
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
