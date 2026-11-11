import { NextRequest, NextResponse } from 'next/server';
import { Submission, AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';

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
    const body = await req.json().catch(() => ({}));
    const { reason } = body;

    const submission = await Submission.findByPk(id);
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const rejectionNotes = reason
      ? `Rejected: ${reason}`
      : submission.notes || 'Submission rejected by moderation team.';

    await submission.update({
      status: 'rejected',
      notes: rejectionNotes,
      reviewedBy: admin.username,
      reviewedAt: new Date(),
    });

    await AuditLog.create({
      adminUsername: admin.username,
      action: 'REJECT_SUBMISSION',
      targetType: 'SUBMISSION',
      targetId: submission.id,
      details: `Rejected submission "${submission.title}". Reason: ${reason || 'N/A'}`,
    });

    broadcastSocketEvent('submission_rejected', {
      id: submission.id,
      title: submission.title,
    });

    return NextResponse.json({
      success: true,
      message: `Submission "${submission.title}" marked as rejected.`,
    });
  } catch (err: any) {
    console.error('Error rejecting submission:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
