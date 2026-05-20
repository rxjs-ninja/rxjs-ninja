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
npm install --legacy-peer-deps   # root install (typedoc plugins need legacy peers)
npm run build                    # build all workspaces
npm test                         # test all workspaces
npm run lint                     # lint all workspaces
npm run test:cov                 # coverage per workspace
```

Run a single package:

```bash
npm run build -w @rxjs-ninja/rxjs-array
npm test -w @rxjs-ninja/rxjs-utility
```

## Affected packages (CI)

`node scripts/affected-workspaces.mjs origin/main` lists workspace names changed since a git base (e.g. `rxjs-array rxjs-string`).

## TypeScript

- Shared config: `tsconfig.base.json`
- Per-package build: `tsconfig.build.json` → output in `libs/rxjs/<pkg>/dist/`
- RxJS 7 peer dependency; root devDependency for tests

## Publishing

Built artifacts live in each package’s `dist/` folder. CI publishes from `libs/rxjs/<name>/` (see `.github/scripts/library-publish.sh`).
