import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User, AuditLog, initDb } from '@/db/models';
import { signToken, AUTH_COOKIE_NAME, getSecureCookieOptions } from '@/lib/auth';
import { checkRateLimit, resetRateLimit, getClientIp } from '@/lib/rateLimit';

// Dummy hash for constant-time comparison when user is not found to prevent timing attacks
const DUMMY_HASH = '$2a$12$e8nb/xV.Vd.G0f1PqV5v5.m7G1tJ/l5U1234567890abcdefghijk';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const clientIp = getClientIp(req);
    const ipRateLimitKey = `login:ip:${clientIp}`;

    // 1. Rate Limiting Check (5 attempts per 15 minutes)
    const rateCheck = checkRateLimit(ipRateLimitKey, 5, 15 * 60 * 1000);
    if (!rateCheck.isAllowed) {
      const waitMinutes = Math.ceil(rateCheck.resetInMs / 60000);
      return NextResponse.json(
        {
          error: `Too many failed login attempts. For security, your IP has been temporarily locked out. Please try again in ${waitMinutes} minute${waitMinutes > 1 ? 's' : ''}.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateCheck.resetInMs / 1000)),
          },
        }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      // Mitigate timing attack: execute dummy bcrypt compare
      await bcrypt.compare(password, DUMMY_HASH);

      // Record security audit log for unknown email attempt
      await AuditLog.create({
        adminUsername: normalizedEmail.slice(0, 32),
        action: 'ADMIN_LOGIN_FAILED',
        targetType: 'AUTH',
        targetId: null,
        details: `Login failed: user not found. IP: ${clientIp}`,
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      // Record security audit log for invalid password
      await AuditLog.create({
        adminUsername: user.username,
        action: 'ADMIN_LOGIN_FAILED',
        targetType: 'AUTH',
        targetId: user.id,
        details: `Login failed: incorrect password. IP: ${clientIp}`,
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator privileges required' },
        { status: 403 }
      );
    }

    // Reset rate limiter on successful authentication
    resetRateLimit(ipRateLimitKey);

    const token = signToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Record audit log
    await AuditLog.create({
      adminUsername: user.username,
      action: 'ADMIN_LOGIN_SUCCESS',
      targetType: 'AUTH',
      targetId: user.id,
      details: `Successful administrator authentication from IP: ${clientIp}`,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure cookie
    response.cookies.set(AUTH_COOKIE_NAME, token, getSecureCookieOptions());

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
