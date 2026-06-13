/**
 * POST /api/admin/gallery/delete
 * Body: { file: string, sport: string, mediaType: 'photo' | 'video' }
 * Deletes a blob from Vercel Blob storage and removes it from gallery-order.json.
 */
import { NextRequest, NextResponse } from 'next/server';
import { del, list, put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

async function readOrder(): Promise<{ photos: Record<string, string[]>; videos: Record<string, string[]> }> {
  try {
    const { blobs } = await list({ prefix: 'gallery-order.json' });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      if (res.ok) return await res.json();
    }
  } catch { /* fall through */ }
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
    const { file, sport, mediaType } = await req.json() as {
      file: string; sport: string; mediaType: 'photo' | 'video';
    };

    if (!file || !sport || !mediaType) {
      return NextResponse.json({ error: 'Missing file, sport, or mediaType.' }, { status: 400 });
    }

    // Delete from Vercel Blob (best-effort — file is a blob URL or local path)
    if (file.startsWith('https://')) {
      try { await del(file); } catch { /* already gone */ }
    }

    // Remove from order
    const order = await readOrder();
    const bucket = mediaType === 'photo' ? 'photos' : 'videos';
    if (order[bucket]?.[sport]) {
      order[bucket][sport] = order[bucket][sport].filter((f) => f !== file);
    }
    await writeOrder(order);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/gallery/delete]', err);
    return NextResponse.json({ error: 'Delete failed.' }, { status: 500 });
  }
}
