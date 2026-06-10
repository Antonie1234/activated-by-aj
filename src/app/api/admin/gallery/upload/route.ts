/**
 * POST /api/admin/gallery/upload
 * Multipart: { file: File, tab: string, mediaType: 'photo' | 'video' }
 * Saves to /public/gallery/<prefix><timestamp>.<ext>
 * Appends src to gallery-order.json under photos[sport] or videos[sport].
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

// Maps UI sport label → gallery-order.json key
const SPORT_KEY: Record<string, string> = {
  Tennis: 'tennis', Padel: 'padel', Pickleball: 'pickleball',
  'Beach Sports': 'beach', 'Reflect Motion': 'reflect', General: 'general',
};

// File prefix per sport
const TAB_PREFIX: Record<string, string> = {
  tennis: 'tennis-', padel: 'padel-', pickleball: 'pickleball-',
  beach: 'beach-', reflect: 'reflect-', general: 'video-',
};

const PHOTO_EXTS = new Set(['jpg', 'jpeg', 'png']);
const VIDEO_EXTS = new Set(['mp4', 'mov']);

export async function POST(req: NextRequest) {
  try {
    const formData  = await req.formData();
    const file      = formData.get('file')      as File   | null;
    const tab       = formData.get('tab')       as string | null;
    const mediaType = formData.get('mediaType') as string | null;

    if (!file || !tab || !mediaType) {
      return NextResponse.json({ error: 'Missing file, tab, or mediaType.' }, { status: 400 });
    }

    const ext     = (file.name.split('.').pop() ?? '').toLowerCase();
    const allowed = mediaType === 'photo' ? PHOTO_EXTS : VIDEO_EXTS;
    if (!allowed.has(ext)) {
      return NextResponse.json({ error: `File type .${ext} is not allowed for ${mediaType}s.` }, { status: 400 });
    }

    const sportKey = SPORT_KEY[tab] ?? tab.toLowerCase().replace(/\s+/g, '-');
    const prefix   = TAB_PREFIX[sportKey] ?? 'gallery-';
    const filename = `${prefix}${Date.now()}.${ext}`;

    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(path.join(GALLERY_DIR, filename), Buffer.from(await file.arrayBuffer()));

    const src = `/gallery/${filename}`;

    // Update gallery-order.json
    let order: { photos?: Record<string, string[]>; videos?: Record<string, string[]> } = {};
    try { order = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8')); } catch { /* first run */ }

    const bucket = mediaType === 'photo' ? 'photos' : 'videos';
    if (!order[bucket]) order[bucket] = {};
    if (!Array.isArray(order[bucket]![sportKey])) order[bucket]![sportKey] = [];
    order[bucket]![sportKey].push(src);

    await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');

    return NextResponse.json({ success: true, src });
  } catch (err) {
    console.error('[POST /api/admin/gallery/upload]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
