/**
 * Admin Reviews API
 * GET  /api/admin/reviews          → list pending reviews
 * POST /api/admin/reviews          → approve or reject a review
 *
 * NOTE: This endpoint has no authentication guard. It is intended for
 * internal use only and should be protected by server-level access
 * controls (IP allowlist / basic auth) before public deployment.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR      = path.join(process.cwd(), 'data');
const PENDING_FILE  = path.join(DATA_DIR, 'reviews-pending.json');
const APPROVED_FILE = path.join(DATA_DIR, 'reviews-approved.json');

interface Review {
  id: string;
  name: string;
  email: string;
  sport: string;
  rating: number;
  message: string;
  submittedAt: string;
  approvedAt?: string;
}

async function readJson(filePath: string): Promise<Review[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as Review[];
  } catch {
    return [];
  }
}

export async function GET() {
  const pending = await readJson(PENDING_FILE);
  return NextResponse.json(pending);
}

export async function POST(req: NextRequest) {
  try {
    const { id, action } = await req.json() as { id: string; action: 'approve' | 'reject' };

    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const pending = await readJson(PENDING_FILE);
    const idx = pending.findIndex((r) => r.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Review not found.' }, { status: 404 });
    }

    const [review] = pending.splice(idx, 1);

    if (action === 'approve') {
      const approved = await readJson(APPROVED_FILE);
      approved.push({ ...review, approvedAt: new Date().toISOString() });
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(APPROVED_FILE, JSON.stringify(approved, null, 2), 'utf-8');
    }

    await fs.writeFile(PENDING_FILE, JSON.stringify(pending, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/reviews]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
