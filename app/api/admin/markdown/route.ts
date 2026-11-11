import { NextRequest, NextResponse } from 'next/server';
import { getCategoryMarkdown, saveCategoryMarkdown } from '@/lib/markdownSync';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { syncResourcesToDatabase } from '@/db/syncResources';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const file = searchParams.get('file');

    const dataDir = path.join(process.cwd(), 'data');
    const allFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.md'));

    if (file) {
      const content = getCategoryMarkdown(file);
      if (content === null) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }
      return NextResponse.json({ file, content, files: allFiles });
    }

    return NextResponse.json({ files: allFiles });
  } catch (err: any) {
    console.error('Error fetching markdown files:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { action, file, content } = body;

    // 1. Save Markdown File Content directly
    if (action === 'save_file') {
      if (!file || typeof content !== 'string') {
        return NextResponse.json({ error: 'file and content are required' }, { status: 400 });
      }
      const saved = saveCategoryMarkdown(file, content);
      if (!saved) {
        return NextResponse.json({ error: 'Failed to write markdown file' }, { status: 500 });
      }

      // Automatically sync updated markdown file to database
      try {
        await syncResourcesToDatabase();
      } catch (e) {
        console.warn('Post-save sync warning:', e);
      }

      return NextResponse.json({ success: true, message: `Saved ${file} and synced database.` });
    }

    // 2. Trigger Full Markdown -> DB Resynchronization
    if (action === 'sync_all') {
      await syncResourcesToDatabase();
      return NextResponse.json({ success: true, message: 'All repository markdown files successfully synced to live database.' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error managing markdown sync:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
