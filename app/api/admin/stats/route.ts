import { NextResponse } from 'next/server';
import { Resource, Comment, Vote, AuditLog, User, Submission, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    await initDb();

    const [
      totalResources,
      totalUsers,
      publicCommentsCount,
      privateCommentsCount,
      publicVotesCount,
      privateVotesCount,
      pendingSubmissionsCount,
      totalSubmissionsCount,
      recentAuditLogs,
      topResources,
    ] = await Promise.all([
      Resource.count(),
      User.count(),
      Comment.count({ where: { isPrivate: false } }),
      Comment.count({ where: { isPrivate: true } }),
      Vote.count({ where: { isPrivate: false } }),
      Vote.count({ where: { isPrivate: true } }),
      Submission.count({ where: { status: 'pending' } }),
      Submission.count(),
      AuditLog.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
      }),
      Resource.findAll({
        order: [['score', 'DESC']],
        limit: 5,
        attributes: ['id', 'title', 'category', 'score', 'upvotesCount', 'downvotesCount'],
      }),
    ]);

    return NextResponse.json({
      metrics: {
        totalResources,
        totalUsers,
        publicCommentsCount,
        privateCommentsCount,
        totalComments: publicCommentsCount + privateCommentsCount,
        publicVotesCount,
        privateVotesCount,
        totalVotes: publicVotesCount + privateVotesCount,
        pendingSubmissionsCount,
        totalSubmissionsCount,
      },
      recentAuditLogs,
      topResources,
      adminUser: {
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err: any) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
