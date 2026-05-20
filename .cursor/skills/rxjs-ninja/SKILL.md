---
name: rxjs-ninja
description: Guides use of published @rxjs-ninja packages (rxjs-array, rxjs-boolean, rxjs-number, rxjs-string, rxjs-random, rxjs-utility) with RxJS 7—install, operator selection, pipe patterns, and per-package API references. Use when consuming RxJS Ninja in application code, choosing which package fits a task, or writing examples with array/set/map, numbers, strings, booleans, random/crypto, or utility operators.
---

# RxJS Ninja (library consumer)

RxJS Ninja ships **six independent npm packages**. Install only what you need; each declares `rxjs` as a **peer dependency** (7.x).

## Install

```bash
npm install rxjs @rxjs-ninja/rxjs-array
# and/or: rxjs-boolean rxjs-number rxjs-string rxjs-random rxjs-utility
```

| Package | Install | Docs |
|---------|---------|------|
| Arrays, Set, Map, Object | `@rxjs-ninja/rxjs-array` | [references/array.md](references/array.md) |
| Booleans & truthiness | `@rxjs-ninja/rxjs-boolean` | [references/boolean.md](references/boolean.md) |
| Numbers & Math | `@rxjs-ninja/rxjs-number` | [references/number.md](references/number.md) |
| Strings & Intl | `@rxjs-ninja/rxjs-string` | [references/string.md](references/string.md) |
| Random & Web Crypto | `@rxjs-ninja/rxjs-random` | [references/random.md](references/random.md) |
| Units, streams, side effects | `@rxjs-ninja/rxjs-utility` | [references/utility.md](references/utility.md) |

Full API: https://rxjs-ninja.tane.dev

## Usage patterns

**Examples in this skill** always import from published packages (`@rxjs-ninja/rxjs-array`, etc.) and `rxjs`—never from repo paths like `./lib/...`.

**Operators** (most symbols): use inside `.pipe()` on an Observable.

```ts
import { of } from 'rxjs';
import { union } from '@rxjs-ninja/rxjs-array';

of(['a', 'b']).pipe(union(['b', 'c'])).subscribe(console.log);
```

**Creators** (`fromArray`, `fromBoolean`, `fromRandom`, …): call directly; they return an Observable.

```ts
import { fromArrayOf } from '@rxjs-ninja/rxjs-array';

fromArrayOf(1, 2, 3).subscribe(console.log);
```

**Second argument as Observable**: many operators accept a plain value *or* an Observable (e.g. `union(other$)`, `intersects(frontEnd$)`). Pass `of(x)` or any `Observable` when the comparison value changes over time.

**Do not confuse** `@rxjs-ninja/rxjs-array` **`mapArray` / `filterArray`** with RxJS **`map` / `filter`**. The array variants run `Array.prototype.map` / `filter` on each *emitted array*, not on the stream of emissions.

## Pick a package

| You need to… | Package |
|--------------|---------|
| Compare, transform, or build arrays / sets / maps | `rxjs-array` |
| Truthy/falsy filtering, `and`/`or`, card Luhn | `rxjs-boolean` |
| Parse, format, stats, `Math.*`, Intl numbers | `rxjs-number` |
| String methods, regex, Intl collator/list/segment | `rxjs-string` |
| `Math.random` or `crypto` random values | `rxjs-random` |
| Fetch progress, streams, JWT, RGB, units | `rxjs-utility` |

## Environment notes

- **rxjs-array (7.x)**: Set/Object/Array ES2024+ helpers (`union`, `objectGroupBy`, `toSorted`, …) need a modern runtime (Node 22+).
- **rxjs-random (3.x)**: `fromRandomUUID` needs `crypto.randomUUID`; crypto ints/bytes use `crypto.getRandomValues` (not SubtleCrypto).
- **rxjs-utility**: `fromFetchWithProgress`, `fromReadableStream`, `fromWebSerial` are browser-oriented; Node apps typically use conversion/tap operators only.

## Examples

Cross-package recipes: [examples.md](examples.md)

## Per-package references

Read the reference for the package you are using—each lists categories, main exports, and gotchas:

- [references/array.md](references/array.md)
- [references/boolean.md](references/boolean.md)
- [references/number.md](references/number.md)
- [references/string.md](references/string.md)
- [references/random.md](references/random.md)
- [references/utility.md](references/utility.md)
