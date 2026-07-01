/**
 * /api/admin/login
 * POST   → verify password, set HttpOnly session cookie
 * GET    → check whether the current request already carries a valid session
 * DELETE → log out (clear the session cookie)
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  checkPassword,
  isAuthedRequest,
  makeSessionCookieValue,
} from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: isAuthedRequest(req) });
}

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' })) as { password?: string };

  if (!password || !checkPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, makeSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
