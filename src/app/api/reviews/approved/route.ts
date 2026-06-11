import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { dataFile } from '@/lib/dataDir';

export const dynamic = 'force-dynamic';

/**
 * Legacy archive endpoint. Approved reviews now flow directly into
 * testimonials.json (see /api/admin/reviews); the public testimonials page
 * reads /api/testimonials only. Kept for back-compat / debugging.
 */
export async function GET() {
  try {
    const file = await dataFile('reviews-approved.json');
    return NextResponse.json(JSON.parse(await fs.readFile(file, 'utf-8')));
  } catch {
    return NextResponse.json([]);
  }
}
