import { NextRequest, NextResponse } from 'next/server';
import { Resource, AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'score'; // 'score' | 'title' | 'createdAt'
    const order = searchParams.get('order') === 'asc' ? 'ASC' : 'DESC';
    const search = searchParams.get('search')?.toLowerCase().trim();

    const whereClause: any = {};
    if (category) {
      whereClause.category = category;
    }

    const resources = await Resource.findAll({
      where: whereClause,
      order: [[sortBy, order]],
    });

    let filtered = resources;
    if (search) {
      filtered = resources.filter(r =>
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        r.category.toLowerCase().includes(search) ||
        r.subcategory.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ resources: filtered });
  } catch (err: any) {
    console.error('Error in admin resources API:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const {
      id,
      title,
      url,
      description,
      category,
      subcategory,
      tags = [],
      safetyRating = 'Safe',
      badge = null,
      isStarred = false,
      isOpenSource = false,
      isNoAds = false,
      isNoReg = false,
    } = body;

    if (!title || !url || !description || !category || !subcategory) {
      return NextResponse.json(
        { error: 'Title, URL, description, category, and subcategory are required' },
        { status: 400 }
      );
    }

    const generatedId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await Resource.findByPk(generatedId);
    if (existing) {
      return NextResponse.json({ error: 'A resource with this ID already exists' }, { status: 409 });
    }

    const newResource = await Resource.create({
      id: generatedId,
      title,
      url,
      description,
      category,
      subcategory,
      tags: Array.isArray(tags) ? tags : [],
      safetyRating,
      badge,
      isStarred: Boolean(isStarred),
      isOpenSource: Boolean(isOpenSource),
      isNoAds: Boolean(isNoAds),
      isNoReg: Boolean(isNoReg),
      score: 0,
      upvotesCount: 0,
      downvotesCount: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: admin.username,
    });

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'CREATE_RESOURCE',
      targetType: 'RESOURCE',
      targetId: newResource.id,
      details: `Created new resource "${title}" in category "${category}"`,
    });

    broadcastSocketEvent('resource_created', newResource);

    return NextResponse.json({ success: true, resource: newResource }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating resource:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
