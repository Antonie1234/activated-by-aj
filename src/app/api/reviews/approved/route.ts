import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const APPROVED_FILE = path.join(process.cwd(), 'data', 'reviews-approved.json');

export async function GET() {
  try {
    const content = await fs.readFile(APPROVED_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    // File doesn't exist yet — return empty array
    return NextResponse.json([]);
  }
}
