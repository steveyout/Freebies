import { NextRequest, NextResponse } from 'next/server';
import { Submission, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'pending' | 'approved' | 'rejected' | 'all'
    const type = searchParams.get('type'); // 'ui' | 'github_pr' | 'all'
    const search = searchParams.get('search')?.toLowerCase().trim();

    const whereClause: any = {};
    if (status && status !== 'all') {
      whereClause.status = status;
    }
    if (type && type !== 'all') {
      whereClause.submissionType = type;
    }

    const [submissions, pendingCount, approvedCount, rejectedCount] = await Promise.all([
      Submission.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: 100,
      }),
      Submission.count({ where: { status: 'pending' } }),
      Submission.count({ where: { status: 'approved' } }),
      Submission.count({ where: { status: 'rejected' } }),
    ]);

    let filtered = submissions;
    if (search) {
      filtered = submissions.filter(s =>
        s.title.toLowerCase().includes(search) ||
        s.url.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.submitterName.toLowerCase().includes(search) ||
        (s.githubPrUrl && s.githubPrUrl.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      submissions: filtered,
      counts: {
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        total: pendingCount + approvedCount + rejectedCount,
      },
    });
  } catch (err: any) {
    console.error('Error fetching admin submissions:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
