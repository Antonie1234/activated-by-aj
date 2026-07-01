/**
 * Admin Reviews API
 * GET  /api/admin/reviews → list pending reviews
 * POST /api/admin/reviews → approve or reject a review
 *
 * On approve, the review is automatically converted into a testimonial and
 * appended to testimonials.json, so it appears on the public /testimonials
 * page immediately — no manual step needed. It is also archived in
 * reviews-approved.json.
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import { dataFile } from '@/lib/dataDir';
import { isAuthedRequest } from '@/lib/adminAuth';
import {
  SPORT_META,
  makeInitials,
  makeId,
  readTestimonials,
  writeTestimonials,
} from '@/lib/testimonials';

export const dynamic = 'force-dynamic';

interface Review {
  id: string;
  name: string;
  email: string;
  sport: string;
  rating: number;
  message: string;
  submittedAt: string;
  approvedAt?: string;
}

async function readJsonList(name: string): Promise<Review[]> {
  try {
    const file = await dataFile(name);
    return JSON.parse(await fs.readFile(file, 'utf-8')) as Review[];
  } catch {
    return [];
  }
}

async function writeJsonList(name: string, data: Review[]): Promise<void> {
  const file = await dataFile(name);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }
  return NextResponse.json(await readJsonList('reviews-pending.json'));
}

export async function POST(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { id, action } = await req.json() as { id: string; action: 'approve' | 'reject' };

    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const pending = await readJsonList('reviews-pending.json');
    const idx = pending.findIndex((r) => r.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: 'Review not found.' }, { status: 404 });
    }

    const [review] = pending.splice(idx, 1);

    if (action === 'approve') {
      // 1. Append to public testimonials — name → name, sport → filter
      //    category, rating → stars, message → quote
      const meta = SPORT_META[review.sport] ?? SPORT_META.Other;
      const testimonials = await readTestimonials();
      testimonials.push({
        id:       makeId(),
        name:     review.name,
        initials: makeInitials(review.name),
        service:  meta.service,
        filter:   meta.filter,
        quote:    review.message,
        rating:   review.rating,
      });
      await writeTestimonials(testimonials);

      // 2. Archive in reviews-approved.json
      const approved = await readJsonList('reviews-approved.json');
      approved.push({ ...review, approvedAt: new Date().toISOString() });
      await writeJsonList('reviews-approved.json', approved);
    }

    await writeJsonList('reviews-pending.json', pending);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/admin/reviews]', err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Server error.', detail }, { status: 500 });
  }
}
