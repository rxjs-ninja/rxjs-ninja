# RxJS Ninja — agent guide

## Monorepo layout

This repo uses **npm workspaces** (`libs/rxjs/*`). Each package is published independently under `@rxjs-ninja/*`.

| Workspace | Path |
|-----------|------|
| `@rxjs-ninja/rxjs-array` | `libs/rxjs/array` |
| `@rxjs-ninja/rxjs-boolean` | `libs/rxjs/boolean` |
| `@rxjs-ninja/rxjs-number` | `libs/rxjs/number` |
| `@rxjs-ninja/rxjs-random` | `libs/rxjs/random` |
| `@rxjs-ninja/rxjs-string` | `libs/rxjs/string` |
| `@rxjs-ninja/rxjs-utility` | `libs/rxjs/utility` |

## Commands

```bash
npm install --legacy-peer-deps
npm run build
npm test                    # Vitest unit tests (all workspaces)
npm run test:cov            # Vitest with coverage
npm run build:e2e           # Bundle browser test runners
npm run test:browser        # Playwright tests in Chrome
npm run test:all            # Vitest + Playwright
npm run lint
```

Single package (from repo root):

```bash
npx vitest run libs/rxjs/array
npm run test -w @rxjs-ninja/rxjs-array
```

## Testing stack

### Vitest (unit)

- Config: `vitest.config.ts`
- RxJS marble tests import `rxjs-marbles/jest` — aliased to `tools/rxjs-marbles-vitest.ts`
- Environment: Node
- Browser-only specs live under `e2e/browser/` (not Vitest)

### Playwright (Chrome)

- Config: `playwright.config.ts` (`channel: 'chrome'`)
- Tests: `e2e/browser/*.spec.ts`
- Bundles: `npm run build:e2e` → `e2e/public/*.js`
- Covers fetch, ReadableStream, and Web Crypto operators

## Affected packages (CI)

`node scripts/affected-workspaces.mjs origin/main` lists changed workspace names (e.g. `rxjs-array rxjs-string`).

## TypeScript

- Shared config: `tsconfig.base.json`
- Per-package build: `tsconfig.build.json` → `dist/`
- RxJS 7 peer dependency

## Publishing

CI publishes from `libs/rxjs/<name>/` after `npm run build` (see `.github/scripts/library-publish.sh`).
