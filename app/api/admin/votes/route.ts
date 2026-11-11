import { NextRequest, NextResponse } from 'next/server';
import { Vote, Resource, AuditLog, initDb } from '@/db/models';
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
    const ip = searchParams.get('ip')?.trim();
    const resourceId = searchParams.get('resourceId')?.trim();

    const whereClause: any = {};
    if (ip) whereClause.ipAddress = ip;
    if (resourceId) whereClause.resourceId = resourceId;

    const votes = await Vote.findAll({
      where: whereClause,
      include: [
        {
          model: Resource,
          as: 'resource',
          attributes: ['id', 'title', 'category', 'score'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 200,
    });

    // Grouping summary by IP
    const ipMap = new Map<string, { ip: string; publicVotes: number; privateVotes: number; lastVoted: Date }>();
    for (const v of votes) {
      const cur = ipMap.get(v.ipAddress) || { ip: v.ipAddress, publicVotes: 0, privateVotes: 0, lastVoted: v.createdAt };
      if (v.isPrivate) cur.privateVotes++;
      else cur.publicVotes++;
      if (new Date(v.createdAt) > new Date(cur.lastVoted)) cur.lastVoted = v.createdAt;
      ipMap.set(v.ipAddress, cur);
    }

    return NextResponse.json({
      votes,
      ipAuditSummary: Array.from(ipMap.values()),
    });
  } catch (err: any) {
    console.error('Error in admin votes API:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const { ipAddress, resourceId, voteId } = body;

    if (!ipAddress && !resourceId && !voteId) {
      return NextResponse.json(
        { error: 'Provide at least one of ipAddress, resourceId, or voteId to delete' },
        { status: 400 }
      );
    }

    const whereClause: any = {};
    if (voteId) whereClause.id = voteId;
    if (ipAddress) whereClause.ipAddress = ipAddress;
    if (resourceId) whereClause.resourceId = resourceId;

    // Find affected resources to recalculate score after vote removal
    const affectedVotes = await Vote.findAll({ where: whereClause });
    const affectedResourceIds = Array.from(new Set(affectedVotes.map(v => v.resourceId)));

    const deletedCount = await Vote.destroy({ where: whereClause });

    // Recalculate scores for affected resources
    for (const rId of affectedResourceIds) {
      const [upCount, downCount] = await Promise.all([
        Vote.count({ where: { resourceId: rId, voteType: 'up', isPrivate: false } }),
        Vote.count({ where: { resourceId: rId, voteType: 'down', isPrivate: false } }),
      ]);
      const newScore = upCount - downCount;
      await Resource.update(
        { score: newScore, upvotesCount: upCount, downvotesCount: downCount },
        { where: { id: rId } }
      );

      broadcastSocketEvent('vote_updated', {
        resourceId: rId,
        score: newScore,
        upvotesCount: upCount,
        downvotesCount: downCount,
      });
    }

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'RESET_VOTES',
      targetType: 'VOTE',
      details: `Deleted ${deletedCount} vote records matching: ${JSON.stringify(whereClause)}`,
    });

    return NextResponse.json({
      success: true,
      deletedCount,
      affectedResources: affectedResourceIds,
    });
  } catch (err: any) {
    console.error('Error resetting votes:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
