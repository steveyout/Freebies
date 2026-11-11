import { NextRequest, NextResponse } from 'next/server';
import { Vote, Resource, initDb } from '@/db/models';
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

    if (!resourceId) {
      return NextResponse.json({ error: 'resourceId is required' }, { status: 400 });
    }

    const ip = getClientIp(req);
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Check if this IP has a public vote
    const userPublicVote = await Vote.findOne({
      where: {
        resourceId,
        ipAddress: ip,
        isPrivate: false,
      },
    });

    // Check if this IP/client has a private vote
    const userPrivateVote = await Vote.findOne({
      where: {
        resourceId,
        ipAddress: ip,
        isPrivate: true,
      },
    });

    return NextResponse.json({
      resourceId,
      score: resource.score,
      upvotesCount: resource.upvotesCount,
      downvotesCount: resource.downvotesCount,
      publicVote: userPublicVote ? userPublicVote.voteType : null,
      privateVote: userPrivateVote ? userPrivateVote.voteType : null,
      clientIp: ip,
    });
  } catch (err: any) {
    console.error('Error fetching vote status:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    const { resourceId, voteType, isPrivate = false } = body;

    if (!resourceId || !voteType || !['up', 'down'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Valid resourceId and voteType (up/down) are required' },
        { status: 400 }
      );
    }

    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    const clientIp = getClientIp(req);
    const isPrivateVote = Boolean(isPrivate);

    let activeVoteType: 'up' | 'down' | null = voteType;

    if (!isPrivateVote) {
      // STRICT PUBLIC VOTE: Enforce 1 vote per IP address per resource
      const existingVote = await Vote.findOne({
        where: {
          resourceId,
          ipAddress: clientIp,
          isPrivate: false,
        },
      });

      if (existingVote) {
        if (existingVote.voteType === voteType) {
          // User clicked the same vote button -> Toggle vote off (retract)
          await existingVote.destroy();
          activeVoteType = null;
        } else {
          // User changed their vote from up to down or vice-versa
          await existingVote.update({ voteType });
          activeVoteType = voteType;
        }
      } else {
        // Create new public vote
        await Vote.create({
          resourceId,
          ipAddress: clientIp,
          voteType,
          isPrivate: false,
        });
      }

      // Recalculate dynamic community score & counts for this resource
      const [upCount, downCount] = await Promise.all([
        Vote.count({
          where: { resourceId, voteType: 'up', isPrivate: false },
        }),
        Vote.count({
          where: { resourceId, voteType: 'down', isPrivate: false },
        }),
      ]);

      const newScore = upCount - downCount;

      await resource.update({
        score: newScore,
        upvotesCount: upCount,
        downvotesCount: downCount,
      });

      // Broadcast real-time update to all active socket clients
      broadcastSocketEvent('vote_updated', {
        resourceId,
        score: newScore,
        upvotesCount: upCount,
        downvotesCount: downCount,
        voteType: activeVoteType,
        isPrivate: false,
      });

      return NextResponse.json({
        success: true,
        resourceId,
        score: newScore,
        upvotesCount: upCount,
        downvotesCount: downCount,
        activeVote: activeVoteType,
        isPrivate: false,
        message: activeVoteType
          ? `Public ${activeVoteType}vote recorded for IP ${clientIp}`
          : `Vote retracted for IP ${clientIp}`,
      });
    } else {
      // PRIVATE VOTE: Personal rating / private bookmark vote
      const existingPrivateVote = await Vote.findOne({
        where: {
          resourceId,
          ipAddress: clientIp,
          isPrivate: true,
        },
      });

      if (existingPrivateVote) {
        if (existingPrivateVote.voteType === voteType) {
          await existingPrivateVote.destroy();
          activeVoteType = null;
        } else {
          await existingPrivateVote.update({ voteType });
          activeVoteType = voteType;
        }
      } else {
        await Vote.create({
          resourceId,
          ipAddress: clientIp,
          voteType,
          isPrivate: true,
        });
      }

      // Broadcast private vote update event
      broadcastSocketEvent('vote_updated', {
        resourceId,
        score: resource.score,
        upvotesCount: resource.upvotesCount,
        downvotesCount: resource.downvotesCount,
        voteType: activeVoteType,
        isPrivate: true,
      });

      return NextResponse.json({
        success: true,
        resourceId,
        activeVote: activeVoteType,
        isPrivate: true,
        message: activeVoteType
          ? `Private ${activeVoteType}vote saved`
          : 'Private vote removed',
      });
    }
  } catch (err: any) {
    console.error('Vote processing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
