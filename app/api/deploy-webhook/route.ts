import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { AuditLog, initDb } from '@/db/models';

const VALID_SECRETS = [
  process.env.DEPLOY_SECRET,
  process.env.JWT_SECRET,
  'freebies-super-secret-jwt-key-2026-secure',
  'freebies-deploy-secret-2026-secure',
].filter(Boolean) as string[];

export async function POST(req: NextRequest) {
  try {
    const authHeader =
      req.headers.get('x-deploy-token') ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    if (!authHeader || !VALID_SECRETS.includes(authHeader)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid deployment token' }, { status: 401 });
    }

    await initDb();
    await AuditLog.create({
      adminUsername: 'CI_DEPLOY',
      action: 'DEPLOY_WEBHOOK_RECEIVED',
      targetType: 'SYSTEM',
      targetId: null,
      details: 'Automated deployment webhook received from GitHub Actions.',
    });

    const script = `
      export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$HOME/.local/share/pnpm:$HOME/.npm-global/bin:$PATH:/usr/local/bin:/usr/bin:/bin"
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" || true

      cd /home/steveyout/streaming/freebies
      git fetch origin main
      git reset --hard origin/main
      pnpm install
      node --env-file=.env ./node_modules/tsx/dist/cli.mjs db/syncResources.ts || true
      pnpm run build
      pm2 reload deploy/ecosystem.config.cjs --update-env || pm2 start deploy/ecosystem.config.cjs
      pm2 save
    `;

    const child = exec(script, {
      cwd: '/home/steveyout/streaming/freebies',
    });

    child.on('exit', async (code) => {
      try {
        await initDb();
        await AuditLog.create({
          adminUsername: 'CI_DEPLOY',
          action: code === 0 ? 'DEPLOY_SUCCESS' : 'DEPLOY_FAILED',
          targetType: 'SYSTEM',
          targetId: null,
          details: `Production build and PM2 reload exited with code ${code}`,
        });
      } catch (err) {
        console.error('Audit log recording error:', err);
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Continuous deployment triggered successfully. Compiling production bundle and reloading PM2.',
    });
  } catch (err: any) {
    console.error('Deploy webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
