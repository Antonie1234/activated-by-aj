import crypto from 'crypto';
import type { NextRequest } from 'next/server';

// Server-only admin auth. The password can be overridden via env var without
// a code change; ADMIN_AUTH_SECRET should be set in production so the session
// token can't be derived from the (weaker) password alone.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'activated2026';
const ADMIN_SECRET   = process.env.ADMIN_AUTH_SECRET ?? 'activated-admin-secret-v1';

export const ADMIN_COOKIE = 'activated_admin_session';
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function sessionToken(): string {
  return crypto.createHmac('sha256', ADMIN_SECRET).update(ADMIN_PASSWORD).digest('hex');
}

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function makeSessionCookieValue(): string {
  return sessionToken();
}

// Constant-time compare so cookie checks don't leak timing information.
export function isAuthedRequest(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  const expected = sessionToken();
  const a = Buffer.from(cookie);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
