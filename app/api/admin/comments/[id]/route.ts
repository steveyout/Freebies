import { NextRequest, NextResponse } from 'next/server';
import { Comment, AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const { id } = await params;
    const body = await req.json();
    const { status, isPrivate } = body;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const updates: any = {};
    if (status && ['approved', 'pending', 'hidden'].includes(status)) {
      updates.status = status;
    }
    if (typeof isPrivate === 'boolean') {
      updates.isPrivate = isPrivate;
    }

    await comment.update(updates);

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'MODERATE_COMMENT',
      targetType: 'COMMENT',
      targetId: id,
      details: `Updated comment ${id}: status=${updates.status || comment.status}, isPrivate=${updates.isPrivate ?? comment.isPrivate}`,
    });

    broadcastSocketEvent('comment_moderated', {
      id: comment.id,
      resourceId: comment.resourceId,
      status: comment.status,
      isPrivate: comment.isPrivate,
    });

    return NextResponse.json({ success: true, comment });
  } catch (err: any) {
    console.error('Error updating comment:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const { id } = await params;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const resourceId = comment.resourceId;
    await comment.destroy();

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'DELETE_COMMENT',
      targetType: 'COMMENT',
      targetId: id,
      details: `Deleted comment from resource ${resourceId}`,
    });

    broadcastSocketEvent('comment_deleted', { id, resourceId });

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err: any) {
    console.error('Error deleting comment:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
