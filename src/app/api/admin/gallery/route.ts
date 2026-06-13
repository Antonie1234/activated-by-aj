/**
 * GET /api/admin/gallery
 * Reads gallery-order.json from Vercel Blob, merged with hardcoded
 * defaults so every sport key is always present.
 */
import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const dynamic = 'force-dynamic';

const DEFAULT: {
  photos: Record<string, string[]>;
  videos: Record<string, string[]>;
} = {
  photos: {
    tennis:     ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg'],
    padel:      [],
    pickleball: [],
    beach:      ['/gallery/beach-2.jpg', '/gallery/beach-1.jpg'],
    reflect:    [],
  },
  videos: {
    tennis: [], padel: [], pickleball: [], beach: [], general: [],
  },
};

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

export async function GET() {
  const saved = await readOrder();
  return NextResponse.json({
    photos: { ...DEFAULT.photos, ...(saved.photos ?? {}) },
    videos: { ...DEFAULT.videos, ...(saved.videos ?? {}) },
  });
}
