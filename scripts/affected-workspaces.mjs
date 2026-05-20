#!/usr/bin/env node
/**
 * Lists affected workspace package names (e.g. "rxjs-array rxjs-string")
 * based on git changes since the given base ref.
 */
import { execSync } from 'node:child_process';

const base = process.argv[2] ?? 'origin/main';
const workspaceDirs = ['array', 'boolean', 'number', 'random', 'string', 'utility'];

let changedFiles = [];
try {
  changedFiles = execSync(`git diff --name-only ${base}`, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
} catch {
  changedFiles = [];
}

const affected = new Set();

for (const file of changedFiles) {
  for (const dir of workspaceDirs) {
    if (file.startsWith(`libs/rxjs/${dir}/`)) {
      affected.add(`rxjs-${dir}`);
    }
  }

  if (/^(package(-lock)?\.json|tsconfig\.base\.json|jest\.)/.test(file)) {
    for (const dir of workspaceDirs) {
      affected.add(`rxjs-${dir}`);
    }
  }
}

process.stdout.write([...affected].join(' '));
