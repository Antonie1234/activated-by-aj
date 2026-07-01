/**
 * /api/admin/testimonials
 * GET    → list all testimonials (seeds data/testimonials.json on first run)
 * POST   → add a new testimonial
 * PUT    → edit an existing testimonial (by id in body)
 * DELETE → remove a testimonial (by id in body)
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  type Testimonial,
  SPORT_META,
  makeInitials,
  makeId,
  readTestimonials,
  writeTestimonials,
} from '@/lib/testimonials';
import { isAuthedRequest } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }
  return NextResponse.json(await readTestimonials());
}

export async function POST(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { name, sport, rating, quote } = await req.json() as {
      name: string; sport: string; rating: number; quote: string;
    };
    if (!name || !sport || !quote) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const meta = SPORT_META[sport] ?? SPORT_META.Other;
    const item: Testimonial = {
      id:       makeId(),
      name:     name.trim().slice(0, 100),
      initials: makeInitials(name),
      service:  meta.service,
      filter:   meta.filter,
      quote:    quote.trim().slice(0, 2000),
      rating:   Math.min(5, Math.max(1, Math.round(rating))),
    };
    const list = await readTestimonials();
    list.push(item);
    await writeTestimonials(list);
    return NextResponse.json({ success: true, testimonial: item });
  } catch (err) {
    console.error('[POST /api/admin/testimonials]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { id, name, sport, rating, quote } = await req.json() as {
      id: string; name: string; sport: string; rating: number; quote: string;
    };
    if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
    const meta = SPORT_META[sport] ?? SPORT_META.Other;
    const list = await readTestimonials();
    const idx  = list.findIndex(t => t.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    list[idx] = {
      ...list[idx],
      name:     name.trim().slice(0, 100),
      initials: makeInitials(name),
      service:  meta.service,
      filter:   meta.filter,
      quote:    quote.trim().slice(0, 2000),
      rating:   Math.min(5, Math.max(1, Math.round(rating))),
    };
    await writeTestimonials(list);
    return NextResponse.json({ success: true, testimonial: list[idx] });
  } catch (err) {
    console.error('[PUT /api/admin/testimonials]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthedRequest(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const { id } = await req.json() as { id: string };
    if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
    const list = await readTestimonials();
    await writeTestimonials(list.filter(t => t.id !== id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/admin/testimonials]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
