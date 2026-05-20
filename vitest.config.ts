import path from 'node:path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

const workspaceLibs = ['array', 'boolean', 'number', 'random', 'string', 'utility'] as const;

/** Specs that require a real browser; run via Playwright instead. */
const browserSpecs = [
  '**/from-fetch-with-progress.spec.ts',
  '**/from-readable-stream.spec.ts',
  '**/from-random-crypto.spec.ts',
  '**/from-uuid-v4.spec.ts',
];

export default defineConfig({
  plugins: [tsconfigPaths({ projects: [path.resolve(__dirname, 'tsconfig.base.json')] })],
  resolve: {
    alias: [
      {
        find: 'rxjs-marbles/jest',
        replacement: path.resolve(__dirname, 'tools/rxjs-marbles-vitest.ts'),
      },
      {
        find: /^rxjs-marbles$/,
        replacement: path.resolve(__dirname, 'tools/rxjs-marbles-vitest.ts'),
      },
    ],
  },
  test: {
    name: 'unit',
    globals: true,
    environment: 'node',
    include: workspaceLibs.map((lib) => `libs/rxjs/${lib}/src/**/*.spec.ts`),
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**', ...browserSpecs],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      include: ['libs/rxjs/**/src/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/index.ts'],
    },
  },
});
