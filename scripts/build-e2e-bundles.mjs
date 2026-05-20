#!/usr/bin/env node
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outdir = path.join(root, 'e2e/public');

const entries = [
  { in: 'e2e/entries/from-uuid-v4.ts', out: 'from-uuid-v4.js' },
  { in: 'e2e/entries/from-random-crypto.ts', out: 'from-random-crypto.js' },
  { in: 'e2e/entries/from-readable-stream.ts', out: 'from-readable-stream.js' },
  { in: 'e2e/entries/from-fetch-with-progress.ts', out: 'from-fetch-with-progress.js' },
];

fs.mkdirSync(outdir, { recursive: true });

for (const entry of entries) {
  await esbuild.build({
    entryPoints: [path.join(root, entry.in)],
    outfile: path.join(outdir, entry.out),
    bundle: true,
    format: 'iife',
    globalName: 'RxjsNinjaE2E',
    platform: 'browser',
    target: 'es2020',
    sourcemap: true,
    logLevel: 'info',
  });
}

console.log('E2E bundles written to e2e/public/');
