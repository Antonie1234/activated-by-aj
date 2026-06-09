/**
 * POST /api/admin/gallery/upload
 * Multipart form: { file: File, tab: string }
 * Saves to /public/gallery/<prefix><timestamp>.<ext>
 * Appends src to gallery-order.json for the given tab.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

const TAB_PREFIX: Record<string, string> = {
  Tennis:          'tennis-',
  Padel:           'padel-',
  Pickleball:      'pickleball-',
  'Beach Sports':  'beach-',
  'Reflect Motion':'reflect-',
};

const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'mp4', 'mov']);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get('file') as File | null;
    const tab      = formData.get('tab')  as string | null;

    if (!file || !tab) {
      return NextResponse.json({ error: 'Missing file or tab.' }, { status: 400 });
    }

    const ext = (file.name.split('.').pop() ?? '').toLowerCase();
    if (!ALLOWED_EXT.has(ext)) {
      return NextResponse.json({ error: `File type .${ext} is not allowed.` }, { status: 400 });
    }

    const prefix   = TAB_PREFIX[tab] ?? 'gallery-';
    const filename = `${prefix}${Date.now()}.${ext}`;

    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(path.join(GALLERY_DIR, filename), Buffer.from(await file.arrayBuffer()));

    const src = `/gallery/${filename}`;

    // Append to gallery-order.json
    let order: Record<string, string[]> = {};
    try { order = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8')); } catch { /* first run */ }
    if (!Array.isArray(order[tab])) order[tab] = [];
    order[tab].push(src);
    await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');

    return NextResponse.json({ success: true, src });
  } catch (err) {
    console.error('[POST /api/admin/gallery/upload]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
