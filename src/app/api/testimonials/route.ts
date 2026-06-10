/**
 * GET /api/testimonials
 * Public read-only endpoint — returns data/testimonials.json
 * (managed via the admin Testimonials tab).
 */
import { NextResponse } from 'next/server';
import { readTestimonials } from '@/lib/testimonials';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await readTestimonials());
}
