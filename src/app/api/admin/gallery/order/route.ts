/**
 * POST /api/admin/gallery/order
 * Body: { mediaType: 'photo' | 'video', sport: string, order: string[] }
 * Saves the reordered file list for one sport into gallery-order.json.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

export async function POST(req: NextRequest) {
  try {
    const { mediaType, sport, order } = await req.json() as {
      mediaType: 'photo' | 'video'; sport: string; order: string[];
    };

    if (!mediaType || !sport || !Array.isArray(order)) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    let current: { photos?: Record<string, string[]>; videos?: Record<string, string[]> } = {};
    try { current = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8')); } catch { /* first run */ }

    const bucket = mediaType === 'photo' ? 'photos' : 'videos';
    if (!current[bucket]) current[bucket] = {};
    current[bucket]![sport] = order;

    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(ORDER_FILE, JSON.stringify(current, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/gallery/order]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
