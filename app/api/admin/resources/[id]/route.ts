import { NextRequest, NextResponse } from 'next/server';
import { Resource, AuditLog, initDb } from '@/db/models';
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

    const resource = await Resource.findByPk(id);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const updatableFields = [
      'title',
      'url',
      'description',
      'category',
      'subcategory',
      'tags',
      'safetyRating',
      'badge',
      'isStarred',
      'isOpenSource',
      'isNoAds',
      'isNoReg',
      'score',
      'upvotesCount',
      'downvotesCount',
    ];

    const updates: any = {};
    for (const key of updatableFields) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    // Recalculate score if counts were manually adjusted
    if (updates.upvotesCount !== undefined || updates.downvotesCount !== undefined) {
      const up = updates.upvotesCount ?? resource.upvotesCount;
      const down = updates.downvotesCount ?? resource.downvotesCount;
      updates.score = up - down;
    }

    await resource.update(updates);

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'UPDATE_RESOURCE',
      targetType: 'RESOURCE',
      targetId: id,
      details: `Updated fields: ${Object.keys(updates).join(', ')}`,
    });

    broadcastSocketEvent('resource_updated', resource);

    return NextResponse.json({ success: true, resource });
  } catch (err: any) {
    console.error('Error updating resource:', err);
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
    const resource = await Resource.findByPk(id);

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const title = resource.title;
    await resource.destroy();

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'DELETE_RESOURCE',
      targetType: 'RESOURCE',
      targetId: id,
      details: `Deleted resource "${title}" (${id})`,
    });

    broadcastSocketEvent('resource_deleted', { id });

    return NextResponse.json({ success: true, message: 'Resource deleted successfully' });
  } catch (err: any) {
    console.error('Error deleting resource:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
