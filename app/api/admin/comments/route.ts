import { NextRequest, NextResponse } from 'next/server';
import { Comment, Resource, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter'); // 'all' | 'public' | 'private' | 'pending'
    const search = searchParams.get('search')?.toLowerCase().trim();

    const whereClause: any = {};
    if (filter === 'public') {
      whereClause.isPrivate = false;
    } else if (filter === 'private') {
      whereClause.isPrivate = true;
    } else if (filter === 'pending') {
      whereClause.status = 'pending';
    }

    const comments = await Comment.findAll({
      where: whereClause,
      include: [
        {
          model: Resource,
          as: 'resource',
          attributes: ['id', 'title', 'category'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 150,
    });

    let filtered = comments;
    if (search) {
      filtered = comments.filter(c =>
        c.content.toLowerCase().includes(search) ||
        c.authorName.toLowerCase().includes(search) ||
        (c.authorIp && c.authorIp.includes(search)) ||
        c.resourceId.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ comments: filtered });
  } catch (err: any) {
    console.error('Error fetching admin comments:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
