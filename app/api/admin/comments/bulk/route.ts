import { NextRequest, NextResponse } from 'next/server';
import { Comment, AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';
import { Op } from 'sequelize';

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const { action, ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No comment IDs provided' }, { status: 400 });
    }

    if (!['approve', 'hide', 'delete'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be approve, hide, or delete' }, { status: 400 });
    }

    if (action === 'approve' || action === 'hide') {
      const status = action === 'approve' ? 'approved' : 'hidden';
      await Comment.update(
        { status },
        { where: { id: { [Op.in]: ids } } }
      );

      for (const id of ids) {
        broadcastSocketEvent('comment_moderated', { id, status });
      }

      await AuditLog.create({
        adminUsername: admin.username,
        action: 'BULK_MODERATE_COMMENTS',
        targetType: 'COMMENT',
        details: `Bulk marked ${ids.length} comments as ${status}`,
      });

      return NextResponse.json({
        success: true,
        count: ids.length,
        action,
        message: `Successfully set ${ids.length} comments to ${status}.`,
      });
    }

    if (action === 'delete') {
      const commentsToDelete = await Comment.findAll({
        where: { id: { [Op.in]: ids } },
        attributes: ['id', 'resourceId'],
      });

      await Comment.destroy({
        where: { id: { [Op.in]: ids } },
      });

      for (const c of commentsToDelete) {
        broadcastSocketEvent('comment_deleted', { id: c.id, resourceId: c.resourceId });
      }

      await AuditLog.create({
        adminUsername: admin.username,
        action: 'BULK_DELETE_COMMENTS',
        targetType: 'COMMENT',
        details: `Bulk deleted ${commentsToDelete.length} comments`,
      });

      return NextResponse.json({
        success: true,
        count: commentsToDelete.length,
        action,
        message: `Successfully deleted ${commentsToDelete.length} comments.`,
      });
    }

    return NextResponse.json({ error: 'Unhandled action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error in bulk comments handler:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
