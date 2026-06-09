/**
 * POST /api/admin/gallery/order
 * Body: { tab: string, order: string[] }
 * Saves the new file order for one tab into gallery-order.json.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const ORDER_FILE  = path.join(GALLERY_DIR, 'gallery-order.json');

export async function POST(req: NextRequest) {
  try {
    const { tab, order } = await req.json() as { tab: string; order: string[] };

    if (!tab || !Array.isArray(order)) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    let current: Record<string, string[]> = {};
    try {
      current = JSON.parse(await fs.readFile(ORDER_FILE, 'utf-8'));
    } catch { /* file not yet created */ }

    current[tab] = order;
    await fs.mkdir(GALLERY_DIR, { recursive: true });
    await fs.writeFile(ORDER_FILE, JSON.stringify(current, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/gallery/order]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
