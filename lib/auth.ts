import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@/db/models';

const JWT_SECRET = process.env.JWT_SECRET || 'freebies-super-secret-jwt-key-2026-secure';
export const AUTH_COOKIE_NAME = 'freebies_admin_token';

export interface AdminSessionUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
}

export function signToken(user: AdminSessionUser): string {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AdminSessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSessionUser;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminSessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'moderator')) {
    return null;
  }

  return decoded;
}

/**
 * Validates password complexity:
 * - At least 8 characters
 * - Max 128 characters
 * - Requires at least one letter and one number or special character
 */
export function validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Password cannot exceed 128 characters' };
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

  if (!hasLetter || !hasNumberOrSymbol) {
    return {
      isValid: false,
      message: 'Password must contain at least one letter and one number or symbol',
    };
  }

  return { isValid: true };
}

/**
 * Standard secure cookie configuration for administrative sessions
 */
export function getSecureCookieOptions(maxAgeSeconds: number = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

/**
 * Verifies that state-changing requests originate from the expected application host (CSRF protection)
 */
export function verifyCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!origin || !host) return true; // Direct API calls or tools without origin header

  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}
