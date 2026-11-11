import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Socket.IO endpoint ready. Start with "pnpm dev" (node server.mjs) for full WebSocket support.',
  });
}
