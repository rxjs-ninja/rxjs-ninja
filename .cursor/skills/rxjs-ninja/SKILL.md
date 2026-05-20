---
name: rxjs-ninja
description: Implements and documents RxJS Ninja operators in the @rxjs-ninja monorepo—Vitest marble tests, explicit package barrels, TypeDoc JSDoc, per-package CHANGELOGs, and Node 22+ ES2024 APIs. Use when adding or changing operators in libs/rxjs/*, fixing rxjs-marbles specs, updating package READMEs, or working on rxjs-array, rxjs-boolean, rxjs-number, rxjs-string, rxjs-random, or rxjs-utility.
---

# RxJS Ninja

## Quick start

When implementing or reviewing RxJS Ninja work:

1. Read [AGENTS.md](../../../AGENTS.md) for commands, CI (Node 24), and workspace layout.
2. Put **one operator per file** under `libs/rxjs/<pkg>/src/lib/<kebab-name>.ts`.
3. Add **one spec per operator**: `libs/rxjs/<pkg>/src/lib/<kebab-name>.spec.ts` beside the implementation.
4. Export from `libs/rxjs/<pkg>/src/index.ts` only—explicit named exports, grouped `// Operators` / `// Types`.
5. Update **that package’s** `CHANGELOG.md` and `README.md` (not root-only docs for package changes).
6. Run `npx vitest run libs/rxjs/<pkg>` then `npm run docs:prod` if JSDoc or public API changed.

## Non-negotiable conventions

| Rule | Do | Don’t |
|------|-----|--------|
| Barrel | `export { foo } from './lib/foo'` in `src/index.ts` | `export *`, `export { x as y }` aliases |
| Naming | `mapArray` / `filterArray` for ECMAScript Array methods | Re-export RxJS `map`/`filter` under other names |
| Tests | One `describe('<operator>')` per spec file | `*-gaps.spec.ts` or `ecma-collection.spec.ts` combining many operators |
| Imports in specs | `import { union } from './union'` (array) or `rxjs-marbles/jest` (other pkgs) | Multiple `m.expect` on the same hot observable in one `it` |
| Marbles | `subs = '^--!'` for `-a-\|` hot sources | `^-!` when emissions need two frames after subscribe |
| Changelog | `libs/rxjs/<pkg>/CHANGELOG.md` per release | Monorepo-only changelog for a single published package |
| Deps | Pinned exact versions in `package.json` | `^` / `~` ranges |

## Operator implementation checklist

```
- [ ] File: src/lib/<name>.ts with @packageDocumentation, @module, @category
- [ ] JSDoc: @param, @returns, @example (ts block + Output line) — see reference.md
- [ ] Iterable/second arg: use createOrReturnObservable from package utils when needed
- [ ] Export in src/index.ts (correct section)
- [ ] Spec: src/lib/<name>.spec.ts (marbles or observe)
- [ ] README example in the right category section
- [ ] CHANGELOG entry under Added/Changed/Fixed for the package version
```

## Testing

- **Marbles**: `import { marbles } from 'rxjs-marbles/jest'` (aliased to `tools/rxjs-marbles-vitest.ts`). Array specs may use `import { marbles } from 'rxjs-marbles'` (same adapter).
- **Non-deterministic** (crypto, random): `import { observe } from 'rxjs-marbles/jest'`; gate with `it.skip` when APIs are missing (e.g. `crypto.randomUUID`).
- **Browser-only**: specs under `e2e/browser/`; excluded from Vitest via `vitest.config.ts`.

## Documentation

- Operator JSDoc should match `union.ts` quality: `@category`, `@example`, `@returns`.
- Package `README.md`: category sections with runnable ` ```ts ` examples.
- TypeDoc: `npm run docs:prod` (`treatWarningsAsErrors: true`).

## ES2024 / Node

`@rxjs-ninja/rxjs-array` uses `Set.prototype.union`, `Object.groupBy`, `Array.prototype.toSorted`, etc. CI targets **Node 24** (`.nvmrc`). Do not polyfill these for older Node—upgrade CI instead.

## Additional resources

- Detailed conventions: [reference.md](reference.md)
- Copy-paste examples: [examples.md](examples.md)
