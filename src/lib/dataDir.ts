/**
 * Resolves a writable data directory.
 * Prefers <project>/data; falls back to /tmp/activated-data on serverless
 * hosts (e.g. Vercel) where the project filesystem is read-only.
 *
 * Note: /tmp is ephemeral on serverless — data persists only per warm
 * instance. Fine as a crash-prevention fallback; a database is the proper
 * fix if the site moves to serverless hosting permanently.
 */
import fs from 'fs/promises';
import path from 'path';

let resolved: string | null = null;

export async function getDataDir(): Promise<string> {
  if (resolved) return resolved;

  const primary = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(primary, { recursive: true });
    // access() can report writable on read-only serverless mounts — do a real write
    const probe = path.join(primary, '.write-probe');
    await fs.writeFile(probe, 'ok');
    await fs.unlink(probe);
    resolved = primary;
  } catch {
    const fallback = path.join('/tmp', 'activated-data');
    await fs.mkdir(fallback, { recursive: true });
    resolved = fallback;
  }
  return resolved;
}

export async function dataFile(name: string): Promise<string> {
  return path.join(await getDataDir(), name);
}
