import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

const workspaceLibs = ['array', 'boolean', 'number', 'random', 'string', 'utility'] as const;

/** Specs that require a real browser; run via Playwright instead. */
const browserSpecs = [
  '**/from-fetch-with-progress.spec.ts',
  '**/from-readable-stream.spec.ts',
  '**/from-random-crypto.spec.ts',
  '**/from-uuid-v4.spec.ts',
];

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: 'rxjs-marbles/jest',
        replacement: path.resolve(__dirname, 'tools/rxjs-marbles-vitest.ts'),
      },
      {
        find: /^rxjs-marbles$/,
        replacement: path.resolve(__dirname, 'tools/rxjs-marbles-vitest.ts'),
      },
      ...workspaceLibs.map((lib) => ({
        find: `@rxjs-ninja/rxjs-${lib}`,
        replacement: path.resolve(__dirname, `libs/rxjs/${lib}/src/index.ts`),
      })),
    ],
  },
  test: {
    name: 'unit',
    globals: true,
    environment: 'node',
    include: [
      ...workspaceLibs.map((lib) => `libs/rxjs/${lib}/src/**/*.spec.ts`),
      'examples/**/*.spec.ts',
    ],
    exclude: [
      ...configDefaults.exclude,
      '**/dist/**',
      '**/coverage/**',
      'e2e/**',
      ...browserSpecs,
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      include: workspaceLibs.map((lib) => `libs/rxjs/${lib}/src/**/*.ts`),
      exclude: ['**/*.spec.ts', '**/index.ts'],
    },
  },
});
