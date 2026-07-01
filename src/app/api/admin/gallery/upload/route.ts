/**
 * POST /api/admin/gallery/upload
 * Multipart: { files: File[] (or single 'file'), tab: string, mediaType: 'photo' | 'video' }
 * Saves each file to /public/gallery/<prefix><timestamp>-<n>.<ext>
 * Appends all srcs to gallery-order.json under photos[sport] or videos[sport].
 *
 * Note: the photos bucket accepts videos too — .mp4/.mov uploaded via the admin
 * Photos tab render as play-button tiles inside the public bento grid.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isAuthedRequest } from '@/lib/adminAuth';

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

// Photos bucket accepts images AND videos (videos become grid play tiles)
const PHOTO_EXTS = new Set(['jpg', 'jpeg', 'png', 'mp4', 'mov']);
const VIDEO_EXTS = new Set(['mp4', 'mov']);

export async function POST(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const formData  = await req.formData();
    const tab       = formData.get('tab')       as string | null;
    const mediaType = (formData.get('mediaType') as string | null) ?? 'photo';

    // Accept both multi ('files') and legacy single ('file') field names
    const files = [
      ...formData.getAll('files'),
      ...formData.getAll('file'),
    ].filter((f): f is File => f instanceof File);

    if (files.length === 0 || !tab) {
      return NextResponse.json({ error: 'Missing files or tab.' }, { status: 400 });
    }

    const allowed = mediaType === 'video' ? VIDEO_EXTS : PHOTO_EXTS;

    // Validate every file before saving any
    for (const file of files) {
      const ext = (file.name.split('.').pop() ?? '').toLowerCase();
      if (!allowed.has(ext)) {
        return NextResponse.json(
          { error: `File type .${ext} is not allowed (${file.name}).` },
          { status: 400 }
        );
      }
    }

    const sportKey = SPORT_KEY[tab] ?? tab.toLowerCase().replace(/\s+/g, '-');
    const prefix   = TAB_PREFIX[sportKey] ?? 'gallery-';

    await fs.mkdir(GALLERY_DIR, { recursive: true });

    // Save sequentially; index suffix prevents same-millisecond collisions
    const srcs: string[] = [];
    const stamp = Date.now();
    for (let i = 0; i < files.length; i++) {
      const ext      = (files[i].name.split('.').pop() ?? '').toLowerCase();
      const filename = `${prefix}${stamp}-${i}.${ext}`;
      await fs.writeFile(path.join(GALLERY_DIR, filename), Buffer.from(await files[i].arrayBuffer()));
      srcs.push(`/gallery/${filename}`);
    }

    // Update gallery-order.json
    let order: { photos?: Record<string, string[]>; videos?: Record<string, string[]> } = {};
    try { order = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8')); } catch { /* first run */ }

    const bucket = mediaType === 'video' ? 'videos' : 'photos';
    if (!order[bucket]) order[bucket] = {};
    if (!Array.isArray(order[bucket]![sportKey])) order[bucket]![sportKey] = [];
    order[bucket]![sportKey].push(...srcs);

    await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');

    return NextResponse.json({ success: true, srcs });
  } catch (err) {
    console.error('[POST /api/admin/gallery/upload]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
