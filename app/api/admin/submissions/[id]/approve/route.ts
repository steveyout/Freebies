import { NextRequest, NextResponse } from 'next/server';
import { Submission, Resource, AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';
import { appendResourceToMarkdown } from '@/lib/markdownSync';

export async function POST(
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
    const submission = await Submission.findByPk(id);

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    if (submission.status === 'approved') {
      return NextResponse.json({ error: 'This submission is already approved' }, { status: 400 });
    }

    // Generate safe unique resource ID
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

    // Create the resource in the directory
    const newResource = await Resource.create({
      id: finalId,
      title: submission.title,
      url: submission.url,
      description: submission.description,
      category: submission.category,
      subcategory: submission.subcategory,
      tags: submission.tags || [],
      safetyRating: 'Safe',
      score: 1, // Start with +1 seed vote
      upvotesCount: 1,
      downvotesCount: 0,
      isStarred: false,
      isOpenSource: false,
      isNoAds: true,
      isNoReg: true,
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: submission.submitterName || 'community',
    });

    // Update submission record
    await submission.update({
      status: 'approved',
      reviewedBy: admin.username,
      reviewedAt: new Date(),
    });

    // Audit log
    await AuditLog.create({
      adminUsername: admin.username,
      action: 'APPROVE_SUBMISSION',
      targetType: 'SUBMISSION',
      targetId: submission.id,
      details: `Approved "${submission.title}" (Type: ${submission.submissionType}) -> Created Resource "${finalId}"`,
    });

    // Automatically append to GitHub repository markdown file
    appendResourceToMarkdown({
      title: submission.title,
      url: submission.url,
      category: submission.category,
      subcategory: submission.subcategory,
      description: submission.description,
      safetyRating: 'Safe',
      isNoReg: true,
    });

    // Broadcast real-time events
    broadcastSocketEvent('submission_approved', {
      id: submission.id,
      resourceId: finalId,
      title: submission.title,
    });
    broadcastSocketEvent('resource_created', newResource);

    return NextResponse.json({
      success: true,
      message: `"${submission.title}" approved and published to directory!`,
      resource: newResource,
    });
  } catch (err: any) {
    console.error('Error approving submission:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
