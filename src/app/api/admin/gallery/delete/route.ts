/**
 * POST /api/admin/gallery/delete
 * Body: { file: string, sport: string, mediaType: 'photo' | 'video' }
 * Deletes file from /public/gallery/ and removes from gallery-order.json.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isAuthedRequest } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

export async function POST(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { file, sport, mediaType } = await req.json() as {
      file: string; sport: string; mediaType: 'photo' | 'video';
    };

    if (!file || !sport || !mediaType) {
      return NextResponse.json({ error: 'Missing file, sport, or mediaType.' }, { status: 400 });
    }

    // Guard against path traversal
    const resolvedFile = path.resolve(process.cwd(), 'public', file.replace(/^\//, ''));
    if (!resolvedFile.startsWith(path.resolve(GALLERY_DIR))) {
      return NextResponse.json({ error: 'Invalid file path.' }, { status: 400 });
    }

    // Delete from filesystem (best-effort)
    try { await fs.unlink(resolvedFile); } catch { /* already gone */ }

    // Remove from gallery-order.json
    let order: { photos?: Record<string, string[]>; videos?: Record<string, string[]> } = {};
    try { order = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8')); } catch { /* no file yet */ }

    const bucket = mediaType === 'photo' ? 'photos' : 'videos';
    if (order[bucket]?.[sport]) {
      order[bucket]![sport] = order[bucket]![sport].filter((f) => f !== file);
    }

    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/gallery/delete]', err);
    return NextResponse.json({ error: 'Delete failed.' }, { status: 500 });
  }
}
