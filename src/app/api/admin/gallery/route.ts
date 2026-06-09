/**
 * Admin Gallery API
 * GET    /api/admin/gallery             → current gallery-order.json (or defaults)
 * POST   /api/admin/gallery             → upload a file, append to order
 * DELETE /api/admin/gallery?file=&tab=  → delete a file, remove from order
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR  = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE   = path.join(GALLERY_DIR, 'gallery-order.json');

const TAB_PREFIX: Record<string, string> = {
  Tennis:          'tennis-',
  Padel:           'padel-',
  'Beach Sports':  'beach-',
  'Reflect Motion':'reflect-',
};

const DEFAULT_ORDER: Record<string, string[]> = {
  Tennis:          ['/gallery/tennis-4.jpg', '/gallery/tennis-1.jpg', '/gallery/tennis-3.jpg', '/gallery/tennis-2.jpg', '/gallery/tennis-5.jpg', '/gallery/video-3.mov'],
  Padel:           ['/gallery/padel-3.jpg',  '/gallery/padel-1.jpg',  '/gallery/padel-2.jpg',  '/gallery/padel-4.jpg',  '/gallery/video-2.mov'],
  'Beach Sports':  ['/gallery/beach-2.jpg',  '/gallery/beach-1.jpg',  '/gallery/video-4.mov',  '/gallery/video-5.mov'],
  'Reflect Motion': [], // managed entirely via admin uploads
};

async function readOrder(): Promise<Record<string, string[]>> {
  try {
    return JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8'));
  } catch {
    return { ...DEFAULT_ORDER };
  }
}

async function writeOrder(order: Record<string, string[]>) {
  await fs.mkdir(GALLERY_DIR, { recursive: true });
  await fs.writeFile(ORDER_FILE, JSON.stringify(order, null, 2), 'utf-8');
}

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET() {
  const order = await readOrder();
  // Merge with defaults so every tab is always present
  return NextResponse.json({ ...DEFAULT_ORDER, ...order });
}

// ── POST (upload) ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get('file') as File | null;
    const tab      = formData.get('tab')  as string | null;

    if (!file || !tab) {
      return NextResponse.json({ error: 'Missing file or tab.' }, { status: 400 });
    }

    const ext = (file.name.split('.').pop() ?? '').toLowerCase();
    const allowed = ['jpg', 'jpeg', 'png', 'mp4', 'mov'];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: `File type .${ext} is not allowed.` }, { status: 400 });
    }

    const prefix   = TAB_PREFIX[tab] ?? 'gallery-';
    const filename = `${prefix}${Date.now()}.${ext}`;
    const dest     = path.join(GALLERY_DIR, filename);

    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(dest, Buffer.from(await file.arrayBuffer()));

    const src   = `/gallery/${filename}`;
    const order = await readOrder();
    if (!order[tab]) order[tab] = [...(DEFAULT_ORDER[tab] ?? [])];
    order[tab].push(src);
    await writeOrder(order);

    return NextResponse.json({ success: true, src });
  } catch (err) {
    console.error('[POST /api/admin/gallery]', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');
  const tab  = searchParams.get('tab');

  if (!file || !tab) {
    return NextResponse.json({ error: 'Missing file or tab.' }, { status: 400 });
  }

  // Remove from filesystem (best-effort)
  try {
    await fs.unlink(path.join(process.cwd(), 'public', file));
  } catch { /* may already be gone */ }

  // Remove from order
  const order = await readOrder();
  if (order[tab]) {
    order[tab] = order[tab].filter((f) => f !== file);
  }
  await writeOrder(order);

  return NextResponse.json({ success: true });
}
