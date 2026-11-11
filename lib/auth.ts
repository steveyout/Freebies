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
