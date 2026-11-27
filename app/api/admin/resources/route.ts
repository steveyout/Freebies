import { NextRequest, NextResponse } from 'next/server';
import { Op } from 'sequelize';
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
    const starFilter = searchParams.get('starFilter'); // 'all' | 'super_starred' | 'starred'
    const sortBy = searchParams.get('sortBy') || 'score'; // 'score' | 'title' | 'createdAt'
    const order = searchParams.get('order') === 'asc' ? 'ASC' : 'DESC';
    const search = searchParams.get('search')?.trim();
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get('limit') || '50', 10) || 50));
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    if (starFilter === 'super_starred') {
      whereClause.isSuperStarred = true;
    } else if (starFilter === 'starred') {
      whereClause.isStarred = true;
    }
    if (search) {
      const likeTerm = `%${search}%`;
      whereClause[Op.or] = [
        { title: { [Op.like]: likeTerm } },
        { url: { [Op.like]: likeTerm } },
        { description: { [Op.like]: likeTerm } },
        { category: { [Op.like]: likeTerm } },
        { subcategory: { [Op.like]: likeTerm } },
      ];
    }

    const { rows: resources, count: total } = await Resource.findAndCountAll({
      where: whereClause,
      order: [
        ['isSuperStarred', 'DESC'],
        ['isStarred', 'DESC'],
        [sortBy, order],
        ['title', 'ASC'],
      ],
      limit,
      offset,
    });

    return NextResponse.json({
      resources,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
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
      isSuperStarred = false,
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
      isSuperStarred: Boolean(isSuperStarred),
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
