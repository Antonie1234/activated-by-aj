import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR     = path.join(process.cwd(), 'data');
const PENDING_FILE = path.join(DATA_DIR, 'reviews-pending.json');

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
    const content = await fs.readFile(PENDING_FILE, 'utf-8');
    return JSON.parse(content) as Review[];
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

    await fs.mkdir(DATA_DIR, { recursive: true });

    const review: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      email,
      sport,
      rating,
      message,
      submittedAt: new Date().toISOString(),
    };

    const pending = await readPending();
    pending.push(review);
    await fs.writeFile(PENDING_FILE, JSON.stringify(pending, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/reviews]', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
