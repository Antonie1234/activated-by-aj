/**
 * POST /api/admin/gallery/delete
 * Body: { file: string, tab: string }
 * Deletes the file from /public/gallery/ and removes it from gallery-order.json.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

export async function POST(req: NextRequest) {
  try {
    const { file, tab } = await req.json() as { file: string; tab: string };

    if (!file || !tab) {
      return NextResponse.json({ error: 'Missing file or tab.' }, { status: 400 });
    }

    // Prevent path traversal — only allow files inside /public/gallery/
    const resolvedFile = path.resolve(process.cwd(), 'public', file.replace(/^\//, ''));
    const resolvedDir  = path.resolve(GALLERY_DIR);
    if (!resolvedFile.startsWith(resolvedDir)) {
      return NextResponse.json({ error: 'Invalid file path.' }, { status: 400 });
    }

    // Delete from filesystem (best-effort — file may already be gone)
    try { await fs.unlink(resolvedFile); } catch { /* ignore */ }

    // Remove from gallery-order.json
    let order: Record<string, string[]> = {};
    try { order = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8')); } catch { /* no file yet */ }
    if (Array.isArray(order[tab])) {
      order[tab] = order[tab].filter((f) => f !== file);
    }
    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/gallery/delete]', err);
    return NextResponse.json({ error: 'Delete failed.' }, { status: 500 });
  }
}
