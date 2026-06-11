import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import { dataFile } from '@/lib/dataDir';

export const dynamic = 'force-dynamic';

interface Review {
  id: string;
  name: string;
  email: string;
  sport: string;
  rating: number;
  message: string;
  submittedAt: string;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

async function readPending(): Promise<Review[]> {
  try {
    const file = await dataFile('reviews-pending.json');
    return JSON.parse(await fs.readFile(file, 'utf-8')) as Review[];
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name    = stripHtml(String(body.name    ?? '')).slice(0, 100);
    const email   = stripHtml(String(body.email   ?? '')).slice(0, 150);
    const sport   = stripHtml(String(body.sport   ?? '')).slice(0, 50);
    const message = stripHtml(String(body.message ?? '')).slice(0, 2000);
    const rating  = Math.min(5, Math.max(1, parseInt(String(body.rating ?? '5'), 10)));

    if (!name || !email || !sport || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: 'Your review is a little short — tell us more!' }, { status: 400 });
    }

    const review: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      email,
      sport,
      rating,
      message,
      submittedAt: new Date().toISOString(),
    };

    // dataFile() resolves a writable directory (project /data, or /tmp on
    // serverless hosts where the project filesystem is read-only)
    const pendingFile = await dataFile('reviews-pending.json');
    const pending = await readPending();
    pending.push(review);
    await fs.writeFile(pendingFile, JSON.stringify(pending, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/reviews]', err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.', detail },
      { status: 500 }
    );
  }
}
