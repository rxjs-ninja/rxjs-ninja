# RxJS Ninja — consumer examples

Recipes by task. Package details: [references/](references/).

## Setup (any package)

```ts
import { of, from } from 'rxjs';
import { take } from 'rxjs/operators';
// import operators from the @rxjs-ninja package you installed
```

## Compare two lists (array)

```ts
import { of, combineLatest } from 'rxjs';
import { intersects, difference } from '@rxjs-ninja/rxjs-array';

const tech$ = of(['RxJS', 'TypeScript', 'Angular', 'Node']);
const frontEnd$ = of(['RxJS', 'TypeScript', 'React']);

tech$.pipe(intersects(frontEnd$)).subscribe();  // shared
tech$.pipe(difference(frontEnd$)).subscribe();   // only in tech$
```

## Build a Map from parallel streams (array)

```ts
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { toMap } from '@rxjs-ninja/rxjs-array';

const names$ = of(['RxJS', 'TypeScript']);
const kinds$ = of(['Library', 'Language']);

combineLatest([names$, kinds$]).pipe(
  map(([names, kinds]) => names.map((n, i) => [n, kinds[i]] as const)),
  toMap(),
  tap((m) => console.log(m.get('RxJS'))),
).subscribe();
```

## Group records (array)

```ts
import { of } from 'rxjs';
import { objectGroupBy } from '@rxjs-ninja/rxjs-array';

of(['x', 'xy', 'y']).pipe(objectGroupBy((s) => s.length)).subscribe();
```

## First truthy string (boolean)

```ts
import { from } from 'rxjs';
import { firstTruthy } from '@rxjs-ninja/rxjs-boolean';

from(['', 'RxJS', 'Ninja']).pipe(firstTruthy()).subscribe(); // 'RxJS'
from(['', 'RxJS', 'TypeScript']).pipe(firstTruthy((v) => v.length > 5)).subscribe();
```

## Parse and format money-like numbers (number)

```ts
import { from } from 'rxjs';
import { parseFloat, toLocaleString } from '@rxjs-ninja/rxjs-number';

from(['19.99', '5.00']).pipe(
  parseFloat(),
  toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
).subscribe();
```

## Stats on batches (number)

```ts
import { from } from 'rxjs';
import { mean, max } from '@rxjs-ninja/rxjs-number';

from([[1, 2, 3], [10, 20, 30]]).pipe(mean()).subscribe(); // 2, 20
```

## Slug-style string pipeline (string)

```ts
import { of } from 'rxjs';
import { toLowerCase, split, join } from '@rxjs-ninja/rxjs-string';

of('Hello World Example')
  .pipe(toLowerCase(), split(' '), join('-'))
  .subscribe(); // 'hello-world-example'
```

## Locale-aware list label (string)

```ts
import { of } from 'rxjs';
import { intlListFormat } from '@rxjs-ninja/rxjs-string';

of(['Angular', 'RxJS', 'TypeScript']).pipe(intlListFormat('en')).subscribe();
```

## Session id / token bytes (random)

```ts
import { take, map } from 'rxjs/operators';
import { fromRandomBytes, fromRandomCryptoCharset } from '@rxjs-ninja/rxjs-random';

// 16 raw bytes once
fromRandomBytes(16).pipe(take(1)).subscribe();

// 32-char hex-ish from charset
fromRandomCryptoCharset(32, '0123456789abcdef').pipe(take(1)).subscribe();
```

## Fetch download progress (utility + browser)

```ts
import { fromFetchWithProgress } from '@rxjs-ninja/rxjs-utility';

fromFetchWithProgress('/api/large-file').subscribe((event) => {
  // progress events — see package API for event shape
});
```

## Temperature dashboard (utility)

```ts
import { from } from 'rxjs';
import { temperature, Temperatures } from '@rxjs-ninja/rxjs-utility';

from([0, 20, 37]).pipe(
  temperature(Temperatures.CELSIUS, Temperatures.FAHRENHEIT),
).subscribe();
```

## Multi-package pipeline

```ts
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { filterArray } from '@rxjs-ninja/rxjs-array';
import { mean } from '@rxjs-ninja/rxjs-number';
import { join } from '@rxjs-ninja/rxjs-string';

of([1, 2, 3, 4, 5, 6])
  .pipe(
    filterArray((n) => n % 2 === 0),
    map((nums) => [nums]), // mean expects iterable of numbers per emission
    mean(),
  )
  .subscribe();

of(['a', 'b', 'c']).pipe(join(', ')).subscribe();
```

## Choosing packages (quick)

| Task | Package |
|------|---------|
| Set union / groupBy on arrays | `rxjs-array` |
| Skip empty strings | `rxjs-boolean` |
| `Intl.NumberFormat` | `rxjs-number` |
| `Intl.ListFormat` | `rxjs-string` |
| UUID / crypto int | `rxjs-random` |
| Celsius → Fahrenheit | `rxjs-utility` |
