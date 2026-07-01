/**
 * GET /api/admin/gallery
 * Returns gallery-order.json with new nested photos/videos structure,
 * merged with hardcoded defaults so every key is always present.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isAuthedRequest } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

const ORDER_FILE = path.join(process.cwd(), 'public', 'gallery', 'gallery-order.json');

const DEFAULT: {
  photos: Record<string, string[]>;
  videos: Record<string, string[]>;
} = {
  photos: {
    tennis:     ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg'],
    padel:      ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg'],
    pickleball: [],
    beach:      ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg'],
    reflect:    [],
  },
  videos: {
    tennis: [], padel: [], pickleball: [], beach: [],
    general: ['/gallery/video-1.mp4', '/gallery/video-2.mp4', '/gallery/video-3.mp4', '/gallery/video-4.mp4', '/gallery/video-5.mp4', '/gallery/video-6.mp4'],
  },
};

export async function GET(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  let saved: typeof DEFAULT = { photos: {}, videos: {} };
  try {
    saved = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8'));
  } catch { /* file not yet created — use defaults */ }

  return NextResponse.json({
    photos: { ...DEFAULT.photos, ...(saved.photos ?? {}) },
    videos: { ...DEFAULT.videos, ...(saved.videos ?? {}) },
  });
}
