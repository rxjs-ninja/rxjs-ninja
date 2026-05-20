# RxJS Ninja — examples

## New operator (array)

**`libs/rxjs/array/src/lib/includes.ts`** (pattern)

```ts
/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';
import { ScalarOrListInput } from '../types/scalar-or-list';

/**
 * Returns whether the source iterable includes the search value(s) using `Array.prototype.includes`.
 *
 * @category Query
 *
 * @param searchElement Value(s) to search for
 *
 * @example
 * Check membership in an emitted array
 * ```ts
 * of(['a', 'b']).pipe(includes('a')).subscribe();
 * ```
 * Output: `true`
 *
 * @returns Observable that emits boolean results
 */
export function includes<T>(searchElement: ScalarOrListInput<T>): OperatorFunction<Iterable<T>, boolean> {
  const search$ = createOrReturnObservable(searchElement);
  return (source) =>
    source.pipe(
      withLatestFrom(search$),
      map(([value, search]) => [...value].includes(search as T)),
    );
}
```

**`libs/rxjs/array/src/lib/includes.spec.ts`**

```ts
import { marbles } from 'rxjs-marbles';
import { includes } from './includes';

describe('includes', () => {
  it(
    'should emit whether the array includes the search value',
    marbles((m) => {
      const input = m.hot('-a-|', { a: ['a', 'b', 'c'] });
      const subs = '^--!';
      const expected = m.cold('-t-|', { t: true });
      m.expect(input.pipe(includes('b'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
```

**`src/index.ts`**

```ts
export { includes } from './lib/includes';
```

## Barrel excerpt (explicit only)

```ts
// Operators
export { mapArray } from './lib/map-array';
export { filterArray } from './lib/filter-array';

// Types
export type { ScalarOrList } from './types/scalar-or-list';
export { isSearchList } from './types/scalar-or-list';
```

## README snippet

```ts
import { of } from 'rxjs';
import { mapArray, objectGroupBy } from '@rxjs-ninja/rxjs-array';

of([1, 2, 3]).pipe(mapArray((n) => n * 2)).subscribe();
// Output: [2, 4, 6]

of(['x', 'xy', 'y']).pipe(objectGroupBy((s) => s.length)).subscribe();
// Output: { 1: ['x', 'y'], 2: ['xy'] }
```

## CHANGELOG entry

```markdown
## [7.0.0] - 2026-05-20

### Added

- `includes` operator using `Array.prototype.includes`
- **Array:** `mapArray`, `filterArray`, `reduceRight`
```

## Boolean combinator spec

```ts
import { marbles } from 'rxjs-marbles/jest';
import { and } from './and';

describe('and', () => {
  it(
    'should emit the logical AND of source and input',
    marbles((m) => {
      const input = m.hot('-a-b-|', { a: true, b: false });
      const subs = '^----!';
      const expected = m.cold('-t-f-|', { t: true, f: false });
      m.expect(input.pipe(and(true))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
```

## Number Intl spec

```ts
import { marbles } from 'rxjs-marbles/jest';
import { intlNumberFormat } from './intl-number-format';

describe('intlNumberFormat', () => {
  it(
    'should format numbers for a locale',
    marbles((m) => {
      const input = m.hot('-a-|', { a: 1000 });
      const subs = '^--!';
      const expected = m.cold('-x-|', { x: '1,000' });
      m.expect(input.pipe(intlNumberFormat('en-US'))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
```

## Random crypto spec (observe + skip)

```ts
import { observe } from 'rxjs-marbles/jest';
import { take, tap } from 'rxjs/operators';

const hasRandomUUID = typeof globalThis.crypto?.randomUUID === 'function';

import { fromRandomUUID } from './from-random-uuid';

describe('fromRandomUUID', () => {
  (hasRandomUUID ? it : it.skip)(
    'should emit RFC 4122 UUID strings',
    observe(() =>
      fromRandomUUID().pipe(
        take(2),
        tap((value) => {
          expect(value).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
          );
        }),
      ),
    ),
  );
});
```

## Splitting a consolidated gaps spec

**Before (avoid):** `ecma-collection.spec.ts` with many operators and multiple `m.expect` on one hot observable.

**After:** delete the consolidated file; add:

- `map-array.spec.ts`
- `filter-array.spec.ts`
- `map-get.spec.ts`
- …one file per operator, imports from `./<operator>`.

## Commands

```bash
# One package
npx vitest run libs/rxjs/boolean

# All unit tests
npm test

# Docs gate
npm run docs:prod

# Affected workspaces for a branch
node scripts/affected-workspaces.mjs origin/main
```

## Cloud agent / PR workflow

- Branch prefix: `cursor/<descriptive-name>-e2ee`
- Commit per package or logical unit; push before opening/updating PR
- Set `base_branch: main` unless directed otherwise
- Per-package `CHANGELOG.md` only for that package’s release
