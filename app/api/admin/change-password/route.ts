import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User, AuditLog, initDb } from '@/db/models';
import {
  getAuthenticatedAdmin,
  signToken,
  AUTH_COOKIE_NAME,
  getSecureCookieOptions,
  validatePasswordStrength,
  verifyCsrfOrigin,
} from '@/lib/auth';
import { checkRateLimit, resetRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    await initDb();

    // 1. Verify authenticated admin
    const adminSession = await getAuthenticatedAdmin();
    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized: Session expired or invalid' }, { status: 401 });
    }

    // 2. CSRF Origin Verification
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json({ error: 'Cross-site request blocked (CSRF validation failed)' }, { status: 403 });
    }

    const clientIp = getClientIp(req);
    const rateLimitKey = `change-pwd:${adminSession.id}`;

    // 3. Rate limiting (max 5 attempts per 15 minutes)
    const rateCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
    if (!rateCheck.isAllowed) {
      const waitMinutes = Math.ceil(rateCheck.resetInMs / 60000);
      return NextResponse.json(
        {
          error: `Too many password change attempts. Please wait ${waitMinutes} minute${waitMinutes > 1 ? 's' : ''} before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'New password and confirmation password do not match' },
        { status: 400 }
      );
    }

    // 4. Validate password complexity
    const strengthCheck = validatePasswordStrength(newPassword);
    if (!strengthCheck.isValid) {
      return NextResponse.json(
        { error: strengthCheck.message || 'Password does not meet security requirements' },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'New password cannot be the same as your current password' },
        { status: 400 }
      );
    }

    // 5. Query user from database to verify current password
    const user = await User.findByPk(adminSession.id);
    if (!user) {
      return NextResponse.json({ error: 'User record not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      await AuditLog.create({
        adminUsername: adminSession.username,
        action: 'ADMIN_PASSWORD_CHANGE_FAILED',
        targetType: 'USER',
        targetId: user.id,
        details: `Failed password change attempt: incorrect current password. IP: ${clientIp}`,
      });

      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // 6. Hash new password with 12 salt rounds
    const newHash = await bcrypt.hash(newPassword, 12);
    user.passwordHash = newHash;
    await user.save();

    // 7. Reset rate limit counter on success
    resetRateLimit(rateLimitKey);

    // 8. Log audit trail
    await AuditLog.create({
      adminUsername: adminSession.username,
      action: 'ADMIN_PASSWORD_CHANGED',
      targetType: 'USER',
      targetId: user.id,
      details: `Administrator password was successfully updated. IP: ${clientIp}`,
    });

    // 9. Issue new JWT token to keep session active
    const newToken = signToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Password updated successfully! Your administrative session has been refreshed.',
    });

    response.cookies.set(AUTH_COOKIE_NAME, newToken, getSecureCookieOptions());

    return response;
  } catch (err: any) {
    console.error('Password change error:', err);
    return NextResponse.json({ error: 'Internal server error while changing password' }, { status: 500 });
  }
}
