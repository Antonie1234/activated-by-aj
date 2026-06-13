/**
 * POST /api/admin/gallery/upload
 * Multipart: { files: File[] (or single 'file'), tab: string, mediaType: 'photo' | 'video' }
 * Uploads each file to Vercel Blob and appends blob URLs to gallery-order.json (also in Blob).
 */
import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export const dynamic = 'force-dynamic';

const SPORT_KEY: Record<string, string> = {
  Tennis: 'tennis', Padel: 'padel', Pickleball: 'pickleball',
  'Beach Sports': 'beach', 'Reflect Motion': 'reflect', General: 'general',
};

const TAB_PREFIX: Record<string, string> = {
  tennis: 'tennis-', padel: 'padel-', pickleball: 'pickleball-',
  beach: 'beach-', reflect: 'reflect-', general: 'video-',
};

const ALLOWED_EXTS = new Set(['jpg', 'jpeg', 'png', 'mp4', 'mov']);

async function readOrder(): Promise<{ photos: Record<string, string[]>; videos: Record<string, string[]> }> {
  try {
    const { blobs } = await list({ prefix: 'gallery-order.json' });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      if (res.ok) return await res.json();
    }
  } catch { /* fall through to empty */ }
  return { photos: {}, videos: {} };
}

async function writeOrder(order: object): Promise<void> {
  await put('gallery-order.json', JSON.stringify(order, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    allowOverwrite: true,
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData  = await req.formData();
    const tab       = formData.get('tab') as string | null;
    const mediaType = (formData.get('mediaType') as string | null) ?? 'photo';

    const files = [
      ...formData.getAll('files'),
      ...formData.getAll('file'),
    ].filter((f): f is File => f instanceof File);

    if (files.length === 0 || !tab) {
      return NextResponse.json({ error: 'Missing files or tab.' }, { status: 400 });
    }

    for (const file of files) {
      const ext = (file.name.split('.').pop() ?? '').toLowerCase();
      if (!ALLOWED_EXTS.has(ext)) {
        return NextResponse.json(
          { error: `File type .${ext} is not allowed (${file.name}).` },
          { status: 400 }
        );
      }
    }

    const sportKey = SPORT_KEY[tab] ?? tab.toLowerCase().replace(/\s+/g, '-');
    const prefix   = TAB_PREFIX[sportKey] ?? 'gallery-';
    const stamp    = Date.now();
    const srcs: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const ext      = (files[i].name.split('.').pop() ?? '').toLowerCase();
      const filename = `gallery/${prefix}${stamp}-${i}.${ext}`;
      const blob     = await put(filename, files[i], { access: 'public', addRandomSuffix: false, allowOverwrite: true });
      srcs.push(blob.url);
    }

    const order = await readOrder();
    const bucket = mediaType === 'video' ? 'videos' : 'photos';
    if (!order[bucket]) order[bucket] = {};
    if (!Array.isArray(order[bucket][sportKey])) order[bucket][sportKey] = [];
    order[bucket][sportKey].push(...srcs);
    await writeOrder(order);

    return NextResponse.json({ success: true, srcs });
  } catch (err) {
    console.error('[POST /api/admin/gallery/upload]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
