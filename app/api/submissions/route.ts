import { NextRequest, NextResponse } from 'next/server';
import { Submission, Resource, AuditLog, initDb } from '@/db/models';
import { broadcastSocketEvent } from '@/lib/socketBroadcaster';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    const {
      title,
      url,
      description,
      category,
      subcategory,
      tags = [],
      submissionType = 'ui', // 'ui' | 'github_pr'
      submitterName = 'Community Contributor',
      submitterEmail = null,
      githubPrUrl = null,
      notes = null,
    } = body;

    if (!title || !url || !description || !category) {
      return NextResponse.json(
        { error: 'Title, URL, description, and category are required' },
        { status: 400 }
      );
    }

    const clientIp = getClientIp(req);

    // Check if a resource or pending submission already exists with this URL
    const existingResource = await Resource.findOne({ where: { url } });
    if (existingResource) {
      return NextResponse.json(
        { error: `This resource is already listed in the directory under "${existingResource.title}"` },
        { status: 409 }
      );
    }

    const existingPending = await Submission.findOne({
      where: { url, status: 'pending' },
    });
    if (existingPending) {
      return NextResponse.json(
        { error: 'A submission for this URL is already pending review by our team.' },
        { status: 409 }
      );
    }

    const newSubmission = await Submission.create({
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      category: category.trim(),
      subcategory: (subcategory || 'General').trim(),
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      submissionType: submissionType === 'github_pr' ? 'github_pr' : 'ui',
      submitterName: submitterName.trim() || 'Community Contributor',
      submitterEmail: submitterEmail ? submitterEmail.trim() : null,
      submitterIp: clientIp,
      githubPrUrl: githubPrUrl ? githubPrUrl.trim() : null,
      status: 'pending',
      notes: notes ? notes.trim() : null,
    });

    // Notify connected admin dashboards in real time
    broadcastSocketEvent('new_submission', newSubmission);

    return NextResponse.json(
      {
        success: true,
        submission: newSubmission,
        message:
          newSubmission.submissionType === 'github_pr'
            ? 'GitHub PR registered for expedited review. Our team will verify and merge.'
            : 'Thank you! Your resource has been submitted and queued for administrator review.',
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error in submission API:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
