import { NextRequest, NextResponse } from 'next/server';
import { Resource, AuditLog, Comment, Vote, initDb } from '@/db/models';
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
      return NextResponse.json({ error: 'No resource IDs provided' }, { status: 400 });
    }

    if (!['star', 'unstar', 'delete'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be star, unstar, or delete' }, { status: 400 });
    }

    if (action === 'star' || action === 'unstar') {
      const isStarred = action === 'star';
      await Resource.update(
        { isStarred },
        { where: { id: { [Op.in]: ids } } }
      );

      for (const id of ids) {
        broadcastSocketEvent('resource_updated', { id, isStarred });
      }

      await AuditLog.create({
        adminUsername: admin.username,
        action: 'BULK_UPDATE_RESOURCES',
        targetType: 'RESOURCE',
        details: `Bulk ${isStarred ? 'starred' : 'unstarred'} ${ids.length} resources: [${ids.slice(0, 5).join(', ')}${ids.length > 5 ? '...' : ''}]`,
      });

      return NextResponse.json({
        success: true,
        count: ids.length,
        action,
        message: `Successfully updated ${ids.length} resources.`,
      });
    }

    if (action === 'delete') {
      const resourcesToDelete = await Resource.findAll({
        where: { id: { [Op.in]: ids } },
        attributes: ['id', 'title'],
      });

      // Cleanup associated comments & votes
      await Promise.all([
        Comment.destroy({ where: { resourceId: { [Op.in]: ids } } }),
        Vote.destroy({ where: { resourceId: { [Op.in]: ids } } }),
        Resource.destroy({ where: { id: { [Op.in]: ids } } }),
      ]);

      for (const r of resourcesToDelete) {
        broadcastSocketEvent('resource_deleted', { id: r.id, title: r.title });
      }

      await AuditLog.create({
        adminUsername: admin.username,
        action: 'BULK_DELETE_RESOURCES',
        targetType: 'RESOURCE',
        details: `Bulk deleted ${resourcesToDelete.length} resources`,
      });

      return NextResponse.json({
        success: true,
        count: resourcesToDelete.length,
        action,
        message: `Successfully deleted ${resourcesToDelete.length} resources.`,
      });
    }

    return NextResponse.json({ error: 'Unhandled action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error in bulk resources handler:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
