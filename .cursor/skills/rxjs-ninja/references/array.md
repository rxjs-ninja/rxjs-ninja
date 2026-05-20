# @rxjs-ninja/rxjs-array

**npm:** `@rxjs-ninja/rxjs-array` (7.x) · **peer:** `rxjs@7` · **API:** https://rxjs-ninja.tane.dev/modules/array.html

Operators for **iterables emitted on a stream**—arrays, and conversions with Set, Map, Object, and typed arrays.

## Import

```ts
import { of, from } from 'rxjs';
import { union, mapArray, objectGroupBy } from '@rxjs-ninja/rxjs-array';
```

## Source shape

Most operators expect each emission to be an **iterable** (array, Set, etc.). Example:

```ts
import { of } from 'rxjs';
import { sort } from '@rxjs-ninja/rxjs-array';

of(['RxJS', 'TypeScript']).pipe(sort()).subscribe(console.log);
```

## Categories & operators

### Filter / set algebra

Compare source iterable to another array or Set (second arg can be `Observable`):

| Operator | Emits |
|----------|--------|
| `intersects`, `difference`, `differenceAll` | Array(s) from set logic |
| `filterIntersects`, `filterDifference`, `filterEvery`, `filterSome` | Filtered iterables |
| `union`, `symmetricDifference`, `isDisjointFrom` | ES2025 Set methods on emitted sets/arrays |
| `isSubsetOf`, `isSupersetOf`, `isEqualSet` | `boolean` |

```ts
import { of } from 'rxjs';
import { intersects, union } from '@rxjs-ninja/rxjs-array';

const technology$ = of(['RxJS', 'TypeScript', 'Angular', 'Node']);
const frontEnd$ = of(['RxJS', 'TypeScript', 'React']);

technology$.pipe(intersects(frontEnd$)).subscribe(console.log);
technology$.pipe(union(['b', 'c'])).subscribe(console.log);
```

### Query

| Operator | Emits |
|----------|--------|
| `every`, `some`, `find`, `findAll`, `findIndex`, `findLast`, `findLastIndex` | boolean or element |
| `includes`, `indexOf`, `lastIndexOf` | boolean or index |
| `binarySearch` | search result (typed) |
| `isArray` | whether emission is an array |

### Modify (array copy)

| Operator | Native API |
|----------|------------|
| `sort`, `reverse`, `fill`, `shuffle`, `flipArray` | Array helpers |
| `concat`, `slice`, `at`, `flat`, `flatMap` | ES array methods |
| `reduce`, `reduceRight` | reducers on emitted array |
| `mapArray`, `filterArray` | **`Array.prototype.map/filter`** (not RxJS map/filter) |
| `copyWithin`, `toSorted`, `toReversed`, `withIndex` | ES2023+ copy methods |
| `join` | `Array.prototype.join` → string emission |

### Map / Object / typed data

| Operator | Use |
|----------|-----|
| `toMap`, `toSet`, `toObject`, `fromMap`, `fromSet` | Convert emissions |
| `mapToArray`, `setToArray`, `objectKeysToArray`, `objectValuesToArray`, `objectEntriesToArray` | To array |
| `mapGet`, `mapSet`, `mapHas`, `mapDelete`, `mapSize` | Operate on emitted `Map` |
| `objectAssign`, `objectMerge`, `objectGroupBy`, `mapGroupBy` | Object/Map grouping |
| `arrayBufferFromTypedArray`, `typedArrayFromArrayBuffer`, `dataViewFromArrayBuffer`, `arrayFromTypedArray` | Binary data |

### Creators

| Function | Emits |
|----------|--------|
| `fromArray(iterable)` | Single array from iterable |
| `fromArrayOf(...items)` | One array of arguments |

```ts
import { fromArrayOf } from '@rxjs-ninja/rxjs-array';

fromArrayOf(1, 2, 3).subscribe(console.log); // [1, 2, 3]
```

## Types (TypeScript)

Exported helpers: `ScalarOrList`, `ScalarOrListInput`, `ArrayOrSet`, `IterableInput`, `MapEntry`, `GroupByFn`, `MapFn`, `PredicateFn`, `ReduceFn`, `TypedArrayConstructor`, `isSearchList`, `isArrayOrSet`.

Use `ScalarOrListInput<T>` when an operator accepts one value or a list of search values (`indexOf`, `includes`, …).

## Gotchas

- **`mapArray` / `filterArray`**: transform *contents* of each emitted array; chain after you have an array on the stream.
- **ES2024+**: `union`, `objectGroupBy`, `toSorted`, etc. require modern JS (Node 22+). No polyfill in the library.
- **Naming**: package does not export RxJS `map`/`filter` under other names.

## Example pipeline

```ts
import { of } from 'rxjs';
import { mapArray, filterArray, objectGroupBy } from '@rxjs-ninja/rxjs-array';

of([1, 2, 3, 4])
  .pipe(
    mapArray((n) => n * 2),
    filterArray((n) => n > 4),
  )
  .subscribe(); // [6, 8]

of(['x', 'xy', 'y'])
  .pipe(objectGroupBy((s) => s.length))
  .subscribe(); // { 1: ['x','y'], 2: ['xy'] }
```
