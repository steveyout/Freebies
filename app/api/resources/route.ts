import { NextRequest, NextResponse } from 'next/server';
import { Resource, initDb } from '@/db/models';

export async function GET(req: NextRequest) {
  try {
    await initDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const starredOnly = searchParams.get('starred') === 'true';

    const whereClause: any = {};
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    if (starredOnly) {
      whereClause.isStarred = true;
    }

    const resources = await Resource.findAll({
      where: whereClause,
      order: [
        ['isStarred', 'DESC'],
        ['score', 'DESC'],
        ['title', 'ASC'],
      ],
    });

    return NextResponse.json({
      success: true,
      resources,
    });
  } catch (err: any) {
    console.error('Error fetching public resources:', err);
    return NextResponse.json({ success: false, resources: [] }, { status: 500 });
  }
}
