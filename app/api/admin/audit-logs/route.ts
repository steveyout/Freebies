import { NextResponse } from 'next/server';
import { AuditLog, initDb } from '@/db/models';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initDb();
    const logs = await AuditLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50,
    });

    return NextResponse.json({ logs });
  } catch (err: any) {
    console.error('Error fetching audit logs:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
