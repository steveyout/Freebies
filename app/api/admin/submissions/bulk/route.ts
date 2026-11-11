import { NextRequest, NextResponse } from 'next/server';
import { Submission, Resource, AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const { action, ids, reason } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No submission IDs provided' }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action. Must be approve or reject' }, { status: 400 });
    }

    const processed: string[] = [];

    for (const id of ids) {
      const submission = await Submission.findByPk(id);
      if (!submission) continue;

      if (action === 'approve') {
        if (submission.status !== 'approved') {
          // Generate unique resource ID
          const baseId = submission.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          let finalId = baseId;
          let counter = 1;
          while (await Resource.findByPk(finalId)) {
            finalId = `${baseId}-${counter}`;
            counter++;
          }

          const newResource = await Resource.create({
            id: finalId,
            title: submission.title,
            url: submission.url,
            description: submission.description,
            category: submission.category,
            subcategory: submission.subcategory,
            tags: submission.tags || [],
            safetyRating: 'Safe',
            score: 1,
            upvotesCount: 1,
            downvotesCount: 0,
            isStarred: false,
            isOpenSource: false,
            isNoAds: true,
            isNoReg: true,
            dateAdded: new Date().toISOString().split('T')[0],
            addedBy: submission.submitterName || 'community',
          });

          await submission.update({
            status: 'approved',
            reviewedBy: admin.username,
            reviewedAt: new Date(),
          });

          await AuditLog.create({
            adminUsername: admin.username,
            action: 'APPROVE_SUBMISSION',
            targetType: 'SUBMISSION',
            targetId: submission.id,
            details: `Bulk approved \"${submission.title}\" -> Created Resource \"${finalId}\"`,
          });

          broadcastSocketEvent('submission_approved', {
            id: submission.id,
            resourceId: finalId,
            title: submission.title,
          });
          broadcastSocketEvent('resource_created', newResource);
          processed.push(id);
        }
      } else if (action === 'reject') {
        if (submission.status !== 'rejected') {
          await submission.update({
            status: 'rejected',
            notes: reason || 'Bulk rejected by administrator.',
            reviewedBy: admin.username,
            reviewedAt: new Date(),
          });

          await AuditLog.create({
            adminUsername: admin.username,
            action: 'REJECT_SUBMISSION',
            targetType: 'SUBMISSION',
            targetId: submission.id,
            details: `Bulk rejected \"${submission.title}\". Reason: ${reason || 'None provided'}`,
          });

          broadcastSocketEvent('submission_rejected', {
            id: submission.id,
            title: submission.title,
            reason: reason || 'Bulk rejected by administrator.',
          });
          processed.push(id);
        }
      }
    }

    return NextResponse.json({
      success: true,
      processedCount: processed.length,
      action,
      message: `Successfully processed ${processed.length} submissions.`,
    });
  } catch (err: any) {
    console.error('Error in bulk submissions handler:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
