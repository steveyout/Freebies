import { NextRequest, NextResponse } from 'next/server';
import { AuditLog, initDb } from '@/db/models';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json().catch(() => ({}));
    const message = body.message || 'No message provided';

    await AuditLog.create({
      adminUsername: 'CI_DEPLOY',
      action: 'DEPLOY_DEBUG_LOG',
      targetType: 'SYSTEM',
      targetId: null,
      details: String(message).slice(0, 1000),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await initDb();
    const logs = await AuditLog.findAll({
      where: { adminUsername: 'CI_DEPLOY' },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    return NextResponse.json({ logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
