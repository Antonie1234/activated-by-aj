/**
 * POST /api/admin/gallery/order
 * Body: { mediaType: 'photo' | 'video', sport: string, order: string[] }
 * Saves a reordered file list for one sport into gallery-order.json in Vercel Blob.
 */
import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

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
    const { mediaType, sport, order } = await req.json() as {
      mediaType: 'photo' | 'video'; sport: string; order: string[];
    };

    if (!mediaType || !sport || !Array.isArray(order)) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const current = await readOrder();
    const bucket  = mediaType === 'photo' ? 'photos' : 'videos';
    if (!current[bucket]) current[bucket] = {};
    current[bucket][sport] = order;
    await writeOrder(current);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/gallery/order]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
