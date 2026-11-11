import { NextRequest, NextResponse } from 'next/server';
import { Comment, Resource, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

export async function GET(req: NextRequest) {
  try {
    await initDb();
    const { searchParams } = new URL(req.url);
    const resourceId = searchParams.get('resourceId');
    const admin = await getAuthenticatedAdmin();

    const whereClause: any = {};
    if (resourceId) {
      whereClause.resourceId = resourceId;
    }

    if (!admin) {
      // Public visitors only see approved public comments
      whereClause.isPrivate = false;
      whereClause.status = 'approved';
    }

    const comments = await Comment.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: 100,
    });

    return NextResponse.json({
      comments: comments.map(c => ({
        id: c.id,
        resourceId: c.resourceId,
        authorName: c.authorName,
        content: c.content,
        isPrivate: c.isPrivate,
        status: c.status,
        createdAt: c.createdAt,
        // IP is only shown to administrators
        authorIp: admin ? c.authorIp : undefined,
      })),
      isAdmin: Boolean(admin),
    });
  } catch (err: any) {
    console.error('Error fetching comments:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    const { resourceId, authorName, content, isPrivate = false } = body;

    if (!resourceId || !content || !content.trim()) {
      return NextResponse.json(
        { error: 'Resource ID and comment content are required' },
        { status: 400 }
      );
    }

    // Verify resource exists
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const clientIp = getClientIp(req);
    const sanitizedAuthor = (authorName || '').trim() || 'Anonymous Contributor';
    const sanitizedContent = content.trim();

    const newComment = await Comment.create({
      resourceId,
      authorName: sanitizedAuthor.slice(0, 64),
      authorIp: clientIp,
      content: sanitizedContent,
      isPrivate: Boolean(isPrivate),
      status: 'approved',
    });

    // Broadcast new comment event to real-time clients
    broadcastSocketEvent('new_comment', {
      id: newComment.id,
      resourceId: newComment.resourceId,
      authorName: newComment.authorName,
      content: newComment.content,
      isPrivate: newComment.isPrivate,
      status: newComment.status,
      createdAt: newComment.createdAt,
    });

    return NextResponse.json(
      {
        success: true,
        comment: {
          id: newComment.id,
          resourceId: newComment.resourceId,
          authorName: newComment.authorName,
          content: newComment.content,
          isPrivate: newComment.isPrivate,
          status: newComment.status,
          createdAt: newComment.createdAt,
        },
        message: newComment.isPrivate
          ? 'Your private note was securely delivered to the admin team.'
          : 'Your public comment was published successfully.',
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error creating comment:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
