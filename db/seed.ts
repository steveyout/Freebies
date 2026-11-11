import bcrypt from 'bcryptjs';
import { sequelize, User, Resource, Comment, Vote, AuditLog, Submission, initDb } from './models';
import { getAllResources } from '@/lib/data';

export const PRESEEDED_ADMIN = {
  username: 'admin',
  email: 'admin@freebies.directory',
  password: 'Admin123!Secure',
  role: 'admin' as const,
};

export async function runDatabaseSeeders(): Promise<{ success: boolean; message: string }> {
  try {
    await initDb();

    // 1. Seed or update Admin User
    const existingAdmin = await User.findOne({ where: { email: PRESEEDED_ADMIN.email } });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(PRESEEDED_ADMIN.password, salt);

    if (!existingAdmin) {
      await User.create({
        username: PRESEEDED_ADMIN.username,
        email: PRESEEDED_ADMIN.email,
        passwordHash,
        role: PRESEEDED_ADMIN.role,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      });
      console.log('✅ Pre-seeded Administrator account created (admin@freebies.directory)');
    } else {
      await existingAdmin.update({ passwordHash, role: 'admin' });
      console.log('✅ Pre-seeded Administrator account credentials refreshed');
    }

    // 2. Seed Resources from static data
    const allStatic = getAllResources();
    let seededResourcesCount = 0;

    for (const item of allStatic) {
      const existing = await Resource.findByPk(item.id);
      if (!existing) {
        // Calculate initial scores based on starred / badges
        const initialUpvotes = item.isStarred ? 48 : 16;
        const initialDownvotes = item.isStarred ? 1 : 2;
        const initialScore = initialUpvotes - initialDownvotes;

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
          mirrorUrls: item.mirrorUrls || [],
          lastVerified: item.lastVerified || null,
          score: initialScore,
          upvotesCount: initialUpvotes,
          downvotesCount: initialDownvotes,
          isStarred: !!item.isStarred,
          isOpenSource: !!item.isOpenSource,
          isNoAds: !!item.isNoAds,
          isNoReg: !!item.isNoReg,
          dateAdded: item.dateAdded || new Date().toISOString().split('T')[0],
          addedBy: item.addedBy || 'community',
        });
        seededResourcesCount++;
      }
    }

    if (seededResourcesCount > 0) {
      console.log(`✅ Seeded ${seededResourcesCount} new resources into database`);
    }

    // 3. Seed Sample Public & Private Comments
    const commentCount = await Comment.count();
    if (commentCount === 0) {
      await Comment.create({
        resourceId: 'md-adblocking-ublock-origin',
        authorName: 'Alex Rivers',
        authorIp: '198.51.100.1',
        content: 'uBlock Origin is the single most important browser extension. Completely eliminates malvertising.',
        isPrivate: false,
        status: 'approved',
      });

      await Comment.create({
        resourceId: 'md-adblocking-ublock-origin',
        authorName: 'PrivacyAuditor',
        authorIp: '198.51.100.2',
        content: '[PRIVATE NOTE TO ADMIN] Firefox Manifest V3 transition verified: uBlock Origin continues to function with full webRequest API support.',
        isPrivate: true,
        status: 'approved',
      });

      console.log('✅ Seeded sample public and private comments');
    }

    // 4. Seed Sample Votes (with IP limits and private flags)
    const voteCount = await Vote.count();
    if (voteCount === 0) {
      await Vote.create({
        resourceId: 'md-adblocking-ublock-origin',
        ipAddress: '198.51.100.12',
        voteType: 'up',
        isPrivate: false,
      });

      await Vote.create({
        resourceId: 'md-adblocking-ublock-origin',
        ipAddress: '203.0.113.45',
        voteType: 'up',
        isPrivate: false,
      });

      await Vote.create({
        resourceId: 'md-adblocking-ublock-origin',
        ipAddress: '127.0.0.1',
        voteType: 'up',
        isPrivate: true,
      });

      console.log('✅ Seeded sample public and private votes');
    }

    // 5. Seed Sample Pending Submissions (UI & GitHub PR)
    const submissionCount = await Submission.count();
    if (submissionCount === 0) {
      // 1: Direct UI Submission
      await Submission.create({
        title: 'Kagi Search',
        url: 'https://kagi.com',
        description: 'Ad-free, privacy-focused search engine with custom bangs, domain lenses, and no telemetry.',
        category: 'adblocking',
        subcategory: 'Search & Navigation',
        tags: ['search', 'privacy', 'ad-free'],
        submissionType: 'ui',
        submitterName: 'DevContributor',
        submitterEmail: 'dev@example.org',
        submitterIp: '198.51.100.55',
        status: 'pending',
        notes: 'Submitted via directory web form. Great non-tracking search alternative.',
      });

      // 2: GitHub Pull Request Submission
      await Submission.create({
        title: 'LibreOffice',
        url: 'https://www.libreoffice.org',
        description: 'Clean, open-source office productivity suite compatible with Microsoft Word, Excel, and PowerPoint.',
        category: 'software',
        subcategory: 'Productivity & Office',
        tags: ['office', 'open-source', 'document'],
        submissionType: 'github_pr',
        submitterName: 'OpenSourceFan',
        submitterIp: '203.0.113.88',
        githubPrUrl: 'https://github.com/steveyout/Freebies/pull/42',
        status: 'pending',
        notes: 'Submitted via GitHub PR #42. Checked for malware and official GPG signatures.',
      });

      console.log('✅ Seeded sample pending submissions (UI and GitHub PR)');
    }

    // 6. Initial Audit Log
    const auditCount = await AuditLog.count();
    if (auditCount === 0) {
      await AuditLog.create({
        adminUsername: 'system',
        action: 'DATABASE_INITIALIZATION',
        targetType: 'SYSTEM',
        details: 'Initial database schema synchronization and pre-seeded admin credentials generated.',
      });
    }

    return { success: true, message: 'Database seeded successfully' };
  } catch (err: any) {
    console.error('Seeding error:', err);
    return { success: false, message: err.message };
  }
}
