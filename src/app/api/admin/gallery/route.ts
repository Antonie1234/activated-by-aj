/**
 * GET /api/admin/gallery
 * Returns gallery-order.json merged with hardcoded defaults.
 * Upload and delete are handled by dedicated POST routes:
 *   /api/admin/gallery/upload
 *   /api/admin/gallery/delete
 */
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

const DEFAULT_ORDER: Record<string, string[]> = {
  Tennis:          ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg', '/gallery/video-3.mov'],
  Padel:           ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg',  '/gallery/video-2.mov'],
  Pickleball:      [],
  'Beach Sports':  ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg',  '/gallery/video-4.mov',  '/gallery/video-5.mov'],
  'Reflect Motion':[],
};

export async function GET() {
  let saved: Record<string, string[]> = {};
  try {
    saved = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8'));
  } catch { /* file not yet created — use defaults */ }

  return NextResponse.json({ ...DEFAULT_ORDER, ...saved });
}
